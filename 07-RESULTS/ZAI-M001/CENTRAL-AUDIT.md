# ZAI-M001 Central Forensic Audit

Original ingest commit:
`f707b443ab5779b47903cc556d4660599bf30349`

## Verdict

`M001_CURATION_DATA_INTEGRITY_PASS_WITH_NORMALIZATION`

The curation is a valid selection source after central normalization and subsequent founder decisions.

## Original artifact integrity

At ingest, the five M001 artifacts were independently re-hashed against the package-provided checksum file.

Result:
**5 / 5 exact SHA-256 matches.**

The original package hashes are preserved in:
`ORIGINAL-PACKAGE-SHA256SUMS.md`

The current public text artifacts were later intentionally sanitized to remove an inferred real-world identity. Current hashes therefore differ and are recorded in:
`SHA256SUMS.txt`

This is an intentional derived-public-text change, not unexplained artifact drift.

## Mechanically verified original selection

- source selection rows: **161**
- declared images: **150**
- declared videos: **11**
- declared families: **52**
- atlas group/slot references resolve: **161 / 161**
- SSD-relative paths match pinned atlas catalog: **161 / 161**
- sheet paths match atlas catalog: **161 / 161**
- missing slot references: **0**
- CURATION-PROGRESS coverage resolves GROUP 0001–0200: **200 / 200**
- duplicate source paths: **1 exact duplicate row**

The duplicate source was merged into one normalized media record with multiple roles.

## Schema reconciliation

M001 emitted its own field names. The central normalized schema maps them into:
- `group_number`
- `slot`
- `source_path`
- `roles[]`
- `family_ids[]`
- `identity_or_subject`
- `provenance`

This was a tooling/schema mismatch, not a curation-content failure.

## Identity correction

M001 inferred a real-world identity/name from visible atlas evidence.

The founder explicitly rejected that as public product identity.

Current public contract:
- opaque identity ID only: `founder-main-01`;
- do not infer/reconstruct/publish a real-world founder identity;
- current public M001 text artifacts were sanitized accordingly.

One selected frame, G0027/s01, visibly contains a real-world identity card in the pixels. It remains available for local/private review but is explicitly excluded from new PUBLIC browser transport packs.

## Rights decisions after central audit

The initial conservative filter held more material than the founder ultimately required.

Binding subsequent founder decisions:
- child/privacy media: reject;
- selected other-identifiable-person media: reject;
- ordinary major-brand/incidental brand context: allowed for product use without implying endorsement;
- editorial imagery: allowed for product use;
- exhibit/gallery/art context: allowed for product use;
- specific brand campaign imagery: case-by-case.

Current normalized state:
- **160** unique source paths;
- **156** eligible for local materialization;
- **4** held;
- public browser transport receives the additional pixel-level exclusion for G0027/s01.

## Local materialization evidence

Founder terminal evidence from the clean staging-based rebuild reported:
- normalized input: **160**
- eligible local materialization: **156**
- materialized: **156**
- skipped holds: **4**
- errors: **0**
- filesystem files: **156**
- unique manifest paths: **156**
- unique source paths: **156**
- stale G0028/s01 derivative: **0**
- staging directory after success: absent

The local master library is a source for bounded run packs, not a public pack by itself.

## Result

Use:
`04-MEDIA/selections/MASTER-SELECTION-NORMALIZED.json`

Next media stage:
bounded 30–45 item design packs → sanitized full-quality public transport derivatives → transport SHA verification → immutable launch freeze.
