// ============================================================================
// KLING MULTI-SHOT - deterministic multi-shot builder (Fix Pack 10, A2).
// One scene -> 2..6 shots inside ONE Kling 3.0 prompt ("Shot N (3s): ...").
// Canon: up to 6 shots, at least 3 s per shot, ~15 s total; Kling may trim the
// tail beyond ~15 s and credits for trimmed footage are NOT refunded.
// Identity, outfit, lighting and Anomaly Lock stay IDENTICAL across shots;
// only framing and micro-action change. No LLM - pure canon composition.
// ============================================================================

import {
  type BuildOptions,
  NEG_KLING,
  anomalyText,
  identityText,
} from "./engines";
import { SHOTS, type ShotDef } from "./series";
import type { BuildResult, Lang, SceneSpec } from "./types";

export type MultishotCount = 2 | 3 | 4 | 5 | 6;

export const MULTISHOT_SHOT_SEC = 3;
export const MULTISHOT_TARGET_SEC = 15;

// 6th framing on top of the 5 carousel shot definitions.
const LOW_ANGLE: ShotDef = {
  id: "lowangle",
  label: {
    ru: "\u041d\u0438\u0436\u043d\u0438\u0439 \u0440\u0430\u043a\u0443\u0440\u0441",
    en: "Low angle",
  },
  framing:
    "low-angle shot from below chest height, subject slightly above the camera",
};

export const MULTISHOT_FRAMINGS: ShotDef[] = [...SHOTS, LOW_ANGLE];

export interface MultishotPlan {
  count: MultishotCount;
  perShotSec: number;
  totalSec: number;
  /** true when the sequence exceeds the ~15 s target: Kling may trim the tail, credits are not refunded. */
  overBudget: boolean;
}

export function planMultishot(count: MultishotCount): MultishotPlan {
  const totalSec = count * MULTISHOT_SHOT_SEC;
  return {
    count,
    perShotSec: MULTISHOT_SHOT_SEC,
    totalSec,
    overBudget: totalSec > MULTISHOT_TARGET_SEC,
  };
}

// Neutral English continuations; shot 1 always uses the user's action.
const CONTINUATIONS = [
  "she continues the same action naturally",
  "she pauses and looks around the scene",
  "she shifts her weight and adjusts her posture",
  "she reacts with a small genuine expression",
  "she finishes the movement and settles",
];

/**
 * Build ONE Kling prompt with a numbered shot list. Wraps engine canon:
 * identity comes from identityText() (micro lock with reference), the
 * Anomaly Lock rides in the header so it applies to every shot.
 */
export function buildMultishot(
  spec: SceneSpec,
  opts: BuildOptions,
  count: MultishotCount,
  lang: Lang,
): BuildResult {
  const plan = planMultishot(count);
  const identity = identityText(spec, opts.character, opts.hasReference);
  const anomaly = anomalyText(opts.character);
  const character = `Character: ${identity}${spec.outfit ? " in " + spec.outfit : ""}.${anomaly ? " " + anomaly + "." : ""}`;
  const scene = `Scene: ${spec.location || "natural setting"}${spec.lighting ? ", " + spec.lighting : ""}.`;
  const camera = spec.motion.cameraMove || "camera static on tripod";
  const header = `Multi-shot sequence, ${plan.count} shots, about ${plan.totalSec} seconds total, one continuous scene, the same character in every shot. ${character} ${scene} ${camera}.`;

  const action =
    spec.motion.action || "subtle natural micro-movements, breathing, blinking";
  const dialogue = spec.audio.dialogue.trim()
    ? ` [Character A: natural]: "${spec.audio.dialogue.trim().replace(/"/g, "'")}".`
    : "";
  // Dialogue rides on the close-up shot when there is one, otherwise shot 1.
  const dialogueIndex = plan.count >= 3 ? 2 : 0;

  const lines: string[] = [];
  for (let i = 0; i < plan.count; i++) {
    const framing = MULTISHOT_FRAMINGS[i].framing;
    const act =
      i === 0 ? action : CONTINUATIONS[(i - 1) % CONTINUATIONS.length];
    const say = dialogue && i === dialogueIndex ? dialogue : "";
    lines.push(
      `Shot ${i + 1} (${plan.perShotSec}s): ${framing}, ${act}.${say}`,
    );
  }

  const intensity = spec.motion.intensity || 0.5;
  const prompt = `${header} ${lines.join(" ")} Motion intensity ${intensity}.`;
  const label =
    lang === "ru"
      ? `\u041c\u0443\u043b\u044c\u0442\u0438\u0448\u043e\u0442 ${plan.count}\u00d7${plan.perShotSec} \u0441`
      : `Multi-shot ${plan.count}x${plan.perShotSec}s`;
  return { prompt, negative: NEG_KLING, label };
}

