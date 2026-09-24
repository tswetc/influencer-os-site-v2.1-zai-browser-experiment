// Fix Pack 13: prompt strength meter. Pure scoring over a SceneSpec (+optional
// passport) so it is unit-testable in selfcheck. Returns 0..100 plus the list
// of gap ids the UI turns into "what to strengthen" hints.

import type { CharacterPassport, SceneSpec } from "./types";

export interface StrengthReport {
  score: number; // 0..100
  gaps: string[]; // i18n suffixes: strength.gap.<id>
}

const VIDEO_ENGINES = ["kling_3", "seedance_2", "veo_scene", "veo_broll"];

function filled(v: string): boolean {
  return v.trim().length > 0;
}

export function promptStrength(
  spec: SceneSpec,
  passport: CharacterPassport | null,
): StrengthReport {
  let total = 0;
  let earned = 0;
  const gaps: string[] = [];

  const add = (weight: number, ok: boolean, gap: string) => {
    total += weight;
    if (ok) earned += weight;
    else gaps.push(gap);
  };

  add(20, filled(spec.location), "location");
  add(15, filled(spec.lighting), "lighting");
  add(10, filled(spec.pose), "pose");
  add(10, filled(spec.outfit), "outfit");

  const cap = spec.capture;
  const captureOk =
    filled(cap.cap) ||
    filled(cap.opt) ||
    filled(cap.film) ||
    cap.expo.length > 0 ||
    cap.imperf.length > 0;
  add(10, captureOk, "capture");

  add(10, spec.realism.length >= 2, "realism");

  if (VIDEO_ENGINES.includes(spec.engine)) {
    add(15, filled(spec.motion.action), "motion");
  }

  if (passport) {
    const identityOk =
      filled(passport.identity.full) ||
      filled(passport.identity.mid) ||
      passport.referencePhotos.length > 0;
    add(15, identityOk, "identity");

    const anomalyOk =
      passport.anomalyLock.checkboxes.length > 0 ||
      filled(passport.anomalyLock.freeText);
    add(10, anomalyOk, "anomaly");
  } else {
    add(25, false, "character");
  }

  const score = total > 0 ? Math.round((earned / total) * 100) : 0;
  return { score, gaps };
}

