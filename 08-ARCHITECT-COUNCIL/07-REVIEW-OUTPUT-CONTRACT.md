# Architecture Escalation / Review Output Contract

Every conclusion must be classed as one of:

- KEEP
- CHANGE
- SPLIT_LATER
- REMOVE
- NEEDS_FOUNDER_DECISION
- NEEDS_SOURCE_EVIDENCE

For every CHANGE or REMOVE:

1. current decision;
2. concrete problem/failure;
3. evidence;
4. proposed replacement;
5. affected domain objects/use cases;
6. migration cost;
7. new complexity;
8. failure mode prevented;
9. tests required;
10. confidence: HIGH / MEDIUM / LOW.

## No score-only reviews

Do not grade architecture 8/10 and stop.

We need executable decisions.

## No generic advice

Bad:
"use event-driven architecture."

Good:
"GenerationAttempt dispatch is written with a transactional outbox; worker delivery is at-least-once; provider webhook handling is deduplicated by external event/request identity. CharacterRevision creation remains an ordinary synchronous transaction."

## Founder questions

Only ask the founder if two technically valid architectures depend on a genuine product/UX/business choice.

Do not ask the founder to choose:
- database isolation level;
- retry idempotency;
- queue semantics;
- package dependency direction;
- schema migration strategy;
- provider adapter lifecycle;
- OAuth token plumbing.

Those are architecture responsibilities.

## Astra R001

Astra uses the more specific output contract in:
`11-ASTRA-R001-FOCUS-PACKET.md`.

That specific contract wins for R001.

## Later synthesis

The central architect synthesizes:
- current ADR baseline;
- Astra R001 decisions;
- implementation evidence;
- optional lower-cost adversarial/feasibility audit;
- browser-candidate evidence when relevant.

Only accepted deltas are promoted into governance/architecture files.
