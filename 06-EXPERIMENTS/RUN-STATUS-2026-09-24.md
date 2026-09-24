# Active Run Status — 2026-09-24

Operational tracking only.
Already-running chats remain pinned to the immutable inputs they started with.

## ZAI-M001

TYPE: MEDIA_CURATION
RUNTIME: GLM-5.3-Flash
STATUS: COMPLETE_AND_CENTRALLY_AUDITED

Verified current interpretation:
- 200/200 atlas groups reviewed;
- 161 selection rows / 160 unique source paths;
- founder real-world identity inference retired; neutral public ID = `founder-main-01`;
- founder decisions applied;
- current normalized local-materialization state: 156 allowed / 4 held;
- full local library is NOT a run pack.

## Existing pilots

### ZAI-P001
Runtime: GLM-5.2
Status: RUNNING / historical integration pilot
Design: A

### ZAI-P002
Runtime: GLM-5.3-Flash
Status: RUNNING / historical integration pilot
Design: A

### ZAI-P003
Actual launch label: GLM-5.3
Status: RUNNING / historical integration pilot
Design: B
MODEL_OVERRIDE_AT_LAUNCH: YES

### ZAI-P004
Actual launch label: GLM-5.3
Status: RUNNING / historical integration pilot
Design: B
MODEL_OVERRIDE_AT_LAUNCH: YES

## Full product-development wave

All runs are READY_FOR_FREEZE_LAUNCH:

- E004 — GLM-5.3 — A — PRODUCT_QUALITY
- E005 — GLM-5.3-Flash — A — MODEL_COMPARISON
- E006 — GLM-5.3 — B — PRODUCT_QUALITY
- E007 — GLM-5.3-Flash — B — MODEL_COMPARISON
- E008 — GLM-5.3 — C — PRODUCT_QUALITY
- E009 — GLM-5.3-Flash — C — MODEL_COMPARISON
- E010 — GLM-5.3 — D — PRODUCT_QUALITY
- E011 — GLM-5.3-Flash — D — MODEL_COMPARISON

Assigned bounded media:
- A: 39 items
- B: 42 items
- C: 37 items
- D: 36 items

## Architecture

Current browser-lab architecture:
Public/Product Experience · Creator App · OS Core/API/Generation Services · MCP/Agent Surface
over one shared domain model.

Guided/direct Studios + Expert Workflow Graph are both required.

## Next operational action

1. run current public-wave verification;
2. create one final freeze marker commit;
3. record its exact SHA;
4. make no further changes to that frozen input;
5. launch E004–E011 using that exact SHA.
