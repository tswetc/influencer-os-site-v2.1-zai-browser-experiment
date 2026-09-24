# Open Architecture Questions — Astra R001 Final Reduced Set

Date: 2026-09-25
Status: SIX_FUNDAMENTAL_KNOTS_REMAIN

Everything not listed below is either:
- already settled by the central architect;
- a later implementation choice;
- a product/design decision outside Astra R001.

Read:
`10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`

## A1 — One execution substrate across Studios / Workflow / API / MCP

Unresolved:
how to avoid both “everything becomes workflow ceremony” and two diverging execution systems.

Need one exact relationship among:
application commands, WorkflowRun/WorkflowNodeRun, GenerationJob/Attempt and global History.

## A2 — Creative state / revision / stale / rebase semantics

Unresolved:
how editable creator state becomes immutable reproducible history without making creators manage database revisions.

Need exact draft/commit/pin/follow-current/stale/rebase behavior.

## A3 — Dynamic model/provider/adapter + evaluation lifecycle

Unresolved:
how to evolve from hardcoded EngineId/per-engine code to a continuously updated model ecosystem while preserving provider-specific semantics and historical reproducibility.

Need exact product capability/provider/model/profile/adapter/eval/promotion/rollback architecture.

## A4 — Paid generation durable state machine

Unresolved:
exact transaction/outbox/queue/idempotency/cancel/webhook/polling/crash/cost semantics.

Need failure-safe behavior for expensive external generation.

## A5 — Web/API/MCP principal + BYOK/managed secret boundary

Unresolved:
one auth/authorization/token/secret model for browser humans, API clients, MCP agents, workers, Workspaces, Entitlements and provider connections.

## A6 — Migration from current local-first Web App

Unresolved:
exact reversible sequence from tested IndexedDB/localStorage/BYOK Web App behavior to server-canonical platform architecture without big-bang rewrite or permanent dual architecture.

## Explicitly closed / not Astra

- modular monolith first;
- Postgres-class metadata + object storage;
- Job != Attempt;
- immutable historical outputs;
- DAG-first workflow v1;
- shared application/core behavior;
- asset-version lineage;
- audit != telemetry;
- versioned export/import;
- no whole-candidate browser merge;
- no premature microservices/Kubernetes/event sourcing;
- design direction;
- media selection;
- GLM candidate ranking;
- EN/RU copy;
- current OS23.6 source counts.
