# Pre-Astra Problem Register — Exact Remaining Work

Date: 2026-09-25
Status: ACTIVE

This separates CLOSED architecture decisions from work that is operational/external/verification.

## P1 — Model identity/provider routing

Class: ARCHITECTURE
State: COMPLETE

Decision:
ModelProfileRevision is semantic/provider-route independent.
Immutable ModelRoute binds semantic profile to ProviderDeployment + ProviderAdapterVersion.
GenerationAttempt pins exact route + ModelDeploymentSnapshot.
Alias drift creates new evidence/reverification; history is immutable.

Evidence:
`K1-MODEL-ROUTE-DECISION.md`.

## P2 — Ambiguous paid provider submission

Class: ARCHITECTURE / DISTRIBUTED SYSTEMS
State: COMPLETE_FOR_CURRENT_MILESTONE

Decision:
- durable outbox + idempotent/leased worker;
- one automatic billable submission per Attempt;
- reconciliation first;
- SUBMISSION_UNKNOWN when certainty is impossible;
- no automatic retry/fallback from SUBMISSION_UNKNOWN;
- explicit risk-bearing new Attempt only;
- provider success distinct from output materialization;
- route submission-safety capability;
- BYOK-first milestone;
- PLATFORM_MANAGED is forbidden on NON_RECONCILABLE_SUBMIT routes;
- managed user credits require a separate future financial-ledger ADR.

Evidence:
`K2-AMBIGUOUS-SUBMISSION-ANALYSIS.md`
`K2-BILLING-SAFETY-DECISION.md`.

## P3 — Wave v4 media transport not executed locally

Class: OPERATIONAL_EXTERNAL
Severity: P0 BEFORE PRE-ASTRA FREEZE / FUTURE E-WAVE
State: BLOCKED_ON_FOUNDER_LOCAL_SSD

Required:
`04-MEDIA/WAVE-V4-LOCAL-RUNBOOK.md`.

Completion:
A39/B42/C33/D36 + sanitized bundle + machine verification + full actual-transport visual QA.

## P4 — P001–P004 outputs not yet fully ingested

Class: EXTERNAL_EVIDENCE
Severity: P1 PRE-ASTRA
State: WAITING_FOR_RESULTS

Need per available run:
ZIP + checksum + runtime label + source/build/test/security/architecture forensic audit.

Do not block indefinitely if a still-running pilot cannot materially falsify the accepted architecture.

## P5 — Long-lived public bridge

Class: OPERATIONAL_GOVERNANCE
Decision: COMPLETE
Execution: DEFERRED_UNTIL_POST_ASTRA

Use a NEW clean-history public bridge repository.
Do not import legacy Git history.

Evidence:
`00-GOVERNANCE/PUBLIC-BRIDGE-PRIVACY-DECISION.md`.

## P6 — Active-document reconciliation

Class: CENTRAL_VERIFICATION
Severity: P0
State: IN_PROGRESS

Need:
- remove stale K1/K2-open wording from active routing;
- update ADR/baseline/current state;
- keep historical analysis files as evidence without making them current authority.

## P7 — Pre-Astra synthesis packet

Class: CENTRAL_ARCHITECTURE
Severity: P0
State: TODO

Need:
executive snapshot, architecture delta map, final challenge list, evidence router, reconciled ADR/nonnegotiables/project memory.

## P8 — Structural + semantic audits

Class: VERIFICATION
Severity: P0
State: TODO

Structural audit must verify paths/SHAs/authority/launch guards/local-media boundary.

Semantic adversarial audit must attack:
model drift, duplicate paid submit, webhook/poll races, cancel/late success, MCP authorization, secret leakage, migration divergence, provenance corruption and candidate-promotion contamination.

## P9 — Astra input freeze

Class: EXPECTED BLOCK
Severity: P0
State: NOT_READY

Correct state:
`ASTRA_R001_NOT_LAUNCHED`.

Freeze only after external material evidence is either ingested or explicitly non-blocking and both final audits pass.