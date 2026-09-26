# W001-A04 — Place / Environment Domain

RUN_ID: W001-A04
Model: GLM 5.3 Flash

WRITE_SET:
- lib/osv3/place/**
- tests/osv3/place/**

READ_SCOPE:
- lib/osv3/foundation/**
- current scene/location semantics
- relevant OS v3 Place specs/context

## Objective

Implement Place/Environment continuity as specialized persistent spatial semantics.

Cover:
- topology/zones;
- openings;
- persistent anchor objects;
- relative layout;
- architecture;
- physical materials;
- permanent light sources;
- mutable temporary state;
- reference coverage.

## Frozen deterministic contract

Any deterministic serialization/hash/identity behavior must conform exactly to:
- `waves/W001/contracts/W001-SHARED-INTERFACES-V1.md`;
- `waves/W001/contracts/SERIALIZATION-VECTORS-V1.json`.

Do not invent a lane-specific canonical JSON/hash/timestamp scheme.

## Required rules

- persistent physical place != temporary art direction;
- permanent light source != current lighting treatment;
- anchor conflicts surface explicitly;
- spatial references and scene references remain distinct roles;
- no invented 3D/depth precision from 2D photos;
- deterministic validation/serialization.

## Extended backlog

- missing/contradictory views;
- duplicate anchors;
- circular/invalid relations;
- temporary prop vs persistent anchor;
- different-time-of-day semantics;
- malformed topology input;
- coverage helper tests.

## Done

Pure domain + tests; no 3D UI this wave.
