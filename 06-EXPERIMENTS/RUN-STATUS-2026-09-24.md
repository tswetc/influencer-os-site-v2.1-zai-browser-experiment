# Active Run Status — 2026-09-24

This file is operational tracking only. Running chats remain pinned to their original immutable input commits.

## ZAI-M001

TYPE: MEDIA_CURATION  
RUNTIME: GLM-5.3-Flash  
STATUS: CURATION_DATA_INTEGRITY_PASS_WITH_RIGHTS_HOLDS  
REPORTED_FINAL_STATUS: MEDIA_CURATION_COMPLETE_WITH_RIGHTS_REVIEW

Founder-reported summary:
- all 200 atlas groups reviewed visually;
- 978 slots covered;
- MASTER-SELECTION.json: 161 items;
- 150 images;
- 11 videos;
- 52 families;
- rights/privacy/trademark review produced.

Central artifact audit completed.

Verified:
- 161 source selection rows;
- 160 unique source paths after merging one duplicate;
- 161/161 atlas slot/path references resolve;
- GROUP 0001–0200 coverage table present;
- 149 unique items allowed for LOCAL materialization by conservative lab policy;
- 11 items held from local materialization for child/privacy, third-party identity, trademark/brand, or published-editorial review;
- public_use_allowed remains false for every normalized item until founder confirmation.

## ZAI-P001

TYPE: FULL_SYSTEM_INTEGRATION_PILOT  
RUNTIME_UI_LABEL: GLM-5.2  
STATUS: RUNNING  
DESIGN: design-set-a

## ZAI-P002

TYPE: FULL_SYSTEM_INTEGRATION_PILOT  
RUNTIME_UI_LABEL: GLM-5.3-Flash  
STATUS: RUNNING  
DESIGN: design-set-a

## ZAI-P003

TYPE: FULL_SYSTEM_INTEGRATION_PILOT  
PLANNED_RUNTIME_IN_PINNED_RUN: GLM-5.2  
RUNTIME_UI_LABEL_AT_LAUNCH: GLM-5.3  
STATUS: RUNNING  
DESIGN: design-set-b  
MODEL_OVERRIDE_AT_LAUNCH: YES

Interpretation:
same-model replication partner with P004, not a clean P003-vs-P004 model comparison.

## ZAI-P004

TYPE: FULL_SYSTEM_INTEGRATION_PILOT  
PLANNED_RUNTIME_IN_PINNED_RUN: GLM-5.3-Flash  
RUNTIME_UI_LABEL_AT_LAUNCH: GLM-5.3  
STATUS: RUNNING  
DESIGN: design-set-b  
MODEL_OVERRIDE_AT_LAUNCH: YES

Interpretation:
same-model replication partner with P003, not a clean P003-vs-P004 model comparison.

## Next gate

1. ingest and audit ZAI-M001 artifacts;
2. rights/identity/provenance gate;
3. materialize approved SSD originals to web-ready media;
4. generate run media packs;
5. create immutable LAUNCH-FREEZE commit;
6. release official product candidate wave.
