# Influencer OS Domain Model V1

Status: REQUIRED SEMANTIC CONTRACT FOR NEW FULL-PRODUCT RUNS

The goal is reproducibility, identity continuity, explicit lineage and safe multi-provider execution.

## Identity + ownership

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
Semantic intent independent from a specific provider payload.

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
A durable planning container for Series / Shoot / Feed / multi-output work.

Recommended types:
- SERIES
- SHOOT
- FEED
- MULTISHOT
- SEASON

### Shot
An atomic planned capture/output unit.

Links:
- Scene
- CharacterRevision
- CanonRevision
- Plan when applicable

Shot is not the generated file.

## Prompt compilation

### PromptBuild
Immutable compiled OS artifact.

Inputs must include IDs/hashes for:
- CharacterRevision;
- CanonRevision;
- Scene/Shot;
- format;
- ModelProfile;
- EngineAdapterVersion.

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

Rules:
- secret value never serialized into normal domain exports/logs;
- workspace/user-scoped;
- provider switch must not leak stale provider-specific credentials or model slugs.

### ModelProfile
Stable model capability record plus versioned/snapshotted effective settings.

Carries:
- provider family;
- model slug/display;
- image/video modes;
- reference capabilities;
- duration/resolution/aspect constraints;
- audio support;
- status: LIVE / SUPPORTED_NOT_TESTED / UI_ONLY / UNAVAILABLE / DEPRECATED.

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
- ModelProfile snapshot;
- request payload hash;
- provider request/response IDs where safe;
- status;
- timings;
- error class;
- retry/fallback reason;
- cost metadata when available.

Retries always create another GenerationAttempt.

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

Keep separate from identity/authentication and from pricing copy.

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
7. Provider secrets never enter export bundles, audit logs or client persistence.
8. LIVE is runtime evidence, not a UI label chosen by design.
