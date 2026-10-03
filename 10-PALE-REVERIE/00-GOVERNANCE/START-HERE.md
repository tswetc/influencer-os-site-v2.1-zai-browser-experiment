# PALE REVERIE — Start Here

## A. Central coordinator / architecture work

Read in this order:
1. `../01-CANON/PRODUCT-CONTRACT.md`
2. `../01-CANON/CURRENT-STATE.md`
3. `WAVE-PROTOCOL.md`
4. only the active wave plan under `../03-WAVES/`
5. only the asset contracts/packs needed by that wave.

Do not reconstruct current state from chat memory when durable repository state exists.

## B. Asset ingest / reference update

Read:
1. `../02-ASSETS/ASSET-TRANSPORT.md`
2. the active asset manifest/pack;
3. the active wave plan.

Raw originals remain outside this public repository. Only explicitly approved transport derivatives may be committed.

## C. Browser Z AI worker

Never start a product run from `main`, `latest` or an unpinned URL.

A worker launch must provide:
- WAVE_ID;
- RUN_ID;
- exact 40-character INPUT_SHA;
- exact packet path and SHA-256;
- model expected by the coordinator;
- exact asset pack IDs/hashes;
- instruction that GitHub remote is read-only.

The worker:
1. checks out exactly INPUT_SHA;
2. verifies a clean tree and packet/asset hashes;
3. creates a local run branch;
4. reads only required context/read scope;
5. writes only WRITE_SET;
6. commits incrementally;
7. freezes FINAL_HEAD;
8. exports the required artifact bundle;
9. never pushes/opens PRs unless a later founder decision explicitly changes the contract.

## D. Candidate/result audit

Do not trust a worker's final prose report.

Verify:
- source/input SHA;
- packet/hash identity;
- full changed-path scope;
- local Git history;
- tests/build;
- visual evidence;
- asset provenance;
- honest playthrough claims;
- export freshness and hashes.

Only bounded accepted work is promoted into the next integration baseline.

## Authority

For PALE REVERIE:
1. explicit current founder decision;
2. `PRODUCT-CONTRACT.md`;
3. current durable state / accepted wave contracts;
4. verified running source behavior and evidence;
5. run-local packet for scope only;
6. inference.

A run packet cannot silently override the stable product contract.

## Public-repository boundary

This repository is public transport/coordination infrastructure.

Never commit:
- secrets;
- credentials;
- private local paths;
- raw private references;
- assets without public-transport approval;
- third-party material whose transport rights/status are unknown.

Use neutral asset IDs and sanitized derivative filenames.
