# Pre-Astra Finalization Plan — Influencer OS

Date: 2026-09-25
Status: ACTIVE
Owner: Central Architect + Founder
Astra launch: BLOCKED_UNTIL_PRE_ASTRA_READY

## Founder decision

Do NOT launch ASTRA-R001 yet.

First finish every architecture/governance/source/experiment preparation task that does not require Astra; ingest and audit the already-running P001–P004 evidence when available; finish the Wave v4 media/transport infrastructure; remove stale contradictions from active project memory; reduce the unresolved architecture set as far as possible; then freeze one exact evidence packet.

Official E004–E011 product-quality wave is PAUSED until post-Astra Architecture V4 freeze. Existing P001–P004 continue unchanged on their historical pinned inputs.

## PHASE 0 — Current-state authority lock

Goal: one unambiguous current state.

Required:
- verify public lab HEAD;
- verify private Influencer OS canonical HEAD;
- verify Site V2 frozen HEAD;
- verify private Site V2.1 observed HEAD;
- verify source authority/supersession/founder-decision files;
- find stale active documents implying parallel Astra + official E launch, old five-question Astra scope, old HIGH reasoning, deprecated media manifests, or inferred real-world identity.

Output: PRE-ASTRA-AUTHORITY-SNAPSHOT.md
Gate: no active document routes a new agent through contradictory current instructions.

## PHASE 1 — Finish central source/product audit

Goal: extract every architecture-relevant fact verifiable without Astra.

Audit current private product behavior: CharacterPassport/Canon/SceneSpec, Worlds/techniques/packs/compiler, self-check, EngineId/provider architecture, API-key handling, localStorage/IndexedDB, PassportVersion, backup/import, history/favorites/presets/scenes/user dictionary, tests, migration-sensitive behavior, entitlement/license boundary where present.

Audit Site V2/V2.1 only for product/architecture evidence. Separate inherited source truth from browser-lab extensions.

Output: PRE-ASTRA-SOURCE-BEHAVIOR-MATRIX.md
Gate: every Astra question cites verified current behavior or explicitly states that no current implementation exists.

## PHASE 2 — Finish central architecture decisions

Close everything that does not require Astra:
- modular monolith;
- package/dependency direction;
- Postgres-class durable metadata;
- object storage;
- application use-case layer;
- Job != Attempt;
- immutable historical output;
- DAG-first workflow v1;
- AssetVersion lineage;
- audit vs telemetry;
- versioned export/import;
- selective browser-candidate promotion;
- no premature microservices/event sourcing/Kubernetes;
- public lab != production storage;
- legacy browser provider keys are never silently uploaded.

Challenge every remaining OPEN question: if current evidence is enough, solve it now and remove it from Astra scope.

Outputs: updated ADR register, updated central baseline, PRE-ASTRA-OPEN-KNOTS-FINAL.md
Gate: Astra gets only irreducible architecture decisions.

## PHASE 3 — Finish media + transport infrastructure

Prepare future E wave but do NOT launch it before Astra.

Required:
1. pull latest lab;
2. regenerate exact curated A/B/C/D manifests from clean local master;
3. verify A39 / B42 / C33 / D36;
4. verify G0027/s01, G0068/s06 and G0111/s05 are absent;
5. build sanitized Wave v4 derivatives;
6. strip metadata/source paths;
7. generate actual-transport contact sheets/posters;
8. visually inspect every transported tile/poster;
9. run verify_public_wave.py, validate_run_contracts.py and audit_public_lab.py;
10. commit only approved sanitized transport/evidence.

Output: WAVE_V4_TRANSPORT_READY

## PHASE 4 — Collect and audit P001–P004

For every completed pilot:
- preserve exact ZIP and SHA-256;
- record actual runtime/model UI label;
- inspect source tree, not only agent report;
- run build/lint/test where possible;
- inspect domain/application separation, generation truth, graph semantics, MCP, auth/persistence, EN/RU, screenshots, responsive behavior, media/provenance and failure logs.

Extract only architecture evidence relevant to A1–A6.

Outputs: P00X-FORENSIC-AUDIT.md and P001-P004-ARCHITECTURE-EVIDENCE.md

If a P run is still running after all other pre-Astra work is done, wait only if its expected evidence is material to A1–A6; otherwise mark it pending and do not block Astra artificially.

## PHASE 5 — Privacy/public-lab cleanup decision

Current active text is neutral-ID only, but older public history may contain obsolete identity inference.

Do not rewrite commits still required by pinned pilots.

Before the official long-lived E-wave transport, choose a sanitized clean-history bridge/root or an equivalent privacy-safe transport strategy.

Output: PUBLIC-BRIDGE-PRIVACY-DECISION.md

## PHASE 6 — Pre-Astra synthesis

Create:
1. PRE-ASTRA-EXECUTIVE-SNAPSHOT.md
2. PRE-ASTRA-SOURCE-BEHAVIOR-MATRIX.md
3. PRE-ASTRA-ARCHITECTURE-DELTA-MAP.md
4. PRE-ASTRA-OPEN-KNOTS-FINAL.md
5. PRE-ASTRA-EVIDENCE-ROUTER.md
6. updated ADR register;
7. updated non-negotiables;
8. updated current project memory.

Rules: no irrelevant design/media detail, no long chat history, no duplicated facts, no solved questions, exact private source paths only where needed.

## PHASE 7 — Two final pre-Astra audits

Audit A — structural: files, links, SHAs, authority order, deprecated paths, old Astra instructions, stale run references.

Audit B — semantic/adversarial: try to disprove the packet. Check for missing founder requirements, wrong current-product claims, greenfield migration assumptions, paid-generation races, weak model-lifecycle design, MCP authorization bypass, mutable-latest history corruption, candidate-promotion leakage, and public-transport/production-storage confusion.

Output: PRE-ASTRA-READINESS-AUDIT.md
Gate: PASS / PASS only.

## PHASE 8 — Immutable Astra freeze

Only after Phases 0–7 pass:
1. commit all pre-Astra evidence;
2. push;
3. verify remote HEAD;
4. verify clean tree;
5. record exact 40-character SHA;
6. make no further mutation to Astra input;
7. generate launch prompt from that SHA.

Status becomes PRE_ASTRA_READY.

## PHASE 9 — Launch ASTRA-R001

Model: GPT-6 Astra
Reasoning: XHIGH
Mode: READ_ONLY_TARGETED_ARCHITECTURE_ESCALATION

Astra gets only the final focus packet, final central baseline, founder→architecture gap map, evidence router, exact current private files when needed, and material pilot architecture evidence.

Output: ASTRA-R001-DECISIONS.md

## PHASE 10 — Post-Astra reconciliation

Preserve raw Astra output unchanged. Build a delta matrix against central baseline, verified source and pilot evidence. Promote only accepted deltas. Produce Architecture V4, updated ADRs, migration sequence and updated run contracts. Optionally run a cheaper adversarial implementation audit.

## PHASE 11 — Official E-wave freeze and launch

Only after post-Astra reconciliation:
- bind E004–E011 + Q001 to Architecture V4;
- bind sanitized Wave v4 media;
- create one immutable freeze SHA;
- generate launch prompts;
- launch fresh isolated runs.

## Definition of PRE_ASTRA_READY

All must be true:
- current authority snapshot complete;
- current source/product audit complete;
- all centrally-solvable architecture decisions closed;
- final open-knot list minimized;
- Wave v4 transport complete or explicitly architecture-irrelevant;
- P001–P004 evidence ingested or explicitly non-blocking;
- public-history privacy strategy decided;
- current memory/governance reconciled;
- evidence router complete;
- structural audit PASS;
- semantic/adversarial audit PASS;
- exact immutable Astra SHA recorded.

Until then: ASTRA_R001_NOT_LAUNCHED
