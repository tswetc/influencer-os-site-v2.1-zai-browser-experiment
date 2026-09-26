import { describe, expect, it } from "vitest";

import {
  capabilityConflicts,
  capabilityWarnings,
  compositionConflicts,
  compositionCapabilityConflicts,
  findRuleConflicts,
  validateRevisionMeta,
  type ContinuityRevisionMeta,
} from "@/lib/osv3/foundation/continuity";
import {
  validateTasteProfile,
  type TasteProfile,
} from "@/lib/osv3/foundation/taste";
import { importLegacyCharacterPassport } from "@/lib/osv3/foundation/legacy-adapter";

function meta(
  overrides: Partial<ContinuityRevisionMeta> = {},
): ContinuityRevisionMeta {
  return {
    revisionId: "r1",
    rootId: "root1",
    type: "product",
    schemaVersion: 1,
    createdAt: "2026-09-25T00:00:00Z",
    references: [],
    rules: [],
    ...overrides,
  };
}

describe("OS23.7 continuity foundation", () => {
  it("accepts valid revision meta", () => {
    expect(validateRevisionMeta(meta())).toHaveLength(0);
  });

  it("rejects NaN schemaVersion", () => {
    expect(
      validateRevisionMeta({ ...meta(), schemaVersion: Number.NaN }).some((e) =>
        e.includes("schemaVersion"),
      ),
    ).toBe(true);
  });

  it("hard-conflicts incompatible LOCK values within one root", () => {
    const hard = findRuleConflicts([
      meta({
        rules: [
          { path: "geometry.cap", level: "LOCK", value: "round" },
        ],
      }),
      meta({
        revisionId: "r2",
        rules: [
          { path: "geometry.cap", level: "LOCK", value: "square" },
        ],
      }),
    ]);
    expect(hard[0]?.kind).toBe("HARD_CONFLICT");
  });

  it("does not conflict same local path across different roots", () => {
    const differentRoots = findRuleConflicts([
      meta({
        rootId: "product-1",
        rules: [{ path: "color", level: "LOCK", value: "red" }],
      }),
      meta({
        rootId: "character-1",
        type: "character",
        revisionId: "r2",
        rules: [{ path: "color", level: "LOCK", value: "green" }],
      }),
    ]);
    expect(differentRoots).toHaveLength(0);
  });

  it("detects cross-root conflict through normalized shared conflictKey", () => {
    const sharedConflictKey = findRuleConflicts([
      meta({
        rootId: "scene-1",
        type: "scene",
        rules: [
          {
            path: "lighting.key",
            conflictKey: " Capture.Key_Light ",
            level: "LOCK",
            value: "hard flash",
          },
        ],
      }),
      meta({
        rootId: "taste-1",
        type: "taste",
        revisionId: "r2",
        rules: [
          {
            path: "lighting.key",
            conflictKey: "capture.key_light",
            level: "LOCK",
            value: "soft window",
          },
        ],
      }),
    ]);
    expect(sharedConflictKey[0]?.kind).toBe("HARD_CONFLICT");
  });

  it("normalizes whitespace-equivalent LOCK values", () => {
    const whitespaceEquivalent = findRuleConflicts([
      meta({
        rules: [
          { path: "lighting.key", level: "LOCK", value: "soft window" },
        ],
      }),
      meta({
        revisionId: "r2",
        rules: [
          {
            path: "lighting.key",
            level: "LOCK",
            value: " soft   window ",
          },
        ],
      }),
    ]);
    expect(whitespaceEquivalent).toHaveLength(0);
  });

  it("hard-conflicts LOCK and EXCLUDE on the same path", () => {
    const lockExclude = findRuleConflicts([
      meta({
        rules: [
          { path: "product.logo", level: "LOCK", value: "keep" },
        ],
      }),
      meta({
        revisionId: "r2",
        rules: [
          { path: "product.logo", level: "EXCLUDE", value: null },
        ],
      }),
    ]);
    expect(lockExclude[0]?.kind).toBe("HARD_CONFLICT");
  });

  it("capability-conflicts unsupported semantic LOCK", () => {
    const cap = capabilityConflicts(
      meta({
        references: [
          {
            id: "p1",
            source: { kind: "asset_version", assetVersionId: "a1" },
            role: "product",
            target: "geometry",
            priority: 100,
          },
        ],
        rules: [
          { path: "geometry", level: "LOCK", value: "bottle-v1" },
        ],
      }),
      {
        supportedReferenceRoles: ["identity"],
        supportedLockPaths: [],
        maxReferences: 4,
      },
    );
    expect(cap.some((c) => c.path === "geometry")).toBe(true);
    expect(
      cap.some((c) => c.message.includes("reference role product")),
    ).toBe(true);
  });

  it("accepts supported wildcard semantic LOCK", () => {
    const capSupported = capabilityConflicts(
      meta({
        rules: [
          { path: "identity.full", level: "LOCK", value: "face" },
        ],
      }),
      {
        supportedReferenceRoles: ["identity"],
        supportedLockPaths: ["identity.*"],
      },
    );
    expect(capSupported).toHaveLength(0);
  });

  it("warns on optional unsupported reference role", () => {
    const warnings = capabilityWarnings(
      meta({
        references: [
          {
            id: "o1",
            source: { kind: "asset_version", assetVersionId: "a1" },
            role: "product",
            priority: 20,
          },
        ],
      }),
      {
        supportedReferenceRoles: ["identity"],
        supportedLockPaths: [],
      },
    );
    expect(warnings.some((w) => w.message.includes("unsupported"))).toBe(true);
  });

  it("enforces per-role reference limits", () => {
    const capByRole = capabilityConflicts(
      meta({
        references: [
          {
            id: "i1",
            source: { kind: "asset_version", assetVersionId: "a1" },
            role: "identity",
          },
          {
            id: "i2",
            source: { kind: "asset_version", assetVersionId: "a2" },
            role: "identity",
          },
        ],
      }),
      {
        supportedReferenceRoles: ["identity"],
        supportedLockPaths: [],
        maxReferences: 4,
        maxReferencesByRole: { identity: 1 },
      },
    );
    expect(capByRole.some((c) => c.path === "references.identity")).toBe(true);
  });

  it("rejects multiple revisions of one root at composition", () => {
    const duplicateRoot = compositionConflicts([
      meta({ rootId: "same", revisionId: "r1" }),
      meta({ rootId: "same", revisionId: "r2" }),
    ]);
    expect(
      duplicateRoot.some(
        (c) => c.path === "root:same" && c.kind === "HARD_CONFLICT",
      ),
    ).toBe(true);
  });

  it("capability-gates multi-character composition", () => {
    const multiChar = compositionCapabilityConflicts(
      [
        meta({ rootId: "c1", type: "character" }),
        meta({
          rootId: "c2",
          type: "character",
          revisionId: "r2",
        }),
      ],
      {
        supportedReferenceRoles: ["identity"],
        supportedLockPaths: [],
        supportsMultipleCharacters: false,
      },
    );
    expect(multiChar.some((c) => c.path === "characters")).toBe(true);
  });

  it("rejects identity-role references in taste profiles", () => {
    const taste: TasteProfile = {
      meta: {
        ...meta({ type: "taste" }),
        type: "taste",
        references: [
          {
            id: "t1",
            source: { kind: "asset_version", assetVersionId: "a1" },
            role: "identity",
          },
        ],
      },
      name: "flash diary",
      mechanics: [
        {
          id: "m1",
          dimension: "lighting",
          description: "point-blank hard flash",
          confidence: 0.9,
          sourceReferenceIds: ["t1"],
        },
      ],
      antiPatterns: [],
    };
    expect(
      validateTasteProfile(taste).some((e) => e.includes("identity role")),
    ).toBe(true);
  });

  it("rejects runtime case-bypass of the taste identity guard", () => {
    const taste: TasteProfile = {
      meta: {
        ...meta({ type: "taste" }),
        type: "taste",
        references: [
          {
            id: "t1",
            source: { kind: "asset_version", assetVersionId: "a1" },
            role: "identity",
          },
        ],
      },
      name: "flash diary",
      mechanics: [
        {
          id: "m1",
          dimension: "lighting",
          description: "point-blank hard flash",
          confidence: 0.9,
          sourceReferenceIds: ["t1"],
        },
      ],
      antiPatterns: [],
    };

    const runtimeCaseTaste = JSON.parse(
      JSON.stringify(taste),
    ) as TasteProfile;
    (
      runtimeCaseTaste.meta.references[0] as unknown as { role: string }
    ).role = "IDENTITY";
    expect(
      validateTasteProfile(runtimeCaseTaste).some(
        (e) => e.includes("identity role") || e.includes("invalid role"),
      ),
    ).toBe(true);
  });

  it("rejects NaN taste confidence", () => {
    const taste: TasteProfile = {
      meta: {
        ...meta({ type: "taste" }),
        type: "taste",
        references: [
          {
            id: "t1",
            source: { kind: "asset_version", assetVersionId: "a1" },
            role: "taste",
          },
        ],
      },
      name: "flash diary",
      mechanics: [
        {
          id: "m1",
          dimension: "lighting",
          description: "point-blank hard flash",
          confidence: 0.9,
          sourceReferenceIds: ["t1"],
        },
      ],
      antiPatterns: [],
    };

    const nanTaste = JSON.parse(JSON.stringify(taste)) as TasteProfile;
    nanTaste.mechanics[0].confidence = Number.NaN;
    expect(
      validateTasteProfile(nanTaste).some((e) => e.includes("confidence")),
    ).toBe(true);
  });

  it("includes shared revision/reference validation in taste validation", () => {
    const taste: TasteProfile = {
      meta: {
        ...meta({ type: "taste" }),
        type: "taste",
        references: [],
      },
      name: "flash diary",
      mechanics: [],
      antiPatterns: [],
    };

    const invalidTaste: TasteProfile = {
      ...taste,
      meta: {
        ...taste.meta,
        references: [
          {
            id: "t2",
            source: { kind: "asset_version", assetVersionId: "" },
            role: "taste",
          },
        ],
      },
      mechanics: [
        {
          id: "m2",
          dimension: "color",
          description: "muted",
          confidence: 1.2,
          sourceReferenceIds: ["missing"],
        },
      ],
    };
    const invalidTasteErrors = validateTasteProfile(invalidTaste);
    expect(invalidTasteErrors.some((e) => e.includes("assetVersionId"))).toBe(
      true,
    );
    expect(invalidTasteErrors.some((e) => e.includes("confidence"))).toBe(true);
    expect(invalidTasteErrors.some((e) => e.includes("unknown source"))).toBe(
      true,
    );
  });

  it("preserves legacy identity through the compatibility adapter", () => {
    const imported = importLegacyCharacterPassport(
      {
        schemaVersion: 1,
        id: "char-1",
        name: "Test",
        createdAt: "2026-07-01",
        updatedAt: "2026-07-02",
        identity: {
          full: "specific face description",
          mid: "face",
          micro: "same person",
        },
        anomalyLock: {
          checkboxes: ["freckles"],
          freeText: "",
          json: {},
        },
        faceAdherence: { static: 80, motion: 70 },
        referencePhotos: [
          { id: "img-1", role: "IDENTITY", slot: 1 },
          { id: "img-2", role: "future-role", slot: 2 },
        ],
      },
      "2026-09-25T00:00:00Z",
    );
    expect(imported.legacyIdentity.full).toBe("specific face description");
    expect(
      imported.migrationWarnings.some((w) => w.includes("were not invented")),
    ).toBe(true);
    expect(imported.meta.references[0]?.role).toBe("identity");
    expect(imported.meta.references[0]?.source.kind).toBe("legacy_reference");
    expect(imported.meta.references[1]?.role).toBe("unknown");
    expect(
      imported.migrationWarnings.some((w) =>
        w.includes("unknown reference role"),
      ),
    ).toBe(true);
    expect(
      imported.meta.rules.find((r) => r.path === "identity.full")?.level,
    ).toBe("LOCK");
  });
});
