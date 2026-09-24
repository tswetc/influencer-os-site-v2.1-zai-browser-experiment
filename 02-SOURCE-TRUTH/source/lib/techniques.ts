// Fix Pack 11 - technique core. The atom of the visual system is a TECHNIQUE:
// a fixed bundle of five English phrases (camera reason, light, state, surface,
// artifact). Clusters are families of techniques; profiles are only sources.
// NO photographer or model names may ever appear in these strings.
// Film/instant terms are allowed ONLY in world "C" techniques (kitsch/cinema).

import type { Lang } from "./types";

export type World = "A" | "B" | "C";

export interface Technique {
  id: string;
  label: Record<Lang, string>;
  world: World;
  /** True for cross modifiers that mix into any world A/B pack. */
  modifier?: boolean;
  /** Why the camera is there and what holds it. */
  cameraReason: string;
  /** Motivated light source. */
  light: string;
  /** What the person is doing / feeling a second before the frame. */
  state: string;
  /** Honest texture of skin and environment. */
  surface: string;
  /** The kept imperfection that makes the frame believable. */
  artifact: string;
}

export const WORLDS: Record<
  World,
  { label: Record<Lang, string>; hint: Record<Lang, string> }
> = {
  A: {
    label: { ru: "Мир A · Diary", en: "World A · Diary" },
    hint: {
      ru: "Ситуация и быт: кадр между делами, телефон, честная цифра",
      en: "Situation and daily life: in-between frames, phone, honest digital",
    },
  },
  B: {
    label: { ru: "Мир B · Raw", en: "World B · Raw" },
    hint: {
      ru: "Жёсткий свет, бетон, ноль гламура",
      en: "Harsh light, concrete, zero glamour",
    },
  },
  C: {
    label: { ru: "Мир C · Staged", en: "World C · Staged" },
    hint: {
      ru: "Постановка и плёнка: табло, солнце, полароиды",
      en: "Staged and film: tableau, sun, polaroids",
    },
  },
};

export const TECHNIQUES: Technique[] = [
  // ---- World C: kitsch / cinema (film terms allowed here ONLY) ----
  {
    id: "t_tableau",
    label: { ru: "Табло", en: "Tableau" },
    world: "C",
    cameraReason: "static tripod frame staged like a film still",
    light: "even warm artificial glow, motel-sign color",
    state: "frozen mid-gesture, deadpan face",
    surface: "vinyl, formica, worn wallpaper",
    artifact: "one unsettling off detail inside an ordinary scene",
  },
  {
    id: "t_noon",
    label: { ru: "Полдень", en: "High noon" },
    world: "C",
    cameraReason: "35mm film frame at eye level, shot by a close friend",
    light: "harsh overhead midday sun, short deep shadows",
    state: "lazy squint, unbothered",
    surface: "hot skin with sunscreen sheen, dusty ground",
    artifact: "slight overexposure, blown highlights",
  },
  {
    id: "t_water",
    label: { ru: "У воды", en: "At the water" },
    world: "C",
    cameraReason: "waist-level candid frame from the shore",
    light: "low golden sun bouncing off the water",
    state: "mid-motion, wet hair stuck to the face",
    surface: "wet skin, salt traces, sand grit",
    artifact: "water drops on the lens",
  },
  {
    id: "t_polaroid90",
    label: { ru: "Polaroid ’95", en: "Polaroid ’95" },
    world: "C",
    cameraReason: "instant camera held by a family member",
    light: "bare ceiling bulb or built-in flash",
    state: "posing stiffly the way people posed for film",
    surface: "patterned carpet on the wall, lacquered furniture",
    artifact: "washed instant-photo colors, white frame, handwritten date",
  },
  {
    id: "t_polaroid_fit",
    label: { ru: "Полароид с примерки", en: "Fitting polaroid" },
    world: "C",
    cameraReason: "straight-on instant test shot from two meters",
    light: "flat institutional light, no styling",
    state: "neutral face, relaxed arms, measurement posture",
    surface: "plain wall, taped paper with a number",
    artifact: "instant film border, slight underexposure",
  },
  // ---- World B: underground ----
  {
    id: "t_flash",
    label: { ru: "Вспышка в лоб", en: "Direct flash" },
    world: "B",
    cameraReason: "compact camera with direct on-camera flash",
    light: "harsh frontal flash killing all depth",
    state: "caught rather than posed",
    surface: "sweaty skin shine, glossy fabric",
    artifact: "hard flash shadow outlining the body on the wall",
  },
  {
    id: "t_concrete",
    label: { ru: "Бетон", en: "Concrete" },
    world: "B",
    cameraReason: "handheld frame from a friend standing in the yard",
    light: "flat grey overcast, no sun",
    state: "still, hands in pockets, distant gaze",
    surface: "raw concrete panels, rusted metal, cracked asphalt",
    artifact: "muted desaturated palette, slightly tilted horizon",
  },
  {
    id: "t_kitchen_night",
    label: { ru: "Кухня ночью", en: "Night kitchen" },
    world: "B",
    cameraReason: "phone propped on the kitchen counter",
    light: "single practical source: open fridge or stove hood lamp",
    state: "mid-snack, unguarded, barefoot",
    surface: "chipped enamel, crumbs on the counter",
    artifact: "deep underexposure, high ISO noise",
  },
  {
    id: "t_body_landscape",
    label: { ru: "Тело в ландшафте", en: "Body in landscape" },
    world: "B",
    cameraReason: "distant tripod frame, a small figure in vast nature",
    light: "cold natural light of an empty landscape",
    state: "body as a sculptural form, face hidden or turned away",
    surface: "bare skin against grass, rock, soil",
    artifact: "a slight surreal wrongness in the pose",
  },
  {
    id: "t_wall",
    label: { ru: "У стены", en: "Against the wall" },
    world: "B",
    cameraReason: "straight-on casting frame at chest height",
    light: "one directional window or lamp light",
    state: "held still for the camera, eyes straight into the lens",
    surface: "bare scuffed wall, no set dressing",
    artifact: "visible test-shoot plainness, no retouch",
  },
  // ---- World A: diary / situation ----
  {
    id: "t_lie_home",
    label: { ru: "Лежу дома", en: "Lying at home" },
    world: "A",
    cameraReason: "phone held above the face while lying down",
    light: "soft window daylight across the bed",
    state: "heavy-lidded, between sleep and scrolling",
    surface: "creased sheets, pillow crease on the cheek",
    artifact: "slightly missed focus",
  },
  {
    id: "t_fitting",
    label: { ru: "Примерочная", en: "Fitting room" },
    world: "A",
    cameraReason: "mirror phone shot inside a store cabin",
    light: "flat LED strip from above",
    state: "mid-adjustment, caught between poses",
    surface: "price tags, pins, clothes half on",
    artifact: "mirror smudges, imperfect framing",
  },
  {
    id: "t_mirror",
    label: { ru: "Зеркало", en: "Mirror" },
    world: "A",
    cameraReason: "phone mirror selfie, phone covering part of the face",
    light: "single warm bathroom bulb",
    state: "checking rather than posing",
    surface: "toothpaste specks on the mirror glass",
    artifact: "flash bounce in the mirror",
  },
  {
    id: "t_cup",
    label: { ru: "Чашка", en: "Cup" },
    world: "A",
    cameraReason: "arm-length frame, the cup entering the frame edge",
    light: "morning window light on the steam",
    state: "just woke up, first sip, eyes elsewhere",
    surface: "chipped mug, ring stains on the table",
    artifact: "steam softening the focus",
  },
  {
    id: "t_shower",
    label: { ru: "Душ и пар", en: "Shower steam" },
    world: "A",
    cameraReason: "phone shot through fogged glass or mirror",
    light: "warm bathroom light diffused by steam",
    state: "wet hair pushed back, no makeup",
    surface: "condensation drops, fogged glass",
    artifact: "lens fog blooming the highlights",
  },
  {
    id: "t_4am",
    label: { ru: "4 утра", en: "4am" },
    world: "A",
    cameraReason: "front camera in the dark, screen as the only mirror",
    light: "phone screen glow or a single lamp",
    state: "insomniac honesty, tired eyes",
    surface: "dark room, tangled blanket",
    artifact: "heavy noise, crushed blacks",
  },
  {
    id: "t_screen",
    label: { ru: "Экран-в-экране", en: "Screen in screen" },
    world: "A",
    cameraReason: "photo of a screen or camera display showing a photo",
    light: "screen glow mixed with room light",
    state: "archival distance, an image inside an image",
    surface: "pixels, interface elements, camera UI frame",
    artifact: "moire, timestamp, battery icon",
  },
  {
    id: "t_ultrawide",
    label: { ru: "0.5x", en: "0.5x ultrawide" },
    world: "A",
    cameraReason: "0.5x ultra-wide phone lens held too close",
    light: "any available light, unflattering and honest",
    state: "playing with the distortion, not hiding it",
    surface: "stretched edges of the room",
    artifact: "barrel distortion, warped proportions",
  },
  {
    id: "t_blur",
    label: { ru: "Смаз", en: "Motion blur" },
    world: "A",
    cameraReason: "slow shutter in dim light, handheld",
    light: "dim warm interior light",
    state: "mid-movement, face slightly ghosted",
    surface: "light trails on the highlights",
    artifact: "deliberate motion blur kept as mood",
  },
  {
    id: "t_grimace",
    label: { ru: "Гримаса", en: "Grimace" },
    world: "A",
    cameraReason: "front camera at a deliberately bad angle",
    light: "flat unflattering light",
    state: "exaggerated grimace instead of a smile",
    surface: "close skin honesty, no retouch",
    artifact: "comic wide-angle closeness",
  },
  {
    id: "t_transit",
    label: { ru: "Транзит", en: "Transit" },
    world: "A",
    cameraReason: "phone selfie or window-seat frame in transit",
    light: "flickering carriage light or window daylight",
    state: "tired in-between-places gaze, headphones in",
    surface: "scratched glass, worn seat fabric",
    artifact: "reflections layered on the window",
  },
  {
    id: "t_squint",
    label: { ru: "Прищур", en: "Squint" },
    world: "A",
    cameraReason: "close frame right against low sunlight",
    light: "low golden sun striping across the face",
    state: "eyes squinting into the light, half-smile",
    surface: "sun-lit skin texture, flyaway hairs",
    artifact: "lens flare, one blown highlight stripe",
  },
  // ---- Cross modifiers (mix into any world A/B pack) ----
  {
    id: "t_fragility",
    label: { ru: "Хрупкость", en: "Fragility" },
    world: "A",
    modifier: true,
    cameraReason: "slightly farther than comfortable, giving the subject air",
    light: "pale soft daylight",
    state: "thin-skinned quiet, guard down",
    surface: "goosebumps, fine vellus hair visible",
    artifact: "pale muted palette",
  },
  {
    id: "t_deadpan",
    label: { ru: "Deadpan", en: "Deadpan" },
    world: "A",
    modifier: true,
    cameraReason: "centered symmetrical frame",
    light: "even flat light",
    state: "zero expression, held eye contact",
    surface: "an orderly banal setting",
    artifact: "tension from nothing happening",
  },
];

export const TECHNIQUE_BY_ID: Record<string, Technique> = Object.fromEntries(
  TECHNIQUES.map((t) => [t.id, t]),
);

/** One-line English text of a technique: the five phrases joined. */
export function techniqueText(t: Technique): string {
  return [t.cameraReason, t.light, t.state, t.surface, t.artifact]
    .filter(Boolean)
    .join(", ");
}

// Series x6: six frames of ONE technique with state/artifact variations.
// Variation phrases are appended to the scene; identity and world stay fixed.
export const SERIES_SHIFTS: string[] = [
  "",
  "same scene, eyes closed, breath out",
  "same scene, glance off-frame, a touch of motion blur",
  "same scene, detail crop: hands and the object",
  "same scene, a step back, wider environmental frame",
  "same scene, the artifact turned up one notch",
];

/** Six prompt-ready scene fragments for a technique series. */
export function techniqueSeries(t: Technique): string[] {
  const base = techniqueText(t);
  return SERIES_SHIFTS.map((s) => (s ? `${base}, ${s}` : base));
}

