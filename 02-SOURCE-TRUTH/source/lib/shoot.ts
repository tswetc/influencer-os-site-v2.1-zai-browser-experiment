// ============================================================================
// Fix Pack 11.2 — SHOOT: one location + one outfit, like a real account shoot.
// 6–12 frames: N hero shots + 2 detail crops + 1 cutaway. Six variation axes
// (pose · angle · distance · prop-in-hands · gaze · artifact). Continuity ON
// keeps location/lighting/outfit VERBATIM in every frame — one place, one day.
// Also here: the flexible technique series (4–8) and the Strict/Live layer.
// ============================================================================

import { canonHabits, canonProps } from "./canon";
import { buildAdHocCutaway, buildCutaway } from "./cutaways";
import { type BuildOptions, buildPrompts } from "./engines";
import type { ScenePack } from "./packs";
import { SERIES_SHIFTS } from "./techniques";
import type { BuildResult, Lang, ModelCanon, SceneSpec } from "./types";

export type FrameRole = "hero" | "detail" | "cutaway" | "off";

/** Deterministic pool pick — reproducible builds; re-roll bumps the seed. */
export function pick<T>(pool: T[], n: number): T {
  return pool[((n % pool.length) + pool.length) % pool.length];
}

// --- Six variation axes -------------------------------------------------------
export const AXIS_POSE = [
  "weight shifted to the other leg",
  "sitting back on her heels",
  "leaning a shoulder against the wall",
  "hand raised to her hair mid-gesture",
  "head tilted, collarbone forward",
  "half-turned away from the camera",
];
export const AXIS_ANGLE = [
  "shot at eye level",
  "shot from slightly above",
  "shot from hip height looking up",
  "framed through the mirror",
];
export const AXIS_DISTANCE = [
  "medium shot from the waist up",
  "full-body shot with the room visible",
  "close framing, face and shoulders",
];
export const AXIS_GAZE = [
  "looking straight into the lens",
  "looking past the camera at something outside the frame",
  "eyes closed, lids heavy",
];
export const AXIS_ARTIFACT = [
  "slight handheld motion blur",
  "one highlight gently clipped",
  "focus caught on the wrong plane for a beat",
  "visible sensor grain in the shadows",
];

// --- Prop pools («предмет в руках») per pack. Defaults only — Fix Pack 11.3
// (Canon) will put the model's own objects first in this pool.
export const PROP_POOLS: Record<string, string[]> = {
  pack_diary: [
    "her phone",
    "a hairbrush",
    "a mug of tea",
    "a pillow hugged to her chest",
  ],
  pack_flash: [
    "a kettle",
    "her phone with the flash still on",
    "a slice of bread on a fork",
  ],
  pack_sunlight: ["a striped towel", "a tube of suncream", "cold soda can"],
  pack_americana: [
    "a motel key fob",
    "a glass soda bottle",
    "oversized sunglasses",
  ],
  pack_studio: ["a numbered casting card", "a clothes hanger", "a pin cushion"],
  pack_suburb: [
    "a garden hose",
    "an envelope from the mailbox",
    "iced lemonade",
  ],
  pack_concrete: [
    "her keys",
    "a plastic shopping bag",
    "her phone in a tired grip",
  ],
  pack_cup: ["a chipped coffee cup", "a croissant on a napkin", "a teaspoon"],
  pack_transit: [
    "her phone",
    "a paper ticket",
    "keys on one finger",
    "earphones",
  ],
  pack_wide: ["her phone at arm's length", "a snack bag", "a soda can"],
  pack_polaroid90: [
    "a polaroid print",
    "a disposable camera",
    "a glass tumbler",
  ],
  pack_fitting: [
    "a pin cushion on a wrist strap",
    "a paper measuring tape",
    "a numbered garment tag",
  ],
  pack_steam: ["a hairbrush", "a corner of the towel", "a face cream jar"],
  pack_4am: [
    "her phone lighting the face from below",
    "a glass of water",
    "the edge of a blanket",
  ],
  pack_screen: ["her phone", "a laptop lid", "a charging cable"],
  pack_motion: [
    "her phone at arm's length",
    "keys on one finger",
    "a hairbrush",
  ],
  pack_night: [
    "a fork straight from the pan",
    "a warm mug",
    "the fridge door handle",
  ],
  pack_squint: [
    "a glass of water catching the light",
    "sunglasses in one hand",
    "the edge of the curtain",
  ],
};

/** Fix Pack 11.3: her personal objects go FIRST; the pack pool is the default. */
export function propPool(packId?: string, canon?: ModelCanon | null): string[] {
  const base = (packId && PROP_POOLS[packId]) || PROP_POOLS.pack_diary;
  const own = canonProps(canon);
  return own.length > 0 ? [...own, ...base] : base;
}

// --- Strict / Live: «Живо» allows controlled codex violations ----------------
export const LOOSE_BREAKS = [
  "strong motion blur smearing half the frame",
  "the top of the head cropped out by the frame",
  "horizon visibly tilted, careless framing",
  "harsh unmotivated direct flash flattening the scene",
];

// --- Continuity OFF: each frame re-describes the place in its own words --------
export const LOCATION_DRIFT = [
  "seen from the opposite corner of the room",
  "another angle of the same place, described loosely",
  "the same spot, but the frame finds a different wall",
  "a step to the side, new background detail",
];

export const DETAIL_FRAMING =
  "extreme detail crop, hands and fabric texture in sharp focus, face outside the frame";

export interface ShootConfig {
  continuity: boolean;
  loose: boolean;
  /** Pack powering prop & cutaway pools; null falls back to generic pools. */
  pack: ScenePack | null;
  /** Base seed; re-roll bumps seeds[i] to rebuild ONE frame only. */
  seed?: number;
  seeds?: number[];
  /** Fix Pack 11.3: the model's canon; null/empty = pack defaults. */
  canon?: ModelCanon | null;
}

/** Role layout: N-3 heroes, 2 details woven in, cutaway second-to-last. */
export function shootComposition(size: number): FrameRole[] {
  const n = Math.min(12, Math.max(6, Math.round(size)));
  const roles: FrameRole[] = [];
  const heroes = n - 3;
  for (let i = 0; i < heroes; i++) {
    roles.push("hero");
    if (i === 1 || i === 3) roles.push("detail");
  }
  while (roles.filter((r) => r === "detail").length < 2) roles.push("detail");
  roles.splice(roles.length - 1, 0, "cutaway");
  return roles.slice(0, n);
}

/** One hero frame = 4–5 of the six axes moved; deterministic by (i, seed). */
export function heroPhrase(
  i: number,
  seed: number,
  packId?: string,
  loose?: boolean,
  canon?: ModelCanon | null,
): string {
  const s = seed + i * 7;
  // Fix Pack 11.3: her body habits go first on the pose axis.
  const poses = [...canonHabits(canon), ...AXIS_POSE];
  const parts = [
    pick(poses, s),
    pick(AXIS_ANGLE, s + 1),
    pick(AXIS_DISTANCE, s + 2),
    pick(AXIS_GAZE, s + 3),
  ];
  if (i % 2 === 1)
    parts.push(`holding ${pick(propPool(packId, canon), s + 4)}`);
  parts.push(pick(AXIS_ARTIFACT, s + 5));
  if (loose && i % 3 === 2) parts.push(pick(LOOSE_BREAKS, s + 6));
  return parts.join(", ");
}

/**
 * Build a shoot: 6–12 frames of one location + one outfit.
 * Continuity ON: location/lighting/outfit strings ride verbatim into every
 * frame (the shoot reads as one place, one day). OFF: location drifts.
 */
export function buildShoot(
  spec: SceneSpec,
  opts: BuildOptions,
  size: number,
  lang: Lang,
  cfg: ShootConfig,
): BuildResult[] {
  const roles = shootComposition(size);
  const seed = cfg.seed ?? 0;
  let heroIdx = 0;
  let detailIdx = 0;
  return roles.map((role, i) => {
    const s = cfg.seeds?.[i] ?? seed;
    if (role === "cutaway") {
      const r = cfg.pack
        ? buildCutaway(cfg.pack, s + i, lang, opts.character?.device, cfg.canon)
        : buildAdHocCutaway(
            spec.location,
            spec.lighting,
            spec.world ?? "A",
            lang,
            opts.character?.device,
          );
      return { ...r, role };
    }
    const drift = cfg.continuity ? "" : pick(LOCATION_DRIFT, s + i);
    const pose =
      role === "detail"
        ? `${DETAIL_FRAMING}, holding ${pick(propPool(cfg.pack?.id, cfg.canon), s + i)}`
        : [
            spec.pose,
            heroPhrase(heroIdx, s, cfg.pack?.id, cfg.loose, cfg.canon),
          ]
            .filter(Boolean)
            .join(", ");
    const frameSpec: SceneSpec = {
      ...spec,
      location: [spec.location, drift].filter(Boolean).join(", "),
      pose,
    };
    const r = buildPrompts(frameSpec, { ...opts, variants: 1 })[0];
    const num = role === "hero" ? ++heroIdx : ++detailIdx;
    const label =
      role === "hero"
        ? `Hero ${num}`
        : `${lang === "ru" ? "Деталь" : "Detail"} ${num}`;
    return { ...r, label, role };
  });
}

// --- Flexible technique series: 4–8 frames of ONE technique --------------------
export const EXTRA_SHIFTS = [
  "micro shift: weight to the other hip, jaw relaxed",
  "one step closer to the camera, same framing logic",
];

export function buildSeriesFlex(
  spec: SceneSpec,
  opts: BuildOptions,
  count: number,
  lang: Lang,
): BuildResult[] {
  const n = Math.min(8, Math.max(4, Math.round(count)));
  const shifts = [...SERIES_SHIFTS, ...EXTRA_SHIFTS].slice(0, n);
  return shifts.map((shift, i) => {
    const shotSpec: SceneSpec = shift
      ? { ...spec, pose: [spec.pose, shift].filter(Boolean).join(", ") }
      : spec;
    const r = buildPrompts(shotSpec, { ...opts, variants: 1 })[0];
    return {
      ...r,
      label: (lang === "ru" ? "Кадр " : "Frame ") + (i + 1),
      role: "hero" as const,
    };
  });
}

