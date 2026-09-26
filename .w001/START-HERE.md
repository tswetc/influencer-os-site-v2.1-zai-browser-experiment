# W001 Browser Worker — START HERE

You are a W001 worker operating on the sanitized public GitHub construction
mirror. This branch contains exactly the verified construction tree plus
launch metadata under `.w001/`. Product source bytes never change inside a
wave; you work additively inside your own WRITE_SET.

Follow these startup rules exactly, in order. Any failed check: STOP and
report `BLOCKED` with the exact failed step — do not improvise.

1. **Clone/fetch** the public repo
   `tswetc/influencer-os-site-v2.1-zai-browser-experiment`
   (branch `w001/construction-e642c181`).
2. **Checkout the exact PUBLIC_INPUT_SHA supplied in your launch prompt** —
   the branch tip is diagnostic only and is never worker trust authority;
   `PUBLIC_INPUT_SHA` comes from the launch controller / trusted launch
   record.
3. **Assert** `git rev-parse HEAD == PUBLIC_INPUT_SHA`. Mismatch: STOP,
   report `INPUT_MISMATCH`.
4. **Assert a clean worktree** (`git status --porcelain` is empty).
5. **Verify `.w001/PRODUCT-MANIFEST.json`**: every product file outside
   `.w001/**` (path, Git mode, byte length, SHA256) — recompute the full
   manifest or at minimum `package.json`, `pnpm-lock.yaml`,
   `lib/osv3/foundation/**`, and your WRITE_SET targets. The manifest
   aggregate must equal `product_manifest_sha256` recorded in the manifest
   itself and in `.w001/LAUNCH-REGISTRY.json`.
6. **Verify your exact slot packet file** (`.w001/missions/W001-<SLOT>.json`):
   its SHA256 must equal the packet file SHA256 supplied in your prompt and
   recorded in the launch registry.
7. **Verify `packet_id`** using the declared canonicalization: SHA-256 over
   the packet body with the `packet_id` field omitted, serialized as
   deterministic JSON (object keys sorted by Unicode code point, no
   whitespace, UTF-8, no trailing newline) — the W001-SHARED-INTERFACES-V1
   canon. It must equal the registry's `expected_packet_id`.
8. **Verify the private construction binding**:
   `packet.source.private_construction_sha ==
   e642c1813cdc9cee67fdf589432b385c0fb05022`. This is provenance — it is NOT
   your git base. Your git base is PUBLIC_INPUT_SHA.
9. **Verify all FOUR frozen launch-contract hashes** listed in the packet
   (`shared_contracts`): recompute SHA256 of
   `.w001/contracts/W001-SHARED-INTERFACES-V1.md`,
   `.w001/contracts/SERIALIZATION-VECTORS-V1.json`,
   `.w001/contracts/LEGACY-SOURCE-TRUTH-GATES-V1.md`, and
   `.w001/missions/SHARED-CONTRACT.md`. Scope precedence: if the packet's
   `read_scope` differs from prose `READ_SCOPE` in a mission brief, the
   packet `read_scope` wins; the packet never expands WRITE_SET or weakens
   forbidden paths.
10. **Create your local worker branch** `w001/<RUN_ID>` from PUBLIC_INPUT_SHA.
11. **Work only within your packet's `write_scope`** (the trusted ingestor
    enforces the full-history WRITE_SET independently). Read anything inside
    `read_scope`; never edit `forbidden_paths`.
12. **Build your result bundle with the PUBLIC_INPUT_SHA prerequisite**:
    named ref `refs/heads/w001/<RUN_ID>` rooted at PUBLIC_INPUT_SHA, plus the
    `<RUN_ID>-core.tar` result files (`RUN-MANIFEST.json`, `RESULT.json`,
    `TEST-RESULTS.json`, `CHANGED-PATHS.txt`, `SHA256SUMS.txt`; optional
    evidence.tar). RUN-MANIFEST/RESULT record the actual checked-out
    PUBLIC_INPUT_SHA as `INPUT_SHA`.

## Reading order

`AUTHORITY-SNAPSHOT.md` → `W001-PLAN.md` → `missions/SHARED-CONTRACT.md` →
your `missions/<SLOT>-brief.md` → your packet JSON → pinned contracts under
`contracts/`. Mission-brief references to
`waves/W001/contracts/...` or `waves/W001/missions/...` resolve to the same
bytes under `.w001/contracts/...` and `.w001/missions/...` in this mirror.

## Hard rules while working

- No GitHub push / PR / remote mutation; you have no write credentials.
- No secrets, `.env` values, or provider keys in commits or artifacts.
- No merge commits on your worker branch.
- No dependency on unpublished same-wave peer output.
- No edits to `lib/osv3/foundation/**` (frozen seed) or `.w001/**`.
- Current OS23.6 behavior must remain unchanged when new OS v3 features are
  unused; implement new semantics additively.
- If a frozen shared contract is insufficient for your lane: emit
  `INTERFACE_CHANGE_REQUEST` in your report; do not silently fork it.
- Deterministic helpers take timestamps/IDs via injection; no hidden
  `Date.now()`/random. Golden/integration fixtures use a fixed UTC date and
  explicit deterministic seeds.
- Foundation-exported type names are canonical bases: compose/extend them
  under new names; never redeclare incompatible same-named foundation
  exports. Bounds belong to upper layers/capability contracts — do not add
  foundation-level size rejections.
- Incremental commits; forward fixes; before final freeze run a scope audit
  and `git diff --check`; record FINAL_HEAD; after FINAL_HEAD, zero tracked
  writes.

## Deliverables

Hand `<RUN_ID>-core.tar` + `<RUN_ID>-run.bundle` (+ optional
`<RUN_ID>-evidence.tar`) to the launch controller as instructed. Worker final
status is one of `COMPLETE`, `PARTIAL`, `BLOCKED`, `FAILED`; the worker
cannot claim `HANDOFF_RECEIVED` — the external trusted collector decides.
Never publish results anywhere yourself.
