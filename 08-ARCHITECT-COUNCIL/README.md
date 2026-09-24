# 08 — Architecture Council Bridge

Purpose: durable architectural handoff between the central ChatGPT architect, GPT-6 Astra in Codex, and later implementation/review agents.

This folder is NOT a replacement for product truth or founder decisions.

Authority:
1. founder product decisions;
2. current public project memory / governance;
3. verified source behavior;
4. accepted architecture ADRs;
5. targeted architecture escalations;
6. later reviewer recommendations.

## Current operating model — 2026-09-25

GPT-6 Astra is NOT being used here as a broad independent reviewer.

Astra is the scarce, highest-capability architecture escalation path for the few technical decisions that remain genuinely difficult after the central architect has already reduced the problem.

Do not spend Astra context on:
- rereading the entire repository;
- visual design review;
- media curation;
- feature ideation;
- OS23.6 count verification already encoded in contracts;
- broad generic SaaS advice;
- restating accepted product intent.

The central architect owns routine synthesis, context maintenance and solvable architecture decisions.
Astra is reserved for high-impact decision knots where a wrong answer could cause a conceptual rewrite, inconsistent execution semantics, security failure or irreversible migration cost.

## Astra R001 read order

For the targeted Astra escalation:

1. `11-ASTRA-R001-FOCUS-PACKET.md`
2. `10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`
3. `03-OPEN-ARCHITECTURE-QUESTIONS.md`
4. only the specific supporting files named under the question being answered.

Do NOT pre-read the whole repository.

Conditional supporting files:
- topology/domain: `../01-BASE/PRODUCT-ARCHITECTURE-V3.md`, `../01-BASE/DOMAIN-MODEL-V1.md`
- workflow: `../01-BASE/EXPERT-WORKFLOW-GRAPH-CONTRACT.md`
- migration/current behavior: `../01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md`
- source mechanics only when a proposed decision would change inherited semantics: `../02-SOURCE-TRUTH/SOURCE-INDEX.md`

For implementation evidence, inspect only the exact private canonical files listed in the focus packet when they are available to Codex.

## Other reviewers

A lower-cost independent reviewer may be run later for adversarial verification.
That reviewer is separate from Astra R001 and should test the accepted decisions rather than repeat the same expensive architecture work.

## State-update rule

The central architect updates this folder when:
- a major architecture decision changes;
- a blocker appears;
- Astra resolves or invalidates a hard architecture assumption;
- candidate evidence disproves an assumption.

This folder stores explicit decisions, evidence, uncertainties and rationale.
It does not store hidden chain-of-thought.
