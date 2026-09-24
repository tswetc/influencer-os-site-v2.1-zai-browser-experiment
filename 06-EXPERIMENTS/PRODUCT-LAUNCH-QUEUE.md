# Product Launch Queue — Wave v4

## Existing runs

- ZAI-M001 — media curation — COMPLETE / centrally audited.
- ZAI-P001 — GLM-5.2 — integration pilot A — running/historical evidence.
- ZAI-P002 — GLM-5.3-Flash — integration pilot A — running/historical evidence.
- ZAI-P003 — GLM-5.3 — integration pilot B — running/historical evidence.
- ZAI-P004 — GLM-5.3 — integration pilot B — running/historical evidence.

Do not restart P001–P004 merely because the next wave is prepared.

## Full product-quality wave

All E runs are PRODUCT_QUALITY.

Preferred runtime for every E run:
`GLM-5.3`

Fallback:
`GLM-5.3-Flash`

If GLM-5.3 capacity is available, use it even for the second run in a design pair. Two same-model runs then provide repeatability/variance evidence.

| Run | Design | Full-quality pack | Status before transport push |
|---|---|---|---|
| ZAI-E004 | A | wave01-A-public-v4 | WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE |
| ZAI-E005 | A | wave01-A-public-v4 | WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE |
| ZAI-E006 | B | wave01-B-public-v4 | WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE |
| ZAI-E007 | B | wave01-B-public-v4 | WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE |
| ZAI-E008 | C | wave01-C-public-v4 | WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE |
| ZAI-E009 | C | wave01-C-public-v4 | WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE |
| ZAI-E010 | D | wave01-D-public-v4 | WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE |
| ZAI-E011 | D | wave01-D-public-v4 | WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE |

## Disposable qualification

ZAI-Q001:
- uses the SAME final freeze;
- uses Wave v4 C;
- GLM-5.3-Flash preferred for throughput;
- runs in parallel;
- diagnoses shared pipeline/architecture failures;
- is not a product candidate.

## Launch capacity priority

If GLM-5.3 slots are scarce:
1. E008 — deepest authoring/workflow stress test;
2. E004 — controlled graphic/public-product stress test;
3. E006 — photographic/cinematic stress test;
4. E010 — spatial/continuity stress test;
5. second runs in each design pair;
6. Q001 can use Flash.

If capacity permits, launch E004–E011 + Q001 independently.

## Isolation

Every run:
- unique ID;
- fresh Chat.Z.AI chat;
- own sandbox/local Git;
- GitHub read-only;
- unique final ZIP;
- no sibling-run implementation or creative-direction reading.

## Freeze rule

Every launch prompt carries the same exact full 40-character freeze SHA.

Never use:
- `main`;
- `latest`;
- an unpinned raw URL.

The actual runtime label is evidence and must be recorded in the run manifest.
