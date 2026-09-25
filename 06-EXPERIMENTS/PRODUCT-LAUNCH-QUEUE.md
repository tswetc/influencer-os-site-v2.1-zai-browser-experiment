# Product Launch Queue — Pre-Astra

Date: 2026-09-25
Status: OFFICIAL_E_WAVE_PAUSED_PRE_ASTRA

## Existing runs

- ZAI-M001 — media curation — COMPLETE / centrally audited.
- ZAI-P001 — GLM-5.2 — integration pilot A — running/historical evidence.
- ZAI-P002 — GLM-5.3-Flash — integration pilot A — running/historical evidence.
- ZAI-P003 — GLM-5.3 — integration pilot B — running/historical evidence.
- ZAI-P004 — GLM-5.3 — integration pilot B — running/historical evidence.

Do not restart or mutate P001–P004.
Ingest them as evidence when complete.

## Official full product-quality wave

E004–E011 are NOT launchable yet.

Current status for all:
`PAUSED_PRE_ASTRA`

Launch gate:
`POST_ASTRA_ARCHITECTURE_V4_FREEZE`

| Run | Design | Future Wave v4 pack | Current status |
|---|---|---|---|
| ZAI-E004 | A | wave01-A-public-v4 | PAUSED_PRE_ASTRA |
| ZAI-E005 | A | wave01-A-public-v4 | PAUSED_PRE_ASTRA |
| ZAI-E006 | B | wave01-B-public-v4 | PAUSED_PRE_ASTRA |
| ZAI-E007 | B | wave01-B-public-v4 | PAUSED_PRE_ASTRA |
| ZAI-E008 | C | wave01-C-public-v4 | PAUSED_PRE_ASTRA |
| ZAI-E009 | C | wave01-C-public-v4 | PAUSED_PRE_ASTRA |
| ZAI-E010 | D | wave01-D-public-v4 | PAUSED_PRE_ASTRA |
| ZAI-E011 | D | wave01-D-public-v4 | PAUSED_PRE_ASTRA |

Preferred future runtime:
GLM-5.3.

Fallback:
GLM-5.3-Flash.

Actual runtime label must always be recorded.

## ZAI-Q001

Current status:
`PAUSED_PRE_ASTRA`

It will qualify the SAME future post-Astra freeze.
It is disposable and not a product candidate.

## Required sequence before any E/Q launch

1. finish Pre-Astra Execution Plan V2;
2. finish Wave v4 sanitized transport + visual QA;
3. ingest material P001–P004 evidence;
4. pass structural + semantic pre-Astra audits;
5. freeze immutable Astra SHA;
6. run Astra R001;
7. reconcile accepted decisions into Architecture V4;
8. update E/Q run contracts to Architecture V4;
9. validate all run contracts;
10. create one immutable official E/Q freeze SHA;
11. generate commit-pinned prompts;
12. launch isolated chats.

## Isolation

Every eventual run:
- unique run ID;
- fresh Chat.Z.AI chat;
- isolated sandbox;
- GitHub read-only;
- unique export;
- no sibling-run implementation import.

## Freeze rule

Never launch from:
- `main`;
- `latest`;
- an unpinned raw URL.

Every eventual launch prompt carries the same exact 40-character Architecture V4 + media freeze SHA.
