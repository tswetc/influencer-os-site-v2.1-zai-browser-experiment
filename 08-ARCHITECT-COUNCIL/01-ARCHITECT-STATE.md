# Central Architect State — Influencer OS

Date: 2026-09-25
Status: FUNDAMENTAL_ASTRA_R001_READY_AFTER_FREEZE

## Product

Influencer OS is now treated architecturally as one product platform, not a landing page.

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

Current source facts relevant to migration:
- Next.js Web App;
- CharacterPassport and SceneSpec are current core browser types;
- hardcoded six-route EngineId union;
- engine-specific compiler logic lives in code;
- Settings contains provider/apiKey/model/customEndpoint;
- heavy browser state uses IndexedDB, small state uses localStorage;
- PassportVersion snapshots exist;
- validated backup/import exists;
- provider switching clears stale provider keys/model;
- tested product consistency/edge cases exist.

These are current behavior constraints, not the target hosted architecture.

## Public lab

This repository remains an intentionally temporary PUBLIC transport/experiment lab.

No secrets/private customer data.
Neutral identity IDs only.

Current architecture-preparation lineage:
- pre-Astra architecture prep reached `e21cd0c488cadb8dba1a4ccf9749f2b6aa24c7e0`;
- final Astra packet will be pinned at the later freeze commit recorded after precheck.

## Historical site anchors

Frozen Site V2:
`tswetc/influencer-os-site@672f5722e0316beb7139526be93a5a60b9f4a8a4`

Private Site V2.1 observed head:
`8973b3df689eeb6c72367a806e103602239a4036`

Private V2.1 status predates current public-lab architecture and does not override current founder decisions.

## Browser product runs

Already-running historical pilots:
- P001 GLM-5.2 design A
- P002 GLM-5.3-Flash design A
- P003 GLM-5.3 design B
- P004 GLM-5.3 design B

Do not mutate their pinned inputs.

Official E004–E011 should use a new post-Astra/product-freeze if Astra materially changes contracts.

## Media

M001 complete + audited.

Current founder-reported clean local master:
- 160 normalized unique selected sources;
- 156 materialized;
- 4 holds;
- 156 filesystem files;
- 0 errors.

Official bounded packs target 30–45 assets/design.
Current v4 target counts:
A 39 · B 42 · C 33 · D 36.

Wave v4 still requires public-transport freeze and visual pixel-privacy review before official launches.

## Public-history privacy debt

Current active text uses neutral IDs.
Older historical public commits may still contain obsolete inferred identity strings.

Do not rewrite history while already-running pinned experiments need it.

Before official long-lived public transport:
create a sanitized clean bridge/root or otherwise remove historical privacy debt without breaking current evidence.

## Central architect settled baseline

See:
`10-CENTRAL-ARCHITECT-BASELINE-2026-09-25.md`

## Astra R001 remaining hard decisions

1. one execution substrate across Studios / Workflow / API / MCP;
2. creative revision / staleness / rebase semantics;
3. model/provider/adapter + eval/promotion lifecycle;
4. durable paid-generation orchestration/failure/cost semantics;
5. web/API/MCP auth + BYOK/managed secret boundary;
6. reversible migration from current local-first Web App.

Everything else should be solved later at lower cost unless one of these decisions exposes a new foundational contradiction.
