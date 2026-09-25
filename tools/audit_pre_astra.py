#!/usr/bin/env python3
"""Static structural audit for current pre-Astra repository state.

This does not replace semantic/adversarial architecture review.

Usage:
  python3 tools/audit_pre_astra.py <repo_root>
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

if len(sys.argv) != 2:
    raise SystemExit("usage: audit_pre_astra.py <repo_root>")

root = Path(sys.argv[1]).expanduser().resolve()
errors: list[str] = []

required = [
    "00-GOVERNANCE/FOUNDER-DECISIONS-2026-09-25-CURRENT.md",
    "00-GOVERNANCE/PUBLIC-CANON-SUPERSESSION-2026-09-25.md",
    "00-GOVERNANCE/PROJECT-MEMORY-PUBLIC.md",
    "00-GOVERNANCE/FULL-RUN-READINESS.md",
    "00-GOVERNANCE/END-TO-END-PIPELINE-V5.md",
    "00-GOVERNANCE/PUBLIC-BRIDGE-PRIVACY-DECISION.md",
    "08-ARCHITECT-COUNCIL/19-PRE-ASTRA-EXECUTION-PLAN-V2.md",
    "08-ARCHITECT-COUNCIL/PRE-ASTRA-AUTHORITY-SNAPSHOT.md",
    "08-ARCHITECT-COUNCIL/PRE-ASTRA-SOURCE-BEHAVIOR-MATRIX.md",
    "08-ARCHITECT-COUNCIL/PRE-ASTRA-CENTRAL-DECISIONS-R2.md",
    "08-ARCHITECT-COUNCIL/PRE-ASTRA-CENTRAL-DECISIONS-R3.md",
    "08-ARCHITECT-COUNCIL/03-OPEN-ARCHITECTURE-QUESTIONS.md",
    "08-ARCHITECT-COUNCIL/04-DECISION-REGISTER.md",
    "04-MEDIA/WAVE-V4-LOCAL-RUNBOOK.md",
]
for rel in required:
    if not (root / rel).is_file():
        errors.append(f"missing required file: {rel}")

# Current authority must point at the new date.
start = root / "00-GOVERNANCE/START-HERE.md"
if start.is_file():
    s = start.read_text(encoding="utf-8")
    for needle in [
        "FOUNDER-DECISIONS-2026-09-25-CURRENT.md",
        "PUBLIC-CANON-SUPERSESSION-2026-09-25.md",
        "19-PRE-ASTRA-EXECUTION-PLAN-V2.md",
    ]:
        if needle not in s:
            errors.append(f"START-HERE missing current route: {needle}")

# Current open-knot file must not still claim six/four unresolved knots.
oq = root / "08-ARCHITECT-COUNCIL/03-OPEN-ARCHITECTURE-QUESTIONS.md"
if oq.is_file():
    s = oq.read_text(encoding="utf-8")
    if "TWO_IRREDUCIBLE_KNOTS_REMAIN_PROVISIONALLY" not in s:
        errors.append("open-knot status is not reduced to current two-knot state")
    for stale in ["SIX_FUNDAMENTAL_KNOTS_REMAIN", "FOUR_FUNDAMENTAL_KNOTS_REMAIN_PROVISIONALLY"]:
        if stale in s:
            errors.append(f"open-knot file contains stale status: {stale}")

# Official future runs must remain blocked.
for n in range(4, 12):
    run_id = f"ZAI-E{n:03d}"
    p = root / "06-EXPERIMENTS" / run_id / "RUN.md"
    if not p.is_file():
        errors.append(f"missing {run_id}/RUN.md")
        continue
    s = p.read_text(encoding="utf-8")
    if "STATUS: PAUSED_PRE_ASTRA" not in s:
        errors.append(f"{run_id} is not PAUSED_PRE_ASTRA")
    if "LAUNCH_GATE: POST_ASTRA_ARCHITECTURE_V4_FREEZE" not in s:
        errors.append(f"{run_id} launch gate is not post-Astra Architecture V4")

q = root / "06-EXPERIMENTS/ZAI-Q001/RUN.md"
if q.is_file():
    s = q.read_text(encoding="utf-8")
    if "STATUS: PAUSED_PRE_ASTRA" not in s:
        errors.append("ZAI-Q001 is not PAUSED_PRE_ASTRA")
    if "LAUNCH_GATE: POST_ASTRA_ARCHITECTURE_V4_FREEZE" not in s:
        errors.append("ZAI-Q001 launch gate is not post-Astra Architecture V4")

# Launch generator must be impossible to use before a V4 ready freeze.
gen = root / "tools/generate_launch_prompts.py"
if gen.is_file():
    gs = gen.read_text(encoding="utf-8")
    for needle in [
        "OFFICIAL-LAUNCH-FREEZE-V4.md",
        "OFFICIAL_WAVE_READY",
        "STATUS: READY",
        "ARCHITECTURE_V4_FROZEN",
        "freeze_sha does not match checked-out HEAD",
    ]:
        if needle not in gs:
            errors.append(f"launch generator missing guard: {needle}")

# Local/private paths must be ignored.
gitignore = root / ".gitignore"
if gitignore.is_file():
    gi = gitignore.read_text(encoding="utf-8")
    for needle in [
        "04-MEDIA/library/",
        "04-MEDIA/packs/master-v1.json",
        "04-MEDIA/packs/wave01-*-v3-curated.json",
        "04-MEDIA/_wave-v4-review/",
    ]:
        if needle not in gi:
            errors.append(f".gitignore missing local media protection: {needle}")

# No retired launch state in current routing/governance files.
active_files = [
    root / "00-GOVERNANCE/START-HERE.md",
    root / "00-GOVERNANCE/PROJECT-MEMORY-PUBLIC.md",
    root / "00-GOVERNANCE/FULL-RUN-READINESS.md",
    root / "00-GOVERNANCE/END-TO-END-PIPELINE-V5.md",
    root / "06-EXPERIMENTS/PRODUCT-LAUNCH-QUEUE.md",
    root / "08-ARCHITECT-COUNCIL/01-ARCHITECT-STATE.md",
    root / "08-ARCHITECT-COUNCIL/08-REVIEW-STATUS.md",
]
stale_tokens = [
    "WAITING_FOR_WAVE_V4_TRANSPORT_FREEZE",
    "ASTRA_R001_FUNDAMENTAL_PACKET_PREPARED",
    "E004–E011 + Q001 may launch",
]
for p in active_files:
    if not p.is_file():
        continue
    s = p.read_text(encoding="utf-8")
    for token in stale_tokens:
        if token in s:
            errors.append(f"{p.relative_to(root)} contains stale token: {token}")

# Tracked working tree should be clean when this is used as a freeze gate.
try:
    p = subprocess.run(
        ["git", "status", "--porcelain", "--untracked-files=no"],
        cwd=root,
        capture_output=True,
        text=True,
        check=False,
    )
    if p.returncode == 0 and p.stdout.strip():
        errors.append("tracked working tree is dirty")
except Exception:
    pass

print({
    "audit": "PRE_ASTRA_STRUCTURAL",
    "errors": errors,
})

if errors:
    raise SystemExit(2)

print("PRE_ASTRA_STRUCTURAL_AUDIT_PASS")
