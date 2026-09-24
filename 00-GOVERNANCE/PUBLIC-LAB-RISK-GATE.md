# Public Lab Operating Decision — 2026-09-24

Status: TEMPORARILY_PUBLIC_DEVELOPMENT_TRANSPORT

The founder has explicitly chosen to keep this experiment repository PUBLIC during the current architecture/product-development phase because commit-pinned public GitHub transport is the reliable bridge into Chat.Z.AI browser sandboxes.

This is a temporary development architecture decision.

## What public means here

The public lab may contain:
- governance and architecture;
- source-derived behavior contracts;
- source hashes and selected public source core;
- run specifications;
- reference research;
- experiment evidence;
- sanitized, rights-reviewed, neutral-ID transport media required by runs.

## What remains prohibited

Do NOT publish:
- API keys / credentials / secrets;
- customer or license data;
- complete private canonical repositories;
- private deployment/account data;
- a real-world founder identity inferred from media;
- media explicitly rejected for child/privacy/other-identity reasons.

## Identity rule

Use opaque IDs only.

`founder_milena_ioanna` is retired.
Use `founder-main-01` where an identity handle is needed.

Visible media evidence must not be converted into a public real-world identity assertion.

## Media rule

The local 156-item master library is NOT the run pack.

For product runs:
- curate approximately 30–45 strong items;
- sanitize filenames;
- remove source paths/handles from transport manifests;
- strip file metadata where practical;
- include derivative hash + provenance/review state;
- publish only the bounded transport pack required by that run/design set.

The existing 200-sheet atlas remains historical experiment input. New official runs should consume bounded transport packs, not browse the entire atlas by default.

## Public-history note

Current-head sanitization does not erase old public Git history or third-party caches.

Do not perform a destructive shared-history rewrite while already-running commit-pinned experiments depend on old SHAs.

If a future privacy requirement demands true history removal, migrate to a clean repository/fresh history after active pinned runs finish.

## Private sources

Private project-memory and canonical product/site repositories remain private and are not modified by this public transport decision.
