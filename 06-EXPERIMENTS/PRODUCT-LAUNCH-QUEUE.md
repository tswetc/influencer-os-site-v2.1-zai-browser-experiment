# Product Launch Queue — Frozen Full Product Wave

## Existing runs

- ZAI-M001 — media curation — COMPLETE / centrally audited.
- ZAI-P001 — GLM-5.2 — integration pilot A — historical/running evidence.
- ZAI-P002 — GLM-5.3-Flash — integration pilot A — historical/running evidence.
- ZAI-P003 — GLM-5.3 — integration pilot B — model override at launch.
- ZAI-P004 — GLM-5.3 — integration pilot B — model override at launch.

Do not restart P001–P004 merely because the full wave is ready.

## Full product-development wave

All eight runs consume the SAME immutable freeze commit.
Within each design pair, source/product/reference/media bytes are identical.

| Run | Expected model | Lane | Design set | Media pack |
|---|---|---|---|---|
| ZAI-E004 | GLM-5.3 | PRODUCT_QUALITY | A | wave01-A-public-v3 |
| ZAI-E005 | GLM-5.3-Flash | MODEL_COMPARISON | A | wave01-A-public-v3 |
| ZAI-E006 | GLM-5.3 | PRODUCT_QUALITY | B | wave01-B-public-v3 |
| ZAI-E007 | GLM-5.3-Flash | MODEL_COMPARISON | B | wave01-B-public-v3 |
| ZAI-E008 | GLM-5.3 | PRODUCT_QUALITY | C | wave01-C-public-v3 |
| ZAI-E009 | GLM-5.3-Flash | MODEL_COMPARISON | C | wave01-C-public-v3 |
| ZAI-E010 | GLM-5.3 | PRODUCT_QUALITY | D | wave01-D-public-v3 |
| ZAI-E011 | GLM-5.3-Flash | MODEL_COMPARISON | D | wave01-D-public-v3 |

If the actual UI runtime differs from the expected model:
- continue the product mission;
- record `MODEL_OVERRIDE_AT_LAUNCH`;
- do NOT interpret that pair as a clean model comparison.

## Suggested launch priority when GLM-5.3 capacity is scarce

1. E008 — strongest architecture/workflow stress test.
2. E004 — strongest public/product art-direction stress test.
3. E006 — strongest media-first/cinematic stress test.
4. E010 — strongest spatial/gallery interaction stress test.
5. Flash partners E009 / E005 / E007 / E011.

If capacity permits, launch all eight independently.

## Isolation

Every run:
- unique run ID;
- fresh Chat.Z.AI chat;
- own sandbox and local Git;
- GitHub read-only;
- unique final ZIP;
- no sibling-run creative-direction reading.

## Freeze rule

Launch messages must carry ONE exact 40-char INPUT COMMIT.

Never use `main`, `latest`, or an unpinned raw URL as a substitute.
