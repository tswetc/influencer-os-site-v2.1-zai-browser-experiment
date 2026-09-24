# ZAI-M001 Result

STATUS: COMPLETE / CENTRALLY_AUDITED / PUBLIC_TEXT_SANITIZED

Runtime: GLM-5.3-Flash  
Reported final status: `MEDIA_CURATION_COMPLETE_WITH_RIGHTS_REVIEW`

## Verified result

- all 200 atlas groups covered by the progress ledger;
- 161 source selection rows;
- 150 image rows + 11 video rows in the original selection;
- 52 declared families;
- all 161 atlas group/slot/source-path references resolved against the pinned atlas;
- one exact duplicate source row merged centrally;
- normalized selection contains 160 unique source paths.

## Founder decisions applied after audit

The conservative initial rights filter was superseded by explicit founder decisions:
- child media rejected;
- other-identity media rejected;
- ordinary major-brand context allowed without endorsement implication;
- editorial and exhibit/art contexts allowed;
- one specific brand campaign still remains held case-by-case.

Current normalized local-materialization state:
- 156 allowed;
- 4 held.

The clean local Mac rebuild was subsequently reported with:
- 156 materialized;
- 4 skipped holds;
- 0 errors;
- 156 unique manifest paths;
- 156 unique sources;
- stale rejected G0028/s01 derivative absent.

## Identity

The M001 agent inferred a real-world identity from visible media.

That inference is explicitly NOT product truth and is removed from current public-lab text.

Use only:
`founder-main-01`

## Integrity

The original ingested package matched its original checksums 5/5.

Current public copies were later intentionally sanitized, so:
- historical ingest checksums are preserved in `ORIGINAL-PACKAGE-SHA256SUMS.md`;
- current sanitized bytes are tracked in `SHA256SUMS.txt`.

## Active selection

Use:
`04-MEDIA/selections/MASTER-SELECTION-NORMALIZED.json`

Do not use the raw M001 selection as a run-pack manifest.

G0027/s01 is additionally excluded from PUBLIC browser transport because visible text in the image exposes a real-world identity card.
