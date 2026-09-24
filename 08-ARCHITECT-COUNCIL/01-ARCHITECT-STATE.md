# Central Architect State — Influencer OS

Date: 2026-09-25
Status: CENTRAL_BASELINE_READY_FOR_TARGETED_ASTRA_R001

## Product we are actually building

One coherent Influencer OS product platform, not a landing page.

Four logical areas:
1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

They share one domain/application model.

Current engineering direction:
modular monolith / monorepo-compatible boundaries first.
No microservice split without operational evidence.

## Current verified repository anchors

Public browser lab:
- repository: `tswetc/influencer-os-site-v2.1-zai-browser-experiment`
- current architecture-preparation head before Astra packet: `8ff05e44030079d1d70dbdb84ee9d0d3e924111e`

Canonical private Web App:
- repository: `tswetc/influencer-os`
- audited `main`: `1158007fdaefd823e24d7a38d4fa7258814b541c`
- product/package family: current Web App release lineage around 1.23 / OS23.6

Frozen Site V2:
- repository: `tswetc/influencer-os-site`
- branch: `codex/influencer-os-site-v2`
- frozen completion head: `672f5722e0316beb7139526be93a5a60b9f4a8a4`

Private Site V2.1:
- repository: `tswetc/influencer-os-site`
- branch: `codex/influencer-os-site-v2.1`
- current observed head: `8973b3df689eeb6c72367a806e103602239a4036`
- its historical state files predate the current public-lab architecture and must not override current founder decisions.

Private `project-memory` remains durable historical/shared context but its current status is older than the 2026-09-24/25 founder decisions. Public browser runs do not depend on it.

## Current product/source invariants

OS23.6 behavior represented in the lab remains authoritative where published:
- Worlds A=Diary, B=Raw, C=Staged;
- 24 techniques;
- 18 scene packs;
- 92 explicit scenes;
- 164 source self-check assertions;
- Character Passport / Canon semantics;
- engine-specific prompt transformation;
- Series / Shoot / Feed and related planning mechanics.

Current private Web App behavior outside the public source pack is represented by:
`../01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md`.

## Current domain spine

Stable identities/containers:
- Workspace
- Project
- Character
- Scene
- Plan
- Workflow
- Asset
- ModelProfile

Immutable/versioned execution state:
- CharacterRevision
- CanonRevision
- SceneRevision
- PlanRevision
- PromptBuild
- SelfCheckReport
- EngineAdapterVersion
- ModelProfileVersion / effective snapshot
- OSRulesetVersion
- WorkflowRevision
- WorkflowRun
- WorkflowNodeRun
- GenerationJob
- GenerationAttempt
- AssetVersion
- LineageEdge
- ExportBundle
- AuditEvent

Access/runtime support:
- Principal/User
- WorkspaceMembership/Role
- ProviderConnection
- ProviderStrategySnapshot
- Entitlement

The additional revision/runtime objects above are central-architect baseline refinements intended to close provenance gaps in the earlier model. Astra must challenge only where they are redundant or insufficient.

## Creator interaction layers

Guided/direct Studios remain the default interaction for ordinary jobs.

Expert Workflow Graph exists for:
- branching;
- model/provider switching;
- image/edit/video chains;
- intermediate inspection;
- reusable workflows;
- controlled downstream reruns;
- subflows/tools.

Both call the same application/core use cases.

## Current media state

M001 is complete and centrally audited.

Current normalized local state reported by the founder workflow:
- 160 unique selected source paths after raw selection normalization;
- 156 locally materializable/allowed items;
- 4 holds;
- clean rebuild: 156 files / 0 errors;
- opaque identity IDs only;
- child/privacy-rejected and selected other-identity media excluded;
- a visible identity-card frame is excluded from public transport;
- official run packs target approximately 30–45 items, not the whole library.

Wave v4 full-quality transport remains a separate freeze task.

## Current run state

Historical/integration pilots already running:
- P001 — GLM-5.2 — design A
- P002 — GLM-5.3-Flash — design A
- P003 — GLM-5.3 — design B
- P004 — GLM-5.3 — design B

They remain immutable historical evidence.

Official E004–E011 product-quality wave is not yet the architecture-vetted final freeze.

## Central architect decisions already settled

See:
`10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`.

In summary:
- modular monolith first;
- server/domain durable state, not localStorage-as-canon;
- Postgres-class relational primary metadata store;
- object storage for media binaries;
- explicit application command/query boundary shared by web/API/MCP;
- immutable historical creative revisions;
- retry never overwrites an attempt;
- provider fallback never silently rewrites semantic history;
- v1 workflow runtime is DAG-first;
- secrets are server-side and excluded from exports/logs;
- audit state is separate from telemetry;
- export/import is schema-versioned and hash-addressed;
- browser candidates are promoted selectively, never wholesale.

## Why Astra is needed now

The remaining questions are not broad architecture questions.
They are concentrated consistency/migration decisions where subtle mistakes can survive normal review:

1. exact WorkflowRun / NodeRun / partial-rerun / cache-reuse semantics;
2. exact generation consistency model across DB transaction, durable queue, provider dispatch, webhook/polling, cancellation and crash recovery;
3. the minimum sufficient version/snapshot model for real reproducibility without revision-object explosion;
4. migration sequence from the current local-first Web App into server-backed Architecture V3 without losing current tested behavior;
5. remote MCP/web/API auth + workspace + provider-secret boundary.

Those five are the Astra R001 mission.
