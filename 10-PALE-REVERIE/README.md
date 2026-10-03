# PALE REVERIE — Browser Z AI control plane

Status: BOOTSTRAP / NO GAME SOURCE INGESTED YET

This directory is the durable coordination plane for the PALE REVERIE game project.

It lives beside the Influencer OS Browser Z AI lab because it reuses the proven browser-worker operating model, but it is a separate project with separate authority, assets, waves, run IDs and results.

## What belongs here

- stable game/product contract;
- current project state;
- asset transport rules and manifests;
- wave plans;
- run packets and frozen launch metadata;
- central audit / handoff records.

## What does NOT belong on main

- a browser worker's live implementation;
- node_modules, caches or build temp files;
- secrets or .env values;
- raw/private reference libraries;
- unreviewed large media dumps;
- arbitrary candidate output.

The actual game source will be ingested from the existing Browser Z AI sandbox during PR-W000 and frozen as a separate baseline/construction branch. Future Browser Z AI workers start from an exact immutable SHA, work only in their local sandbox/branch and return artifacts for central audit.

## Operating model

control plane on main
→ source/asset freeze
→ immutable construction branch + exact INPUT_SHA
→ compiled per-run packets
→ isolated Browser Z AI workers
→ local commits
→ core.tar + run.bundle + optional evidence
→ central ingestion/audit
→ integration candidate
→ next freeze/wave

A launch prompt should be a short pointer to a frozen run packet, not a giant one-shot specification.

Start with:
- `00-GOVERNANCE/START-HERE.md`
- `01-CANON/PRODUCT-CONTRACT.md`
- `01-CANON/CURRENT-STATE.md`
