# ZAI-M001 Central Forensic Audit

Input result commit: `f707b443ab5779b47903cc556d4660599bf30349`

## Verdict

`M001_CURATION_DATA_INTEGRITY_PASS_WITH_NORMALIZATION_AND_RIGHTS_HOLDS`

The curation is usable as a selection source, but it must not be copied directly into the public full-resolution media layer without normalization and founder rights confirmation.

## Mechanically verified

- source selection rows: **161**
- declared images: **150**
- declared videos: **11**
- declared families: **52**
- atlas group/slot references resolve: **161 / 161**
- SSD-relative paths match pinned atlas catalog: **161 / 161**
- sheet paths match atlas catalog: **161 / 161**
- missing slot references: **0**
- CURATION-PROGRESS coverage table resolves GROUP 0001–0200: **200 / 200**
- duplicate source paths: **1 exact duplicate row**

The duplicate source is:
`4/02 Интерьер — постановочная съёмка/Квартира — домашние образы — съёмка/3699743922267958354_3699743911069120421.jpg`

It appears once as `editorial_example` and once as `product_reference`. The normalized selection merges this into one media record with two roles.

## Schema reconciliation

M001 did not use the exact canonical field names anticipated by the lab tooling.

M001 emitted:
- `atlas_group`
- `atlas_slot`
- `ssd_relative_source_path`
- `role`
- `family_or_pack`
- `identity`
- `provenance`

The central normalized schema uses:
- `group_number`
- `slot`
- `source_path`
- `roles[]`
- `family_ids[]`
- `identity_or_subject`
- `provenance`

This is a tooling/schema mismatch, not a curation-content failure.

## Identity claim

M001 inferred a public identity/name from visible atlas evidence.

That inference is NOT promoted into product truth.

Normalized media uses:
`founder-main-01`

until the founder explicitly confirms a public-facing identity/name.

## Rights / publication holds

Normalized status counts:

- `FOUNDER_CONFIRMATION_REQUIRED`: **127**
- `HOLD_CHILD_PRIVACY`: **1**
- `HOLD_BRAND_REVIEW`: **7**
- `HOLD_PUBLISHED_EDITORIAL`: **2**
- `HOLD_THIRD_PARTY_IDENTITY`: **1**
- `DEMO_PROVENANCE_REQUIRED`: **22**

Hard/explicit holds include:
- child/privacy video: G0063/s06
- partner/companion video: G0151/s06
- trademark/brand contexts: G0076, G0083, G0088, G0109
- published editorial/Bazaar shoot: G0084

Generated/demo material remains usable only with visible provenance and remains unapproved for public redistribution by this audit.

## Result

A normalized metadata selection has been created at:

`04-MEDIA/selections/MASTER-SELECTION-NORMALIZED.json`

It contains **160 unique source paths**.

- local materialization allowed by conservative lab filter: **149**
- held from local materialization: **11**
- public-use approvals granted by this audit: **0**

The next safe step is local SSD materialization. Public GitHub upload of full-resolution/web derivatives requires a founder publication decision.


## Package checksum verification

The five ingested M001 artifacts were independently re-hashed from the GitHub commit and compared with `SHA256SUMS.txt`.

Verified exact SHA-256 match for:
- `CURATION-PROGRESS.md`
- `MASTER-SELECTION.json`
- `MEDIA-CURATION-REPORT.md`
- `PACK-PROPOSALS.md`
- `RIGHTS-REVIEW.md`

Result: **5 / 5 exact matches**.
