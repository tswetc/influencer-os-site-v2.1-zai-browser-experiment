# PALE REVERIE — Wave Protocol

This protocol adapts the strongest parts of the existing OS v3 W001 Browser Worker system to the game.

The goal is to stop relying on one giant prompt or one endlessly growing Browser chat.

## 1. Separation of planes

### Control plane
`main/10-PALE-REVERIE/**`

Contains governance, canon, current state, asset pack metadata, wave definitions and run packets.

### Construction plane
A dedicated immutable wave branch, for example:
`pr-w001/construction-<source-short-sha>`

Contains the exact game source snapshot needed by workers plus frozen wave metadata.

### Worker plane
One Browser Z AI chat/sandbox per RUN_ID.

Remote GitHub is read-only.
Worker implementation and local Git history are isolated.

### Integration plane
Trusted central review receives worker artifacts, validates them, and builds an integration candidate. Same-wave workers never consume unpublished sibling output.

## 2. Wave lifecycle

### Stage 0 — authority/state close
- reconcile current founder decisions;
- freeze current product contract;
- identify exact source baseline;
- identify unresolved gates;
- decide the wave objective.

### Stage 1 — asset pack freeze
- select only assets required by the wave;
- produce sanitized derivatives;
- SHA-256 every file;
- freeze pack manifest;
- visually verify transported images/video/model previews where applicable.

### Stage 2 — construction freeze
- create verified construction branch;
- run baseline build/tests;
- record full INPUT_SHA;
- create product/source manifest;
- freeze shared contracts.

### Stage 3 — packet compilation
Every run gets a machine-readable packet with:
- wave_id;
- run_id;
- source repository/branch/INPUT_SHA;
- objective;
- model preference;
- read_scope;
- write_scope;
- forbidden_paths;
- required_context;
- asset_pack_ids + hashes;
- required tests;
- acceptance gates;
- output contract.

Packet is authoritative for run-local scope.

### Stage 4 — independent launch
- unique Browser chat per RUN_ID;
- all runs use the same frozen INPUT_SHA unless the wave explicitly defines separate matched cohorts;
- no worker remote writes;
- no same-wave dependency;
- actual UI/runtime model label recorded.

### Stage 5 — worker execution
Long work is internal to the worker:
source verification
→ implementation
→ tests
→ visual/browser QA where relevant
→ adversarial self-review
→ remediation
→ regression
→ final scope audit
→ FINAL_HEAD freeze
→ export.

Do not stop at the first successful build.

### Stage 6 — artifact handoff
Preferred per-run artifacts:
- `<RUN_ID>-core.tar`;
- `<RUN_ID>-run.bundle`;
- optional `<RUN_ID>-evidence.tar`.

Core contains at least:
- RUN-MANIFEST.json;
- RESULT.json;
- TEST-RESULTS.json;
- CHANGED-PATHS.txt;
- SHA256SUMS.txt;
- concise handoff.

Whole-product/integration runs may additionally return:
- a clean-room-tested FINAL.zip.

Worker may claim EXPORT_READY, not central acceptance.

### Stage 7 — trusted ingestion / forensic audit
Central coordinator verifies:
- bundle prerequisite equals INPUT_SHA;
- complete history stays inside WRITE_SET;
- no forbidden paths changed;
- tests are reproducible;
- claimed visual/playthrough evidence is real;
- asset inputs match frozen hashes.

Status per candidate:
ACCEPT / REJECT / NEEDS_REPAIR / INTERFACE_CHANGE_REQUEST.

### Stage 8 — integration
Integrate accepted lanes in a deliberate order on a new integration branch.
Run whole-game tests and visual/playthrough gates again.
Do not merge candidates blindly.

### Stage 9 — next freeze
The integrated accepted state becomes the candidate input for the next wave only after central verification.

## 3. Parallelism rule

Parallel work is allowed only when WRITE_SET ownership is non-overlapping or a shared interface was frozen before launch.

Examples:
- character asset pipeline and quest-graph tests can run in parallel;
- two workers may not both rewrite the same player controller;
- a worker must not invent a new shared interface expected by sibling workers.

When an interface is insufficient:
emit INTERFACE_CHANGE_REQUEST and continue independent work if possible.

## 4. Branch/run naming

Project namespace: `PR` = PALE REVERIE.

Recommended:
- wave: `PR-W001`;
- run: `PR-W001-A01`, `PR-W001-Q01`, `PR-W001-R01`;
- construction: `pr-w001/construction-<short-sha>`;
- local worker branch: `pr-w001/<RUN_ID>`;
- integration: `pr-w001/integration`.

Never reuse a RUN_ID.

## 5. Short launch prompt principle

The launch chat message should contain only:
- RUN_ID;
- expected model;
- INPUT_SHA;
- packet path/hash;
- the instruction to verify/follow the frozen packet;
- read-only remote rule;
- exact artifact output names.

The detailed mission lives in durable versioned files, not in chat.

## 6. Wave design for this game

Do not split work by vague roles such as "make it better".

Split by bounded ownership, for example:
- character fidelity / asset pipeline;
- render/world visual system;
- movement/camera/animation;
- combat/boss correctness;
- story/quest reachability;
- regression/security/save lifecycle;
- visual judge/evidence harness;
- integration/recomposition.

Exact lanes are created only after PR-W000 has ingested and audited the real current source tree.
