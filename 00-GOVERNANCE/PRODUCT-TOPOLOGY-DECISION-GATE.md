# Product Topology Decision — Resolved 2026-09-24

Status: FOUNDER DECISION RECORDED

The earlier topology gate is resolved for the browser-product architecture.

## Selected direction

Influencer OS is explored as one coherent product experience with four explicit logical domains sharing one domain model:

1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

This is NOT a requirement to create four microservices.

The default engineering shape is a modular monolith / monorepo-compatible architecture with strict boundaries and shared contracts.

Detailed contract:
- `01-BASE/PRODUCT-ARCHITECTURE-V3.md`
- `01-BASE/DOMAIN-MODEL-V1.md`
- `01-BASE/EXPERT-WORKFLOW-GRAPH-CONTRACT.md`

## Relationship to older private product-family canon

Private project-memory is not modified by this public-lab decision.

For PUBLIC browser runs, the current founder decision and public architecture files supersede older inaccessible/stale topology assumptions.

Canonical promotion later requires a deliberate private-repository migration plan. It does not require browser agents to preserve old private topology during exploration.

## Promotion principle

Promote concepts and validated implementation deliberately.

Do not merge an entire Z.ai candidate wholesale merely because it uses the selected topology.
