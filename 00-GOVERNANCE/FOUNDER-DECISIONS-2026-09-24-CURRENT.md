# Founder Decisions — 2026-09-24 · Current Public Lab Contract

Status: BINDING FOR NEW RUNS

This file records explicit founder decisions that supersede older public-lab assumptions where they conflict.

## 1. Temporary public lab

The browser experiment repository remains PUBLIC during this architecture/product-development phase because public raw GitHub transport is currently the reliable bridge into Chat.Z.AI browser sandboxes.

This is an intentional temporary development decision.

Public does NOT mean:
- publish credentials;
- publish customer/license data;
- publish private canonical repositories wholesale;
- publish secrets;
- publish a real-world founder identity inferred from media.

Public-lab content may include:
- governance;
- source-derived behavior contracts;
- source hashes;
- run specifications;
- reference research;
- sanitized media transport packs;
- development evidence intended for these runs.

## 2. Identity

The inferred label `founder_milena_ioanna` is retired.

Use only opaque IDs:
- `founder-main-01` for the main founder-media identity where needed;
- other neutral IDs for other approved subjects.

Do not infer, reconstruct or publish a real-world identity name from visible media evidence.

## 3. Product topology

Influencer OS is explored as ONE coherent product experience with FOUR explicit logical domains sharing one domain model:

1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

These are logical boundaries, not a requirement to deploy four microservices.

Default implementation target:
- modular monolith / monorepo-compatible boundaries first;
- stable internal contracts;
- split services only when operational evidence justifies it.

## 4. Expert workflow mode

Influencer OS must include an expert node-graph workflow mode inspired by the useful interaction logic of Figma Weave.

The node graph is an expert surface, not the default experience for every task.

Default guided studios and expert graph mode must operate on the SAME domain objects and OS Core.

## 5. Domain-model direction

The product must explicitly model:

`Workspace → Project → Character → CharacterRevision → CanonRevision → Scene → Shot/Plan → PromptBuild → GenerationJob → GenerationAttempt → Asset → AssetVersion → Lineage`

and supporting objects including:

`ProviderConnection`, `ModelProfile`, `EngineAdapterVersion`, `SelfCheckReport`, `Workflow`, `ExportBundle`, `AuditEvent`, `Entitlement`.

Architecture may add revision/run/membership objects where needed, but must not collapse these concepts into an unversioned generic blob.

## 6. Media budget

Run media packs should be CURATED, not maximal.

Target:
- approximately 30–45 strong media items per design/run;
- coherent families;
- enough range for public pages + studios + examples;
- no requirement to expose every eligible master item.

A 30–45-item strong pack is preferred over 60–80 merely available items.

## 7. Launch strategy

Parallel full-product builds may run NOW for product-quality exploration.

At the same time, run a disposable pipeline-qualification test.

Do not pretend that this first parallel product-quality wave is a perfectly controlled model benchmark if:
- runtimes differ;
- reference browsing is live rather than frozen;
- media transport changes after launch.

Tomorrow's forensic review must separate:
- product quality;
- run-to-run variance;
- model effects;
- shared-input defects.

## 8. Model preference

For product-quality runs:
1. GLM-5.3 when available;
2. GLM-5.3-Flash as high-throughput fallback / visual-heavy alternative;
3. GLM-5.2 as fallback and comparison baseline.

Actual runtime UI label must always be recorded.
