# Influencer OS Domain Model V1

Status: PRE_ASTRA_SEMANTIC_BASELINE

This file is a V1 baseline.
Current pre-Astra supplements in PRE-ASTRA-CENTRAL-DECISIONS-R2/R3 take precedence where more specific.
Official E/Q runs will receive a post-Astra Architecture V4 domain contract before launch.

The goal is reproducibility, identity continuity, explicit lineage and safe multi-provider execution.

## Identity + ownership

### Principal
Authenticated actor identity.

Kinds:
- HUMAN
- SERVICE_CLIENT
- WORKER

Authentication does not imply Workspace authorization or Entitlement.

### WorkspaceMembership
Binds Principal to Workspace role/permissions.

### Workspace
Top-level collaboration/ownership boundary.

Owns:
- Projects
- ProviderConnections
- Entitlements
- members/roles when auth supports them

### Project
One durable creative production context.

Owns/references:
- Characters
- Scenes
- Plans/Shots
- Workflows
- Assets
- Exports

A Project must never silently share mutable state with another Project.

## Character + canon

### Character
Stable identity object.

Contains stable metadata only:
- id
- project/workspace ownership
- display label
- active revision pointers
- lifecycle state

### CharacterRevision
Immutable snapshot of the Character Passport identity layer.

Must support source semantics:
- identity full / mid / micro;
- reference assignments;
- vision-derived context where used;
- Anomaly Lock;
- static/motion face adherence;
- device/physical-prop context where source uses it.

Never mutate a revision used by an existing PromptBuild or AssetVersion.

### CanonRevision
Immutable creative/narrative canon snapshot associated with a Character and/or Project.

Carries current source-preserving canon state such as:
- visual/world constraints;
- mood/rules;
- persistent context required by planning/prompt assembly.

CharacterRevision and CanonRevision are separate so identity correction does not rewrite narrative canon history.

## Scene + planning

### Scene
Stable reusable scene container.

### SceneRevision
Immutable semantic scene intent independent from a specific provider payload.

Includes:
- world;
- technique;
- scene-pack/scene reference where applicable;
- environment/action;
- wardrobe/product/props;
- capture intent;
- format;
- language/text intent where applicable.

### Plan
Stable planning container for Series / Shoot / Feed / multi-output work.

### PlanRevision
Immutable saved plan definition.

Recommended types:
- SERIES
- SHOOT
- FEED
- MULTISHOT
- SEASON

### Shot
An atomic planned capture/output unit owned by an immutable PlanRevision (or immutable standalone execution input where applicable).

Links exact:
- SceneRevision;
- CharacterRevision;
- CanonRevision;
- PlanRevision when applicable.

Shot is not the generated file.

No separate ShotRevision is required in v1; changing saved shot content creates a new PlanRevision.

## Prompt compilation

### PromptBuild
Immutable compiled OS artifact.

Inputs must include IDs/hashes for:
- CharacterRevision;
- CanonRevision;
- SceneRevision/Shot;
- format;
- ModelProfileRevision/effective model semantic snapshot;
- EngineAdapterVersion;
- OS ruleset/compiler version.

Stores inspectable layers:
1. Identity
2. Canon
3. World
4. Technique
5. Scene
6. Capture / Realism
7. Format
8. Engine Adapter
9. Quality / Self-check context
10. final provider payload

Stores:
- build version;
- deterministic input hash;
- final payload hash;
- language;
- timestamps.

PromptBuild is the reproducibility anchor.

### EngineAdapterVersion
Immutable version of provider/model-specific prompt transformation behavior.

Never silently change the adapter semantics for an old PromptBuild.

### SelfCheckReport
Immutable validation result bound to:
- PromptBuild;
- optionally AssetVersion for post-generation QA.

Stores rule IDs, pass/fail/warn, evidence and rule-set version.

## Generation

### ProviderConnection
Credential/configuration binding.

Stores metadata + secret_ref only.

Credential modes:
- USER_BYOK_HOSTED;
- WORKSPACE_BYOK_HOSTED;
- PLATFORM_MANAGED;
- LEGACY_LOCAL_DIRECT (migration only).

Rules:
- raw secret never serialized into normal domain rows/exports/logs/MCP payloads;
- hosted secret lives in encrypted secret storage;
- provider switch must not leak stale provider-specific credentials/model identifiers;
- revocation blocks new attempts without rewriting history.

### CapabilityDefinition
Influencer OS semantic task contract.

Examples:
image.generate, image.edit, image_to_video, video.extend.

Defines typed input/output requirements independent of a specific provider.

### Provider
External vendor/gateway identity.

### ModelFamily
Conceptual external model/family identity when the vendor/provider exposes one meaningfully.

### ProviderDeployment
One provider-addressable route/model slug/deployment/alias.

A mutable provider alias is NOT treated as an immutable model version.

### ModelProfile
Stable Influencer OS product-facing model/profile identity.

### ModelProfileRevision
Immutable approved semantic/configuration revision.

Carries:
- supported CapabilityDefinition IDs;
- defaults/constraints;
- EngineAdapterVersion;
- research/evaluation evidence references;
- release state.

Release state is separate from operational health.

### EngineAdapterVersion
Immutable Influencer OS semantic/prompt transformation behavior.

### ProviderAdapterVersion
Immutable transport/protocol adapter behavior:
auth, request serialization, polling/webhook normalization, error/cost normalization.

### ModelDeploymentSnapshot
Immutable execution-time provider/deployment observation pinned by GenerationAttempt.

Stores, where available:
- provider;
- requested deployment/alias;
- returned model/version identifier;
- observed capability metadata;
- verified_at;
- reproducibility limitation if provider exposes no immutable model version.

### ResearchEvidence / EvalSuiteVersion / EvalRun / PromotionDecision
Durable evidence and release-governance objects supporting:
discovery → research → integration verification → eval → canary/beta → LIVE → rollback/deprecation.

### GenerationJob
One logical user request.

Contains:
- PromptBuild;
- desired output role/count;
- selected provider/model strategy;
- idempotency key;
- current aggregate status.

### GenerationAttempt
One actual execution attempt.

Contains:
- job ID;
- provider connection reference;
- ModelProfileRevision reference;
- ProviderAdapterVersion;
- ModelDeploymentSnapshot;
- request payload hash;
- provider request/response IDs where safe;
- lifecycle/provider/materialization status;
- timings;
- error class;
- retry/fallback reason;
- cost metadata.

Retries always create another GenerationAttempt.

A SUBMISSION_UNKNOWN attempt never triggers automatic retry/fallback when duplicate billing/execution cannot be excluded.

## Assets + lineage

### Asset
Logical creative asset.

Examples:
- image;
- video;
- audio;
- reference;
- product image;
- workflow input.

### AssetVersion
Immutable binary/file version.

Contains:
- content hash;
- derivative metadata;
- dimensions/duration;
- storage pointer;
- provenance;
- publication/rights state.

Edits create a new AssetVersion.

### Lineage
Typed directed edges describing derivation.

Example edge types:
- REFERENCE_FOR
- GENERATED_FROM
- EDITED_FROM
- VIDEO_FROM_IMAGE
- VARIANT_OF
- INPUT_TO
- OUTPUT_OF
- REMIXED_FROM

Lineage must support a graph, not only one parent pointer.

## Generation durability support

### BudgetReservation
Durable estimated-cost/budget hold for managed billing or workspace budget policy.

Finalizes/releases only when provider cost state is sufficiently known.

### DispatchOutbox
Durable dispatch intent created transactionally with GenerationJob/Attempt.

### ProviderEventInbox
Deduplicated normalized provider webhook/poll event intake.

These are supporting persistence/runtime objects; they do not replace GenerationJob/Attempt history.

## Workflows

### Workflow
Stable user-facing workflow identity.

### WorkflowRevision
Immutable graph definition.

Contains:
- node definitions;
- typed ports;
- edges;
- node configuration;
- referenced ModelProfiles/Adapter versions;
- schema version.

### WorkflowRun
Execution instance of a WorkflowRevision.

Tracks per-node status and links every produced PromptBuild/GenerationJob/AssetVersion.

This object is added because a reusable Workflow and a particular execution are different concepts.

## Export + audit + commerce

### ExportBundle
Immutable export manifest linking exact revisions/assets/workflows and hashes.

### AuditEvent
Append-oriented event for important mutations/executions:
- actor;
- action;
- object;
- timestamp;
- correlation/run ID;
- result.

Do not log secrets.

### Entitlement
What the user/workspace is allowed to access.

Keep separate from authentication, WorkspaceMembership and pricing copy.

### MigrationRecord
Records one fail-closed local→server project migration:
source backup hash, dry-run plan, ID map, verification result, cutover time and source/target authority.

A Project is either LOCAL_CANONICAL or SERVER_CANONICAL during migration.
Never dual-write as a permanent architecture.

## ID policy

Use opaque stable IDs.

Never derive canonical IDs from:
- a real person's name;
- file names;
- social handles;
- provider display labels.

## Hard invariants

1. Historical revisions are immutable.
2. Retry != overwrite.
3. Asset edit != overwrite.
4. Public/UI/MCP operations share the same core use cases.
5. Every generated AssetVersion has lineage back to its PromptBuild and GenerationAttempt.
6. PromptBuild records adapter/model snapshots needed for reproduction.
7. Hosted provider secrets never enter export bundles, audit logs, MCP payloads or ordinary browser persistence.
8. LIVE is evidence-backed release state, not a UI label chosen by design.
9. Workflow execution and direct Studios use the same application commands; ordinary Studio actions do not imply WorkflowRun.
10. Historical execution never depends on ambiguous latest/current revisions.
11. Provider alias/model drift never rewrites historical PromptBuild or GenerationAttempt meaning.
12. A project has one canonical authority at a time during migration.
