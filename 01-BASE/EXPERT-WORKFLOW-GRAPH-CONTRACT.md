# Expert Workflow Graph Contract

Status: REQUIRED EXPERT MODE

## Research basis

Current Figma Weave product material describes a node-based canvas where creators can connect models, transform assets, refine outputs, branch ideas, compare approaches and reuse workflows. It also exposes complex workflows as simpler reusable tools.

Influencer OS should transfer this interaction model, not Figma's visual skin.

## Product role

The expert graph is for professional users who need:
- explicit control;
- branching;
- multi-model chains;
- intermediate inspection;
- batch/repeat execution;
- reusable production logic.

It must coexist with guided Studios.

## Required node families

### Context nodes
- CharacterRevision
- CanonRevision
- ReferenceAsset
- Scene
- Shot / Plan
- World / Technique / Format

### OS intelligence nodes
- PromptBuild
- EngineAdapter
- SelfCheck
- Prompt Transform / Edit
- Caption / Cutaway / Planning helpers where source supports them

### Generation nodes
- Image Generation
- Video Generation
- Edit / Relight / Try-on / other product extensions when implemented
- Model switch / provider strategy

### Media nodes
- Asset input
- AssetVersion
- Compare
- Select
- Export

### Control nodes
- Branch
- Merge/Select
- Batch/map where safe
- Manual approval gate
- reusable subworkflow/tool

## Typed ports

Edges must be type-aware.

Examples:
- CharacterRevision cannot connect directly to a binary-only input without an explicit compatible node;
- Image AssetVersion can feed image-to-video;
- PromptBuild can feed a compatible Generation node;
- SelfCheckReport can gate execution.

Invalid connections should be prevented or shown as explicit errors.

## Execution

Graph editing and graph execution are distinct states.

Execution must:
- create WorkflowRun;
- preserve per-node status;
- preserve produced object IDs;
- allow rerunning a downstream branch without pretending upstream changed;
- keep lineage.

## UX requirements

- infinite/open canvas;
- pan + zoom;
- minimap or orientation aid when graph exceeds viewport;
- node search/add;
- typed connection affordances;
- selected-node inspector;
- run selected / run downstream / run all where valid;
- visible running/success/error/skipped state;
- per-node input/output preview;
- compare branches;
- collapsible groups/subflows;
- keyboard shortcuts;
- undo/redo;
- autosave draft;
- explicit revision/save point;
- mobile fallback that does not pretend a dense node graph is ideal on a phone.

## Guided-tool bridge

A validated WorkflowRevision may be published internally as a simpler reusable tool with:
- selected exposed inputs;
- locked internal nodes;
- human-readable name/description;
- output contract.

This allows:
expert authoring → repeatable simple Studio action.

## Do not copy

Do not copy:
- Figma/Weave branding;
- their exact node chrome;
- their color system;
- their wording.

Transfer the workflow mechanics into the Influencer OS design system.
