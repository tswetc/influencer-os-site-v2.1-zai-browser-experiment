# AGENTS.md — Influencer OS Z.ai Browser Experiment Lab

This repository is an experimental PUBLIC transport / coordination lab for Influencer OS browser-agent work.

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

Binding plan:
`08-ARCHITECT-COUNCIL/19-PRE-ASTRA-EXECUTION-PLAN-V2.md`

ASTRA-R001 is NOT launched yet.

Official E004–E011 and Q001 are PAUSED until:
pre-Astra finalization → Astra → accepted Architecture V4 → new immutable official freeze.

Already-running P001–P004 remain pinned to their historical inputs and may continue.

## Browser-run route

A Chat.Z.AI product run:
- reads its commit-pinned RUN.md;
- uses GitHub as READ-ONLY input;
- works inside its isolated sandbox;
- exports a unique candidate archive;
- does not write implementation to this repository.

No new official E/Q run may start from `main` or from an unpinned URL.

## Central architecture route

For current central architecture work:
1. read `00-GOVERNANCE/START-HERE.md`;
2. read `08-ARCHITECT-COUNCIL/19-PRE-ASTRA-EXECUTION-PLAN-V2.md`;
3. read `08-ARCHITECT-COUNCIL/01-ARCHITECT-STATE.md`;
4. read only evidence required by the active gate.

Do not re-open settled decisions without a concrete contradiction.

## Astra route

Only after status is `PRE_ASTRA_READY` and an immutable SHA is recorded:

- model target: GPT-6 Astra in Codex;
- first pass: XHIGH reasoning;
- READ-ONLY;
- no implementation;
- no visual-design/media work;
- no whole-repository pre-read.

Astra should receive only the FINAL irreducible knots.

Current provisional reduced scope:
- K1 model/provider/profile/deployment identity boundary under provider/gateway drift;
- K2 ambiguous paid provider submission when no idempotency or reliable lookup exists.

Do not spend Astra capacity on A1/A2/A5/A6 unless later evidence disproves the central decisions.

## Local media safety

Never commit:
- `04-MEDIA/library/`;
- `04-MEDIA/packs/master-v1.json`;
- local v1 manifests;
- local v3-curated manifests;
- SSD/local source paths.

Only sanitized reviewed Wave transport under `04-MEDIA/transport/` may become public.

## Promotion

Candidate promotion is deliberate:

candidate export
→ forensic audit
→ accepted bounded contract/module/design/interaction
→ dedicated real branch
→ tests/refinement
→ optional canonical integration.

Never merge a whole candidate solely because it looks strongest.
