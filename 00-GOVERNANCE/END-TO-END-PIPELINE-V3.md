# End-to-End Product Lab Pipeline V3

Status: CURRENT OPERATING PIPELINE

The objective is high product quality with explicit failure attribution, reproducible inputs and no silent state drift.

## State 0 — Founder decision contract

Inputs:
product intent · identity/publication decisions · topology decisions · model preference.

Output:
one dated current founder-decision contract.

Gate:
older/private/stale context cannot silently override an explicit current founder decision.

## State 1 — Source reconciliation

Inputs:
verified private canonical-product audit · verified release artifact · public source core.

Outputs:
current behavior contract · source hashes · extension labels.

Gate:
omitted private code is never interpreted as nonexistent behavior.

## State 2 — Media curation / local master

Inputs:
immutable SSD originals · review atlas · rights/provenance decisions.

Outputs:
normalized unique selection · hard holds · local web-ready master derivatives.

Gate:
clean staging rebuild · exact filesystem/manifest match · no rejected child/other-identity media.

## State 3 — Run-pack curation

Input:
local master manifest.

Output:
bounded A/B/C/D selections, target 30–45 items/design.

Gate:
coherent families · meaningful role coverage · video where required · no hard hold · no visible-identity-card frame · no “available == selected” shortcut.

## State 4 — Full-quality public browser transport

Input:
bounded local v2 manifests + local web-ready master derivatives.

Output:
one deduplicated Wave v4 bundle:

```text
04-MEDIA/transport/wave01-v4/
  assets/
  packs/A.json
  packs/B.json
  packs/C.json
  packs/D.json
  BUNDLE-MANIFEST.json
```

Transport requirements:
- neutral asset IDs and filenames;
- image metadata stripped;
- video metadata/audio stripped;
- bounded video transcode;
- no SSD/source paths in public manifests;
- exact SHA-256;
- <100MB/file GitHub guard;
- commit-pinned downloader.

The old atlas-preview v3 transport is pilot/deprecated and is NOT official Wave media.

## State 5 — Launch freeze

Freeze:
current founder decisions · architecture/domain contracts · current behavior/source core · design recipes · Wave v4 transport · QA/export requirements · E/Q run specs.

Rules:
- one immutable full commit SHA;
- no `latest` inputs;
- no self-referential SHA inside the freeze;
- launch prompt supplies the freeze SHA;
- after freeze, no changes to that input for the wave.

## State 6 — Parallel execution

Q001:
disposable pipeline qualification from the same freeze.

E004–E011:
independent full PRODUCT_QUALITY runs.
Prefer GLM-5.3; record actual runtime.

Q001 may reveal shared-input defects after E runs have started. That is acceptable: classify and use the finding during audit rather than patching running sandboxes inconsistently.

## State 7 — Collection

Per run:
preserve exact ZIP filename · calculate SHA-256 · record actual runtime UI label · preserve final self-report separately.

Never rename multiple artifacts to `final.zip`.

## State 8 — Forensic audit

Audit actual artifact, not self-report.

Order:
1. export integrity/freshness;
2. source/worklog chronology;
3. Architecture V3/domain conformance;
4. P0 journeys;
5. Job/Attempt and AssetVersion/Lineage semantics;
6. provider/persistence/security truth;
7. Expert Workflow Graph semantics;
8. MCP/core parity;
9. automated tests;
10. media/provenance;
11. reference/design fidelity;
12. responsive/EN-RU/a11y.

Classify every finding:
`SHARED_INPUT` · `HARNESS_ENVIRONMENT` · `RUN_EXECUTION` · `DESIGN_DECISION` · `MISSING_EVIDENCE`.

## State 9 — Cross-run synthesis

Do not merge code blindly.

Extract strongest:
public art direction · Creator App architecture · Prompt Lab · expert graph · lineage/history · MCP/core design · responsive/mobile system.

Write one synthesis architecture before implementation.

## State 10 — Canonical promotion

Separate private mission.

Requires:
private canonical source · deliberate migration · security review · rights/publication review · production persistence/auth · deployment/observability · regression suite.

The public lab is never automatically production.
