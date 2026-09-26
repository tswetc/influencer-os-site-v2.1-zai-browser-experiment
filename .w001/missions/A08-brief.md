# W001-A08 — Shared Application Core / PromptBuild Provenance

RUN_ID: W001-A08
Model: GLM 5.3 Flash

WRITE_SET:
- lib/osv3/application/**
- tests/osv3/application/**

READ_SCOPE:
- lib/osv3/foundation/**
- lib/types.ts
- lib/engines.ts
- current bundle/history semantics
- accepted application architecture/context

## Verified legacy source-truth context

Also treat as required regression context:
`waves/W001/contracts/LEGACY-SOURCE-TRUTH-GATES-V1.md`.

## Objective

Build pure application-layer contracts that both future Guided Studios and Expert Graph can call.

Implement:
- application command/result envelopes;
- immutable PromptBuild record around current deterministic compiler output;
- pinned continuity revision IDs;
- scene input/revision identity;
- taste snapshot identity;
- compiler/ruleset identity;
- model strategy/route request separation;
- self-check summary;
- no paid execution side effect.

## Frozen shared contract

Conform exactly to:
- `waves/W001/contracts/W001-SHARED-INTERFACES-V1.md`;
- `waves/W001/contracts/SERIALIZATION-VECTORS-V1.json`.

Implement the frozen `ApplicationCommandV1` / `ApplicationResultV1` semantics.
Do not invent a competing envelope.

Use the exact seven-value ModelStrategy enum frozen by the shared contract.

Deterministic PromptBuild identity/hash must use the frozen canonical JSON + SHA-256 rules.

## Rules

Building/editing semantics is pure.
GenerationAttempt is not created until explicit execution in a later wave.

No silent rerun/memoization of nondeterministic generation.

## Extended backlog

- deterministic PromptBuild identity/hash;
- missing/partial legacy provenance;
- optional negative prompt;
- route unknown vs pinned;
- multiple continuity refs;
- input-order determinism;
- serialization compatibility.

## Done

Pure shared application contracts + tests, no UI/provider execution.
