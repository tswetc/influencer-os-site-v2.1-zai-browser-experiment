# Pilot Full-Build Rules — P001/P002

These runs are full-system integration builds.

They are intentionally NOT official Wave 01 candidates because the curated full-resolution founder media layer is still being produced.

## What must still be complete

Do not reduce product scope.

Build the complete browser product mission:
- public surfaces;
- Character;
- Image;
- Video;
- Scene / Shot;
- Series / Shoot / Feed;
- Prompt Lab;
- Canvas / Workflow;
- Models;
- Examples;
- MCP;
- Docs;
- Pricing;
- Projects;
- Assets;
- Auth / Settings as far as environment permits;
- EN/RU;
- responsive;
- light/dark if the mission requires both;
- source truth;
- provider truth;
- review loops;
- final export.

## Provisional media rule

Use `04-MEDIA/packs/pilot-atlas-pack-v1.json`.

The pack references selected slots inside review-atlas contact sheets.

You may locally extract those slots using:
`tools/extract_atlas_pack.py`

Label them internally as:
`ATLAS_PREVIEW_DERIVATIVE`

Do NOT claim:
- original resolution;
- final founder-media quality;
- final publication approval.

Do NOT use a whole contact sheet as a hero or production media panel unless the UI is explicitly showing the media-curation system itself.

## Comparison rule

P001 and P002 get identical product/source/reference/media inputs.

They both use design-set-a.

The purpose is to test:
- end-to-end mission execution;
- source fidelity;
- design-research discipline;
- visual iteration depth;
- full product breadth;
- packaging;
- model differences under matched inputs.

## Completion

A pilot can be COMPLETE_WITH_DEGRADED_SUBSYSTEMS because founder media is provisional.

It may NOT use provisional media as an excuse to make the rest of the product partial.
