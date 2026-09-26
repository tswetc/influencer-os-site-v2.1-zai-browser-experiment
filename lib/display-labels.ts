import type { Lang } from "./types";

const ENGINE: Record<string, string> = {
  nano_pro: "Nano Banana Pro",
  kling_3: "Kling 3.0",
  seedance_2: "Seedance 2.5",
  veo_scene: "Veo 3.1",
  veo_broll: "Veo 3.1 · B-roll",
  omni_flash: "Gemini Omni Flash",
};

const PROVIDER: Record<string, { ru: string; en: string }> = {
  anthropic: { ru: "Anthropic", en: "Anthropic" },
  openai: { ru: "OpenAI", en: "OpenAI" },
  gemini: { ru: "Gemini", en: "Gemini" },
  openrouter: { ru: "OpenRouter", en: "OpenRouter" },
  custom: { ru: "Свой", en: "Custom" },
};

const STYLE: Record<string, string> = {
  ugc_raw: "Raw UGC",
  fashion: "Fashion",
  luxury: "Quiet luxury",
  travel: "Travel",
  fitness: "Fitness",
  dating: "Dating",
  selfie: "Selfie",
  lifestyle: "Lifestyle",
};

const REALISM: Record<string, { ru: string; en: string }> = {
  anti_b: { ru: "Без beauty filter", en: "No beauty filter" },
  sensor: { ru: "Шум сенсора", en: "Sensor texture" },
  skin: { ru: "Естественная кожа", en: "Natural skin" },
  no_ai: { ru: "Без AI-артефактов", en: "No AI artifacts" },
  imperf: { ru: "Естественные несовершенства", en: "Natural imperfections" },
};

const CAPTURE: Record<string, string> = {
  iphone_hdr: "iPhone · Smart HDR",
  raw_dslr: "Full-frame RAW",
  film_35mm: "35mm film",
  film_16mm: "16mm film",
  polaroid: "Polaroid",
  disposable: "Disposable camera",
  cctv: "CCTV / webcam",
  gopro: "GoPro",
};

const OPTICS: Record<string, string> = {
  lens_35: "35mm",
  lens_50: "50mm",
  lens_85: "85mm portrait",
  wide: "Wide-angle",
  bokeh: "Shallow DOF",
};

const EXPOSURE: Record<string, string> = {
  over: "Overexposed",
  under: "Underexposed",
  high_iso: "High ISO",
  mixed_wb: "Mixed WB",
  glare: "Flare / glare",
};

const IMPERFECTION: Record<string, string> = {
  tilt: "Tilted horizon",
  motion: "Motion blur",
  miss_foc: "Missed focus",
  chroma: "Chromatic aberration",
  vignette: "Vignette",
  film_dust: "Film dust",
  jpeg: "JPEG artifacts",
  crop: "Imperfect crop",
};

const FILM: Record<string, string> = {
  portra: "Portra 400",
  gold: "Kodak Gold 200",
  fuji: "Fujifilm",
  log: "Log / ungraded",
  vintage: "Vintage fade",
};

export function engineLabel(id: string): string {
  return ENGINE[id] ?? id;
}

export function modeLabel(id: string, lang: Lang): string {
  if (id === "photo") return lang === "ru" ? "Фото" : "Photo";
  if (id === "video") return lang === "ru" ? "Видео" : "Video";
  if (id === "all") return lang === "ru" ? "Все" : "All";
  return id;
}

export function providerLabel(id: string, lang: Lang): string {
  return PROVIDER[id]?.[lang] ?? PROVIDER[id]?.en ?? id;
}

export function roleLabel(id: string, lang: Lang): string {
  if (id === "hero") return "hero";
  if (id === "detail") return lang === "ru" ? "деталь" : "detail";
  if (id === "cutaway") return "B-roll";
  if (id === "off") return "OFF";
  return id;
}

export function styleLabel(id: string): string {
  return STYLE[id] ?? id;
}

export function realismLabel(id: string, lang: Lang): string {
  return REALISM[id]?.[lang] ?? REALISM[id]?.en ?? id;
}

export function captureLabel(id: string): string {
  return CAPTURE[id] ?? id;
}

export function opticsLabel(id: string): string {
  return OPTICS[id] ?? id;
}

export function exposureLabel(id: string): string {
  return EXPOSURE[id] ?? id;
}

export function imperfectionLabel(id: string): string {
  return IMPERFECTION[id] ?? id;
}

export function filmLabel(id: string): string {
  return FILM[id] ?? id;
}
