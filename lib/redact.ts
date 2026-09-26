// ============================================================================
// Fix Pack 16 — REDACTION (§2). Public surfaces never render hidden prompt
// text. Instead of CSS-blurring the real tail (which leaves the words in the
// DOM), the hidden part is REPLACED by deterministic glyph bars: ▮▮▮ ▮▮ ▮▮▮.
// The bars mimic the word rhythm of the hidden text but contain none of it.
// Also home to the small deterministic “hand-placed” helpers for the gallery.
// ============================================================================

export const REDACT_GLYPH = "▮";

/** Tiny deterministic pseudo-random float in [0, 1) from an integer seed. */
export function seedRand(seed: number): number {
  let t = (seed + 0x6d2b79f5) | 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * Replace hidden text with glyph bars: same word count, similar widths,
 * zero content. Deterministic for a given (text, seed).
 */
export function redactBars(hidden: string, seed = 0): string {
  const words = hidden.split(/\s+/).filter(Boolean);
  return words
    .map((w, i) => {
      const jitter = Math.floor(seedRand(seed + i) * 3) - 1; // -1..+1
      const len = Math.max(2, Math.min(9, w.length + jitter));
      return REDACT_GLYPH.repeat(Math.max(1, Math.ceil(len / 2)));
    })
    .join(" ");
}

// --- Fix Pack 19: glass redaction ------------------------------------------
// Decoy pseudo-words for the landing's glass blur: same word rhythm as the
// hidden text, zero content. The real words never reach the DOM — the blur
// is applied to these decoys only, so it cannot be "un-blurred" back.

const DECOY_CONS = "bcdfghklmnprstvz";
const DECOY_VOW = "aeiou";

/** Deterministic decoy words mirroring the hidden text's rhythm. */
export function redactWords(hidden: string, seed = 0): string {
  const words = hidden.split(/\s+/).filter(Boolean);
  return words
    .map((w, i) => {
      const len = Math.max(2, Math.min(10, w.length));
      let out = "";
      for (let j = 0; j < len; j += 1) {
        const r = seedRand(seed * 101 + i * 31 + j);
        out +=
          j % 2 === 0
            ? DECOY_CONS[Math.floor(r * DECOY_CONS.length)]
            : DECOY_VOW[Math.floor(r * DECOY_VOW.length)];
      }
      return out === w ? `${out}x` : out;
    })
    .join(" ");
}

/** True when a string is made of redaction bars (selfcheck / UI guards). */
export function isRedacted(s: string): boolean {
  return s.includes(REDACT_GLYPH);
}

/** No word of the hidden text may survive redaction. */
export function redactionLeaks(hidden: string, redacted: string): boolean {
  const out = new Set(redacted.split(/\s+/));
  return hidden
    .split(/\s+/)
    .filter(Boolean)
    .some((w) => out.has(w));
}

// --- Gallery rhythm: deterministic “hand-placed” polaroids ------------------

/** Tilt in degrees (-2.4..+2.4), never 0, never two equal in a row. */
export function tiltFor(i: number): number {
  const base = seedRand(i * 7 + 3) * 4.8 - 2.4;
  let r = Math.round(base * 10) / 10;
  if (r === 0) r = i % 2 === 0 ? -1.2 : 1.1;
  const prev = i > 0 ? tiltFor(i - 1) : Number.NaN;
  if (r === prev) r = r > 0 ? r - 0.7 : r + 0.7;
  return Math.round(r * 10) / 10;
}

/** Small vertical lift in px (-6..+6) for the gallery rhythm. */
export function liftFor(i: number): number {
  return Math.round(seedRand(i * 13 + 5) * 12 - 6);
}
