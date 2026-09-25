# K2 — Billing Safety Decision

Date: 2026-09-25
Status: CENTRAL_DECISION_ACCEPTED

## Decision

The first hosted production milestone is BYOK-first for user-funded generation.

`PLATFORM_MANAGED` generation may exist only behind an explicit capability gate and may use only provider routes whose billable submission can be reconciled safely.

Platform-managed user credits/balance billing are NOT part of the first production milestone unless a separate financial-ledger ADR is accepted.

## Provider submission-safety capability

Every ModelRoute / ProviderDeployment used for generation must expose one of:

- `IDEMPOTENT_SUBMIT` — provider supports a stable idempotency key for billable submission;
- `RECONCILABLE_SUBMIT` — provider does not guarantee idempotent create, but supports reliable lookup by client correlation/request key before any resubmit;
- `NON_RECONCILABLE_SUBMIT` — neither guarantee exists.

## Eligibility

### USER_BYOK_HOSTED / WORKSPACE_BYOK_HOSTED

All three route classes may be enabled if the product truthfully exposes the risk.

For `NON_RECONCILABLE_SUBMIT`:
- one automatic submit per GenerationAttempt;
- crash/timeout ambiguity becomes `SUBMISSION_UNKNOWN`;
- no automatic retry;
- no automatic fallback;
- explicit risk-bearing NEW Attempt only after user/policy acknowledgement;
- late result always attaches to the original Attempt.

### PLATFORM_MANAGED

For the first production milestone, only:
- `IDEMPOTENT_SUBMIT`; or
- `RECONCILABLE_SUBMIT`

may be enabled.

`NON_RECONCILABLE_SUBMIT` is not eligible for platform-managed paid execution.

This converts an unbounded financial ambiguity into an explicit capability constraint instead of pretending local transactions can create exactly-once semantics across an unsafe provider boundary.

## Durable cost objects

Keep:
- `BudgetReservation` — local permission/hold before billable dispatch;
- `ProviderCostRecord` — actual/estimated provider usage evidence;
- `CostExposure` — unresolved possible external liability;
- immutable billing/audit events.

For BYOK, CostExposure is informational/risk telemetry unless an internal workspace cap is enabled.

For future platform-managed credits, exact ledger posting/refund/write-off policy is a separate financial subsystem and must be specified before the feature flag is enabled.

## SUBMISSION_UNKNOWN invariant

`SUBMISSION_UNKNOWN` is an execution truth, not a transient error label.

While it exists:
- the same Attempt is never blindly resubmitted;
- fallback is forbidden;
- cancellation cannot claim provider cancellation succeeded;
- the original attempt remains reconcilable;
- any later provider output/cost evidence is attached to that original Attempt;
- creating a new Attempt is explicit and risk-bearing.

## Why Astra is not needed for K2

The remaining uncertainty was only the product policy for platform-managed financial exposure.

The architecture can eliminate that risk from the first production milestone by:
1. shipping BYOK-first;
2. capability-gating unsafe provider routes;
3. prohibiting platform-managed execution on `NON_RECONCILABLE_SUBMIT` routes;
4. deferring managed credits until a dedicated ledger/financial policy is accepted.

This does not weaken future capability. It prevents premature financial complexity from contaminating the core generation architecture.

## Re-open condition

Re-open K2 only when the founder explicitly schedules platform-managed user billing/credits for implementation.

At that point require a dedicated financial ADR covering:
- immutable double-entry or equivalent auditable ledger;
- reservation/posting/refund/write-off rules;
- provider invoice reconciliation;
- CostExposure aging;
- dispute/manual adjustment;
- currency/rounding;
- credit grants and expiration;
- accounting/audit export.

## Result

`K2_CLOSED_BY_BYOK_FIRST_AND_ROUTE_SAFETY_GATE`