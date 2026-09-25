# Astra R001 — Fundamental Architecture Decision Packet

> **SUPERSEDED PRE-ASTRA DRAFT — DO NOT LAUNCH FROM THIS FILE**
>
> Current binding plan: `19-PRE-ASTRA-EXECUTION-PLAN-V2.md`.
> A1/A2/A5/A6 have since been closed centrally. The final Astra packet will be regenerated only after PRE_ASTRA_READY and must contain only the remaining irreducible knots.

Status: SUPERSEDED_DRAFT_NOT_FOR_LAUNCH
Mode: READ_ONLY
Target: GPT-6 Astra in Codex
Recommended reasoning: XHIGH
Date: 2026-09-25

## Why this packet exists

Influencer OS has outgrown the “site” framing. The target is one coherent platform with:

1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

The founder has already fixed the product direction:
- Character Passport + Canon are the identity foundation;
- guided Studios and a professional node-graph mode both exist;
- image and video generation are real product capabilities, not decorative demos;
- users may connect providers/APIs;
- the model roster evolves continuously;
- MCP is a real agent surface;
- EN/RU, media-rich public product experience and portability matter;
- browser Z.ai candidates are experimental inputs, not production truth.

The central architect has already closed routine architecture choices.
Astra is needed only for the few decisions where a wrong abstraction could force a conceptual rewrite or silently corrupt history, execution, security or migration.

Read the baseline before answering:
`10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`

Optional founder/product gap map:
`13-FOUNDER-ARCHITECTURE-GAP-MAP.md`

Use `14-ASTRA-R001-EVIDENCE-MAP.md` to avoid broad repository reading.

---

# A1 — ONE EXECUTION SUBSTRATE ACROSS STUDIOS, GRAPH, API AND MCP

This is the most important structural question.

The product has:
- direct/guided Studios;
- Expert Workflow Graph;
- HTTP API;
- MCP tools.

All must use the same core behavior, but it is not yet decided whether every execution should become a WorkflowRun internally.

Two bad outcomes must both be avoided:

1. **Everything-is-a-workflow over-generalization**
   - a one-click Image Studio action becomes artificial graph machinery;
   - simple product flows inherit unnecessary orchestration complexity.

2. **Two execution systems**
   - Studios create jobs directly;
   - Graph has its own execution semantics;
   - MCP/API drift between the two;
   - lineage/history/retry semantics diverge.

DECIDE ONE MODEL.

Specifically decide:
- whether a direct Studio generation creates only application command → PromptBuild → GenerationJob, or also an implicit WorkflowRun;
- whether Workflow nodes call ordinary application commands or a separate graph-specific runtime API;
- exact relationship between WorkflowRun, WorkflowNodeRun, GenerationJob and GenerationAttempt;
- “Run selected”, “Run downstream”, “Run all” semantics;
- partial rerun after an upstream node changes;
- reuse of unchanged upstream outputs;
- deterministic cache vs explicit reuse of paid/non-deterministic generations;
- manual approval gates;
- subworkflow version binding;
- how an MCP call maps into the same execution substrate;
- what the user sees in global History.

Require three worked traces:
1. one-click Image Studio generation;
2. a 6-node image→edit→video workflow with downstream rerun;
3. an MCP tool invoking the same capability.

The answer must optimize for semantic unity without forcing needless workflow ceremony.

---

# A2 — CREATIVE STATE, REVISION, PINNING, STALENESS AND REBASE

The founder wants an easy creator product, but the product must preserve exact character identity, canon and reproducibility.

The unresolved tension:
- creators expect “edit the character and keep working”;
- historical generations must never silently change meaning;
- Scenes/Plans/Workflows may depend on Character/Canon state;
- creating a formal immutable revision on every keystroke is unacceptable UX;
- silently following “latest” destroys forensic history.

DECIDE THE EXACT LIFECYCLE.

Cover:
- mutable editing Draft vs immutable committed Revision;
- what event creates CharacterRevision / CanonRevision / SceneRevision / PlanRevision / WorkflowRevision;
- whether downstream drafts may follow “current/latest” before execution;
- what is pinned at PromptBuild time;
- what becomes stale when Character or Canon changes;
- whether stale downstream objects auto-rebase, require explicit rebase, or create derived revisions;
- how the UI communicates stale/rebased/pinned state without exposing database jargon;
- whether CharacterRevision and CanonRevision remain separate first-class objects;
- which proposed revision types can be replaced by immutable embedded snapshots/hashes;
- how manual prompt edits are represented without breaking source canon or provenance;
- how a historical Asset can explain exactly which creative state produced it.

Require one worked timeline:
Character edit → Canon edit → existing Scene/Plan → regenerate one old Shot → create a new generation without corrupting the old one.

Primary objective:
**simple creator UX + immutable historical truth**.

---

# A3 — MODEL / PROVIDER / ADAPTER INTELLIGENCE LIFECYCLE

This is a product-specific architectural bottleneck.

Current OS23.6 source has a hardcoded six-route `EngineId` union and executable per-engine prompt logic in `lib/engines.ts`.

The founder explicitly wants the platform to continuously add current image/video models after:
- official provider research;
- independent real-user evidence;
- prompt-behavior research;
- product-specific testing.

We cannot keep treating each new market model as an ad-hoc hardcoded UI option, but we also must not flatten meaningful model differences into a fake universal schema.

DECIDE THE FUTURE MODEL SYSTEM.

Define the minimum correct separation between:
- product task/capability (image generate, image edit, image→video, text→video, lip-sync/dialogue, refinement, etc.);
- provider;
- external provider model/deployment/alias;
- stable ModelProfile identity;
- ModelProfileVersion/effective snapshot;
- executable EngineAdapterVersion;
- ProviderStrategySnapshot;
- capability constraints;
- model availability/status;
- research evidence;
- evaluation evidence.

Decide:
- what is DB/config data vs versioned executable code;
- whether new models can be added without a full product deploy and when they cannot;
- how provider aliases that silently change upstream are represented;
- how adapters bind to model/profile versions;
- how a WorkflowRevision binds models while still permitting an intentional “use current compatible model” mode;
- exact status lifecycle from discovery → experimental → validated/live → deprecated;
- rollback semantics;
- how a model update can be introduced without rewriting historical PromptBuilds.

The founder’s research requirement must become a real promotion pipeline, not prose:
research dossier → candidate profile/adapter → deterministic contract tests → product evals → human review → canary/live → rollback/deprecation.

Define the smallest useful eval architecture:
- golden Character/Canon/Scene set;
- engine-specific prompt checks;
- reference/identity consistency checks where measurable;
- output quality review;
- latency/cost/capability evidence;
- regression comparison against the currently-live profile.

Do not propose “just store a JSON capability matrix”.

---

# A4 — DURABLE GENERATION ORCHESTRATION, COST AND FAILURE SEMANTICS

The platform will perform expensive external image/video generations.
A duplicate provider request is not a harmless duplicate DB write.

Design exact semantics for:

application command
→ DB transaction
→ scheduling
→ GenerationJob
→ GenerationAttempt
→ provider dispatch
→ provider acceptance
→ webhook and/or polling
→ output ingestion
→ AssetVersion
→ lineage
→ quota/cost accounting
→ cancellation
→ retry/fallback
→ crash/restart.

DECIDE:
- transaction boundary;
- outbox/inbox requirements;
- at-least-once queue assumptions;
- provider-native idempotency when available;
- behavior when provider does NOT support idempotency;
- webhook deduplication;
- polling/webhook race;
- timeout vs late provider success;
- cancel vs provider success race;
- crash after provider accepted request but before local provider request ID is committed;
- aggregate GenerationJob status derivation;
- retry/fallback policy;
- cost reservation/finalization;
- BYOK versus platform-managed cost records;
- initial queue implementation: Postgres-native vs managed queue, with an extraction trigger.

Require at least FOUR failure timelines:
1. duplicate worker delivery;
2. crash after provider acceptance;
3. cancel races with late success;
4. fallback after ambiguous timeout.

The system must not silently double-spend, lose lineage or lie about completion.

---

# A5 — PRINCIPAL / WORKSPACE / MCP / API / PROVIDER-SECRET SECURITY MODEL

The target product supports:
- anonymous public demo;
- authenticated browser Creator App;
- normal HTTP API;
- remote MCP clients/agents;
- Workspaces/Projects;
- roles/membership;
- Entitlements;
- BYOK provider credentials;
- possible platform-managed provider credentials;
- background workers.

DECIDE ONE SECURITY/AUTHORIZATION MODEL.

Cover:
- Principal/User/session model;
- anonymous DemoSession boundary;
- WorkspaceMembership/Role authorization context;
- Entitlement check placement;
- API access tokens/scopes;
- remote MCP OAuth/token model using current MCP authorization patterns;
- how an MCP tool invokes the same application command as the web UI without bypass;
- ProviderConnection ownership modes:
  - user/workspace BYOK;
  - ephemeral session BYOK if supported;
  - platform-managed;
- secret encryption/storage;
- secret resolution at execution time;
- whether an agent can ever obtain a raw provider secret (expected: no);
- token/session revocation;
- worker/service identity;
- audit correlation;
- rate-limit/quota enforcement.

Current Web App stores `Settings.apiKey` in browser persistence and can optionally export it. That behavior MUST NOT simply migrate into the hosted platform.

Do not invent a custom auth protocol.

---

# A6 — REVERSIBLE MIGRATION FROM CURRENT LOCAL-FIRST WEB APP TO THE PLATFORM

We are not building greenfield.

Current private Web App already has tested behavior around:
- localStorage + IndexedDB;
- Character Passport;
- Passport versions;
- Scenes/History/Favorites/Presets/UserDict;
- backup/import validation and merge/replace;
- optional backup API key;
- provider switching and key clearing;
- prompt compilation;
- self-check;
- current engine rules;
- license/entitlement behavior.

Target architecture adds:
Workspace/Project ownership, server durability, async workers, object storage, real generation, MCP/API and the new model lifecycle.

Design a reversible migration sequence.

DECIDE:
- first anti-corruption/application-service seam;
- what existing UI/code can remain unchanged initially;
- how legacy local data maps into Workspace/Project;
- whether the hosted product remains “local-first”, or local storage becomes cache/draft/portability only;
- how old backups import into the new schema;
- how current provider keys are handled (default: never silently upload them);
- when authentication becomes mandatory;
- when server persistence becomes canonical;
- when object storage and workers appear;
- when dynamic Model Registry/Adapter lifecycle replaces the hardcoded EngineId approach;
- how to keep current OS23.6 behavior parity during each phase;
- rollback at every phase;
- which pieces should be rewritten rather than migrated.

Also define the promotion seam from a selected browser Z.ai candidate:
what design/UI/interaction/code can be promoted without letting experimental browser architecture replace the canonical product core.

Avoid:
- big-bang rewrite;
- permanent dual local/cloud architecture;
- blind whole-candidate merge.

---

# Output contract

Produce exactly one artifact:

`ASTRA-R001-DECISIONS.md`

For A1–A6:

1. **DECISION** — one recommended architecture.
2. **WHY THIS IS THE RIGHT ABSTRACTION** — concise, product-specific.
3. **EXACT SEMANTICS** — state model/interfaces/sequence as needed.
4. **FAILURE TESTS** — concrete timelines/invariants.
5. **SCHEMA / CONTRACT DELTA** — exact objects/fields/interfaces to add/change/remove.
6. **MIGRATION CONSEQUENCE** — if applicable.
7. **WHAT NOT TO GENERALIZE YET**.
8. **CONFIDENCE** — HIGH / MEDIUM / LOW.
9. **RESIDUAL QUESTION** — only if genuinely unresolved.

Finish with:
- `TOP_5_ARCHITECTURE_DECISIONS`
- `ADR_CHANGES_REQUIRED`
- `TOP_5_IMPLEMENTATION_RISKS`
- `BLOCKING_FOUNDER_QUESTIONS` — only real product decisions; otherwise NONE.

## Operating constraints

- READ-ONLY.
- Do not implement.
- Do not redesign visual direction.
- Do not review media packs.
- Do not score GLM runs.
- Do not restate OS23.6 counts.
- Do not generate a generic SaaS/cloud architecture essay.
- Do not ask the founder to choose databases, queue semantics, OAuth plumbing, revision objects or package boundaries.
- Use progressive disclosure.
- If a support file is sufficient, stop reading.
- If evidence is missing, state the minimum missing evidence, decide everything independent of it, and continue.
