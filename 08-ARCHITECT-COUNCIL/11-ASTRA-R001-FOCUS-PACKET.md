# Astra R001 — Focus Packet

Status: READY_FOR_TARGETED_ESCALATION
Mode: READ_ONLY
Model target: GPT-6 Astra in Codex
Recommended first-pass reasoning effort: HIGH

## Why this packet exists

OpenAI's current Astra guidance explicitly recommends trimming old scaffolding, keeping AGENTS/instructions current and letting Astra read only what the task needs rather than forcing full-repository pre-reading.

This packet therefore compresses the current Influencer OS architecture into the minimum context needed to answer the few decisions that remain genuinely dangerous.

Astra should not reconstruct the whole project.
The central architect has already done that.

## Product invariant

Influencer OS is one coherent platform with four logical areas over one shared domain/application model:

1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

Creator App has both:
- guided task-oriented Studios;
- expert Workflow Graph.

Both operate on the same domain objects and application use cases.

OS23.6 source behavior must remain semantically preserved where published.

## Existing source behavior that migration must not lose

The current private Web App already has real behavior around:
- Character Passport and Canon;
- Worlds/Techniques/Packs;
- engine-specific prompt compilation;
- parser/language normalization;
- reference vision + content-addressed cache;
- persistence + migration + backup/import validation;
- provider switching and credential-clearing behavior;
- license/entitlement behavior;
- redaction/public prompt privacy;
- Prompt Doctor/self-check;
- EN/RU parity;
- export/display consistency;
- keyboard/modal interaction edge cases.

Public behavior contract:
`../01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md`

Canonical implementation anchor:
`tswetc/influencer-os@1158007fdaefd823e24d7a38d4fa7258814b541c`

If private implementation inspection is available and needed, prefer ONLY:
- `lib/types.ts`
- `lib/storage.ts`
- `lib/engines.ts`
- `lib/provider-settings.ts`
- `tests/edge-cases.test.ts`
- `tests/product-consistency.test.ts`
- `docs/context.md`

Do not crawl the full private repository unless one of these files proves insufficient.

## Already-settled baseline

Read:
`10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`

Do not re-litigate those decisions unless you can give a concrete failure scenario showing that the baseline causes:
- conceptual rewrite;
- lost reproducibility;
- unrecoverable inconsistency;
- cross-tenant/security failure;
- impossible migration;
- invalid workflow execution semantics.

## The five Astra questions

### A1 — Generation consistency boundary

We need one exact consistency model for:

application command
→ DB transaction
→ durable scheduling
→ GenerationJob
→ GenerationAttempt
→ provider dispatch
→ provider webhook/polling
→ AssetVersion creation
→ cancellation
→ retry/fallback
→ process crash/restart.

Decide:
- transaction boundaries;
- outbox/inbox requirements;
- queue semantics;
- provider dispatch idempotency;
- webhook deduplication;
- timeout/cancel race semantics;
- how job aggregate status is derived;
- recovery after crash between provider acceptance and local persistence;
- whether Postgres-native queue is sufficient initially or a managed queue should be required from beta.

The answer must include at least three concrete failure timelines and show that the proposed state machine survives them.

### A2 — Workflow run / partial rerun / reuse semantics

Baseline:
- immutable WorkflowRevision;
- DAG-first;
- WorkflowRun + WorkflowNodeRun;
- deterministic-node caching allowed;
- paid/non-deterministic generation reuse must be explicit.

Decide the exact model for:
- run selected;
- run downstream;
- partial rerun after changing one upstream node;
- reuse of unchanged upstream outputs;
- node cache key/input fingerprint;
- whether a partial rerun is a new WorkflowRun or a continuation/child execution;
- manual approval gates;
- subworkflow version binding;
- failed/skipped/cancelled states;
- preserving lineage when existing node outputs are reused.

Give one recommended model, not a menu.

### A3 — Minimum sufficient reproducibility/version model

Current proposed anchors include:

CharacterRevision
CanonRevision
SceneRevision
PlanRevision
PromptBuild
SelfCheckReport
OSRulesetVersion
EngineAdapterVersion
ModelProfileVersion/effective snapshot
ProviderStrategySnapshot
WorkflowRevision
GenerationAttempt
AssetVersion.

Decide:
- which of these truly need first-class immutable revision objects;
- which should instead be embedded immutable snapshots/hashes;
- which are redundant;
- exact fields/hashes PromptBuild and GenerationAttempt must persist so an old result can be explained and the exact effective provider request reconstructed years later;
- how to represent provider/model behavior that changes upstream without a stable provider version.

Primary objective:
maximum forensic reproducibility with minimum version-object explosion.

### A4 — Migration sequence from current Web App to Architecture V3

We are not starting from zero.

Current Web App is local-first and contains tested behavior around browser persistence, BYOK/provider state, import/export, license and source prompt mechanics.

Target architecture moves durable product state/server execution behind shared application services.

Design the migration as a sequence of reversible seams.

Decide:
- first anti-corruption/application-service boundary to introduce;
- what stays local initially;
- what moves server-side first;
- how to preserve existing import/export and Passport semantics;
- how to introduce Workspace/Project IDs without corrupting old local data;
- how to migrate provider credentials without carrying stale secrets;
- when to introduce worker/object storage;
- what compatibility tests gate each phase;
- what must be rewritten rather than migrated.

The answer must avoid both big-bang rewrite and indefinite dual architecture.

### A5 — Remote MCP / web / API auth and provider-secret boundary

We need one security model that works for:
- browser Creator App;
- normal HTTP API;
- remote MCP agents;
- workspace/project authorization;
- Entitlements;
- provider BYOK/managed credentials;
- audit traceability.

Decide:
- principal/session/token model;
- workspace-scoped authorization context;
- MCP OAuth/token scope shape;
- how an MCP tool invokes the same application command as the web UI without bypassing authorization;
- how ProviderConnection secrets are resolved at execution time;
- whether agents can ever request raw provider secrets (default expectation: no);
- token/session revocation and audit linkage;
- service-to-worker identity.

Use current MCP/OAuth patterns; do not invent a custom auth protocol.

## Output contract

Produce ONE decision document, not a large report tree:

`ASTRA-R001-DECISIONS.md`

For each A1–A5 include:

1. DECISION — one recommended architecture.
2. WHY — the essential reasoning, no generic textbook material.
3. EXACT SEMANTICS — states/interfaces/transaction or sequence sketch where useful.
4. FAILURE TEST — concrete failure scenario(s) the decision survives.
5. DELTA — exact changes required to the current baseline/ADRs.
6. DO NOT GENERALIZE — what should remain simpler for now.
7. CONFIDENCE — HIGH / MEDIUM / LOW.
8. RESIDUAL QUESTION — only if genuinely unresolved.

Then end with:
- `ADR_CHANGES_REQUIRED`: exact ADR IDs or NONE;
- `BLOCKING_FOUNDER_QUESTIONS`: only product questions that materially alter architecture, otherwise NONE;
- `TOP_3_IMPLEMENTATION_RISKS`.

## Operating constraints

- READ-ONLY.
- Do not implement.
- Do not redesign visual direction.
- Do not spend time reviewing media packs.
- Do not restate source counts.
- Do not generate a generic architecture survey.
- Do not ask the founder to choose technical details.
- If one support file is enough, do not read five.
- If evidence is missing, state the minimum missing evidence and still decide everything independent of it.
