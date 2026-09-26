// Curated scene templates: rotating placeholder examples + one-tap «Example».
// Every term is covered by the parser (NM dictionary, RULES, EN aliases),
// so templates decompose into clean Scene Spec fields and auto-tags.

import type { EngineId, Lang, Mode } from "./types";

export type SceneTemplate = {
  id: string;
  mode: Mode;
  engine: EngineId;
  label: Record<Lang, string>;
  text: Record<Lang, string>;
};

export const TEMPLATES: SceneTemplate[] = [
  {
    id: "tpl_taxi_rain",
    mode: "photo",
    engine: "nano_pro",
    label: { ru: "Дождь и такси", en: "Taxi in the rain" },
    text: {
      ru: "девушка в такси, дождь, неон, отражение в окне, задумчивый взгляд",
      en: "girl in a taxi, rain, neon lights, reflection in the window, pensive look",
    },
  },
  {
    id: "tpl_candle_polaroid",
    mode: "photo",
    engine: "nano_pro",
    label: { ru: "Полароид при свечах", en: "Candlelight polaroid" },
    text: {
      ru: "девушка при свечах, полароид, платье, ностальгия",
      en: "girl by candlelight, polaroid style, dress, nostalgic mood",
    },
  },
  {
    id: "tpl_snow_city",
    mode: "photo",
    engine: "nano_pro",
    label: { ru: "Снег в городе", en: "Snowy city" },
    text: {
      ru: "девушка на улице города, снег, пальто, смеётся, уютно",
      en: "girl on a city street, snow, coat, laughing, cozy mood",
    },
  },
  {
    id: "tpl_museum_stairs",
    mode: "photo",
    engine: "nano_pro",
    label: { ru: "Лестница музея", en: "Museum stairs" },
    text: {
      ru: "девушка на лестнице в музее, пальто, через плечо, загадочно",
      en: "girl on the stairs in a museum, coat, over the shoulder, mysterious mood",
    },
  },
  {
    id: "tpl_pool_sunrise",
    mode: "photo",
    engine: "nano_pro",
    label: { ru: "Рассвет у бассейна", en: "Pool at sunrise" },
    text: {
      ru: "девушка у бассейна на рассвете, купальник, отражение, спокойно",
      en: "girl by the pool at sunrise, swimsuit, reflection, calm mood",
    },
  },
  {
    id: "tpl_fog_lake",
    mode: "photo",
    engine: "nano_pro",
    label: { ru: "Туман у озера", en: "Foggy lake" },
    text: {
      ru: "девушка у озера, туман, худи, серьёзный взгляд, загадочно",
      en: "girl by the lake, fog, hoodie, serious look, mysterious mood",
    },
  },
  {
    id: "tpl_morning_stretch",
    mode: "video",
    engine: "kling_3",
    label: { ru: "Утро: пробуждение", en: "Morning stretch" },
    text: {
      ru: "девушка в спальне у окна, потягивается, пижама, рассвет, спокойно",
      en: "girl in the bedroom by the window, stretching, pajamas, sunrise, calm mood",
    },
  },
  {
    id: "tpl_car_story",
    mode: "video",
    engine: "veo_scene",
    label: { ru: "Сторис в машине", en: "Car story" },
    text: {
      ru: "девушка говорит на камеру в машине, дождь, крупный план, уютно",
      en: "girl talking to the camera in a car, rain, close-up, cozy mood",
    },
  },
  {
    id: "tpl_neon_broll",
    mode: "video",
    engine: "veo_broll",
    label: { ru: "B-roll: ночной неон", en: "B-roll: night neon" },
    text: {
      ru: "улица ночного города, дождь, неон, отражение, боке, драматично",
      en: "city street at night, rain, neon lights, reflection, bokeh, dramatic mood",
    },
  },
  {
    id: "tpl_rooftop_pov",
    mode: "video",
    engine: "seedance_2",
    label: { ru: "POV: крыша", en: "Rooftop POV" },
    text: {
      ru: "вечеринка на крыше, от первого лица, гирлянда, энергично, весело",
      en: "party on a rooftop, first person, neon lights, energetic, playful mood",
    },
  },
];
