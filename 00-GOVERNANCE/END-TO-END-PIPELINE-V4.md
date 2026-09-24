# End-to-End Product Development Pipeline V4

Status: CURRENT OPERATING PIPELINE FOR NEW BROWSER WAVES  
Supersedes older pipeline text where this file is more specific.

## Principle

No stage may silently compensate for a failed earlier stage.

Every stage has:
- inputs;
- outputs;
- checks;
- stop/fallback semantics.

## Stage 0 — authority freeze

Inputs:
- founder decisions;
- public supersession;
- source authority;
- OS23.6 source;
- current behavior contract;
- Architecture/Domain/Expert Graph contracts.

Checks:
- no stale authority links in run spec;
- no inferred founder identity;
- exact source SHA recorded.

Output:
current contract stack.

## Stage 1 — media freeze

Inputs:
- clean local master manifest;
- explicit Wave selection file.

Process:
- build exact A/B/C/D manifests;
- fail on missing group/slot;
- fail on duplicate source;
- fail on forbidden public item;
- enforce 30–45.

Expected:
A39 / B42 / C33 / D36.

## Stage 2 — sanitized transport

Process:
- copy/re-encode only selected derivatives;
- neutral asset IDs;
- strip EXIF/IPTC/XMP;
- video H264 bounded derivative, no metadata/audio;
- no SSD/local source paths;
- deduplicate identical binary source.

Checks:
- per-file SHA;
- <100MB Git gate;
- bundle counts;
- manifest sanitization.

## Stage 3 — visual transport QA

Build contact sheets from the ACTUAL sanitized transport files.

Review every image/video poster for:
- child/privacy rejects;
- unintended other identities;
- visible private identifiers;
- broken/corrupt assets;
- wrong crop/orientation;
- inappropriate reference/input presented as output;
- material that contradicts run role.

A manifest-only PASS is insufficient.

## Stage 4 — contract QA

Run:
- `tools/verify_public_wave.py .`
- `tools/validate_run_contracts.py .`
- `tools/audit_public_lab.py .`

All must PASS.

## Stage 5 — transport commit

Commit ONLY intended public Wave transport + its manifests/evidence.

Do not add:
- local `master-v1` library;
- SSD paths;
- secrets;
- unrelated working files.

Push and re-run all three audits against the committed state.

## Stage 6 — readiness commit

Change only:
- E004–E011/Q001 STATUS → READY;
- freeze/checklist status;
- final factual transport counts/hashes.

Commit/push.

The resulting HEAD is the immutable wave freeze.

No more mutation for that wave.

## Stage 7 — prompt generation

Generate prompts locally:

`python3 tools/generate_launch_prompts.py <FREEZE_SHA> <OUTPUT_DIR>`

Validate:
- all E runs request GLM-5.3;
- Q001 requests Flash;
- every URL contains the same 40-char SHA;
- no `main` URL.

## Stage 8 — parallel launch

Launch:
- E004/E005 A
- E006/E007 B
- E008/E009 C
- E010/E011 D
- Q001 qualification

Every chat:
- unique run ID;
- fresh sandbox;
- GitHub read-only;
- actual model UI label recorded;
- own ZIP.

Do not give mid-run corrections unless the run is genuinely blocked.
Do not modify the frozen input.

## Stage 9 — collection

Save each export with exact run ID.

Never overwrite another candidate.

Record:
- ZIP bytes;
- SHA-256;
- run completion status;
- actual runtime label.

## Stage 10 — forensic audit

Audit source and runtime evidence independently.

Minimum:
- export freshness;
- source reconciliation;
- architecture/domain model;
- full surface breadth;
- guided vs expert graph;
- prompt chain;
- provider truth;
- generation semantics;
- MCP;
- auth/persistence;
- tests/build;
- screenshots;
- responsive;
- EN/RU;
- a11y;
- media/provenance;
- logs/failures.

## Stage 11 — synthesis

Promote concepts/modules, not whole candidates by default.

Create a synthesis matrix:
candidate → strong bounded element → evidence → dependencies → risks → canonical integration candidate.

## Stage 12 — architecture reconciliation

Combine:
- candidate evidence;
- Q001 findings;
- P001–P004 historical evidence;
- Astra R001 A1–A6 decisions.

Any foundational contract change creates Architecture V4 + new run IDs.
Never retroactively redefine an already-frozen run.

## Stage 13 — canonical promotion

Only after explicit founder selection:

public experiment candidate
→ dedicated private canonical branch
→ canonical tests/security/migrations
→ review
→ integration/deployment mission.

No automatic promotion from public lab.
