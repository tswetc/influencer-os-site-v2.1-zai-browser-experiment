# Pre-Astra Workboard — Exact Current Plan

Date: 2026-09-25
Status: ACTIVE

This is the operational checklist. A box is checked only with evidence.

## W0 — Authority / repository state

- [x] current founder authority dated 2026-09-25;
- [x] current public supersession dated 2026-09-25;
- [x] public lab role explicit;
- [x] canonical OS head recorded;
- [x] frozen Site V2 head recorded;
- [x] observed Site V2.1 head recorded;
- [x] official E/Q wave paused;
- [x] Astra not launched.

Exit criterion: no new task can accidentally follow the old parallel-launch order.

## W1 — Source/product truth

- [x] private-current behavior audited;
- [x] source behavior matrix exists;
- [x] current behavior separated from target extensions;
- [x] local-first persistence behavior recorded;
- [x] provider/BYOK behavior recorded;
- [x] import/export/version semantics recorded;
- [x] license/entitlement behavior recorded;
- [x] self-check/i18n/edge-case constraints recorded.

Exit criterion: every architecture decision can distinguish CURRENT behavior from TARGET extension.

## W2 — Central architecture closure

- [x] A1 execution substrate;
- [x] A2 draft/revision/staleness/rebase;
- [x] A3/K1 model/profile/provider route lifecycle;
- [x] A4/K2 paid-submit ambiguity baseline + BYOK-first route safety gate;
- [x] A5 web/API/MCP auth + secret boundary;
- [x] A6 staged local→server migration;
- [x] reconcile all active ADR/baseline/problem-register files to reflect zero unresolved architecture decisions;
- [x] run one adversarial central pass against A1–A6 and record concrete counterexamples or PASS.

Exit criterion: no routine or currently required architecture decision remains open. PASS.

## W3 — Wave v4 media transport

LOCAL/SSD work required.

- [ ] pull newest lab on SSD;
- [ ] regenerate exact curated manifests;
- [ ] verify A=39;
- [ ] verify B=42;
- [ ] verify C=33;
- [ ] verify D=36;
- [ ] confirm G0027/s01 absent;
- [ ] confirm G0068/s06 absent;
- [ ] confirm G0111/s05 absent;
- [ ] build sanitized bundle;
- [ ] verify no local/SSD source paths in public manifests;
- [ ] verify metadata stripped;
- [ ] verify each file <100 MB;
- [ ] build review atlas from ACTUAL transport derivatives;
- [ ] visually inspect every tile/poster;
- [ ] `verify_public_wave.py` PASS;
- [ ] `audit_public_lab.py` PASS;
- [ ] commit only approved sanitized transport/evidence.

Exit criterion: `WAVE_V4_TRANSPORT_READY`.

## W4 — P001–P004 evidence

For EACH completed P run:
- [ ] original ZIP preserved;
- [ ] SHA-256 recorded;
- [ ] actual UI model label recorded;
- [ ] source tree inspected;
- [ ] build/lint/tests executed where possible;
- [ ] LIVE/MOCK/UNVERIFIED claims audited;
- [ ] domain/application split audited;
- [ ] persistence/auth/MCP/generation audited;
- [ ] graph/shared-core semantics audited;
- [ ] media/provenance audited;
- [ ] forensic report written.

Combined:
- [ ] `P001-P004-ARCHITECTURE-EVIDENCE.md` created;
- [ ] any evidence that contradicts A1–A6 explicitly routed back to W2.

Exit criterion: all available material pilot evidence is incorporated; missing runs are explicitly non-blocking or still awaited for a named reason.

## W5 — Public-history/privacy bridge

- [x] strategy accepted: current lab remains historical; official post-Astra bridge will be new clean-history repo;
- [ ] execute bridge only after Architecture V4 + approved Wave transport;
- [ ] secret/identity/path scans PASS on bridge root;
- [ ] small raw-GitHub transport probe PASS.

Exit criterion before official E wave: clean bridge usable without legacy history.

## W6 — ChatGPT Project / context durability

- [x] universal Project instruction drafted;
- [x] current-context handoff drafted;
- [x] new-chat bootstrap drafted;
- [ ] founder creates ChatGPT Project;
- [ ] founder pastes Project instruction;
- [ ] founder adds current-context handoff as Project file or first message;
- [ ] first new chat performs context preflight and reports exact current HEAD/authority before doing work.

Exit criterion: a fresh ChatGPT chat can recover the project without this legacy conversation.

## W7 — Pre-Astra synthesis

- [ ] final executive snapshot;
- [ ] final source behavior matrix confirmed current;
- [ ] architecture delta map;
- [ ] zero-open / challenge-only architecture list;
- [ ] evidence router;
- [ ] ADR register reconciled;
- [ ] nonnegotiables reconciled;
- [ ] project memory reconciled.

Exit criterion: Astra needs no long chat transcript and no full-repo pre-read.

## W8 — Pre-Astra audits

Structural:
- [ ] all required files exist;
- [ ] links resolve;
- [ ] SHAs exact;
- [ ] no stale 2026-09-24 routing for new work;
- [ ] no stale K1/K2-as-open text in active routing;
- [ ] E/Q accidental launch impossible;
- [ ] local media ignored/untracked safely.

Semantic/adversarial:
- [ ] provider alias drift;
- [ ] model/adapter rollback;
- [ ] duplicate paid submit;
- [ ] webhook/poll race;
- [ ] cancellation/late success;
- [ ] worker crash after submit;
- [ ] MCP confused deputy / object authorization;
- [ ] secret leakage;
- [ ] local→server migration divergence;
- [ ] historical lineage corruption;
- [ ] candidate-promotion contamination.

Exit criterion: PASS / PASS.

## W9 — Immutable Astra freeze

- [ ] all W0–W8 mandatory gates complete or explicitly non-blocking;
- [ ] commit intended evidence;
- [ ] push;
- [ ] remote HEAD verified;
- [ ] exact 40-character SHA recorded;
- [ ] no mutation after freeze;
- [ ] final Astra focus packet generated.

Exit criterion: `PRE_ASTRA_READY`.

## W10 — Astra

Run only after W9.

Mode: READ_ONLY adversarial architecture escalation.
Target: GPT-6 Astra / XHIGH.

Because A1–A6 are centrally resolved, Astra's first task is NOT to invent a parallel architecture.
It must try to falsify the accepted architecture using concrete failure cases and propose deltas only where a real invariant fails.

Exit criterion: raw Astra decision/review artifact preserved unchanged.

## W11 — Post-Astra

- [ ] delta matrix;
- [ ] accepted/rejected changes recorded;
- [ ] Architecture V4;
- [ ] migration V4;
- [ ] run-contract V4;
- [ ] official clean public bridge;
- [ ] official immutable E/Q freeze;
- [ ] E004–E011 + Q001 launch.

## Current next actions

1. reconcile active architecture docs after K2 closure;
2. build ChatGPT Project transfer package;
3. founder runs local Wave v4 runbook;
4. ingest P001–P004 as they finish;
5. complete W7/W8;
6. freeze Astra input.