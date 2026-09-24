# 08 — Architecture Council Bridge

Purpose: durable architecture handoff between the central ChatGPT architect, GPT-6 Astra in Codex, and later lower-cost implementation/adversarial reviewers.

This folder is NOT product truth and does not override founder decisions or verified source behavior.

Authority:
1. founder product intent/decisions;
2. verified current source behavior;
3. accepted ADR baseline;
4. targeted Astra deltas;
5. later implementation evidence.

## Current operating model — 2026-09-25

The central architect owns:
- full context reconstruction;
- routine architecture;
- state maintenance;
- experiment synthesis;
- ADR ownership.

GPT-6 Astra is reserved for six fundamental decision knots where a wrong answer could force a conceptual rewrite, corrupt execution/provenance, expose secrets or make migration fail.

Astra does NOT broadly review:
- design;
- media;
- GLM candidates;
- marketing;
- source counts;
- the whole repository.

## Astra R001 read order

1. `11-ASTRA-R001-FOCUS-PACKET.md`
2. `10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`
3. `13-FOUNDER-ARCHITECTURE-GAP-MAP.md`
4. `14-ASTRA-R001-EVIDENCE-MAP.md`

Then read only evidence required by A1–A6.

## Six hard knots

A1 — one execution substrate across Studios / Workflow / API / MCP

A2 — creative draft/revision/pinning/staleness/rebase semantics

A3 — dynamic model/provider/adapter + research/eval/promotion lifecycle

A4 — durable paid generation transaction/queue/failure/cost semantics

A5 — web/API/MCP principal + BYOK/managed secret boundary

A6 — reversible migration from the current local-first Web App

## Reasoning

Recommended first pass:
GPT-6 Astra · XHIGH.

Use MAX only as a narrow follow-up if one material decision remains unresolved after XHIGH.

## State-update rule

The central architect updates this folder when:
- founder intent changes architecture;
- verified source contradicts an assumption;
- a browser candidate exposes a real architecture failure;
- Astra resolves or invalidates a hard assumption;
- implementation evidence changes feasibility.

Store explicit decisions/evidence/uncertainty/rationale.
Do not store or request hidden chain-of-thought.
