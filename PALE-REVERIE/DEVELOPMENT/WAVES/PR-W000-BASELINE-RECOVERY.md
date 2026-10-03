# PR-W000 — Baseline Recovery

Status: NOT_STARTED

Goal: recover the real current PALE REVERIE Browser Z AI project into a durable reproducible source baseline.

This is not a feature wave.

## Source

Use the same Browser Z AI sandbox/chat that currently contains the game.

Stop adding optional features before export.

## Required export

Suggested archive:
`PALE-REVERIE-PR-W000-BASELINE.zip`

Include:
- full game source;
- package manifest;
- exact lockfile;
- build/tool configs;
- runtime assets required by the current build;
- tests/tools;
- docs/current evidence;
- relevant screenshots;
- standalone build if it exists;
- local Git history as `repo.bundle` when practical;
- EXPORT-MANIFEST.json;
- SHA256SUMS.txt.

Exclude:
- node_modules;
- caches;
- credentials/secrets;
- unrelated sandbox examples;
- disposable temp files.

## Export manifest

Record:
- source branch/HEAD if available;
- runtime model label;
- Node/package-manager versions;
- install command;
- test/typecheck/build commands;
- preview command;
- known red gates;
- current hero fidelity evidence;
- exact file inventory.

## Clean-room validation

Extract into a fresh empty directory.

Then:
1. install from the lockfile;
2. typecheck/lint if defined;
3. run tests;
4. build;
5. start browser game;
6. title → new game;
7. movement/jump;
8. save/reload;
9. one normal encounter;
10. verify standalone if it is a required deliverable.

Do not call the baseline reproducible if it depends on unexported files from the old sandbox.

## Git ingest

After audit, create a dedicated baseline/construction branch, not a source dump into the control-plane main tree.

Suggested:
`pr-w000/baseline-<shortsha>`

Record:
- baseline commit SHA;
- source tree manifest;
- hashes of critical files;
- clean-room results;
- known red gates.

## After W000

Inspect the real source architecture.

Only then design PR-W001:
- dependency map;
- frozen shared interfaces;
- READ_SCOPE;
- non-overlapping WRITE_SET;
- exact run packets;
- integration order.

Do not infer these boundaries from the old chat log.
