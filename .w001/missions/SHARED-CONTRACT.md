# W001 Browser Worker — Shared Contract

Status: PRELAUNCH_TEMPLATE
Wave: W001 — OS23.7 Continuity Foundation Integration

This template becomes launchable only after trusted local construction publishes:
- exact CONSTRUCTION_SHA;
- source delivery;
- packet ID.

## Inputs

CONSTRUCTION_SHA: {{CONSTRUCTION_SHA}}
CANONICAL_BASE_SHA: 1158007fdaefd823e24d7a38d4fa7258814b541c
CONTEXT_PACKET_ID: {{CONTEXT_PACKET_ID}}
SOURCE: {{SOURCE_URL_OR_ATTACHMENT}}

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

1. acquire the W001 construction snapshot;
2. verify source manifest/hash;
3. enter the product repo;
4. verify:
   `git rev-parse HEAD == {{CONSTRUCTION_SHA}}`;
5. create local named branch:
   `w001/{{RUN_ID}}`;
6. record environment/tool versions;
7. read required context;
8. inspect the relevant code inside READ_SCOPE before editing.

No GitHub push/PR/remote mutation.

## Source rules

- current OS23.6 behavior must remain unchanged when new OS v3 features are unused;
- `lib/osv3/foundation/**` is frozen/shared construction input;
- do not edit .w001-context/**;
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
- verify + real disposable import from CONSTRUCTION_SHA;
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
