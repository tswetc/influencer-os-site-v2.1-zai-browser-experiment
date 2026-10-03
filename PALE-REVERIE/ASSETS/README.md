# PALE REVERIE — Assets

Assets are part of the game project, but source originals and Browser transport are different layers.

## Asset families

- `identity-core-vN` — visual identity refs for Eira / Velm / Blu / Carr.
- `world-style-vN` — world, palette, material and atmosphere references.
- `characters-models-vN` — approved GLB/VRM character candidates.
- `motion-reference-vN` — movement/combat/acting references.
- `cinematics-vN` — in-game produced video.
- `marketing-video-vN` — trailers/social assets, normally not runtime dependencies.
- `audio-vN` — approved audio derivatives.

## Pipeline

original/private master
→ registry
→ reviewed derivative
→ frozen pack
→ Browser transport

A worker gets only the exact packs needed by its mission.

## Rules

- no silent replacement of bytes inside a frozen pack;
- SHA-256 every transported file;
- stable semantic asset IDs;
- public repo gets only assets explicitly approved for public transport;
- keep local/raw source paths out of public manifests;
- generated assets remain candidates until reviewed;
- GLB candidates require load/preview checks;
- large video/media must use a verified transport method instead of bloating normal Git.

## 3D model acceptance before pack freeze

Record:
- front / 3/4 / profile / back preview;
- triangle count;
- material count;
- skeleton present/absent;
- animation clips if any;
- unit/scale/orientation;
- Three.js/browser load smoke.

Do not assume an unrigged image-to-3D mesh can be auto-rigged reliably.

## Video transport

Prefer H.264 MP4 / verified WebM, short web-ready derivatives, fast-start and sensible size.

Do not make Git LFS the default until the Browser worker transport path is proven to receive actual LFS bytes rather than pointer files.

See `PACK-SCHEMA.json`.
