// Fix Pack 8 — demo character (B1). A fully fictional persona with her own
// Anomaly Lock, shared by the landing live demo and the one-tap studio
// example. She is not based on any real person and contains no private
// character data. Two "worlds" showcase the product range: raw UGC diary
// realism and staged cinematic Americana.

import { emptySceneSpec } from "./scene";
import type { CharacterPassport, EngineId, Lang, SceneSpec } from "./types";

export const DEMO_CHARACTER_ID = "demo_june";

export const DEMO_CHARACTER: CharacterPassport = {
  schemaVersion: 1,
  id: DEMO_CHARACTER_ID,
  name: "June (demo)",
  createdAt: "2026-07-11T00:00:00.000Z",
  updatedAt: "2026-07-11T00:00:00.000Z",
  identity: {
    full: "young woman in her early twenties, soft oval face, wide-set grey-green eyes, dark blonde hair with grown-out roots tucked behind one ear, light natural brows, faint smile lines, small silver stud earrings, relaxed unhurried presence",
    mid: "young woman, soft oval face, grey-green eyes, dark blonde hair tucked behind one ear",
    micro: "young woman, grey-green eyes, dark blonde hair",
  },
  // Empty device string means the builder falls back to the canon device.
  device: "",
  anomalyLock: {
    checkboxes: [],
    freeText:
      "Small chip on the corner of the left front tooth, visible when she smiles. Faint diagonal scar through the tail of the right eyebrow. Single dimple on the left cheek only. Three small moles in a line on the right side of the neck. Do not normalize or correct these features.",
    json: {},
  },
  faceAdherence: { static: 0.8, motion: 0.6 },
  referencePhotos: [],
  visionSummary: "",
};

export type DemoScene = {
  id: string;
  label: Record<Lang, string>;
  fields: Pick<SceneSpec, "location" | "lighting" | "pose" | "outfit" | "mood">;
  capture: SceneSpec["capture"];
  style: string[];
};

export type DemoWorld = {
  id: "diary" | "americana";
  label: Record<Lang, string>;
  tagline: Record<Lang, string>;
  scenes: DemoScene[];
};

export const DEMO_WORLDS: DemoWorld[] = [
  {
    id: "diary",
    label: { ru: "Дневник", en: "Diary" },
    tagline: {
      ru: "Сырой UGC-реализм: как кадры с телефона подруги",
      en: "Raw UGC realism: like frames from a friend's phone",
    },
    scenes: [
      {
        id: "diary_sun",
        label: { ru: "Свет на полу", en: "Sunlight on the floor" },
        fields: {
          location: "bedroom floor by the window",
          lighting: "hard morning sunlight stripes",
          pose: "sitting cross-legged, looking at the light",
          outfit: "oversized worn t-shirt",
          mood: "unhurried, private",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["tilt", "crop"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "diary_mirror",
        label: { ru: "Зеркало", en: "Smudged mirror" },
        fields: {
          location: "small bathroom with a smudged mirror",
          lighting: "single warm bulb overhead",
          pose: "mirror selfie, phone covering half the face",
          outfit: "yesterday's hoodie",
          mood: "second-day hair, honest",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["motion"],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "diary_fitting",
        label: { ru: "Примерочная", en: "Fitting room" },
        fields: {
          location: "store fitting room",
          lighting: "flat LED light",
          pose: "mid-adjustment, fixing a sleeve, caught between poses",
          outfit: "half-tried outfit with price tags",
          mood: "candid, in-between",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["miss_foc"],
          film: "",
        },
        style: ["ugc_raw"],
      },
    ],
  },
  {
    id: "americana",
    label: { ru: "Американа", en: "Americana" },
    tagline: {
      ru: "Постановочное кино-табло: насыщенный цвет, дедпэн",
      en: "Staged film-still tableau: saturated color, deadpan",
    },
    scenes: [
      {
        id: "amer_motel",
        label: { ru: "Мотель", en: "Motel at dusk" },
        fields: {
          location: "roadside motel doorway at dusk, neon vacancy sign",
          lighting: "mixed neon and warm tungsten light",
          pose: "standing still in the doorway, deadpan stare",
          outfit: "silk robe and heeled slippers",
          mood: "staged film-still calm, quiet suburban unease",
        },
        capture: {
          cap: "",
          opt: "",
          expo: ["mixed_wb"],
          imperf: [],
          film: "gold",
        },
        style: ["fashion"],
      },
      {
        id: "amer_market",
        label: { ru: "Супермаркет", en: "Supermarket" },
        fields: {
          location: "supermarket aisle",
          lighting: "flat fluorescent overhead light",
          pose: "leaning on a shopping cart, chin up, blank deadpan expression",
          outfit: "pastel sixties dress, set hair with rollers",
          mood: "drama of the mundane, saturated film-still",
        },
        capture: { cap: "", opt: "", expo: [], imperf: [], film: "portra" },
        style: ["fashion"],
      },
      {
        id: "amer_pool",
        label: { ru: "Бассейн", en: "Poolside" },
        fields: {
          location: "vintage motel pool with plastic sun loungers",
          lighting: "harsh afternoon sun, hard shadows",
          pose: "lying motionless on a lounger in sunglasses, staring at the sky",
          outfit: "retro one-piece swimsuit and a swim cap",
          mood: "saturated technicolor stillness",
        },
        capture: { cap: "", opt: "", expo: ["over"], imperf: [], film: "gold" },
        style: ["fashion"],
      },
    ],
  },
];

/** Build a full SceneSpec for a demo scene. */
export function demoSpec(
  scene: DemoScene,
  engine: EngineId = "nano_pro",
): SceneSpec {
  const spec = emptySceneSpec(
    engine === "nano_pro" ? "photo" : "video",
    engine,
  );
  spec.subject.characterId = DEMO_CHARACTER_ID;
  spec.location = scene.fields.location;
  spec.lighting = scene.fields.lighting;
  spec.pose = scene.fields.pose;
  spec.outfit = scene.fields.outfit;
  spec.mood = scene.fields.mood;
  spec.capture = {
    ...scene.capture,
    expo: [...scene.capture.expo],
    imperf: [...scene.capture.imperf],
  };
  spec.style = [...scene.style];
  if (engine !== "nano_pro") {
    spec.motion = {
      action: "subtle natural movement, she holds the moment",
      intensity: 0.4,
      cameraMove: "static handheld",
    };
  }
  return spec;
}

/** Scene text used when loading the demo into the studio scene field. */
export const DEMO_SCENE_TEXT: Record<Lang, string> = {
  ru: "девушка сидит на полу спальни у окна, жёсткое утреннее солнце полосами на полу, растянутая футболка, спокойно",
  en: "girl sitting on the bedroom floor by the window, hard morning sunlight stripes on the floor, oversized t-shirt, calm mood",
};

// ---------------------------------------------------------------------------
// Fix Pack 15 — §2-safe public prompt display helpers. Public surfaces
// (landing hero, live demo) never render the full prompt readable: only the
// teaser head is shown, the tail stays blurred and Copy hands out the teaser.
// Pure functions, unit-tested in selfcheck.
// ---------------------------------------------------------------------------

export const TEASER_WORDS = 32;

/** Split a prompt after the first `words` words: [readable head, hidden tail]. */
export function teaserSplit(
  prompt: string,
  words: number = TEASER_WORDS,
): [string, string] {
  let count = 0;
  const re = /\S+/g;
  let m: RegExpExecArray | null = re.exec(prompt);
  while (m) {
    count += 1;
    if (count === words) {
      const idx = m.index + m[0].length;
      return [prompt.slice(0, idx), prompt.slice(idx)];
    }
    m = re.exec(prompt);
  }
  return [prompt, ""];
}

/** Copy-safe teaser: the first words plus an ellipsis. */
export function makeTeaser(
  prompt: string,
  words: number = TEASER_WORDS,
): string {
  const [head, tail] = teaserSplit(prompt, words);
  return tail.trim().length > 0 ? `${head.trim()} …` : head.trim();
}

/** Split a built prompt into display blocks for the landing hero animation. */
export function splitPromptBlocks(prompt: string): string[] {
  let blocks = prompt
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  if (blocks.length < 2) {
    blocks = prompt
      .split(/\n/)
      .map((b) => b.trim())
      .filter(Boolean);
  }
  if (blocks.length < 2) {
    blocks = prompt
      .split(/(?<=[.!?])\s+/)
      .map((b) => b.trim())
      .filter(Boolean);
  }
  return blocks;
}

// ---------------------------------------------------------------------------
// Fix Pack 16 — showcase mode. True when the studio was opened with ?demo=1:
// the demo character + scene load automatically so screenshots and marketing
// videos have something to show. Prod behavior without the flag is untouched.
// ---------------------------------------------------------------------------

export function isDemoMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).get("demo") === "1";
  } catch {
    return false;
  }
}

