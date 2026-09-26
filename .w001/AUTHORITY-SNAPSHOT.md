# W001 Authority Snapshot

Issued: 2026-09-26
Issued by: trusted local plane (ZCode Desktop / osv3ctl context-compiler)
Central authority input: `tswetc/project-memory@os-v3/central-memory-2026-09-25`
Central HEAD: `e9e4131efdd47f65312a489e5c576200115e8fc1`
Canonical product base: `tswetc/influencer-os@1158007fdaefd823e24d7a38d4fa7258814b541c` (v1.23.0, verified at construction)

This snapshot contains only mission-relevant current authority. It does
not override founder/product authority and never replaces the launch
registry.

## Founder decisions operative for W001

1. C0 is closed with R02 NOT_RECOVERED; do not search for or re-run R02
   under its old identity (C0-FINAL-SYNTHESIS, founder-directed transition).
2. Proceed directly into W001 production development; no standalone
   C1/validation wave (CURRENT-SNAPSHOT: "No further R02 search and no
   standalone C1 validation wave").
3. Minimize founder repetitive actions; ZCode Desktop is the trusted
   local routine execution plane; browser agents do the deep long-running
   work; Codex/Astra reserved for highest-level unresolved conflicts
   (EXECUTION-ORCHESTRATION-V1).
4. Canonical main stays untouched until W001 integration gates pass
   (CURRENT-SNAPSHOT launch gates).

## Binding product/architecture facts (CURRENT_TRUSTED)

- OS v3 is the broad product; OS23.6/v1.23 is the mature embedded core
  discipline, not a synonym for OS v3.
- Continuity categories: Character Identity; Product/Object Identity;
  Place/Environment Identity; Scene/Context; Motion/Performance;
  Taste/Visual Language. Taste remains first-class and separate from
  identity.
- Model/provider representations are replaceable and attach to immutable
  semantic revisions; provider/model IDs never become continuity identity.
- No big-bang rewrite of working behavior; existing OS23.6 behavior must
  remain unchanged when new functionality is unused (REGRESSION-CONTRACT).
- Semantic LOCK capability failures are fail-closed (foundation
  `capabilityConflicts`).
- Legacy provenance stays honestly partial: never invent biometrics,
  provenance, provider/model routes, or fabricated AssetVersion IDs.
- Guided Studio and Expert Workflow Graph share one application/domain
  core; web/API/MCP are surfaces, not separate implementations.
- Deterministic transforms may cache; paid/nondeterministic execution
  semantics stay explicit; no secrets/provider keys in domain state.

## Frozen construction facts (VERIFIED_SOURCE_FACT)

- `lib/osv3/foundation/**` is the frozen W001 seed (seed commit recorded
  in the construction manifest). Workers may import from it; no worker
  may write it. Foundation defects are reported as blockers/change
  requests; central mints a new checkpoint if needed.
- `.w001-context/**` is construction metadata; it is outside every
  worker WRITE_SET and must never be integrated into canonical product.
- Baseline validation at construction: frozen install PASS; full test
  suite 55/55 PASS (incl. 18 foundation tests under Vitest); typecheck
  PASS; production build PASS; `git diff --check` clean; seed scope =
  exactly `lib/osv3/foundation/**` + `tests/osv3/foundation/**`.

## Hard constraints (inherited; packet cannot weaken them)

- no GitHub push / PR / remote mutation for browser workers;
- no secrets, .env, provider keys in commits or artifacts;
- no out-of-scope tracked writes (trusted ingestor enforces full history);
- no provider billing or live paid generation;
- no merge commits on worker branches;
- no dependency on unpublished same-wave peer output;
- forward fixes only; no history rewriting;
- worker COMPLETE is a self-report; central acceptance is independent.

## Unknowns

- U-VM-RUNNER-BACKEND (NONBLOCKING for workers, BLOCKING for candidate
  test execution): no Docker/Colima/Lima/OrbStack/Tart/UTM backend is
  installed on the trusted local plane at construction time. Fallback:
  results remain READY_FOR_ISOLATED_TEST; no host execution of candidate
  code. Resolver: founder/trusted-local-plane.

## Source documents (hashes pinned by CONTEXT-MANIFEST.json)

- state/CURRENT-SNAPSHOT.md
- waves/C0/C0-FINAL-SYNTHESIS.md
- waves/W001/W001-PLAN.md
- waves/W001/CONSTRUCTION-SPEC.md
- architecture/PRODUCTION-CONTEXT-PACKET-V1.md
- architecture/WRITE-SET-CHECKER-HARDENING-V1.md
- architecture/TRUSTED-INGESTOR-PIPELINE-V1.md
- os23.7/OS23.7-CANDIDATE-SPEC.md
- os23.7/MIGRATION-FROM-OS23.6.md
- os23.7/REGRESSION-CONTRACT.md
