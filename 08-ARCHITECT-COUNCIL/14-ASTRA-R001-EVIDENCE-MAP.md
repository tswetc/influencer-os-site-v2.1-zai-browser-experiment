# Astra R001 — Progressive Evidence Map

> **SUPERSEDED PRE-ASTRA DRAFT — DO NOT LAUNCH FROM THIS FILE**
>
> Current binding plan: `19-PRE-ASTRA-EXECUTION-PLAN-V2.md`.
> A1/A2/A5/A6 have since been closed centrally. The final Astra packet will be regenerated only after PRE_ASTRA_READY and must contain only the remaining irreducible knots.

Purpose: answer A1–A6 without repository-wide context waste.

## Always read

1. `11-ASTRA-R001-FOCUS-PACKET.md`
2. `10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`
3. `13-FOUNDER-ARCHITECTURE-GAP-MAP.md`

Then choose only the evidence below for the question being answered.

## A1 — unified execution substrate

Public:
- `../01-BASE/PRODUCT-ARCHITECTURE-V3.md`
- `../01-BASE/EXPERT-WORKFLOW-GRAPH-CONTRACT.md`
- `../01-BASE/DOMAIN-MODEL-V1.md`

Private source usually NOT required.

## A2 — creative state / revision / rebase

Public:
- `../01-BASE/DOMAIN-MODEL-V1.md`
- `../01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md`

Private canonical only if needed:
- `tswetc/influencer-os@1158007fdaefd823e24d7a38d4fa7258814b541c:lib/types.ts`
- `...:lib/storage.ts`

Specific current facts:
- CharacterPassport is mutable browser data;
- PassportVersion stores whole-passport snapshots;
- SceneSpec references a character ID, engine and creative fields;
- current history is prompt-oriented, not full multi-object lineage.

## A3 — model/provider/adapter lifecycle

Public:
- `../01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md`
- `../03-REFERENCES/common/CURRENT-PRODUCT-RESEARCH-2026-09-24.md`

Private canonical:
- `...:lib/types.ts` — hardcoded `EngineId` union;
- `...:lib/engines.ts` — executable engine-specific prompt rules and metadata;
- `...:lib/provider-settings.ts` — provider switching/settings behavior.

Read `lib/engines.ts` selectively; do not load unrelated UI.

## A4 — generation orchestration

Public:
- `../01-BASE/PRODUCT-ARCHITECTURE-V3.md`
- `../01-BASE/DOMAIN-MODEL-V1.md`

Private source is not a generation backend today; broad private crawl is unnecessary.

## A5 — auth / MCP / secrets

Public:
- `../01-BASE/PRODUCT-ARCHITECTURE-V3.md`
- `../01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md`

Private canonical:
- `...:lib/types.ts` — current Settings/apiKey shape;
- `...:lib/storage.ts` — current backup/export behavior;
- `...:lib/provider-settings.ts` — provider switch secret clearing.

Current critical fact:
browser-local API-key behavior is legacy/current Web App behavior, not the target hosted security model.

## A6 — migration

Public:
- `../01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md`
- `../01-BASE/DOMAIN-MODEL-V1.md`

Private canonical:
- `...:lib/storage.ts`
- `...:tests/edge-cases.test.ts`
- `...:tests/product-consistency.test.ts`
- `...:docs/context.md`

Use these tests as behavior constraints. Do not copy current browser persistence architecture merely because tests preserve its behavior.

## Explicitly irrelevant to Astra R001

Do not read unless a question unexpectedly depends on it:
- 03-REFERENCES design-set A/B/C/D;
- ReadyMag shortlist;
- 04-MEDIA;
- 06-EXPERIMENTS run specs/results;
- V2 visual evidence;
- product marketing copy;
- media-curation reports.

## Missing evidence protocol

If a private file is inaccessible:
1. do not broaden into a full repository crawl;
2. use the public behavior contract;
3. state the exact source fact you could not verify;
4. still decide the architecture that does not depend on that fact.
