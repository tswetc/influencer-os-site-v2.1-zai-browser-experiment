// Neutral Scene Spec + helpers for the 4-phase pipeline.
// Phase 1 Load -> Phase 2 Analyze (Vision) -> Phase 3 Confirm (trust gate) -> Phase 4 Build.

import type { EngineId, Mode, SceneSpec } from "./types";

export function emptySceneSpec(
  mode: Mode = "photo",
  engine: EngineId = "nano_pro",
): SceneSpec {
  return {
    mode,
    engine,
    subject: { characterId: null, identityLevel: "full" },
    location: "",
    lighting: "",
    camera: "",
    pose: "",
    outfit: "",
    mood: "",
    capture: { cap: "", opt: "", expo: [], imperf: [], film: "" },
    style: [],
    realism: ["anti_b", "sensor", "skin"], // skin ON by default per spec
    motion: { action: "", intensity: 0.5, cameraMove: "" },
    audio: { dialogue: "", sfx: "", ambience: "" },
    references: [],
    confidence: {},
  };
}

export const LOW_CONFIDENCE = 0.6;

export function lowConfidenceFields(spec: SceneSpec): string[] {
  return Object.entries(spec.confidence)
    .filter(([, v]) => v < LOW_CONFIDENCE)
    .map(([k]) => k);
}

export function uuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ============================================================================
// Fix Pack 9 - C2: location source priority.
// Rule: explicit scene-field text > scene-reference photo. When two scene
// references exist, the caller passes the last uploaded one. Identity
// references NEVER set the location - callers must pass refLocation only
// from scene-role photos. A conflict surfaces as a yellow chip in the
// trust gate; the text always wins.
// ============================================================================

export type LocationSource = "text" | "scene_ref" | "none";

export interface LocationDecision {
  location: string;
  source: LocationSource;
  conflict: { textLocation: string; refLocation: string } | null;
}

export function resolveLocation(
  textLocation: string,
  refLocation: string,
): LocationDecision {
  const text = textLocation.trim();
  const ref = refLocation.trim();
  if (text && ref && text.toLowerCase() !== ref.toLowerCase()) {
    return {
      location: text,
      source: "text",
      conflict: { textLocation: text, refLocation: ref },
    };
  }
  if (text) return { location: text, source: "text", conflict: null };
  if (ref) return { location: ref, source: "scene_ref", conflict: null };
  return { location: "", source: "none", conflict: null };
}

