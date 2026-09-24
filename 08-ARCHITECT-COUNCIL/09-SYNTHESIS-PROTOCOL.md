# Architecture Council Synthesis Protocol

Use after independent Astra + Codex reviews are ingested.

## Step 1 — Normalize conclusions

For every material conclusion, classify:
KEEP · CHANGE · SPLIT_LATER · REMOVE · NEEDS_FOUNDER_DECISION · NEEDS_SOURCE_EVIDENCE.

## Step 2 — Build contradiction matrix

Columns:
- topic;
- current ADR;
- Astra;
- Codex;
- source/product constraints;
- implementation evidence;
- central architect resolution;
- founder decision required? yes/no.

## Step 3 — Resolve by responsibility

Founder owns:
- product behavior;
- UX intent;
- public/private decisions;
- business priorities.

Architecture council owns:
- persistence;
- transaction boundaries;
- queues/retries;
- provider adapter design;
- workflow runtime;
- package dependency direction;
- auth/entitlement structure;
- object storage;
- observability;
- testing;
- migration strategy.

Source evidence owns:
- OS23.6 inherited behavior semantics.

## Step 4 — Cross-review only material disagreements

Do not run a second debate for every detail.

Cross-review only decisions that would cause:
- conceptual rewrite;
- schema incompatibility;
- security boundary change;
- provider/runtime instability;
- workflow execution ambiguity;
- service split;
- irreversible migration cost.

## Step 5 — Promote accepted ADRs

Update:
- `08-ARCHITECT-COUNCIL/04-DECISION-REGISTER.md`;
- relevant `01-BASE/*` architecture contracts;
- current governance/readiness;
- run specifications only when architecture affects the product-wave mission.

## Step 6 — New freeze

Architecture review does not mutate already-running experiment SHAs.

After promotion:
- verify repository;
- create one new immutable freeze SHA;
- launch architecture-vetted E004-E011 from that SHA.

## Acceptance principle

Prefer the simplest architecture that:
- preserves product/source semantics;
- survives real provider failures;
- preserves reproducibility/lineage;
- can be tested;
- can be promoted to production without conceptual rewrite.

Do not reward sophistication for its own sake.
