# Full Product Run Contract V3

Status: REQUIRED FOR E004–E011 AND LATER PRODUCT-QUALITY RUNS

## Mission

Build the strongest complete Influencer OS browser-product candidate possible from the frozen public input.

This is not:
- a landing-page exercise;
- a route-count exercise;
- a static prototype;
- a generic prompt wrapper.

## Architecture

Implement or structurally preserve the four logical domains:

1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

All domains share the domain model and application use cases.

Do not duplicate prompt/identity/generation logic in UI and MCP separately.

## Domain model

Use the semantics in:
`01-BASE/DOMAIN-MODEL-V1.md`

Required code-level concepts:
- Workspace
- Project
- Character
- CharacterRevision
- CanonRevision
- Scene
- Plan / Shot
- PromptBuild
- GenerationJob
- GenerationAttempt
- Asset
- AssetVersion
- Lineage
- ProviderConnection
- ModelProfile
- EngineAdapterVersion
- SelfCheckReport
- Workflow
- WorkflowRevision
- WorkflowRun
- ExportBundle
- AuditEvent
- Entitlement

If the sandbox cannot provide production persistence, keep the domain/use-case contracts correct and label the persistence adapter truthfully.

## P0 product jobs

### P0-1 Character continuity
Create/edit Character → immutable CharacterRevision + CanonRevision → save/reuse → visible revision/history semantics.

### P0-2 OS transformation
Scene/Image/Prompt Lab → visible:
Identity → Canon → World → Technique → Scene → Capture/Realism → Format → Engine Adapter → Quality/Self-check → final provider payload.

The user must be able to inspect why the final payload looks the way it does.

### P0-3 Reuse + lineage
Reuse the SAME character/project state into:
- Image;
- Video;
- Series/Shoot/Feed/Plan;
- Expert Workflow Graph.

Saved output must expose lineage/provenance back to prompt/build/job state.

## Expert Workflow Graph

This is required.

It must be more than decorative nodes.

Implement:
- typed nodes/ports;
- Character/Canon/Scene/Asset context nodes;
- PromptBuild/SelfCheck/Adapter intelligence nodes;
- Image/Video generation nodes;
- branching;
- model/provider changes;
- intermediate previews;
- run status;
- downstream rerun semantics;
- lineage;
- reusable workflow revision;
- ability to expose a validated graph as a simpler reusable action/preset concept.

If the environment cannot execute every node against a real provider, use truthful MOCK/UNVERIFIED execution while preserving graph semantics.

## Public surfaces

Required:
- Home
- Create / Studios discovery
- Models
- Examples / Proof / Community as appropriate
- MCP
- Docs / How it works
- Pricing
- Auth entry / Settings boundary

## Creator surfaces

Required:
- Character
- Image
- Video
- Scene / Shot
- Series / Shoot / Feed
- Prompt Lab
- Canvas / Workflow
- Projects
- Assets
- Compare / lineage/history where appropriate
- Models/settings/provider boundary

## Generation truth

States must be explicit:
- LIVE
- MOCK
- UNVERIFIED
- UI_ONLY
- unavailable/deprecated when applicable

No provider is LIVE merely because a UI card exists.

GenerationJob and GenerationAttempt must be distinguishable in code/data.

## Persistence truth

Do not make durable product objects canonical only in component state.

If using local/browser persistence because of sandbox constraints:
- isolate it behind a persistence interface;
- document the production migration;
- do not claim cloud sync/auth that does not exist.

## Media

Use only the assigned bounded transport pack.

Do NOT:
- browse the whole atlas as a substitute;
- invent external images when adequate founder media exists;
- present reference-only media as IOS output;
- expose hidden source paths.

Use media purposefully across public proof, Examples and creator surfaces.

## Design

Execute the exact assigned reference recipe.

Before scaling:
- research exact references;
- capture evidence;
- write DESIGN-CONSTITUTION;
- write DESIGN-TOKENS;
- write MOTION-SPEC;
- write REFERENCE-TRANSFER-MATRIX;
- build one representative slice;
- run V1 composition/grid correction;
- run V2 typography/material/colour correction;
- run V3 motion/interaction correction.

Do not use vague “premium/cinematic/editorial” interpretation without measured mechanics.

## Responsive

Required inspection:
- 1920
- 1440
- 1024/768
- 430/390
- 360

Mobile is recomposed, not simply compressed.

Expert graph may use a dedicated mobile fallback/overview rather than forcing desktop-density graph editing onto a phone.

## Language

Full EN/RU product behavior, not only translated navigation.

## Security

Never expose:
- provider secrets;
- credentials;
- customer/license data.

Do not serialize provider API keys into exports, audit logs or normal client persistence.

## MCP

MCP uses the same core use cases.

Required evidence:
- target MCP spec/SDK version;
- deterministic tool schemas;
- local protocol-level test;
- tool results consistent with web/core behavior;
- auth/remote status truthfully documented.

## Tests

Minimum:
- domain invariant tests;
- source-parity tests;
- prompt-build deterministic tests;
- adapter/model switch tests;
- retry creates new GenerationAttempt;
- lineage tests;
- workflow graph validation tests;
- MCP/core parity tests;
- persistence import/export failure tests;
- route/smoke tests where available.

## Mandatory final evidence

In addition to existing run evidence:
- ARCHITECTURE-CONFORMANCE.md
- DOMAIN-MODEL-CONFORMANCE.md
- WORKFLOW-GRAPH-EVIDENCE.md
- PROVIDER-STATE-MATRIX.md
- PERSISTENCE-STATE.md
- MCP-COMPATIBILITY.md
- LINEAGE-EVIDENCE.md
- final screenshots at required widths

## Completion

COMPLETE is forbidden if an actionable P0 remains.

Do not spend late-run time on decorative P2 features while:
- P0 job depth;
- source fidelity;
- architecture;
- responsive;
- reference fidelity;
- export freshness
remain incomplete.
