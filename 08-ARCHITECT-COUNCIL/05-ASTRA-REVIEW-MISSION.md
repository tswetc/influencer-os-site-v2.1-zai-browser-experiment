# GPT-6 Astra Architecture Review Mission

ROLE:
Principal systems architect + adversarial design reviewer.

MODE:
READ-ONLY first pass.

Do NOT implement the product yet.
Do NOT edit the repository in the first pass.
Do NOT redesign product intent.

## Mission

Review the full Influencer OS Site V2.1 product architecture and produce the strongest implementable architecture for moving from browser-lab candidates to a production-capable platform without conceptual rewrite.

You are NOT being asked to judge visual design.
You are NOT being asked to invent product features for their own sake.

You ARE being asked to make hard technical decisions.

## Start here

Read:
`08-ARCHITECT-COUNCIL/README.md`
then its complete review order.

Then read:
`00-GOVERNANCE/START-HERE.md`
and every architecture/source contract it requires.

Inspect tools/run contracts only where needed to understand deployment and promotion constraints.

## Required method

1. Reconstruct the current architecture accurately.
2. Separate:
   - founder/product constraints;
   - source truth;
   - accepted architecture;
   - provisional architecture;
   - open questions.
3. Search for contradictions and hidden coupling.
4. Identify failure modes at:
   - single-user local prototype;
   - hosted beta;
   - production multi-tenant service;
   - agent/MCP access;
   - provider outage/retry;
   - schema evolution;
   - export/import;
   - media scale.
5. Produce at least two serious competing architectures where the decision is genuinely open.
6. Stress-test them.
7. Select one recommended architecture.
8. Explain why the rejected alternative loses.
9. Minimize unnecessary distributed systems.
10. Preserve an upgrade path when scale actually requires splitting services.

## Decisions you MUST make

- deployable topology;
- package/module boundaries;
- database/persistence model;
- transaction boundaries;
- queue/worker model;
- idempotency/retry/cancellation;
- provider abstraction;
- ModelProfile/EngineAdapterVersion lifecycle;
- prompt-build reproducibility;
- workflow graph semantics/runtime;
- partial rerun/cache policy;
- asset/object-storage architecture;
- lineage implementation;
- API/application-service boundary;
- MCP/core parity boundary;
- auth/workspace/role/entitlement model;
- provider-secret storage;
- audit/event/observability model;
- export/import versioning;
- schema migrations;
- testing architecture;
- candidate-to-canonical promotion architecture;
- exact boundaries that SHOULD remain one process;
- exact evidence/triggers that justify future service extraction.

## Hard constraints

Preserve:
- one product / four logical areas;
- OS23.6 source semantics;
- immutable creative revisions;
- GenerationJob/GenerationAttempt separation;
- AssetVersion lineage;
- guided + expert graph modes;
- web/MCP shared core;
- truthful provider states;
- no secret leakage;
- EN/RU/responsive product requirement.

If you believe one hard constraint is technically self-contradictory, prove it and propose the smallest correction. Do not silently ignore it.

## Deliverables

Produce one folder locally:

`ASTRA-ARCH-REVIEW/`

containing:

1. `EXECUTIVE-ARCHITECTURE-DECISION.md`
2. `TARGET-TOPOLOGY.md`
3. `MODULE-BOUNDARIES.md`
4. `DATA-AND-TRANSACTION-MODEL.md`
5. `GENERATION-RUNTIME.md`
6. `WORKFLOW-ENGINE.md`
7. `API-MCP-AUTH.md`
8. `ASSET-MEDIA-ARCHITECTURE.md`
9. `OBSERVABILITY-SECURITY.md`
10. `TEST-ARCHITECTURE.md`
11. `PROMOTION-AND-MIGRATION.md`
12. `ADR-PROPOSALS.md`
13. `RISKS-AND-COUNTEREVIDENCE.md`
14. `QUESTIONS-FOR-FOUNDER.md` — only product questions that materially change architecture
15. `REVIEW-MANIFEST.md`

## Decision quality bar

Do not return generic SaaS architecture advice.

Every important recommendation must name:
- the Influencer OS objects/use cases affected;
- the failure it prevents;
- the complexity it adds;
- the stage at which the complexity is justified.

Prefer a smaller architecture that is correct and evolvable over a fashionable distributed architecture.

Final status:
ASTRA_ARCHITECTURE_REVIEW_COMPLETE
or
ASTRA_ARCHITECTURE_REVIEW_BLOCKED
