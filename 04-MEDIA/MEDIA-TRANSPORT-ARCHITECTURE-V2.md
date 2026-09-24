# Media Transport Architecture V2

The marketing repository already establishes a stronger pattern than committing a whole media library to Git:

`approved brief → task-scoped frozen media pack → review → rights/privacy/brand/claim QA → approved master`

Adopt the same principle for browser experiments.

## Tier 0 — SSD originals
Immutable founder source.

## Tier 1 — private registry
Stable neutral asset IDs, hashes, provenance, rights, identity, privacy, brand, creative and publication state.

## Tier 2 — private master derivatives
Web-ready files generated from approved originals. Keep outside a public Git repository.

## Tier 3 — run pack
A bounded set required by one design/run. Freeze exact asset IDs + SHA-256.

## Tier 4 — transport derivatives
Only when a browser runner requires HTTP fetchable bytes:
- make a small sanitized pack;
- strip private path/name metadata;
- use neutral filenames;
- publish only after the publication gate passes.

## Manifest minimum

For every transported media item:
- asset_id
- source_content_hash
- derivative_hash
- role
- media_type
- identity_id (opaque)
- provenance
- rights_status
- publication_status
- creative_review
- privacy_review
- brand_review
- claim_review
- pack_id

## Prohibition

Do not commit `04-MEDIA/library/master-v1/` wholesale into the current public lab by default.

The master library and the transport library are different objects.
