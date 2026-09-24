// ============================================================================
// Fix Pack 11.3 — CANON: the user's mini-Liireya. Six editable blocks that
// make cutaways, props, captions, poses and mood HERS instead of "from the
// pack". Generated in one click by the user's own LLM from the passport +
// home world, editable inline, stored ON the passport itself — so it rides
// passport versions, export and import automatically. Zero required fields:
// an empty canon keeps every pool at pack defaults (the product works exactly
// as before); a filled canon goes FIRST in the prop / cutaway / caption pools.
// ============================================================================

import type { CharacterPassport, Lang, ModelCanon } from "./types";
import { chatLlm, type LlmConfig } from "./vision";

export type { ModelCanon } from "./types";

export const ALLOWED_PACK_IDS = [
  "pack_diary",
  "pack_flash",
  "pack_sunlight",
  "pack_americana",
  "pack_studio",
  "pack_suburb",
  "pack_concrete",
  "pack_cup",
  "pack_transit",
  "pack_wide",
  "pack_polaroid90",
  "pack_squint",
];

export function emptyCanon(): ModelCanon {
  return {
    schemaVersion: 1,
    whoSheIs: "",
    place: [],
    objects: [],
    homeWorld: "",
    favoritePacks: [],
    voiceStyle: "",
    voiceWords: [],
    habits: [],
  };
}

/** True when at least one block has content — the mixing layer switches on. */
export function canonFilled(c?: ModelCanon | null): boolean {
  if (!c) return false;
  return Boolean(
    c.whoSheIs.trim() ||
    c.place.length > 0 ||
    c.objects.length > 0 ||
    c.homeWorld ||
    c.voiceWords.length > 0 ||
    c.habits.length > 0,
  );
}

// --- Mixing helpers: canon entries go FIRST, pack pools stay the defaults ----

/** Personal objects → the prop-in-hands axis. */
export function canonProps(c?: ModelCanon | null): string[] {
  return c ? c.objects.map((o) => o.trim()).filter(Boolean) : [];
}

/** Body habits → the pose axis. */
export function canonHabits(c?: ModelCanon | null): string[] {
  return c ? c.habits.map((h) => h.trim()).filter(Boolean) : [];
}

/** "Who she is" → appended to the MOOD block of every prompt. */
export function canonMood(c?: ModelCanon | null): string {
  return c?.whoSheIs.trim() ?? "";
}

/** Her caption words → replace the world caption pool on hero/detail frames. */
export function canonCaptions(c?: ModelCanon | null): string[] {
  return c ? c.voiceWords.map((w) => w.trim()).filter(Boolean) : [];
}

const CANON_LIGHTS = [
  "soft daylight from her own window",
  "warm low lamp light, evening at her place",
  "thin morning light across her room",
];

/** Her place × her objects → cutaways that go FIRST in every pack pool. */
export function canonCutaways(c?: ModelCanon | null): Array<{
  id: string;
  label: Record<Lang, string>;
  text: string;
  lighting: string;
}> {
  if (!c) return [];
  const places = c.place.map((p) => p.trim()).filter(Boolean);
  const objects = canonProps(c);
  return places.slice(0, 3).map((p, k) => {
    const obj = objects.length > 0 ? objects[k % objects.length] : "";
    return {
      id: `canon_cut_${k}`,
      label: { ru: "Её место", en: "Her place" },
      text: obj ? `${p}, ${obj} left where she dropped it` : p,
      lighting: CANON_LIGHTS[k % CANON_LIGHTS.length],
    };
  });
}

// --- One-click generation via the user's own LLM key -------------------------

export function buildCanonLlmPrompt(
  passport: CharacterPassport,
  world: "A" | "B" | "C",
  lang: Lang,
): string {
  const langName = lang === "ru" ? "Russian" : "English";
  const identity =
    passport.identity.full || passport.identity.mid || passport.identity.micro;
  return [
    `You build a "canon" for a fictional AI influencer model — not a biography, but the concrete visual and verbal habits that make her feed hers.`,
    `Appearance passport: ${identity || "(empty)"}. Name: ${passport.name || "(unnamed)"}. Home aesthetic world: ${world} (A = honest phone diary, B = raw underground, C = staged film-still kitsch).`,
    `Reply ONLY with one JSON object, no prose:`,
    `{"who":"1-2 short ENGLISH phrases: archetype + vibe","place":["city + type of home","2-3 short ENGLISH interior phrases, one per item"],"objects":["5-7 personal objects in ENGLISH, each starting with 'her', concrete and imperfect (chipped, worn, exact color)"],"world":"A|B|C","favoritePacks":["1-3 ids from: ${ALLOWED_PACK_IDS.join(", ")}"],"voiceStyle":"one ${langName} line describing how she writes captions","voiceWords":["8-12 caption words/phrases in ${langName}, lowercase, 1-3 words each, no hashtags"],"habits":["2-3 ENGLISH body habits in frame, e.g. how she holds the phone, how she sits"]}`,
    `Hard rules: never use names of real people, photographers, models or brands; physical observable terms only; no beauty-filter or retouching language.`,
  ].join("\n");
}

export function parseCanonText(text: string): ModelCanon | null {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const raw = JSON.parse(m[0]) as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const arr = (v: unknown, cap: number) =>
      Array.isArray(v)
        ? v
            .filter((x): x is string => typeof x === "string")
            .map((x) => x.trim())
            .filter(Boolean)
            .slice(0, cap)
        : [];
    const world = str(raw.world);
    const canon: ModelCanon = {
      schemaVersion: 1,
      whoSheIs: str(raw.who),
      place: arr(raw.place, 4),
      objects: arr(raw.objects, 7),
      homeWorld: world === "A" || world === "B" || world === "C" ? world : "",
      favoritePacks: arr(raw.favoritePacks, 3).filter((p) =>
        ALLOWED_PACK_IDS.includes(p),
      ),
      voiceStyle: str(raw.voiceStyle),
      voiceWords: arr(raw.voiceWords, 12),
      habits: arr(raw.habits, 3),
      generatedAt: new Date().toISOString(),
    };
    return canonFilled(canon) ? canon : null;
  } catch {
    return null;
  }
}

export async function generateCanon(
  cfg: LlmConfig,
  passport: CharacterPassport,
  world: "A" | "B" | "C",
  lang: Lang,
): Promise<{ ok: boolean; canon?: ModelCanon; error?: string }> {
  const res = await chatLlm(
    cfg,
    [{ role: "user", text: buildCanonLlmPrompt(passport, world, lang) }],
    700,
  );
  if (!res.ok) return { ok: false, error: res.error };
  const canon = parseCanonText(res.text);
  return canon ? { ok: true, canon } : { ok: false, error: "empty" };
}

// --- One quiet nudge after the FIRST built feed, shown exactly once ----------

const NUDGE_KEY = "ios_canon_nudge";

export function canonNudgeSeen(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(NUDGE_KEY) === "1";
}

export function markCanonNudgeSeen(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(NUDGE_KEY, "1");
}

