// ============================================================================
// VISION CACHE - content-addressed cache for Vision analysis (Fix Pack 10, C1).
// Same photo + same provider/model => the stored answer is reused and the API
// is NOT called again (saves the user's credits). Stored in IndexedDB (kv),
// key = ios_vision_<kind>:<provider>:<model>:<sha256(dataUrl)>.
// Also owns the product-photo description prompt (Fix Pack 10, B2).
// ============================================================================

import { idbGet, idbSet } from "./idb";
import {
  type LlmConfig,
  type LlmResult,
  analyzeImage,
  chatLlm,
} from "./vision";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** FNV-1a 32-bit fallback hash (when crypto.subtle is unavailable). */
export function fnv1a(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return "fnv_" + h.toString(16) + "_" + s.length.toString(16);
}

export async function hashDataUrl(dataUrl: string): Promise<string> {
  try {
    if (
      typeof crypto !== "undefined" &&
      crypto.subtle &&
      typeof TextEncoder !== "undefined"
    ) {
      const buf = await crypto.subtle.digest(
        "SHA-256",
        new TextEncoder().encode(dataUrl),
      );
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
  } catch {
    // fall through to FNV
  }
  return fnv1a(dataUrl);
}

export type VisionKind = "scene" | "product";

/** Cache key: provider + model pin the answer format; hash pins the pixels. */
export function visionCacheKey(
  cfg: LlmConfig,
  hash: string,
  kind: VisionKind,
): string {
  const model = cfg.model || "default";
  return `ios_vision_${kind}:${cfg.provider}:${model}:${hash}`;
}

interface CacheEntry {
  text: string;
  at: string;
}

export interface CachedAnalysis {
  results: LlmResult[];
  fromCache: boolean[];
}

/** Drop-in replacement for analyzeImages(): sequential, cache-first. */
export async function analyzeImagesCached(
  cfg: LlmConfig,
  dataUrls: string[],
): Promise<CachedAnalysis> {
  const results: LlmResult[] = [];
  const fromCache: boolean[] = [];
  let apiCalls = 0;
  for (const dataUrl of dataUrls) {
    const key = visionCacheKey(cfg, await hashDataUrl(dataUrl), "scene");
    const hit = await idbGet<CacheEntry>(key);
    if (hit && hit.text) {
      results.push({ ok: true, text: hit.text });
      fromCache.push(true);
      continue;
    }
    if (apiCalls > 0) await sleep(400); // free-tier rate limits
    const res = await analyzeImage(cfg, dataUrl);
    apiCalls++;
    if (res.ok && res.text) {
      await idbSet(key, { text: res.text, at: new Date().toISOString() });
    }
    results.push(res);
    fromCache.push(false);
  }
  return { results, fromCache };
}

// --- Product photo (Fix Pack 10, B2) -----------------------------------------

export const PRODUCT_PROMPT =
  "Describe this product for an image-generation prompt: object type, color, material, shape, distinctive details. Max 25 words, English only, no brand names, no people.";

export async function analyzeProductCached(
  cfg: LlmConfig,
  dataUrl: string,
): Promise<{ result: LlmResult; fromCache: boolean }> {
  const key = visionCacheKey(cfg, await hashDataUrl(dataUrl), "product");
  const hit = await idbGet<CacheEntry>(key);
  if (hit && hit.text) {
    return { result: { ok: true, text: hit.text }, fromCache: true };
  }
  const result = await chatLlm(
    cfg,
    [{ role: "user", text: PRODUCT_PROMPT, imageDataUrl: dataUrl }],
    200,
  );
  if (result.ok && result.text) {
    await idbSet(key, { text: result.text, at: new Date().toISOString() });
  }
  return { result, fromCache: false };
}
