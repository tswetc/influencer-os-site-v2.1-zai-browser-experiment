# Common Mission Backbone

This file defines the common invariant mission shared by all Z.ai experiments.

The full source-grounded mission payload will be added after the GitHub transport tests pass. Until then, this repository is in **transport-validation mode**.

Invariant rules for every future run:

1. Influencer OS product truth and authoritative source semantics are higher priority than design references.
2. External models generate media; Influencer OS structures identity, canon, scene, prompt, adaptation, planning, and validation.
3. Do not substitute invented semantics for unavailable source.
4. Use P0 → P1 → P2 priority discipline.
5. Do not spend convenience-feature cycles while actionable P0/P1 work remains.
6. Distinguish LIVE / MOCKED / UNVERIFIED / BLOCKED states.
7. Keep failure, decision, test, source-reconciliation and export logs.
8. Perform source/truth, functional/security, UX/visual, and packaging/portability review passes before final export.
9. Final export must be rebuilt from the final tree and verified for parity.
10. This repository is experimental input/output infrastructure, never canonical production history.

Run-specific design direction belongs under `06-EXPERIMENTS/<ID>/` and may not override source truth.
