# BM01 — Influencer OS Architecture & Wave Compiler Benchmark

Status: PUBLIC READ-ONLY BENCHMARK MISSION
Date: 2026-09-30

## 0. Purpose

This mission is simultaneously:

1. a real architecture/preimplementation deliverable for Influencer OS;
2. an independent red-team of the public W001 foundation;
3. a design exercise for W002–W004;
4. a compiler for two future browser-worker waves;
5. a controlled benchmark of high-end reasoning agents.

You are expected to do difficult, autonomous work.
Do not optimize for brevity.
Do not fill space with generic advice.

The useful output is a concrete, evidence-backed architecture package that can
be checked by another architect and converted into future implementation work.

You are NOT allowed to modify product code or claim product acceptance.

---

# 1. Immutable evidence base

Public repository:

`tswetc/influencer-os-site-v2.1-zai-browser-experiment`

PRODUCT SOURCE AUTHORITY:

`91aebb3bdd903fcd08f6004108c93b829eb54ce2`

That commit is the W001 public construction input.

The benchmark mission itself may live on a later benchmark branch/commit.
Do NOT treat benchmark metadata as product source.

All conclusions about current product/W001 behavior must be grounded in
`91aebb3bdd903fcd08f6004108c93b829eb54ce2`.

Do not silently substitute:
- current main;
- a newer branch tip;
- an unpublished private repository;
- memory from another conversation.

If GitHub access cannot prove the exact source commit:
STOP with `BLOCKED_SOURCE_AUTHORITY`.

---

# 2. Evidence boundary

You have public evidence only.

You do NOT have authority over private central governance, private canonical
integration state, returned unpublished worker artifacts or founder decisions
that are not in the public source.

Use these labels throughout:

- `SOURCE_FACT`
- `EXTERNAL_FACT`
- `DERIVED_INFERENCE`
- `ARCHITECTURE_RISK`
- `PROPOSAL`
- `UNKNOWN`

Never turn a public-source inference into a claim about private current state.

---

# 3. Source coverage gate

Before architecture work, prove what you actually inspected.

At the source authority, inventory the complete Git tree.

Expected scale is roughly:
- ~219 total files;
- ~35 `.w001/**` files;
- ~184 product files.

Recompute these counts yourself.

Read completely:
- all `.w001/**` text/JSON files;
- all architecture/contract/mission/packet files;
- all files under `lib/osv3/**`;
- all tests under `tests/osv3/**`;
- legacy source directly referenced by W001 contracts/missions;
- package/build/type configuration;
- relevant storage/provider/engine/bundle/scene types;
- README/AGENTS/docs architecture material.

Inventory the rest.

Do not claim line-by-line whole-repository review if you did not do it.

If meaningful directories are inaccessible, mark:
`PARTIAL_REPOSITORY_COVERAGE`
and state exactly what is missing.

---

# 4. First deliverable — reconstruct the real system

Reconstruct the architecture from source, not from marketing prose.

Explain at least:

## Current legacy system
- current application/runtime boundary;
- current CharacterPassport/Canon;
- Worlds/Techniques/Scenes;
- existing deterministic compiler/build path;
- storage/backup/import/export;
- engine/provider seams;
- current UI orchestration;
- self-check/golden behavior.

## W001 foundation
- revision infrastructure;
- Character compatibility;
- Product;
- Place;
- Performance/Scene;
- Taste;
- model capability / route semantics;
- ApplicationCommand / PromptBuild;
- workflow contract;
- Q01/Q02/R02 roles.

Build:
- module dependency graph;
- semantic dependency graph;
- data/provenance flow;
- current vs proposed boundary map.

Explicitly distinguish:

`LEGACY_CURRENT`
`W001_FROZEN_FOUNDATION`
`W001_LANE_RESPONSIBILITY`
`FUTURE_W002_PLUS`

---

# 5. Second deliverable — independent W001 risk verification

Do NOT assume any previous reviewer was correct.

Independently attack these risk classes from source:

1. composition-wide capability limits;
2. reference counts and multi-character semantics;
3. LOCK path vocabulary and capability matching;
4. deterministic JSON canonicalization and hash identity;
5. prototype-like / Unicode / key-order edge cases;
6. application command vocabulary;
7. Guided/Graph semantic symmetry;
8. legacy generation orchestration vs pure PromptBuild boundary;
9. timezone/locale dependence in deterministic/golden behavior;
10. backup/import/revision provenance;
11. mutable provider aliases leaking into historical identity;
12. security/hostile input boundaries.

For every material finding provide:

- ID;
- severity P0/P1/P2/P3;
- confidence;
- exact source path(s);
- exact symbol/contract;
- concrete failure mechanism;
- minimal reproducer or counterexample;
- strongest argument that the finding is wrong;
- falsification attempt;
- surviving conclusion;
- minimal correction;
- blast radius.

Do not inflate severity.
A finding that does not survive falsification should be downgraded or deleted.

---

# 6. Third deliverable — define the W001 → W002 semantic freeze

Determine exactly what MUST be frozen before server-canonical persistence can
safely make it durable.

Design concrete candidate contracts for:

## Identity
- root IDs;
- revision IDs;
- lineage;
- legacy imported identity;
- UNKNOWN provenance;
- merge/remap identity.

## Continuity lock grammar
Create a machine-readable, type-qualified path grammar for:
- Character;
- Product;
- Place;
- Performance;
- Scene;
- Taste.

Define:
- LOCK;
- HOLD;
- FLEX;
- FREE;
- EXCLUDE;
- wildcard rules;
- normalization;
- unsupported capability behavior;
- versioning.

Give examples and hostile examples.

## Deterministic canonicalization
Specify:
- canonical JSON algorithm;
- Unicode ordering;
- numbers;
- -0;
- arrays;
- own `__proto__`;
- unsupported JS values;
- normalization policy;
- version identity.

Produce at least 15 discriminating test vectors.

## Application command vocabulary
Design the minimum shared command catalog that can later serve:
- Guided Studios;
- Expert Graph;
- Web;
- API;
- MCP.

Include a candidate `GenerationIntent` / equivalent if justified.

Do NOT design a giant public API.
Freeze the semantic application boundary only.

---

# 7. Fourth deliverable — W002 persistence architecture

Design a concrete candidate W002 architecture.

Constraints:
- preserve legacy behavior;
- no big-bang rewrite;
- persistent semantic continuity must outlive provider/model changes;
- migration must be staged and reversible where possible.

Compare at least:

A. server-canonical modular monolith;
B. local-first replicated/offline architecture;
C. event-sourced or event-heavy architecture;
D. a pragmatic hybrid.

Then produce your preferred candidate as an executable-level design.

Required artifacts inside the document:

## Data model
Draft tables/entities/relations for at least:
- Workspace / Project;
- continuity roots;
- continuity revisions;
- reference bindings;
- Scene revisions;
- Taste revisions;
- PromptBuild;
- model profile / provider deployment / adapter version / ModelRoute;
- GenerationJob / GenerationAttempt;
- Asset / AssetVersion;
- lineage edges;
- approvals/evaluations;
- import/migration records.

Use SQL-like DDL or equivalent precise schema.

Specify:
- primary keys;
- unique constraints;
- foreign keys;
- immutable fields;
- mutable fields;
- optimistic concurrency;
- indexes;
- tenant/workspace boundary.

## Migration
Design:
- local legacy discovery;
- import plan;
- dry-run;
- identity remap;
- Date.now-style legacy ID collision handling;
- backup before cutover;
- schema version;
- per-project authority cutover;
- rollback boundary;
- mixed-version handling;
- import idempotency;
- corrupted/partial backup behavior.

Write a migration FSM.

## Offline
State exactly what "offline" means.
Do not promise full offline collaboration unless architecture supports it.

---

# 8. Fifth deliverable — W003 durable execution/provider runtime

Design the provider-neutral paid/nondeterministic execution layer.

Required state-machine analysis:

- CREATED;
- VALIDATING;
- BLOCKED;
- READY;
- DISPATCHING;
- SUBMISSION_UNKNOWN;
- SUBMITTED;
- QUEUED;
- RUNNING;
- SUCCEEDED;
- FAILED;
- CANCEL_REQUESTED;
- CANCELLED;
- EXPIRED;
- LOST / RECONCILIATION_REQUIRED where justified.

You may choose different names, but every ambiguous network/provider case must
have an explicit state.

Design:

## Idempotency
- client command identity;
- job identity;
- attempt identity;
- provider request identity;
- duplicate submit defense;
- ambiguous timeout after submit;
- retry ownership.

## Transport
- DispatchOutbox;
- ProviderEventInbox;
- polling reconciliation;
- webhook replay/deduplication;
- event ordering;
- provider-specific adapter.

## Provider truth
Separate:
- semantic ModelProfile;
- ProviderDeployment;
- AdapterVersion;
- ModelRoute;
- strategy;
- mutable provider alias.

Define historical immutability.

## Budget/cost
Specify where budget gates occur so LOCK/capability failure happens before paid
execution.

## Secrets
Compare:
- BYOK;
- managed credentials;
- browser-side;
- server-side;
- secret references.

Do not put secrets into persistent semantic objects.

## Assets
Handle:
- expiring provider URLs;
- bytes-first ingestion;
- checksums;
- MIME/type;
- derivative edits;
- partial success;
- provider deletion.

Use current OFFICIAL provider/API documentation where mutable provider facts are
important.
Cite every such fact.

---

# 9. Sixth deliverable — W004 application/workflow/API/MCP symmetry

Design the shared execution semantics so these do NOT become separate products:

- Guided Studio;
- Expert Workflow Graph;
- Web UI;
- API;
- MCP;
- agent/automation surface.

Define:

## Application core
- command registry;
- command versioning;
- validation;
- authorization;
- policy;
- transaction boundary;
- long-running command return semantics;
- idempotency.

## Workflow graph
Typed DAG semantics for:
- continuity sources;
- references;
- semantic transforms;
- PromptBuild;
- generation intent;
- generation/edit;
- branch;
- map/batch;
- approval;
- wait/poll;
- compare/eval;
- capability gate;
- cost gate;
- asset save/export;
- subworkflow.

Specify:
- node identity;
- edge type compatibility;
- graph revision identity;
- cycle policy;
- partial rerun;
- cache policy;
- deterministic vs nondeterministic nodes;
- approval tokens;
- waiting tokens;
- failure propagation.

## Guided ↔ Graph
Show how one Guided Studio action maps to the same graph/application semantics.

## HTTP/API/MCP parity
Create a parity matrix:
same command -> same validation -> same authorization -> same result semantics.

Prevent:
- UI-only business logic;
- Graph-only business logic;
- MCP bypasses;
- API-specific semantic forks.

## Security
Include:
- SSRF;
- authn/authz;
- tenant isolation;
- secret exposure;
- external URL ingestion;
- tool-call capability boundaries.

---

# 10. Seventh deliverable — lineage, observability and evaluation

Create the provenance chain:

Project
→ entity root/revision
→ Scene/Taste
→ PromptBuild
→ ModelRoute
→ GenerationJob
→ Attempt
→ provider request/event
→ Asset
→ AssetVersion
→ evaluation/approval
→ export

For every edge define:
- identity;
- provenance;
- mutability;
- failure representation.

Design observability sufficient to answer:

- why was this model selected?
- what exact continuity revision was used?
- what did the provider actually receive?
- was money potentially spent twice?
- where did this asset come from?
- why did a LOCK fail?
- which adapter version produced the request?
- which workflow revision triggered the run?

Do not propose logging secrets.

---

# 11. Eighth deliverable — counterfactual architectures

Construct at least three coherent whole-system alternatives.

At minimum:

1. conservative modular monolith;
2. server-canonical modular monolith + durable async runtime;
3. materially more distributed/event-driven architecture.

You may add a fourth if it is meaningfully distinct.

For each:
- component map;
- data ownership;
- failure modes;
- migration path from W001;
- operational complexity;
- reversibility;
- testability;
- cost;
- security;
- scale assumptions;
- strongest reason NOT to choose it;
- evidence that would change the decision.

Do not reward architectural complexity for its own sake.

---

# 12. Ninth deliverable — innovation lab

Propose 5–10 genuinely useful architectural/product mechanisms that are NOT
mere renamings of existing features.

For every idea:

- user/product benefit;
- architecture mechanism;
- interaction with continuity semantics;
- implementation cost;
- new risks;
- what evidence would falsify the value;
- whether it belongs in W002, W003, W004, W005 or later.

At least two ideas must aim to SIMPLIFY the system rather than add capability.

Avoid generic "use AI agent" proposals.

---

# 13. Tenth deliverable — compile TWO proposed future browser waves

These are CANDIDATE plans only.
They are NOT launch authority.

They must assume:
- a future accepted W001 integration checkpoint exists;
- each worker starts from one immutable INPUT_SHA;
- same-wave unpublished outputs cannot be prerequisites;
- workers have bounded WRITE_SET;
- shared contracts are frozen before launch;
- integration happens centrally afterward.

Create exactly:

## Proposed Wave A — W002 Core Persistence & Migration
10 worker missions.

## Proposed Wave B — W003/W004 Runtime & Surfaces
10 worker missions.

For each of the 20 missions specify:

- RUN_ID;
- title;
- objective;
- why this partition is independent;
- READ_SCOPE;
- WRITE_SET;
- forbidden paths;
- frozen contracts consumed;
- deliverables;
- required tests;
- hostile tests;
- acceptance gates;
- expected integration dependencies AFTER the wave;
- stop/block conditions;
- artifact handoff;
- what the worker must NOT decide.

Avoid write-scope overlaps inside each wave where practical.
Where overlap is unavoidable, explain why the mission should instead be moved
to another wave or converted into a central integration task.

Also provide:
- dependency DAG;
- integration order;
- overlap matrix;
- contract freeze checklist;
- candidate whole-wave acceptance matrix.

Do not invent worker timing/sleep instructions.

---

# 14. Eleventh deliverable — browser mission quality review

Red-team your own 20 missions.

Try to break them through:
- hidden same-wave dependency;
- overlapping WRITE_SET;
- shared type drift;
- insufficient read scope;
- irreversible migration ambiguity;
- test oracle gaps;
- provider facts changing between launch and integration;
- security ownership gaps;
- duplicated application semantics;
- "worker complete" but integrated product broken.

Revise the missions that fail.

Record original flaw and correction.

---

# 15. Twelfth deliverable — founder/central decision boundary

Separate decisions into:

## Engineering decision
Can be made from architecture/test evidence.

## Founder/product decision
Changes product scope, user behavior, business priority, UX intent, pricing,
publication or product taste.

## Experiment required
Evidence is insufficient; define the smallest experiment.

## Unknown/private-state dependent
Cannot be decided from public repo.

Do not escalate ordinary technical architecture choices to founder merely
because they are important.

---

# 16. External research discipline

Use external research selectively where it improves decisions.

For mutable current facts prefer:
- official provider documentation;
- official platform/API docs;
- primary engineering documentation;
- current dated sources.

Community sources may support failure modes, not authoritative API facts.

Every external factual statement must have:
- source;
- date/checked-at when relevant;
- what decision it supports.

Do not spend the mission producing a market-news report.

---

# 17. Self-attack

Before final output:

Select your 10 strongest conclusions.

For each:
1. write the strongest argument that it is wrong;
2. re-read the relevant source;
3. identify hidden assumptions;
4. attempt a counterexample;
5. downgrade/remove it if it does not survive.

Then review your preferred W002–W004 architecture as if you were the engineer
forced to maintain it alone for two years.

Find the top 10 maintenance regrets you would fear.

---

# 18. Required output package

Produce exactly these documents:

1. `00-EXECUTIVE-INDEX.md`
2. `01-SOURCE-COVERAGE.md`
3. `02-RECONSTRUCTED-ARCHITECTURE.md`
4. `03-W001-RISK-VERIFICATION.md`
5. `04-W001-TO-W002-SEMANTIC-FREEZE.md`
6. `05-W002-PERSISTENCE-MIGRATION.md`
7. `06-W003-EXECUTION-PROVIDER-RUNTIME.md`
8. `07-W004-APPLICATION-WORKFLOW-API-MCP.md`
9. `08-LINEAGE-OBSERVABILITY-EVALUATION.md`
10. `09-SECURITY-SECRETS-TENANCY.md`
11. `10-COUNTERFACTUAL-ARCHITECTURES.md`
12. `11-INNOVATION-LAB.md`
13. `12-WAVE-A-10-MISSIONS.md`
14. `13-WAVE-B-10-MISSIONS.md`
15. `14-WAVE-DAG-AND-ACCEPTANCE.md`
16. `15-FOUNDER-AND-CENTRAL-DECISIONS.md`
17. `16-FINDINGS-LEDGER.md`
18. `17-SELF-ATTACK.md`
19. `18-FINAL-SYNTHESIS.md`
20. `19-HANDOFF-MANIFEST.md`

## For Notion

Create one parent page:

`BM01 — Influencer OS Architecture & Wave Compiler`

Create the 20 documents above as child pages with the exact names.

The final founder export must be:
Markdown & CSV
with Include subpages enabled.

## For Z.ai browser

Create:

`/home/z/my-project/public/BM01-output/`

with the exact 20 files.

Then create:

`/home/z/my-project/public/BM01-output.zip`

containing only those 20 files.

If direct binary download is unavailable, preserve the directory in the task
file tree and provide per-file retrieval.

Do not push product or benchmark output to GitHub.

---

# 19. Handoff manifest requirements

`19-HANDOFF-MANIFEST.md` must contain:

- mission ID: BM01;
- agent/model name as reported by its environment;
- product source authority SHA;
- benchmark mission commit SHA;
- repository coverage counts;
- list of 20 output docs;
- byte/character count for each output if available;
- SHA256 for each output if the environment can compute it;
- external sources count;
- findings count by severity;
- proposed Wave A mission count = 10;
- proposed Wave B mission count = 10;
- unresolved UNKNOWN list;
- explicit statement:
  `NO_PRODUCT_CODE_MODIFIED`;
- explicit statement:
  `NO_CENTRAL_ACCEPTANCE_CLAIMED`.

Do not put the manifest's own SHA inside itself.

---

# 20. Quality bar

A successful answer is NOT:
- a generic roadmap;
- a summary of W001;
- a list of fashionable technologies;
- a competitor feature list;
- 20 shallow prompts;
- an untested preferred architecture.

A successful answer contains:
- source-grounded architecture reconstruction;
- reproduced/falsified risks;
- concrete schemas;
- concrete state machines;
- concrete invariants;
- concrete migration semantics;
- concrete security boundaries;
- two internally coherent worker waves;
- adversarial self-review;
- explicit unknowns;
- decisions that another engineering team could implement.

Do not pad.

---

# 21. Final chat response

Keep the final chat message short.

Return only:

- STATUS;
- source authority SHA verified;
- output package location;
- documents created count;
- strongest 5 conclusions;
- strongest 5 remaining uncertainties;
- P0/P1/P2/P3 counts;
- Wave A/Wave B mission counts;
- any blocker.

All substantive work belongs in the output package.

BEGIN.
