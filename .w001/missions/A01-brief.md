# W001-A01 — Revision / Continuity Runtime

RUN_ID: W001-A01
Model: GLM 5.3 Flash

WRITE_SET:
- lib/osv3/revisions/**
- tests/osv3/revisions/**

READ_SCOPE:
- lib/osv3/foundation/**
- lib/types.ts
- lib/storage.ts
- os23.7-relevant context supplied in packet
- tests/** as needed

## Objective

Build the reusable revision/runtime layer around the frozen continuity foundation.

Implement:
- stable continuity root identifiers/types;
- mutable draft representation separate from immutable revision;
- immutable revision creation/checkpoint helpers;
- baseRevisionId ancestry validation;
- deterministic canonicalization/serialization helpers;
- revision validation result model;
- duplicate/current-revision composition guards;
- pure conflict aggregation helpers reusable across domains;
- no provider/model-native identity embedded in semantic revisions.

## Mandatory behaviors

- revision snapshots are immutable by contract;
- no Date.now/random hidden inside pure deterministic helpers unless injected;
- malformed runtime JSON fails clearly;
- unknown fields are either preserved or rejected according to explicit schema policy, never silently reinterpreted;
- revisions of same root cannot both be selected as simultaneous current state;
- serialization is deterministic for equivalent semantic input;
- legacy partial provenance remains representable.

## Extended backlog

- property tests around revision chains;
- cyclic/unknown base references;
- duplicate IDs;
- malformed timestamps/schema versions;
- canonical serialization stability;
- hostile prototype-shaped objects;
- large bounded revision sets;
- misuse review of LOCK/HOLD/FLEX/FREE/EXCLUDE combinations.

## Done

Focused tests + adversarial cases green; no foundation file changed; public API documented in code/tests; integration risks recorded.
