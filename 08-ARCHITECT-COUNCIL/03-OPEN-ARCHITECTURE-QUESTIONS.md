# Open Architecture Questions — Astra R001 Reduced Set

Date: 2026-09-25
Status: FIVE_HARD_QUESTIONS_REMAIN

The earlier broad list has been reduced by the central architect.

Routine architecture choices are now recorded in:
`10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`

Astra should not spend time re-answering solved questions unless it finds a concrete failure in the baseline.

## Closed at central-architect level

Closed baseline decisions include:
- modular monolith first;
- hosted beta shape = web/API/MCP process + async worker;
- relational primary metadata store + object storage;
- shared application command/query boundary;
- immutable creative/execution history;
- Job != Attempt;
- at-least-once/idempotent execution semantics;
- DAG-first workflow v1;
- explicit provider fallback history;
- auth / authorization / membership / entitlement separation;
- typed AssetVersion lineage;
- audit vs telemetry separation;
- versioned fail-closed export/import;
- selective browser-candidate promotion;
- no premature microservices/event sourcing/Kubernetes/generalized provider DSL.

## A1 — Generation consistency boundary

Exact unresolved decision:
how DB transaction, durable scheduling, worker, provider dispatch, webhook/polling, cancellation, retry/fallback and crash recovery compose without duplicate paid executions or lost accepted provider requests.

Need:
- exact state machine;
- transaction/outbox/inbox boundary;
- idempotency and dedupe;
- timeout/cancel races;
- crash timelines;
- initial queue recommendation and extraction trigger.

## A2 — Workflow partial rerun / reuse semantics

Exact unresolved decision:
how immutable WorkflowRun/WorkflowNodeRun objects represent downstream reruns, reused upstream outputs, deterministic cache hits, manual gates and subworkflow bindings without confusing history or lineage.

Need one execution model.

## A3 — Minimal sufficient reproducibility/version model

Exact unresolved decision:
which proposed revision/version objects must remain first-class versus embedded immutable snapshots/hashes.

Need the smallest schema that can forensically reconstruct:
- effective OS rules;
- exact prompt compilation;
- selected model/provider capability assumptions;
- exact provider request;
- generation lineage.

Avoid both under-versioning and version-object explosion.

## A4 — Migration sequence from current Web App

Exact unresolved decision:
the safest reversible sequence from current local-first Web App behavior to server-backed Architecture V3.

Need:
- first seam;
- compatibility layer;
- data migration;
- provider-secret transition;
- Workspace/Project introduction;
- worker/object storage introduction;
- phase gates;
- rewrite-vs-migrate boundaries.

## A5 — Remote MCP/web/API auth + provider-secret boundary

Exact unresolved decision:
one security model for human browser sessions, HTTP API, remote MCP agents, workspace roles, entitlements, provider credentials, worker execution and audit.

Need:
- principal/token/session model;
- scopes;
- authorization context;
- secret resolution;
- revocation;
- worker identity;
- MCP parity without bypass.

## Questions explicitly NOT for Astra R001

Do not spend Astra capacity deciding:
- design direction;
- site typography;
- media selection;
- which GLM run looks best;
- marketing copy;
- OS23.6 source counts;
- whether the product should have Guided Studios or Expert Graph;
- whether to use microservices now;
- ordinary component structure;
- generic test-framework selection.

Those are already decided or belong to later implementation/review.
