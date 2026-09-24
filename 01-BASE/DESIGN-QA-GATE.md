# Design QA Gate

A run cannot claim visual completion until it passes this gate.

## Grid
- intentional grid documented;
- no accidental alignment drift;
- page-level and component grids agree;
- mobile is recomposed, not merely compressed.

## Type
- intended font actually loads;
- legal fallback documented when reference font cannot be reused;
- type scale and line-height consistent;
- no accidental browser/system-font fallback;
- EN and RU both checked;
- no widows/overflows in critical headings.

## Spacing
- tokenized spacing;
- repeated component gaps match;
- no random one-off paddings unless documented;
- radii/borders consistent with the constitution.

## Media
- no broken assets;
- no unexplained placeholders in primary user journeys;
- aspect/crop behavior intentional;
- provenance visible;
- reference media never presented as generated output.

## Motion
- one motion temperament;
- no gratuitous effect stacking;
- transition purpose documented;
- reduced-motion alternative;
- no scroll trap or navigation loss.

## Product
- visual ambition does not hide controls;
- Character/Scene/Asset continuity remains clear;
- LIVE/MOCK/UNVERIFIED status stays legible;
- mobile studio actions remain reachable.

## Required screenshots

Capture and inspect at minimum:
- 1920 desktop Home;
- 1440 desktop primary Studio;
- 1024 or 768 product workspace;
- 430/390 mobile Home;
- 390/360 mobile primary Studio;
- EN and RU representative screens;
- light/dark if both exist.

Run a visual self-critique after screenshots and fix defects before export.
