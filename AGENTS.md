# AGENTS.md — Influencer OS Z.ai Browser Experiment Lab

This repository is an experimental PUBLIC transport / coordination / evidence lab for Influencer OS browser-agent work.

It is NOT:
- canonical Influencer OS product code;
- canonical Site V2/V2.1 production code;
- a production deployment repository.

## Default

Unless the founder explicitly assigns a lab/architecture task:
- treat this repository as read-only experiment evidence;
- do not merge anything from here into canonical private repositories;
- do not push browser-agent implementation back into shared `main`;
- do not treat candidate code as production truth.

## Current pre-Astra state

Binding workboard:
`08-ARCHITECT-COUNCIL/21-PRE-ASTRA-WORKBOARD.md`

Current architecture state:
`08-ARCHITECT-COUNCIL/01-ARCHITECT-STATE.md`

ASTRA-R001 is NOT launched yet.

Official E004–E011 and Q001 are PAUSED until:
pre-Astra verification → Astra adversarial review → accepted Architecture V4 → new immutable official freeze.

Already-running P001–P004 remain pinned to historical inputs and may continue.

## Browser-run route

A Chat.Z.AI product run:
- reads its commit-pinned RUN.md;
- uses GitHub as READ-ONLY input;
- works inside its isolated sandbox;
- exports a unique candidate archive;
- does not write implementation to this repository.

Never launch a new official E/Q run from `main`, `latest`, or an unpinned URL.

## Central architecture route

For current central work:
1. read `00-GOVERNANCE/START-HERE.md`;
2. read `08-ARCHITECT-COUNCIL/21-PRE-ASTRA-WORKBOARD.md`;
3. read `08-ARCHITECT-COUNCIL/01-ARCHITECT-STATE.md`;
4. read only evidence required by the active workboard item.

Do not re-open a settled architecture decision without:
- verified source contradiction;
- pilot/candidate forensic evidence;
- explicit founder scope change;
- or a concrete adversarial failure case.

## Architecture status

A1–A6/K1/K2 are centrally closed for the current BYOK-first milestone.

Key evidence:
- `PRE-ASTRA-CENTRAL-DECISIONS-R2.md`
- `PRE-ASTRA-CENTRAL-DECISIONS-R3.md`
- `K1-MODEL-ROUTE-DECISION.md`
- `K2-BILLING-SAFETY-DECISION.md`

## Astra route

Only after status is `PRE_ASTRA_READY` and an immutable SHA is recorded:
- target: GPT-6 Astra in Codex;
- reasoning: XHIGH first pass;
- READ-ONLY;
- no product implementation;
- no visual-design/media work;
- no whole-repository pre-read.

Astra's job is to falsify/challenge the accepted architecture using concrete failure cases, not to redesign from scratch.

## Local media safety

Never commit:
- `04-MEDIA/library/`;
- `04-MEDIA/packs/master-v1.json`;
- local v1 manifests;
- local v3-curated manifests;
- SSD/local source paths.

Only sanitized, reviewed Wave transport under `04-MEDIA/transport/` may become public.

## Promotion

candidate export
→ forensic audit
→ accepted bounded contract/module/design/interaction
→ dedicated real branch
→ tests/refinement
→ optional canonical integration.

Never merge a whole candidate solely because it looks strongest.