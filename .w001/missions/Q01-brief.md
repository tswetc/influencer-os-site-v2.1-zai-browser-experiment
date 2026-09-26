# W001-Q01 — OS23.6 Golden Regression Harness

RUN_ID: W001-Q01
Model: GLM 5.3 Flash

WRITE_SET:
- tests/osv3/regression/**
- tests/fixtures/osv3/**

READ_SCOPE:
- lib/**
- tests/**
- app/app/page.tsx only as needed for behavior inventory
- regression contract/context

## Objective

Turn current OS23.6 behavior into deterministic compatibility evidence before W001 integration.

Create golden fixtures for:
- Nano photo;
- Kling;
- Seedance;
- Veo scene;
- Veo B-roll;
- Feed;
- Series;
- Shoot;
- CharacterPassport backup/import.

Also assert:
- current EngineId behavior;
- Worlds;
- 24 Techniques;
- 18 packs;
- 92 explicit scenes where machine-derived from current code;
- 164 built-in invariant behavior;
- EN/RU compatibility where relevant.

## Rules

Do not modify product source.
Do not normalize away current quirks unless the fixture definition explicitly documents them.

Golden fixtures must be deterministic and not include timestamps/random IDs unless normalized with explicit rationale.

## Extended backlog

- repeated-run byte stability;
- output whitespace/order;
- legacy storage export/import;
- fixed reference/no-reference builds;
- current provider-setting safety behaviors;
- fail useful when old behavior changes.

## Done

A regression harness that can run after W001 integration and prove no unintended legacy drift.
