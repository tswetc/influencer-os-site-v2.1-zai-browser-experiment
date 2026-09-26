# W001 Authority Snapshot (post-Z3/Z2 refresh)

Issued: 2026-09-26
Issued by: trusted local plane (ZCode Desktop / Z4-R mirror refresh)
Central authority input: `tswetc/project-memory@os-v3/central-memory-2026-09-25`
Central HEAD used for this refresh: `67fb11dafeff1eb639b425283d2ed59db3d67a19`
Canonical product base: `tswetc/influencer-os@1158007fdaefd823e24d7a38d4fa7258814b541c` (v1.23.0)
PRIVATE_CONSTRUCTION_SHA: `e642c1813cdc9cee67fdf589432b385c0fb05022`
(tree `8d38b2f8e8c0a49ddb1e6f50b02fd017aa150e7a`, tar SHA256 `1ed731b492dd044c300e5030bedcd4fb6f92129fb9435c29dcc70ba62143aa82`)

This snapshot contains only mission-relevant current authority. It does not
override founder/product authority and never replaces the launch registry.
It supersedes the pre-Z3 snapshot compiled from central HEAD `e9e4131…`.

## Input transport (founder decision D-OSV3-047)

Browser worker input is GitHub-only: exact commit-pinned source on
`tswetc/influencer-os-site-v2.1-zai-browser-experiment`, branch
`w001/construction-e642c181`. Project Files, attachments and tunnels are not
worker input channels. Worker INPUT_SHA is the checked-out PUBLIC_INPUT_SHA
supplied by the trusted launch record / launch prompt — never the private
construction SHA.

## Founder decisions operative for W001

1. C0 is closed with R02 NOT_RECOVERED; do not search for or re-run R02
   under its old identity (founder-directed transition).
2. Proceed directly into W001 production development; no standalone C1/
   validation wave.
3. Minimize founder repetitive actions; ZCode Desktop is the trusted local
   routine execution plane; browser agents do the deep long-running work;
   Codex/Astra reserved for highest-level unresolved conflicts
   (EXECUTION-ORCHESTRATION-V1).
4. Canonical main stays untouched until W001 integration gates pass.

## Product constitution authority

PRODUCT-CONSTITUTION.md (central) is the compact product-level authority:
OS v3 is the broad product; OS23.6/v1.23 is the mature embedded core
discipline; six first-class continuity categories with Taste separate from
identity; preservation rule (current behavior unchanged when new OS v3
features are unused); honest legacy provenance; shared application core;
semantic model/provider separation with fail-closed LOCK; deterministic
planning separate from paid execution; browser workers are execution fabric,
never canonical authority; public/private source boundary honored.

## Isolated runner state

`ISOLATED_RUNNER_READY_REPORTED_BY_TRUSTED_LOCAL_Z4`:
- Colima 0.10.3, dedicated `w001` profile (macOS Virtualization.Framework);
- Docker server 29.5.2 (Ubuntu 24.04 in-VM);
- isolated-runner acceptance 8/8 PASS (`osv3ctl test W001-RUNNER-ACCEPT-V1`);
- osv3ctl runner wiring HEAD `cdfd169`.

This is a trusted-local report; central independent byte verification of the
local runner code is not claimed. The runner is mandatory before returned
candidate code executes locally; it does not block browser authoring.
The former unknown U-VM-RUNNER-BACKEND is RESOLVED_REPORTED and no longer open.

## Z3 red-team disposition (P0 = 0)

Three confirmed P1 shared-contract gaps were fixed centrally BEFORE this
refresh by freezing:
- W001-SHARED-INTERFACES-V1.md (deterministic JSON canon, timestamp canon,
  ID rules, ModelStrategy V1 enum, ApplicationCommandV1/ApplicationResultV1,
  workflow bridge, character migration/round-trip rules);
- SERIALIZATION-VECTORS-V1.json (mandatory compatibility vectors);
- LEGACY-SOURCE-TRUTH-GATES-V1.md (descriptive regression truth).

Every packet pins these bytes. Workers implement against them; deviations are
INTERFACE_CHANGE_REQUEST, never silent forks. Mirror-related P2 corrections
(exclude in-tree `.w001-context/**` from product equivalence; regenerate
authority/packets from latest central HEAD; supersede the old construction-spec
"do not publish private source" transport paragraph with D-OSV3-047) are
applied in this refresh.

## Z2 source-truth disposition (no P0)

Z2 Source Truth Atlas is done; its P1 advisory is incorporated:
Q01/R02 golden/integration fixtures MUST inject a fixed UTC date and explicit
deterministic seeds and must cover: legacy feed fallback to `SCENE_PACKS[0]`,
`veo_broll` as a sixth legacy EngineId (ENGINE_META has no card for it), and
the legacy `negative || r.negative` user-negative override behavior.
Full source truth: `.w001/contracts/LEGACY-SOURCE-TRUTH-GATES-V1.md`.

## Frozen construction facts (VERIFIED_SOURCE_FACT)

- `lib/osv3/foundation/**` is the frozen W001 seed; import from it, never
  modify it (seed commit `f7137ca3f6bf063fb0530c3f54549347eb24ce32`).
- The public branch product tree (184 files) is byte-equal to the private
  construction; aggregate product manifest
  `8265d6461f1ffcc4a65efbc8391ba251a51a896534382686278b3495ccf95ef6`;
  git-tree aggregate `4fa113605a5dbb9ba4115c3dc918d2579cab7a1db19865fe79647263f20b33fb`.
- `.w001/**` is launch metadata only; never in any WRITE_SET; never integrated
  into canonical product.
- Authority snapshot is derived from PRODUCT-CONSTITUTION.md + CURRENT-SNAPSHOT
  + Z2/Z3 relay results at the central HEAD recorded above.
