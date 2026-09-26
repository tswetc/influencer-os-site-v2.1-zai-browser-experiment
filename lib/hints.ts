// ============================================================================
// Fix Pack 11.2 — «💡 Подсказки»: an optional teaching layer, one toggle.
// Each hint is a single line shown at the FIRST step of an action and only
// once. FP22: strictly opt-in - OFF by default, enabled in Settings.
// ============================================================================

import type { Lang } from "./types";

export type HintId =
  "format" | "size" | "worlds" | "mix" | "cutaway" | "broken";

export const HINTS: Record<HintId, Record<Lang, string>> = {
  format: {
    ru: "Формат — что вы получите: один кадр, серию одного приёма, съёмку одного места или кусок ленты целиком.",
    en: "Format is what you get: one frame, a one-technique series, a one-location shoot, or a whole feed slice.",
  },
  size: {
    ru: "Ползунок — размер выбранного формата. Состав (hero · детали · B-roll) считается сам.",
    en: "The slider sets the size of the chosen format. The mix of hero · details · B-roll is derived automatically.",
  },
  worlds: {
    ru: "Мир — пласт эстетики: Diary (дневник), Raw (андеграунд), Staged (постановка). Одна лента = один мир.",
    en: "A world is an aesthetic layer: Diary, Raw, Staged. One feed = one world.",
  },
  mix: {
    ru: "Паки внутри одного мира миксуются свободно. Чужой мир добавится — но лента будет помечена.",
    en: "Packs inside one world mix freely. A foreign world can be added — but the feed gets flagged.",
  },
  cutaway: {
    ru: "B-roll — кадры без человека (~каждый пятый). Так живут реальные профили.",
    en: "B-roll is footage without the person (~every fifth frame). Real profiles live like this.",
  },
  broken: {
    ru: "Один кадр ленты нарочно нарушает одно правило Codex — стерильная лента выдаёт ИИ.",
    en: "One frame per feed deliberately breaks one Codex rule — a sterile feed reads as AI.",
  },
};

// ============================================================================
// Fix Pack 16.1 — b-roll no-people guard (soft). B-roll is a no-people shot
// by canon; when the action text mentions a person, the UI shows a yellow
// hint. Never blocks generation.
// ============================================================================

const PERSON_WORDS = [
  "she",
  "he",
  "her",
  "his",
  "him",
  "woman",
  "man",
  "girl",
  "guy",
  "boy",
  "lady",
  "person",
  "people",
  "model",
  "herself",
  "himself",
];

/** Returns the first person word found in the action text, or null. */
export function personWordIn(text: string): string | null {
  const words = text.toLowerCase().split(/[^a-z']+/);
  for (const w of PERSON_WORDS) if (words.includes(w)) return w;
  return null;
}

const ON_KEY = "ios_hints_on";
const SEEN_KEY = "ios_hints_seen";

export function hintsOn(): boolean {
  if (typeof window === "undefined") return false;
  return (window.localStorage.getItem(ON_KEY) ?? "0") === "1";
}

export function setHintsOn(on: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ON_KEY, on ? "1" : "0");
}

export function seenHints(): HintId[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SEEN_KEY);
    return raw ? (JSON.parse(raw) as HintId[]) : [];
  } catch {
    return [];
  }
}

export function markHintSeen(id: HintId): void {
  if (typeof window === "undefined") return;
  const seen = seenHints();
  if (!seen.includes(id)) {
    window.localStorage.setItem(SEEN_KEY, JSON.stringify([...seen, id]));
  }
}

export function shouldShowHint(id: HintId): boolean {
  return hintsOn() && !seenHints().includes(id);
}

export function hintText(id: HintId, lang: Lang): string {
  return HINTS[id][lang];
}
