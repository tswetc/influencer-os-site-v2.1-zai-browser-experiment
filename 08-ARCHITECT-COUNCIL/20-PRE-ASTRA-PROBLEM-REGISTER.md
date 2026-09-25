# Pre-Astra Problem Register — Exact Remaining Work

Date: 2026-09-25
Status: ACTIVE

This separates unresolved ARCHITECTURE questions from OPERATIONAL work that is merely not executed yet.

## P1 — Model identity and provider routing

Class: ARCHITECTURE
Severity: P0
Current state: CENTRAL_DECISION_NOW_AVAILABLE

Problem:
The same conceptual model may be available through direct vendor APIs and gateways, while provider aliases can drift. Prompt semantics belong to the model/OS layer; transport semantics belong to provider routes. A single overloaded ModelProfile would corrupt reproducibility.

Required safe answer:
separate semantic model profile from provider route and pin exact route at GenerationAttempt.

Decision document:
`K1-MODEL-ROUTE-DECISION.md`

Completion:
- [x] semantic profile separated from provider route;
- [x] many compatible routes supported without embedding fallback into profile;
- [x] historical PromptBuild pins semantic profile/EngineAdapter;
- [x] GenerationAttempt pins exact route/provider adapter/deployment snapshot;
- [x] mutable alias drift has quarantine/re-eval behavior;
- [x] code-vs-config boundary defined.

Result:
P1 can leave Astra scope unless later evidence exposes a contradiction.

## P2 — Ambiguous paid provider submission

Class: ARCHITECTURE / DISTRIBUTED SYSTEMS
Severity: P0
Current state: ONE NARROW POLICY EDGE REMAINS

Problem:
If a provider has no idempotency and no reliable request lookup, a worker can crash after sending a paid request but before recording provider job identity. Local DB correctness cannot prove whether money/work was already committed externally.

Central safe baseline:
- durable outbox;
- one automatic submission per Attempt;
- provider idempotency when available;
- reconciliation first;
- SUBMISSION_UNKNOWN when certainty is impossible;
- no automatic retry/fallback from SUBMISSION_UNKNOWN;
- explicit new Attempt for risk-bearing retry.

Remaining narrow question:
exact budget/cost exposure settlement policy after a prolonged unresolved SUBMISSION_UNKNOWN for platform-managed billing.

This is the only architecture question currently likely to deserve Astra after final challenge.

## P3 — Wave v4 media transport not executed locally

Class: OPERATIONAL_EXTERNAL
Severity: P0 FOR FUTURE E-WAVE
Current state: BLOCKED_ON_FOUNDER_LOCAL_SSD

Not an architecture question.

Required founder/local execution:
`04-MEDIA/WAVE-V4-LOCAL-RUNBOOK.md`

Completion:
A39/B42/C33/D36 + sanitized bundle + machine verifier + full visual atlas QA.

## P4 — P001–P004 outputs not yet ingested

Class: EXTERNAL_EVIDENCE
Severity: P1 PRE-ASTRA

GitHub currently contains no P001–P004 result packages.

Need:
ZIP + checksum + runtime label + forensic source audit.

Do not block indefinitely if remaining architecture is independent of their outputs.

## P5 — Long-lived public bridge not created

Class: OPERATIONAL_GOVERNANCE
Severity: P0 BEFORE OFFICIAL E-WAVE
Decision: COMPLETE
Execution: DEFERRED UNTIL POST-ASTRA

Use a NEW clean-history public bridge repository.
Do not copy legacy Git history.

Decision:
`00-GOVERNANCE/PUBLIC-BRIDGE-PRIVACY-DECISION.md`

## P6 — Pre-Astra synthesis packet not finalized

Class: CENTRAL_ARCHITECTURE
Severity: P0 BEFORE ASTRA
State: TODO AFTER P1/P2 FINALIZATION + MATERIAL PILOT EVIDENCE

Must create:
executive snapshot, delta map, final open knot, evidence router.

## P7 — Structural + semantic audits not yet final

Class: VERIFICATION
Severity: P0 BEFORE ASTRA

Structural script exists:
`tools/audit_pre_astra.py`

Final PASS waits until current intended evidence and local Wave transport state are settled.

Semantic/adversarial review waits until P2 is fully decided or explicitly isolated.

## P8 — Astra input not frozen

Class: EXPECTED BLOCK
Severity: P0

Correct current state:
ASTRA_R001_NOT_LAUNCHED.

Do not create final launch packet until P6/P7 pass.
