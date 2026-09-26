# W001-A07 — Model Capability / Route Semantics

RUN_ID: W001-A07
Model: GLM 5.3 Flash

WRITE_SET:
- lib/osv3/model/**
- tests/osv3/model/**

READ_SCOPE:
- lib/osv3/foundation/**
- lib/engines.ts
- lib/provider-settings.ts
- architecture/model-evolution context in packet
- current provider/engine behavior as read-only evidence

## Verified legacy source-truth context

Also treat as required regression context:
`waves/W001/contracts/LEGACY-SOURCE-TRUTH-GATES-V1.md`.

## Objective

Create the provider-neutral model semantics needed for continuity-aware routing without changing live provider behavior.

Implement types/validation for:
- ModelProfileRevision;
- ProviderDeployment;
- AdapterVersion;
- ModelRoute;
- CapabilityProfile;
- model strategy;
- exact route resolution result;
- capability support/conflict result.

## Frozen shared contract

Conform exactly to:
`waves/W001/contracts/W001-SHARED-INTERFACES-V1.md`.

ModelStrategy is frozen to exactly:
- BEST_QUALITY
- FAST
- LOW_COST
- BEST_CHARACTER
- BEST_PRODUCT
- BEST_MOTION
- PINNED_MODEL

Do not add, rename or reinterpret a strategy during W001.
Exact immutable ModelRoute remains separate from strategy.

## Required separation

Semantic profile != mutable provider alias.

Provider-native model/deployment ID is representation/routing data, not continuity identity.

No secrets/API keys in these structures.

## Capability coverage

- reference roles;
- semantic LOCK paths;
- per-role/total ref counts;
- multiple characters;
- image/video/edit/motion capability dimensions;
- unsupported required vs optional behavior.

## Extended backlog

- stale aliases;
- unknown capability;
- unsupported LOCK;
- route pinning;
- strategy vs exact route;
- deterministic route-resolution input/output;
- historical route immutability.

## Done

Pure contracts/evaluator + tests; no live provider calls.
