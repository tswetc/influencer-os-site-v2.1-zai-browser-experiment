# W001 — OS23.7 Continuity Foundation Integration

Date: 2026-09-26
Status: PRELAUNCH__PRODUCTION_BUILD_WAVE__CONSTRUCTION_SNAPSHOT_REQUIRED

## Why this is the first production wave

C0 is closed with 11 analyzed lanes and R02 not recovered.

Founder directed immediate transition to large product development.

The current canonical app remains:
`tswetc/influencer-os@1158007fdaefd823e24d7a38d4fa7258814b541c`.

The accepted OS23.7 continuity candidate exists only in central-memory as a non-canonical executable overlay.

W001 therefore performs the first real compatibility-preserving product evolution:
**integrate the generalized continuity foundation around OS23.6 without breaking current behavior.**

This is not a redesign of the current UI and not a server-canonical migration yet.

## Product objective

At W001 exit the canonical candidate should have:

- shared continuity/revision foundation;
- conservative Character compatibility path;
- Product/Object domain;
- Place/Environment domain;
- Motion/Performance + Scene binding domain;
- first-class Taste domain separate from identity;
- provider-neutral model/capability contract;
- immutable PromptBuild/application provenance primitives;
- deterministic persistence/migration contracts;
- Guided/Graph shared workflow semantics foundation;
- OS23.6 regression/golden harness;
- security/adversarial coverage.

Existing OS23.6 behavior remains unchanged when new functionality is unused.

## Non-goals

W001 does NOT:
- redesign the whole UI;
- launch server-canonical storage;
- implement provider billing/execution;
- migrate all local user data;
- remove existing CharacterPassport;
- delete hardcoded EngineId compatibility;
- rewrite the 720px Studio;
- publish a release;
- modify production deployment;
- run real paid model generations.

## Construction base

Trusted private base:
`tswetc/influencer-os@1158007fdaefd823e24d7a38d4fa7258814b541c`.

The browser-visible construction snapshot is minted locally by ZCode.

It may contain a seed commit on top of the canonical base that introduces the already-reviewed OS23.7 foundation under:

`lib/osv3/foundation/**`

Seed source:
- central-memory/os23.7/source-overlay/lib/continuity.ts;
- taste.ts;
- legacy-adapter.ts;
- adapted baseline tests.

The seed commit is part of W001 integration provenance but is NOT canonical until final integration/promotion.

## Seed invariants

Construction publisher must verify before browser launch:

- current canonical baseline tests pass;
- baseline self-check assertions remain pass;
- typecheck pass;
- production build pass;
- adapted OS23.7 foundation tests pass;
- no current user-facing behavior intentionally changes;
- no secret/private config in snapshot;
- exact construction SHA frozen;
- context packet compiled from current central authority.

## Wave shape

12 slots:

- A01–A08 — real implementation;
- Q01–Q02 — regression/security implementation;
- R01–R02 — workflow/integration foundation and recomposition harness.

Models:
- A01–A08: GLM 5.3 Flash;
- Q01–Q02: GLM 5.3 Flash;
- R01: GLM 5.3 Flash;
- R02: GLM 5.3 non-Flash where available.

## Shared worker contract

Every worker:

1. starts from exact W001 construction SHA;
2. reads W001 context packet;
3. may read within declared READ_SCOPE;
4. may write only declared WRITE_SET;
5. uses no GitHub write credential;
6. makes incremental local commits;
7. preserves current OS23.6 behavior;
8. does not depend on unpublished same-wave peers;
9. follows long-mission phases:
   implementation → tests → adversarial review → remediation → edge/fuzz → integration-risk review → cleanup → repeated verification → final freeze;
10. returns compact artifacts through current handoff/inbox mechanism;
11. cannot claim central acceptance.

## Shared implementation principles

- no big-bang rewrite;
- current CharacterPassport remains valid;
- drafts vs immutable revisions remain distinct;
- Taste is separate from identity;
- provider/model IDs do not become continuity identity;
- semantic LOCK capability failures are fail-closed;
- legacy provenance stays honestly partial;
- Guided Studio and Expert Graph share application semantics;
- deterministic transforms may cache; paid/nondeterministic execution semantics remain explicit;
- no secrets/provider keys in new domain state.

## W001 lane ownership

### A01 — Revision / Continuity Runtime

WRITE_SET:
- `lib/osv3/revisions/**`;
- `tests/osv3/revisions/**`.

Mission:
implement stable roots, mutable draft helpers, immutable revision metadata, deterministic validation/normalization, revision ancestry/base semantics and reusable conflict primitives around the frozen foundation contract.

Must not modify foundation seed API.

### A02 — Character Compatibility

WRITE_SET:
- `lib/osv3/character/**`;
- `tests/osv3/character/**`.

Mission:
build conservative CharacterPassport compatibility, migration plan/preview primitives, legacy reference materialization states and Character continuity revision helpers without inventing biometrics/provenance.

### A03 — Product/Object Domain

WRITE_SET:
- `lib/osv3/product/**`;
- `tests/osv3/product/**`.

Mission:
implement ProductPassport validation, geometry/material/surface/marking/variant/state semantics, lock policy and reference coverage helpers.

### A04 — Place/Environment Domain

WRITE_SET:
- `lib/osv3/place/**`;
- `tests/osv3/place/**`.

Mission:
implement PlacePassport validation, topology/anchors/materials/permanent light semantics, spatial reference coverage and continuity locks.

### A05 — Performance + Scene Domain

WRITE_SET:
- `lib/osv3/performance/**`;
- `lib/osv3/scene/**`;
- `tests/osv3/performance/**`;
- `tests/osv3/scene/**`.

Mission:
formalize PerformancePassport/action phases/contact constraints and additive Scene bindings for character/product/place/performance/taste while preserving legacy SceneSpec semantics.

### A06 — Taste Domain

WRITE_SET:
- `lib/osv3/taste/**`;
- `tests/osv3/taste/**`.

Mission:
build Taste Profile/Revision mechanics, evidence linkage, anti-patterns, confidence validation and semantic identity-contamination guards without treating visual de-identification as solved.

### A07 — Model Capability / Route Semantics

WRITE_SET:
- `lib/osv3/model/**`;
- `tests/osv3/model/**`.

Mission:
build provider-neutral ModelProfileRevision, ProviderDeployment/AdapterVersion/ModelRoute contracts and capability matching around continuity locks/reference roles.

No real provider secrets or live billing.

### A08 — Application Core / PromptBuild Provenance

WRITE_SET:
- `lib/osv3/application/**`;
- `tests/osv3/application/**`.

Mission:
implement pure shared application command/result contracts, immutable PromptBuild snapshot/provenance types and explicit generation-intent boundary without executing paid jobs.

### Q01 — OS23.6 Golden Regression Harness

WRITE_SET:
- `tests/osv3/regression/**`;
- `tests/fixtures/osv3/**`.

Mission:
capture deterministic golden fixtures for inherited OS23.6 behavior:
Nano/Kling/Seedance/Veo/B-roll/Feed/Series/Shoot/Passport backup;
verify world/technique/pack/scene counts and old behavior when OS v3 additions are unused.

No product source modifications.

### Q02 — Domain Security / Migration Adversarial Harness

WRITE_SET:
- `tests/osv3/security/**`;
- `tests/fixtures/osv3-security/**`.

Mission:
adversarial tests for malformed imports, duplicate refs, unknown roles, LOCK/EXCLUDE conflicts, capability failures, Taste identity-role contamination, partial provenance, prototype pollution-like JSON shapes, oversized structures and secret/provider-field exclusion.

No product source modifications.

### R01 — Guided / Expert Shared Workflow Contract

WRITE_SET:
- `lib/osv3/workflow/**`;
- `tests/osv3/workflow/**`.

Mission:
define typed workflow recipe/node contracts that invoke the same application command semantics as future Guided Studios.
No duplicate product logic and no UI canvas implementation yet.

### R02 — Whole-Product Recomposition / Integration Harness

WRITE_SET:
- `tests/osv3/integration/**`;
- `docs/osv3/integration/**`.

Mission:
build the W001 merge/recomposition acceptance matrix against the frozen contracts:
legacy parity, domain composition, conflicts, capability gates, persistence boundaries, workflow semantics and expected integration order.

No product source modifications.

## Same-wave dependency rule

Workers may rely only on:
- frozen W001 construction snapshot;
- frozen foundation seed;
- frozen context packet/contracts;
- existing OS23.6 source.

They may NOT rely on another W001 worker's unpublished output.

Any cross-lane API assumption must already be in the frozen foundation/context.

## Long-run backlog rule

A worker must not finalize after first green tests while meaningful assigned backlog remains.

After mandatory implementation, continue with:
- adversarial cases;
- property/fuzz tests where sensible;
- compatibility fixtures;
- type-level/runtime validation;
- malformed input handling;
- deterministic serialization;
- API misuse review;
- integration-risk notes;
- cleanup/documentation.

No artificial sleeping.

## Integration order after trusted ingestion

Expected order:

1. construction seed;
2. A01 revision foundation;
3. A02 Character compatibility;
4. A03 Product;
5. A04 Place;
6. A05 Performance/Scene;
7. A06 Taste;
8. A07 Model capability;
9. A08 Application core;
10. R01 Workflow contract;
11. Q01/Q02 tests/harness;
12. R02 integration harness.

This order is a planning default, not permission to ignore actual conflicts.

## W001 exit gates

Before any canonical merge/promotion:

- every accepted candidate independently ingested;
- all scope/history gates pass;
- isolated candidate tests pass;
- combined integration branch typechecks;
- all existing canonical tests pass;
- all current self-check assertions pass;
- W001 new tests pass;
- production build passes;
- golden OS23.6 fixtures show no unintended drift;
- no unresolved P0/P1 security/integrity issue;
- high-risk architecture/integration review completed;
- founder approves promotion/release direction.

## Post-W001 expected phase

W002:
shared application/persistence/API/server-canonical scaffolding + first Continuity Library/Guided Studio surfaces.

W003:
Expert Workflow Graph execution surface + provider/runtime generation integration.

These are provisional until W001 evidence arrives.
