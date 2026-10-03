# PALE REVERIE — Wave Protocol

Adapted from the strongest parts of the existing OS v3 W001 Browser Worker pattern.

## Planes

### Game/canon plane
`PALE-REVERIE/GAME/**`

Defines the product.

### Control plane
`PALE-REVERIE/DEVELOPMENT/**`

Defines current state, wave plans, run packets and audit metadata.

### Asset plane
`PALE-REVERIE/ASSETS/**`

Defines exact versioned packs.

### Construction plane
Dedicated branch:
`pr-wxxx/construction-<shortsha>`

Contains the exact source snapshot workers build from.

### Worker plane
One Browser Z AI chat/sandbox per RUN_ID.

GitHub remote is read-only.

### Integration plane
A trusted central process verifies worker artifacts and integrates accepted lanes deliberately.

## Wave lifecycle

1. close canon/current-state decisions relevant to the wave;
2. freeze exact asset packs;
3. create/verify construction source;
4. record full immutable INPUT_SHA;
5. compile per-run packets;
6. launch independent workers;
7. worker implements/tests/self-attacks/fixes;
8. worker freezes FINAL_HEAD;
9. worker exports bundle/evidence;
10. central scope/test/visual audit;
11. deliberate integration;
12. whole-game regression;
13. next immutable baseline.

## Per-run packet

Every worker receives:
- wave_id;
- run_id;
- source repo/branch/INPUT_SHA;
- source manifest hash;
- objective;
- model preference;
- read_scope;
- write_scope;
- forbidden_paths;
- required context;
- exact asset pack IDs/hashes;
- required tests;
- acceptance gates;
- output contract.

The packet controls run-local scope.

It cannot silently change the Game Bible.

## Parallelism

Parallel lanes must not depend on unpublished same-wave outputs.

Avoid overlapping WRITE_SET.

Shared interfaces required by multiple lanes must be frozen before launch.

If a frozen interface is insufficient:
- report `INTERFACE_CHANGE_REQUEST`;
- do not silently fork an incompatible interface.

## Worker execution phases

1. verify source/packet/assets;
2. inspect assigned source;
3. implement;
4. focused tests;
5. browser/visual QA when relevant;
6. adversarial self-review;
7. remediation;
8. edge/regression cases;
9. integration-risk notes;
10. cleanup/docs;
11. repeat required checks;
12. scope audit;
13. FINAL_HEAD freeze;
14. artifact export.

First green build is not completion.

## Git rules

- exact immutable INPUT_SHA;
- local run branch from INPUT_SHA;
- incremental commits;
- forward fixes;
- no hidden history rewrite;
- no merge commits unless a future packet explicitly requires them;
- no remote push/PR from Browser workers;
- after FINAL_HEAD, zero tracked writes.

Suggested names:
- wave: `PR-W001`;
- run: `PR-W001-A01`;
- local worker branch: `pr-w001/PR-W001-A01`;
- integration: `pr-w001/integration`.

## Handoff

Preferred:
- `<RUN_ID>-core.tar`;
- `<RUN_ID>-run.bundle`;
- optional `<RUN_ID>-evidence.tar`.

Core includes:
- RUN-MANIFEST.json;
- RESULT.json;
- TEST-RESULTS.json;
- CHANGED-PATHS.txt;
- SHA256SUMS.txt.

Whole-product integration/release work may additionally create a clean-room-tested FINAL.zip.

Worker can claim:
- COMPLETE / PARTIAL / BLOCKED / FAILED;
- EXPORT_READY.

Worker cannot claim:
- HANDOFF_RECEIVED;
- CENTRAL_ACCEPTANCE;
- founder visual approval.

## Central acceptance

Do not trust the worker report alone.

Verify:
- INPUT_SHA;
- packet hash;
- asset-pack hashes;
- full-history changed paths;
- WRITE_SET;
- forbidden paths;
- reproducible tests/build;
- real visual evidence;
- real input-level progression where claimed;
- export hashes.

Candidate verdict:
- ACCEPT;
- REJECT;
- NEEDS_REPAIR;
- INTERFACE_CHANGE_REQUEST.

Only accepted work can enter an integration candidate.
