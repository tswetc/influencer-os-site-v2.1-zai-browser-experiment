# W001-A02 — Character Compatibility

RUN_ID: W001-A02
Model: GLM 5.3 Flash

WRITE_SET:
- lib/osv3/character/**
- tests/osv3/character/**

READ_SCOPE:
- lib/osv3/foundation/**
- lib/types.ts
- lib/storage.ts
- components/passport-editor.tsx
- relevant current tests/context

## Objective

Create the conservative compatibility boundary from existing CharacterPassport into OS v3 Character continuity semantics.

Implement:
- CharacterContinuityRevision wrapper/representation;
- import/preview plan from current CharacterPassport;
- preservation of identity full/mid/micro;
- preservation of anomalyLock and faceAdherence;
- legacy reference role normalization without fabricating materialized assets;
- explicit unresolved legacy-reference state;
- migration warnings/partial provenance;
- deterministic Character lock derivation only from explicit existing fields;
- no fake biometrics/model identity.

## Mandatory compatibility

- current CharacterPassport remains valid and usable;
- no free-text biometric extraction;
- no provider/model provenance invention;
- current canon remains Character semantics;
- Taste is not absorbed into identity;
- unknown legacy roles remain explicit unknowns;
- old data round-trip fixture preserves all existing fields.

## Extended backlog

- malformed legacy refs;
- uppercase/mixed roles;
- duplicate reference IDs;
- empty identity fields;
- weird Unicode names;
- version snapshots;
- partial canon;
- deterministic migration preview;
- migration idempotency.

## Done

Pure compatibility code + tests; no current UI/storage behavior modified.
