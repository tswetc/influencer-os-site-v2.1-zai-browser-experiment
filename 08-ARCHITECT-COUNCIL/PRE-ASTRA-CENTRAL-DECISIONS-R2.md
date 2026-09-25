# Pre-Astra Central Decisions R2

Date: 2026-09-25
Status: ACCEPTED_CENTRAL_DECISIONS

This closes two questions that no longer justify Astra capacity.

## C1 — Execution substrate: application commands are primitive; Workflow is orchestration

DECISION:
Direct/guided Studio actions do NOT create an implicit WorkflowRun by default.

Canonical primitive:
surface → application command/use case → domain transaction / PromptBuild / GenerationJob / AssetVersion.

Workflow execution is an orchestration layer over the same application commands.

### ExecutionContext

Every command carries a common execution envelope:
- invocationId;
- correlationId;
- causationId when applicable;
- principal/workspace/project context;
- surface = WEB_STUDIO | WORKFLOW | HTTP_API | MCP | SYSTEM;
- optional workflowRunId;
- optional workflowNodeRunId.

This is correlation/context, not a new universal business aggregate.

### Workflow

`WorkflowRevision` = immutable DAG definition.
`WorkflowRun` exists only when a WorkflowRevision is executed.
`WorkflowNodeRun` records one node execution in that run.

Workflow nodes call the same application handlers used by Studios/API/MCP. No graph-specific prompt/generation implementation.

### Direct MCP/API

A direct MCP/API tool calls the same application command as the corresponding Studio.
An explicit execute-workflow tool creates a WorkflowRun.

### Rerun semantics

- each run is immutable history;
- rerunning selected/downstream creates a NEW WorkflowRun with `parentRunId` and rerun scope;
- unchanged upstream outputs are referenced explicitly from the parent run, not copied or pretended to be re-executed;
- deterministic pure nodes may use content-addressed cache with a visible cache-hit record;
- paid/non-deterministic generation is never silently memoized as a new generation;
- rerunning a generation node creates a new GenerationJob and GenerationAttempt history;
- manual approval gates suspend the existing run and resume it with recorded approver/time;
- saved subworkflow nodes pin a specific WorkflowRevision by default;
- an intentional follow-current subworkflow binding resolves to an exact revision at run start and records that binding.

### Global History

Do not invent one mega execution aggregate.
Build a read-model/activity projection from PromptBuild, GenerationJob/Attempt, WorkflowRun/NodeRun, AssetVersion and AuditEvent using correlation/origin metadata.

WHY:
This preserves one semantic core without forcing every one-click generation through artificial graph ceremony.

RESULT:
A1 is CLOSED centrally.

## C2 — Creative state: mutable draft + immutable execution checkpoint/revision

DECISION:
Creators edit mutable drafts; historical meaning is created only by immutable revisions/snapshots.

### Drafts

Editable objects may have a mutable Draft with:
- stable container ID;
- baseRevisionId;
- optimistic concurrency/version token;
- autosaved draft payload;
- updatedAt/updatedBy.

Autosave does NOT create revision spam.

### Commit boundary

Create an immutable revision when:
1. user explicitly saves/checkpoints/publishes; OR
2. an operation needs a durable historical reference and the draft is dirty.

In case 2 the system transparently creates an `EXECUTION_CHECKPOINT` revision before BuildPrompt/Workflow execution.

The user should not be forced to understand revision mechanics to generate.

### First-class revisions

Keep first-class:
- CharacterRevision;
- CanonRevision;
- SceneRevision for saved reusable scenes;
- PlanRevision for saved Series/Shoot/Feed plans;
- WorkflowRevision.

Do NOT add ShotRevision initially.
Shot definitions live immutably inside a PlanRevision or as immutable Shot records owned by that PlanRevision.

PromptBuild, SelfCheckReport, GenerationAttempt and AssetVersion are already immutable historical anchors.

### Dependency binding

Draft/user-facing dependency choices may be:
- FOLLOW_ACTIVE — use the container's active revision at execution;
- PINNED — use an explicitly selected revision.

At execution time every FOLLOW_ACTIVE dependency resolves to exact immutable revision IDs/snapshots.
Those exact bindings are stored on PromptBuild/WorkflowRun inputs.

No running or historical object ever depends on ambiguous `latest`.

### Staleness

Semantic drafts do not become corrupted merely because an upstream active revision changes.

Derived artifacts such as preview PromptBuild/SelfCheck may be shown as `OUTDATED_VS_CURRENT` when their input hashes differ from the current draft.

Historical PromptBuilds/Assets are never called invalid or silently rewritten; they remain accurate history.

### Rebase/update

There is no in-place rebase of immutable history.

`Update to current` operates only on a mutable draft:
old revision → new draft based on current dependencies → explicit/automatic new revision.

Historical SceneRevision/PlanRevision/WorkflowRevision remain unchanged.

### Manual prompt edits

Never mutate an existing PromptBuild.
A manual edit creates a new PromptBuild variant:
- derivedFromPromptBuildId;
- edit origin = MANUAL;
- exact final payload/hash;
- rerun SelfCheck;
- preserve original compiled layers for comparison.

### Character vs Canon

CharacterRevision and CanonRevision remain separate first-class histories.
Identity correction must not rewrite narrative canon history, and canon edits must not rewrite identity history.

WHY:
This gives simple creator autosave UX while guaranteeing exact historical provenance.

RESULT:
A2 is CLOSED centrally.

## Remaining Astra-class knots after R2

A3 — dynamic Model/Provider/Adapter + research/eval/promotion/rollback lifecycle.
A4 — durable paid generation transaction/queue/idempotency/cancel/crash/cost semantics.
A5 — web/API/MCP principal + Workspace/Entitlement + BYOK/managed secret boundary.
A6 — reversible migration from current local-first Web App into server-canonical platform.

These remain coupled and high-impact enough to justify Astra after pre-Astra finalization.