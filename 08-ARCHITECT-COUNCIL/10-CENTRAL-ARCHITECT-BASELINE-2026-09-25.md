# Central Architect Baseline — 2026-09-25

Status: SETTLED_BASELINE_WITH_R2_R3_SUPPLEMENTS

Current specific decisions in PRE-ASTRA-CENTRAL-DECISIONS-R2.md and PRE-ASTRA-CENTRAL-DECISIONS-R3.md supersede older OPEN wording below where they conflict.

A1/A2/A5/A6 are now centrally closed.
Only K1/K2 remain provisionally open.

Purpose: remove already-solvable architecture work from Astra R001 so scarce high-capability reasoning is spent only on the remaining dangerous decision knots.

## B1 — Product shape

Influencer OS is one coherent platform with four logical areas:

1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

These share one domain/application model.

Guided/direct Studios and Expert Workflow Graph both exist.
Neither is a fake demo layer.

Public pages and Creator routes may initially live in one Next.js deployment, but logical boundaries remain explicit.

## B2 — Deployment topology

Use a modular monolith first.

Hosted beta / first production-capable shape:
- web/API/MCP process;
- separate async worker process;
- one relational primary database;
- one object-storage system;
- queue/scheduling behind an internal interface.

Service extraction only after measured evidence:
- independent scaling profile;
- failure-isolation requirement;
- materially different deployment/security boundary;
- heavy media/queue load harming interactive traffic;
- independent release cadence with a stable contract.

No microservice split for appearance.

## B3 — Primary persistence

Use a Postgres-class relational database for durable product metadata and transactions.

Use object storage for:
- original uploads;
- generated images/video/audio;
- immutable derivatives;
- export archives when retained.

DB stores storage keys, hashes, metadata, provenance, rights/publication state, lineage and ownership.

Do not store large media blobs in ordinary relational rows.

## B4 — Application boundary

Canonical behavior lives in application use cases, not UI components and not transport handlers.

Examples:
CreateCharacter, CommitCharacterRevision, CommitCanonRevision, BuildPrompt,
ValidatePrompt, CreateGenerationJob, CancelGenerationJob, RetryGeneration,
SaveAssetVersion, SaveWorkflowRevision, ExecuteWorkflow, ExportProject, ImportProject.

Creator UI, HTTP API and MCP call the same application services.

No transport-specific prompt/generation semantics.

Direct/guided Studio actions do NOT create implicit WorkflowRuns by default.

Workflow is an orchestration layer over the same application commands.

Every command carries a shared ExecutionContext/correlation envelope with surface/origin and optional WorkflowRun/WorkflowNodeRun identifiers.

Direct MCP/API tools map to the same application commands.
Explicit workflow execution creates WorkflowRun/WorkflowNodeRun.

## B5 — Durable object/version model

Stable containers are distinct from historical execution state.

Stable containers:
Workspace, Project, Character, Scene, Plan, Workflow, Asset, ModelProfile.

Historical anchors include:
CharacterRevision, CanonRevision, SceneRevision, PlanRevision, PromptBuild,
SelfCheckReport, EngineAdapterVersion, ModelProfileVersion/effective snapshot,
OSRulesetVersion, WorkflowRevision, WorkflowRun, WorkflowNodeRun,
GenerationJob, GenerationAttempt, AssetVersion.

Creative-side revision policy is now accepted centrally.

Keep first-class:
CharacterRevision, CanonRevision, SceneRevision, PlanRevision, WorkflowRevision.

Do not add ShotRevision initially; immutable Shot definitions belong to a PlanRevision or immutable Shot records owned by that revision.

Astra A3 may still refine model/profile/adapter version anchors.

Reproducibility means reconstructing exact effective inputs/request/lineage.
It does not promise identical future pixels from a stochastic external model.

## B6 — Draft vs historical truth

Creators edit mutable drafts with a baseRevisionId and optimistic-concurrency/version token.

Autosave updates the draft; it does not create revision spam.

An immutable revision is created when:
- the user explicitly saves/checkpoints/publishes; OR
- an operation requires durable history and the draft is dirty.

The second case is a transparent EXECUTION_CHECKPOINT.

Draft dependency mode may be FOLLOW_ACTIVE or PINNED.

Before PromptBuild/Workflow execution, FOLLOW_ACTIVE resolves to exact immutable revision IDs/snapshots and those bindings are stored.

No historical revision/build/run/asset ever rebases in place.

“Update to current” operates only on a mutable draft and produces a new revision.

Derived previews/builds may be marked OUTDATED_VS_CURRENT when input hashes differ, but historical outputs remain valid history.

Manual prompt editing creates a new PromptBuild derived from the original and reruns SelfCheck.

CharacterRevision and CanonRevision remain separate histories.

## B7 — Generation history

GenerationJob = one logical user intent.
GenerationAttempt = one actual provider/model execution attempt.

Retry/fallback always creates another attempt.

Never overwrite:
- prior provider request;
- prior model snapshot;
- prior error;
- prior cost/usage record;
- prior output lineage.

Provider fallback must be explicit.
Automatic fallback requires proven semantic/capability compatibility; otherwise explicit user/workflow approval.

R3 establishes the durable outbox/inbox/idempotency/cancel/materialization/cost baseline.
Only K2 remains open: the non-idempotent/no-lookup ambiguous-submit window.

## B8 — Idempotency constraints

Externally retryable commands have idempotency keys.

Workers assume at-least-once delivery and must be idempotent.

Provider-native idempotency is used when supported.

Webhook/event handling deduplicates by stable provider identifiers when available.

These are constraints, not the complete A4 state machine.

## B9 — Workflow v1 constraints

WorkflowRevision is immutable.
Workflow v1 is DAG-first.
No arbitrary graph cycles.

Iteration is expressed through bounded constructs such as:
Batch/Map, Variant, retry policy, reusable Subworkflow.

Editing and execution are distinct.
Manual gates may suspend and resume a run.

Pure deterministic nodes may use content-addressed cache with a visible cache-hit record.
Paid/non-deterministic generation output is never silently memoized as a “new” generation.
Reuse is explicit and visible in lineage.

Each selected/downstream rerun creates a new WorkflowRun referencing the parent run and rerun scope.

Unchanged upstream outputs are referenced from the parent run.

Rerunning a generation node creates a new GenerationJob/Attempt history.

Manual approval gates suspend/resume the same run with approval evidence.

Saved subworkflows pin an exact WorkflowRevision by default.
An intentional follow-current subworkflow reference resolves to an exact revision at run start.

## B10 — Model ecosystem constraints

Current OS23.6 hardcoded EngineId + executable engine rules are verified source behavior, not the final extensibility model.

Future architecture must preserve meaningful model/provider differences.

Do not create a fake lowest-common-denominator provider DSL.

A model/provider change must never silently rewrite historical PromptBuild semantics.

Founder-required model research must pass through an evidence/evaluation/promotion path before LIVE status.

R3 establishes the provisional model lifecycle:
CapabilityDefinition, Provider, ModelFamily, ProviderDeployment, ModelProfile/Revision, EngineAdapterVersion, ProviderAdapterVersion, ModelDeploymentSnapshot, ResearchEvidence, EvalRun and PromotionDecision.

Only K1 remains open on whether one immutable ModelProfileRevision binds one primary deployment or a deployment set.

## B11 — Auth / authorization / entitlement separation

Authentication = who is the principal.
Authorization = what workspace/project/object may they access.
WorkspaceMembership/Role = role within workspace.
Entitlement = what product capabilities may be used.

These are distinct concepts.

ProviderConnection secrets:
- server-side for production-capable architecture;
- encrypted at rest;
- referenced by ID;
- not serialized into ordinary exports/logs/telemetry;
- not retained in ordinary browser persistence.

BYOK and platform-managed credentials may both exist but must be explicit ownership modes.

Anonymous demo is transient and must not become a hidden long-lived workspace.

Resolved by R3:
external mature OIDC/OAuth;
secure server-managed browser session;
audience-restricted API tokens;
MCP as OAuth protected resource;
object-level application authorization;
secret_ref-only ProviderConnection;
service-principal workers;
no silent legacy-key upload.

## B12 — Asset and lineage model

Asset = logical creative identity.
AssetVersion = immutable binary/file version.

Edits create new AssetVersions.

Lineage is a typed directed graph over exact versions.
No lineage edge targets ambiguous “latest”.

Content hashes provide integrity/dedupe, not semantic identity.

User/private media is private by default.
Publication/rights state is separate from asset existence.

## B13 — Audit vs telemetry

AuditEvent = durable product/security history.
Telemetry/tracing = operational observability.

Use correlation IDs across:
web/API/MCP command → application use case → job/run → attempt/node run → provider → resulting asset.

No raw provider secrets in either.
Sensitive prompt/reference content is not emitted to telemetry by default.

## B14 — Export/import

ExportBundle is schema-versioned and immutable.

Contains:
- manifest version;
- exact IDs/revisions;
- referenced hashes;
- lineage;
- media inclusion/pointers per export mode;
- provenance/rights/publication metadata where applicable.

Excludes:
- provider secrets;
- auth tokens;
- ephemeral sessions.

Import is two-phase:
1. validate/plan without mutation;
2. transactional apply plus verified media handling.

Unknown future schema fails closed without a migrator.

## B15 — Current Web App migration constraints

No big-bang rewrite.
No indefinite permanent dual architecture.

Current behavior that is product value must be preserved:
Passport/Canon semantics, prompt compiler, engine rules, parser/trust gates,
backup/import validity, provider-switch secret clearing, self-check, EN/RU and tested edge cases.

Hosted architecture should become server-canonical for durable product objects after migration.

Existing local provider keys must NEVER be silently uploaded.
Reconnect/re-authorize explicitly.

Local storage may remain for:
- UI draft/cache;
- migration bridge;
- portability/export;
but not as the only production canon after migration.

Resolved by R3:
M0 behavior freeze → M1 application seam → M2 local domain normalization → M3 account/server substrate → M4 dry-run MigrationPlan → M5 verified per-project SERVER_CANONICAL cutover → M6 provider reconnect → M7 durable generation → M8 dynamic model layer → M9 graph/API/MCP → M10 local-canonical retirement.

No permanent dual-write.

## B16 — Browser candidate promotion

Never merge an entire browser candidate because it “looks best”.

Promotion unit may be:
- accepted ADR;
- domain/application contract;
- tested pure module;
- design system/token set;
- bounded UI component;
- interaction pattern;
- selected copy/IA;
- audited provider-independent adapter.

Every promoted implementation unit passes:
source-behavior compatibility, dependency-direction, security/secrets, tests, provenance/license and migration-impact review.

## B17 — Deferred product surfaces

Community/social graph is not a current architecture driver.

Do not let future community/profile/comment concepts distort the core before:
ownership, publication state, assets, auth and workspace semantics are stable.

## B18 — What not to generalize yet

Do NOT add now:
- microservice mesh;
- generic enterprise event bus;
- distributed saga framework;
- arbitrary cyclic workflow language;
- multi-database portability abstraction;
- custom identity provider;
- universal provider DSL erasing real model differences;
- vector/RAG layer without demonstrated product need;
- Kubernetes for appearance;
- CQRS/event sourcing for ordinary versioned state.
