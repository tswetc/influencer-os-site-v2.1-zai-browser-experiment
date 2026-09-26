import {
  validateRevisionMeta,
  type ContinuityRevisionMeta,
  type ReferenceBinding,
} from "./continuity";

export const TASTE_DIMENSIONS = [
  "composition",
  "camera",
  "optics",
  "lighting",
  "exposure",
  "capture",
  "surface",
  "imperfection",
  "color",
  "material",
  "human_state",
  "motion",
  "edit_rhythm",
  "audio",
  "feed_rhythm",
] as const;

export type TasteDimension = (typeof TASTE_DIMENSIONS)[number];

const TASTE_DIMENSION_SET = new Set<string>(TASTE_DIMENSIONS);

export interface TasteMechanic {
  id: string;
  dimension: TasteDimension;
  description: string;
  normalizedControl?: string;
  confidence: number;
  sourceReferenceIds: string[];
  exclusions?: string[];
}

export interface TasteProfile {
  meta: ContinuityRevisionMeta & { type: "taste" };
  name: string;
  mechanics: TasteMechanic[];
  antiPatterns: string[];
  os23Worlds?: Array<"A" | "B" | "C">;
  os23TechniqueIds?: string[];
}

export function validateTasteReferences(
  references: ReferenceBinding[],
): string[] {
  const errors: string[] = [];

  for (const ref of references) {
    const runtimeRole = String(
      (ref as unknown as { role?: unknown }).role ?? "",
    ).trim();

    if (runtimeRole.toLowerCase() === "identity") {
      errors.push(`taste reference ${ref.id} uses identity role`);
    }
  }

  return errors;
}

export function validateTasteProfile(profile: TasteProfile): string[] {
  const errors = [
    ...validateRevisionMeta(profile.meta),
    ...validateTasteReferences(profile.meta.references),
  ];

  if (profile.meta.type !== "taste") {
    errors.push("taste profile meta.type must be taste");
  }

  if (typeof profile.name !== "string" || !profile.name.trim()) {
    errors.push("taste profile name is required");
  }

  if (!Array.isArray(profile.mechanics)) {
    errors.push("taste mechanics must be an array");
    return errors;
  }

  const refIds = new Set(profile.meta.references.map((r) => r.id));
  const mechanicIds = new Set<string>();

  for (const mechanic of profile.mechanics) {
    if (typeof mechanic.id !== "string" || !mechanic.id.trim()) {
      errors.push("taste mechanic id is required");
      continue;
    }

    if (mechanicIds.has(mechanic.id)) {
      errors.push(`duplicate taste mechanic id: ${mechanic.id}`);
    }
    mechanicIds.add(mechanic.id);

    if (
      typeof mechanic.dimension !== "string" ||
      !TASTE_DIMENSION_SET.has(mechanic.dimension)
    ) {
      errors.push(
        `taste mechanic ${mechanic.id}: invalid dimension ${String(
          mechanic.dimension,
        )}`,
      );
    }

    if (
      typeof mechanic.description !== "string" ||
      !mechanic.description.trim()
    ) {
      errors.push(
        `taste mechanic ${mechanic.id}: description is required`,
      );
    }

    if (
      typeof mechanic.confidence !== "number" ||
      !Number.isFinite(mechanic.confidence) ||
      mechanic.confidence < 0 ||
      mechanic.confidence > 1
    ) {
      errors.push(
        `taste mechanic ${mechanic.id}: confidence must be finite 0..1`,
      );
    }

    if (!Array.isArray(mechanic.sourceReferenceIds)) {
      errors.push(
        `taste mechanic ${mechanic.id}: sourceReferenceIds must be array`,
      );
      continue;
    }

    for (const sourceId of mechanic.sourceReferenceIds) {
      if (typeof sourceId !== "string" || !refIds.has(sourceId)) {
        errors.push(
          `taste mechanic ${mechanic.id}: unknown source reference ${String(
            sourceId,
          )}`,
        );
      }
    }
  }

  return errors;
}
