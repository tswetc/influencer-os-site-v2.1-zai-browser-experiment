# Open Architecture Questions — Pre-Astra Reduced Set

Date: 2026-09-25
Status: ONE_IRREDUCIBLE_KNOT_REMAINS_PROVISIONALLY

Closed centrally:
- A1 execution substrate;
- A2 creative revision/staleness/rebase;
- A5 auth/MCP/BYOK/provider secret boundary;
- A6 local-first → server-canonical migration sequence;
- K1 model/profile/provider-deployment identity boundary.

See:
- PRE-ASTRA-CENTRAL-DECISIONS-R2.md
- PRE-ASTRA-CENTRAL-DECISIONS-R3.md
- K1-MODEL-ROUTE-DECISION.md

## K2 — Ambiguous paid submission without provider idempotency

Accepted architecture:
- GenerationJob != GenerationAttempt;
- one DB transaction creates Job + Attempt + BudgetReservation + DispatchOutbox;
- workers assume at-least-once delivery and use leases/idempotent local transitions;
- provider-native idempotency is used when available;
- reliable client-correlation lookup is used before retry when available;
- webhook/poll events enter one deduplicated ProviderEventInbox/reducer;
- provider success and output materialization are separate states;
- no automatic fallback while a previous paid execution may still exist;
- SUBMISSION_UNKNOWN represents irreducible external uncertainty.

The remaining narrow policy edge:

When a PLATFORM_MANAGED provider offers neither idempotency nor reliable client-correlation lookup and the worker crashes after request transmission but before provider job identity is durably known, what is the strongest durable settlement invariant for:

- user-facing BudgetReservation;
- internal CostExposure/liability;
- reconciliation horizon;
- later provider usage/invoice evidence;
- explicit risk-bearing retry;
- possible late orphan output;
- whether/when spendable user budget may be released without pretending external cost is impossible?

Central recommendation:
- Attempt = SUBMISSION_UNKNOWN;
- automatic retry/fallback prohibited;
- BudgetReservation = HELD_UNCERTAIN during bounded active reconciliation;
- durable CostExposure persists independently;
- after the bounded reconciliation horizon, user spendable budget may be released by BillingPolicy while CostExposure remains open;
- later provider evidence settles CostExposure without rewriting Attempt history;
- a new risk-bearing Attempt requires explicit user/policy authorization;
- for USER/WORKSPACE BYOK, duplicate-cost risk is primarily provider-account risk rather than platform financial settlement.

See:
`K2-AMBIGUOUS-SUBMISSION-ANALYSIS.md`.

## Criteria for keeping K2 for Astra

Keep it only if ALL are true:
1. platform-managed billing/credits are in the near-term product scope;
2. the exact hold/release/liability invariant changes durable schema or financial correctness;
3. current evidence does not make one policy clearly safe;
4. a wrong answer can create hidden double-spend or unfair user billing.

If platform-managed billing is explicitly deferred beyond the first production milestone, K2 does not need to block the core BYOK-first architecture.

Everything else is not Astra work.
