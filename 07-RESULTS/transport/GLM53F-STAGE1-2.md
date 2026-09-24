# GLM-5.3-Flash Transport Result — Stages 1–2

Recorded: 2026-09-24

## Stage 1 — small raw file

Status: `TRANSPORT_PASS`

- HTTP: 200
- bytes: 193
- SHA-256: `7ce8b83d28959b7d6c6bb7160b22360bf72068a1ca97b699286e483683342cac`
- saved to sandbox and read back
- second download byte-identical

## Stage 2 — 455 KB large Markdown

Status: `TRANSPORT_LARGE_PASS`

- HTTP: 200
- bytes: 455038
- SHA-256: `f1b65035b784242495dc1328c427edddb31452ea0cccc68df6c897cd2d747596`
- 5002 lines
- LINE_02500 verified
- LINE_05000 verified
- saved to sandbox and independently read back
- second download byte-identical

Conclusion: public raw GitHub → Chat.Z.AI sandbox transport is proven for small text and 455 KB text in this GLM-5.3-Flash run.
