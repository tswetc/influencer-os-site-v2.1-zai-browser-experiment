#!/usr/bin/env python3
"""Generate exact commit-pinned launch prompts for E004-E011 + Q001.

Usage:
  python3 tools/generate_launch_prompts.py <freeze_sha> <output_dir>

Policy:
- PRODUCT_QUALITY E004-E011 always request GLM-5.3 first.
- RUN.md contains the runtime fallback policy.
- Q001 requests GLM-5.3-Flash for qualification throughput.
- actual UI runtime label is always recorded by the run.
- the generator never modifies Git.
"""

from __future__ import annotations

import sys
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit("usage: generate_launch_prompts.py <freeze_sha> <output_dir>")

sha = sys.argv[1].strip()
if len(sha) != 40 or any(c not in "0123456789abcdefABCDEF" for c in sha):
    raise SystemExit("freeze_sha must be a full 40-char Git SHA")

out = Path(sys.argv[2]).expanduser().resolve()
out.mkdir(parents=True, exist_ok=True)

repo = "tswetc/influencer-os-site-v2.1-zai-browser-experiment"
base = f"https://raw.githubusercontent.com/{repo}/{sha}"

runs = {
    "ZAI-E004": {"model": "GLM-5.3", "type": "PRODUCT_QUALITY"},
    "ZAI-E005": {"model": "GLM-5.3", "type": "PRODUCT_QUALITY"},
    "ZAI-E006": {"model": "GLM-5.3", "type": "PRODUCT_QUALITY"},
    "ZAI-E007": {"model": "GLM-5.3", "type": "PRODUCT_QUALITY"},
    "ZAI-E008": {"model": "GLM-5.3", "type": "PRODUCT_QUALITY"},
    "ZAI-E009": {"model": "GLM-5.3", "type": "PRODUCT_QUALITY"},
    "ZAI-E010": {"model": "GLM-5.3", "type": "PRODUCT_QUALITY"},
    "ZAI-E011": {"model": "GLM-5.3", "type": "PRODUCT_QUALITY"},
    "ZAI-Q001": {"model": "GLM-5.3-Flash", "type": "DISPOSABLE_PIPELINE_QUALIFICATION"},
}

for run_id, meta in runs.items():
    model = meta["model"]
    run_type = meta["type"]

    if run_type == "PRODUCT_QUALITY":
        mission = f"""EXPERIMENT ID: {run_id}
EXPECTED Z.AI UI MODEL: {model}
RUN TYPE: PRODUCT_QUALITY
INPUT COMMIT: {sha}

This is a full autonomous Influencer OS Site V2.1 browser-product development run.

GitHub is READ-ONLY input.
Work only inside this fresh Chat.Z.AI sandbox.

First download and read:
{base}/00-GOVERNANCE/START-HERE.md

Then download and read:
{base}/06-EXPERIMENTS/{run_id}/RUN.md

Follow the complete reading order in those files.
Every repository read and raw URL must stay pinned to INPUT COMMIT {sha}.

Try to use GLM-5.3 for this product-quality run.
If the actual visible UI runtime differs, DO NOT pretend otherwise:
record MODEL_OVERRIDE_AT_LAUNCH and the exact visible label in RUN-MANIFEST.md.

Build the COMPLETE product mission, not a landing page and not a reduced prototype.

Required architecture:
Public/Product Experience + Creator App + OS Core/API/Generation Services + MCP/Agent Surface over one shared domain/application model.

Required interaction modes:
guided/direct Studios + Expert Workflow node graph, both using the same use cases and lineage model.

Use ONLY the exact bounded Wave v4 media pack assigned by RUN.md.
Use neutral identity ID founder-main-01.
Do not infer or publish a real-world founder identity.

Before major implementation:
source reconciliation → exact reference research → measured design constitution/tokens/motion spec → representative slice → critique/fix loops.

Use P0 → P1 → P2 discipline.
Use bounded materially different retries.
If one subsystem remains blocked, log it, continue independent work, revisit later, and keep status truthful.

Never invent source truth.
Never call MOCK / UI_ONLY / UNVERIFIED_EXTERNAL systems LIVE.

Before final export run:
SOURCE/TRUTH review;
FUNCTIONAL/SECURITY review;
UX/VISUAL + responsive + EN/RU + accessibility review;
PACKAGING/PORTABILITY review;
integrated regression.

Export the exact ZIP required by RUN.md.

Continue autonomously until COMPLETE, COMPLETE_WITH_DEGRADED_SUBSYSTEMS, or honestly INCOMPLETE.
"""
    else:
        mission = f"""EXPERIMENT ID: {run_id}
EXPECTED Z.AI UI MODEL: {model}
RUN TYPE: DISPOSABLE_PIPELINE_QUALIFICATION
INPUT COMMIT: {sha}

This is the disposable end-to-end qualification run for the SAME frozen input chain used by the full product wave.

GitHub is READ-ONLY input.
Work only inside this fresh Chat.Z.AI sandbox.

First download and read:
{base}/00-GOVERNANCE/START-HERE.md

Then download and read:
{base}/06-EXPERIMENTS/{run_id}/RUN.md

Follow that run exactly and keep every raw GitHub URL pinned to INPUT COMMIT {sha}.

Do not turn this qualification into a competing full-product candidate.
Its job is to prove:
input fetch + Wave v4 media verification + reference research + architecture slice + shared core/MCP parity + workflow graph + tests + screenshots + fresh export.

Record the exact visible runtime label.
If GLM-5.3-Flash is unavailable, continue on the available runtime and record MODEL_OVERRIDE_AT_LAUNCH.

Finish with exactly QUALIFICATION_PASS or QUALIFICATION_FAIL as RUN.md requires.
"""

    (out / f"{run_id}-LAUNCH.txt").write_text(mission, encoding="utf-8")

print(f"Generated {len(runs)} prompts in {out}")
for p in sorted(out.glob("*-LAUNCH.txt")):
    print(p)
