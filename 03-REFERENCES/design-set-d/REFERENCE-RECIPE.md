# Design Recipe D — Continuous Object System

## Priority chain

### 1. PRIMARY INTERACTION ANCHOR — Maria Vasilyeva
https://www.mariavasilyeva.com/

Founder-specific target:
- gallery scrolling behavior/physics.

Research:
- wheel/trackpad mapping;
- inertia;
- item spacing;
- active-item behavior;
- velocity response;
- edge behavior;
- mobile fallback;
- detail-entry transition.

Transfer to IOS:
- references;
- generations;
- compare;
- project assets.

### 2. TRANSFORMATION MODEL — Garden Eight / Continuous Transformation
https://tympanus.net/codrops/2026/07/24/the-art-of-continuous-transformation-how-garden-eight-blends-integrity-with-play/

Transfer:
- Character/Scene/Asset should persist conceptually across modes;
- mode switching should transform state, not reset context.

### 3. PERSISTENT MEDIA TRANSITION — WebGPU page-transition research
https://tympanus.net/codrops/2026/06/30/building-persistent-page-transitions-with-webgpu-and-vanilla-javascript/

Use only if environment/performance permit.
Always design a non-WebGPU/reduced-motion fallback.

### 4. MEDIA NARRATIVE — Getty Tracing Art
https://www.getty.edu/tracingart/

Use:
- chapters;
- evidence;
- high media density;
- captions/provenance.

### 5. TYPOGRAPHIC ANCHOR — Studio K95
https://www.k95.it/

Use:
- keep spatial experimentation disciplined;
- strong editorial anchors;
- stable navigation/type hierarchy.

### 6. WORKBENCH ANCHOR — TouchDesigner
https://derivative.ca/

Use:
- once the user enters studio mode, continuity remains visible but tooling becomes explicit and usable.

## Required synthesis

Maria governs gallery physics.
Continuous Transformation governs product-state continuity.
Persistent-transition research supplies implementation possibilities.
Getty governs media evidence.
K95 governs type/system.
TouchDesigner governs workbench.

No scroll hijacking that harms control.
No motion that hides provenance/state.
