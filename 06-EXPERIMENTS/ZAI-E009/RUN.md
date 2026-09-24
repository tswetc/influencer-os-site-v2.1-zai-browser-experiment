# ZAI-E009 — Product Quality Wave

STATUS: WAITING_FOR_PUBLIC_TRANSPORT_FREEZE
TYPE: PRODUCT_QUALITY
MODEL_POLICY: STRONGEST_AVAILABLE
PREFERRED_RUNTIME: GLM-5.3
FALLBACK_RUNTIME: GLM-5.3-Flash
BASELINE_FALLBACK: GLM-5.2
DESIGN_VARIANT: AUTHORING-INSTRUMENT
REFERENCE_SET: design-set-c
MEDIA_SET: wave01-C-v2
INPUT_COMMIT: PROVIDED_BY_LAUNCH_PROMPT
GITHUB_MODE: READ_ONLY_INPUT

## Purpose

Build a complete, serious Influencer OS product candidate.

This run is optimized for product quality, not for a clean model benchmark.

Record the exact visible runtime model label at launch.

## Mandatory read order

Read from the exact launch commit:

1. `00-GOVERNANCE/START-HERE.md`
2. `00-GOVERNANCE/FOUNDER-DECISIONS-2026-09-24-CURRENT.md`
3. `00-GOVERNANCE/PUBLIC-CANON-SUPERSESSION-2026-09-24.md`
4. `01-BASE/PRODUCT-ARCHITECTURE-V3.md`
5. `01-BASE/DOMAIN-MODEL-V1.md`
6. `01-BASE/EXPERT-WORKFLOW-GRAPH-CONTRACT.md`
7. `01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md`
8. `01-BASE/FULL-PRODUCT-RUN-CONTRACT-V3.md`
9. `02-SOURCE-TRUTH/SOURCE-INDEX.md`
10. `03-REFERENCES/common/`
11. `03-REFERENCES/design-set-c/REFERENCE-RECIPE.md`
12. `04-MEDIA/transport/wave01-C-v2/manifest.json`
13. `07-RESULTS/AUDIT-RUBRIC.md`
14. `01-BASE/MASTER-MISSION-FULL.md` as exhaustive source/implementation appendix
15. this RUN.md

## Media

Download only the assigned public transport pack:
`04-MEDIA/transport/wave01-C-v2/`

Verify manifest count and every SHA-256 before implementation.

Do not browse the whole atlas as a substitute for this pack.

## Architecture

The four-domain architecture and versioned domain model are P0.

The Expert Workflow Graph is required and must have real typed graph semantics, even when provider execution is mocked.

## Design

Use the exact design-set-c reference recipe.

Research/capture the assigned references before major implementation.

Do not substitute a generic AI/SaaS visual style.

## Isolation

- GitHub is read-only.
- Work only in the current sandbox.
- Keep local Git history.
- Do not read sibling run folders for creative direction.
- Never push implementation to the shared lab.

## Output

Export exactly:
`ZAI-E009-AUTHORING-INSTRUMENT-FINAL.zip`

Mandatory evidence includes all files in FULL-PRODUCT-RUN-CONTRACT-V3 plus:
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

## Final status

Use:
- COMPLETE
- COMPLETE_WITH_DEGRADED_SUBSYSTEMS
- INCOMPLETE

COMPLETE is forbidden while any actionable P0 remains.
