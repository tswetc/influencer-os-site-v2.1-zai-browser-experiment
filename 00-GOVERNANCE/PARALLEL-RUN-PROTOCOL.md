# Parallel Run Protocol

## Core rule

Many Chat.Z.AI chats may work at the same time, but they do **not** co-edit one implementation.

The GitHub repository is the shared, read-only **input/coordination plane**.
Each Z.ai chat works inside its own isolated sandbox and produces its own candidate product/export.

This avoids cross-run corruption while keeping every run grounded in the same source.

## Shared vs isolated

Shared across runs:
- governance;
- mission backbone;
- source truth;
- product truth;
- reference archive;
- media packs;
- evaluation rules;
- pinned Git commit.

Isolated per run:
- Z.ai chat;
- sandbox filesystem;
- implementation;
- local Git history;
- worklog;
- provider experiments;
- final export.

## No cross-run contamination

A run must read:
1. common governance;
2. common mission;
3. common source truth;
4. the reference set assigned to that run;
5. its own `06-EXPERIMENTS/<RUN_ID>/` folder.

A run must NOT use sibling experiment folders as design/product instructions.

## GitHub write policy for agents

Default: **READ ONLY**.

Z.ai agents must not push commits, rewrite `main`, or write results into shared paths.

Results are exported locally with a unique run ID and are later ingested/audited centrally.

If collaborative write-back is ever enabled, it must use a separate per-run branch created specifically for that purpose. Never allow several chats to write the same branch.

## Result naming

`ZAI-E###-<MODEL>-<VARIANT>-FINAL.zip`

Mandatory inside each export:
- RUN-MANIFEST.md
- SOURCE-RECONCILIATION.md
- DECISION-LOG.md
- FAILURE-LOG.md
- TEST-RESULTS.md
- FINAL-HANDOFF.md
- EXPORT-MANIFEST.md

## Management model

Parallel runs are not expected to communicate directly with each other.

Coordination happens through:
- immutable common inputs;
- unique run IDs;
- central forensic audit;
- later synthesis of selected ideas.

This is deliberate: independent attempts are more useful than several agents accidentally converging on each other's assumptions.
