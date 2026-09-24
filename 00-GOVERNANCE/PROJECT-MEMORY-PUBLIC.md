# Influencer OS Site V2.1 — Public Lab Project Memory

Date: 2026-09-25
Status: ACTIVE_PUBLIC_BROWSER_PRODUCT_LAB_WITH_ARCHITECTURE_ESCALATION

This is the first operational memory for NEW Chat.Z.AI browser runs.

## Repository role

Temporary PUBLIC transport / coordination / experiment lab for Influencer OS Site V2.1 browser-agent development.

Public visibility is deliberate during this development phase because commit-pinned raw GitHub transport is currently the reliable bridge into Chat.Z.AI sandboxes.

Treat every committed byte as public.

This repository is NOT:
- the canonical private Influencer OS implementation repository;
- the canonical private Influencer OS Site repository;
- a production deployment repository;
- a place for provider secrets, credentials, customer/license data or hidden private source.

## Product we are building

Influencer OS is one coherent platform with four logical areas over one shared domain/application model:

1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

These are logical boundaries, not four required microservices.

Default target:
modular monolith / monorepo-compatible boundaries first.

Creator App supports both:
- guided/task-oriented Studios;
- Expert Workflow Graph.

Both use the same application/core behavior.

## Source behavior

Where published source defines behavior, OS23.6 remains authoritative:
- Worlds A=Diary, B=Raw, C=Staged;
- 24 techniques;
- 18 scene packs;
- 92 explicit scenes;
- 164 source self-check assertions;
- Character Passport / Canon;
- engine-specific prompt adaptation;
- Frame / Series / Shoot / Feed and related planning mechanics.

Extensions are labeled as extensions.

## Architecture state

The central architect has reduced the remaining foundational architecture work to six decision knots:

1. one execution substrate across Studios / Workflow / API / MCP;
2. creative revision / pin / stale / rebase semantics;
3. dynamic model/provider/adapter + evaluation/promotion lifecycle;
4. durable paid-generation failure/cost semantics;
5. web/API/MCP auth + BYOK/managed secret boundary;
6. reversible migration from current local-first Web App.

These are being escalated through GPT-6 Astra in Codex using:
`08-ARCHITECT-COUNCIL/`

Browser product agents do NOT need to read that architecture-council folder unless their run contract explicitly says so.

## Current private implementation evidence

Canonical private Web App remains outside this public lab.

Public behavior contracts summarize only deliberately exported facts.

Important current gap:
the private Web App is local-first/browser-persistent and hardcodes current EngineId/prompt logic, while the target platform is server-durable, multi-surface and continuously evolves model/provider integrations.

Do not solve that by inventing private source behavior.

## Media policy

- neutral identity IDs only;
- main approved neutral media identity = `founder-main-01`;
- do not infer/publish a real-world identity name;
- child/privacy-rejected and selected other-identity media excluded;
- editorial, exhibit/art and ordinary major-brand context may be used under recorded provenance rules;
- run packs are curated ~30–45 items, not maximal libraries;
- public development transport is not production media storage.

Founder-reported current clean local master:
- 160 normalized sources;
- 156 materialized;
- 4 holds;
- zero clean-rebuild errors.

Current bounded pack target:
A 39 · B 42 · C 33 · D 36.

## Run isolation

GitHub is READ-ONLY input for every Chat.Z.AI browser run.
Each run uses:
- unique run ID;
- isolated sandbox;
- commit-pinned inputs;
- unique export.

No browser run writes implementation to shared `main`.

## Current run state

Historical/already-running pilots:
- P001 GLM-5.2 / design A
- P002 GLM-5.3-Flash / design A
- P003 GLM-5.3 / design B
- P004 GLM-5.3 / design B

They continue on their immutable historical inputs.

They are useful product evidence but are not automatically a perfectly controlled model benchmark.

Official E004–E011 should use a new post-architecture freeze if architecture decisions materially affect run contracts.

## Failure protocol

A blocked subsystem does not end the mission.

Use bounded retries with materially different approaches.
Then record:
LIVE / MOCK / UNVERIFIED / BLOCKED_SUBSYSTEM / DEFERRED_WITH_REASON.

Never loop indefinitely.

## Promotion rule

No browser candidate becomes canonical automatically.

Promotion path:
candidate export → forensic audit → selected contract/design/module → dedicated real branch → tests/refinement → deliberate canonical integration.

Never merge a whole browser candidate solely because it looks strongest.

## Privacy/history note

Current active public text uses neutral IDs.

Older historical public commits may still contain obsolete inferred identity strings.
Do not rewrite those commits while pinned runs depend on them.

Before a long-lived official public transport bridge, create a sanitized clean-history bridge/root or equivalent privacy-safe transport.
