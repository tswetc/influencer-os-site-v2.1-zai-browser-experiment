#!/usr/bin/env python3
"""Generate exact commit-pinned launch prompts for E004-E011 and Q001.

Usage:
  python3 tools/generate_launch_prompts.py <freeze_sha> <output_dir>

The generator does not modify Git or the repository.
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
    "ZAI-E004":"GLM-5.3 preferred",
    "ZAI-E005":"GLM-5.3 preferred",
    "ZAI-E006":"GLM-5.3 preferred",
    "ZAI-E007":"GLM-5.3 preferred",
    "ZAI-E008":"GLM-5.3 preferred",
    "ZAI-E009":"GLM-5.3 preferred",
    "ZAI-E010":"GLM-5.3 preferred",
    "ZAI-E011":"GLM-5.3 preferred",
    "ZAI-Q001":"GLM-5.3-Flash preferred",
}

for run_id,model in runs.items():
    prompt=f"""EXPERIMENT ID: {run_id}
INPUT COMMIT: {sha}
MODEL POLICY: {model}

Use ONLY the exact commit-pinned public lab input below.

Repository:
https://github.com/{repo}

First read:
{base}/06-EXPERIMENTS/{run_id}/RUN.md

Then execute that RUN.md completely.

Binding rules:
- GitHub is READ-ONLY input.
- Every repository file must come from INPUT COMMIT {sha}; never use latest/main as a substitute.
- Read 00-GOVERNANCE/START-HERE.md from the same commit and follow its authority order.
- Record the exact visible runtime model label in RUN-MANIFEST.md.
- Work only in this fresh Chat.Z.AI sandbox.
- Keep local Git history.
- Do not push implementation to the shared lab.
- Do not read sibling experiment folders for creative direction.
- Verify assigned media manifest and every downloaded media SHA-256 before implementation.
- Build the complete mission; do not stop at a homepage/dashboard shell.
- Architecture V3, Domain Model V1 and the Expert Workflow Graph are P0.
- Do not use a future cron round to finish P0 work.
- Complete mandatory screenshot/reference/functional/security/export review loops.
- Export the exact unique ZIP named by RUN.md.

If a shared input is broken, document it precisely. Do not silently replace the frozen input with different material.

Begin now.
"""
    (out/f"{run_id}-LAUNCH.txt").write_text(prompt,encoding="utf-8")

print(f"Generated {len(runs)} prompts in {out}")
for p in sorted(out.glob("*-LAUNCH.txt")):
    print(p)
