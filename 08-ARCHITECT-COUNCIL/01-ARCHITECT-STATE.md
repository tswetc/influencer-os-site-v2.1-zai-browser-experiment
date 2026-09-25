# Central Architect State — Influencer OS

Date: 2026-09-25
Status: PRE_ASTRA_FINALIZATION_IN_PROGRESS

Binding plan:
`17-PRE-ASTRA-FINALIZATION-PLAN.md`

## Product

Influencer OS is treated architecturally as one product platform, not a landing page.

Four logical areas:
1. Public / Product Experience
2. Creator App
3. OS Core / API / Generation Services
4. MCP / Agent Surface

One shared domain/application model.

Guided Studios + Expert Workflow Graph are both first-class interaction modes.

## Current canonical/private implementation evidence

`tswetc/influencer-os`
audited main:
`1158007fdaefd823e24d7a38d4fa7258814b541c`

Verified migration-relevant facts include:
- Next.js Web App;
- CharacterPassport and SceneSpec current browser types;
- hardcoded six-route EngineId union;
- engine-specific compiler logic in code;
- Settings contains provider/apiKey/model/customEndpoint;
- heavy browser state uses IndexedDB and smaller state uses localStorage;
- PassportVersion snapshots exist;
- validated backup/import exists;
- provider switching clears stale provider keys/model;
- tested product consistency/edge cases exist.

These are current behavior constraints, not the target hosted architecture.

## Historical site anchors

Frozen Site V2:
`tswetc/influencer-os-site@672f5722e0316beb7139526be93a5a60b9f4a8a4`

Private Site V2.1 observed head:
`8973b3df689eeb6c72367a806e103602239a4036`

Private V2.1 status predates current public-lab architecture and does not override current founder decisions.

## Browser pilots

Already-running historical pilots:
- P001 GLM-5.2 design A
- P002 GLM-5.3-Flash design A
- P003 GLM-5.3 design B
- P004 GLM-5.3 design B

Do not mutate their pinned inputs.
Ingest and audit completed outputs before Astra when material.

Official E004–E011/Q001 are now intentionally paused until post-Astra Architecture V4.

## Media

M001 complete + audited.

Current founder-reported clean local master:
- 160 normalized unique selected sources;
- 156 materialized;
- 4 holds;
- 156 filesystem files;
- 0 errors.

Official bounded pack targets:
A39 · B42 · C33 · D36.

Wave v4 transport still requires regeneration, actual-transport visual privacy QA, verification and sanitized commit.

## Public-history privacy debt

Current active text uses neutral IDs.
Older historical public commits may still contain obsolete inferred identity strings.

Do not rewrite history while pinned pilots depend on it.

A long-lived official public bridge must use a privacy-safe history strategy before the official E wave.

## Central architect baseline

See:
`10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`

## Provisional Astra R001 hard decisions

1. one execution substrate across Studios / Workflow / API / MCP;
2. creative revision / staleness / rebase semantics;
3. model/provider/adapter + eval/promotion lifecycle;
4. durable paid-generation orchestration/failure/cost semantics;
5. web/API/MCP auth + BYOK/managed secret boundary;
6. reversible migration from current local-first Web App.

These are NOT frozen yet.
The central architect must try to close or narrow them further before Astra launch.

Astra is launched only after the pre-Astra finalization plan and two final audits pass.
