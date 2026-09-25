# Influencer OS — Current Context Handoff

Date: 2026-09-25
Purpose: bootstrap a fresh ChatGPT Project/chat without the legacy conversation.

IMPORTANT: this file is a dated snapshot. The first action in a new chat is to verify the current GitHub HEAD and read the repository's current routing/state files. Newer repository state overrides this handoff.

## 1. Product goal

Influencer OS is no longer treated as a simple marketing site.

Target: one coherent creative product platform with four logical areas:
1. Public / Product Experience;
2. Creator App;
3. OS Core / API / Generation Services;
4. MCP / Agent Surface.

Core UX includes:
- public product/marketing surfaces;
- create/manage AI characters;
- Character Passport + Canon continuity;
- Image and Video Studios;
- Prompt Lab with visible OS transformation;
- Worlds / techniques / scene packs;
- Series / Shoot / Feed planning;
- Assets / History / Compare;
- guided workflows;
- Expert Workflow Graph/node mode;
- real generation through provider/model integrations;
- MCP/API access through the same application core;
- EN/RU parity;
- strong media-rich art direction.

Higgsfield-like breadth is a product/IA reference, not a visual-copy mandate.
Visual work uses curated reference recipes and should avoid generic AI/SaaS aesthetics.

## 2. Main repositories

Canonical private product:
`tswetc/influencer-os`
verified audit head in current contracts:
`1158007fdaefd823e24d7a38d4fa7258814b541c`

Canonical site repository:
`tswetc/influencer-os-site`
Frozen Site V2:
`672f5722e0316beb7139526be93a5a60b9f4a8a4`
Observed private Site V2.1 branch head:
`8973b3df689eeb6c72367a806e103602239a4036`

Public Z.ai experiment/transport lab:
`tswetc/influencer-os-site-v2.1-zai-browser-experiment`

Local lab workspace on founder machine:
`/Volumes/F/INFLUENCER-OS-ZAI-LAB/repo`

Raw/local founder media:
`/Volumes/F/INFLUENCER-OS-ZAI-LAB/originals`

## 3. Source behavior that matters

Verified inherited mechanics include:
- Worlds A=Diary, B=Raw, C=Staged;
- 24 techniques;
- 18 scene packs / 92 explicit scenes;
- Character Passport / Canon;
- deterministic parser/normalization;
- engine-specific prompt compilation;
- source self-check semantics;
- Frame / Series / Shoot / Feed and related planning;
- provider switching safety;
- vision/reference analysis/cache;
- typed local persistence;
- versioned backup/import with validation;
- license/entitlement behavior;
- EN/RU consistency tests.

Current private Web App is local-first/browser-persistent. That implementation shape is migration evidence, not the target hosted architecture.

## 4. Current architecture baseline

Default: modular monolith first.

Target persistence:
- relational metadata/transactions;
- object storage for media;
- async worker for long generation;
- shared application/use-case layer for Studios/API/MCP/Workflow.

Accepted core domain direction:
`Workspace → Project → Character → CharacterRevision → CanonRevision → Scene/SceneRevision → Plan/PlanRevision → PromptBuild → GenerationJob → GenerationAttempt → Asset → AssetVersion → Lineage`

Supporting concepts include:
`ProviderConnection`, `ModelProfile/Revision`, `ModelRoute`, `EngineAdapterVersion`, `ProviderAdapterVersion`, `ModelDeploymentSnapshot`, `Workflow/WorkflowRevision/WorkflowRun/WorkflowNodeRun`, `SelfCheckReport`, `ExportBundle`, `AuditEvent`, `Entitlement`.

## 5. Architecture decisions already closed

A1 execution substrate:
- application commands/use cases are primitive;
- ordinary Studios/API/MCP do not create implicit WorkflowRuns;
- Workflow is orchestration over the same commands;
- all execution carries correlation/origin context.

A2 creative history:
- mutable drafts;
- immutable explicit save/checkpoint or transparent execution checkpoint;
- FOLLOW_ACTIVE resolves to exact revision IDs at execution;
- no historical rebase;
- manual prompt edits create derived PromptBuilds;
- CharacterRevision and CanonRevision remain separate.

A3 model/provider routing:
- semantic ModelProfileRevision is separate from provider route;
- immutable ModelRoute binds semantic profile to ProviderDeployment + ProviderAdapterVersion;
- GenerationAttempt pins exact route + observed deployment snapshot;
- alias drift creates new evidence/reverification and never rewrites history;
- LIVE promotion requires research/integration/eval evidence.

A4 generation durability:
- Job != Attempt;
- durable create transaction + DispatchOutbox;
- leased/idempotent worker;
- ProviderEventInbox normalizes webhook/poll races;
- `SUBMISSION_UNKNOWN` represents irreducible submit ambiguity;
- no automatic retry/fallback from ambiguous paid execution;
- provider success is separate from output materialization;
- BYOK-first safety baseline;
- platform-managed generation must capability-gate unsafe non-reconcilable provider routes.

A5 auth/MCP/secrets:
- external mature OIDC/OAuth;
- secure server-managed browser session;
- audience/scoped API access tokens + object authorization;
- remote MCP is OAuth protected resource and still calls application authorization;
- ProviderConnection stores secret reference, not raw secret in domain/export/logs;
- workers use service identity;
- legacy browser keys are never silently uploaded.

A6 migration:
- no big-bang rewrite;
- application/repository seam first;
- local domain normalization;
- server substrate behind flags;
- dry-run MigrationPlan;
- per-project verified cutover;
- exactly one canonical authority per project;
- explicit provider reconnect;
- durable generation after server cutover;
- model registry then graph/API/MCP;
- no permanent dual-write.

## 6. Media state

M001 media curation completed and was centrally audited.

Local clean master reported:
- 160 normalized source selections;
- 156 materialized;
- 4 holds;
- 0 clean-rebuild errors.

Wave v4 target packs:
- A = 39;
- B = 42;
- C = 33;
- D = 36.

Forbidden public selections include:
- G0027/s01;
- G0068/s06;
- G0111/s05.

Raw/local media library and local master manifests must remain uncommitted.

Next media task is local Wave v4 rebuild → sanitized derivatives → actual-transport atlas → visual privacy QA → verifier/audit PASS → approved public transport commit.

## 7. Browser-run state

M001: complete.

Historical pilots already launched on immutable older inputs:
- P001 — GLM-5.2 / design A;
- P002 — GLM-5.3-Flash / design A;
- P003 — GLM-5.3 / design B;
- P004 — GLM-5.3 / design B.

Do not mutate/redefine those inputs.
Collect and forensically audit their ZIPs as they finish.

Official E004–E011 + Q001 are PAUSED.
They launch only after pre-Astra finalization, Astra adversarial review, accepted Architecture V4, clean public bridge and new immutable freeze.

## 8. Astra strategy

Do not launch Astra immediately.

Central architecture should first close everything it can, ingest material pilot evidence, finish the media/transport system, synthesize a compact evidence packet and pass structural + semantic/adversarial audits.

Because the main architecture decisions are now centrally specified, Astra should be used as a high-tier falsification/escalation pass: attack the accepted invariants with concrete failure cases and propose changes only where a real architectural contradiction is demonstrated.

Target later:
GPT-6 Astra / XHIGH / READ_ONLY.

## 9. Public-lab/privacy strategy

The current public lab remains historical transport/evidence because pinned runs depend on its history.

The official post-Astra E-wave should use a NEW clean-history public bridge repository containing only approved current contracts, source-derived behavior, sanitized references/media and run specs.

Do not fork/merge the legacy lab history into the clean bridge.

## 10. Current work order for a fresh ChatGPT chat

1. verify current public-lab remote HEAD;
2. read `AGENTS.md`;
3. read `00-GOVERNANCE/START-HERE.md`;
4. read `08-ARCHITECT-COUNCIL/21-PRE-ASTRA-WORKBOARD.md`;
5. read `08-ARCHITECT-COUNCIL/18-PRE-ASTRA-PROGRESS.md`;
6. inspect only evidence needed for the active workboard item;
7. report any mismatch between this dated handoff and current repository state before changing anything.

## 11. Immediate blockers / external dependencies

- local Wave v4 media build must run on founder SSD;
- P001–P004 exports must be supplied/ingested as they complete;
- final pre-Astra synthesis/audits/freeze remain to be completed.

## 12. Non-negotiables

- no secrets in public repo;
- no inferred real-world founder identity;
- no silent upload of legacy API keys;
- no fake LIVE claims;
- no unpinned browser run;
- no whole-candidate automatic merge;
- no overwrite of historical generation/revision meaning;
- no pretending provider aliases are immutable model versions;
- no infinite retry loops;
- no public raw media library/SSD paths;
- no official E-wave before Architecture V4 freeze.