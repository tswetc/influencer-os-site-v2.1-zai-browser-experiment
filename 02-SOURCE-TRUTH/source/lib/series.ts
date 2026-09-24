// ============================================================================
// CAROUSEL SERIES — deterministic multi-shot builder (Fix Pack 6).
// One scene -> 3 or 5 coherent shots for a social carousel.
// Identity, outfit, lighting, mood and Anomaly Lock stay IDENTICAL across
// shots; only the framing changes. No LLM involved — pure canon composition.
// Photo mode (Nano Banana Pro) only.
// ============================================================================

import { type BuildOptions, buildPrompts } from "./engines";
import type { BuildResult, Lang, SceneSpec } from "./types";

export type SeriesCount = 3 | 5;

export interface ShotDef {
  id: string;
  label: { ru: string; en: string };
  /** English framing phrase injected into the SCENE/POSE block. */
  framing: string;
}

// Order matters: this is the carousel narrative (context -> person -> texture).
export const SHOTS: ShotDef[] = [
  {
    id: "wide",
    label: { ru: "Общий план", en: "Wide shot" },
    framing:
      "wide establishing shot from a few meters away, full body visible, environment dominates the frame",
  },
  {
    id: "medium",
    label: { ru: "Средний план", en: "Medium shot" },
    framing: "medium shot framed from the waist up, natural candid framing",
  },
  {
    id: "closeup",
    label: { ru: "Крупный план", en: "Close-up" },
    framing: "close-up portrait framing, face and shoulders filling the frame",
  },
  {
    id: "detail",
    label: { ru: "Деталь", en: "Detail shot" },
    framing:
      "detail shot, hands and outfit texture in sharp focus, face softly out of frame",
  },
  {
    id: "pov",
    label: { ru: "Селфи POV", en: "Selfie POV" },
    framing:
      "casual phone selfie at arm's length, slight wide-angle look, first-person feel",
  },
];

export function seriesShots(count: SeriesCount): ShotDef[] {
  return count === 3 ? SHOTS.slice(0, 3) : SHOTS;
}

/**
 * Build a coherent carousel series. Wraps the canonical buildPrompts():
 * per shot we only extend the pose with a framing phrase — every canon rule
 * (block order, budgets, POS_SKIN, U-attention) is applied by the engine.
 */
export function buildSeries(
  spec: SceneSpec,
  opts: BuildOptions,
  count: SeriesCount,
  lang: Lang,
): BuildResult[] {
  return seriesShots(count).map((shot) => {
    const shotSpec: SceneSpec = {
      ...spec,
      pose: [spec.pose, shot.framing].filter(Boolean).join(", "),
    };
    const result = buildPrompts(shotSpec, { ...opts, variants: 1 })[0];
    return { ...result, label: shot.label[lang] };
  });
}

// ============================================================================
// Fix Pack 11 — TECHNIQUE SERIES ×6: six frames of ONE technique.
// Identity, world and technique stay fixed; only state/artifact shift.
// ============================================================================

import { SERIES_SHIFTS } from "./techniques";

export function buildTechniqueSeries(
  spec: SceneSpec,
  opts: BuildOptions,
  lang: Lang,
): BuildResult[] {
  return SERIES_SHIFTS.map((shift, i) => {
    const shotSpec: SceneSpec = shift
      ? { ...spec, pose: [spec.pose, shift].filter(Boolean).join(", ") }
      : spec;
    const result = buildPrompts(shotSpec, { ...opts, variants: 1 })[0];
    return {
      ...result,
      label: (lang === "ru" ? "Кадр " : "Frame ") + (i + 1),
    };
  });
}

