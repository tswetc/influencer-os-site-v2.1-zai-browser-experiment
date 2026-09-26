# W001 Browser Worker — Shared Contract

Status: PRELAUNCH_TEMPLATE
Wave: W001 — OS23.7 Continuity Foundation Integration

This template becomes launchable only after the trusted GitHub mirror publishes:
- exact PUBLIC_INPUT_SHA;
- exact product-manifest hash;
- exact per-slot packet path/hash;
- trusted launch-registry binding to PRIVATE_CONSTRUCTION_SHA.

## Inputs

PUBLIC_REPO:
`tswetc/influencer-os-site-v2.1-zai-browser-experiment`

PUBLIC_BRANCH:
`w001/construction-e642c181`

PUBLIC_INPUT_SHA:
`{{PUBLIC_INPUT_SHA}}`

PRIVATE_CONSTRUCTION_SHA:
`e642c1813cdc9cee67fdf589432b385c0fb05022`

PACKET_PATH:
`{{PACKET_PATH}}`

PACKET_SHA256:
`{{PACKET_SHA256}}`

## Frozen shared W001 interfaces

Every worker must treat these launch contracts as immutable shared input:

- `../contracts/W001-SHARED-INTERFACES-V1.md`;
- `../contracts/SERIALIZATION-VECTORS-V1.json`.

The public GitHub mirror will expose the same bytes under `.w001/contracts/`.

Workers must not invent incompatible:
- application command/result envelopes;
- ModelStrategy values;
- deterministic JSON/hash/timestamp semantics.

If a shared contract is insufficient:
emit `INTERFACE_CHANGE_REQUEST`;
do not silently fork it.

## Scope precedence

The launch packet is the machine-authoritative run envelope.
If a packet `read_scope` differs from prose `READ_SCOPE` in a mission brief, the packet `read_scope` wins.
The packet cannot expand WRITE_SET beyond the trusted launch registry or weaken forbidden paths.

## Bounds ownership

Foundation validation intentionally accepts arbitrarily large-but-otherwise-valid semantic structures.
Operational/storage/matching bounds belong to upper layers:
- A01 owns revision-set/storage bounds;
- `CapabilityProfile` owns matching limits such as `maxReferences`, `maxReferencesByRole`, and `maxCharacters`.
Do not invent a foundation-level size rejection merely to create a local limit.

## Authority

Product/governance:
1. latest explicit founder decision included in the trusted authority snapshot;
2. current Product Constitution / accepted current contracts;
3. accepted OS v3 architecture;
4. verified current source behavior;
5. verified evidence;
6. inference.

This mission packet controls run-local objective/scope/tests.
It does NOT override founder/product authority.

## Startup

1. clone/fetch the public GitHub worker substrate;
2. checkout exact PUBLIC_INPUT_SHA;
3. verify `git rev-parse HEAD == {{PUBLIC_INPUT_SHA}}`;
4. validate `.w001/PRODUCT-MANIFEST.json`;
5. validate your exact packet at PACKET_PATH against PACKET_SHA256;
6. verify the packet declares PRIVATE_CONSTRUCTION_SHA `e642c1813cdc9cee67fdf589432b385c0fb05022`;
7. verify the frozen shared-interface contract/vector hashes listed by the packet;
8. create local named branch:
   `w001/{{RUN_ID}}`;
9. record environment/tool versions;
10. read required context;
11. inspect the relevant code inside READ_SCOPE before editing.

No GitHub push/PR/remote mutation.

## Source rules

- current OS23.6 behavior must remain unchanged when new OS v3 features are unused;
- `lib/osv3/foundation/**` is frozen/shared construction input;
- foundation-exported type names are canonical bases: lanes may compose/extend them under new names, but must not redeclare incompatible same-named types;
- do not edit `.w001/**`;
- no same-wave dependency on unpublished peer output;
- no .env/credentials/private data;
- no provider billing/live generation.

## Long mission phases

Do not stop merely because the first implementation/tests are green.

Work through:
1. source/context verification;
2. implementation;
3. focused tests;
4. adversarial self-review;
5. remediation;
6. malformed/edge/property/fuzz cases where useful;
7. integration-risk review;
8. deterministic serialization/runtime validation;
9. cleanup/refactor/docs;
10. repeated tests/typecheck relevant to your scope;
11. final scope audit;
12. immutable FINAL_HEAD freeze;
13. compact result export.

No artificial sleeps.

Finalize early only if useful assigned backlog is exhausted or a real blocker is reached.

## Git/finality

- incremental commits;
- forward fixes; do not rewrite history to hide mistakes;
- before final freeze run scope audit + git diff --check;
- one final tracked commit;
- record FINAL_HEAD;
- after FINAL_HEAD: zero tracked writes/commits;
- create named-ref run.bundle;
- verify + real disposable import from PUBLIC_INPUT_SHA;
- proof output stays outside tracked tree.

## Handoff

Preferred current contract:
- <RUN_ID>-core.tar
- <RUN_ID>-run.bundle
- optional evidence.tar

If write-only artifact inbox is provided, upload only to the exact issued object(s).

Worker status is EXPORT_READY.
External trusted collector decides HANDOFF_RECEIVED.

## Final report

State:
- COMPLETE / PARTIAL / BLOCKED / FAILED;
- exact FINAL_HEAD;
- runtime;
- commits;
- tests;
- changed paths;
- known risks;
- what was not proven.

Never claim more than bytes/tests establish.
