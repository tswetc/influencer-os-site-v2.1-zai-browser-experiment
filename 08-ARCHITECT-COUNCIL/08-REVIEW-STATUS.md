# Architecture Council Status

Date: 2026-09-25
Status: ASTRA_R001_TARGETED_ESCALATION_READY

## Current strategy

The prior plan for two symmetric independent high-cost architecture reviews is superseded.

Current sequence:

1. central architect reconstructs and reduces the architecture;
2. central architect closes routine/solvable decisions;
3. GPT-6 Astra in Codex receives only the five remaining hard decision knots;
4. central architect ingests Astra deltas into ADRs;
5. a lower-cost independent reviewer may then adversarially test the resulting architecture;
6. implementation feasibility is checked against the real private codebase;
7. a new immutable product-wave freeze is created only after accepted architecture changes.

## Why

GPT-6 Astra is a scarce high-capability model.
Its value is highest on the concentrated decisions most likely to cause:
- conceptual rewrite;
- transaction inconsistency;
- incorrect workflow history;
- under/over-versioning;
- unsafe auth/secret boundaries;
- failed migration from current behavior.

It should not spend its context reconstructing the whole project.

## Astra R001 inputs

Primary:
- `11-ASTRA-R001-FOCUS-PACKET.md`
- `10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`
- `03-OPEN-ARCHITECTURE-QUESTIONS.md`

Conditional:
- Product Architecture V3
- Domain Model V1
- Expert Workflow Graph Contract
- Current Product Behavior Contract
- selected exact files from the private canonical Web App when available.

## Output

One raw artifact:

`ASTRA-R001-DECISIONS.md`

Preserve it unchanged when ingesting it.

Then the central architect creates:
- contradiction/delta matrix only where Astra changes the baseline;
- ADR promotion patch;
- updated freeze readiness.

## Existing product runs

P001–P004 continue unchanged on their pinned historical inputs.

Do not mutate their historical run SHAs because of this architecture escalation.

E004–E011 should use a new post-Astra freeze if the Astra decisions materially change run contracts or product architecture.
