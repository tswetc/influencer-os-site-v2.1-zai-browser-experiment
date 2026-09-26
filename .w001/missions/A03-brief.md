# W001-A03 — Product / Object Domain

RUN_ID: W001-A03
Model: GLM 5.3 Flash

WRITE_SET:
- lib/osv3/product/**
- tests/osv3/product/**

READ_SCOPE:
- lib/osv3/foundation/**
- lib/types.ts
- relevant OS v3 product specs/context
- current prompt/product fields for compatibility understanding

## Objective

Implement Product/Object continuity semantics as a first-class specialized passport.

Cover:
- geometry;
- materials;
- surface;
- branding/markings/text;
- variants/SKUs;
- mutable physical state;
- allowed/disallowed state changes;
- reference coverage;
- exact-vs-flexible locks;
- validation.

## Foundation extension rule

Foundation `ProductPassport` is the canonical base contract. Build validation/coverage/lock helpers over it.
Any richer product structures must use NEW exported type names owned by this lane.
Never redeclare `ProductPassport` with a different shape.

## Frozen deterministic contract

Any deterministic serialization/hash/identity behavior must conform exactly to:
- `waves/W001/contracts/W001-SHARED-INTERFACES-V1.md`;
- `waves/W001/contracts/SERIALIZATION-VECTORS-V1.json`.

Do not invent a lane-specific canonical JSON/hash/timestamp scheme.

## Required rules

- product semantics remain separate from Character;
- label/marking locks cannot be silently dropped;
- material/geometry conflicts surface explicitly;
- reference roles distinguish geometry/material/surface/color/product-general;
- no mutable provider/model identifiers in passport;
- deterministic serialization/validation.

## Extended backlog

- conflicting variants;
- empty/duplicate fields;
- malformed reference sources;
- packaging text exactness;
- colorway FLEX while geometry LOCK;
- state transitions (open/closed, liquid level) with explicit allowed changes;
- coverage map helpers;
- large bounded field sets.

## Done

Domain module + strong tests only; no UI required this wave.
