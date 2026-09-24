# Wave 01 Media Pack Curation V4

Status: BINDING_SELECTION_FOR_NEXT_WAVE_BUILD

## Why this exists

The founder explicitly prefers 30–45 genuinely selected media items to 60–80 merely available files.

M001 already visually reviewed all 200 atlas groups and produced the curated master candidate library.

This document records the second-stage run-pack decision.

The build is no longer allowed to choose media by random/even sampling at runtime.

## Public exclusions

The following audited group/slot records are forbidden from browser-run public transport:

- G0027/s01 — visible real-world identity card;
- G0068/s06 — motion preview includes multiple visible bystanders;
- G0111/s05 — foreground metro crowd / other identifiable people.

These exclusions are stricter than the local private master library. They do not delete originals.

## Exact pack sizes

- A · Controlled Graphic Editorial: **39**
- B · Quiet Photographic Cinema: **42**
- C · Authoring Instrument: **33**
- D · Continuous Spatial System: **36**

All are within the founder target of 30–45.

## Pack A

Intent:
- graphic/editorial contrast;
- strong color/material changes;
- controlled fashion families;
- enough identity anchors to demonstrate continuity;
- still-life/capability proof;
- only a few motion elements.

Exact group/slot list:

`G0006/s01 G0030/s02 G0030/s04 G0130/s03
G0035/s01 G0035/s04 G0039/s01 G0039/s04 G0040/s01 G0043/s02
G0072/s01 G0072/s04 G0073/s01 G0073/s05 G0079/s03 G0104/s03
G0137/s05 G0094/s04 G0052/s02
G0009/s05 G0024/s03 G0062/s01 G0116/s01 G0116/s04 G0117/s01 G0117/s05
G0186/s01 G0187/s04 G0188/s05 G0147/s01
G0189/s02 G0192/s04 G0195/s03 G0198/s05 G0131/s02 G0134/s05
G0025/s06 G0131/s06 G0159/s06`

## Pack B

Intent:
- photographic atmosphere;
- environmental continuity;
- coast/river/night/natural-light range;
- meaningful motion/video sequencing;
- fewer synthetic capability frames.

Exact group/slot list:

`G0006/s01 G0030/s02 G0030/s04 G0130/s03
G0100/s01 G0100/s04 G0093/s02 G0093/s05 G0066/s01 G0067/s01 G0067/s02
G0017/s01 G0017/s03 G0018/s02 G0018/s03 G0019/s01 G0019/s02
G0052/s02 G0050/s01 G0011/s02 G0011/s04 G0014/s02 G0014/s04
G0081/s02 G0081/s05 G0145/s01 G0145/s05
G0010/s01 G0021/s04 G0024/s01 G0116/s01 G0116/s04 G0117/s01 G0117/s05
G0065/s06 G0100/s06 G0112/s06 G0143/s06 G0159/s06
G0189/s02 G0193/s03 G0198/s05`

## Pack C

Intent:
- authoring/instrument mode;
- identity + input materials + transform proof;
- capability outputs;
- still-life/material nodes;
- several motion nodes suitable for graph workflows.

Exact group/slot list:

`G0006/s01 G0030/s02 G0030/s04 G0130/s03
G0035/s01 G0035/s04 G0039/s01 G0039/s04 G0040/s01 G0043/s02
G0009/s05 G0010/s01 G0024/s03 G0116/s01 G0116/s04 G0117/s01 G0117/s05
G0186/s01 G0187/s04 G0188/s05 G0147/s01
G0189/s02 G0192/s01 G0193/s03 G0197/s01 G0198/s05 G0131/s02 G0134/s05
G0025/s06 G0100/s06 G0112/s06 G0131/s06 G0143/s06`

## Pack D

Intent:
- spatial continuity;
- authored transitions between environments/modes;
- museum/ruin/palace/coast states;
- repeated motion families;
- capability frames as state-change proof.

Exact group/slot list:

`G0006/s01 G0030/s02 G0030/s04 G0130/s03
G0052/s02 G0079/s02 G0079/s03 G0100/s01 G0100/s04 G0137/s03 G0137/s05
G0104/s01 G0104/s03 G0067/s01 G0067/s02 G0094/s02 G0094/s04 G0081/s02 G0081/s05
G0021/s04 G0024/s02 G0062/s03 G0116/s01 G0116/s04 G0117/s01 G0117/s05
G0065/s06 G0100/s06 G0112/s06 G0131/s06 G0143/s06
G0189/s02 G0192/s01 G0193/s03 G0197/s01 G0198/s05`

## Build rule

`tools/make_run_media_packs.py` must reproduce exactly these selections from the clean local master manifest.

No model/browser agent may expand the pack by scanning the rest of the media library.

## Final transport review

Before public push:
1. build sanitized Wave v4 derivatives;
2. create a transport contact sheet for each A/B/C/D pack;
3. visually inspect every transported asset/poster;
4. verify no rejected identity/privacy media;
5. verify filenames/manifest contain only neutral IDs;
6. SHA-verify every transported file;
7. only then commit the Wave v4 transport.
