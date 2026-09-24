# Public Lab Risk Gate — 2026-09-24

STATUS: P0 — NO NEW SENSITIVE MEDIA OR PRIVATE SOURCE

The experiment repository is currently PUBLIC.

## Existing exposure

The repository already contains:
- founder media inventory metadata;
- a 200-sheet visual review atlas;
- source-derived / verbatim core code;
- media-curation reports.

The M001 review identified categories inside the atlas that include privacy/rights-sensitive material, third-party social content, family/child content, an explicit-nudity group, brand/editorial material and private-context screenshots.

Removing those items from a later production pack does NOT remove the fact that the atlas/history was public.

## Immediate rule

Until the repository-visibility architecture is changed:

DO NOT add:
- full-resolution founder media;
- web-ready master media;
- new unsanitized contact sheets;
- raw SSD paths with private handles unless strictly necessary;
- credentials;
- customer/license data;
- additional verbatim private product source.

## Safe public content

Allowed:
- governance;
- derived product behavior contracts;
- source hashes and provenance;
- run specifications;
- sanitized reference-transfer notes;
- media manifests using neutral IDs;
- explicitly approved low-risk transport derivatives.

## Recommended architecture

Use two planes:

### Private lab/canonical plane
- complete media metadata;
- rights/provenance registry;
- full-resolution/web-ready founder assets;
- private source;
- candidate audit artifacts containing sensitive paths.

### Sanitized transport plane
- commit-pinned run contract;
- derived product contract;
- reference evidence packet;
- small, rights-cleared media pack;
- no private names/handles;
- no confidential implementation source.

## Existing-history note

Changing a repository from public to private reduces future public access but cannot guarantee that previous public history was never cloned, cached or mirrored.

Do not rewrite shared history while already-running pinned experiments depend on it without a separate migration plan.
