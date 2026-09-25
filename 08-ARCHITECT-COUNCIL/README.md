# 08 — Architecture Council Bridge

Purpose: durable architecture handoff between the central architect, GPT-6 Astra in Codex, and later implementation/adversarial reviewers.

This folder does not override current founder decisions or verified source behavior.

## Current state — 2026-09-25

Binding execution plan:
`19-PRE-ASTRA-EXECUTION-PLAN-V2.md`

Astra is NOT launched.

Central work already closed:
- A1 execution substrate;
- A2 creative draft/revision semantics;
- A5 web/API/MCP/provider-secret boundary;
- A6 local-first → server-canonical migration sequence.

Provisional remaining knots:
- K1 model/profile/provider-deployment identity boundary;
- K2 ambiguous paid submission without provider idempotency/lookup.

See:
- `PRE-ASTRA-CENTRAL-DECISIONS-R2.md`
- `PRE-ASTRA-CENTRAL-DECISIONS-R3.md`
- `03-OPEN-ARCHITECTURE-QUESTIONS.md`

## Old Astra packet warning

The existing numbered Astra R001 files 11/12/14/15 are historical PRE-ASTRA DRAFTS and are explicitly marked superseded.

Do NOT launch Astra from them.

A fresh final focus packet, evidence router, precheck and launch prompt will be generated only after:
- Wave v4 transport preparation;
- material P001–P004 evidence or explicit non-blocking decision;
- public-history privacy decision;
- final architecture challenge;
- structural audit PASS;
- semantic/adversarial audit PASS;
- immutable PRE_ASTRA_READY SHA.

## Authority

1. current founder decisions;
2. current public supersession/architecture contracts;
3. verified current private product behavior;
4. verified OS23.6 source;
5. accepted ADR baseline;
6. targeted Astra deltas after final launch.

## Astra role later

GPT-6 Astra / XHIGH is reserved for only the final irreducible decisions.

It does not:
- design UI;
- curate media;
- rank GLM candidates;
- implement product code;
- re-read the entire repository.

## State-update rule

Update this folder when:
- founder intent changes architecture;
- verified source contradicts an assumption;
- pilot/candidate evidence exposes a real architecture failure;
- a central decision is closed;
- Astra resolves or invalidates a hard assumption.

Store decisions, evidence, uncertainty and rationale.
Do not store hidden chain-of-thought.
