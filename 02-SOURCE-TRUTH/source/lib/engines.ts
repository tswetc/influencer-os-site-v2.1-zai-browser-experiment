// ============================================================================
// ENGINE CANON — single source of truth for all prompt-building rules.
// Components NEVER hardcode prompt logic; everything routes through here.
// Update engine rules ONLY in this file.
// ============================================================================

import { canonMood } from "./canon";
import type {
  BuildResult,
  CaptureSelection,
  CharacterPassport,
  EngineId,
  Mode,
  SceneSpec,
} from "./types";
import { wc as budgetWc } from "./parse";
import { TECHNIQUE_BY_ID, techniqueText } from "./techniques";

// ----------------------------------------------------------------------------
// CONSTANTS (canon strings — always English)
// ----------------------------------------------------------------------------

// DEV describes the character's phone as a physical prop/device (not a shooting style).
export const DEV = "black iPhone 15 Pro Max in a transparent silicone case";

export const NEG_BASE =
  "beauty filter, skin smoothing, airbrushed skin, blemish removal, pore filling, face symmetry correction, nose reshaping, matte plastic skin";

export const NEG_UGC =
  "cinematic color grading, studio lighting, gimbal stabilization, instagram filter, watermark, text, logo";

// NEG_KLING is a STANDALONE canon string. Do NOT compose it from NEG_BASE + NEG_UGC.
export const NEG_KLING =
  "clothing changes, hair style changes, de-aging, extra limbs, joint distortion, background flickering, beauty filter, skin smoothing, airbrushed skin, face symmetry correction, nose reshaping, matte plastic skin";

export const NEG_VEO = `${NEG_BASE}, ${NEG_UGC}, subtitles, text overlays, on-screen text, captions, distorted hands, lip-sync issues, unnatural movements, oversaturation`;

export const POS_SKIN =
  "natural skin texture with visible pores and fine vellus hair, subtle sebum highlights in the T-zone, natural pigmentation with moles and freckles preserved, anatomical facial asymmetry, sharp focus";

export const SENSOR =
  "subtle digital sensor noise, natural dynamic range, slight handheld imperfection";

// Negative field exists ONLY for Kling and Veo.
// Nano / Seedance / Omni Flash use POSITIVE realism (POS_SKIN / SENSOR).
export const ENGINES_WITH_NEGATIVE: EngineId[] = [
  "kling_3",
  "veo_scene",
  "veo_broll",
];

// ----------------------------------------------------------------------------
// CAPTURE PRESETS (verbatim canon .mod strings)
// ----------------------------------------------------------------------------

export const CAP: Record<string, string> = {
  iphone_hdr:
    "shot on iPhone, Smart HDR, computational photography look, slightly oversharpened",
  raw_dslr:
    "full-frame DSLR RAW capture, natural dynamic range, true-to-life color",
  film_35mm:
    "35mm film photograph, organic film grain, subtle halation, analog color",
  film_16mm: "16mm film still, heavy grain, soft gate weave",
  polaroid: "Polaroid instant photo, washed colors, soft focus, white frame",
  disposable:
    "disposable camera with direct on-camera flash, harsh shadows, slight red-eye, date stamp",
  cctv: "low-resolution webcam/CCTV frame, compression artifacts, fixed high angle",
  gopro: "GoPro ultra-wide action cam, barrel distortion, high contrast",
};

export const OPT: Record<string, string> = {
  lens_35: "35mm focal length, mild environmental context",
  lens_50: "50mm focal length, natural perspective",
  lens_85: "85mm portrait compression, shallow depth of field",
  wide: "wide-angle lens distortion, stretched edges",
  bokeh: "shallow depth of field, creamy bokeh, subject isolation",
};

export const EXPO: Record<string, string> = {
  over: "slightly overexposed, blown highlights",
  under: "underexposed, low-key shadows, crushed blacks",
  high_iso: "high ISO noise, visible sensor grain",
  mixed_wb: "mixed white balance, color temperature shift",
  glare: "lens flare and glare, light leaks",
};

export const IMPERF: Record<string, string> = {
  tilt: "slightly tilted horizon, casual framing",
  motion: "subtle motion blur, handheld shake",
  miss_foc: "slightly missed focus, soft focus point",
  chroma: "chromatic aberration on high-contrast edges",
  vignette: "natural lens vignetting",
  film_dust: "dust and scratches, film artifacts",
  jpeg: "JPEG compression artifacts, slight banding",
  crop: "imperfect framing, subject partially cropped at edge",
};

export const FILM: Record<string, string> = {
  portra: "Kodak Portra 400 palette, warm natural skin tones",
  gold: "Kodak Gold 200, warm nostalgic cast",
  fuji: "Fujifilm color science, green-leaning shadows",
  log: "flat log color profile, ungraded",
  vintage: "faded vintage look, lifted blacks",
};

// ----------------------------------------------------------------------------
// Fix Pack 11 — WORLD LAYER + TECHNIQUE GATE
// ----------------------------------------------------------------------------

// World suffixes appended to the MOOD layer. A = diary/situation, B =
// underground document, C = kitsch/cinema. Film language is allowed ONLY in C.
export const WORLD_SUFFIX: Record<"A" | "B" | "C", string> = {
  A: "unstaged phone-diary moment caught between actions, honest digital capture",
  B: "raw underground document, harsh honest light, zero glamour",
  C: "deliberately staged film-still world, every detail art-directed, one quiet wrong note",
};

// Film/instant vocabulary is a world-C privilege.
export const FILM_TERMS = [
  "film",
  "polaroid",
  "kodak",
  "fuji",
  "35mm",
  "16mm",
  "analog",
  "halation",
  "instant",
];

export function filmAllowed(world?: "A" | "B" | "C"): boolean {
  return world === "C";
}

/** Outside world C, film stocks and film-look captures are stripped. */
export function filterCaptureForWorld(
  c: CaptureSelection,
  world?: "A" | "B" | "C",
): CaptureSelection {
  if (!world || world === "C") return c;
  const filmCaps = ["film_35mm", "film_16mm", "polaroid"];
  return {
    ...c,
    film: "",
    cap: filmCaps.includes(c.cap) ? "iphone_hdr" : c.cap,
    imperf: c.imperf.filter((k) => k !== "film_dust"),
  };
}

// Hard ban-list: these must NEVER appear in any prompt-facing string.
export const BANNED_TERMS = [
  "goldin",
  "teller",
  "tillmans",
  "corinne day",
  "nadia lee cohen",
  "purienne",
  "simona kust",
  "consani",
  "schafer",
  "westwood",
  "porodina",
  "beleiu",
  "carlijn jacobs",
  "david sims",
  "heroin chic",
];

// Style tag phrases (positive, appended to MOOD / Style layer)
export const STYLE_PHRASES: Record<string, string> = {
  ugc_raw: "raw UGC look, casual unfiltered feel",
  fashion: "editorial fashion styling",
  luxury: "quiet luxury aesthetic, premium materials",
  travel: "travel content vibe, wanderlust framing",
  fitness: "fitness content energy, athletic tone",
  dating: "dating-profile candid warmth",
  selfie: "casual phone selfie framing",
  lifestyle: "everyday lifestyle authenticity",
};

// Realism toggles (positive phrases only — no beauty/airbrush contradiction)
export const REALISM_PHRASES: Record<string, string> = {
  anti_b: "no beauty filter, unretouched",
  sensor: SENSOR,
  skin: POS_SKIN,
  no_ai: "indistinguishable from a real photo, no AI artifacts",
  imperf: "small natural imperfections kept intact",
};

export const STYLE_KEYS = Object.keys(STYLE_PHRASES);
export const REALISM_KEYS = Object.keys(REALISM_PHRASES);

// ----------------------------------------------------------------------------
// ENGINE METADATA (UI cards)
// ----------------------------------------------------------------------------

export interface EngineMeta {
  id: EngineId;
  name: string;
  mode: Mode;
  role: { ru: string; en: string };
  hasNegative: boolean;
  hasSeed: boolean;
}

export const ENGINE_META: EngineMeta[] = [
  {
    id: "nano_pro",
    name: "Nano Banana Pro",
    mode: "photo",
    role: { ru: "Фото — базовый кадр", en: "Photo - the base frame" },
    hasNegative: false,
    hasSeed: false,
  },
  {
    id: "kling_3",
    name: "Kling 3.0",
    mode: "video",
    role: { ru: "Оживить фото", en: "Animate the photo" },
    hasNegative: true,
    hasSeed: false,
  },
  {
    id: "seedance_2",
    name: "Seedance 2.5",
    mode: "video",
    role: { ru: "B-roll и хуки", en: "B-roll and hooks" },
    hasNegative: false,
    hasSeed: false,
  },
  {
    id: "veo_scene",
    name: "Veo 3.1",
    mode: "video",
    role: { ru: "Диалоги и сцены", en: "Dialogue and scenes" },
    hasNegative: true,
    hasSeed: false,
  },
  {
    id: "omni_flash",
    name: "Gemini Omni Flash",
    mode: "video",
    role: { ru: "Доработать готовый клип", en: "Refine an existing clip" },
    hasNegative: false,
    hasSeed: false,
  },
];

export const VIDEO_ENGINES = ENGINE_META.filter((e) => e.mode === "video");

// Word limits per engine
export const WORD_LIMITS: Record<string, { min: number; max: number }> = {
  nano_full: { min: 150, max: 250 },
  nano_tight: { min: 80, max: 150 },
  seedance: { min: 50, max: 70 },
  veo: { min: 100, max: 150 },
};

// ----------------------------------------------------------------------------
// mods() — assemble capture presets into a technical string
// ----------------------------------------------------------------------------

export function mods(c: CaptureSelection): string {
  const parts: string[] = [];
  if (c.cap && CAP[c.cap]) parts.push(CAP[c.cap]);
  if (c.opt && OPT[c.opt]) parts.push(OPT[c.opt]);
  for (const k of c.expo) if (EXPO[k]) parts.push(EXPO[k]);
  for (const k of c.imperf) if (IMPERF[k]) parts.push(IMPERF[k]);
  if (c.film && FILM[c.film]) parts.push(FILM[c.film]);
  return parts.join(", ");
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function realismString(realism: string[]): string {
  return realism
    .map((k) => REALISM_PHRASES[k])
    .filter(Boolean)
    .join(", ");
}

function styleString(style: string[]): string {
  return style
    .map((k) => STYLE_PHRASES[k])
    .filter(Boolean)
    .join(", ");
}

/** Clamp a text to a max word count (soft — trims trailing words). */
export function wc(text: string, max: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= max) return text;
  return words.slice(0, max).join(" ");
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Approximate token count (chars/4 heuristic). */
export function approxTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function identityText(
  spec: SceneSpec,
  character: CharacterPassport | null,
  hasRef: boolean,
): string {
  // Principle: replication > description. Ref present => micro lock.
  if (hasRef) {
    const micro = character?.identity.micro || "same as reference (photo 1)";
    return micro;
  }
  const level = spec.subject.identityLevel;
  if (character) {
    if (level === "full" && character.identity.full)
      return character.identity.full;
    if (level === "mid" && character.identity.mid)
      return character.identity.mid;
    if (character.identity.micro) return character.identity.micro;
  }
  return "consistent character identity as described";
}

export function anomalyText(character: CharacterPassport | null): string {
  if (!character) return "";
  const parts: string[] = [];
  const cb = character.anomalyLock.checkboxes;
  const CB_PHRASES: Record<string, string> = {
    moles: "natural moles preserved in exact positions",
    freckles: "light freckles preserved",
    asymmetry: "slight natural facial asymmetry preserved",
    scar: "small scar preserved",
    heterochromia: "heterochromia preserved",
    uneven_teeth: "slightly uneven teeth preserved",
    skin_texture: "real skin texture preserved",
  };
  for (const k of cb) if (CB_PHRASES[k]) parts.push(CB_PHRASES[k]);
  if (character.anomalyLock.freeText.trim())
    parts.push(character.anomalyLock.freeText.trim());
  return parts.join(", ");
}

const INTENSITY_PHRASE: Record<string, string> = {
  "0.3": "subtle restrained motion",
  "0.5": "natural moderate motion",
  "0.7": "lively pronounced motion",
};

// ----------------------------------------------------------------------------
// build() per engine
// ----------------------------------------------------------------------------

export interface BuildOptions {
  character: CharacterPassport | null;
  hasReference: boolean;
  compress: boolean; // Nano tight mode
  variants: number; // 1..4
}

/**
 * [1] Nano Banana Pro (PHOTO). Reasoning model. NO seed, NO negative.
 * Block order (strict): IDENTITY -> SCENE/POSE -> CLOTHING -> ANOMALY ANCHOR -> TECHNICAL -> MOOD.
 * Key info duplicated at START and END (U-attention).
 */
function buildNano(spec: SceneSpec, opts: BuildOptions): BuildResult[] {
  const identity = identityText(spec, opts.character, opts.hasReference);
  const scenePose = [spec.location, spec.lighting, spec.pose]
    .filter(Boolean)
    .join(", ");
  const clothing = spec.outfit || "casual everyday outfit";
  const anomaly = anomalyText(opts.character);
  const device = opts.character?.device || DEV;
  const technical = [
    device,
    mods(filterCaptureForWorld(spec.capture, spec.world)),
    realismString(spec.realism),
  ]
    .filter(Boolean)
    .join(", ");
  // Fix Pack 11.3: "who she is" appended to MOOD so every prompt carries her archetype.
  const moodCanon = canonMood(opts.character?.canon);
  const mood = [
    spec.mood,
    styleString(spec.style),
    spec.world ? WORLD_SUFFIX[spec.world] : "",
    moodCanon || "",
  ]
    .filter(Boolean)
    .join(", ");

  const limit = opts.compress ? WORD_LIMITS.nano_tight : WORD_LIMITS.nano_full;

  const variantAngles = [
    "",
    "slightly different camera angle, same scene",
    "alternative natural light direction, same scene",
    "reframed composition, same scene",
  ];

  const results: BuildResult[] = [];
  for (let v = 0; v < opts.variants; v++) {
    const blocks = [
      `IDENTITY: ${identity}.`,
      `SCENE/POSE: ${scenePose || "natural candid moment"}${variantAngles[v] ? ", " + variantAngles[v] : ""}.`,
      // Fix Pack 11: the technique bundle (camera reason + light + state +
      // surface + artifact) is one indivisible atom of the visual system.
      // Fix Pack 12: modifier layers (Fragile / Deadpan) ride on top of the
      // scene technique as extra phrases inside the same TECHNIQUE block.
      (() => {
        const parts: string[] = [];
        if (spec.technique && TECHNIQUE_BY_ID[spec.technique])
          parts.push(techniqueText(TECHNIQUE_BY_ID[spec.technique]));
        for (const m of spec.modifiers || [])
          if (TECHNIQUE_BY_ID[m] && m !== spec.technique)
            parts.push(techniqueText(TECHNIQUE_BY_ID[m]));
        return parts.length > 0 ? `TECHNIQUE: ${parts.join(", ")}.` : "";
      })(),
      `CLOTHING: ${clothing}.`,
      // Fix Pack 10 - B2: the product is described, never drives face/location.
      spec.product ? `PRODUCT: ${spec.product}.` : "",
      anomaly ? `ANOMALY ANCHOR: ${anomaly}.` : "",
      `TECHNICAL: ${technical}.`,
      `MOOD: ${mood || "calm, candid"}.`,
      // U-attention: duplicate key info at the END
      `(key: ${identity}, ${spec.lighting || "natural light"}, ${POS_SKIN.split(",")[0]})`,
    ].filter(Boolean);
    const clamped = budgetWc(blocks.join(" "), limit.min, limit.max);
    results.push({
      prompt: clamped.text,
      words: clamped.words,
      underMin: clamped.underMin,
    });
  }
  return results;
}

/**
 * [2] Kling 3.0 (VIDEO). HAS negative (NEG_KLING).
 * Order: Camera -> Character -> Reaction. Static camera stated POSITIVELY.
 * Variants = Motion Intensity 0.3 / 0.5 / 0.7 (built-in).
 */
function buildKling(spec: SceneSpec, opts: BuildOptions): BuildResult[] {
  const cameraMove = spec.motion.cameraMove || "camera static on tripod";
  const camera = `${cameraMove}${spec.camera ? ", " + spec.camera : ""}`;
  const identity = identityText(spec, opts.character, opts.hasReference);
  const character = `Character: ${identity}${spec.outfit ? " in " + spec.outfit : ""}.`;
  const reaction = `Reaction: ${spec.motion.action || "subtle natural micro-movements, breathing, blinking"}${spec.lighting ? ", " + spec.lighting : ""}.`;
  // Kling native audio: dialogue lives in the prompt, voices stay bound to the
  // character (Voice Binding). Canon format: [Character A: tone]: "line".
  const dialogue = spec.audio.dialogue.trim()
    ? ` [Character A: natural]: "${spec.audio.dialogue.trim().replace(/"/g, "'")}".`
    : "";
  // Fix Pack 10 - B2: optional product mention.
  const product = spec.product ? ` Product in frame: ${spec.product}.` : "";
  const base = `${camera}. ${character} ${reaction}${product}${dialogue}`;

  // Canon intensity presets are exactly 0.3 / 0.5 / 0.7. A single variant uses the
  // user's slider; a 4th variant reuses the slider value (no invented presets).
  const list =
    opts.variants <= 1
      ? [spec.motion.intensity || 0.5]
      : opts.variants >= 4
        ? [0.3, 0.5, 0.7, spec.motion.intensity || 0.5]
        : [0.3, 0.5, 0.7].slice(0, opts.variants);

  return list.map((i) => ({
    prompt: `${base} ${INTENSITY_PHRASE[String(i)] || "natural motion"}. Motion intensity ${i}.`,
    negative: NEG_KLING,
  }));
}

/**
 * [3] Seedance 2.5 (VIDEO). NO negative. @-tags MANDATORY:
 * @image1=identity, @video1=motion/camera, @audio1=rhythm.
 * Subject + Action + Scene + Camera + Style, 50-70 words.
 */
function buildSeedance(spec: SceneSpec, opts: BuildOptions): BuildResult[] {
  const identity = identityText(spec, opts.character, opts.hasReference);
  const subject = `${identity}${spec.outfit ? ", " + spec.outfit : ""}`;
  const motion = `${spec.motion.cameraMove || "static camera"} ${spec.motion.action || "subtle natural movement"}`;
  const audio = spec.audio.ambience || "quiet natural ambience";
  const style =
    [styleString(spec.style), realismString(["skin"])]
      .filter(Boolean)
      .join(", ") || "natural realism";

  const rewordings = [
    motion,
    `slow push-in, ${spec.motion.action || "she shifts weight naturally"}`,
    `gentle handheld drift, ${spec.motion.action || "one continuous natural gesture"}`,
    `locked-off frame, ${spec.motion.action || "small candid movement"}`,
  ];

  const results: BuildResult[] = [];
  for (let v = 0; v < opts.variants; v++) {
    const text = `@image1 ${subject}. @video1 ${rewordings[v] || motion}. @audio1 ${audio}. Scene: ${spec.location || "natural setting"}${spec.lighting ? ", " + spec.lighting : ""}. Style: ${style}.`;
    const clamped = budgetWc(
      text,
      WORD_LIMITS.seedance.min,
      WORD_LIMITS.seedance.max,
    );
    results.push({
      prompt: clamped.text,
      words: clamped.words,
      underMin: clamped.underMin,
    });
  }
  return results;
}

/**
 * [4] Veo 3.1 (VIDEO). HAS negative (NEG_VEO). 7 layers, CAMERA FIRST:
 * [camera+optics] [subject] [action+physics] [environment] [light] [style+texture] [audio]
 * Dialogue AFTER a colon (not in quotes) + "(no subtitles)". 3-6 sentences ~100-150 words.
 */
function buildVeo(
  spec: SceneSpec,
  opts: BuildOptions,
  broll: boolean,
): BuildResult[] {
  const identity = identityText(spec, opts.character, opts.hasReference);
  const cameraLayer = `${spec.camera || "Static 50mm shot on a tripod"}${broll ? " (that's where the camera is)" : ""}.`;
  const subjectLayer = broll
    ? ""
    : `${identity[0].toUpperCase() + identity.slice(1)}${spec.outfit ? " in " + spec.outfit : ""}.`;
  const actionLayer = `${spec.motion.action || (broll ? "Slow ambient movement in the scene, natural physics" : "Natural micro-movements, one clear action, believable physics")}.`;
  const envLayer = spec.location
    ? `${spec.location[0].toUpperCase() + spec.location.slice(1)}.`
    : "";
  const lightLayer = spec.lighting
    ? `${spec.lighting[0].toUpperCase() + spec.lighting.slice(1)}.`
    : "";
  const styleLayer = `${styleString(spec.style) || "UGC realism"}, ${POS_SKIN.split(",")[0]}, no color grade.`;
  const audioParts: string[] = [];
  if (spec.audio.ambience) audioParts.push(`Audio: ${spec.audio.ambience}`);
  if (spec.audio.sfx) audioParts.push(`SFX: ${spec.audio.sfx}`);
  const audioLayer = audioParts.length ? audioParts.join("; ") + "." : "";

  const variantCameras = [
    cameraLayer,
    `Slow handheld 35mm push-in${broll ? " (that's where the camera is)" : ""}.`,
    `85mm shallow-focus shot, slight drift${broll ? " (that's where the camera is)" : ""}.`,
    `Wide 24mm locked-off frame${broll ? " (that's where the camera is)" : ""}.`,
  ];

  const results: BuildResult[] = [];
  for (let v = 0; v < opts.variants; v++) {
    let prompt = [
      variantCameras[v] || cameraLayer,
      subjectLayer,
      actionLayer,
      envLayer,
      lightLayer,
      styleLayer,
      audioLayer,
    ]
      .filter(Boolean)
      .join(" ");
    if (!broll && spec.audio.dialogue.trim()) {
      // Dialogue after a colon, not in quotes, + (no subtitles). No gender assumptions.
      prompt += ` The subject says, softly: ${spec.audio.dialogue.trim().replace(/["]/g, "")} (no subtitles)`;
    }
    const clamped = budgetWc(prompt, WORD_LIMITS.veo.min, WORD_LIMITS.veo.max);
    results.push({
      prompt: clamped.text,
      words: clamped.words,
      underMin: clamped.underMin,
      negative: NEG_VEO,
    });
  }
  return results;
}

/**
 * [5] Gemini Omni Flash (VIDEO EDITOR). Reasoning, NO negative.
 * 5 parts: Goal -> Input role -> Scene -> Motion -> Constraints.
 * Stateful: separate CHANGES vs PRESERVED. <=5s / <=5 refs / <=5 edits. Use Flow.
 */
function buildOmni(spec: SceneSpec, opts: BuildOptions): BuildResult[] {
  const goal = spec.motion.action || "a single small natural adjustment";
  const constraintVariants = [
    `change only [${goal}]; PRESERVE identity, lighting, background, framing`,
    `apply exactly one edit — ${goal} — and nothing else; PRESERVE identity, outfit, lighting, background`,
    `modify [${goal}] only; everything else PRESERVED: identity, light, environment, camera`,
    `single edit: ${goal}; PRESERVE the full original state of identity, lighting, background`,
  ];

  const results: BuildResult[] = [];
  for (let v = 0; v < opts.variants; v++) {
    const prompt = `Goal: ${goal}. Input: the uploaded video is the source clip to edit. Scene: ${spec.location || "same scene, unchanged"}. Motion: ${spec.motion.cameraMove || "a single natural movement, under 10 seconds"}. Constraints: ${constraintVariants[v] || constraintVariants[0]}. Use Flow.`;
    results.push({ prompt });
  }
  return results;
}

// ----------------------------------------------------------------------------
// Router
// ----------------------------------------------------------------------------

export function buildPrompts(
  spec: SceneSpec,
  opts: BuildOptions,
): BuildResult[] {
  switch (spec.engine) {
    case "nano_pro":
      return buildNano(spec, opts);
    case "kling_3":
      return buildKling(spec, opts);
    case "seedance_2":
      return buildSeedance(spec, opts);
    case "veo_scene":
      return buildVeo(spec, opts, false);
    case "veo_broll":
      return buildVeo(spec, opts, true);
    case "omni_flash":
      return buildOmni(spec, opts);
  }
}

