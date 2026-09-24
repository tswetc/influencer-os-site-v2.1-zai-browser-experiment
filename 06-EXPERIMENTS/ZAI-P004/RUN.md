# ZAI-P004 — Full-System Integration Pilot

STATUS: READY
TYPE: FULL_SYSTEM_INTEGRATION_PILOT
MODEL: GLM-5.3
PLANNED_MODEL_AT_PINNED_LAUNCH: GLM-5.3-Flash
MODEL_OVERRIDE_AT_LAUNCH: YES
DESIGN_VARIANT: QUIET-PHOTOGRAPHIC-CINEMA
REFERENCE_SET: design-set-b
PRODUCT_BACKBONE: OS23.6 + HIGGSFIELD + FIGMA_WEAVE + EXISTING_V2
MEDIA_SET: pilot-atlas-pack-v1
GITHUB_MODE: READ_ONLY_INPUT
INPUT_COMMIT: PROVIDED_BY_LAUNCH_PROMPT

## Purpose

Run the complete Influencer OS Site V2.1 browser-product mission now, before the official curated-media freeze.

This is a serious full product build, not a smoke test.

The only deliberate degradation is media fidelity: selected founder media is represented by atlas-preview derivatives until M001 finishes.

## Read in this order

From the exact launch commit:

1. `00-GOVERNANCE/START-HERE.md`
2. `00-GOVERNANCE/PARALLEL-RUN-PROTOCOL.md`
3. `01-BASE/PILOT-FULL-BUILD-RULES.md`
4. `01-BASE/MASTER-MISSION-FULL.md`
5. `01-BASE/PRODUCT-BACKBONE-REFERENCES.md`
6. `01-BASE/REFERENCE-FIDELITY-LOOP.md`
7. `01-BASE/DESIGN-QA-GATE.md`
8. `02-SOURCE-TRUTH/SOURCE-INDEX.md`
9. `03-REFERENCES/common/`
10. `03-REFERENCES/design-set-b/REFERENCE-RECIPE.md`
11. `04-MEDIA/packs/pilot-atlas-pack-v1.json`
12. this RUN.md

## Isolation

- GitHub is read-only.
- Do not read sibling experiment folders for creative direction.
- Work only inside this chat sandbox.
- Keep a local Git history.
- Never push implementation code to the shared lab repo.

## Mandatory media preflight

Verify that:
- atlas sheets download;
- `tools/extract_atlas_pack.py` works;
- at least 10 extracted provisional images are visually readable.

If atlas media extraction fails, continue with a truthful degraded-media state rather than abandoning the full product mission.

## Design

Do not improvise a generic design.

Research the exact three assigned design anchors.
Produce the required measured design constitution before scaling the UI.

Use the reference-fidelity loop and all three visual correction passes.

## Product

Treat product breadth as P0.

Do not stop at:
- homepage;
- dashboard shell;
- a few routes;
- pretty mockups;
- a single generator.

Follow the complete master mission.

## Output

Export:
`ZAI-P004-GLM53Flash-QUIET-PHOTOGRAPHIC-CINEMA-PILOT-FINAL.zip`

Mandatory evidence:
- RUN-MANIFEST.md
- SOURCE-RECONCILIATION.md
- DESIGN-CONSTITUTION.md
- DESIGN-TOKENS.md
- MOTION-SPEC.md
- REFERENCE-TRANSFER-MATRIX.md
- DECISION-LOG.md
- FAILURE-LOG.md
- TEST-RESULTS.md
- FINAL-HANDOFF.md
- EXPORT-MANIFEST.md
- final screenshot set

Final status:
- COMPLETE
- COMPLETE_WITH_DEGRADED_SUBSYSTEMS
- INCOMPLETE
