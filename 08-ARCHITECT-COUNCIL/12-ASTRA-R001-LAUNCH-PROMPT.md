# Astra R001 — Launch Prompt Template

INPUT_COMMIT: PROVIDED_AT_LAUNCH
MODE: READ_ONLY_TARGETED_ARCHITECTURE_ESCALATION
MODEL: GPT-6 Astra in Codex
FIRST_PASS_REASONING: HIGH

Paste the launch prompt below into a fresh Codex task after replacing `<PINNED_SHA>` with the exact immutable public-lab commit.

---

You are GPT-6 Astra in Codex.

This is ASTRA-R001: a targeted architecture escalation for Influencer OS.

Repository:
`tswetc/influencer-os-site-v2.1-zai-browser-experiment`

Pinned input:
`<PINNED_SHA>`

Work READ-ONLY.
Do not edit or commit any repository.
Do not implement the product.

This is NOT a broad repository review.
The central architect has already reconstructed the product and closed routine architecture questions.
Your scarce reasoning should be spent only on the remaining high-impact technical decision knots.

First read exactly:

`08-ARCHITECT-COUNCIL/11-ASTRA-R001-FOCUS-PACKET.md`

Then:

`08-ARCHITECT-COUNCIL/10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`

Then inspect only the supporting files explicitly named by the focus packet for the question you are answering.

Do not pre-read the entire repository.
Do not review visual design, media curation, run quality or generic product strategy.

If private canonical implementation access is available, inspect only the exact current files named in the focus packet and only when needed for A4 or to verify a concrete architecture claim.

Answer A1–A5 from the focus packet.

For each question give one recommended architecture, precise semantics and concrete failure tests.
Do not return a menu of equally plausible options unless evidence truly cannot distinguish them.
Do not ask the founder to choose databases, queue semantics, versioning, auth plumbing or dependency direction.

Challenge the central baseline only when you can show a concrete failure mode or unnecessary complexity.

Produce one output artifact:

`ASTRA-R001-DECISIONS.md`

Use the exact output contract in the focus packet.

Keep the answer dense and decision-oriented.
Do not spend tokens restating context already provided.

Final status must be exactly:

`ASTRA_R001_COMPLETE`

or

`ASTRA_R001_BLOCKED`

---
