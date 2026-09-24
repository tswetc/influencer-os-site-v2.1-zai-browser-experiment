# Central Architect Baseline — 2026-09-25

Status: SETTLED_BASELINE_UNLESS_ASTRA_FINDS_A_CONCRETE_FAILURE

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

Open question delegated to Astra A1:
whether simple direct executions also create implicit WorkflowRuns, or Workflow is only an orchestration layer over the same commands.

## B5 — Durable object/version model

Stable containers are distinct from historical execution state.

Stable containers:
Workspace, Project, Character, Scene, Plan, Workflow, Asset, ModelProfile.

Historical anchors include:
CharacterRevision, CanonRevision, SceneRevision, PlanRevision, PromptBuild,
SelfCheckReport, EngineAdapterVersion, ModelProfileVersion/effective snapshot,
OSRulesetVersion, WorkflowRevision, WorkflowRun, WorkflowNodeRun,
GenerationJob, GenerationAttempt, AssetVersion.

Astra A2/A3 may reduce this set where snapshots/hashes are sufficient.

Reproducibility means reconstructing exact effective inputs/request/lineage.
It does not promise identical future pixels from a stochastic external model.

## B6 — Draft vs historical truth

Accepted constraints:
- uncommitted UI editing state is not historical canon;
- generation may never depend on an ambiguous moving “latest” at execution time;
- before PromptBuild/GenerationJob, effective creative dependencies become immutable IDs/snapshots;
- historical PromptBuilds/Runs/Assets never rebase;
- upstream edits must not silently mutate already-executed downstream meaning.

Open to Astra A2:
- exact commit/revision boundaries;
- staleness/rebase UX and semantics;
- which objects need first-class revisions versus embedded snapshots.

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

Exact durable dispatch/cancel/crash semantics are Astra A4.

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

Pure deterministic nodes may use content-addressed cache.
Paid/non-deterministic generation output is never silently memoized as a “new” generation.
Reuse must be explicit and visible in lineage.

Astra A1 decides exact execution/rerun/reuse semantics and relationship to direct Studios/MCP.

## B10 — Model ecosystem constraints

Current OS23.6 hardcoded EngineId + executable engine rules are verified source behavior, not the final extensibility model.

Future architecture must preserve meaningful model/provider differences.

Do not create a fake lowest-common-denominator provider DSL.

A model/provider change must never silently rewrite historical PromptBuild semantics.

Founder-required model research must pass through an evidence/evaluation/promotion path before LIVE status.

Astra A3 decides:
- task/capability vs provider/model/profile/adapter separation;
- code/config boundary;
- model/profile version semantics;
- rollout/eval/rollback lifecycle.

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

Exact web/API/MCP/worker token model is Astra A5.

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

Exact phase order is Astra A6.

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
