# Pre-Astra Adversarial Central Review

Date: 2026-09-25
Status: PASS_WITH_ACCEPTED_HARDENING

Purpose: try to break the centrally accepted A1–A6/K1/K2 architecture before spending Astra capacity.

## Test 1 — Studio and Workflow drift

Attack:
a direct Image Studio and a graph generation node slowly accumulate different prompt/generation rules.

Control:
both invoke the same application commands/use cases; Workflow is orchestration only.

Result: PASS.

Hardening:
application handlers, not UI/graph nodes, own domain rules. Workflow nodes may adapt typed ports into command input but may not fork prompt/provider semantics.

## Test 2 — historical result silently changes when Character/Canon changes

Attack:
user edits the active character after a generation; history later resolves `latest` and changes meaning.

Control:
execution resolves FOLLOW_ACTIVE into exact immutable revision IDs; historical PromptBuild/Run/Attempt/AssetVersion never rebase.

Result: PASS.

## Test 3 — dirty draft races with execution

Attack:
autosave and Generate occur near-simultaneously, producing unclear inputs.

Control:
execution creates/uses one immutable execution checkpoint from a concurrency-checked draft snapshot.

Accepted hardening:
the checkpoint transaction must verify the draft version/ETag it read. Conflict returns a user-visible retry/review state; never mix fields from two draft versions.

Result: PASS_WITH_HARDENING.

## Test 4 — provider alias changes behind a stable slug

Attack:
`latest` or gateway alias changes the underlying model while product history still shows the same profile.

Control:
semantic ModelProfileRevision is separate from ModelRoute; GenerationAttempt pins route + ModelDeploymentSnapshot; alias drift never rewrites history.

Accepted hardening:
ModelRoute records submission/capability verification evidence with `verified_at` and optional expiry/reverify policy. Returned provider model identity is recorded when available.

Result: PASS_WITH_HARDENING.

## Test 5 — provider claims idempotency but only for a short window

Attack:
worker retries after the provider's idempotency retention window and pays twice.

Control:
route safety is explicit.

Accepted hardening:
`IDEMPOTENT_SUBMIT` is valid only when the verified provider idempotency scope/window covers the product's maximum automatic retry/reconciliation horizon for the same semantic request. Otherwise classify as RECONCILABLE_SUBMIT or NON_RECONCILABLE_SUBMIT.

Result: PASS_WITH_HARDENING.

## Test 6 — crash after paid submit with no safe provider correlation

Attack:
provider may have accepted money/work but local process dies before job ID persistence.

Control:
SUBMISSION_UNKNOWN; no automatic resubmit/fallback; explicit risk-bearing new Attempt only.

Current milestone:
BYOK-first. PLATFORM_MANAGED is forbidden on NON_RECONCILABLE_SUBMIT routes.

Result: PASS.

## Test 7 — webhook and polling race

Attack:
old poll response arrives after a terminal webhook and regresses state.

Control:
ProviderEventInbox + normalized reducer + monotonic state guard + event dedupe.

Result: PASS.

## Test 8 — cancel then late success

Attack:
user sees cancelled while provider later completes and charges.

Control:
cancel request is separate from provider-confirmed cancellation; late success is preserved as truth and attached to original Attempt.

Result: PASS.

## Test 9 — provider succeeds but product cannot persist output

Attack:
system marks generation FAILED and allows duplicate retry even though provider work/cost succeeded.

Control:
provider outcome and asset materialization are separate states.

Accepted hardening:
SUCCEEDED requires validated object persistence/hash. Materialization retry never resubmits provider generation.

Result: PASS_WITH_HARDENING.

## Test 10 — revoked user/provider connection with queued job

Attack:
user is removed or provider connection revoked after job creation but before external dispatch.

Control:
command authorization exists, but queue delay creates a second security boundary.

Accepted hardening:
immediately before first external dispatch, worker rechecks:
- Workspace/project active state;
- Entitlement required for the operation;
- ProviderConnection not revoked;
- ModelRoute not disabled;
- initiating principal's authority when policy requires it.

If revoked before submit, fail safely without provider call.
After provider acceptance, later revocation does not rewrite external truth; it blocks new retries/fallbacks and user access follows current authorization.

Result: PASS_WITH_HARDENING.

## Test 11 — MCP confused deputy

Attack:
a valid token for one resource/workspace causes a tool to act on another project.

Control:
OAuth resource/audience/scopes at transport boundary PLUS object-level authorization inside the same application use case.

Current MCP direction aligns with Protected Resource Metadata and resource/audience validation; token passthrough to providers is forbidden.

Result: PASS.

## Test 12 — secret leakage through exports/logs/MCP

Attack:
ProviderConnection data is serialized into generic domain/export or tool output.

Control:
domain stores secret_ref only; raw secret lives in encrypted secret store and is resolved only by authorized server/worker path.

Result: PASS.

## Test 13 — migration source changes after dry-run

Attack:
MigrationPlan is computed, then local IndexedDB changes before apply, causing silent data loss.

Accepted hardening:
MigrationPlan pins source snapshot/fingerprint/schema version. Apply rechecks the fingerprint; any drift aborts and requires a new plan.

Result: PASS_WITH_HARDENING.

## Test 14 — object storage upload succeeds partially but DB transaction fails

Attack:
mixed local/server authority or orphaned media during migration.

Accepted hardening:
migration uses a staged namespace/state machine:
`PLANNED → STAGING → VERIFIED → CUTOVER`.

Uploaded objects are hash-verified before the authority flip.
Failed staging leaves LOCAL_CANONICAL untouched.
Orphaned staged objects are garbage-collectable by MigrationRecord; no bidirectional merge.

Result: PASS_WITH_HARDENING.

## Test 15 — deterministic workflow cache returns wrong output after compiler change

Attack:
node input looks identical but implementation/adapter/ruleset changed.

Accepted hardening:
cache key for deterministic nodes includes exact input hashes/revision IDs + node implementation version + relevant EngineAdapter/OSRuleset/compiler versions. Missing version provenance disables reuse.

Result: PASS_WITH_HARDENING.

## Test 16 — browser candidate contaminates canonical code

Attack:
visually strongest ZIP is merged wholesale, importing fake backend/state assumptions.

Control:
bounded promotion only after forensic audit and canonical tests/security/migration review.

Result: PASS.

## Conclusion

No unresolved core architecture question was discovered.

Accepted hardening items:
1. concurrency-checked execution checkpoint;
2. ModelRoute verification age/evidence;
3. idempotency-window qualification;
4. validated output materialization before product success;
5. dispatch-time revocation/entitlement guard;
6. migration source fingerprint recheck;
7. staged object-storage migration before authority cutover;
8. version-complete deterministic workflow cache key.

These are implementation invariants, not new Astra knots.

Result:
`CENTRAL_ADVERSARIAL_REVIEW_PASS_WITH_HARDENING`