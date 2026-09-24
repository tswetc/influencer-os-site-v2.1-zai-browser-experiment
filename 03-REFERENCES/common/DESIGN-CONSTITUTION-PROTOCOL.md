# Design Constitution Protocol

Vague labels such as “editorial”, “cinematic”, or “premium” are insufficient.

Every full run must convert its assigned references into a **measured design constitution** before implementation.

## Required method

For each assigned reference:

`REFERENCE → OBSERVED MECHANIC → MEASURABLE PROPERTY → WHY → IOS TRANSLATION → DO NOT COPY`

Use current public pages when accessible.

Classify every claim:
- `OBSERVED`
- `INFERRED`
- `NOT_OBSERVED`

## Mandatory constitution sections

### 1. Layout / grid
Record, where observable:
- content width;
- column count;
- gutters;
- outer margins;
- baseline/vertical rhythm;
- density;
- image-to-text ratio;
- breakpoints;
- mobile restructuring.

### 2. Typography
Record:
- font family from public CSS when observable;
- license/availability;
- fallback if not legally reusable;
- display/body/mono roles;
- size range;
- line height;
- tracking;
- case;
- alignment;
- paragraph measure.

Do not copy a proprietary font without a usable license.

### 3. Spacing / shape
Record:
- spacing scale;
- component padding;
- border widths;
- radii;
- dividers;
- shadows;
- surface hierarchy.

### 4. Media grammar
Record:
- dominant aspect ratios;
- crop behavior;
- full-bleed vs contained;
- captions/provenance;
- sequence/chapter logic;
- hover/reveal behavior;
- image/video handoff.

### 5. Motion grammar
Record:
- duration bands;
- easing/spring character;
- inertia;
- scroll coupling;
- reveal order;
- transition-object behavior;
- hover behavior;
- reduced-motion alternative.

### 6. Interaction grammar
Record:
- navigation behavior;
- drawers/panels;
- selection model;
- keyboard behavior;
- progressive disclosure;
- live preview;
- state persistence.

### 7. Product mapping
Specify exactly which Influencer OS surfaces inherit each mechanic:
- public Home/Examples/Docs;
- Character;
- Image;
- Video;
- Prompt Lab;
- Scene;
- Series/Shoot/Feed;
- Canvas;
- Models;
- Assets/Projects;
- Settings/Auth.

## Anchor/reference roles

Each run gets:
- ONE **anchor reference** for composition/type temperament;
- ONE **media reference**;
- ONE **motion/transition reference**;
- ONE **creator/workbench reference**;
- optional supporting references for specific mechanics.

Do not average all references into generic “nice design”.

## Pre-build proof

Before full implementation create:
- `docs/reference-research/`;
- one teardown per assigned reference;
- `docs/DESIGN-CONSTITUTION.md`;
- `docs/DESIGN-TOKENS.md`;
- `docs/MOTION-SPEC.md`;
- `docs/REFERENCE-TRANSFER-MATRIX.md`.

Then build.

## Visual QA

At final review compare representative screenshots against the constitution:
- 1920 desktop;
- 1440 desktop;
- 1024/768;
- 430/390;
- 360.

Reject:
- broken grid;
- accidental typography substitutions;
- inconsistent radii/spacing;
- generic SaaS drift;
- empty placeholder-heavy media composition;
- visual states that contradict product truth.
