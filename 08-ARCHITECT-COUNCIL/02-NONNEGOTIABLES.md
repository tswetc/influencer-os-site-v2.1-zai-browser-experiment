# Non-Negotiables

These are founder/product constraints, not suggestions for an architecture reviewer.

## Product

- one coherent Influencer OS platform, not a landing page;
- broad public/product experience + real creator product;
- Character continuity is central;
- Character Passport + Canon remain explicit product concepts;
- image AND video generation are real capabilities;
- Series / Shoot / Feed / planning workflows;
- Prompt Lab exposes OS transformation rather than hiding it;
- continuously evolving model/provider layer;
- Assets / history / compare / exact lineage;
- real MCP/agent surface;
- EN/RU;
- responsive;
- exportable/portable project state and source project.

## Interaction

- guided/direct Studios must remain simple enough for normal users;
- mini-studios should interoperate through shared objects, not isolated local state;
- expert node-graph mode must exist for professional workflows;
- graph mode is not the default for every task;
- graph, Studios, API and MCP must use the SAME core/application semantics;
- one validated expert workflow may be exposed as a bounded reusable simple tool.

## Generation / model ecosystem

- current OS23.6 engine-specific behavior is source truth where published;
- future models/providers must be addable without erasing provider-specific differences;
- model status LIVE requires real evidence;
- provider/model research must not become runtime truth without validation/eval/promotion;
- retry != overwrite;
- fallback must be explicit;
- expensive generation must not silently duplicate paid external requests.

## Source fidelity

- preserve OS23.6 behavior as source truth where published;
- do not invent hidden source semantics;
- mark extensions explicitly;
- do not replace Character/Canon with a generic prompt blob.

## Security / access

The product may support:
- anonymous bounded demo;
- authenticated Creator App;
- HTTP API;
- remote MCP;
- user/workspace BYOK;
- future platform-managed provider credentials.

But:
- provider secrets never enter normal exports/logs/telemetry;
- agents never receive raw provider secrets by default;
- authorization is workspace/project scoped;
- authentication, authorization, membership/role and entitlement stay distinct.

## Runtime honesty

Explicitly distinguish:
LIVE
MOCK
UNVERIFIED_EXTERNAL
UI_ONLY
UNAVAILABLE/DEPRECATED.

## Data/reproducibility

- historical executed state is immutable;
- user editing UX may be simple, but generation binds exact effective state;
- asset edit != overwrite;
- exact typed lineage;
- prompt/compiler/model/adapter/provider state sufficient for forensic explanation;
- old output must never inherit newer model/adapter/canon semantics silently;
- external model stochasticity means “reproducible” = exact effective request/history, not guaranteed identical pixels.

## Migration

- the current local-first Web App is valuable existing behavior, not disposable scaffolding;
- do not big-bang rewrite it;
- do not keep two canonical architectures forever;
- legacy browser API keys must never be silently uploaded;
- existing backup/import and tested product behavior must have explicit compatibility gates.

## Media/privacy

- neutral public identity IDs only;
- public-lab transport is temporary;
- product-use approval and public-repository publication are separate decisions;
- user/private media is private by default;
- current browser media transport is not production object storage.

## Lab workflow

- public transport repo is read-only to browser runners;
- experiments are isolated;
- no shared mutable implementation branch between browser agents;
- candidates are audited before promotion;
- current pinned experiments are not rewritten retroactively.

## Product ownership

Founder determines:
- what product capabilities exist;
- what UX should achieve;
- taste/design direction;
- business priorities;
- public/private publication choices.

Architecture owns:
- domain boundaries;
- persistence;
- transactions;
- execution semantics;
- queues/retries;
- provider/model lifecycle architecture;
- auth/secrets;
- workflow runtime;
- migration;
- observability;
- testing and promotion mechanics.
