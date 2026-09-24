// ============================================================================
// Fix Pack 11.2 — CAPTIONS: generated together with the prompt, per world.
// A: lowercase 1–3 words · B: empty or one word · C: a short film-still title.
// Zero hashtags. The «⚙» popover switches captions off; Fix Pack 11.3
// (Canon) will replace the pools with the model's own caption voice.
// Posting rhythm: feed frames drop in day batches, like real accounts.
// ============================================================================

import { canonCaptions } from "./canon";
import { pick } from "./shoot";
import type { Lang, ModelCanon } from "./types";

export type World = "A" | "B" | "C";
export type CaptionRole = "hero" | "detail" | "cutaway" | "off";

export const CAPTION_POOLS: Record<World, Record<Lang, string[]>> = {
  A: {
    ru: ["ещё дома", "утро??", "4am", "ну такое", "день никакой", "жива"],
    en: ["still home", "morning??", "4am", "idk", "slow day", "alive"],
  },
  B: {
    ru: ["", "двор", "", "ночь", ""],
    en: ["", "yard", "", "night", ""],
  },
  C: {
    ru: [
      "motel, room 4",
      "casting day",
      "suburbia, 3pm",
      "лето, напечатано",
      "polaroid, '95",
    ],
    en: [
      "motel, room 4",
      "casting day",
      "suburbia, 3pm",
      "summer, printed",
      "polaroid, '95",
    ],
  },
};

export const CUTAWAY_CAPTIONS: Record<Lang, string[]> = {
  ru: ["", "тут", "свет", ""],
  en: ["", "here", "light", ""],
};

/** Deterministic caption for a frame. Empty string = post without caption. */
export function caption(
  world: World,
  role: CaptionRole,
  i: number,
  lang: Lang,
  canon?: ModelCanon | null,
): string {
  if (role === "off") return "…";
  if (role === "cutaway") return pick(CUTAWAY_CAPTIONS[lang], i);
  // Fix Pack 11.3: her own words replace the world pool on hero/detail frames.
  const own = canonCaptions(canon);
  if (own.length > 0) return pick(own, i);
  return pick(CAPTION_POOLS[world][lang], i);
}

export function dayLabel(day: number, lang: Lang): string {
  return (lang === "ru" ? "день " : "day ") + day;
}

/** Posting rhythm: batches of 1–3 frames per day, gaps between drop days. */
export const DAY_BATCHES = [2, 1, 3, 2, 2, 1];
export const DAY_GAPS = [1, 2, 1, 3, 1, 2];

export function assignDays(count: number): number[] {
  const days: number[] = [];
  let day = 1;
  let bi = 0;
  while (days.length < count) {
    const batch = DAY_BATCHES[bi % DAY_BATCHES.length];
    for (let j = 0; j < batch && days.length < count; j++) days.push(day);
    day += DAY_GAPS[bi % DAY_GAPS.length];
    bi++;
  }
  return days;
}

// ============================================================================
// Fix Pack 16 — FEED VOICE: caption FORMATS from the profile atlas become
// post formats: photo-dump, unsent sms, archive numbering. Mostly "plain"
// (the world pool / canon voice); the rhythm drops a special format roughly
// every third–fourth frame. Deterministic, like everything else here.
// ============================================================================

export type CaptionVoice = "plain" | "dump" | "sms" | "archive";

export const VOICE_RHYTHM: CaptionVoice[] = [
  "plain",
  "plain",
  "archive",
  "plain",
  "plain",
  "dump",
  "plain",
  "sms",
];

export function voiceFor(i: number, seed: number): CaptionVoice {
  return pick(VOICE_RHYTHM, i + seed);
}

export const DUMP_CAPTIONS: Record<Lang, string[]> = {
  ru: [
    "то, что забыла выложить",
    "фотодамп, без порядка",
    "с телефона, не отбирала",
  ],
  en: [
    "things I forgot to post",
    "photo dump, no order",
    "camera roll, unsorted",
  ],
};

export const SMS_CAPTIONS: Record<Lang, string[]> = {
  ru: [
    "не отправила: «я на месте»",
    "черновик: «наберу позже»",
    "не отправила: «спишь?»",
  ],
  en: ["unsent: “i'm here”", "draft: “call you later”", "unsent: “you up?”"],
};

/** Archive numbering caption: 0347.jpg — deterministic from the seed. */
export function archiveName(n: number): string {
  const num = 100 + (((((n + 1) * 97) % 900) + 900) % 900);
  return `${String(num).padStart(4, "0")}.jpg`;
}

/** Caption for a non-plain voice; plain falls back to caption(). */
export function voiceCaption(
  voice: CaptionVoice,
  n: number,
  lang: Lang,
): string {
  if (voice === "archive") return archiveName(n);
  if (voice === "dump") return pick(DUMP_CAPTIONS[lang], n);
  if (voice === "sms") return pick(SMS_CAPTIONS[lang], n);
  return "";
}

/** Short UI mark for the voice format; empty for plain. */
export function voiceLabel(voice: CaptionVoice, lang: Lang): string {
  const m: Record<CaptionVoice, Record<Lang, string>> = {
    plain: { ru: "", en: "" },
    dump: { ru: "дамп", en: "dump" },
    sms: { ru: "смс", en: "sms" },
    archive: { ru: "архив", en: "archive" },
  };
  return m[voice][lang];
}

