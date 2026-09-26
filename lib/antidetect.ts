// Fix Pack 13: content for the single "Realism / anti-detection" panel.
// Collects what used to be scattered across hints into one engine-aware
// checklist. Pure data + one selector - unit-testable in selfcheck.

import type { EngineId } from "./types";

export interface AntiTip {
  id: string;
  ru: string;
  en: string;
}

const BASE: AntiTip[] = [
  {
    id: "skin",
    ru: "Текстура кожи — главный маркер: поры, пушок, блики в T-зоне. Не «дочищать» кожу в редакторах после генерации.",
    en: "Skin texture is the #1 tell: pores, vellus hair, T-zone sheen. Do not clean the skin up in editors after generation.",
  },
  {
    id: "anomaly",
    ru: "Anomaly Lock: родинки, веснушки и асимметрия из паспорта должны совпадать от кадра к кадру — не убирать их ретушью.",
    en: "Anomaly Lock: moles, freckles and asymmetry from the passport must match across frames — never retouch them away.",
  },
  {
    id: "sensor",
    ru: "Шум сенсора и лёгкая нестабильность руки «продают» съёмку на телефон. Не подавлять шум и не стабилизировать в посте.",
    en: "Sensor noise and slight handheld shake sell the phone-shot look. Do not denoise or stabilize in post.",
  },
  {
    id: "ugc",
    ru: "UGC-конвенции: вертикаль 9:16, серия кадров с одной точки, случайные объекты в кадре. Избегать «кинематографичного» грейдинга.",
    en: "UGC conventions: vertical 9:16, a burst of frames from one spot, stray objects in frame. Avoid cinematic color grading.",
  },
  {
    id: "meta",
    ru: "Публиковать через телефон, а не оригинал файла из генератора: перезалив меняет метаданные и повторно сжимает файл.",
    en: "Post from the phone, not the raw generator file: re-uploading rewrites metadata and re-compresses the file.",
  },
];

const MOTION: AntiTip = {
  id: "motion",
  ru: "Микродвижения решают: моргание, перенос веса, паузы в речи. Идеально плавное движение выдаёт генерацию.",
  en: "Micro-motion sells it: blinking, weight shifts, speech pauses. Perfectly smooth motion gives generation away.",
};

const NEGATIVES: AntiTip = {
  id: "negatives",
  ru: "Негативный промпт уже запрещает бьюти-фильтры и искажения — не сокращать и не удалять его.",
  en: "The negative prompt already bans beauty filters and distortions — do not trim or delete it.",
};

const VIDEO_ENGINES: EngineId[] = [
  "kling_3",
  "seedance_2",
  "veo_scene",
  "veo_broll",
];
const NEGATIVE_ENGINES: EngineId[] = ["kling_3", "veo_scene", "veo_broll"];

/** Engine-aware tip list for the panel; every engine gets at least 4 tips. */
export function antiDetectTips(engine: EngineId): AntiTip[] {
  const out = [...BASE];
  if (VIDEO_ENGINES.includes(engine)) out.push(MOTION);
  if (NEGATIVE_ENGINES.includes(engine)) out.push(NEGATIVES);
  return out;
}
