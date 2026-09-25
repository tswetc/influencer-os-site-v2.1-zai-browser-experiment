# Source Authority and Reconciliation — 2026-09-24

Status: BINDING SOURCE-LAYER CONTRACT

This document defines source precedence. Current launch sequencing is governed by the newer 2026-09-25 founder decisions.

## Authority layers for central reconciliation

1. Explicit current founder decision.
2. Current public-lab supersession/architecture contract.
3. Current canonical private Web App implementation.
   Verified audit head: `1158007fdaefd823e24d7a38d4fa7258814b541c`.
4. Private durable product-family canon when current.
5. Verified release artifact baseline:
   `os23.6.zip` SHA-256 `8fd6f6a9e5bf8fc4e83cf04f26973b241a5319652a355017ef0c36e897233a84`.
6. Canonical site ancestry: private `tswetc/influencer-os-site` V2/V2.1.
7. External products/sites: research only; never override Influencer OS semantics.

## Important distinction

The public lab publishes a selected source core, not the complete private product repository.
The published source core is authoritative for mechanics it actually contains; omission is not evidence that current private behavior does not exist.

Known private-current behavior outside the selected public core includes parsing, vision/cache, license behavior, backup/import validation, IndexedDB migration, display-label/product consistency, export/share behavior, UI wiring and release tests.

## No public-source expansion

Do not copy the entire private product repository into the public lab.
Use behavior contracts, exact private source HEADs, release hashes, derived acceptance tests and reconciliation notes.

## Public-run rule

New public browser runs use:
`00-GOVERNANCE/PUBLIC-CANON-SUPERSESSION-2026-09-25.md`.

Historical pinned runs keep their historical authority input.