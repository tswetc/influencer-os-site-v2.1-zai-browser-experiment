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
- clean local master rebuild reported: 156 files / 0 errors;
- G0027/s01 additionally excluded from public transport because the image itself exposes an identity card;
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

P003/P004 provide same-model repeatability evidence. P001/P002 provide historical cross-runtime evidence on provisional atlas-derived inputs.

## Full product-development wave

E004–E011 are prepared for Architecture V3 but are currently:

`WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE`

All are PRODUCT_QUALITY runs.

Preferred runtime:
`GLM-5.3`

Fallback:
`GLM-5.3-Flash`

Design pairing:
- E004 / E005 — A
- E006 / E007 — B
- E008 / E009 — C
- E010 / E011 — D

The older `wave01-*-public-v3` atlas-preview manifests are DEPRECATED for this official full-product wave because they provide preview crops/posters rather than full-quality web derivatives.

## Disposable qualification

ZAI-Q001 is prepared and will use the SAME Wave v4 freeze.

It runs in parallel with the product-quality wave and diagnoses shared-input / transport / architecture failures.

## Next operational action

1. pull current lab;
2. rebuild bounded local v2 manifests from the clean master-v1 library;
3. build one deduplicated sanitized Wave v4 transport bundle;
4. verify pack counts, hashes, metadata/path/identity sanitization;
5. commit/push Wave v4 transport;
6. update E004–E011 + Q001 statuses to READY;
7. run final public-lab audit;
8. record the resulting immutable freeze SHA;
9. generate commit-pinned launch prompts;
10. launch E004–E011 + Q001 in fresh chats.
