# W001 Legacy Source Truth Gates V1

Date: 2026-09-26
Status: FROZEN_REGRESSION_CONTEXT_FOR_W001
Source: current canonical `tswetc/influencer-os@1158007fdaefd823e24d7a38d4fa7258814b541c`
Purpose: preserve exact current behavior while OS v3 additions are introduced.

This file is descriptive regression truth, not permission to copy legacy design mistakes into new OS v3 semantics.

## Repository/test baseline

Tracked files in canonical repo:
179.

Product-file count used by Z2:
177 when root repo-meta `AGENTS.md` + `README.md` are excluded.

Source areas:
- lib/: 43 files;
- components/: 34 files;
- app/: 7 files;
- tests/: 5 files.

External test cases:
37 total:
- edge-cases 20;
- i18n 3;
- product-consistency 8;
- selfcheck wrapper 1;
- storage 5.

In-app self-check:
164 exact named assertions.

Current main history:
6 commits.

Current tag:
v1.23.0.

## Legacy content counts

Current exact counts:
- techniques: 24;
- scene packs: 18;
- explicit pack scenes: 92;
- in-app self-check assertions: 164.

W001 integration must not silently change these counts unless an explicit product migration decision does so later.

## Engine truth

Legacy EngineId union has six values:
- nano_pro;
- kling_3;
- seedance_2;
- veo_scene;
- veo_broll;
- omni_flash.

Legacy ENGINE_META/UI cards contain five entries and omit `veo_broll`.

Therefore:
- A07 compatibility mapping MUST include all six EngineIds;
- regression tests must not infer EngineId universe solely from ENGINE_META;
- adding a new normal UI card for veo_broll is NOT part of W001 unless explicitly scoped.

## Current application seam

`app/app/page.tsx::buildFormat` is stateful/impure.

It closes over multiple page-state values and can call `setFeedFlagged`.

Do not use it directly as the final shared application-core command implementation.

A08/R01 may extract/parameterize equivalent semantics inside their own additive W001 WRITE_SET, but:
- existing page behavior stays untouched in W001;
- legacy output equivalence is tested;
- same inputs + injected deterministic date/seed must reproduce legacy behavior where applicable.

## Feed determinism

Current feed path can receive live wall-clock time:
- page passes `now: new Date()`;
- buildFeed falls back to `cfg.now ?? new Date()`.

Golden/integration tests MUST inject:
- fixed UTC date;
- explicit seed(s).

Do not assert a golden result derived from current wall clock.

Current fallback:
if no selected pack and no lastPack:
`SCENE_PACKS[0]` is used.

Preserve/test this fallback.

## Negative prompt behavior

Canonical negative strings live in `lib/engines.ts`.

UI also provides `defaultNegative(engine)`.

At generation time for engines with negatives:
`negative || r.negative`
is used.

Therefore a non-empty user negative text overrides the builder-generated negative.

Preserve this legacy behavior in compatibility/golden tests.
Do not assume builder negative always wins.

## Storage migration truth

CURRENT_SCHEMA:
1.

`migrate()` currently has no per-version migration chain.
For lower versions it preserves/spreads input and sets the current schema version.

New OS v3 migration code must not pretend a historical transform chain already exists.

## Backup import truth

Backup validator accepts app names:
- "Influencer OS";
- legacy "influencer-os".

Future schema versions greater than CURRENT_SCHEMA are rejected.

After both merge and replace collection paths, importBackup writes settings by combining current + backup settings while forcibly clearing:
`apiKey: ""`
and setting current schema.

This is legacy compatibility behavior.

New OS v3 entities must not blindly inherit this storage policy unless explicitly required.

## Legacy PassportVersion identity

Legacy passport-version snapshots use wall-clock identity:
passport id + Date.now base36 + list length,
plus current ISO savedAt.

A01 new revision/content identity MUST be distinct from this legacy ID scheme.

Do not rewrite existing PassportVersion IDs during compatibility migration.

## Legacy CharacterPassport migration

Preserve every existing legacy field on round-trip.

Preserve original backup/source representation where required.

Do not invent:
- biometrics;
- provider/model route;
- provenance;
- AssetVersion identity.

## Fix-Pack history limitation

Current Git history begins from an imported verified v1.23 baseline commit and contains only a small number of subsequent Git commits.

Internal FP behavior is visible through code comments/tests, but individual Fix-Pack chronology is not reconstructable as separate canonical Git commits.

Do not claim commit-level provenance for FP3–FP23 that the repository does not contain.

## Required W001 consumers

Q01:
golden regression.

Q02:
malformed/negative compatibility edges.

A02:
legacy CharacterPassport/backup compatibility.

A07:
six-EngineId compatibility mapping.

A08:
application-core extraction with legacy parity.

R01:
workflow must invoke extracted semantics, not copy page state.

R02:
whole-product recomposition and regression.

## Acceptance rule

When this descriptive legacy truth conflicts with a new W001 semantic design:
- preserve legacy behavior when new OS v3 features are unused;
- implement new semantics additively;
- do not mutate current product behavior silently;
- if coexistence is impossible, raise an INTERFACE_CHANGE_REQUEST / product migration decision rather than guessing.
