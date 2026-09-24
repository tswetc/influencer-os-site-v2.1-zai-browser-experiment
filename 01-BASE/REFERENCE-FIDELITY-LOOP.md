# Reference Fidelity Loop

This protocol exists to prevent generic, ungrounded visual improvisation.

Do not use vague self-evaluation such as “looks polished” or “feels premium” as evidence.

## Phase 1 — Capture references before coding

For each run-specific reference:
- open the live site;
- capture representative desktop screenshots;
- capture mobile where available;
- capture at least one interaction/motion sequence if relevant;
- inspect public CSS/font declarations where technically accessible;
- record what is OBSERVED versus INFERRED.

Store findings in:
`docs/reference-research/<reference-id>/`.

## Phase 2 — Extract a transfer specification

Create:
- `DESIGN-CONSTITUTION.md`
- `DESIGN-TOKENS.md`
- `MOTION-SPEC.md`
- `REFERENCE-TRANSFER-MATRIX.md`

No major visual token may appear in the final implementation without one of:
- reference evidence;
- existing V2 ancestry;
- clear product/accessibility necessity documented in DECISION-LOG.

## Phase 3 — Build one representative slice first

Before scaling the design across the entire product, fully implement:
1. Home hero + one media/proof section;
2. Character or Image Studio primary state;
3. one transition or motion pattern;
4. one mobile state.

Capture screenshots.

If the slice does not demonstrate the assigned reference recipe, fix the system before propagating it.

## Phase 4 — Three visual correction passes

### Pass V1 — composition / grid
Compare:
- hierarchy;
- margins;
- column logic;
- image scale;
- density;
- negative space;
- alignment.

Fix before V2.

### Pass V2 — typography / material / colour
Compare:
- actual loaded fonts;
- size ratios;
- weight;
- tracking;
- line-height;
- colour relationships;
- border/radius/material treatment;
- texture use.

Fix before V3.

### Pass V3 — motion / interaction
Compare:
- duration;
- easing;
- inertia;
- order;
- transition continuity;
- hover/selection behavior;
- scroll behavior;
- reduced-motion/mobile fallback.

Fix before product-wide QA.

## Phase 5 — Product-wide visual regression

Capture representative final screens at:
- 1920
- 1440
- 1024/768
- 430/390
- 360

Check:
- Home
- Character
- Image
- Video
- Prompt Lab
- Models
- Examples
- Assets/Projects
- one planning surface
- one RU workflow

## Default-design prohibitions

Unless explicitly justified by a reference or product requirement:
- no generic gradient hero;
- no decorative glowing orb;
- no glass panels everywhere;
- no arbitrary giant pills;
- no repeated same-size rounded cards as the dominant composition;
- no default component-library visual language left unmodified;
- no stock “AI sparkle” iconography;
- no random WebGL effect;
- no unexplained purple/blue AI palette;
- no huge empty hero merely to look expensive.

## Completion rule

The agent may not claim visual completion until:
- reference research exists;
- the measured constitution exists;
- V1/V2/V3 correction passes are logged;
- final screenshots have been inspected;
- discovered defects are either fixed or explicitly documented.
