# PALE REVERIE — Current State

Updated: 2026-10-03

Status: SOURCE_RECOVERY_REQUIRED

## What is known from the Browser Z AI work log

The existing Browser Z AI sandbox reportedly contains a substantial playable implementation with:
- three playable heroes;
- seven regions;
- combat, bosses and quests;
- multiple endings;
- day/weather/NPC/fauna systems;
- save/settings/UI;
- black-water reflection and post-processing;
- standalone browser build;
- many post-acceptance side systems and minigames.

These are historical worker claims until the actual source/export is ingested and independently reproduced.

## Critical known issue

The worker's own visual audit reported Eira around 4.8/10 while the intended reference-fidelity threshold was approximately 8/10.

The project was nevertheless described as accepted in later rounds. That acceptance language is not authoritative for this control plane.

Visual fidelity remains unresolved until reproduced against the actual current build.

## Verification debt

Historical QA later discovered progression softlocks and other runtime bugs after earlier gates had been called green. Some were subsequently repaired, but a final independently verified fresh-save complete campaign after all later changes has not been established here.

Debug helpers such as unlock/teleport/direct state mutation are not valid evidence for campaign reachability.

## Scope drift

After the first acceptance claim, many optional systems were added while the hero-fidelity issue remained open.

Future waves use a feature freeze whenever founder-critical visual/progression gates are red.

## Missing durable source

The current full game source is not yet part of this GitHub control plane.

Before normal wave development:
1. export the full existing Browser sandbox project;
2. preserve source + lockfile + required assets + docs/tests/evidence + local Git history where possible;
3. exclude node_modules/cache/secrets;
4. SHA-256 the export;
5. clean-room install/build/smoke;
6. ingest it as the PR-W000 verified experiment baseline;
7. freeze an immutable INPUT_SHA.

Until this is done, do not invent per-module WRITE_SET from the old chat log.

## Immediate next program step

Execute `../03-WAVES/PR-W000-BASELINE-RECOVERY.md`.

No new game feature wave should launch before PR-W000 establishes the real source tree and reproducible baseline.
