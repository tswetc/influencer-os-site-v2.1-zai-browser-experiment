# Architecture Review Output Contract

Every reviewer conclusion must be classed as one of:

- KEEP
- CHANGE
- SPLIT_LATER
- REMOVE
- NEEDS_FOUNDER_DECISION
- NEEDS_SOURCE_EVIDENCE

For every CHANGE or REMOVE:

1. current decision;
2. problem;
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
"GenerationAttempt status transitions emit infrastructure events to a queue/outbox; CharacterRevision creation remains synchronous/transactional; do not introduce a general event bus for ordinary CRUD."

## Founder questions

Only ask the founder a question if two technically valid architectures depend on a product/UX/business choice.

Do not ask the founder to choose:
database isolation level;
retry idempotency design;
queue semantics;
package dependency direction;
schema migration strategy;
provider adapter lifecycle.

Those are architecture responsibilities.

## Final synthesis input

The central architect will compare:
- Astra recommendation;
- Codex feasibility audit;
- current ADRs;
- browser candidate evidence.

Accepted changes are then promoted into:
`00-GOVERNANCE/`
`01-BASE/`
and future run contracts.
