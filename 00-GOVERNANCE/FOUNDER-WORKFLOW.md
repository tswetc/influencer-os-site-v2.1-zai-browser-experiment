# Founder Workflow — Personal Z.ai Lab

This lab is intentionally simple enough for one founder to run.

## Phase 1 — Prepare

Central coordinator maintains:
- governance;
- common mission;
- authoritative source;
- design/reference archive;
- media;
- run specifications.

Founder adds media directly through Git/GitHub.

## Phase 2 — Freeze

Before a wave:
1. finish common input changes;
2. verify source/reference/media files;
3. record one Git commit SHA;
4. stop changing the inputs for that wave.

That SHA is the immutable input snapshot.

Changes to `main` after launch do not affect already-running experiments because agents receive commit-pinned URLs.

## Phase 3 — Launch independent chats

One fresh Chat.Z.AI chat = one experiment ID.

The launch message contains:
- RUN_ID;
- expected UI model label;
- INPUT_COMMIT;
- commit-pinned URL to this run's RUN.md;
- instruction to treat GitHub as read-only;
- instruction to execute the complete mission.

Do not launch two chats with the same RUN_ID.

## Phase 4 — Autonomous execution

Each chat:
- downloads input;
- verifies hashes/source;
- researches its exact assigned references;
- creates a measured design constitution;
- builds the full product;
- runs source/function/visual/package review passes;
- exports a unique FINAL.zip.

Agents do not collaborate directly and do not write to the lab repo.

## Phase 5 — Collect

Founder downloads each candidate ZIP and sends it to the central audit chat.

Never rename several candidates to `final.zip`.

Use exact run IDs.

## Phase 6 — Forensic audit

Central coordinator checks:
- source fidelity;
- Git/worklog chronology;
- real vs mock;
- MCP/provider/auth truth;
- tests;
- visual quality;
- export freshness;
- media/provenance;
- run-specific design brief adherence.

## Phase 7 — Synthesis

Strong pieces can be combined conceptually:
- public art direction from one run;
- studio architecture from another;
- Prompt Lab from another;
- transition system from another.

Do not merge code blindly.

## Phase 8 — Promotion

Only selected candidate work enters the canonical site through a dedicated real branch and a separate explicit mission.

Until then this lab remains isolated.
