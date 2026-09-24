# Influencer OS Site V2.1 — Public Lab Project Memory
Date: 2026-09-24
Status: ACTIVE_PUBLIC_BROWSER_PRODUCT_LAB

This file is the first operational memory for NEW Chat.Z.AI browser runs.

## Repository role

This repository is a temporary PUBLIC transport / coordination / experiment lab for Influencer OS Site V2.1 browser-agent development.

Public visibility is deliberate during this development phase because commit-pinned public GitHub transport is the reliable bridge into Chat.Z.AI sandboxes.

Treat every committed byte as public.

## What is outside this lab

This repository is NOT:
- the canonical private Influencer OS product repository;
- the canonical private Influencer OS Site V2.1 repository;
- a place for credentials, provider secrets, customer/license data or hidden private-source material.

Browser agents must not modify or depend on private repositories that are not deliberately represented here.

## Current product architecture

Influencer OS is explored as ONE coherent platform with FOUR logical product areas over ONE shared domain model:

1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

These are logical boundaries, not a requirement for four microservices.

Default implementation target: modular monolith / monorepo-compatible boundaries with shared contracts.

## Shared domain spine

Workspace
→ Project
→ Character
→ CharacterRevision
→ CanonRevision
→ Scene
→ Plan / Shot
→ PromptBuild
→ SelfCheckReport
→ GenerationJob
→ GenerationAttempt
→ Asset
→ AssetVersion
→ Lineage

Supporting objects:
ProviderConnection · ModelProfile · EngineAdapterVersion · Workflow · WorkflowRevision · WorkflowRun · ExportBundle · AuditEvent · Entitlement.

## Interaction modes

The Creator App must support both:
- guided / direct task-oriented Studios;
- expert node-graph Workflow mode.

They use the SAME domain objects and OS Core.

A validated expert WorkflowRevision may be exposed as a simpler reusable Studio Tool/action without duplicating logic.

## Source truth

Where published source defines behavior, OS23.6 remains authoritative:
- Worlds A=Diary, B=Raw, C=Staged;
- 24 techniques;
- 18 scene packs;
- 92 explicit scenes;
- 164 source self-check assertions;
- engine-specific prompt adaptation;
- Character/Canon logic;
- Frame / Series / Shoot / Feed and related planning mechanics.

Extensions must be labeled as extensions, not inherited source truth.

## Media policy

- use neutral identity IDs only;
- main founder-media identity = `founder-main-01`;
- do not infer or publish a real-world identity/name from media;
- child/privacy-rejected and selected other-identity media are excluded;
- editorial, exhibit/art and ordinary major-brand context may be used when provenance is honest and no endorsement/partnership is implied;
- each design run receives a bounded, curated ~30–45 item media pack rather than the entire available library;
- current public development packs use commit-pinned atlas-preview derivatives and are DEVELOPMENT transport, not final publication masters.

## Parallel-run rule

GitHub is READ-ONLY input for every Chat.Z.AI run.
Each chat works in its own sandbox.
No chat writes implementation to shared main.
No chat reads sibling run folders for creative direction.

## Current run strategy

P001–P004 are already-running / historical integration pilots.

The full product-development wave is E004–E011:
- A: E004 GLM-5.3 / E005 GLM-5.3-Flash
- B: E006 GLM-5.3 / E007 GLM-5.3-Flash
- C: E008 GLM-5.3 / E009 GLM-5.3-Flash
- D: E010 GLM-5.3 / E011 GLM-5.3-Flash

Within each pair, product/source/reference/media inputs are identical.
If the actual UI model differs at launch, record MODEL_OVERRIDE_AT_LAUNCH and do not pretend the pair is a controlled model comparison.

## Design evidence rule

A run receives concrete reference roles rather than vague adjectives:
- composition / typography anchor;
- media / narrative anchor;
- motion / transition or creator-workbench anchor;
- common product-architecture references: Higgsfield + Figma Weave + existing V2.

The agent must:
research → measure → write a design constitution → implement → capture screenshots → compare → fix → repeat.

## Failure protocol

One blocked subsystem does NOT terminate the mission.

Use bounded retries with materially different approaches.
If still blocked:
1. record the failure;
2. preserve truthful LIVE/MOCK/UNVERIFIED state;
3. continue all independent work;
4. revisit later;
5. finish as COMPLETE, COMPLETE_WITH_DEGRADED_SUBSYSTEMS or honestly INCOMPLETE.

Never loop indefinitely.

## Promotion rule

No browser candidate becomes canonical automatically.

Every candidate is exported, preserved and audited centrally before concepts or code are promoted into private canonical products.
