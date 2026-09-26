# W001-R02 — Whole-Product Recomposition / Integration Harness

RUN_ID: W001-R02
Model: GLM 5.3 (non-Flash preferred)

WRITE_SET:
- tests/osv3/integration/**
- docs/osv3/integration/**

READ_SCOPE:
- full construction source
- frozen W001 contracts
- current OS23.6 tests
- W001 plan/context

## Objective

Prepare the integration/recomposition harness for all W001 candidate lanes without consuming unpublished peer output.

Against the frozen contracts, define:
- merge acceptance matrix;
- expected module boundaries;
- forbidden dependency directions;
- legacy parity gates;
- domain composition scenarios;
- continuity conflict scenarios;
- capability gate scenarios;
- application/workflow contract scenarios;
- storage/migration boundary expectations;
- final integration command/checklist.

## Important constraint

You do NOT have peer implementations in this same wave.

Do not invent that they passed.

Build contract-based tests/harness that becomes active as candidates are integrated.

## Extended backlog

- dependency graph assertions;
- forbidden imports;
- circular dependency detection;
- public export surface expectations;
- no legacy source mutation assumptions;
- integration order risk review;
- full build/recomposition checklist;
- high-risk questions to send to central/Astra if genuinely unresolved.

## Done

A rigorous integration harness/docs ready to run against the merged W001 branch.
