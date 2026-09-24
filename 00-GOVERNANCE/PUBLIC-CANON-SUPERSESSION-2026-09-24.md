# Public Canon Supersession — 2026-09-24

Status: BINDING FOR PUBLIC BROWSER RUNS

## Why this exists

Private durable sources such as project-memory and canonical product repositories contain valuable history, but public Chat.Z.AI browser agents cannot reliably access those private repositories.

Some private durable status is also older than the current founder decisions recorded in this public lab.

Therefore a public run must NOT:
- assume that inaccessible private context is absent behavior;
- depend on reading private project-memory;
- recreate older product-family boundaries merely because an old private status said so.

## Public-run authority order

For a public browser run, resolve conflicts in this order:

1. `00-GOVERNANCE/FOUNDER-DECISIONS-2026-09-24-CURRENT.md`
2. run-specific `RUN.md`
3. `01-BASE/PRODUCT-ARCHITECTURE-V3.md`
4. `01-BASE/DOMAIN-MODEL-V1.md`
5. `01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md`
6. `02-SOURCE-TRUTH/SOURCE-INDEX.md` + published OS23.6 source core
7. existing V2/V2.1 ancestry and reference material
8. external products as research only

The long `MASTER-MISSION-FULL.md` remains a rich implementation appendix. Newer current-decision/architecture files supersede it where there is an explicit conflict.

## Private repositories

Do not modify:
- private project-memory;
- private canonical product repository;
- private canonical site repository;
- other private products.

The central architect may derive public behavior contracts from verified private state, but browser runners consume the derived public contract only.

## No invented reconciliation

If the public contract says a private implementation area exists but does not expose its exact source:
- preserve the behavioral requirement;
- mark implementation as a source-preserving recomposition or product extension;
- do not invent hidden implementation details and call them canonical.
