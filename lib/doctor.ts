// Fix Pack 14 — Prompt Doctor. Turns a SceneSpec (+passport, +built result)
// into concrete, engine-aware, prioritized suggestions. Pure and testable:
// no DOM, no i18n. Returns suggestion ids the UI localizes as doctor.<id>.
// "fix" = a gap that materially hurts the frame; "tip" = a quality nudge.

import type { BuildResult, CharacterPassport, SceneSpec } from "./types";
import { promptStrength } from "./strength";

export type DoctorSeverity = "fix" | "tip";

export interface DoctorSuggestion {
  id: string; // i18n suffix: doctor.<id>
  severity: DoctorSeverity;
}

const VIDEO_ENGINES = ["kling_3", "seedance_2", "veo_scene", "veo_broll"];

function has(v: string): boolean {
  return v.trim().length > 0;
}

/** Ordered diagnosis: fixes first, then tips, de-duplicated by id. */
export function diagnose(
  spec: SceneSpec,
  passport: CharacterPassport | null,
  result?: BuildResult | null,
): DoctorSuggestion[] {
  const out: DoctorSuggestion[] = [];
  const push = (id: string, severity: DoctorSeverity) =>
    out.push({ id, severity });

  // Identity is the #1 driver of face consistency.
  if (!passport) {
    push("character", "fix");
  } else {
    const identityOk =
      has(passport.identity.full) ||
      has(passport.identity.mid) ||
      passport.referencePhotos.length > 0;
    if (!identityOk) push("identity", "fix");
    const anomalyOk =
      passport.anomalyLock.checkboxes.length > 0 ||
      has(passport.anomalyLock.freeText);
    if (!anomalyOk) push("anomaly", "fix");
  }

  // Core scene axes.
  if (!has(spec.location)) push("location", "fix");
  if (!has(spec.lighting)) push("lighting", "fix");
  if (!has(spec.pose)) push("pose", "tip");
  if (!has(spec.outfit)) push("outfit", "tip");

  const cap = spec.capture;
  const captureOk =
    has(cap.cap) ||
    has(cap.opt) ||
    has(cap.film) ||
    cap.expo.length > 0 ||
    cap.imperf.length > 0;
  if (!captureOk) push("capture", "tip");

  if (spec.realism.length < 2) push("realism", "tip");

  // Engine-aware checks.
  if (VIDEO_ENGINES.includes(spec.engine)) {
    if (!has(spec.motion.action)) push("motion", "fix");
    if (!has(spec.motion.cameraMove)) push("camera", "tip");
  }

  // Result-level checks.
  if (result?.underMin) push("short", "tip");

  const seen = new Set<string>();
  return out
    .filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    })
    .sort((a, b) =>
      a.severity === b.severity ? 0 : a.severity === "fix" ? -1 : 1,
    );
}

/** Compact headline: current score + how many hard fixes remain. */
export function doctorSummary(
  spec: SceneSpec,
  passport: CharacterPassport | null,
): { score: number; fixes: number } {
  const { score } = promptStrength(spec, passport);
  const fixes = diagnose(spec, passport).filter(
    (s) => s.severity === "fix",
  ).length;
  return { score, fixes };
}
