#!/usr/bin/env python3
"""Generate exact commit-pinned launch prompts for E004-E011.

Usage:
  python3 tools/generate_launch_prompts.py <freeze_sha> <output_dir>

The generator never modifies Git.
"""

from __future__ import annotations
import sys
from pathlib import Path

if len(sys.argv)!=3:
    raise SystemExit("usage: generate_launch_prompts.py <freeze_sha> <output_dir>")

sha=sys.argv[1].strip()
if len(sha)!=40 or any(c not in "0123456789abcdefABCDEF" for c in sha):
    raise SystemExit("freeze_sha must be a full 40-char Git SHA")

out=Path(sys.argv[2]).expanduser().resolve()
out.mkdir(parents=True,exist_ok=True)

repo="tswetc/influencer-os-site-v2.1-zai-browser-experiment"
base=f"https://raw.githubusercontent.com/{repo}/{sha}"

runs={
    "ZAI-E004":"GLM-5.3",
    "ZAI-E005":"GLM-5.3-Flash",
    "ZAI-E006":"GLM-5.3",
    "ZAI-E007":"GLM-5.3-Flash",
    "ZAI-E008":"GLM-5.3",
    "ZAI-E009":"GLM-5.3-Flash",
    "ZAI-E010":"GLM-5.3",
    "ZAI-E011":"GLM-5.3-Flash",
}

for run_id,model in runs.items():
    prompt=f"""EXPERIMENT ID: {run_id}
EXPECTED Z.AI UI MODEL: {model}
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

Record the exact visible runtime model label in RUN-MANIFEST.md.
If it differs from {model}, continue but record MODEL_OVERRIDE_AT_LAUNCH.

Build the COMPLETE product mission, not a landing page and not a reduced prototype.

Required architecture:
Public/Product Experience + Creator App + OS Core/API/Generation Services + MCP/Agent Surface over one shared domain model.

Required interaction modes:
guided/direct Studios + Expert Workflow node graph.

Use ONLY the exact bounded media pack assigned by RUN.md.
Use neutral identity founder-main-01.
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
    (out/f"{run_id}-LAUNCH.txt").write_text(prompt,encoding="utf-8")

print(f"Generated {len(runs)} prompts in {out}")
for p in sorted(out.glob("*-LAUNCH.txt")):
    print(p)
