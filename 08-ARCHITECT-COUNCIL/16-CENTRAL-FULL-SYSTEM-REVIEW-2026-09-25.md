# Central Full-System Review — 2026-09-25

Status: CURRENT CENTRAL ARCHITECT REVIEW  
Scope: Influencer OS product architecture + public browser lab + media pipeline + candidate promotion

This review consolidates the current founder decisions, OS23.6 source, the current private Web App implementation audit, Site V1/V2/V2.1 evidence, the public lab architecture, media curation, reference system and the active parallel-run strategy.

It does not modify private repositories.

---

## 1. What Influencer OS is now

Influencer OS should be treated as one coherent creative operating system with four logical product areas:

1. **Public / Product Experience**
2. **Creator App**
3. **OS Core / API / Generation Services**
4. **MCP / Agent Surface**

They share one domain/application model.

Do not build four independent products with duplicated logic.
Do not collapse everything into one browser component tree either.

The intended user-facing modes are:

- guided/direct Studios for normal creative work;
- Expert Workflow Graph for professional compositional workflows;
- API/MCP for automation/agents.

All three execution surfaces must call the same application use cases.

---

## 2. Current implementation reality

The current private Web App is valuable behavior evidence, but it is not the target platform architecture.

Important verified characteristics:

- Next.js/React product with strong deterministic prompt/core modules;
- real CharacterPassport/canon/scene/series/shoot/feed mechanics;
- browser-direct LLM/vision provider access;
- localStorage + IndexedDB persistence;
- import/export/version behaviors;
- license verification;
- built-in self-checks and edge-case tests;
- full EN/RU copy system.

Important scaling debt:

- `app/app/page.tsx` is a very large client orchestration surface;
- many independent client states are coordinated inside that page;
- current persistence is predominantly local-device state;
- current EngineId/model assumptions are compiled source constants;
- current product is prompt/workflow oriented, not a durable multi-provider generation orchestration backend;
- the current Web App does not provide the full server-side lineage/job/asset/collaboration model required by the target product.

Therefore:

**preserve behavior; do not preserve the current orchestration shape.**

---

## 3. Architecture baseline

Default target: **modular monolith first**.

Recommended logical code topology:

```
apps/
  public-web
  creator-web
  mcp-server
  worker            # only if async execution cannot live safely in web runtime

packages/
  domain
  application
  prompt
  generation
  workflows
  providers
  persistence
  contracts
  media
  entitlements
  observability
  ui
```

This is a conceptual boundary. A first production implementation may use fewer physical packages if the dependency rules stay explicit.

Do not split into microservices until scale/failure-isolation evidence requires it.

---

## 4. Domain model

Primary ownership chain:

`Workspace → Project → Character → CharacterRevision → CanonRevision → Scene → Plan/Shot → PromptBuild → GenerationJob → GenerationAttempt → Asset → AssetVersion → Lineage`

Supporting objects:

- Membership
- Principal
- ProviderConnection
- ModelProfile
- EngineAdapterVersion
- SelfCheckReport
- Workflow
- WorkflowRevision
- WorkflowRun
- ExportBundle
- AuditEvent
- Entitlement

### Hard invariants

1. A saved CharacterRevision is immutable.
2. A saved CanonRevision is immutable.
3. PromptBuild is immutable and records the exact effective inputs/adapter version.
4. GenerationJob is the logical user intent.
5. GenerationAttempt is one provider/model execution attempt.
6. Retry creates another attempt; it does not overwrite history.
7. AssetVersion is immutable.
8. Every generated AssetVersion can resolve backward to PromptBuild + Attempt + relevant revisions.
9. Web, graph, API and MCP call the same application use cases.
10. Secrets never enter exported project bundles, audit payloads or browser-local persistence by default.
11. LIVE requires runtime evidence; code/UI presence is insufficient.

---

## 5. Draft vs revision model

This is one of the highest-risk future areas.

Use two concepts:

### Mutable Draft
A user's current unsaved/editor state.

A Draft may change quickly and may be optimistic/client-assisted.

### Immutable Revision
A committed historical state.

A revision receives:
- stable ID;
- parent revision;
- creator;
- created_at;
- content hash;
- schema version;
- optional change note.

Generation and workflow execution must pin immutable revisions, not a mutable editor object.

If the editor changes after execution starts, the running execution keeps its pinned revisions.

This prevents historical generations from silently changing meaning.

---

## 6. Application/use-case layer

UI components, workflow nodes and MCP tools must not contain business rules independently.

Representative use cases:

- CreateWorkspace
- CreateProject
- CreateCharacter
- SaveCharacterRevision
- SaveCanonRevision
- CreateScene
- SaveSceneRevision
- BuildPrompt
- RunSelfCheck
- CreateGenerationJob
- StartGenerationAttempt
- RecordProviderCallback
- RetryGeneration
- CancelGeneration
- SaveAssetVersion
- CompareAssetVersions
- CreateWorkflowRevision
- ExecuteWorkflow
- ExportProject
- ImportProject
- CreateProviderConnection
- RevokeProviderConnection

Each use case defines:
- validated input contract;
- authorization rule;
- domain operation;
- durable transaction;
- emitted result/events;
- audit record.

This is the anti-duplication seam for Studios / Graph / API / MCP.

---

## 7. Generation orchestration

Generation is not a synchronous button handler.

Minimum state machine:

`DRAFT → QUEUED → DISPATCHING → RUNNING → SUCCEEDED | FAILED | CANCELLED | TIMED_OUT`

GenerationJob:
- user/project intent;
- requested modality;
- input asset/revision refs;
- desired ModelProfile;
- budget/quality policy;
- status summary.

GenerationAttempt:
- provider connection;
- model/provider slug snapshot;
- adapter version;
- request hash;
- provider job ID;
- timestamps;
- normalized error;
- cost/token/credit metadata when available;
- output refs.

### Required safeguards

- idempotency key on job creation;
- unique provider callback/event handling;
- bounded retry policy;
- transient/permanent error classification;
- no infinite retries;
- cancellation semantics;
- timeout/dead-letter visibility;
- append-only attempt history;
- provider raw payload retained only when privacy policy permits;
- cost ceiling / budget policy before dispatch.

For the first production architecture, prefer one durable relational transaction boundary plus a simple durable background queue. Do not introduce a distributed event bus merely for architectural fashion.

---

## 8. Models/providers/adapters

OS23.6 EngineId values are inherited semantic compatibility IDs, not a permanent complete market registry.

Separate:

### ModelProfile
Current discoverable model/provider capability record.

Examples of fields:
- provider
- provider model slug
- modality
- input/output capabilities
- reference limits
- aspect/duration constraints
- status
- research evidence
- verified_at

### EngineAdapterVersion
Versioned Influencer OS transformation logic.

Fields:
- adapter_id
- semantic engine family
- version
- compatibility range
- transformation rules
- validation rules
- created_at
- retired_at

A historical PromptBuild pins the adapter version it used.

New provider/model research may create a new ModelProfile or adapter version without rewriting historical generations.

---

## 9. Expert Workflow Graph

The graph is not visual decoration.

It is another authoring surface over the same application model.

Node families:

- Context: Workspace, Project, CharacterRevision, CanonRevision, Scene
- Intelligence: Technique, PromptBuild, SelfCheck
- Generation: image/video/model/provider execution
- Media: AssetVersion, crop/edit/compare/select
- Control: branch, merge, batch/map, export

V1 execution should be DAG-first.

Every node has typed input/output ports.

Editing and execution are separate:
- WorkflowRevision = saved graph definition;
- WorkflowRun = one execution;
- node execution records input refs/output refs/status.

A node retry/downstream rerun must preserve prior results and lineage.

Complex graphs may be packaged as simpler reusable tools/templates, matching the useful Weave interaction principle without making every user work in a graph.

---

## 10. Persistence

Target durable storage:

- relational DB for durable metadata/revisions/jobs/workflows/audit/entitlements;
- object storage for image/video/binary assets;
- signed URLs for controlled asset access;
- CDN only as delivery layer, not as source of truth.

Current browser storage remains a migration/input source, not the final durable collaboration model.

Do not store large base64 media blobs in relational rows.

---

## 11. Authentication, authorization and secrets

Do not build custom authentication cryptography.

Use a mature standards-compatible authentication layer.

Keep separate concepts:

- Principal = authenticated actor
- Membership = actor's Workspace role
- Entitlement = commercial capability
- ProviderConnection = provider credential/configuration
- Authorization = whether the Principal may perform a use case

Provider secrets:
- server-side encrypted storage for saved connections;
- never returned to the client after storage;
- never included in logs/export bundles/audit payloads;
- redact provider errors before durable logging;
- revoke/rotate independently.

Optional local/BYOK-direct mode may exist, but it must be explicitly distinct from hosted saved-secret mode.

---

## 12. Media / rights / provenance

The strongest reusable pattern from the existing marketing system is:

source media
→ explicit selection
→ stable asset ID
→ SHA-256
→ rights/provenance/privacy/brand review
→ frozen task pack
→ production use

The current browser Wave v4 follows the same concept.

Do not let product agents scan the founder's full media archive.

Run media is a frozen dependency.

Current public Wave v4 additionally requires:
- neutral filenames;
- source-path removal;
- metadata stripping;
- exact hashes;
- exact pack membership;
- pixel-level privacy review.

---

## 13. Public lab

The public lab is deliberately temporary and operational.

It is acceptable during the current development period because it provides reliable commit-pinned transport to Chat.Z.AI.

It must never contain:
- secrets;
- customer/license data;
- whole private repositories;
- rejected child/privacy media;
- rejected other-identity media;
- a public real-world founder identity assertion.

Current-head sanitization does not erase historical public clones/caches.

Do not rewrite history while existing pinned experiments depend on it.

---

## 14. Browser-agent experiment pipeline

One frozen wave must have exactly one common input commit.

Flow:

```
current contracts
→ explicit media curation
→ sanitized Wave bundle
→ local verification
→ visual privacy QA
→ run-contract validation
→ public-lab audit
→ immutable freeze SHA
→ generated launch prompts
→ independent Chat.Z.AI sandboxes
→ unique candidate ZIPs
→ forensic audit
→ bounded promotion
```

Never patch only one running sandbox after launch.

A discovered shared-input bug is recorded centrally and fixed in the next wave.

---

## 15. Candidate promotion

Do not merge a whole candidate because it looks best.

Promote bounded units:

- an architecture contract;
- a domain/application module;
- a Prompt Lab implementation;
- workflow graph interaction;
- one visual system;
- one component family;
- one provider adapter;
- one route/surface.

Promotion path:

candidate
→ audit
→ extracted contract/diff
→ dedicated private canonical branch
→ canonical tests/security review
→ integration

---

## 16. Failure modes to expect

### Source-authority drift
Symptom: agent uses old project-memory or an old V2 claim.

Control:
current founder decision + public supersession + source-authority order + source reconciliation.

### UI-first architecture
Symptom: product looks complete but domain objects/jobs/lineage are fake local state.

Control:
domain/application P0 contract + forensic backend/state audit.

### Graph duplication
Symptom: Graph implements separate prompt/generation logic.

Control:
application use-case parity tests.

### Lost historical meaning
Symptom: character/canon/model edits change old generation records.

Control:
immutable revisions + PromptBuild/adapter pinning.

### Duplicate provider jobs
Symptom: refresh/retry/callback creates multiple paid generations.

Control:
idempotency keys + Attempt uniqueness + callback deduplication.

### Infinite retry/cost burn
Control:
bounded retry classes + attempt/cost caps.

### Provider schema drift
Control:
versioned ModelProfile/EngineAdapter + integration fixtures + verified_at.

### Secret leakage
Control:
server-side secret boundary + export/log redaction + public-lab scanners.

### Media contamination
Control:
explicit group/slot selection + sanitized transport + visual contact-sheet review.

### False LIVE claims
Control:
runtime evidence fields + audit rule.

### Candidate merge contamination
Control:
bounded promotion, never whole ZIP automatic merge.

### Context overload
Control:
progressive disclosure; do not force every browser run to ingest every lab file.

### Run freeze drift
Control:
40-char SHA only; no `main`/latest; no freeze mutation after launch.

---

## 17. Current Wave v4 specific corrections made in this review

1. Official A/B/C/D packs changed from runtime even-sampling to explicit group+slot curation.
2. G0068/s06 was excluded after visual review because its preview contains multiple bystanders.
3. G0111/s05 was excluded after visual review because it contains a foreground metro crowd.
4. G0027/s01 remains excluded because of visible identity-card content.
5. E004–E011 stale references to deprecated `wave01-*-public-v3` manifests were removed.
6. Duplicate runtime-model recording instruction in E runs was removed.
7. Launch generator now requests GLM-5.3 for every PRODUCT_QUALITY E run.
8. Q001 was added to generated launch prompts.
9. Run-contract fail-closed validation was added.
10. Wave v4 bundle verifier was strengthened to check exact pack counts and bundle totals.
11. Actual-transport contact-sheet generation was added for pixel-level QA.
12. Astra R001 is explicitly parallel architecture hardening, not a blocker for the founder-authorized current exploration wave.

---

## 18. Remaining pre-launch blockers

Only operational Wave v4 work remains before E004–E011 + Q001 launch:

1. pull current public lab;
2. regenerate exact curated local pack manifests;
3. confirm A39 / B42 / C33 / D36;
4. build sanitized Wave v4 bundle from local 156-item clean master;
5. run verifier;
6. build actual-transport review atlas;
7. inspect every transported tile/poster;
8. run run-contract validator;
9. run public-lab audit;
10. commit/push only sanitized transport + manifests/docs intended for the wave;
11. mark run specs READY;
12. make final text-only freeze commit;
13. record full 40-char SHA;
14. generate launch prompts;
15. launch E004–E011 + Q001 independently.

Astra R001 and P001–P004 may continue in parallel.

---

## 19. After tomorrow's results

For every candidate:

1. verify ZIP SHA/freshness;
2. inspect source tree, not founder report;
3. inspect run manifest and source reconciliation;
4. run tests/build where possible;
5. inspect domain/application separation;
6. inspect LIVE/MOCK truth;
7. inspect graph/use-case parity;
8. inspect screenshots at required breakpoints;
9. inspect EN/RU;
10. inspect media provenance;
11. inspect MCP;
12. inspect persistence/auth/security boundaries;
13. extract strong modules/patterns;
14. do not select solely on aesthetics.

Then reconcile candidate evidence + Astra A1–A6 decisions into Architecture V4 and launch the next refinement wave.
