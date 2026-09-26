// Fix Pack 7 — client license layer.
// Fix Pack 20 — server-signed cache (hmac-v2, v0 audit item 1). The old
// djb2 self-signature lived in this file together with its salt, so a
// valid-looking cache could be fabricated straight from the console. Now the
// cache stores an opaque HMAC-SHA256 token issued by /api/license; only the
// server holds the secret and only the server can validate it. The client
// still unlocks optimistically inside the 7-day grace window, but every app
// start runs a cheap background token check (no Gumroad round-trip) and
// locks if the token is fake — a forged cache survives only while the
// browser stays offline. Background full re-check stays at once per 24h and
// never increments the Gumroad uses counter.

const LS_KEY = "ios_license";

export const LICENSE_PROTOCOL = "hmac-v2";

export const GRACE_MS = 7 * 24 * 60 * 60 * 1000;
export const RECHECK_MS = 24 * 60 * 60 * 1000;
export const USES_LIMIT = 10;

export const GUMROAD_URL =
  process.env.NEXT_PUBLIC_GUMROAD_URL || "https://gumroad.com";

export type LicenseState = {
  key: string;
  // Server-side issue time of the token below; also the grace-window anchor.
  verifiedAt: number;
  uses: number;
  // Opaque HMAC from /api/license. "" = legacy pre-1.20 cache — the gate
  // migrates it through one full reverify() without burning an activation.
  token: string;
};

export function readLicense(): LicenseState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const st = JSON.parse(raw) as Partial<LicenseState>;
    if (
      !st ||
      typeof st.key !== "string" ||
      typeof st.verifiedAt !== "number" ||
      typeof st.uses !== "number"
    )
      return null;
    return {
      key: st.key,
      verifiedAt: st.verifiedAt,
      uses: st.uses,
      token: typeof st.token === "string" ? st.token : "",
    };
  } catch {
    return null;
  }
}

export function writeLicense(
  key: string,
  uses: number,
  token = "",
  issuedAt = 0,
): LicenseState {
  const st: LicenseState = {
    key,
    verifiedAt: issuedAt > 0 ? issuedAt : Date.now(),
    uses,
    token,
  };
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(st));
  } catch {
    // Storage unavailable: the session stays unlocked in memory only.
  }
  return st;
}

export function clearLicense(): void {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    // Ignore.
  }
}

export function withinGrace(st: LicenseState): boolean {
  const age = Date.now() - st.verifiedAt;
  return age >= 0 && age < GRACE_MS;
}

export function needsRecheck(st: LicenseState): boolean {
  return Date.now() - st.verifiedAt > RECHECK_MS;
}

export type VerifyStatus = "valid" | "invalid" | "uses" | "network" | "rate";
export type VerifyResult = {
  status: VerifyStatus;
  uses: number;
  token: string;
  issuedAt: number;
};

type ServerReply = {
  ok?: boolean;
  valid?: boolean;
  uses?: number;
  token?: string;
  issuedAt?: number;
  error?: string;
} | null;

async function callApi(
  body: Record<string, unknown>,
): Promise<{ reply: ServerReply; httpStatus: number }> {
  try {
    const res = await fetch("/api/license", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const reply = (await res.json().catch(() => null)) as ServerReply;
    return { reply, httpStatus: res.status };
  } catch {
    return { reply: null, httpStatus: 0 };
  }
}

async function verify(body: Record<string, unknown>): Promise<VerifyResult> {
  const { reply, httpStatus } = await callApi(body);
  if (httpStatus === 429 || reply?.error === "rate_limited")
    return { status: "rate", uses: 0, token: "", issuedAt: 0 };
  if (!reply || reply.ok !== true)
    return { status: "network", uses: 0, token: "", issuedAt: 0 };
  const uses = typeof reply.uses === "number" ? reply.uses : 0;
  const token = typeof reply.token === "string" ? reply.token : "";
  const issuedAt = typeof reply.issuedAt === "number" ? reply.issuedAt : 0;
  if (reply.valid !== true) return { status: "invalid", uses, token, issuedAt };
  if (uses > USES_LIMIT) return { status: "uses", uses, token, issuedAt };
  return { status: "valid", uses, token, issuedAt };
}

export async function activate(key: string): Promise<VerifyResult> {
  const r = await verify({ key, mode: "activate" });
  if (r.status === "valid") writeLicense(key, r.uses, r.token, r.issuedAt);
  return r;
}

// Cheap per-launch validation: the server only recomputes the HMAC, no
// Gumroad round-trip. Rate-limit and network failures never lock a cache
// inside the grace window — only a definitive "forged token" answer does.
export async function checkToken(
  st: LicenseState,
): Promise<"valid" | "invalid" | "offline"> {
  if (!st.token) return "offline"; // legacy cache — reverify() migrates it
  const { reply, httpStatus } = await callApi({
    key: st.key,
    mode: "token",
    token: st.token,
    issuedAt: st.verifiedAt,
  });
  if (httpStatus === 429 || !reply || reply.ok !== true) return "offline";
  return reply.valid === true ? "valid" : "invalid";
}

// Full background re-verification (token + Gumroad refund check). Network
// failure never locks the app while the cached state is inside the grace
// window; a definitive server "invalid" (forged token, refund, chargeback)
// clears the cache immediately. A fresh token is stored on every success.
export async function reverify(
  st: LicenseState,
): Promise<"valid" | "invalid" | "offline"> {
  const body: Record<string, unknown> = { key: st.key, mode: "recheck" };
  if (st.token) {
    body.token = st.token;
    body.issuedAt = st.verifiedAt;
  }
  const r = await verify(body);
  if (r.status === "valid") {
    writeLicense(st.key, r.uses, r.token, r.issuedAt);
    return "valid";
  }
  if (r.status === "network" || r.status === "rate") return "offline";
  clearLicense();
  return "invalid";
}
