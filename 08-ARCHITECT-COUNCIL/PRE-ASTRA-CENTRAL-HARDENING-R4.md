# Pre-Astra Central Hardening R4

Date: 2026-09-25
Status: ACCEPTED

These deltas are promoted from the central adversarial review.

## H1 — Execution checkpoint concurrency

Creating an execution checkpoint from a dirty draft must use optimistic concurrency.
If the draft version/ETag changed after read, abort checkpoint creation and require fresh resolution.

## H2 — ModelRoute safety evidence

ModelRoute stores/links verification evidence for:
- provider deployment identity;
- capability compatibility;
- provider adapter contract;
- submission-safety class;
- verified_at;
- reverify/expiry rule where needed.

## H3 — Idempotency safety window

`IDEMPOTENT_SUBMIT` is valid only when tested/documented provider idempotency scope and retention cover the product's maximum automatic retry/reconciliation window for the same request.

Otherwise downgrade safety classification.

## H4 — Materialization truth

Provider completion is not product success.

`SUCCEEDED` requires:
- output retrieved or otherwise durably referenced;
- object storage write complete;
- integrity/hash validation;
- AssetVersion/lineage persisted.

Materialization retry must never resubmit provider generation.

## H5 — Dispatch-time security guard

Immediately before first external submit, worker rechecks active execution prerequisites, including ProviderConnection revocation, route enablement and required entitlement/authorization policy.

A revoked connection cannot be resolved by secret_ref.

Once external submit occurred, later revocation does not rewrite historical truth; it blocks subsequent attempts.

## H6 — Migration anti-race

MigrationPlan pins a source snapshot/fingerprint.
Apply rechecks source fingerprint.
Any source change since plan creation aborts apply.

## H7 — Staged object-storage migration

Migration media uses staged storage and MigrationRecord lifecycle.
Server authority flips only after DB/object counts and hashes are verified.
Failure before cutover leaves LOCAL_CANONICAL authoritative.

## H8 — Deterministic workflow cache provenance

Cache key includes:
- exact immutable input revision/content hashes;
- node implementation version;
- relevant compiler/OSRuleset version;
- EngineAdapterVersion when applicable;
- other deterministic configuration affecting output.

If provenance is incomplete, do not reuse cache.

## Result

These invariants are part of the accepted baseline and should be checked during implementation/candidate audit.