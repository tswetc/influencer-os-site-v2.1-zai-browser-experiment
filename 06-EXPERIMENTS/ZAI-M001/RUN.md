# ZAI-M001 — Founder Media Curation

STATUS: READY
TYPE: MEDIA_CURATION
MODEL: GLM-5.3-Flash
INPUT_COMMIT: 5b558a80b90f5ddd16868046a6fc76dc67c7286e
GITHUB_MODE: READ_ONLY_INPUT

## Goal

Review the complete founder media review atlas, identify strong coherent media families, and propose a master selected library for Influencer OS browser-product runs.

This is NOT a product-build run.

## Input

Use ONLY commit-pinned files from:

`5b558a80b90f5ddd16868046a6fc76dc67c7286e`

Required:
- `04-MEDIA/review-atlas/INDEX.md`
- `04-MEDIA/review-atlas/catalog.json`
- `04-MEDIA/review-atlas/sheets/`
- `04-MEDIA/CURATION-PIPELINE.md`
- `04-MEDIA/MEDIA-POLICY.md`
- `04-MEDIA/PACKS.md`
- `01-BASE/PRODUCT-BACKBONE-REFERENCES.md`
- `03-REFERENCES/design-set-a/REFERENCE-RECIPE.md`
- `03-REFERENCES/design-set-b/REFERENCE-RECIPE.md`
- `03-REFERENCES/design-set-c/REFERENCE-RECIPE.md`
- `03-REFERENCES/design-set-d/REFERENCE-RECIPE.md`

## Image-read preflight

Before curation, prove that local image inspection works.

Open these two contact sheets from the pinned commit:

- `04-MEDIA/review-atlas/sheets/0052-5d03766c10e4b7.jpg`
- `04-MEDIA/review-atlas/sheets/0185-369beafd450958.jpg`

Without relying on filenames alone, describe:
- dominant subject/content;
- palette/material;
- portrait/product/media character;
- obvious differences between the two sheets.

If the images cannot actually be visually inspected, STOP with `MEDIA_VISION_BLOCKED`.
Do not curate from filenames alone.

## Full curation method

1. Inspect all 200 contact sheets.
2. Track progress explicitly from GROUP 0001 through GROUP 0200.
3. Preserve existing founder folder/shoot semantics.
4. Select coherent media families, not isolated attractive frames.
5. Keep identities separated unless a comparison surface explicitly requires several.
6. Mark candidates by:
   - GROUP number;
   - sheet slot;
   - exact SSD-relative source path from catalog/index.
7. Distinguish:
   - identity / character;
   - editorial / fashion;
   - Worlds / environments;
   - product / still-life;
   - capability / workflow proof;
   - video / motion;
   - reference-only material.
8. Flag ambiguous rights/provenance instead of assuming.
9. Use the four Wave 01 design recipes to propose run-specific media pools after the shared master selection.
10. Do not modify GitHub.

## Selection priorities

Prefer:
- coherent identity;
- composition quality;
- visual distinction;
- useful variation in framing;
- usable negative space for web layouts;
- strong color/material relationships;
- representative environments;
- media that demonstrates a real Influencer OS job;
- video clips with clear value over stills.

Avoid:
- near-duplicates;
- weak crops;
- redundant poses;
- visually incoherent identity mixing;
- screenshots/control files unless they demonstrate a capability;
- selecting a file only because its filename sounds useful.

## Output

Create locally:

- `MEDIA-CURATION-REPORT.md`
- `MASTER-SELECTION.json`
- `PACK-PROPOSALS.md`
- `RIGHTS-REVIEW.md`
- `CURATION-PROGRESS.md`

### MASTER-SELECTION.json

Every selected item must include:

- group_number
- slot
- source_path
- media_type
- proposed_role
- family_id
- identity_or_subject
- visual_reason
- product_use
- design_set_affinity: [A/B/C/D/shared]
- rights_status: known/unknown/review
- confidence: high/medium/low

## Review passes

### Review 1 — coverage
Confirm GROUP 0001–0200 were all actually reviewed.

### Review 2 — redundancy
Remove near-duplicate or functionally redundant selections.

### Review 3 — identity/provenance
Check identity separation and rights/provenance flags.

### Review 4 — product usefulness
Reject attractive media that has no clear product/site role.

### Review 5 — design-set usefulness
Ensure A/B/C/D receive meaningfully different media pools where appropriate.

## Final status

Use one:
- `MEDIA_CURATION_COMPLETE`
- `MEDIA_CURATION_COMPLETE_WITH_RIGHTS_REVIEW`
- `MEDIA_VISION_BLOCKED`
- `MEDIA_CURATION_INCOMPLETE`

Do not build the product.
Do not push to GitHub.
