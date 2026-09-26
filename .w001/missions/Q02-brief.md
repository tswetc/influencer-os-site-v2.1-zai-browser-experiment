# W001-Q02 — Domain Security / Migration Adversarial Harness

RUN_ID: W001-Q02
Model: GLM 5.3 Flash

WRITE_SET:
- tests/osv3/security/**
- tests/fixtures/osv3-security/**

READ_SCOPE:
- lib/osv3/foundation/**
- existing current domain/storage/parser code
- W001 accepted contracts/context

## Frozen shared contracts under test

Treat as normative:
- `waves/W001/contracts/W001-SHARED-INTERFACES-V1.md`;
- `waves/W001/contracts/SERIALIZATION-VECTORS-V1.json`.

Add hostile/negative cases for:
- invalid/non-finite canonical JSON values;
- hidden randomness/time in deterministic helpers;
- wrong ModelStrategy values;
- competing application-command/result envelopes;
- deterministic-vector mismatches.

## Verified legacy source-truth context

Also treat as required regression context:
`waves/W001/contracts/LEGACY-SOURCE-TRUTH-GATES-V1.md`.

## Objective

Create hostile runtime/import/migration cases for the new domain contracts.

Test:
- malformed JSON shapes;
- prototype-like keys;
- duplicate refs;
- unknown/case-variant roles;
- NaN/Infinity/bounds;
- huge but bounded arrays/records;
- LOCK vs EXCLUDE;
- same-root conflicting revisions;
- cross-root conflictKey behavior;
- unsupported semantic LOCK;
- ref count limits;
- multi-character gate;
- Taste identity-role contamination;
- unresolved legacy refs;
- unknown provenance;
- provider secret/model alias contamination;
- dangerous absolute/path-like metadata.

## Rules

No product source modifications.
Tests should define desired security behavior against frozen contracts, not patch implementation.

## Extended backlog

Add property/fuzz generation with deterministic seed where useful.

Record any contract ambiguity as a finding rather than guessing.

## Done

Adversarial suite + findings usable during integration.
