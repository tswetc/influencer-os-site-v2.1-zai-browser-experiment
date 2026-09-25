# Open Architecture Questions — Pre-Astra Reduced Set

Date: 2026-09-25
Status: TWO_IRREDUCIBLE_KNOTS_REMAIN_PROVISIONALLY

Closed centrally:
- A1 execution substrate;
- A2 creative revision/staleness/rebase;
- A5 auth/MCP/BYOK/provider secret boundary;
- A6 local-first → server-canonical migration sequence.

See:
- PRE-ASTRA-CENTRAL-DECISIONS-R2.md
- PRE-ASTRA-CENTRAL-DECISIONS-R3.md

## K1 — Model identity/version boundary under provider/gateway drift

Central baseline already separates:
CapabilityDefinition, Provider, ModelFamily, ProviderDeployment, ModelProfile, ModelProfileRevision, EngineAdapterVersion, ProviderAdapterVersion, ModelDeploymentSnapshot, ResearchEvidence, EvalSuiteVersion/EvalRun and PromotionDecision.

Remaining exact choice:

Should one immutable ModelProfileRevision bind exactly ONE primary ProviderDeployment, with fallback/portfolio strategy owned by GenerationStrategy/GenerationJob,

OR

should one ModelProfileRevision own a set of deployments?

Must hold under:
- one external model available direct and through gateways;
- provider aliases that can change backing model;
- different provider-side capabilities;
- different pricing/latency;
- rollback;
- historical PromptBuild semantics;
- GenerationAttempt provenance.

Central preference:
one profile revision = one primary deployment.
Fallback/portfolio strategy belongs to job/strategy, not profile.

## K2 — Ambiguous paid submission without provider idempotency

Central baseline:
- DB create transaction + durable outbox;
- at-most-one automatic billable submission per Attempt;
- provider-native idempotency when available;
- reconciliation by client correlation when available;
- no automatic fallback while previous execution/billing is uncertain.

Remaining exact choice:

When a provider offers neither idempotency nor reliable client-request lookup and the worker crashes after request transmission but before provider job identity is durably recorded, choose exact behavior for:
- Attempt state;
- user-visible state;
- budget reservation;
- reconciliation duration;
- explicit retry;
- late orphan output;
- cost finalization.

Central preference:
SUBMISSION_UNKNOWN;
freeze automatic retry/fallback;
hold cost/budget in pending reconciliation;
require explicit new Attempt for risk-bearing retry.

## Criteria for keeping either question for Astra

Keep only if all are true:
1. wrong choice can cause cost/data/security/reproducibility damage;
2. current verified source + accepted architecture do not uniquely determine the answer;
3. it changes durable schema/semantics, not merely library choice;
4. central architect cannot close it without material uncertainty.

Everything else is not Astra work.
