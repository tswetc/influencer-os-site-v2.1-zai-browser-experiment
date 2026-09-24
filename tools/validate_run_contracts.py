#!/usr/bin/env python3
"""Fail-closed validation of Wave v4 run contracts before freeze.

Usage:
  python3 tools/validate_run_contracts.py <repo_root>

Checks:
- E004-E011 use only Wave v4 pack paths in active reading instructions;
- no deprecated v3-preview manifest is referenced by official runs;
- each E run is PRODUCT_QUALITY with GLM-5.3 preferred + Flash fallback;
- run ID / design / pack / export name stay internally consistent;
- runtime-label instruction is not duplicated;
- Q001 is bound to Wave v4 C and remains disposable qualification;
- launch generator requests GLM-5.3 for all E runs and includes Q001;
- required architecture contracts exist.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

if len(sys.argv) != 2:
    raise SystemExit("usage: validate_run_contracts.py <repo_root>")

root = Path(sys.argv[1]).expanduser().resolve()
errors = []

REQUIRED = [
    "00-GOVERNANCE/START-HERE.md",
    "00-GOVERNANCE/FOUNDER-DECISIONS-2026-09-24-CURRENT.md",
    "00-GOVERNANCE/PUBLIC-CANON-SUPERSESSION-2026-09-24.md",
    "00-GOVERNANCE/SOURCE-AUTHORITY-2026-09-24.md",
    "01-BASE/PRODUCT-ARCHITECTURE-V3.md",
    "01-BASE/DOMAIN-MODEL-V1.md",
    "01-BASE/CURRENT-PRODUCT-BEHAVIOR-CONTRACT.md",
    "01-BASE/EXPERT-WORKFLOW-GRAPH-CONTRACT.md",
    "01-BASE/FULL-PRODUCT-RUN-CONTRACT-V3.md",
    "04-MEDIA/WAVE01-MEDIA-CURATION-V4.md",
]

for rel in REQUIRED:
    if not (root / rel).is_file():
        errors.append(f"missing required contract: {rel}")

mapping = {
    "ZAI-E004": ("A", "CONTROLLED-GRAPHIC-EDITORIAL"),
    "ZAI-E005": ("A", "CONTROLLED-GRAPHIC-EDITORIAL"),
    "ZAI-E006": ("B", "QUIET-PHOTOGRAPHIC-CINEMA"),
    "ZAI-E007": ("B", "QUIET-PHOTOGRAPHIC-CINEMA"),
    "ZAI-E008": ("C", "AUTHORING-INSTRUMENT"),
    "ZAI-E009": ("C", "AUTHORING-INSTRUMENT"),
    "ZAI-E010": ("D", "CONTINUOUS-SPATIAL-SYSTEM"),
    "ZAI-E011": ("D", "CONTINUOUS-SPATIAL-SYSTEM"),
}

for run_id, (design, variant) in mapping.items():
    p = root / "06-EXPERIMENTS" / run_id / "RUN.md"
    if not p.is_file():
        errors.append(f"{run_id}: missing RUN.md")
        continue
    s = p.read_text(encoding="utf-8")

    expected_pack = f"04-MEDIA/transport/wave01-v4/packs/{design}.json"
    expected_media = f"MEDIA_SET: wave01-{design}-public-v4"
    expected_export = f"{run_id}-{variant}-FINAL.zip"

    checks = [
        ("TYPE: PRODUCT_QUALITY", "not PRODUCT_QUALITY"),
        ("PREFERRED_RUNTIME: GLM-5.3", "GLM-5.3 is not preferred runtime"),
        ("FALLBACK_RUNTIME: GLM-5.3-Flash", "Flash fallback missing"),
        (expected_media, "MEDIA_SET mismatch"),
        (expected_pack, "Wave v4 pack path missing"),
        (expected_export, "export filename mismatch"),
        ("01-BASE/PRODUCT-ARCHITECTURE-V3.md", "architecture V3 missing from reading order"),
        ("01-BASE/DOMAIN-MODEL-V1.md", "domain model missing from reading order"),
        ("01-BASE/EXPERT-WORKFLOW-GRAPH-CONTRACT.md", "expert graph contract missing"),
    ]
    for needle, msg in checks:
        if needle not in s:
            errors.append(f"{run_id}: {msg}")

    if re.search(r"wave01-[ABCD]-public-v3", s):
        errors.append(f"{run_id}: deprecated v3 preview manifest reference")
    if "04-MEDIA/packs/wave01-" in s and "-public-v3.json" in s:
        errors.append(f"{run_id}: stale old pack path")
    if s.count("Record the exact visible runtime model label") != 1:
        errors.append(
            f"{run_id}: runtime-label instruction count "
            f"{s.count('Record the exact visible runtime model label')} != 1"
        )

q = root / "06-EXPERIMENTS/ZAI-Q001/RUN.md"
if not q.is_file():
    errors.append("ZAI-Q001: missing RUN.md")
else:
    s = q.read_text(encoding="utf-8")
    for needle, msg in [
        ("TYPE: DISPOSABLE_PIPELINE_QUALIFICATION", "wrong type"),
        ("04-MEDIA/transport/wave01-v4/packs/C.json", "Wave v4 C pack missing"),
        ("QUALIFICATION_PASS", "pass status missing"),
        ("QUALIFICATION_FAIL", "fail status missing"),
    ]:
        if needle not in s:
            errors.append(f"ZAI-Q001: {msg}")

gen = root / "tools/generate_launch_prompts.py"
if not gen.is_file():
    errors.append("launch generator missing")
else:
    gs = gen.read_text(encoding="utf-8")
    for run_id in mapping:
        block = re.search(
            rf'"{re.escape(run_id)}"\s*:\s*\{{([^}}]+)\}}',
            gs,
            re.S,
        )
        if not block or '"model": "GLM-5.3"' not in block.group(1):
            errors.append(f"launch generator: {run_id} does not request GLM-5.3")
    if '"ZAI-Q001"' not in gs:
        errors.append("launch generator: Q001 missing")

print({
    "official_runs_checked": len(mapping),
    "qualification_runs_checked": 1,
    "errors": errors,
})

if errors:
    raise SystemExit(2)

print("RUN_CONTRACTS_VALID")
