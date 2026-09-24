# Architecture Council Synthesis Protocol

Date: 2026-09-25
Status: TARGETED_ASTRA_FIRST

Use after Astra R001 returns.

## Step 1 — Preserve raw Astra output

Ingest `ASTRA-R001-DECISIONS.md` unchanged.

Do not rewrite the raw decision packet before comparison.

## Step 2 — Build delta matrix only where needed

Columns:
- question / ADR;
- central baseline;
- Astra decision;
- source/product invariant;
- current implementation evidence;
- accepted resolution;
- migration impact;
- founder decision required? yes/no.

Do not create rows for architecture Astra did not challenge.

## Step 3 — Resolve by responsibility

Founder owns:
- product behavior;
- UX intent;
- public/private decisions;
- business priorities.

Architecture owns:
- persistence;
- transactions;
- queues/retries;
- provider adapter design;
- workflow runtime;
- package dependency direction;
- auth/entitlement structure;
- object storage;
- observability;
- testing;
- migration strategy.

Verified source evidence owns inherited OS23.6 semantics.

## Step 4 — Promote accepted Astra deltas

Update:
- `04-DECISION-REGISTER.md`;
- affected `01-BASE/*` architecture contracts;
- governance/readiness;
- future run contracts only where architecture changes product execution requirements.

Do not mutate already-running P001–P004 inputs.

## Step 5 — Run lower-cost adversarial implementation audit

After promotion, run the secondary feasibility audit only if useful.

Its job is to find:
- implementation contradiction;
- missing interface;
- migration hazard;
- test gap;
- dependency violation.

It is not a second expensive architecture brainstorm.

## Step 6 — New freeze

After accepted architecture changes:
- verify repository;
- complete media/public-transport gates;
- create one new immutable freeze SHA;
- generate launch prompts from that exact SHA;
- launch the architecture-vetted product wave.

## Acceptance principle

Prefer the simplest architecture that:
- preserves product/source semantics;
- survives real provider failures;
- preserves reproducibility/lineage;
- can be tested;
- can be promoted to production without conceptual rewrite.

Do not reward sophistication for its own sake.
