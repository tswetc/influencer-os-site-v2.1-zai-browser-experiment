# Central Architect Baseline — 2026-09-25

Status: SETTLED_BASELINE_UNLESS_ASTRA_FINDS_A_CONCRETE_FAILURE

Purpose: remove already-solvable architecture work from Astra R001 so scarce high-capability reasoning is spent only on the remaining dangerous decision knots.

## B1 — Deployment topology

Use a modular monolith first.

Browser candidate:
- one repository;
- strict internal packages/modules;
- mock/local adapters allowed;
- no fake microservices.

Hosted beta / first production-capable shape:
- web/API/MCP process;
- separate async worker process;
- one relational primary database;
- one object-storage system;
- optional queue transport behind an interface.

Keep the web/API/MCP transport layer thin over shared application use cases.

Service extraction is justified only by measured operational pressure such as:
- independent scaling profile;
- failure isolation requirement;
- materially different deployment/security boundary;
- queue throughput or video-processing load that harms interactive traffic;
- independent release cadence with a stable contract.

Do not split services for aesthetic architecture reasons.

## B2 — Primary persistence

Use a Postgres-class relational database for durable product metadata and transactions.

Use object storage for:
- original uploads;
- generated images/video/audio;
- immutable derivatives;
- export archives when retained.

Database rows store:
- object-storage keys;
- cryptographic hashes;
- media metadata;
- provenance;
- rights/publication state;
- lineage;
- ownership/workspace scope.

Do not store large media blobs in the relational database by default.

## B3 — Durable object/version model

Stable container identities and immutable revisions are separate concepts.

Required stable containers:
Workspace, Project, Character, Scene, Plan, Workflow, Asset, ModelProfile.

Required immutable/versioned execution anchors:
CharacterRevision, CanonRevision, SceneRevision, PlanRevision, PromptBuild,
SelfCheckReport, EngineAdapterVersion, OSRulesetVersion, WorkflowRevision,
WorkflowRun, WorkflowNodeRun, GenerationJob, GenerationAttempt, AssetVersion.

ModelProfile has a stable identity plus a version/effective snapshot used by execution.

A generated result must be traceable to the exact versions/snapshots that influenced the request.

Important definition:
reproducibility means reconstructing the exact effective inputs/request/lineage.
It does NOT promise identical future pixels from a stochastic external model.

## B4 — Application boundary

The canonical behavior boundary is application use cases, not UI components and not transport handlers.

Examples:
- CreateCharacter
- ReviseCharacter
- ReviseCanon
- ReviseScene
- BuildPrompt
- ValidatePrompt
- CreateGenerationJob
- CancelGenerationJob
- RetryGeneration
- SaveAssetVersion
- SaveWorkflowRevision
- ExecuteWorkflow
- ExportProject
- ImportProject

Creator UI, HTTP API and MCP call the same application services.

No separate `webBuildPrompt`, `apiBuildPrompt`, `mcpBuildPrompt` semantic implementations.

## B5 — Generation history

`GenerationJob` = one logical user intent.

`GenerationAttempt` = one actual provider/model execution attempt.

Retry/fallback always creates another attempt.

Never overwrite:
- prior provider request;
- prior model snapshot;
- prior error;
- prior cost/usage record;
- prior output lineage.

Provider fallback must be explicit in history.
A fallback is allowed automatically only when a policy confirms capability/semantic compatibility.
Otherwise it requires explicit user/workflow approval.

## B6 — Idempotency baseline

Every externally retryable command has an idempotency key at the application boundary.

Provider dispatch uses a stable attempt identifier and provider-native idempotency when supported.

Webhook/event handlers deduplicate using stable external event/request IDs where available.

Worker execution assumes at-least-once delivery and must therefore be idempotent.

The exact queue/outbox implementation remains an Astra question, not the semantics above.

## B7 — Workflow v1 shape

WorkflowRevision is immutable.

Workflow v1 is DAG-first.
No arbitrary graph cycles.

Iteration is represented explicitly through bounded nodes such as:
- Batch / Map
- Variant
- Retry policy
- reusable Subworkflow

Editing and execution are separate.

Manual approval gates may suspend a run and resume it later.

Pure deterministic nodes may use automatic content-addressed caching.
Non-deterministic or paid generation nodes must not silently memoize as if a fresh generation occurred.
Reuse of an existing generated output must be explicit and visible in lineage.

The exact representation of partial reruns and reused node executions remains an Astra question.

## B8 — Auth / authorization / entitlement separation

Authentication answers: who is the principal?

Authorization answers: what workspace/project/object may they access?

WorkspaceMembership/Role answers: what role do they have in that workspace?

Entitlement answers: what product capabilities may the principal/workspace use?

These concepts must not be collapsed.

ProviderConnection secrets:
- server-side only for production-capable architecture;
- encrypted at rest;
- referenced by ID from jobs;
- never serialized into standard domain exports;
- never copied into audit/telemetry payloads;
- never stored in ordinary browser local persistence.

Exact remote MCP token/session design remains an Astra question.

## B9 — Asset and lineage model

Asset = logical creative identity.
AssetVersion = immutable binary/file version.

Every edit creates a new AssetVersion.

Lineage is a typed directed graph over exact versions.
A lineage edge never points ambiguously to “latest”.

Minimum useful edge classes include:
REFERENCE_FOR, GENERATED_FROM, EDITED_FROM, VIDEO_FROM_IMAGE,
VARIANT_OF, INPUT_TO, OUTPUT_OF, REMIXED_FROM.

Use content hashes for integrity/deduplication but never treat hash equality alone as semantic identity.

## B10 — Audit vs telemetry

AuditEvent is durable product/security history:
who did what to which domain object and with what result.

Telemetry/tracing is operational:
latency, spans, queue time, provider call timing, errors, resource usage.

Use one correlation/run ID across:
web/API/MCP command → application use case → job → attempt → provider interaction → resulting asset.

Do not put secrets or raw sensitive prompt/reference material into telemetry by default.

## B11 — Export/import

ExportBundle is schema-versioned and immutable.

It contains:
- manifest version;
- object IDs/revisions;
- referenced hashes;
- lineage;
- media inclusion/pointers according to export mode;
- provenance/rights/publication metadata where applicable.

It excludes:
- provider secrets;
- auth tokens;
- ephemeral sessions.

Import is two-phase:
1. validate/plan with no mutation;
2. transactional apply of metadata plus verified media handling.

Unknown future schema versions fail closed unless an explicit migrator exists.

## B12 — Browser candidate promotion

Never merge an entire browser candidate into the canonical product because it “looks best”.

Promotion unit may be:
- an accepted ADR;
- a domain/application contract;
- a tested pure module;
- a design token/system;
- a bounded UI component;
- an interaction pattern;
- selected copy/IA;
- an audited provider-independent adapter.

Every promoted implementation unit must pass:
- source-behavior compatibility;
- dependency-direction check;
- security/secrets check;
- test coverage appropriate to the boundary;
- provenance/license check for media/assets;
- migration impact review.

## B13 — What not to generalize yet

Do NOT add now:
- microservice mesh;
- generic enterprise event bus;
- distributed saga framework;
- arbitrary cyclic workflow language;
- pluggable database abstraction for multiple SQL engines;
- custom identity provider;
- universal provider DSL that erases meaningful provider differences;
- vector database/RAG layer without a demonstrated product need;
- Kubernetes solely for architectural appearance;
- CQRS/event sourcing for ordinary CRUD/versioned state.

These are future options only if evidence creates a real need.
