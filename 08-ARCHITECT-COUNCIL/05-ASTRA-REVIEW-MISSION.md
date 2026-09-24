# GPT-6 Astra R001 — Targeted Architecture Escalation

Status: CURRENT
Supersedes: the earlier broad independent-review framing for Astra R001.

ROLE:
highest-capability technical architecture escalation inside Codex.

MODE:
READ_ONLY.

Astra is not being asked to redo the central architect's work.
A lower-cost independent reviewer may be used later for verification.

## Mission

Resolve only the five hard architecture decisions in:
`11-ASTRA-R001-FOCUS-PACKET.md`.

Do not implement.
Do not edit repositories.
Do not redesign product intent.
Do not review visual design.
Do not review media.
Do not produce a generic SaaS architecture report.

## Read order

1. `11-ASTRA-R001-FOCUS-PACKET.md`
2. `10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`
3. `03-OPEN-ARCHITECTURE-QUESTIONS.md`
4. only supporting files explicitly relevant to A1–A5.

Progressive disclosure is mandatory.
Do not crawl the entire repository before answering.

## Reasoning setting

Recommended first pass:
GPT-6 Astra · HIGH reasoning.

Rationale:
this is high-value architecture/debugging/planning work, but the task has already been compressed to five decision knots.

Do not default to MAX merely because it exists.

If one specific question remains materially uncertain after R001, run a separate narrow follow-up on that question at XHIGH.
Use MAX only if a representative retry shows XHIGH still fails to resolve the issue and the decision is important enough to justify the extra usage.

## Deliverable

Produce one file only:

`ASTRA-R001-DECISIONS.md`

Use the output contract inside the focus packet.

The useful result is:
- a hard decision;
- exact semantics;
- failure cases;
- exact delta to the current baseline.

The useful result is NOT:
- a long restatement of context;
- a score;
- a list of fashionable technologies;
- a menu with no choice.

## Completion

Final status exactly:

`ASTRA_R001_COMPLETE`

or

`ASTRA_R001_BLOCKED`
