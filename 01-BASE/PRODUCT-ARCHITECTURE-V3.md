# Influencer OS Product Architecture V3

Status: CURRENT PRODUCT-QUALITY TARGET

## Architectural objective

Build one coherent Influencer OS experience while preserving explicit internal boundaries so public UX, creator workflows, generation infrastructure and agent access do not become one unmaintainable client-side application.

The architecture is a modular product system with a shared domain model.

## Domain A — Public / Product Experience

Responsibilities:
- Home / positioning;
- Create entrypoints;
- Studios overview;
- Models;
- Examples / proof;
- MCP / developer explanation;
- Docs;
- Pricing;
- auth entry / entitlement handoff;
- guided demo;
- current product-state truth.

Must NOT own:
- canonical prompt construction;
- provider credentials;
- generation retry logic;
- asset persistence semantics.

## Domain B — Creator App

Responsibilities:
- Workspaces / Projects;
- Character Studio;
- Image Studio;
- Video Studio;
- Scene / Shot;
- Series / Shoot / Feed;
- Prompt Lab;
- guided Canvas;
- Expert Workflow Graph;
- Assets / Compare / History;
- provider/model settings UI;
- export/import UI.

Creator App is a client of OS Core. It must not duplicate canonical prompt rules in components.

## Domain C — OS Core / API / Generation Services

Responsibilities:
- shared domain invariants;
- Character/Canon versioning;
- scene normalization;
- prompt assembly;
- engine adaptation;
- self-check;
- model capability registry;
- provider abstraction;
- generation jobs + attempts;
- persistence;
- lineage;
- export manifests;
- entitlements;
- audit events;
- workflow execution.

Critical rule:
the same operation invoked from Creator App or MCP must resolve through the same core behavior.

## Domain D — MCP / Agent Surface

Responsibilities:
- typed agent tools/resources;
- auth/session boundary;
- character/project lookup;
- prompt-build operations;
- generation orchestration;
- workflow execution;
- asset/history queries;
- deterministic schemas;
- tracing/audit linkage.

MCP is NOT a parallel toy implementation.

MCP must call the same application/core use cases used by the web product.

## Recommended implementation topology

Prefer a modular monolith first.

Conceptual package shape:

```text
apps/
  public-web/        # may be route groups inside one Next app initially
  creator-web/
  mcp-server/
  worker/            # only if async generation execution is needed

packages/
  domain/            # entities, IDs, invariants, events
  core/              # application use cases
  prompt/            # prompt build + adapters
  generation/        # providers/jobs/attempts
  workflows/         # graph validation + execution
  persistence/       # repositories/migrations
  contracts/         # API/MCP schemas
  ui/                # shared visual primitives, not business logic
```

A single Next.js repository may implement these as strict folders/packages for the browser candidate. Do not create microservices merely to look sophisticated.

## State ownership

Server/domain state:
- workspaces/projects;
- character/canon revisions;
- workflows;
- jobs/attempts;
- assets/lineage;
- entitlements;
- audit events.

Client state:
- temporary panel state;
- selection/focus;
- optimistic UI;
- uncommitted draft editing.

Do not use localStorage as the only canonical persistence for durable product objects in a production-oriented candidate.

## Command/query principle

Writes should occur through explicit use cases such as:
- CreateCharacter
- ReviseCharacter
- ReviseCanon
- BuildPrompt
- CreateGenerationJob
- RetryGenerationAttempt
- SaveAssetVersion
- ConnectLineage
- SaveWorkflowRevision
- ExecuteWorkflow
- ExportProject

Reads use stable IDs and filters.

## Async generation principle

`GenerationJob` is the user-intent container.
`GenerationAttempt` is one provider/model execution attempt.

Never overwrite the first attempt when retrying.

This is required for:
- provider fallback;
- cost/debugging;
- reproducibility;
- lineage;
- MCP traceability.

## Versioning principle

Mutable creative identity must produce immutable revisions.

A generated asset must be able to answer:
- which CharacterRevision?
- which CanonRevision?
- which Scene/Shot?
- which PromptBuild?
- which EngineAdapterVersion?
- which ModelProfile snapshot?
- which GenerationAttempt?
- which source AssetVersion(s)?

## Guided + expert interaction

There are two interaction layers over the same system:

### Guided Studios
Purpose-built forms/panels for common jobs.

### Expert Workflow Graph
Node graph for:
- branching;
- model swapping;
- image→edit→video chains;
- reusable workflows;
- inspecting intermediate outputs;
- controlled reruns;
- publishing a complex graph as a simpler reusable action.

A guided action MAY compile into a workflow internally.
A workflow MAY be packaged as a guided tool/preset.

## Promotion rule

Browser candidates may approximate backend infrastructure, but must preserve these boundaries in source structure and data contracts so a selected candidate can be promoted without a full conceptual rewrite.
