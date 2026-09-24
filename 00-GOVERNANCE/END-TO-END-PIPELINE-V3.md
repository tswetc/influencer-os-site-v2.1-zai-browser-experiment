# End-to-End Product Lab Pipeline V3

Status: CURRENT OPERATING PIPELINE

## State 0 — Founder decisions

Inputs:
- product intent;
- identity/publication decisions;
- topology decisions;
- model preference.

Output:
one dated founder-decision contract.

Gate:
no older document silently overrides explicit current founder decisions.

## State 1 — Source reconciliation

Inputs:
- verified canonical-product audit;
- verified release artifact;
- public source core.

Outputs:
- current behavior contract;
- source index/hashes;
- extension labels.

Gate:
omitted private code is never interpreted as nonexistent behavior.

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
no child/privacy/selected-other-identity violation;
clean local rebuild when master derivatives are used.

## State 3 — Run-pack curation

Output:
bounded A/B/C/D selections, approximately 30–45 items.

Gate:
- coherent families;
- selection is deliberately smaller than available library;
- no hard-held item;
- neutral identity mapping.

## State 4 — Browser transport

Two valid transport modes exist.

### Mode A — commit-pinned atlas derivative pack
Used by the current E004–E011 browser wave.

Pack contains:
- neutral asset ID;
- atlas sheet path;
- Git blob SHA;
- slot;
- role/family/provenance;
- NO SSD source path.

Agent downloads only required commit-pinned sheets and extracts crops with:
`tools/fetch_public_atlas_pack.py`.

Truth label:
`ATLAS_PREVIEW_DERIVATIVE`.

### Mode B — sanitized master derivative pack
Preferred for later high-resolution/publication-oriented waves.

Pack contains:
- neutral filenames;
- stripped metadata;
- SHA-256;
- no private source paths.

Gate:
never silently describe Mode A as original-resolution publication media.

## State 5 — Launch freeze

Freeze:
- project memory/current founder decisions;
- architecture/domain contracts;
- current product behavior/source core;
- design recipes;
- bounded media packs;
- QA/export requirements;
- run specs.

Rules:
- one immutable commit SHA;
- no `latest` references;
- every launch message pins raw URLs to that SHA.

## State 6 — Independent full product runs

Each run:
- fresh chat;
- unique ID;
- own sandbox/local Git;
- GitHub read-only;
- own export.

No cross-run implementation sharing.

## State 7 — Collection

For every run:
- preserve unique ZIP filename;
- calculate SHA-256;
- record actual runtime UI label;
- preserve final message separately from artifact.

## State 8 — Forensic audit

Audit the actual artifact, not the self-report.

Order:
1. export integrity;
2. source/worklog chronology;
3. architecture/domain conformance;
4. P0 journey runtime;
5. provider/persistence/MCP truth;
6. workflow graph semantics;
7. tests;
8. media/provenance;
9. visual/reference fidelity;
10. responsive/EN-RU/a11y;
11. export freshness.

Classify findings as:
shared-input defect · environment/harness defect · model/run execution defect · design choice · missing evidence.

## State 9 — Cross-run synthesis

Do not merge code blindly.

Extract the strongest:
- public art direction;
- Creator App architecture;
- Prompt Lab;
- expert workflow graph;
- lineage/history;
- MCP/core design;
- responsive/mobile system.

Then design a synthesis architecture.

## State 10 — Canonical promotion

Separate mission.

Requires:
private canonical source · migration plan · security review · rights/publication review · production persistence/auth · deployment/observability · regression suite.

The public browser lab is not production automatically.
