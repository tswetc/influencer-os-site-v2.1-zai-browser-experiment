# Architecture Decision Register

Date: 2026-09-25

Status values:
ACCEPTED · PROVISIONAL · OPEN · SUPERSEDED.

Astra R001 should focus only on OPEN sub-decisions or produce a concrete failure case against an ACCEPTED/PROVISIONAL baseline.

## ADR-001 — One product / four logical areas
Status: ACCEPTED

Public/Product Experience
Creator App
OS Core/API/Generation Services
MCP/Agent Surface

One shared domain/application model.

## ADR-002 — Modular monolith first
Status: ACCEPTED

One codebase with strict module/package boundaries first.
Service extraction only after operational evidence.

## ADR-003 — Shared application/core behavior
Status: ACCEPTED

Web, HTTP API and MCP invoke the same application use cases.
No transport-specific prompt/generation semantics.

## ADR-004 — Immutable creative/execution history
Status: ACCEPTED

Historical revisions/builds/runs/attempts/assets are immutable.
Current pointers may move; history does not.

## ADR-005 — GenerationJob != GenerationAttempt
Status: ACCEPTED

Retry/fallback creates a new attempt.
No attempt overwrite.

## ADR-006 — Typed AssetVersion lineage graph
Status: ACCEPTED

Lineage targets exact versions and supports multiple parents/derivations.

## ADR-007 — Guided Studios + Expert Workflow Graph
Status: ACCEPTED

Two interaction layers, one underlying system.

## ADR-008 — Workflow v1 is DAG-first
Status: ACCEPTED

No arbitrary cycles in v1.
Iteration is expressed through bounded explicit nodes/policies.

OPEN SUB-DECISION:
exact WorkflowRun/WorkflowNodeRun partial-rerun, cache/reuse and child-run semantics.
Owner: Astra R001 / A2.

## ADR-009 — Production metadata persistence
Status: ACCEPTED

Postgres-class relational primary store for durable product metadata/transactions.
Object storage for media binaries/derivatives.

OPEN SUB-DECISION:
none at technology-family level.

## ADR-010 — Async worker boundary
Status: PROVISIONAL

Hosted beta/production-capable shape uses a worker boundary for long-running generation.

Accepted semantics:
- at-least-once work delivery;
- idempotent workers;
- explicit Job/Attempt state;
- retry/fallback history.

OPEN SUB-DECISION:
exact transaction/outbox/inbox/queue implementation and crash/cancel semantics.
Owner: Astra R001 / A1.

## ADR-011 — Provider abstraction / model registry
Status: ACCEPTED

Provider-specific differences remain behind explicit adapters.
Do not erase real capability differences into a fake universal provider abstraction.
Provider fallback is explicit and policy-controlled.

OPEN SUB-DECISION:
how much provider/model state is a first-class version object versus immutable execution snapshot.
Owner: Astra R001 / A3.

## ADR-012 — Production asset/media storage
Status: ACCEPTED

Object storage + relational metadata + cryptographic integrity hashes + exact AssetVersion lineage.
Public Wave transport remains development-only and is not production media architecture.

## ADR-013 — Authentication / authorization / entitlement separation
Status: ACCEPTED

Principal authentication, workspace authorization, membership roles and Entitlements are distinct.

Provider secrets are server-side, encrypted and never exported/logged as ordinary domain data.

OPEN SUB-DECISION:
remote MCP token/session/scope and service-to-worker auth model.
Owner: Astra R001 / A5.

## ADR-014 — Browser candidate promotion
Status: ACCEPTED

No whole-candidate merge.

Promote only audited contracts/modules/components/design systems/interaction patterns into a private canonical branch with compatibility tests.

## ADR-015 — Source ruleset/version provenance
Status: PROVISIONAL

PromptBuild must bind enough immutable source/compiler/model/adapter state to reconstruct the exact effective provider request.

Proposed anchors include:
OSRulesetVersion, EngineAdapterVersion, ModelProfileVersion/effective snapshot,
CharacterRevision, CanonRevision, SceneRevision, PlanRevision.

OPEN SUB-DECISION:
minimum sufficient first-class revision set and snapshot/hash boundary.
Owner: Astra R001 / A3.

## ADR-016 — Audit and telemetry are separate
Status: ACCEPTED

Audit = durable product/security event history.
Telemetry = operational traces/metrics/logs.
Correlation IDs connect them without turning telemetry into product canon.

## ADR-017 — Export/import is versioned and fail-closed
Status: ACCEPTED

Two-phase import:
validate/plan without mutation → transactional apply.
No provider secrets/tokens in normal exports.

## ADR-018 — Current Web App migration is incremental
Status: ACCEPTED PRINCIPLE / OPEN SEQUENCE

No big-bang rewrite.
No indefinite permanent dual architecture.

OPEN SUB-DECISION:
exact reversible migration seams and sequence from local-first current behavior to Architecture V3.
Owner: Astra R001 / A4.

## ADR-019 — No premature generalized infrastructure
Status: ACCEPTED

Not currently justified:
microservice mesh, distributed saga framework, arbitrary cyclic workflows,
multiple-database portability layer, custom identity provider, generic event-sourced CRUD,
vector/RAG layer without a product need, Kubernetes for appearance alone.
