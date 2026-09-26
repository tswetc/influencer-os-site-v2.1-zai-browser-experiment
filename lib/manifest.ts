// Fix Pack 14 — remote canon manifest. The updatable canon is the product's
// moat: buyers get new packs / techniques / notes without a rebuild. This
// module ONLY reads a small versioned JSON from NEXT_PUBLIC_CANON_MANIFEST_URL
// and reports what's new. It never executes remote code and never mutates the
// user's own data — applying entries stays an explicit, later step.

export interface CanonManifest {
  version: string; // e.g. "2026.07.14"
  publishedAt?: string; // ISO date
  title?: string;
  notes: string[]; // human-readable changelog lines
  packs?: string[]; // pack ids announced (informational in v1)
  techniques?: string[]; // technique ids announced (informational in v1)
}

export interface ManifestStatus {
  ok: boolean;
  manifest?: CanonManifest;
  hasUpdate?: boolean; // version differs from the last one the user saw
  error?: string;
}

const SEEN_KEY = "ios_canon_manifest_seen";

export function manifestUrl(): string {
  return (process.env.NEXT_PUBLIC_CANON_MANIFEST_URL || "").trim();
}

/** Strict, defensive parse — anything malformed yields null. */
export function parseManifest(raw: unknown): CanonManifest | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const version = typeof o.version === "string" ? o.version.trim() : "";
  if (!version) return null;
  const strArr = (v: unknown): string[] =>
    Array.isArray(v)
      ? v
          .filter((x): x is string => typeof x === "string")
          .map((x) => x.trim())
          .filter(Boolean)
      : [];
  return {
    version,
    publishedAt: typeof o.publishedAt === "string" ? o.publishedAt : undefined,
    title: typeof o.title === "string" ? o.title : undefined,
    notes: strArr(o.notes),
    packs: strArr(o.packs),
    techniques: strArr(o.techniques),
  };
}

export function lastSeenVersion(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(SEEN_KEY) || "";
  } catch {
    return "";
  }
}

export function markManifestSeen(version: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SEEN_KEY, version);
  } catch {
    // ignore — private mode / storage disabled
  }
}

/** Fetch + parse the manifest. fetchImpl is injectable for tests. */
export async function fetchManifest(
  fetchImpl: typeof fetch = fetch,
): Promise<ManifestStatus> {
  const url = manifestUrl();
  if (!url) return { ok: false, error: "no-url" };
  try {
    const res = await fetchImpl(url, { cache: "no-store" });
    if (!res.ok) return { ok: false, error: `http-${res.status}` };
    const json = (await res.json()) as unknown;
    const manifest = parseManifest(json);
    if (!manifest) return { ok: false, error: "parse" };
    return {
      ok: true,
      manifest,
      hasUpdate: manifest.version !== lastSeenVersion(),
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "fetch" };
  }
}
