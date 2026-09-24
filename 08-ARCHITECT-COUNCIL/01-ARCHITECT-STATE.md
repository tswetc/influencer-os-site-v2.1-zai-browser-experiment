# Central Architect State — Influencer OS Site V2.1

Date: 2026-09-24
Status: ARCHITECTURE_V3_PRE_REVIEW

## Product we are actually building

One coherent Influencer OS product, not a landing page.

Four logical areas:

1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

They share one domain/application model.

Current recommended engineering shape:
modular monolith / monorepo-compatible boundaries first.
Do not create microservices without operational evidence.

## Core domain spine

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

Supporting:
ProviderConnection
ModelProfile
EngineAdapterVersion
Workflow
WorkflowRevision
WorkflowRun
ExportBundle
AuditEvent
Entitlement

## Source-preserving creative semantics

OS23.6 source truth currently represented in the lab includes:
- Worlds: Diary / Raw / Staged;
- 24 techniques;
- 18 scene packs;
- 92 explicit scenes;
- 164 self-check checks;
- engine-specific prompt transformation;
- character/canon continuity;
- planning families such as Frame / Series / Shoot / Feed and related helpers.

The browser product may extend these semantics but must label extensions.

## Two creator interaction layers

### Guided/direct Studios
Purpose-built UI for common jobs.

### Expert Workflow Graph
Professional node-based mode for:
- branching;
- model/provider switching;
- image/edit/video chains;
- intermediate inspection;
- reusable workflows;
- controlled downstream reruns;
- subflows/tools.

Both layers operate on the same objects and application use cases.

## Current architecture assumptions

- immutable revisions for Character/Canon/Workflow/AssetVersion;
- retries create new GenerationAttempt;
- generation is asynchronous;
- PromptBuild is the reproducibility anchor;
- provider adapters are versioned;
- lineage is a typed graph, not a single parent pointer;
- durable state belongs behind repository/persistence interfaces;
- secrets never enter client persistence, exports or audit logs;
- web UI and MCP invoke the same core use cases;
- LIVE is evidence-backed runtime state, not marketing copy.

## Public browser lab

The public GitHub repo is deliberate temporary development transport.
Browser agents consume commit-pinned read-only input.
Each chat has its own sandbox and local Git.
Candidate code does not go back to shared lab automatically.

## Full-wave state

E004–E011 have prepared:
- exact model matrix;
- four design directions;
- bounded 36–42 item media packs;
- full-product mission contracts;
- QA/export requirements.

Before making Architecture V3 the long-lived foundation, we want an independent architecture council review from Astra + Codex.

## What the reviewer is allowed to change

Architecture:
yes.

Product intent:
no, unless a contradiction makes implementation impossible; then surface the contradiction.

Visual/design direction:
not the primary mission.

Source semantics:
must be preserved unless verified source contradicts current public contract.

## Desired end-state

A candidate architecture that can move from:
public browser experiments
→ selected synthesis candidate
→ private canonical repository
→ real auth/persistence/provider execution
→ deployable production system

without a conceptual rewrite.
