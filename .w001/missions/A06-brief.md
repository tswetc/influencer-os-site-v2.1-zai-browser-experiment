# W001-A06 — Taste / Visual Language Domain

RUN_ID: W001-A06
Model: GLM 5.3 Flash

WRITE_SET:
- lib/osv3/taste/**
- tests/osv3/taste/**

READ_SCOPE:
- lib/osv3/foundation/**
- lib/techniques.ts
- lib/engines.ts capture/world/technique semantics
- relevant Taste architecture/context

## Objective

Implement first-class Taste Profile/Revision semantics separate from identity.

Implement:
- mechanic dimensions;
- source evidence links;
- confidence;
- exclusions/anti-patterns;
- OS23 World/Technique compatibility mapping;
- deterministic validation;
- reference-role contamination guards;
- merge/weight semantics where explicitly defined.

## Frozen deterministic contract

Any deterministic serialization/hash/identity behavior must conform exactly to:
- `waves/W001/contracts/W001-SHARED-INTERFACES-V1.md`;
- `waves/W001/contracts/SERIALIZATION-VECTORS-V1.json`.

Do not invent a lane-specific canonical JSON/hash/timestamp scheme.

## Hard truth boundary

Semantic role validation does NOT prove visual de-identification.

Record visual-content contamination evaluation as a separate future eval requirement.

## Extended backlog

- identity role case/Unicode variants;
- unknown source refs;
- NaN/Infinity/confidence bounds;
- duplicate mechanics;
- contradictory anti-patterns;
- mechanic weighting normalization;
- equivalent source ordering determinism;
- capture/lighting/style separation.

## Done

Domain + tests; no visual model calls.
