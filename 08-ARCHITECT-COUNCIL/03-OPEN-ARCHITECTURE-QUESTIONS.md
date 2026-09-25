# Open Architecture Questions — Pre-Astra Status

Date: 2026-09-25
Status: ZERO_UNRESOLVED_CORE_ARCHITECTURE_KNOTS

The central architect has now closed the previously isolated A1–A6/K1/K2 questions for the current BYOK-first production milestone.

## Closed centrally

### A1 — execution substrate
Application commands/use cases are primitive.
Workflow is orchestration over the same commands.
Ordinary Studio/API/MCP operations do not require an implicit WorkflowRun.

### A2 — creative state/history
Mutable drafts + immutable explicit/execution-checkpoint revisions.
FOLLOW_ACTIVE resolves to exact revisions at execution.
Historical revisions/builds/runs/assets never rebase in place.

### A3 / K1 — model/provider/adapter lifecycle
Semantic ModelProfileRevision is provider-route independent.
Immutable ModelRoute binds it to ProviderDeployment + ProviderAdapterVersion.
GenerationAttempt pins exact route + deployment snapshot.
Alias drift creates new evidence/reverification and never rewrites history.

### A4 / K2 — paid generation durability
Job != Attempt.
Durable outbox/inbox/idempotent worker.
SUBMISSION_UNKNOWN represents irreducible external uncertainty.
No automatic retry/fallback from uncertain billable execution.

Current milestone is BYOK-first.
Platform-managed execution is allowed only on routes whose submission is idempotent or reliably reconcilable.
NON_RECONCILABLE_SUBMIT routes are BYOK-only until a separate managed-billing/ledger ADR is accepted.

### A5 — auth/MCP/secrets
Standards-based OIDC/OAuth.
Secure browser session.
Audience/scoped API tokens + object authorization.
MCP as OAuth protected resource plus the same application authorization.
Provider secrets are referenced, not exposed.
Workers use service identity.
Legacy local keys are never silently uploaded.

### A6 — migration
No big-bang rewrite.
Application seam first.
Local normalization.
Server substrate behind flags.
Dry-run migration.
Per-project verified cutover with exactly one canonical authority.
Explicit provider reconnect.
Durable generation/model layer/graph+MCP only after server-canonical cutover.
No permanent dual-write.

## Evidence

- PRE-ASTRA-CENTRAL-DECISIONS-R2.md
- PRE-ASTRA-CENTRAL-DECISIONS-R3.md
- K1-MODEL-ROUTE-DECISION.md
- K2-BILLING-SAFETY-DECISION.md
- 10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md

## What remains before Astra

There is no ordinary design decision for Astra to make now.

Astra's later job is adversarial falsification of the accepted architecture, especially:

1. provider/model identity under alias drift and gateway indirection;
2. ambiguous paid submission / external side effects;
3. MCP confused-deputy / object-level authorization boundaries;
4. legacy local-first → server-canonical migration failure modes;
5. provenance integrity across revisions, PromptBuild, Workflow, GenerationAttempt and AssetVersion.

Astra should propose architecture changes only when it can show a concrete invariant failure or a materially safer/simpler design.

## Re-open rule

A closed decision may be reopened only by:
- verified current-source contradiction;
- P001–P004 forensic evidence;
- a concrete adversarial failure case;
- explicit founder product-scope change;
- later provider/standards evidence that invalidates an assumption.

ASTRA_SCOPE = CHALLENGE_ACCEPTED_BASELINE, not INVENT_ARCHITECTURE_FROM_SCRATCH.