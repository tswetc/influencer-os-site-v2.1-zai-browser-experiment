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

## Verified legacy source-truth context

Also treat as required regression context:
`waves/W001/contracts/LEGACY-SOURCE-TRUTH-GATES-V1.md`.

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

## Frozen migration/serialization contract

Conform to the legacy round-trip rules in:
- `os23.7/MIGRATION-FROM-OS23.6.md`;
- `os23.7/REGRESSION-CONTRACT.md`;
- `waves/W001/contracts/W001-SHARED-INTERFACES-V1.md`;
- `waves/W001/contracts/SERIALIZATION-VECTORS-V1.json`.

Preserve the original legacy backup/source representation.
Do not canonicalize legacy backup bytes merely to fit new OS v3 serialization.
New normalized candidate structures may use the frozen W001 canonicalization rules.

## Mandatory compatibility

- `importLegacyCharacterPassport` from the foundation is a semantic projection, not the round-trip carrier.
  Its projection intentionally does not preserve every legacy field/reference payload.
  `CharacterContinuityRevision` must retain the original `CharacterPassport` wholesale so the frozen
  legacy round-trip contract can preserve every existing field; any normalized projection is derived from that preserved source.

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
