# Open Architecture Questions

These are the questions that most need an independent high-capability review.

## Q1 — Deployment topology

Current hypothesis:
modular monolith first.

Need decision:
- one Next.js/Node application with route/package boundaries?
- separate worker process for async generation from day one?
- separate MCP server or transport adapter in same deployable?
- when should any boundary become a real service?

Required output:
recommended topology for browser candidate, beta and production.

## Q2 — Persistence + transaction boundaries

Need exact durable model for:
- Workspace/Project ownership;
- CharacterRevision + CanonRevision;
- PromptBuild;
- GenerationJob + GenerationAttempt;
- WorkflowRevision + WorkflowRun;
- AssetVersion + Lineage;
- AuditEvent.

Need decision:
database technology assumptions, transaction boundaries, optimistic concurrency, migration/version policy, repository interfaces.

## Q3 — Async generation execution

Need exact semantics for:
- job queue;
- provider request lifecycle;
- retry/fallback;
- timeout/cancel;
- idempotency;
- duplicate suppression;
- progress events;
- cost/usage accounting;
- recovery after process restart.

## Q4 — Workflow graph execution model

Need decision:
- DAG only or controlled cycles?
- typed port schema;
- validation;
- compile phase vs execution phase;
- partial rerun;
- cache/reuse semantics;
- manual approval gates;
- subflows;
- graph-to-guided-tool compilation.

## Q5 — Prompt build + adapter versioning

Need exact interface between:
source-preserving prompt assembly
→ ModelProfile
→ EngineAdapterVersion
→ provider request.

Need version/evolution rules that reproduce old assets after model/provider updates.

## Q6 — Provider architecture

Need decision:
- ProviderConnection secret boundary;
- provider SDK wrapper shape;
- capability negotiation;
- model registry;
- status transitions LIVE / SUPPORTED_NOT_TESTED / UI_ONLY / unavailable;
- provider fallback without semantic drift.

## Q7 — Web/API/MCP parity

Need exact application boundary so:
Creator App
REST/HTTP API
MCP tools
future automations
all invoke the same use cases.

Need:
schema ownership, auth context, error model, trace/correlation IDs and parity tests.

## Q8 — Asset/media architecture

Need future production shape for:
- originals;
- generated files;
- derivatives/thumbnails;
- video;
- object storage;
- signed URLs;
- metadata;
- rights/publication state;
- hashing/deduplication;
- lineage;
- CDN.

Current browser-wave atlas derivatives are transport-only and do not answer this production question.

## Q9 — Auth / workspace / entitlement boundary

Need decision:
- authentication vs authorization;
- workspace memberships/roles;
- provider credentials ownership;
- project access;
- entitlement enforcement;
- MCP agent auth;
- audit trail.

## Q10 — Eventing / observability

Need decide:
- domain events vs infrastructure events;
- audit log vs telemetry;
- workflow/job events;
- OpenTelemetry/tracing;
- correlation IDs;
- failure taxonomy;
- debugging provider errors without leaking secrets.

## Q11 — Export/import / portability

Need a robust bundle format that can move project state without:
- secrets;
- broken revision references;
- missing media provenance;
- schema ambiguity.

Need versioned export schema and migration rules.

## Q12 — Browser-lab → canonical-product promotion

Need exact promotion strategy:
- what can be cherry-picked;
- what must be reimplemented;
- compatibility contract with private canonical source;
- how to avoid browser-prototype architecture contaminating production;
- migration acceptance tests.

## Q13 — Testing architecture

Need layered test strategy:
domain invariants
source parity
prompt determinism
provider adapter contracts
job retry/idempotency
workflow graph validation/execution
MCP/core parity
persistence migration
export/import
security boundaries
end-to-end flagship journeys.

## Q14 — Scale / performance assumptions

Need explicit non-premature but production-safe assumptions around:
- concurrent generation jobs;
- large media libraries;
- workflow graph size;
- event history;
- multi-tenant isolation;
- streaming progress;
- video processing.

## Q15 — What should NOT be generalized yet?

Need a list of abstractions that would be architectural overengineering at the current stage.
