# Media Curation Pipeline

Inventory commit 5cbe075c5068548d20ea8591f92fd3dd931adac1 established:

- 11,458 files total;
- ~4.70 GB;
- 10,298 images;
- 952 videos;
- remaining files are metadata/docs/audio/other.

The library is too large to copy wholesale into GitHub or into every Z.ai run.

## Architecture

### Tier 0 — SSD originals

Location:
`/Volumes/F/INFLUENCER-OS-ZAI-LAB/originals`

Source archive. Never modified by lab scripts.

### Tier 1 — metadata inventory

`04-MEDIA/inventory/founder-originals.json`

Contains structure, sizes, media type, dimensions and video duration.

### Tier 2 — visual review atlas

`04-MEDIA/review-atlas/`

Sparse contact sheets:
- maximum 5 image samples per logical folder;
- maximum 1 video poster per logical folder;
- deterministic spread through each folder;
- exact source-path mapping.

Purpose:
let human/agent reviewers understand the media corpus without publishing all originals.

### Tier 3 — master selected library

After review, create curated web-ready media packs from exact SSD-relative source paths.

### Tier 4 — run-specific packs

Each ZAI-E### receives only the packs it needs.

## Existing structure is valuable

The inventory shows that part of the founder library is already deeply curated by shoot/category.

Folder `4/` contains categories including:
- studio;
- staged interior;
- fashion/looks;
- sea/beach/water;
- travel/city;
- nature;
- family;
- home;
- portraits/selfies;
- art/creativity;
- food/venues;
- events;
- paired shoots;
- sports;
- text/graphics;
- animals.

Many already contain named shoot-level subfolders.

Folder `3/01_MAIN_CHARACTER/` is also explicitly structured into Home & Interior, Nature, Events, Sea & Beach, Studio, City, Travel and Art & Objects.

The pipeline preserves and exploits this organization rather than reclassifying everything from scratch.

## Derived/control exclusions

Archive-control folders, cached thumbnails, curation-control folders and obvious derivative JPEG caches are excluded from the review atlas.

They remain in the original inventory for auditability but should not consume visual-review budget.

## Selection philosophy

Do not select media only by filename/metadata.

Use:
1. existing founder folder semantics;
2. visual atlas review;
3. identity continuity;
4. composition/quality;
5. run-specific design needs;
6. provenance/rights.

Computer vision may assist, but should not erase the founder's existing curation structure.
