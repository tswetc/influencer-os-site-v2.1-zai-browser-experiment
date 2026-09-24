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

OPEN SUB-DECISION:
whether direct Studio operations also instantiate an implicit WorkflowRun, or Workflow remains composition/orchestration over the same commands.
Owner: Astra A1.

## ADR-004 — Immutable historical creative/execution state
Status: ACCEPTED

Executed historical revisions/builds/runs/attempts/assets are immutable.

OPEN SUB-DECISION:
draft/commit/stale/rebase and minimum first-class revision semantics.
Owner: Astra A2.

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

OPEN SUB-DECISION:
WorkflowRun/NodeRun, partial rerun, cache/reuse, manual gates, subworkflow binding and direct-Studio relationship.
Owner: Astra A1.

## ADR-009 — Production metadata persistence
Status: ACCEPTED

Postgres-class relational store + object storage.

## ADR-010 — Async worker boundary
Status: PROVISIONAL

Hosted production-capable shape uses an async worker for long generation.

Accepted constraints:
at-least-once/idempotent execution, Job/Attempt history, explicit fallback.

OPEN SUB-DECISION:
transaction/outbox/inbox/queue/cancel/crash/cost semantics.
Owner: Astra A4.

## ADR-011 — Model/provider/adapter lifecycle
Status: PROVISIONAL / MAJOR OPEN SUB-DECISION

Current hardcoded EngineId and per-engine compiler are source behavior, not sufficient future extensibility.

Accepted constraints:
- provider/model differences remain explicit;
- historical builds never inherit future model/adapter semantics;
- LIVE requires runtime/evaluation evidence;
- model research must pass promotion gates.

OPEN:
exact task/provider/deployment/profile/version/adapter/eval/rollout architecture.
Owner: Astra A3.

## ADR-012 — Production asset/media storage
Status: ACCEPTED

Object storage + relational metadata + hashes + AssetVersion lineage.
Public Wave transport is development-only.

## ADR-013 — Authentication / authorization / entitlement separation
Status: ACCEPTED

Principal, workspace authorization, membership role and Entitlement are distinct.

Provider secrets are server-side/encrypted and never ordinary export/log data.

OPEN:
web/API/MCP token/session/scope, BYOK/managed connection modes and worker identity.
Owner: Astra A5.

## ADR-014 — Browser candidate promotion
Status: ACCEPTED

No whole-candidate merge.

Promote only audited contracts/modules/components/design/interaction units.

## ADR-015 — Source/compiler/version provenance
Status: PROVISIONAL

PromptBuild must persist enough exact state to reconstruct effective provider request.

OPEN:
minimum first-class revision set vs immutable snapshots/hashes, including model/provider drift.
Owners: Astra A2 + A3.

## ADR-016 — Audit and telemetry separate
Status: ACCEPTED

Audit = durable product/security history.
Telemetry = operational trace/metrics/logs.

## ADR-017 — Export/import versioned and fail-closed
Status: ACCEPTED

Two-phase import.
No provider secrets/tokens in normal exports.

## ADR-018 — Current Web App migration incremental
Status: ACCEPTED PRINCIPLE / OPEN SEQUENCE

No big-bang rewrite.
No permanent dual local/cloud architecture.
No silent upload of legacy provider keys.

OPEN:
exact reversible seams and phase gates.
Owner: Astra A6.

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
