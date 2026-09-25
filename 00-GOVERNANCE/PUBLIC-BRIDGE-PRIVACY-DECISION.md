# Public Bridge Privacy Decision

Date: 2026-09-25
Status: ACCEPTED

## Problem

The current public experiment repository must remain reachable for already-running pinned P001–P004 and for historical evidence.

Its active tree is neutral-ID only, but older public history may contain obsolete identity inference.

Rewriting/deleting that history now would break reproducibility and could break pinned browser-run fetches.

## Decision

Use TWO repositories/lifecycles:

### 1. Current repository = historical temporary experiment lab

`tswetc/influencer-os-site-v2.1-zai-browser-experiment`

Purpose:
- preserve existing pinned P/M experiment inputs;
- preserve evidence/history;
- complete pre-Astra preparation.

Do not rewrite its old history while any pinned run still needs it.

Do not treat it as the permanent official bridge after Architecture V4.

### 2. Future official bridge = NEW clean-history public transport repository

Create a new repository after:
- P001–P004 results are retrieved or declared non-blocking;
- Architecture V4 is accepted;
- official Wave v4 transport is visually/privacy reviewed.

The new bridge begins from a clean root commit containing ONLY the current approved transport/input stack.

It must not import Git history from this legacy experiment repository.

## What the clean official bridge may contain

- current founder/public authority documents;
- Architecture V4/domain/run contracts;
- selected published OS23.6 source core / hashes as intentionally approved;
- current source behavior contracts;
- sanitized reference packets;
- sanitized Wave v4 media transport;
- E004–E011/Q001 run specs;
- verification tools;
- audit evidence intended for browser runs.

## What it must not contain

- old inferred identity text;
- raw/local founder media library;
- SSD paths;
- old M001 raw identity inference;
- secrets/credentials/customer/license data;
- whole private canonical repositories;
- stale V2/V3 launch contracts;
- browser candidate implementation outputs unless deliberately sanitized as evidence.

## History guarantee

The official bridge's reachable normal branch history begins from the sanitized root.

Do NOT fork the legacy public lab with history.
Do NOT merge legacy main.
Copy only approved current files into the clean bridge.

## Legacy lab after transition

After all pinned historical runs no longer require public raw access:

Founder may choose to:
- make the legacy lab private;
- archive it;
- leave it temporarily public.

That later visibility choice does not change the clean official bridge.

## Migration procedure

1. finish P001–P004 retrieval;
2. freeze legacy evidence SHA;
3. create new empty public bridge repository;
4. copy only approved current files from Architecture V4 freeze;
5. run secret/identity/path scans;
6. build/verify all raw URLs from the new repo;
7. run a small transport probe;
8. record clean bridge root SHA;
9. use ONLY the new bridge for E004–E011/Q001 launch;
10. never give new browser runs legacy-lab URLs unless explicitly needed for historical evidence.

## Acceptance criteria

- [x] historical pinned runs are not broken by rewriting old commits;
- [x] future official bridge has no inherited legacy Git history;
- [x] official bridge contains neutral IDs only;
- [x] raw media/local paths are excluded;
- [x] no automatic canonical promotion occurs;
- [x] the policy is simple enough for one-person operation.

## Result

`PUBLIC_BRIDGE_PRIVACY_STRATEGY_ACCEPTED`
