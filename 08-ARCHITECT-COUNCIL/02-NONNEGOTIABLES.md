# Non-Negotiables

These are founder/product constraints, not suggestions for an architecture reviewer.

## Product

- one coherent product platform;
- broad public site + real creator product;
- Character continuity is central;
- image AND video generation;
- Series/Shoot/Feed/planning workflows;
- Prompt Lab exposing OS transformation;
- Models/provider layer;
- Assets/history/compare/lineage;
- working MCP/agent surface;
- EN/RU;
- responsive;
- exportable portable source project.

## Interaction

- guided/direct Studios must remain simple enough for normal users;
- expert node-graph mode must exist for professional workflows;
- graph mode may not become the default interaction for every task;
- graph and Studios must use the same core/domain semantics.

## Source fidelity

- preserve OS23.6 behavior as source truth where published;
- do not invent hidden source semantics;
- mark extensions explicitly;
- do not replace Character/Canon with a generic prompt blob.

## Runtime honesty

Explicitly distinguish:
LIVE
MOCK
UNVERIFIED_EXTERNAL
UI_ONLY
UNAVAILABLE/DEPRECATED.

## Data/reproducibility

- immutable historical revisions;
- retry != overwrite;
- asset edit != overwrite;
- exact lineage;
- PromptBuild/provider adapter/model snapshot sufficient for reproducibility;
- secrets excluded from normal exports/logs/client persistence.

## Lab workflow

- public transport repo is read-only to browser runners;
- experiments are isolated;
- no shared mutable implementation branch between browser agents;
- candidates are audited before promotion.

## Product ownership

Founder determines what the product should do and what the final product should feel like.

Architecture council determines the strongest technical shape for implementing that intent.
