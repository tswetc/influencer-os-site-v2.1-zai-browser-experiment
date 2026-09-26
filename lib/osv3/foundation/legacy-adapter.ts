import type {
  ContinuityRevisionMeta,
  ReferenceBinding,
} from "./continuity";

export interface LegacyCharacterPassportLike {
  schemaVersion: number;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  identity: { full: string; mid: string; micro: string };
  anomalyLock: {
    checkboxes: string[];
    freeText: string;
    json: Record<string, unknown>;
  };
  faceAdherence: { static: number; motion: number };
  referencePhotos: Array<{ id: string; role: string; slot: number }>;
}

const LEGACY_ROLE_MAP: Record<string, ReferenceBinding["role"]> = {
  identity: "identity",
  scene: "scene",
  motion: "motion",
  audio: "audio",
  product: "product",
};

export interface LegacyCharacterContinuityImport {
  meta: ContinuityRevisionMeta & { type: "character" };
  legacyIdentity: LegacyCharacterPassportLike["identity"];
  legacyAnomalyLock: LegacyCharacterPassportLike["anomalyLock"];
  legacyFaceAdherence: LegacyCharacterPassportLike["faceAdherence"];
  migrationWarnings: string[];
}

export function importLegacyCharacterPassport(
  passport: LegacyCharacterPassportLike,
  importedAt: string,
): LegacyCharacterContinuityImport {
  const warnings: string[] = [
    "legacy import: detailed biometric fields were not invented from free text",
    "legacy import: provider/model provenance remains unknown unless separately evidenced",
    "legacy import: references remain unresolved legacy references until materialized and hashed",
  ];

  const references: ReferenceBinding[] =
    passport.referencePhotos.map((ref) => {
      const normalizedLegacyRole = ref.role.trim().toLowerCase();
      const role =
        LEGACY_ROLE_MAP[normalizedLegacyRole] ?? "unknown";

      if (role === "unknown") {
        warnings.push(
          `legacy import: unknown reference role preserved for ${ref.id}: ${ref.role}`,
        );
      }

      return {
        id: `legacy-ref-${ref.id}`,
        source: {
          kind: "legacy_reference",
          legacyReferenceId: ref.id,
          materialization: "UNRESOLVED",
        },
        role,
        priority:
          normalizedLegacyRole === "identity" ? 100 : 50,
        provenance: "OS23.6 CharacterPassport import",
      };
    });

  return {
    meta: {
      revisionId: `import-${passport.id}-${passport.updatedAt}`,
      rootId: passport.id,
      type: "character",
      schemaVersion: 1,
      createdAt: importedAt,
      references,
      rules: [
        ...(passport.identity.full.trim()
          ? [
              {
                path: "identity.full",
                level: "LOCK" as const,
                value: passport.identity.full,
              },
            ]
          : []),
        ...passport.anomalyLock.checkboxes.map((value) => ({
          path: `anomaly.${value}`,
          level: "LOCK" as const,
          value: true,
        })),
      ],
    },
    legacyIdentity: passport.identity,
    legacyAnomalyLock: passport.anomalyLock,
    legacyFaceAdherence: passport.faceAdherence,
    migrationWarnings: warnings,
  };
}
