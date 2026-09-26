# W001 Browser Worker — START HERE

You are a W001 worker operating on the sanitized public construction mirror
of a private construction snapshot. This branch contains exactly the verified
construction tree plus worker metadata under `.w001/`.

## Your identity inputs (from the launch controller)

The launch controller gives you, per slot:

- public repo: `tswetc/influencer-os-site-v2.1-zai-browser-experiment`;
- public branch: `w001/construction-e642c181`;
- exact `PUBLIC_INPUT_SHA` (the one commit on that branch);
- your packet path: `.w001/missions/W001-<SLOT>.json`;
- expected packet SHA256;
- expected private construction SHA: `e642c1813cdc9cee67fdf589432b385c0fb05022`.

## Startup verification (do this first, in order)

1. `git rev-parse HEAD` must equal the provided `PUBLIC_INPUT_SHA`. If not,
   STOP and report `INPUT_MISMATCH`.
2. `git status --porcelain` must be empty. If not, STOP.
3. Read `.w001/CONSTRUCTION-BRIDGE.json` and confirm
   `private_construction_sha` equals the expected construction SHA above.
4. Verify the product tree: every product file outside `.w001/**` is covered
   by `.w001/PRODUCT-MANIFEST.json` (path, mode, byte length, SHA256,
   `product_file_count`, aggregate `product_manifest_sha256`). Spot-check at
   minimum `package.json`, `pnpm-lock.yaml`, and your WRITE_SET targets.
5. Fetch your slot record from `.w001/LAUNCH-REGISTRY.json` (key = your slot).
   It carries `expected_packet_id`, `input_sha`, `write_scope`,
   `forbidden_paths`, `output_contract_version`.
6. Read your packet at `.w001/missions/W001-<SLOT>.json`. Recompute its
   `packet_id`: it is the SHA256 of the canonical JSON body (sorted keys, no
   whitespace) of the packet object minus the `packet_id` field. It must equal
   the registry's `expected_packet_id`, and the file SHA256 must equal the
   value the launch controller gave you. Any mismatch: STOP, report.
7. Read your mission brief (linked in the packet under `mission.mission_brief`)
   and `.w001/missions/SHARED-CONTRACT.md`, plus
   `.w001/AUTHORITY-SNAPSHOT.md` and `.w001/W001-PLAN.md` listed in
   `required_context`.

## Hard rules while working

- WRITE only inside your packet's `write_scope`; never touch
  `forbidden_write` paths (enforced later by the trusted ingestor).
- Never edit `lib/osv3/foundation/**` (frozen seed) or anything under
  `.w001/**`.
- No `git push`, no PRs, no remote mutation from the worker side.
- No secrets, `.env` values, or provider keys in commits or artifacts.
- No merge commits on your worker branch.
- Do not depend on unpublished same-wave peer output.

## Deliverables

Produce exactly what your packet's `output_contract` requires (result files:
`RUN-MANIFEST.json`, `RESULT.json`, `TEST-RESULTS.json`, `CHANGED-PATHS.txt`,
`SHA256SUMS.txt`, and the `git bundle` delta on a named ref
`refs/heads/w001/<RUN_ID>` built on the exact INPUT_SHA prerequisite).
Hand these to the launch controller as instructed. Do not publish them
anywhere yourself.

Report your final status as one of: `COMPLETE`, `PARTIAL`, `BLOCKED`,
`FAILED`.
