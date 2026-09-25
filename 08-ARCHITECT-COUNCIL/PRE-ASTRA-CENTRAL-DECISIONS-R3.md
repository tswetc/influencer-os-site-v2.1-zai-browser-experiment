# Pre-Astra Central Decisions R3 — Security, Migration, and Candidate Baselines

Date: 2026-09-25
Status: ACCEPTED_FOR_A5_A6__PROVISIONAL_FOR_A3_A4

This document closes A5 and A6 centrally and narrows A3/A4.

## A5 — ACCEPTED: one principal model, standards-based boundaries, secret references only

### Identity

Use an external mature OIDC/OAuth authorization system.
Do not build custom authentication cryptography or a custom authorization server.

Principal types:
- HUMAN
- SERVICE_CLIENT
- WORKER

WorkspaceMembership defines workspace role.
Entitlement defines commercial capability.
Neither substitutes for authentication.

### Browser human session

Use server-managed/BFF-style session cookies:
- HttpOnly;
- Secure;
- SameSite policy appropriate to deployment;
- CSRF protection;
- no long-lived bearer token in localStorage.

### HTTP API

Use audience-restricted OAuth access tokens.
Scopes express coarse capability such as:
- projects:read
- projects:write
- generation:run
- workflows:run
- assets:read
- providers:manage

Scopes never replace object-level Workspace/Project authorization.

### MCP HTTP

Treat MCP as an OAuth protected resource / resource server.

Requirements:
- Protected Resource Metadata;
- WWW-Authenticate on 401;
- authorization-server discovery;
- Authorization Code + PKCE for user-driven public clients where applicable;
- validate issuer, audience/resource, expiry and scopes;
- use current MCP authorization semantics rather than inventing a tool-level login protocol.

MCP tool handlers still call the same application authorization checks as web/API.
Transport authorization is not sufficient by itself.

### ProviderConnection

ProviderConnection stores metadata + secret reference, never raw secret in ordinary domain rows.

Credential ownership modes:
- USER_BYOK_HOSTED
- WORKSPACE_BYOK_HOSTED
- PLATFORM_MANAGED
- LEGACY_LOCAL_DIRECT (migration-only)

Secret storage:
- encrypted secret manager/KMS-backed vault;
- secret_ref in relational metadata;
- never returned after storage;
- never emitted to MCP/tool arguments;
- never included in ExportBundle, AuditEvent or telemetry.

### Worker identity

Workers authenticate as SERVICE/WORKER principals.
They do not persist or replay a human user's bearer token.

A GenerationAttempt stores:
- initiating principal ID;
- workspace/project;
- authorized ProviderConnection ID;
- authorization/entitlement decision metadata sufficient for audit.

At execution, worker resolves only the secret_ref associated with the already-authorized attempt.

### Revocation

Revoking ProviderConnection:
- blocks new attempts immediately;
- prevents retry/fallback through that connection;
- does not delete historical attempt metadata;
- never rewrites old PromptBuild/Asset lineage.

### Legacy BYOK

Existing browser-direct keys remain local-only during migration.
They are never silently uploaded.
A user must explicitly reconnect/re-enter a provider credential for hosted execution.

### A5 result

A5 is CLOSED centrally.

External basis used for security alignment:
- OAuth Security BCP (RFC 9700);
- resource indicators/audience restriction (RFC 8707);
- current MCP OAuth protected-resource model including Protected Resource Metadata.

---

## A6 — ACCEPTED: per-project one-way authority cutover, no dual-write

Migration is staged and reversible at deployment/phase boundaries, but each project has exactly one canonical authority at a time.

### M0 — behavior freeze

Before architecture migration:
- current test suite green;
- current export/backup verified;
- source behavior matrix frozen;
- migration fixture corpus created.

Rollback:
current app unchanged.

### M1 — application seam inside current Web App

Move canonical behavior behind application/repository interfaces while still using current local adapters.

No hosted persistence yet.

Acceptance:
- current behavior unchanged;
- current tests pass;
- UI stops owning business rules directly.

Rollback:
ship prior app build.

### M2 — local domain normalization

Introduce stable IDs/revision DTOs and versioned migration/export representation locally.

Legacy structures are converted through one anti-corruption layer.

No scattered legacy conditionals in new domain code.

Acceptance:
- legacy export → normalized import round-trip;
- no data loss in fixtures;
- no secret included by default.

### M3 — account/workspace/server substrate

Add authentication, Workspace/Project server records, relational metadata and object storage behind feature flags.

Existing user projects remain LOCAL_CANONICAL until explicitly migrated.

No background auto-upload.

### M4 — dry-run migration plan

For one project, generate MigrationPlan:
- source backup hash;
- object counts;
- ID mapping;
- media hashes;
- unsupported/held records;
- required user actions;
- provider credentials explicitly excluded.

Dry-run mutates nothing.

Any validation error blocks apply.

### M5 — atomic project import/cutover

Apply migration:
- create server objects transactionally where possible;
- upload/verify object-storage media;
- verify counts/hashes;
- record MigrationRecord;
- only after full verification set project authority = SERVER_CANONICAL.

On failure:
LOCAL_CANONICAL remains authoritative and untouched.

No dual-write.

### M6 — provider reconnect

For SERVER_CANONICAL project:
hosted generation requires hosted ProviderConnection or platform-managed connection.

Legacy browser key is never copied.
User explicitly reconnects.

LOCAL_CANONICAL projects may temporarily retain legacy direct-BYOK behavior until retirement.

### M7 — durable generation

Enable server GenerationJob/Attempt + worker only for SERVER_CANONICAL projects.

Never mix one server-canonical project with browser-local paid execution state.

### M8 — dynamic model layer

Map legacy EngineId to explicit compatibility ModelProfile/Adapter records.

Imported historical prompt/history records preserve legacy engine identifiers and source hashes.
Do not invent provider version information that was never recorded.

### M9 — graph/API/MCP expansion

Enable Expert Workflow/API/MCP on server-canonical data only after shared application use cases are stable.

### M10 — local-canonical retirement

Retire legacy local-canonical mode only after:
- migration success rate target reached;
- current behavior parity tests pass;
- backup/export restore path proven;
- support/failure runbook exists;
- no P0 migration defect remains.

Keep import tooling for stragglers after default retirement.

### Rollback rule

Do not maintain bidirectional local/server replication.

Before cutover, rollback means remain local.
After successful cutover, server remains canonical.

If product deployment must roll back, older-compatible server schema/API remains readable or a versioned ExportBundle is produced.
Do not automatically merge new server writes back into an old local browser database.

### A6 result

A6 is CLOSED centrally.

---

## A3 — BASELINE SUPERSEDED/FINALIZED BY K1-MODEL-ROUTE-DECISION.md

Use separate concerns:

- CapabilityDefinition — product semantic task/schema;
- Provider — vendor/gateway identity;
- ModelFamily — external conceptual model/family when meaningful;
- ProviderDeployment — provider-addressable model/deployment/alias;
- ModelProfile — stable Influencer OS product-facing route/profile;
- ModelProfileRevision — immutable approved configuration;
- EngineAdapterVersion — Influencer OS semantic/prompt transformation rules;
- ProviderAdapterVersion — transport/auth/request/poll/webhook/error/cost normalization;
- ModelDeploymentSnapshot — exact execution-time observed provider identifier/capability snapshot;
- ResearchEvidence;
- EvalSuiteVersion / EvalRun;
- PromotionDecision.

Do NOT combine release status with operational health.

Suggested release status:
HIDDEN → EXPERIMENTAL → BETA → LIVE → DEPRECATED → RETIRED.

Operational health:
UNKNOWN / AVAILABLE / DEGRADED / UNAVAILABLE.

Promotion path:
discovery → research evidence → adapter contract tests → real integration verification → capability/quality/cost/latency eval → manual promotion decision → canary/beta → LIVE → monitored drift → rollback/deprecation.

Historical PromptBuild pins:
- ModelProfileRevision;
- EngineAdapterVersion;
- OS ruleset;
- effective creative revision IDs.

GenerationAttempt pins:
- ProviderConnection ID;
- ProviderAdapterVersion;
- ModelDeploymentSnapshot;
- exact provider request hash;
- provider response/job identifiers where available.

Mutable provider alias rule:
never claim alias == immutable model version.
Store alias + observed metadata + verification timestamp + returned model identifier when available.
If a provider cannot expose immutable version identity, mark reproducibility limitation explicitly.

### A3 final result

Closed centrally by `K1-MODEL-ROUTE-DECISION.md`.

Final architecture:
ModelProfileRevision remains semantic/provider-route independent.
Immutable ModelRoute binds it to ProviderDeployment + ProviderAdapterVersion.
GenerationStrategy owns fallback/portfolio routing.
GenerationAttempt pins exact executed route + ModelDeploymentSnapshot.

A3/K1 no longer requires Astra unless later evidence exposes a concrete contradiction.

---

## A4 — PROVISIONAL BASELINE

Exactly-once external generation cannot be assumed.

Goal:
at-most-one automatic billable submission per GenerationAttempt plus explicit ambiguity handling.

### Durable create transaction

One DB transaction creates:
- GenerationJob;
- first GenerationAttempt;
- BudgetReservation;
- DispatchOutbox record.

Client command has a unique idempotency key scoped to workspace/use case.

### Dispatch

Worker claims outbox with lease.
Attempt moves:
CREATED → DISPATCH_PENDING → SUBMITTING.

If provider supports idempotency:
send Attempt ID/submission nonce as provider idempotency key.

If provider supports client-request lookup:
persist correlation nonce for reconciliation.

### Crash after submit

If response is lost:

1. provider idempotency exists:
retry same Attempt with same provider idempotency key;

2. no idempotency but lookup exists:
reconcile by client correlation before any new submit;

3. neither exists:
Attempt becomes SUBMISSION_UNKNOWN.

SUBMISSION_UNKNOWN forbids automatic retry and automatic fallback.

A user/policy may explicitly create a NEW Attempt with duplicate-cost warning after acknowledging uncertainty.

### Provider events

Webhook and polling both enter one normalized ProviderEventInbox/reducer.

Deduplicate by provider event ID when available; otherwise by a canonical event fingerprint with provider job ID and monotonic-state guard.

Never let an older poll regress a newer provider state.

### Cancellation

Cancel command records cancel_requested_at and emits cancel outbox action.

Cancellation is not considered externally complete until provider confirms or reconciliation policy closes it.

Late provider success after cancel is recorded truthfully:
- Attempt provider outcome = success;
- late_after_cancel = true;
- output may be materialized for audit/recovery;
- product does not silently present it as a normal successful user completion.

### Timeout

Local wait timeout is not proof of provider failure.

If provider final state is uncertain:
UNKNOWN/RECONCILIATION_REQUIRED, not FAILED.

No fallback while prior paid execution may still be running.

### Output materialization

Provider success and product asset persistence are distinct.

After provider success:
PROVIDER_SUCCEEDED → MATERIALIZING → SUCCEEDED.

Object download/hash/validation failure is OUTPUT_MATERIALIZATION_FAILED or retryable MATERIALIZING state; do not lie that provider generation failed.

### Cost

Before dispatch:
reserve an estimated ceiling against workspace budget/entitlement when managed billing applies.

After terminal/reconciliation:
- finalize actual known cost;
- release unused reservation;
- preserve unknown cost as pending reconciliation;
- never erase cost record on retry.

### Fallback

Automatic fallback only after definitive non-success terminal state and capability-compatible policy.

Never fallback automatically from SUBMISSION_UNKNOWN.

Parallel provider execution is a separate explicit strategy with pre-approved budget, not an accidental retry behavior.

### Remaining A4 decision for Astra

Validate/choose exact durable semantics for the non-idempotent ambiguous-submit window and how BudgetReservation should behave while an external provider may have accepted work but no durable provider job ID is known.

Central preference:
freeze automation in SUBMISSION_UNKNOWN, hold/reconcile budget, require explicit risk-bearing retry.

Reason for escalation:
this is the highest-cost distributed-systems failure window and cannot be solved by local transaction correctness alone.
