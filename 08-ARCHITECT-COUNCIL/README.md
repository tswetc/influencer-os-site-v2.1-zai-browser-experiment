# 08 — Architecture Council Bridge

Purpose: durable architecture handoff between the central architect, later GPT-6 Astra review, and implementation/adversarial reviewers.

This folder does not override current founder decisions or verified source behavior.

## Current state — 2026-09-25

Binding operational workboard:
`21-PRE-ASTRA-WORKBOARD.md`

Astra is NOT launched.

Central architecture is currently closed for the BYOK-first milestone:
- A1 execution substrate;
- A2 creative draft/revision semantics;
- A3/K1 model/profile/provider-route lifecycle;
- A4/K2 paid generation ambiguity + submission-safety gate;
- A5 web/API/MCP/provider-secret boundary;
- A6 local-first → server-canonical migration.

Current task is verification/evidence preparation, not more greenfield architecture.

## Important files

- `01-ARCHITECT-STATE.md` — current state;
- `03-OPEN-ARCHITECTURE-QUESTIONS.md` — now records zero unresolved core knots + challenge surfaces;
- `04-DECISION-REGISTER.md` — ADR register;
- `10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md` — baseline;
- `PRE-ASTRA-SOURCE-BEHAVIOR-MATRIX.md` — verified source/current behavior;
- `PRE-ASTRA-CENTRAL-DECISIONS-R2.md` — execution/revision decisions;
- `PRE-ASTRA-CENTRAL-DECISIONS-R3.md` — auth/migration/generation baseline;
- `K1-MODEL-ROUTE-DECISION.md` — model/provider routing;
- `K2-BILLING-SAFETY-DECISION.md` — current billing/submission safety decision;
- `21-PRE-ASTRA-WORKBOARD.md` — active checklist.

## Old Astra packet warning

Numbered Astra R001 draft files 11/12/14/15 are historical PRE-ASTRA drafts.
Do NOT launch Astra from them.

A fresh final packet is generated only after:
- Wave v4 transport preparation;
- material P001–P004 evidence or explicit non-blocking determination;
- active-document reconciliation;
- synthesis/evidence router;
- structural audit PASS;
- semantic/adversarial audit PASS;
- immutable PRE_ASTRA_READY SHA.

## Astra role later

GPT-6 Astra / XHIGH is reserved for targeted adversarial architecture review.

It does not:
- design UI;
- curate media;
- rank GLM candidates;
- implement product code;
- re-read the entire repository.

It should attack the accepted baseline and propose changes only where a concrete failure is demonstrated.

## State-update rule

Update this folder when:
- founder intent changes architecture;
- verified source contradicts an assumption;
- pilot/candidate evidence exposes a real architecture failure;
- a central decision changes;
- Astra later finds a material counterexample.

Store decisions, evidence, uncertainty and rationale.
Do not store hidden chain-of-thought.