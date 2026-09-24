# ZAI-E004 — Full Product Development Wave

STATUS: READY_FOR_FREEZE_LAUNCH
TYPE: PRODUCT_QUALITY
EXPECTED_UI_MODEL: GLM-5.3
DESIGN_VARIANT: CONTROLLED-GRAPHIC-EDITORIAL
REFERENCE_SET: design-set-a
MEDIA_SET: wave01-A-public-v3
INPUT_COMMIT: PROVIDED_BY_LAUNCH_PROMPT
GITHUB_MODE: READ_ONLY_INPUT

## Purpose

Build the strongest COMPLETE Influencer OS Site V2.1 browser-product candidate possible from the frozen public input.

This is not:
- a landing-page exercise;
- a route-count exercise;
- a static UI mock;
- a disposable prototype.

Treat the result as a serious near-production product candidate.

## Required reading order

Read everything from the exact INPUT_COMMIT supplied by the launch prompt:

1. `00-GOVERNANCE/START-HERE.md`
2. all files required by START-HERE
3. `03-REFERENCES/common/`
4. `03-REFERENCES/design-set-a/REFERENCE-RECIPE.md`
5. `04-MEDIA/packs/wave01-A-public-v3.json`
6. `07-RESULTS/AUDIT-RUBRIC.md`
7. this RUN.md
8. `01-BASE/MASTER-MISSION-FULL.md` only as exhaustive implementation/source appendix

Do not read sibling run folders for creative direction.

## Runtime identity

Expected UI model: `GLM-5.3`.

Record the exact visible runtime model label in RUN-MANIFEST.md.

If it differs:
- continue the mission;
- record `MODEL_OVERRIDE_AT_LAUNCH`;
- do not claim a clean model comparison for this pair.

## Media transport

Use ONLY:
`04-MEDIA/packs/wave01-A-public-v3.json`

Fetch/extract it with:
`tools/fetch_public_atlas_pack.py`

All raw GitHub URLs must be pinned to the exact INPUT_COMMIT.

These are bounded `ATLAS_PREVIEW_DERIVATIVE` development assets.
Do not call them original-resolution publication masters.

Use neutral identity ID `founder-main-01`.
Do not infer or publish a real-world founder identity.

## P0 architecture

Implement the four logical areas:
1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

All four share one domain/application model.

Implement the semantics in:
- PRODUCT-ARCHITECTURE-V3
- DOMAIN-MODEL-V1
- EXPERT-WORKFLOW-GRAPH-CONTRACT
- CURRENT-PRODUCT-BEHAVIOR-CONTRACT
- FULL-PRODUCT-RUN-CONTRACT-V3

## Required deep jobs

P0 depth is mandatory:

1. Character → CharacterRevision → CanonRevision → save/reuse/history.
2. Scene/Image/Prompt Lab → visible OS transformation → SelfCheck → GenerationJob/Attempt → Asset → Compare/save.
3. Reuse the SAME project + character state into Video and Series/Shoot/Feed.
4. Expert Workflow node graph using the same domain objects, typed ports and traceable lineage.
5. MCP tool path invoking the same core use cases instead of a separate semantic implementation.

## Design process

Do not improvise a generic AI/SaaS aesthetic.

Before major implementation:
1. inspect the exact assigned references;
2. record OBSERVED / INFERRED / NOT_OBSERVED;
3. produce `docs/DESIGN-CONSTITUTION.md`;
4. produce `docs/DESIGN-TOKENS.md`;
5. produce `docs/MOTION-SPEC.md`;
6. produce `docs/REFERENCE-TRANSFER-MATRIX.md`;
7. build one representative slice;
8. critique against references;
9. correct composition/grid;
10. correct type/material/colour;
11. correct motion/interaction;
12. then scale the system.

Use the exact role hierarchy in the design-set recipe.

## Product truth

Never invent source truth.
Never call MOCK / UI_ONLY / UNVERIFIED_EXTERNAL systems LIVE.

Use explicit labels:
CURRENT_CANONICAL_BEHAVIOR
SOURCE_PRESERVING_UI_RECOMPOSITION
PRODUCT_EXTENSION
EXPERIMENT_ONLY
MOCK
UNVERIFIED_EXTERNAL

## Failure protocol

Use bounded retries with materially different approaches.

A blocked subsystem does not stop independent work:
- record the failure;
- continue;
- revisit later;
- preserve truthful status.

Do not loop indefinitely.

## Priority

P0 → P1 → P2.

Do not spend late-run compute on decorative P2 while actionable P0/P1 remains.

## Mandatory final loops

A. SOURCE / TRUTH
B. FUNCTIONAL / SECURITY
C. UX / VISUAL + responsive + EN/RU + a11y
D. PACKAGING / PORTABILITY
E. integrated regression

Capture and inspect required screenshots at:
1920 · 1440 · 1024/768 · 430/390 · 360
including representative EN/RU and light/dark states where implemented.

## Isolation

- GitHub is read-only input.
- Work only in this sandbox.
- keep local Git history;
- do not push implementation to shared lab;
- do not import implementation from sibling experiments.

## Export

Export exactly:
`ZAI-E004-GLM53-CONTROLLED-GRAPHIC-EDITORIAL-FINAL.zip`

Mandatory evidence includes:
RUN-MANIFEST.md
SOURCE-RECONCILIATION.md
ARCHITECTURE-CONFORMANCE.md
DOMAIN-MODEL-CONFORMANCE.md
WORKFLOW-GRAPH-EVIDENCE.md
PROVIDER-STATE-MATRIX.md
PERSISTENCE-STATE.md
MCP-COMPATIBILITY.md
LINEAGE-EVIDENCE.md
DESIGN-CONSTITUTION.md
DESIGN-TOKENS.md
MOTION-SPEC.md
REFERENCE-TRANSFER-MATRIX.md
DECISION-LOG.md
FAILURE-LOG.md
TEST-RESULTS.md
FINAL-HANDOFF.md
EXPORT-MANIFEST.md

Final status must be:
COMPLETE
COMPLETE_WITH_DEGRADED_SUBSYSTEMS
or INCOMPLETE.

COMPLETE is forbidden while any actionable P0 remains.
