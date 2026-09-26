export const CONTINUITY_TYPES = [
  "character",
  "product",
  "place",
  "performance",
  "scene",
  "taste",
] as const;
export type ContinuityType = (typeof CONTINUITY_TYPES)[number];

export const LOCK_LEVELS = ["LOCK", "HOLD", "FLEX", "FREE", "EXCLUDE"] as const;
export type LockLevel = (typeof LOCK_LEVELS)[number];

export const REFERENCE_ROLES = [
  "identity",
  "geometry",
  "material",
  "surface",
  "color",
  "spatial",
  "scene",
  "composition",
  "lighting",
  "camera",
  "optics",
  "pose",
  "motion",
  "performance",
  "audio",
  "wardrobe",
  "product",
  "prop",
  "taste",
  "typography",
  "layout",
  "negative",
  "unknown",
] as const;
export type ReferenceRole = (typeof REFERENCE_ROLES)[number];

const CONTINUITY_TYPE_SET = new Set<string>(CONTINUITY_TYPES);
const LOCK_LEVEL_SET = new Set<string>(LOCK_LEVELS);
const REFERENCE_ROLE_SET = new Set<string>(REFERENCE_ROLES);

export type ReferenceSource =
  | { kind: "asset_version"; assetVersionId: string }
  | {
      kind: "legacy_reference";
      legacyReferenceId: string;
      materialization: "UNRESOLVED";
    }
  | { kind: "external"; externalId: string; uri?: string };

export interface ReferenceBinding {
  id: string;
  source: ReferenceSource;
  role: ReferenceRole;
  target?: string;
  priority?: number;
  provenance?: string;
  warnings?: string[];
}

export interface ContinuityRule {
  path: string;
  level: LockLevel;
  value?: string | number | boolean | null;
  note?: string;
  /**
   * Optional composition-wide semantic key. Rules conflict across distinct roots
   * only when they deliberately publish the same normalized conflictKey.
   */
  conflictKey?: string;
}

export interface ContinuityRevisionMeta {
  revisionId: string;
  rootId: string;
  type: ContinuityType;
  schemaVersion: number;
  createdAt: string;
  baseRevisionId?: string;
  references: ReferenceBinding[];
  rules: ContinuityRule[];
}

export interface ProductPassport {
  meta: ContinuityRevisionMeta & { type: "product" };
  name: string;
  geometry: Record<string, string>;
  materials: Record<string, string>;
  surface: Record<string, string>;
  markings: Record<string, string>;
  variant: Record<string, string>;
  state: Record<string, string>;
}

export interface PlacePassport {
  meta: ContinuityRevisionMeta & { type: "place" };
  name: string;
  topology: Record<string, string>;
  architecture: Record<string, string>;
  anchors: Record<string, string>;
  materials: Record<string, string>;
  physicalLights: Record<string, string>;
  state: Record<string, string>;
}

export interface ActionPhase {
  id: string;
  label: string;
  order: number;
  description: string;
}

export interface PerformancePassport {
  meta: ContinuityRevisionMeta & { type: "performance" };
  name: string;
  phases: ActionPhase[];
  trajectory?: string;
  timing?: string;
  contactConstraints?: string[];
  cameraRelation?: string;
}

export type ConflictClass =
  | "HARD_CONFLICT"
  | "CAPABILITY_CONFLICT"
  | "SOFT_CONFLICT"
  | "STYLE_IDENTITY_CONFLICT";

export interface ContinuityConflict {
  kind: ConflictClass;
  path: string;
  message: string;
}

export interface CapabilityWarning {
  path: string;
  message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeSemanticKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizeRulePath(value: string): string {
  return value.trim().toLowerCase();
}

function normalizeComparableValue(
  value: string | number | boolean | null | undefined,
): string {
  if (typeof value === "string") {
    return `s:${value.trim().replace(/\s+/g, " ")}`;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? `n:${value}` : "n:INVALID";
  }
  if (typeof value === "boolean") return `b:${value}`;
  if (value === null) return "null";
  return "undefined";
}

function validateReferenceSource(ref: ReferenceBinding): string[] {
  const errors: string[] = [];
  const source = ref.source as unknown;
  if (!isRecord(source) || typeof source.kind !== "string") {
    return [`reference ${ref.id}: source is invalid`];
  }

  if (source.kind === "asset_version") {
    if (
      typeof source.assetVersionId !== "string" ||
      !source.assetVersionId.trim()
    ) {
      errors.push(`reference ${ref.id}: assetVersionId is required`);
    }
    return errors;
  }

  if (source.kind === "legacy_reference") {
    if (
      typeof source.legacyReferenceId !== "string" ||
      !source.legacyReferenceId.trim()
    ) {
      errors.push(`reference ${ref.id}: legacyReferenceId is required`);
    }
    if (source.materialization !== "UNRESOLVED") {
      errors.push(
        `reference ${ref.id}: legacy materialization must be UNRESOLVED`,
      );
    }
    return errors;
  }

  if (source.kind === "external") {
    if (typeof source.externalId !== "string" || !source.externalId.trim()) {
      errors.push(`reference ${ref.id}: externalId is required`);
    }
    if (source.uri !== undefined && typeof source.uri !== "string") {
      errors.push(`reference ${ref.id}: external uri must be string`);
    }
    return errors;
  }

  errors.push(
    `reference ${ref.id}: unsupported source kind ${String(source.kind)}`,
  );
  return errors;
}

export function validateRevisionMeta(meta: ContinuityRevisionMeta): string[] {
  const errors: string[] = [];
  const raw = meta as unknown as Record<string, unknown>;

  if (typeof raw.revisionId !== "string" || !raw.revisionId.trim()) {
    errors.push("revisionId is required");
  }
  if (typeof raw.rootId !== "string" || !raw.rootId.trim()) {
    errors.push("rootId is required");
  }
  if (typeof raw.type !== "string" || !CONTINUITY_TYPE_SET.has(raw.type)) {
    errors.push(`invalid continuity type: ${String(raw.type)}`);
  }
  if (
    typeof raw.schemaVersion !== "number" ||
    !Number.isFinite(raw.schemaVersion) ||
    !Number.isInteger(raw.schemaVersion) ||
    raw.schemaVersion < 1
  ) {
    errors.push("schemaVersion must be a finite integer >= 1");
  }
  if (typeof raw.createdAt !== "string" || !raw.createdAt.trim()) {
    errors.push("createdAt is required");
  }

  if (!Array.isArray(raw.references)) {
    errors.push("references must be an array");
    return errors;
  }
  if (!Array.isArray(raw.rules)) {
    errors.push("rules must be an array");
    return errors;
  }

  const refIds = new Set<string>();
  for (const rawRef of raw.references) {
    if (!isRecord(rawRef)) {
      errors.push("reference must be object");
      continue;
    }

    const ref = rawRef as unknown as ReferenceBinding;
    if (typeof rawRef.id !== "string" || !rawRef.id.trim()) {
      errors.push("reference id is required");
      continue;
    }
    if (refIds.has(rawRef.id)) {
      errors.push(`duplicate reference id: ${rawRef.id}`);
    }
    refIds.add(rawRef.id);

    if (
      typeof rawRef.role !== "string" ||
      !REFERENCE_ROLE_SET.has(rawRef.role)
    ) {
      errors.push(
        `reference ${rawRef.id}: invalid role ${String(rawRef.role)}`,
      );
    }

    errors.push(...validateReferenceSource(ref));

    if (
      rawRef.priority !== undefined &&
      (typeof rawRef.priority !== "number" ||
        !Number.isFinite(rawRef.priority) ||
        rawRef.priority < 0 ||
        rawRef.priority > 100)
    ) {
      errors.push(`reference ${rawRef.id}: priority must be 0..100`);
    }

    if (rawRef.target !== undefined && typeof rawRef.target !== "string") {
      errors.push(`reference ${rawRef.id}: target must be string`);
    }
  }

  const ruleKeys = new Set<string>();
  for (const rawRule of raw.rules) {
    if (!isRecord(rawRule)) {
      errors.push("rule must be object");
      continue;
    }

    const path = rawRule.path;
    const level = rawRule.level;
    const conflictKey = rawRule.conflictKey;

    if (typeof path !== "string" || !path.trim()) {
      errors.push("rule path is required");
      continue;
    }
    if (typeof level !== "string" || !LOCK_LEVEL_SET.has(level)) {
      errors.push(`rule ${path}: invalid level ${String(level)}`);
    }
    if (
      conflictKey !== undefined &&
      (typeof conflictKey !== "string" || !conflictKey.trim())
    ) {
      errors.push(`rule ${path}: conflictKey cannot be blank`);
    }
    if (
      typeof rawRule.value === "number" &&
      !Number.isFinite(rawRule.value)
    ) {
      errors.push(`rule ${path}: numeric value must be finite`);
    }

    const normalizedKey =
      `${normalizeRulePath(path)}::${String(level)}::` +
      (typeof conflictKey === "string"
        ? normalizeSemanticKey(conflictKey)
        : "");

    if (ruleKeys.has(normalizedKey)) {
      errors.push(`duplicate rule: ${normalizedKey}`);
    }
    ruleKeys.add(normalizedKey);
  }

  return errors;
}

interface ScopedRule {
  revision: ContinuityRevisionMeta;
  rule: ContinuityRule;
}

function ruleConflictScope(item: ScopedRule): string {
  if (item.rule.conflictKey) {
    return `global:${normalizeSemanticKey(item.rule.conflictKey)}`;
  }
  return (
    `root:${item.revision.rootId}:` +
    normalizeRulePath(item.rule.path)
  );
}

export function findRuleConflicts(
  revisions: ContinuityRevisionMeta[],
): ContinuityConflict[] {
  const byScope = new Map<string, ScopedRule[]>();

  for (const revision of revisions) {
    for (const rule of revision.rules) {
      const item = { revision, rule };
      const scope = ruleConflictScope(item);
      const list = byScope.get(scope) ?? [];
      list.push(item);
      byScope.set(scope, list);
    }
  }

  const conflicts: ContinuityConflict[] = [];

  for (const [scope, items] of byScope) {
    const rules = items.map((x) => x.rule);
    const displayPath = items[0]?.rule.conflictKey
      ? normalizeSemanticKey(items[0].rule.conflictKey)
      : items[0]?.rule.path ?? scope;

    const locked = rules.filter((r) => r.level === "LOCK");
    const lockedValues = new Set(
      locked.map((r) => normalizeComparableValue(r.value)),
    );

    if (lockedValues.size > 1) {
      conflicts.push({
        kind: "HARD_CONFLICT",
        path: displayPath,
        message: `multiple incompatible LOCK values for ${displayPath}`,
      });
      continue;
    }

    const excludes = rules.filter((r) => r.level === "EXCLUDE");
    if (locked.length && excludes.length) {
      conflicts.push({
        kind: "HARD_CONFLICT",
        path: displayPath,
        message: `LOCK and EXCLUDE both target ${displayPath}`,
      });
      continue;
    }

    const holds = rules.filter((r) => r.level === "HOLD");
    const holdValues = new Set(
      holds.map((r) => normalizeComparableValue(r.value)),
    );

    if (holdValues.size > 1) {
      conflicts.push({
        kind: "SOFT_CONFLICT",
        path: displayPath,
        message: `multiple competing HOLD values for ${displayPath}`,
      });
    }
  }

  return conflicts;
}

export interface CapabilityProfile {
  supportedReferenceRoles: ReferenceRole[];
  /** Semantic LOCK paths/conflict keys the adapter can faithfully represent. */
  supportedLockPaths?: string[];
  maxReferences?: number;
  maxReferencesByRole?: Partial<Record<ReferenceRole, number>>;
  supportsMultipleCharacters?: boolean;
  maxCharacters?: number;
}

function semanticPathSupported(
  path: string,
  capability: CapabilityProfile,
): boolean {
  const patterns = capability.supportedLockPaths;
  if (!patterns || patterns.length === 0) return false;

  const normalizedPath = normalizeSemanticKey(path);

  for (const rawPattern of patterns) {
    const pattern = normalizeSemanticKey(rawPattern);

    if (pattern === "*") return true;

    if (pattern.endsWith(".*")) {
      const prefix = pattern.slice(0, -1);
      if (normalizedPath.startsWith(prefix)) return true;
    } else if (normalizedPath === pattern) {
      return true;
    }
  }

  return false;
}

export function capabilityWarnings(
  revision: ContinuityRevisionMeta,
  capability: CapabilityProfile,
): CapabilityWarning[] {
  const warnings: CapabilityWarning[] = [];
  const supported = new Set(capability.supportedReferenceRoles);

  const lockedTargets = new Set(
    revision.rules
      .filter((r) => r.level === "LOCK")
      .map((r) => normalizeSemanticKey(r.conflictKey ?? r.path)),
  );

  for (const ref of revision.references) {
    const target = ref.target ? normalizeSemanticKey(ref.target) : "";
    const required =
      ref.priority === 100 ||
      (target !== "" && lockedTargets.has(target));

    if (!supported.has(ref.role) && !required) {
      warnings.push({
        path: ref.target ?? `reference:${ref.id}`,
        message:
          `optional reference role ${ref.role} is unsupported and would be ignored`,
      });
    }
  }

  return warnings;
}

export function capabilityConflicts(
  revision: ContinuityRevisionMeta,
  capability: CapabilityProfile,
): ContinuityConflict[] {
  const conflicts: ContinuityConflict[] = [];
  const supported = new Set(capability.supportedReferenceRoles);

  const lockedTargets = new Set(
    revision.rules
      .filter((r) => r.level === "LOCK")
      .map((r) => normalizeSemanticKey(r.conflictKey ?? r.path)),
  );

  for (const rule of revision.rules) {
    if (rule.level !== "LOCK") continue;

    const semanticPath = normalizeSemanticKey(
      rule.conflictKey ?? rule.path,
    );

    if (!semanticPathSupported(semanticPath, capability)) {
      conflicts.push({
        kind: "CAPABILITY_CONFLICT",
        path: semanticPath,
        message:
          `model capability does not declare support for LOCK ${semanticPath}`,
      });
    }
  }

  const countByRole = new Map<ReferenceRole, number>();

  for (const ref of revision.references) {
    countByRole.set(ref.role, (countByRole.get(ref.role) ?? 0) + 1);

    const target = ref.target
      ? normalizeSemanticKey(ref.target)
      : "";
    const required =
      ref.priority === 100 ||
      (target !== "" && lockedTargets.has(target));

    if (!supported.has(ref.role) && required) {
      conflicts.push({
        kind: "CAPABILITY_CONFLICT",
        path: ref.target ?? `reference:${ref.id}`,
        message: `required reference role ${ref.role} is unsupported`,
      });
    }
  }

  if (
    capability.maxReferences !== undefined &&
    revision.references.length > capability.maxReferences
  ) {
    conflicts.push({
      kind: "CAPABILITY_CONFLICT",
      path: "references",
      message:
        `requires ${revision.references.length} references but model supports ` +
        capability.maxReferences,
    });
  }

  for (const [role, count] of countByRole) {
    const max = capability.maxReferencesByRole?.[role];
    if (max !== undefined && count > max) {
      conflicts.push({
        kind: "CAPABILITY_CONFLICT",
        path: `references.${role}`,
        message:
          `requires ${count} ${role} references but model supports ${max}`,
      });
    }
  }

  return conflicts;
}

export function compositionConflicts(
  revisions: ContinuityRevisionMeta[],
): ContinuityConflict[] {
  const conflicts = findRuleConflicts(revisions);
  const revisionsByRoot = new Map<string, Set<string>>();

  for (const revision of revisions) {
    const set = revisionsByRoot.get(revision.rootId) ?? new Set<string>();
    set.add(revision.revisionId);
    revisionsByRoot.set(revision.rootId, set);
  }

  for (const [rootId, revisionIds] of revisionsByRoot) {
    if (revisionIds.size > 1) {
      conflicts.push({
        kind: "HARD_CONFLICT",
        path: `root:${rootId}`,
        message:
          `composition contains multiple revisions of root ${rootId}: ` +
          [...revisionIds].sort().join(", "),
      });
    }
  }

  return conflicts;
}

export function compositionCapabilityConflicts(
  revisions: ContinuityRevisionMeta[],
  capability: CapabilityProfile,
): ContinuityConflict[] {
  const conflicts = [
    ...compositionConflicts(revisions),
    ...revisions.flatMap((revision) =>
      capabilityConflicts(revision, capability),
    ),
  ];

  const characterRoots = new Set(
    revisions
      .filter((r) => r.type === "character")
      .map((r) => r.rootId),
  );

  const maxCharacters =
    capability.maxCharacters ??
    (capability.supportsMultipleCharacters
      ? Number.POSITIVE_INFINITY
      : 1);

  if (characterRoots.size > maxCharacters) {
    conflicts.push({
      kind: "CAPABILITY_CONFLICT",
      path: "characters",
      message:
        `requires ${characterRoots.size} characters but model supports ${maxCharacters}`,
    });
  }

  return conflicts;
}
