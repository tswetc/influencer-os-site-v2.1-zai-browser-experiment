// Fix Pack 7 — server-side Gumroad license verification proxy.
// Fix Pack 20 — security layer (v0 audit items 1 and 3):
// - The server issues an HMAC-SHA256 token for every valid key. The signing
//   secret never reaches the browser, so the cached license can no longer be
//   forged from the console (the old client-side djb2 signature is gone).
// - Per-IP rate limiting protects the endpoint from brute-forcing Gumroad
//   license keys. In-memory state is per-instance, which is fine for a
//   single-region deployment; swap for Upstash Redis if the app scales out.
// Env: GUMROAD_PRODUCT_ID (required), LICENSE_SIGNING_SECRET (recommended;
// falls back to GUMROAD_PRODUCT_ID so existing deployments keep working).

import { createHmac, timingSafeEqual } from "node:crypto";

export const runtime = "nodejs";

const GUMROAD_VERIFY_URL = "https://api.gumroad.com/v2/licenses/verify";

// --- Rate limit (audit item 3) -------------------------------------------

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 30;
const rateMap = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  // Opportunistic cleanup so the map never grows unbounded.
  if (rateMap.size > 5000) {
    for (const [k, v] of rateMap) {
      if (now - v.windowStart > RATE_WINDOW_MS) rateMap.delete(k);
    }
  }
  const cur = rateMap.get(ip);
  if (!cur || now - cur.windowStart > RATE_WINDOW_MS) {
    rateMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  cur.count += 1;
  return cur.count > RATE_LIMIT;
}

// --- Token signing (audit item 1) -----------------------------------------

function signingSecret(): string {
  return (
    process.env.LICENSE_SIGNING_SECRET || process.env.GUMROAD_PRODUCT_ID || ""
  );
}

function signToken(key: string, issuedAt: number): string {
  return createHmac("sha256", signingSecret())
    .update(`${key}|${issuedAt}`)
    .digest("hex");
}

function tokenValid(key: string, issuedAt: number, token: string): boolean {
  const expected = signToken(key, issuedAt);
  if (token.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

// --- Route -----------------------------------------------------------------

type GumroadResponse = {
  success?: boolean;
  uses?: number;
  purchase?: {
    refunded?: boolean;
    chargebacked?: boolean;
    disputed?: boolean;
  };
};

type Body = {
  key?: unknown;
  mode?: unknown; // "activate" | "recheck" | "token"
  token?: unknown;
  issuedAt?: unknown;
  increment?: unknown; // legacy alias: true → "activate"
};

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request): Promise<Response> {
  const productId = process.env.GUMROAD_PRODUCT_ID;
  if (!productId)
    return json({ ok: false, error: "server_not_configured" }, 500);

  const ip =
    (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
    "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  let body: Body | null = null;
  try {
    body = (await req.json()) as Body;
  } catch {
    body = null;
  }
  const key = typeof body?.key === "string" ? body.key.trim() : "";
  if (!key || key.length > 120)
    return json({ ok: false, error: "bad_request" }, 400);

  const mode =
    body?.mode === "token" ||
    body?.mode === "recheck" ||
    body?.mode === "activate"
      ? body.mode
      : body?.increment === true
        ? "activate"
        : "recheck";
  const token = typeof body?.token === "string" ? body.token : "";
  const issuedAt = typeof body?.issuedAt === "number" ? body.issuedAt : 0;

  // Cheap token-only check — no Gumroad round-trip. Runs on every app start,
  // so a cache forged from the console locks on the next launch.
  if (mode === "token")
    return json({
      ok: true,
      valid: token !== "" && issuedAt > 0 && tokenValid(key, issuedAt, token),
    });

  // A recheck that carries a token must present a valid one. A recheck
  // without a token is the one-time migration path from the pre-1.20 cache
  // format — it still has to pass the Gumroad check below.
  if (mode === "recheck" && token !== "" && !tokenValid(key, issuedAt, token))
    return json({ ok: true, valid: false, uses: 0 });

  const form = new URLSearchParams();
  form.set("product_id", productId);
  form.set("license_key", key);
  // Only the very first activation increments the Gumroad uses counter;
  // background re-checks must never burn an activation.
  form.set("increment_uses_count", mode === "activate" ? "true" : "false");

  try {
    const res = await fetch(GUMROAD_VERIFY_URL, {
      method: "POST",
      body: form,
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as GumroadResponse | null;
    if (!data) return json({ ok: false, error: "upstream" }, 502);
    // Gumroad answers 404 + success:false for unknown keys — that is a
    // definitive "invalid", not a server error.
    if (data.success !== true) return json({ ok: true, valid: false, uses: 0 });
    const p = data.purchase ?? {};
    const valid =
      p.refunded !== true && p.chargebacked !== true && p.disputed !== true;
    const uses = typeof data.uses === "number" ? data.uses : 0;
    if (!valid) return json({ ok: true, valid: false, uses });
    const freshIssuedAt = Date.now();
    return json({
      ok: true,
      valid: true,
      uses,
      token: signToken(key, freshIssuedAt),
      issuedAt: freshIssuedAt,
    });
  } catch {
    return json({ ok: false, error: "upstream" }, 502);
  }
}
