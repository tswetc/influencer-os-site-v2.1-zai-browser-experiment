#!/usr/bin/env python3
"""Generate commit-pinned launch prompts ONLY from a final Architecture V4 freeze.

This script is intentionally fail-closed during pre-Astra work.

Usage:
  python3 tools/generate_launch_prompts.py <freeze_sha> <output_dir>

Requirements:
- checked-out HEAD must equal freeze_sha;
- future 00-GOVERNANCE/OFFICIAL-LAUNCH-FREEZE-V4.md must exist;
- that file must contain OFFICIAL_WAVE_READY;
- every E004-E011/Q001 RUN.md must say STATUS: READY;
- every run must say LAUNCH_GATE: ARCHITECTURE_V4_FROZEN.

Until those are true, prompt generation is refused.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit("usage: generate_launch_prompts.py <freeze_sha> <output_dir>")

sha = sys.argv[1].strip()
if len(sha) != 40 or any(c not in "0123456789abcdefABCDEF" for c in sha):
    raise SystemExit("freeze_sha must be a full 40-char Git SHA")

root = Path(__file__).resolve().parents[1]

def git(*args: str) -> str:
    p = subprocess.run(
        ["git", *args],
        cwd=root,
        capture_output=True,
        text=True,
        check=False,
    )
    if p.returncode:
        raise SystemExit((p.stderr or p.stdout).strip() or "git command failed")
    return p.stdout.strip()

head = git("rev-parse", "HEAD")
if head.lower() != sha.lower():
    raise SystemExit(
        f"freeze_sha does not match checked-out HEAD: freeze={sha} head={head}"
    )

tracked_dirty = git("status", "--porcelain", "--untracked-files=no")
if tracked_dirty:
    raise SystemExit("tracked working tree is not clean; refuse launch prompt generation")

freeze_doc = root / "00-GOVERNANCE/OFFICIAL-LAUNCH-FREEZE-V4.md"
if not freeze_doc.is_file():
    raise SystemExit(
        "OFFICIAL-LAUNCH-FREEZE-V4.md missing: pre-Astra/Architecture V4 freeze not complete"
    )

freeze_text = freeze_doc.read_text(encoding="utf-8")
if "OFFICIAL_WAVE_READY" not in freeze_text:
    raise SystemExit("Architecture V4 official wave is not marked OFFICIAL_WAVE_READY")

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

for run_id in runs:
    run = root / "06-EXPERIMENTS" / run_id / "RUN.md"
    if not run.is_file():
        raise SystemExit(f"{run_id}: missing RUN.md")
    s = run.read_text(encoding="utf-8")
    if "STATUS: READY" not in s:
        raise SystemExit(f"{run_id}: STATUS: READY required")
    if "LAUNCH_GATE: ARCHITECTURE_V4_FROZEN" not in s:
        raise SystemExit(f"{run_id}: ARCHITECTURE_V4_FROZEN launch gate required")

out = Path(sys.argv[2]).expanduser().resolve()
out.mkdir(parents=True, exist_ok=True)

repo = "tswetc/influencer-os-site-v2.1-zai-browser-experiment"
base = f"https://raw.githubusercontent.com/{repo}/{sha}"

for run_id, meta in runs.items():
    model = meta["model"]
    run_type = meta["type"]

    if run_type == "PRODUCT_QUALITY":
        mission = f"""EXPERIMENT ID: {run_id}
EXPECTED Z.AI UI MODEL: {model}
RUN TYPE: PRODUCT_QUALITY
INPUT COMMIT: {sha}

This is a full autonomous Influencer OS browser-product development run from the FINAL Architecture V4 freeze.

GitHub is READ-ONLY input.
Work only inside this fresh Chat.Z.AI sandbox.

First download and read:
{base}/00-GOVERNANCE/START-HERE.md

Then:
{base}/06-EXPERIMENTS/{run_id}/RUN.md

Follow the exact reading order.
Every raw GitHub URL must stay pinned to INPUT COMMIT {sha}.

Try GLM-5.3 first.
Record the exact visible runtime label.
If runtime differs, record MODEL_OVERRIDE_AT_LAUNCH truthfully.

Build the COMPLETE product mission.
Use only the exact bounded sanitized media pack assigned by RUN.md.
Never infer/publish a real-world founder identity.
Never call MOCK/UI_ONLY/UNVERIFIED_EXTERNAL systems LIVE.

Continue through all mandatory source, functional/security, visual/responsive/i18n/a11y, packaging and regression passes.

Export exactly the ZIP required by RUN.md.
"""
    else:
        mission = f"""EXPERIMENT ID: {run_id}
EXPECTED Z.AI UI MODEL: {model}
RUN TYPE: DISPOSABLE_PIPELINE_QUALIFICATION
INPUT COMMIT: {sha}

This is the disposable qualification run for the SAME FINAL Architecture V4 freeze used by the official product wave.

GitHub is READ-ONLY input.
Work only inside this fresh Chat.Z.AI sandbox.

First download and read:
{base}/00-GOVERNANCE/START-HERE.md

Then:
{base}/06-EXPERIMENTS/{run_id}/RUN.md

Keep every URL pinned to INPUT COMMIT {sha}.
Do not turn qualification into a competing product candidate.
Finish exactly as RUN.md requires.
"""

    (out / f"{run_id}-LAUNCH.txt").write_text(mission, encoding="utf-8")

print(f"Generated {len(runs)} prompts in {out}")
for p in sorted(out.glob("*-LAUNCH.txt")):
    print(p)
