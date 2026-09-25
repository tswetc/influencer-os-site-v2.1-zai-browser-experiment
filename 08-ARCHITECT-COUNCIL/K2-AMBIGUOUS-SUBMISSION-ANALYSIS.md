# K2 — Ambiguous Paid Submission Analysis

Date: 2026-09-25
Status: NARROW_OPEN_POLICY_EDGE

## Non-negotiable fact

A local transaction cannot provide exactly-once semantics across an external provider call.

If a provider has:
- no idempotency key;
- no reliable client-correlation lookup;

and the worker crashes after transmitting a paid request but before durably recording provider job identity, the system cannot know locally whether the provider accepted the work.

The architecture must represent that uncertainty instead of guessing.

## Accepted state path

Create transaction:
GenerationJob + GenerationAttempt + BudgetReservation + DispatchOutbox.

Worker:
DISPATCH_PENDING
→ SUBMITTING
→ one of:

- ACCEPTED
- SUBMISSION_UNKNOWN
- DEFINITIVE_FAILED

If provider supports idempotency:
same Attempt may safely retry dispatch with same idempotency key.

If provider supports lookup:
reconcile before any retry.

If neither:
lease expiry after SUBMITTING becomes SUBMISSION_UNKNOWN.

## SUBMISSION_UNKNOWN behavior

Forbidden automatically:
- resubmit same Attempt;
- create fallback Attempt;
- mark FAILED;
- release all cost exposure as if nothing happened.

Allowed:
- provider-specific reconciliation attempts;
- operator/manual reconciliation;
- explicit user/policy decision to create NEW Attempt with duplicate-spend warning;
- late provider result ingestion if later discovered.

## Late orphan result

If an output later appears:
- attach it to the original Attempt;
- preserve original SUBMISSION_UNKNOWN history/event timeline;
- transition provider outcome with reconciliation evidence;
- create AssetVersion/lineage if valid;
- never attach it to the newer retry Attempt.

## Cancellation

Cancellation during SUBMISSION_UNKNOWN cannot promise provider cancellation.

Record:
cancel_requested_at
+ cancellation uncertainty.

If late success arrives, record truthfully as late-after-cancel.

## Budget/cost model

Separate:
- BudgetReservation = permission/hold before dispatch;
- ProviderCostRecord = actual/estimated external cost evidence;
- CostExposure = unresolved possible external cost.

On SUBMISSION_UNKNOWN:
BudgetReservation becomes HELD_UNCERTAIN
and CostExposure is created with maximum/estimated exposure.

Do not fabricate actual cost.

## Remaining narrow policy choice

For PLATFORM_MANAGED billing only:

How long does HELD_UNCERTAIN reduce the user's available budget if provider billing evidence never arrives?

Possible policy is configurable rather than structural:
- hold until provider settlement/invoice evidence;
- or hold until a bounded reconciliation horizon then release user spendable balance while retaining platform CostExposure/liability.

Architecture supports both without changing Job/Attempt truth.

For USER/WORKSPACE BYOK:
external provider charges belong directly to the user's provider account; the product still warns/blocks duplicate automatic dispatch, but internal monetary settlement is informational unless the workspace uses an internal budget cap.

## Central recommendation

Use bounded reconciliation horizon plus separate long-lived CostExposure.

After horizon:
- release user-facing reservation according to billing policy;
- do NOT erase CostExposure;
- later provider invoice/usage data can settle the exposure;
- do not retroactively rewrite Attempt history.

This prevents permanent account lock while preserving platform financial risk visibility.

## Why this may still deserve Astra

The remaining issue is not queue mechanics.
It is whether this budget/exposure split is sufficient for the product's future managed-billing model or whether a stronger ledger/reservation invariant is required before platform-managed credits are offered.

If platform-managed billing is not in the first production milestone, this can be deferred and K2 can be considered architecturally closed for BYOK-first launch.
