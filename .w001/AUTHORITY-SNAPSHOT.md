# W001 Authority Snapshot (Z4-R2 final reconciliation)

Issued: 2026-09-26
Issued by: trusted local plane (ZCode Desktop / Z4-R2 final authority reconciliation)
Central authority input: `tswetc/project-memory@os-v3/central-memory-2026-09-25`
CENTRAL_AUTHORITY_HEAD_R2: `699d977aef4b60934a43023c9c574d3889ba4198`
Canonical product base: `tswetc/influencer-os@1158007fdaefd823e24d7a38d4fa7258814b541c` (v1.23.0)
PRIVATE_CONSTRUCTION_SHA: `e642c1813cdc9cee67fdf589432b385c0fb05022`
(tree `8d38b2f8e8c0a49ddb1e6f50b02fd017aa150e7a`, tar SHA256 `1ed731b492dd044c300e5030bedcd4fb6f92129fb9435c29dcc70ba62143aa82`)

This snapshot supersedes the Z4-R snapshot (central `67fb11d…`). It contains
only mission-relevant current authority, does not override founder/product
authority, and never replaces the launch registry.

## Input transport (founder decision D-OSV3-047)

Browser worker input is GitHub-only: exact commit-pinned source on
`tswetc/influencer-os-site-v2.1-zai-browser-experiment`, branch
`w001/construction-e642c181`. Project Files, attachments and tunnels are not
worker input channels. The browser worker Git base is the exact
PUBLIC_INPUT_SHA supplied by the trusted launch prompt/record — never
PRIVATE_CONSTRUCTION_SHA, which is provenance/private replay base only.

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

## Scope precedence and bounds ownership (R2)

- The launch packet is the machine-authoritative run envelope: when a packet
  `read_scope` differs from prose `READ_SCOPE` in a mission brief, the packet
  `read_scope` wins. The packet cannot expand WRITE_SET beyond the trusted
  launch registry or weaken forbidden paths.
- Foundation validation intentionally accepts arbitrarily large-but-valid
  semantic structures; operational/storage/matching bounds belong to upper
  layers (A01 owns revision-set/storage bounds; foundation `CapabilityProfile`
  owns matching limits such as `maxReferences`, `maxReferencesByRole`,
  `maxCharacters`). Do not invent foundation-level size rejections.
- Foundation-exported type names are canonical bases: lanes may compose or
  extend them under new names but must not redeclare incompatible same-named
  foundation exports (ProductPassport, PlacePassport, PerformancePassport,
  ActionPhase, TasteProfile, TasteMechanic, TasteDimension, CapabilityProfile
  and the rest of `lib/osv3/foundation/**` exports).

## Isolated runner state

`ISOLATED_RUNNER_READY_REPORTED_BY_TRUSTED_LOCAL_Z4`:
- Colima 0.10.3, dedicated `w001` profile (macOS Virtualization.Framework);
- Docker server 29.5.2 (Ubuntu 24.04 in-VM);
- isolated-runner acceptance 8/8 PASS (`osv3ctl test W001-RUNNER-ACCEPT-V1`);
- osv3ctl runner wiring HEAD `cdfd169`.

Reported by the trusted local plane; central independent byte verification of
the local runner code is not claimed. The runner is mandatory before returned
candidate code executes locally; it does not block browser authoring.
The former unknown U-VM-RUNNER-BACKEND is RESOLVED_REPORTED and no longer open.

## Z3 disposition and R2 hardening

Z3 prelaunch red-team: P0 = 0; three P1 shared-contract gaps resolved
centrally by the frozen launch contracts; exact founder-uploaded Z3 evidence
hashes are recorded centrally. R2 absorbs the Z3 launch-safe P2
clarifications (A02 semantic-projection vs round-trip carrier; A03/A04/A05/
A06/A07 canonical foundation base contracts and no-redeclare rule; Q02
frozen-now vs integration-activated targets; shared-contract scope precedence
and bounds ownership). Every packet pins all four frozen launch contracts:
W001-SHARED-INTERFACES-V1.md, SERIALIZATION-VECTORS-V1.json,
LEGACY-SOURCE-TRUTH-GATES-V1.md, missions/SHARED-CONTRACT.md.

## Z2 disposition

Z2 Source Truth Atlas: no P0. Q01/R02 fixtures MUST inject a fixed UTC date
and explicit deterministic seeds and must cover: legacy feed fallback to
`SCENE_PACKS[0]`, `veo_broll` as a sixth legacy EngineId (ENGINE_META has no
card for it), and the legacy `negative || r.negative` user-negative override.
Full source truth: `.w001/contracts/LEGACY-SOURCE-TRUTH-GATES-V1.md`.

## Frozen construction facts (VERIFIED_SOURCE_FACT)

- `lib/osv3/foundation/**` is the frozen W001 seed; import from it, never
  modify it (seed commit `f7137ca3f6bf063fb0530c3f54549347eb24ce32`).
- The public branch product tree (184 files) is byte-equal to the private
  construction; product manifest aggregate
  `8265d6461f1ffcc4a65efbc8391ba251a51a896534382686278b3495ccf95ef6`;
  git-tree aggregate `4fa113605a5dbb9ba4115c3dc918d2579cab7a1db19865fe79647263f20b33fb`.
- `.w001/**` is launch metadata only; never in any WRITE_SET; never
  integrated into canonical product.
- Lineage since first mirror `eb215a11…` is metadata-only (audited by
  central: `waves/W001/results/FINAL-MIRROR-CANDIDATE-AUDIT-2026-09-26.md`).
- The exact launch commit SHA is authoritative only from the trusted external
  launch record / central launch prompt; branch-tip lookup is diagnostic.
