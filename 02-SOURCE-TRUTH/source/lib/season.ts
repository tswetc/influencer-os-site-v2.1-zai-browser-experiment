// ============================================================================
// Fix Pack 16 — SEASON SYNC. Season + time of day derived DETERMINISTICALLY
// from the date and the canon place (no weather APIs — fragile, and 80% of
// the realism comes from season alone). The layer adds one quiet seasonal
// phrase to lighting, one wardrobe cue and one cutaway line. Also powers the
// landing “daylight header” tone.
// ============================================================================

import { pick } from "./shoot";
import type { Lang } from "./types";

export type Season = "winter" | "spring" | "summer" | "autumn";
export type Daypart = "morning" | "day" | "evening" | "night";

export function seasonOf(date: Date): Season {
  const m = date.getMonth();
  if (m === 11 || m <= 1) return "winter";
  if (m <= 4) return "spring";
  if (m <= 7) return "summer";
  return "autumn";
}

const SOUTH = [
  "australia",
  "sydney",
  "melbourne",
  "buenos aires",
  "argentina",
  "brazil",
  "rio",
  "sao paulo",
  "cape town",
  "johannesburg",
  "south africa",
  "auckland",
  "wellington",
  "new zealand",
  "santiago",
  "chile",
  "lima",
  "peru",
  "bolivia",
  "paraguay",
  "uruguay",
  "montevideo",
];

/** True when the canon place clearly lives in the southern hemisphere. */
export function isSouthern(place?: string[] | null): boolean {
  if (!place || place.length === 0) return false;
  const joined = place.join(" ").toLowerCase();
  return SOUTH.some((k) => joined.includes(k));
}

const FLIP: Record<Season, Season> = {
  winter: "summer",
  spring: "autumn",
  summer: "winter",
  autumn: "spring",
};

export function seasonFor(date: Date, place?: string[] | null): Season {
  const s = seasonOf(date);
  return isSouthern(place) ? FLIP[s] : s;
}

export function daypartOf(hour: number): Daypart {
  if (hour >= 5 && hour <= 10) return "morning";
  if (hour >= 11 && hour <= 16) return "day";
  if (hour >= 17 && hour <= 21) return "evening";
  return "night";
}

// --- Quiet seasonal phrase pools (EN, codex-compatible, no drama) -----------

export const SEASON_LIGHT: Record<Season, string[]> = {
  winter: [
    "low pale winter sun through the window",
    "early blue dusk outside the window",
    "cold grey daylight, radiators on",
  ],
  spring: [
    "thin bright spring light",
    "washed-out morning sun after rain",
    "open window light, curtains moving",
  ],
  summer: [
    "hard summer sun, deep shadows",
    "late golden evening light",
    "humid afternoon haze indoors",
  ],
  autumn: [
    "low amber autumn sun",
    "early dusk, lamps on by five",
    "flat overcast autumn daylight",
  ],
};

export const SEASON_WARDROBE: Record<Season, string[]> = {
  winter: [
    "a heavy coat thrown over the chair",
    "wool socks, sleeves pulled over hands",
    "a scarf still on indoors",
  ],
  spring: [
    "a light jacket over yesterday's tee",
    "bare ankles, first warm day",
    "a hoodie tied around the waist",
  ],
  summer: [
    "a thin cotton dress, hair up",
    "bare shoulders, sunscreen sheen",
    "yesterday's swimsuit drying on the rail",
  ],
  autumn: [
    "an oversized knit sweater",
    "a denim jacket over a hoodie",
    "boots by the door, first cold week",
  ],
};

export const SEASON_CUTAWAY: Record<Season, string[]> = {
  winter: [
    "A winter coat left over the chair back.",
    "Wet boot prints drying by the door.",
    "A mug steaming against a cold window.",
  ],
  spring: [
    "A light jacket dropped on the bed.",
    "Fresh mud on white sneakers by the door.",
    "An open window, curtain caught mid-move.",
  ],
  summer: [
    "A fan running on the floor.",
    "Half-melted ice in a glass on the sill.",
    "A swimsuit drying over the radiator.",
  ],
  autumn: [
    "A wet umbrella drying in the corner.",
    "Leaves stuck to the doormat.",
    "Tea going cold on the windowsill.",
  ],
};

export interface SeasonPhrases {
  season: Season;
  daypart: Daypart;
  light: string;
  wardrobe: string;
  cutaway: string;
}

/** Deterministic seasonal phrase set for a date + canon place + seed. */
export function seasonPhrases(
  date: Date,
  place: string[] | null | undefined,
  seed: number,
): SeasonPhrases {
  const season = seasonFor(date, place);
  const daypart = daypartOf(date.getHours());
  return {
    season,
    daypart,
    light: pick(SEASON_LIGHT[season], seed),
    wardrobe: pick(SEASON_WARDROBE[season], seed),
    cutaway: pick(SEASON_CUTAWAY[season], seed),
  };
}

const SEASON_LABEL: Record<Season, Record<Lang, string>> = {
  winter: { ru: "зима", en: "winter" },
  spring: { ru: "весна", en: "spring" },
  summer: { ru: "лето", en: "summer" },
  autumn: { ru: "осень", en: "autumn" },
};

const DAYPART_LABEL: Record<Daypart, Record<Lang, string>> = {
  morning: { ru: "утро", en: "morning" },
  day: { ru: "день", en: "day" },
  evening: { ru: "вечер", en: "evening" },
  night: { ru: "ночь", en: "night" },
};

/** One quiet UI line: “лето · вечер — сезон вшит в промпты”. */
export function seasonNote(s: SeasonPhrases, lang: Lang): string {
  const a = SEASON_LABEL[s.season][lang];
  const b = DAYPART_LABEL[s.daypart][lang];
  return lang === "ru"
    ? `${a} · ${b} — сезон её города вшит в свет и гардероб`
    : `${a} · ${b} — her city's season is baked into light and wardrobe`;
}

// --- Landing daylight header -------------------------------------------------

export interface DaylightTone {
  daypart: Daypart;
  /** Subtle top-strip gradient for the landing hero. */
  tint: string;
}

export function daylightTone(hour: number): DaylightTone {
  const daypart = daypartOf(hour);
  const tints: Record<Daypart, string> = {
    morning:
      "linear-gradient(180deg, rgba(255,244,224,0.9) 0%, rgba(255,255,255,0) 65%)",
    day: "linear-gradient(180deg, rgba(238,246,255,0.9) 0%, rgba(255,255,255,0) 65%)",
    evening:
      "linear-gradient(180deg, rgba(253,238,227,0.9) 0%, rgba(255,255,255,0) 65%)",
    night:
      "linear-gradient(180deg, rgba(233,237,246,0.95) 0%, rgba(255,255,255,0) 65%)",
  };
  return { daypart, tint: tints[daypart] };
}

