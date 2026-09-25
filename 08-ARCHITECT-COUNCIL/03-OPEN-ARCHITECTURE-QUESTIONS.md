# Open Architecture Questions — Pre-Astra Reduced Set

Date: 2026-09-25
Status: FOUR_FUNDAMENTAL_KNOTS_REMAIN_PROVISIONALLY

A1 and A2 were closed centrally in:
`PRE-ASTRA-CENTRAL-DECISIONS-R2.md`.

Everything below remains open only because a wrong answer could materially compromise provider evolution, paid generation durability, security, or migration.

## A3 — Dynamic model/provider/adapter + evaluation lifecycle

Unresolved:
how to evolve from hardcoded EngineId/per-engine code to a continuously updated model ecosystem while preserving provider-specific semantics and historical reproducibility.

Need exact separation among:
product capability/task,
provider,
external model/deployment/alias,
stable ModelProfile,
version/effective snapshot,
EngineAdapterVersion,
research evidence,
evaluation evidence,
promotion status and rollback/deprecation.

Need exact code-vs-config boundary and a real research→eval→LIVE promotion pipeline.

## A4 — Paid generation durable state machine

Unresolved:
exact transaction/outbox/queue/idempotency/cancel/webhook/polling/crash/cost semantics.

Must survive:
- duplicate worker delivery;
- crash after provider acceptance;
- webhook/poll race;
- ambiguous timeout;
- cancel/late-success race;
- fallback after uncertain provider state;
- cost reservation/finalization.

Need a failure-safe state machine for expensive external generation.

## A5 — Web/API/MCP principal + BYOK/managed secret boundary

Unresolved:
one standards-based auth/authorization/token/secret model for:
browser humans,
HTTP API clients,
remote MCP agents,
workers,
Workspaces/Memberships,
Entitlements,
BYOK ProviderConnections,
platform-managed provider credentials.

Need exact scope, revocation, worker identity and secret-resolution rules without exposing raw provider secrets to agents.

## A6 — Migration from current local-first Web App

Unresolved:
exact reversible sequence from tested IndexedDB/localStorage/direct-BYOK Web App behavior to server-canonical platform architecture without big-bang rewrite or permanent dual architecture.

Need:
- anti-corruption seam;
- local-data import mapping;
- authentication boundary;
- server-canonical transition;
- legacy-key treatment;
- object-storage/worker introduction;
- dynamic model-system migration;
- rollback gates;
- browser-candidate promotion seam.

## Explicitly closed / not Astra

- one product / four logical areas;
- modular monolith first;
- Postgres-class metadata + object storage;
- shared application/core behavior;
- direct Studios do not require implicit WorkflowRun;
- Workflow is orchestration over the same commands;
- WorkflowRun/NodeRun rerun/reuse baseline;
- mutable draft + immutable execution checkpoint/revision;
- FOLLOW_ACTIVE/PINNED resolution semantics;
- no in-place rebase of historical revisions;
- manual prompt edit creates a derived PromptBuild;
- CharacterRevision/CanonRevision separation;
- Job != Attempt;
- immutable historical outputs;
- DAG-first workflow v1;
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
