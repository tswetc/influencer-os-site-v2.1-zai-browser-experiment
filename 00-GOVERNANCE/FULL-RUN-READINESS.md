# Full Product Run Readiness

This document prevents premature Wave 01 launches.

## Readiness gates

A full product run may launch only when ALL are true:

- [x] public GitHub raw transport proven;
- [x] large-text transport proven;
- [x] authoritative OS23.6 source published;
- [x] common master mission published;
- [x] product-backbone references defined;
- [x] exact run-specific design recipes defined;
- [x] visual reference-fidelity loop defined;
- [x] founder media inventory published;
- [x] founder visual review atlas published and visually readable;
- [ ] ZAI-M001 curation completed and audited;
- [ ] selected full/web-ready media materialized from SSD originals;
- [ ] run-specific media pack manifests committed;
- [ ] E004–E011 RUN.md files updated with exact media-pack IDs;
- [ ] one final launch-freeze commit created;
- [ ] every official run points to that exact immutable commit.

## Current decision

Official Wave 01 product runs E004–E011 are **NOT launch-ready yet**.

Reason:
the current repository contains a review atlas, not the final individual founder media assets intended for production-quality product rendering.

Using contact sheets as final product media would invalidate the visual-quality goal and distort model comparison.

## What may run now

- ZAI-M001 media curation;
- transport tests;
- explicitly labelled disposable integration/pipeline tests.

Do not treat a product build started before the media freeze as an official Wave 01 candidate.

## Fast path after M001

1. receive and audit MASTER-SELECTION.json;
2. materialize selected SSD originals into web-ready derivatives;
3. generate shared + A/B/C/D pack manifests;
4. commit media;
5. run integrity check;
6. create LAUNCH-FREEZE commit;
7. update E004–E011 to READY at that exact commit;
8. launch matched model pairs.
