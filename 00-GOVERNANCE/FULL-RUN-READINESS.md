# Full Product Run Readiness — Pre-Astra Finalization

Date: 2026-09-25
Status: PRE_ASTRA_FINALIZATION_IN_PROGRESS

Binding plan:
`08-ARCHITECT-COUNCIL/19-PRE-ASTRA-EXECUTION-PLAN-V2.md`

## Architecture/source complete

- [x] current authority lock;
- [x] current source behavior matrix;
- [x] one product / four logical areas;
- [x] modular monolith;
- [x] Postgres-class durable metadata + object storage;
- [x] shared application/use-case layer;
- [x] direct Studios do not require implicit WorkflowRun;
- [x] mutable draft + immutable execution checkpoint/revision;
- [x] Job != Attempt;
- [x] DAG-first workflow;
- [x] AssetVersion lineage;
- [x] audit != telemetry;
- [x] versioned fail-closed export/import;
- [x] A5 standards-based web/API/MCP principal + secret boundary;
- [x] A6 per-project staged migration/no dual-write.

## Provisional hard architecture questions

- [x] K1 model/profile/provider-deployment identity boundary — CLOSED centrally with ModelRoute.
- [ ] K2 platform-managed CostExposure settlement after non-idempotent ambiguous paid submit.

## Media/transport

- [x] M001 audited;
- [x] target A39/B42/C33/D36;
- [x] explicit selection builder;
- [x] sanitized Wave bundle builder;
- [x] actual-transport atlas builder;
- [x] local/private Git ignore boundary;
- [x] local execution runbook;
- [ ] regenerate current v3-curated manifests locally;
- [ ] build Wave v4 locally;
- [ ] verify Wave v4;
- [ ] visually review every actual transport tile/poster;
- [ ] commit sanitized transport only.

## Existing pilots

- [x] P001–P004 preserved on historical pinned inputs;
- [ ] ingest/audit completed outputs;
- [ ] combined architecture evidence extract.

## Privacy/history

- [x] choose privacy-safe long-lived public bridge strategy;
- [x] preserve historical pinned pilot accessibility by leaving legacy experiment history intact;
- [x] future official bridge will start from a clean sanitized root without inherited legacy Git history.

## Astra packet

- [ ] K2 final challenge;
- [ ] executive snapshot;
- [ ] architecture delta map;
- [ ] final open-knot file;
- [ ] evidence router;
- [ ] structural audit PASS;
- [ ] semantic/adversarial audit PASS;
- [ ] immutable Astra SHA.

## Official E/Q wave

Current:
`PAUSED_PRE_ASTRA`

Launch only after:
Astra → accepted Architecture V4 → new immutable Architecture V4 + Wave v4 freeze.

Until then:
`OFFICIAL_E_WAVE_NOT_READY`
