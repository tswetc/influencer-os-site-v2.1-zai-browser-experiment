# W001-A05 — Performance + Scene Domain

RUN_ID: W001-A05
Model: GLM 5.3 Flash

WRITE_SET:
- lib/osv3/performance/**
- lib/osv3/scene/**
- tests/osv3/performance/**
- tests/osv3/scene/**

READ_SCOPE:
- lib/osv3/foundation/**
- lib/types.ts
- lib/scene.ts
- current SceneSpec/build semantics
- relevant OS v3 context

## Objective

Formalize Motion/Performance continuity and additive Scene bindings without breaking legacy SceneSpec.

Implement:
- PerformancePassport/action phases;
- phase ordering;
- trajectory/timing/contact constraints;
- performer/camera relation;
- allowed retarget dimensions;
- scene continuity binding structure for character/product/place/performance/taste;
- compatibility adapter from legacy SceneSpec;
- no change to legacy prompt building when new bindings are absent.

## Foundation extension rule

Foundation `PerformancePassport` and `ActionPhase` are canonical base contracts. Build validation/coverage/lock helpers over them.
Any richer performance structures must use NEW exported type names owned by this lane.
Never redeclare a foundation-exported type name with a different shape.

## Frozen deterministic contract

Any deterministic serialization/hash/identity behavior must conform exactly to:
- `waves/W001/contracts/W001-SHARED-INTERFACES-V1.md`;
- `waves/W001/contracts/SERIALIZATION-VECTORS-V1.json`.

Do not invent a lane-specific canonical JSON/hash/timestamp scheme.

## Extended backlog

- invalid phase ordering;
- duplicate phase IDs;
- contact conflicts;
- multi-character role references;
- scene vs place boundary tests;
- action vs camera motion distinction;
- additive legacy product string + product revision binding semantics;
- deterministic scene input hashing proposal.

## Done

Pure domain/adapter + tests; old SceneSpec remains intact.
