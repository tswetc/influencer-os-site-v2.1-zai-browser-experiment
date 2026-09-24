# End-to-End Product Lab Pipeline V3

Status: CURRENT OPERATING PIPELINE

The goal is to maximize product quality while making shared-input failures detectable and recoverable.

## State 0 — Founder decisions

Inputs:
- product intent;
- identity/publication decisions;
- topology decisions;
- model preference.

Output:
- one dated founder-decision contract.

Gate:
no older document silently overrides an explicit current founder decision.

## State 1 — Source reconciliation

Inputs:
- private canonical product audit;
- verified release artifact;
- public source core.

Outputs:
- current behavior contract;
- source index/hashes;
- extension labels.

Gate:
an omitted private file is never interpreted as nonexistent behavior.

## State 2 — Media curation

Inputs:
- immutable SSD originals;
- visual atlas;
- rights/provenance decisions.

Outputs:
- normalized unique selection;
- hard holds;
- local master derivatives.

Gate:
clean rebuild; zero stale files; exact manifest-to-filesystem match.

## State 3 — Run-pack curation

Input:
local master library.

Output:
30–45 item A/B/C/D manifests.

Gate:
- coherent families;
- item count in bounds;
- no hard-held item;
- no “available == selected” shortcut.

## State 4 — Public transport build

Input:
bounded run manifest.

Output:
sanitized HTTP-fetchable media:
- neutral filenames;
- stripped metadata;
- no SSD path;
- no real-world founder identity;
- SHA-256 manifest.

Gate:
`tools/verify_public_wave.py` passes.

## State 5 — Launch freeze

Freeze exactly:
- governance/current founder decisions;
- architecture/domain contracts;
- source behavior/core;
- design recipes;
- media transport;
- QA/export requirements;
- run specs.

Rules:
- one immutable commit SHA;
- no “latest” references;
- all matched runs use identical bytes.

## State 6 — Qualification + product runs

Q001:
- pipeline/integration qualification;
- disposable;
- same freeze.

E runs:
- independent full product builds;
- strongest available model for product-quality lane.

Do not let Q001 become a hidden blocker after E runs have launched. Its findings are shared-input evidence for later interpretation.

## State 7 — Collection

For every completed run:
- download unique ZIP;
- preserve original filename;
- calculate SHA-256;
- record runtime UI label;
- save final self-report separately from artifact.

Never rename several outputs to `final.zip`.

## State 8 — Forensic audit

Audit the actual artifact, not the final message.

Order:
1. export integrity;
2. source/worklog chronology;
3. architecture/domain conformance;
4. P0 journey runtime;
5. provider/persistence/MCP truth;
6. expert graph semantics;
7. tests;
8. media/provenance;
9. visual/reference fidelity;
10. responsive/EN-RU/a11y;
11. export freshness.

Classify every defect:
- shared-input defect;
- environment/harness defect;
- model/run execution defect;
- design choice;
- missing evidence.

## State 9 — Cross-run synthesis

Do not merge code blindly.

Extract:
- strongest public art direction;
- strongest Creator App architecture;
- strongest Prompt Lab;
- strongest expert workflow graph;
- strongest lineage/history;
- strongest MCP/core design;
- strongest responsive/mobile system.

Then design one synthesis architecture before implementation.

## State 10 — Canonical promotion

Promotion is a separate mission.

Requirements:
- selected architecture;
- private canonical source available;
- migration plan;
- security review;
- rights/publication review;
- production persistence/auth;
- deployment/observability;
- regression suite.

The public browser lab is not production automatically.

## Stop conditions

Stop a stage instead of improvising when:
- hash mismatch;
- source ambiguity changes product meaning;
- media identity/privacy hold violated;
- secrets detected;
- export stale;
- P0 regression introduced.

Recover by fixing the stage and producing a new freeze, not by patching running sandboxes inconsistently.
