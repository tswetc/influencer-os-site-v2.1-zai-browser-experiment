# Post-M001 Result Ingest

ZAI-M001 is read-only with respect to GitHub. Its result must be deliberately ingested by the founder.

## Ask the completed M001 chat to package

Create:

`/home/z/my-project/download/ZAI-M001-MEDIA-CURATION-RESULT.zip`

Include exactly:
- MEDIA-CURATION-REPORT.md
- MASTER-SELECTION.json
- PACK-PROPOSALS.md
- RIGHTS-REVIEW.md
- CURATION-PROGRESS.md
- SHA256SUMS.txt

Do not rerun curation.
Do not change selection during packaging.

## Founder Mac ingest target

After downloading the ZIP to macOS:

`/Volumes/F/INFLUENCER-OS-ZAI-LAB/repo/07-RESULTS/ZAI-M001/`

Do NOT copy MASTER-SELECTION.json into the active media-selection path until central audit has passed.

## Central audit gates

Before materializing originals:
- schema completeness;
- exact catalog path resolution;
- duplicate/redundancy review;
- identity-family consistency;
- explicit/minor/privacy flags;
- third-party/reference-only flags;
- trademark/editorial-publication flags;
- rights_status semantics;
- design-set affinity usefulness;
- selection count and family distribution.

## Identity caution

Identity/name conclusions inferred from media are not automatically product truth.

A public-facing identity/name must be founder-confirmed or source-supported before use in product copy.

## After audit

Only approved rows move into:
`04-MEDIA/selections/MASTER-SELECTION-APPROVED.json`

Then run the local web-media materialization tools.
