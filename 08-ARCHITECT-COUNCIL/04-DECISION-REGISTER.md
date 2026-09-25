# Architecture Decision Register

Date: 2026-09-25

Status values:
ACCEPTED · PROVISIONAL · OPEN · SUPERSEDED.

Astra R001 should focus only on OPEN sub-decisions or show a concrete failure in the baseline.

## ADR-001 — One product / four logical areas
Status: ACCEPTED

Public/Product Experience
Creator App
OS Core/API/Generation Services
MCP/Agent Surface

One shared domain/application model.

## ADR-002 — Modular monolith first
Status: ACCEPTED

Strict module/package boundaries first.
Service extraction only after operational evidence.

## ADR-003 — Shared application/core behavior
Status: ACCEPTED

Web, HTTP API and MCP invoke the same application use cases.

Direct/guided Studio commands do NOT instantiate an implicit WorkflowRun by default.

Workflow is an orchestration layer over those same commands.

Every command carries a common ExecutionContext/correlation envelope; direct MCP/API calls map to ordinary commands, while explicit workflow execution creates WorkflowRun/WorkflowNodeRun.

Decision evidence:
`PRE-ASTRA-CENTRAL-DECISIONS-R2.md`.

## ADR-004 — Immutable historical creative/execution state
Status: ACCEPTED

Creators edit mutable drafts.

Immutable revisions are created on explicit checkpoint/save OR transparently before an execution that requires durable history when the draft is dirty.

FOLLOW_ACTIVE dependencies resolve to exact immutable revisions at execution.
PINNED dependencies stay pinned.

Historical revisions/builds/runs/attempts/assets never rebase or mutate.

Manual prompt edits create a derived PromptBuild rather than mutating the original.

First-class creative revisions in v1:
CharacterRevision · CanonRevision · SceneRevision · PlanRevision · WorkflowRevision.

No ShotRevision initially.

Decision evidence:
`PRE-ASTRA-CENTRAL-DECISIONS-R2.md`.

## ADR-005 — GenerationJob != GenerationAttempt
Status: ACCEPTED

Retry/fallback creates another attempt.
No attempt overwrite.

## ADR-006 — Typed AssetVersion lineage graph
Status: ACCEPTED

Lineage targets exact versions and supports multiple parents/derivations.

## ADR-007 — Guided Studios + Expert Workflow Graph
Status: ACCEPTED

Two interaction layers, one system.

## ADR-008 — Workflow v1 is DAG-first
Status: ACCEPTED

No arbitrary cycles.

WorkflowRun exists only for actual workflow execution.

Downstream/selected rerun creates a new WorkflowRun referencing the parent run and explicit reused upstream outputs.

Deterministic pure nodes may produce recorded cache hits.

Paid/non-deterministic generation is never silently memoized as a new generation.

Manual approval suspends/resumes the same run.

Saved subworkflows pin an exact WorkflowRevision by default; intentional follow-current binding resolves to an exact revision at run start.

Decision evidence:
`PRE-ASTRA-CENTRAL-DECISIONS-R2.md`.

## ADR-009 — Production metadata persistence
Status: ACCEPTED

Postgres-class relational store + object storage.

## ADR-010 — Async worker boundary
Status: ACCEPTED

Hosted production-capable shape uses an async worker for long generation.

Accepted:
- durable DB create transaction + DispatchOutbox;
- idempotent/leased worker execution;
- provider-native idempotency where available;
- ProviderEventInbox/reducer for webhook + polling;
- cancellation and late-success are recorded truthfully;
- provider success is distinct from output materialization success;
- budget/cost reservation is durable;
- no automatic fallback from ambiguous prior execution.

Current milestone decision:
- classify route submission safety as IDEMPOTENT_SUBMIT / RECONCILABLE_SUBMIT / NON_RECONCILABLE_SUBMIT;
- SUBMISSION_UNKNOWN + no automatic retry/fallback for irreducible ambiguity;
- BYOK-first user-funded generation;
- PLATFORM_MANAGED execution is forbidden on NON_RECONCILABLE_SUBMIT routes;
- managed user credits require a separate financial-ledger ADR before enablement.

Decision evidence:
`K2-BILLING-SAFETY-DECISION.md`.

## ADR-011 — Model/provider/adapter lifecycle
Status: ACCEPTED

Current hardcoded EngineId and per-engine compiler remain source behavior, not the permanent extensibility model.

Accepted separation:
- CapabilityDefinition;
- ModelIdentity;
- ModelProfile;
- ModelProfileRevision;
- EngineAdapterVersion;
- Provider;
- ProviderDeployment;
- ProviderAdapterVersion;
- ModelRoute;
- GenerationStrategy;
- ModelDeploymentSnapshot;
- ResearchEvidence;
- EvalSuiteVersion/EvalRun;
- PromotionDecision.

A ModelProfileRevision is semantic and provider-route independent.

ModelRoute is the immutable approved compatibility binding:
ModelProfileRevision + ProviderDeployment + ProviderAdapterVersion + route-specific overrides/evidence/promotion state.

A ModelProfileRevision may have zero, one or many ModelRoutes.

Fallback/portfolio policy belongs to GenerationStrategy/GenerationJob, not ModelProfileRevision.

Release lifecycle and operational health are separate axes.

PromptBuild pins ModelProfileRevision + EngineAdapterVersion.
GenerationAttempt pins exact ModelRoute + ProviderAdapterVersion + ModelDeploymentSnapshot.

Mutable provider aliases are never claimed as immutable versions.
Material alias drift creates drift evidence/new route verification; old history is never rewritten.

Decision evidence:
`K1-MODEL-ROUTE-DECISION.md`.

## ADR-012 — Production asset/media storage
Status: ACCEPTED

Object storage + relational metadata + hashes + AssetVersion lineage.
Public Wave transport is development-only.

## ADR-013 — Authentication / authorization / entitlement separation
Status: ACCEPTED

Principal, WorkspaceMembership/role, object authorization and Entitlement are distinct.

Use mature external OIDC/OAuth infrastructure; do not build a custom IdP.

Browser human session:
secure HttpOnly server-managed/BFF session; no long-lived bearer token in localStorage.

HTTP API:
audience-restricted OAuth access tokens + coarse scopes + object-level authorization.

Remote MCP:
OAuth protected resource/resource server using current MCP authorization discovery/Protected Resource Metadata; transport auth never replaces application authorization.

ProviderConnection stores metadata + secret_ref only.
Hosted provider secrets live in encrypted secret storage and are never returned into MCP/export/audit/telemetry.

Credential modes:
USER_BYOK_HOSTED · WORKSPACE_BYOK_HOSTED · PLATFORM_MANAGED · LEGACY_LOCAL_DIRECT(migration-only).

Workers use service identity and resolve only the secret reference authorized for the Attempt.
They never persist/replay the human user's bearer token.

Legacy local browser keys are never silently uploaded.

Decision evidence:
`PRE-ASTRA-CENTRAL-DECISIONS-R3.md`.

## ADR-014 — Browser candidate promotion
Status: ACCEPTED

No whole-candidate merge.

Promote only audited contracts/modules/components/design/interaction units.

## ADR-015 — Source/compiler/version provenance
Status: ACCEPTED

PromptBuild persists enough exact semantic state to reconstruct the effective compiled intent:
- exact creative revision IDs;
- ModelProfileRevision;
- EngineAdapterVersion;
- OS ruleset/compiler version;
- deterministic input/final payload hashes.

GenerationAttempt persists exact execution-route provenance:
- ModelRoute;
- ProviderConnection;
- ProviderAdapterVersion;
- ModelDeploymentSnapshot;
- outbound request hash;
- provider job/response identifiers where available.

Historical objects never depend on ambiguous latest/current or mutable provider alias semantics.

Decision evidence:
`PRE-ASTRA-CENTRAL-DECISIONS-R2.md`
and
`K1-MODEL-ROUTE-DECISION.md`.

## ADR-016 — Audit and telemetry separate
Status: ACCEPTED

Audit = durable product/security history.
Telemetry = operational trace/metrics/logs.

## ADR-017 — Export/import versioned and fail-closed
Status: ACCEPTED

Two-phase import.
No provider secrets/tokens in normal exports.

## ADR-018 — Current Web App migration incremental
Status: ACCEPTED

No big-bang rewrite.
No indefinite dual-write.
No silent upload of legacy provider keys.

Migration sequence:
M0 behavior/test/export freeze
→ M1 application/repository seam using local adapters
→ M2 local domain normalization + versioned migration format
→ M3 auth/workspace/server substrate behind flags
→ M4 dry-run fail-closed MigrationPlan
→ M5 verified per-project cutover to SERVER_CANONICAL
→ M6 explicit provider reconnect
→ M7 durable server GenerationJob/Attempt + worker
→ M8 dynamic model layer / legacy EngineId compatibility mapping
→ M9 graph/API/MCP expansion
→ M10 local-canonical retirement after parity/support gates.

Exactly one project authority at a time:
LOCAL_CANONICAL or SERVER_CANONICAL.

Failed migration leaves local source untouched.
No bidirectional local/server replication.

Decision evidence:
`PRE-ASTRA-CENTRAL-DECISIONS-R3.md`.

## ADR-019 — User-upload/generated media private by default
Status: ACCEPTED

Publication/rights state is explicit and separate.

## ADR-020 — Community is deferred
Status: ACCEPTED

Future community/social features may build on ownership/publication, but do not shape the core schema now.

## ADR-021 — No premature generalized infrastructure
Status: ACCEPTED

No microservice mesh, distributed saga framework, arbitrary graph cycles,
multi-DB layer, custom IdP, fake universal provider DSL, vector/RAG without need,
Kubernetes for appearance, or event-sourced CRUD.
