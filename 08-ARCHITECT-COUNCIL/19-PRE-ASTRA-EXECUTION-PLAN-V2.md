# Pre-Astra Execution Plan V2 — Exact Gates

Date: 2026-09-25
Status: ACTIVE_BINDING_PLAN
Owner: Central Architect
Founder role: product intent / UX / final acceptance
Astra: BLOCKED until Gate G8

This document turns the pre-Astra program into explicit tasks with binary acceptance criteria.

## Rule 0 — No ambiguous completion

A task is COMPLETE only when every acceptance criterion under it is true.

Allowed task states:
- TODO
- IN_PROGRESS
- BLOCKED_EXTERNAL
- COMPLETE
- SUPERSEDED

No "mostly done".

## Rule 1 — Authority

For NEW work:
1. current founder decision;
2. current public supersession;
3. current central architecture contracts;
4. current private product behavior evidence;
5. verified OS23.6 source;
6. historical site ancestry;
7. external references/research.

Historical pinned P001–P004 retain their original inputs.

## Rule 2 — Safety

Never:
- commit local master media/library;
- commit local SSD/source paths;
- upload legacy provider API keys;
- rewrite pinned historical commits;
- launch official E004–E011/Q001 before Architecture V4;
- silently promote a browser candidate to canonical code.

---

# G0 — Repository and authority lock

State: COMPLETE

Required:
- [x] public lab HEAD known;
- [x] canonical private OS HEAD known;
- [x] Site V2 frozen HEAD known;
- [x] Site V2.1 observed HEAD known;
- [x] 2026-09-25 founder decision exists;
- [x] 2026-09-25 public supersession exists;
- [x] START-HERE routes new work to current authority;
- [x] Astra launch explicitly blocked;
- [x] E wave explicitly paused.

Evidence:
- PRE-ASTRA-AUTHORITY-SNAPSHOT.md
- FOUNDER-DECISIONS-2026-09-25-CURRENT.md
- PUBLIC-CANON-SUPERSESSION-2026-09-25.md

---

# G1 — Current product/source behavior audit

State: COMPLETE

Acceptance:
- [x] current local-first persistence behavior recorded;
- [x] Character/Canon/Scene/Prompt mechanics recorded;
- [x] provider switching and browser BYOK behavior recorded;
- [x] import/export/version semantics recorded;
- [x] license/entitlement behavior recorded;
- [x] self-check/i18n/edge-case behavior recorded;
- [x] target extensions are distinguished from current source behavior.

Evidence:
- PRE-ASTRA-SOURCE-BEHAVIOR-MATRIX.md
- CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md

---

# G2 — Central architecture closure

State: COMPLETE

## G2.1 Execution substrate

State: COMPLETE

Decision:
application commands/use cases are primitive.
Workflow is orchestration over the same commands.
Ordinary Studio actions do not create implicit WorkflowRuns.

Acceptance:
- [x] one shared command layer;
- [x] explicit WorkflowRun only for actual graph/workflow execution;
- [x] direct Studio/API/MCP correlation via ExecutionContext;
- [x] rerun/reuse semantics recorded;
- [x] paid generation never silently memoized.

## G2.2 Creative revision semantics

State: COMPLETE

Decision:
mutable drafts + immutable explicit/execution checkpoint revisions.

Acceptance:
- [x] exact execution revision binding;
- [x] no historical latest/current dependency;
- [x] no in-place historical rebase;
- [x] CharacterRevision and CanonRevision stay separate;
- [x] manual prompt edit creates derived PromptBuild;
- [x] no ShotRevision in v1 unless later evidence requires it.

## G2.3 Model/provider/adapter lifecycle

State: COMPLETE

Decision:
separate semantic model/profile identity from provider transport routing.

ModelProfileRevision is provider-route independent.
ProviderDeployment + ProviderAdapterVersion are joined to it by immutable ModelRoute.
GenerationStrategy selects routes.
GenerationAttempt pins exact ModelRoute + ModelDeploymentSnapshot.
Mutable alias drift creates new verification/evidence and never rewrites history.

Evidence:
`K1-MODEL-ROUTE-DECISION.md`.

Acceptance:
- [x] one diagram/object map with no overloaded entity;
- [x] code-vs-config boundary specified;
- [x] one promotion state machine;
- [x] one rollback rule;
- [x] exact historical pinning fields;
- [x] alias drift behavior;
- [x] no fake universal provider DSL.

## G2.4 Paid generation durability

State: COMPLETE FOR CURRENT BYOK-FIRST MILESTONE

Accepted:
- Job vs Attempt;
- DB transaction + DispatchOutbox;
- leased/idempotent worker;
- provider idempotency/lookup where available;
- ProviderEventInbox reducer for webhook/poll races;
- cancellation/late success truth;
- SUBMISSION_UNKNOWN for irreducible submit ambiguity;
- no automatic retry/fallback from SUBMISSION_UNKNOWN;
- provider success distinct from output materialization;
- durable BudgetReservation + CostExposure;
- route submission-safety classes;
- BYOK-first milestone;
- PLATFORM_MANAGED execution forbidden on NON_RECONCILABLE_SUBMIT routes;
- separate future financial-ledger ADR before managed user credits.

Evidence:
`K2-AMBIGUOUS-SUBMISSION-ANALYSIS.md`
`K2-BILLING-SAFETY-DECISION.md`.

Acceptance:
- [x] state machine written;
- [x] every transition has idempotency rule;
- [x] ambiguous submission has explicit policy;
- [x] no automatic duplicate-cost path;
- [x] cancel/late-result behavior specified;
- [x] fallback blocked while previous billing/execution is uncertain;
- [x] output retrieval failure is distinct from provider failure;
- [x] current milestone cost/billing safety boundary is explicit.
## G2.5 Auth / MCP / provider secret boundary

State: COMPLETE

Must decide:
- human browser auth;
- API auth;
- MCP HTTP auth;
- worker identity;
- Workspace membership authorization;
- Entitlement;
- ProviderConnection ownership modes;
- secret storage and resolution;
- legacy direct-BYOK compatibility.

Acceptance:
- [x] no access token in browser localStorage;
- [x] MCP is resource server, not custom IdP;
- [x] audience/scopes + object-level authorization;
- [x] tool handler cannot bypass application authorization;
- [x] provider secrets never enter MCP payloads or ordinary exports/logs;
- [x] worker never persists user's bearer token;
- [x] revocation semantics;
- [x] legacy local key migration rule.

## G2.6 Migration sequence

State: COMPLETE

Must decide:
- anti-corruption seam;
- local export/import bridge;
- account/workspace introduction;
- per-project authority transition;
- provider-key reconnect;
- worker/job introduction;
- model-registry transition;
- graph/MCP introduction;
- rollback criteria;
- final retirement criteria.

Acceptance:
- [x] no big-bang rewrite;
- [x] no indefinite dual-write;
- [x] one canonical authority per project at a time;
- [x] failed migration leaves local source untouched;
- [x] migration plan is dry-run/fail-closed;
- [x] provider keys are never migrated silently;
- [x] rollback/kill-switch exists at every phase;
- [x] current tests define parity gates.

Gate G2: PASS. No unresolved routine/core architecture decision remains for the stated milestone. Astra will later be used for adversarial falsification, not greenfield completion.

---

# G3 — Local media / Wave v4 transport

State: BLOCKED_EXTERNAL until founder runs local commands on SSD

Current local state observed from founder terminal:
- 04-MEDIA/library/ exists locally;
- master-v1.json exists locally;
- old v1 run manifests exist locally;
- these are private/local working material and must remain uncommitted.

Exact procedure:
1. regenerate v3-curated A/B/C/D from current master;
2. confirm A39/B42/C33/D36;
3. build sanitized public Wave v4 bundle;
4. verify hashes/counts/path sanitization;
5. build review atlas from actual sanitized files;
6. visually inspect every tile/poster;
7. only then commit approved transport.

Acceptance:
- [ ] A=39;
- [ ] B=42;
- [ ] C=33;
- [ ] D=36;
- [ ] forbidden G0027/s01 absent;
- [ ] forbidden G0068/s06 absent;
- [ ] forbidden G0111/s05 absent;
- [ ] source paths absent from public manifests;
- [ ] metadata stripped;
- [ ] every public asset <100 MB;
- [ ] review atlas fully inspected;
- [ ] verify_public_wave PASS;
- [ ] audit_public_lab PASS.

Important:
G3 completion prepares transport only. It does NOT authorize E-wave launch.

---

# G4 — P001–P004 evidence ingestion

State: WAITING_EXTERNAL_RESULTS

For each pilot P00X:
1. archive original ZIP unchanged;
2. SHA-256;
3. record actual UI model label;
4. inspect tree;
5. run build/lint/test if possible;
6. inspect architecture, persistence, generation truth, graph, MCP, i18n, responsive, media;
7. write forensic audit;
8. extract only architecture-relevant evidence.

Acceptance per run:
- [ ] immutable ZIP recorded;
- [ ] checksum recorded;
- [ ] runtime recorded;
- [ ] source inspected;
- [ ] build/test evidence recorded;
- [ ] misleading LIVE/MOCK claims identified;
- [ ] architecture evidence extracted;
- [ ] no candidate promoted automatically.

Combined output:
P001-P004-ARCHITECTURE-EVIDENCE.md

Do not block Astra for a still-running pilot unless its expected evidence can materially change the remaining open knots.

---

# G5 — Public history/privacy strategy

State: COMPLETE

Problem:
current active tree is neutral-ID only, but old public Git history may contain obsolete inferred identity text.

Constraint:
cannot rewrite history required by pinned P001–P004.

Decision:
keep the current lab as historical/pinned experiment history and create a NEW clean-history public bridge for the official post-Astra E-wave.

Evidence:
`00-GOVERNANCE/PUBLIC-BRIDGE-PRIVACY-DECISION.md`

Acceptance:
- [x] strategy document exists;
- [x] old pinned pilots remain fetchable;
- [x] new official bridge strategy uses a clean-history repository/root and does not inherit legacy Git history;
- [x] no secrets/private source introduced by the strategy.

---

# G6 — Pre-Astra synthesis

State: TODO

Create exactly:
- PRE-ASTRA-EXECUTIVE-SNAPSHOT.md
- PRE-ASTRA-SOURCE-BEHAVIOR-MATRIX.md
- PRE-ASTRA-ARCHITECTURE-DELTA-MAP.md
- PRE-ASTRA-OPEN-KNOTS-FINAL.md
- PRE-ASTRA-EVIDENCE-ROUTER.md
- updated ADR register
- updated nonnegotiables
- updated project memory

Acceptance:
- [ ] no long chat transcript;
- [ ] no irrelevant visual reference detail;
- [ ] no duplicated source facts;
- [ ] solved questions removed;
- [ ] every open question names the exact decision to make;
- [ ] every open question lists evidence needed;
- [ ] every private source path is exact.

---

# G7 — Pre-Astra audits

State: TODO

## G7A Structural audit

PASS only when:
- [ ] all required files exist;
- [ ] all internal paths resolve;
- [ ] referenced SHAs are exact;
- [ ] no current authority points to 2026-09-24 launch strategy;
- [ ] no old Astra A1/A2 scope remains in active launch routing;
- [ ] E/Q cannot be launched accidentally;
- [ ] local/private media patterns are ignored by Git.

## G7B Semantic/adversarial audit

Try to break:
- model identity under mutable provider aliases;
- adapter/version drift;
- duplicate paid submissions;
- webhook/poll races;
- cancel/late-success races;
- worker crash after provider acceptance;
- MCP confused-deputy/object access;
- secret leakage;
- local→server migration divergence;
- old generation historical meaning;
- whole-candidate promotion contamination.

PASS only when every case has an explicit safe behavior or is isolated as an Astra question.

---

# G8 — Immutable Astra freeze

State: TODO

Prerequisite:
G0–G7 PASS.

Procedure:
1. commit only intended evidence;
2. push;
3. verify remote head;
4. verify clean tree;
5. record one full 40-character SHA;
6. do not mutate Astra input;
7. generate one targeted Astra prompt.

Acceptance:
- [ ] PRE_ASTRA_READY;
- [ ] immutable SHA recorded;
- [ ] Astra question count minimized;
- [ ] no open routine implementation question in Astra prompt.

---

# G9 — Astra R001

State: BLOCKED

Target:
GPT-6 Astra / XHIGH.

Astra performs targeted adversarial review of the accepted architecture. It tries to falsify invariants with concrete failure cases and proposes deltas only where a real contradiction or materially safer/simpler design exists.
It does not design UI, curate media, rank GLM candidates or implement the product.

---

# G10 — Architecture V4

State: BLOCKED

After Astra:
- preserve raw Astra output;
- compare against central baseline + source + pilot evidence;
- KEEP / CHANGE / REJECT / FOUNDER_DECISION / NEEDS_EVIDENCE;
- promote accepted deltas only;
- publish Architecture V4;
- regenerate run contracts.

---

# G11 — Official E-wave

State: BLOCKED

Only after Architecture V4:
- freeze sanitized Wave v4 media + Architecture V4;
- generate commit-pinned launch prompts;
- run E004–E011 + Q001 in isolated chats;
- forensic audit every result;
- promote bounded units only.
