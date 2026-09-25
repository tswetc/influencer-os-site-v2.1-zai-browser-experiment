# Founder Decisions — 2026-09-25 · Current Public Lab Contract

Status: BINDING FOR ALL NEW WORK

This supersedes `FOUNDER-DECISIONS-2026-09-24-CURRENT.md` where they conflict.

## 1. Temporary public lab

The Z.ai browser experiment repository may remain PUBLIC during this development phase because commit-pinned public GitHub transport is the reliable bridge into Chat.Z.AI sandboxes.

Public does not permit secrets, credentials, customer/license data, hidden private canonical source, rejected privacy media, or inferred real-world founder identity.

## 2. Identity

Use opaque IDs only.
Main approved neutral media identity: `founder-main-01`.
Do not infer or publish a real-world identity name from media.

## 3. Product topology

Influencer OS is one coherent product with four logical areas over one shared domain/application model:
1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

Default architecture target remains modular-monolith / monorepo-compatible first.

## 4. Interaction model

Guided Studios and Expert Workflow Graph are both required.
They operate on the same application/core semantics.
The graph is an expert surface, not the default UI for every task.

## 5. Product capability direction

The product must support real image and video generation, Character continuity, Prompt/Canon visibility, Projects/Assets/History/Compare, provider/model selection, MCP/agent access, EN/RU and export/portability.

The model/provider layer is expected to evolve continuously. New models must be researched, evaluated and promoted truthfully rather than added as unsupported UI labels.

## 6. Media

Use curated run packs of approximately 30–45 strong items per design/run.
Prefer coherent families over maximal libraries.
Current target counts remain A39 / B42 / C33 / D36.

## 7. Launch strategy — UPDATED

Do NOT launch ASTRA-R001 yet.
Do NOT launch official E004–E011 or Q001 yet.

First complete `08-ARCHITECT-COUNCIL/17-PRE-ASTRA-FINALIZATION-PLAN.md`.

Existing P001–P004 continue unchanged on their historical pinned inputs and should be ingested/audited as evidence when complete.

After pre-Astra finalization:
1. freeze one immutable Astra input;
2. run GPT-6 Astra / XHIGH;
3. reconcile accepted decisions into Architecture V4;
4. only then create the official E004–E011/Q001 freeze and launch.

This decision supersedes the 2026-09-24 permission to launch the official full-product wave in parallel with Astra.

## 8. Model preference for browser product-quality runs

When those runs resume:
1. GLM-5.3 when available;
2. GLM-5.3-Flash as fallback / high-throughput visual-heavy alternative;
3. GLM-5.2 as fallback/comparison baseline.

Always record the actual visible runtime model label.

## 9. Architecture responsibility

The founder owns product behavior, capability scope, UX intent, taste/design direction and business priorities.
The architecture layer owns persistence, transactions, queues/retries, workflow runtime, provider/model lifecycle, auth/secrets, migration, observability, testing and promotion mechanics.

## 10. Astra responsibility

Astra is reserved for only the remaining irreducible architecture decisions after the central architect has completed all work possible without it.