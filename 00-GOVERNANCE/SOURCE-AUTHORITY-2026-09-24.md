# Source Authority and Reconciliation — 2026-09-24

Status: BINDING FOR FUTURE LAUNCH FREEZES

This document corrects an ambiguity in the lab.

## The problem

The lab currently treats the founder-supplied `os23.6.zip` source pack as the semantic authority. That archive is a verified release artifact and remains essential, but the private canonical product repository now has a newer verified release-sync commit and contains implementation surfaces that are not copied into this public experiment repository.

A browser run must not infer that the 23 published source files represent every current product behavior.

## Authority layers

When two sources conflict, reconcile them in this order:

1. **Explicit current founder decision**
   - product direction, publication/identity decisions, strategic supersession.
2. **Durable product-family canon**
   - `tswetc/project-memory`, after it has been updated for the current decision.
3. **Current canonical Web App implementation**
   - private `tswetc/influencer-os` default branch.
   - current verified audit head at the time this document was written:
     `1158007fdaefd823e24d7a38d4fa7258814b541c`.
4. **Verified release artifact baseline**
   - `os23.6.zip`
   - SHA-256 `8fd6f6a9e5bf8fc4e83cf04f26973b241a5319652a355017ef0c36e897233a84`.
5. **Canonical site ancestry**
   - private `tswetc/influencer-os-site` V2/V2.1.
6. **External reference products/sites**
   - architecture, UX, interaction and visual research only.
   - never override Influencer OS semantics.

## Important distinction

The public lab publishes a **selected source core**, not the complete private product repository.

The published 23-file source pack is sufficient for the core prompt/canon mechanics that it contains. It is NOT evidence that omitted product behavior does not exist.

Examples of current private implementation domains outside the 23-file public pack include:
- parsing;
- vision/reference analysis and cache;
- license behavior;
- backup/import validation;
- IndexedDB/storage migration behavior;
- display-label consistency;
- manifest/share/export behavior;
- product consistency edge cases;
- current UI wiring and release tests.

Future full-product runs must receive a derived behavior contract for these domains rather than a verbatim copy of the complete private source.

## No public-source expansion

Do NOT solve the gap by copying the entire private product repository into this public lab.

Use:
- behavior contracts;
- exact private source HEAD;
- release artifact hashes;
- derived acceptance tests;
- explicit reconciliation notes.

Promotion into a private canonical branch may read the complete private source directly.
