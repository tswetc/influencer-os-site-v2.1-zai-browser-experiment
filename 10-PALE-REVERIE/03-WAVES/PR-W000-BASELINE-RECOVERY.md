# PR-W000 — Existing Browser Game Baseline Recovery

Status: NOT_STARTED

Purpose: convert the current single Browser Z AI sandbox implementation into a durable reproducible source baseline before launching normal parallel development waves.

This is a recovery/ingest wave, not a feature wave.

## Why W000 exists

The game currently appears to live primarily inside one Browser Z AI sandbox and its local Git history.

Launching parallel workers from a chat transcript would repeat the previous one-shot-context problem.

W000 first obtains the actual bytes.

## Founder-side prerequisite

Use the SAME Browser Z AI chat/sandbox that currently contains the game.

Tell that worker to stop feature work and produce a source handoff.

Required output:
- full tracked source;
- package manifest + exact lockfile;
- configs;
- required runtime assets currently used by the build;
- tests/tools;
- docs/evidence/shots needed to understand current state;
- standalone build if it exists;
- local Git history as `repo.bundle` when practical;
- `EXPORT-MANIFEST.json`;
- `SHA256SUMS.txt`.

Exclude:
- node_modules;
- package/browser caches;
- credentials/.env secrets;
- disposable temp files;
- unrelated sandbox scaffold/examples.

## Required W000 handoff archive

Suggested:
`PALE-REVERIE-PR-W000-BASELINE.zip`

Manifest records:
- source HEAD/branch if available;
- runtime model label;
- node/package-manager versions;
- install/build/test commands;
- known limitations;
- current visual score/evidence;
- current shipped endings;
- exact included file list.

## Clean-room check before Git ingest

Outside the original working tree:
1. extract archive into an empty directory;
2. install from lockfile;
3. typecheck/lint/test where scripts exist;
4. build;
5. start the game;
6. smoke title → new game → movement → save → one encounter;
7. verify standalone if present;
8. verify no required runtime file exists only in the old sandbox.

If this fails, fix/export again before calling the baseline reproducible.

## Git ingest design

Do not dump the recovered game into main control-plane history.

After central audit, create a dedicated baseline/construction branch, e.g.:
`pr-w000/baseline-<short-source-hash>`

Record:
- full baseline commit SHA;
- source-tree manifest;
- hashes of critical files;
- clean-room result;
- known red gates.

That frozen baseline becomes the source from which PR-W001 is compiled.

## PR-W001 is not designed yet

Only after the real source tree is ingested:
- map modules/dependencies;
- define safe WRITE_SET ownership;
- identify shared interfaces that must freeze;
- choose bounded lanes;
- decide which work can honestly run in parallel.

Expected first priorities remain:
- Eira/character fidelity;
- visual render/world quality;
- honest progression/QA;
- movement/combat feel;
but exact lane boundaries come from the source, not the old chat log.

## W000 completion

W000 completes only when:
- full source archive exists;
- SHA-256 is recorded;
- clean-room build/smoke passes or blockers are explicitly preserved;
- baseline branch/commit is created;
- current source manifest exists;
- current known red gates are recorded;
- no new optional feature was added during recovery.
