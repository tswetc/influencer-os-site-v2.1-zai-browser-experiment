#!/usr/bin/env python3
"""Audit the current PUBLIC lab working tree before launch.

Usage:
  python3 tools/audit_public_lab.py <repo_root>

The audit intentionally avoids embedding retired personal-name tokens in its own
source. It enforces structural neutral-ID rules instead.
"""

from __future__ import annotations
import json
import re
import sys
from pathlib import Path

if len(sys.argv)!=2:
    raise SystemExit("usage: audit_public_lab.py <repo_root>")

root=Path(sys.argv[1]).expanduser().resolve()
TEXT_EXT={".md",".txt",".json",".py",".ts",".tsx",".js",".mjs",".yml",".yaml",".csv",".html",".css"}

violations=[]
stale=[]
files=0

# Structural patterns that should not exist in the public current-head transport.
FORBIDDEN=[
    re.compile(r"source_identity_claim_from_m001",re.I),
    re.compile(r"/Users/"),
    re.compile(r"/Volumes/"),
]

STALE=[
    "WAVE01-A-V1-PENDING",
    "WAVE01-B-V1-PENDING",
    "WAVE01-C-V1-PENDING",
    "WAVE01-D-V1-PENDING",
    "BLOCKED_ON_CURATED_MEDIA_V1",
    "TO_BE_PINNED_AT_LAUNCH",
]

# Historical reports can truthfully describe old run-state tokens. Launch-state
# stale-token checking applies to active governance/run specifications only.
STALE_PREFIXES=("00-GOVERNANCE/","01-BASE/","06-EXPERIMENTS/")

for p in root.rglob("*"):
    if not p.is_file() or p.suffix.lower() not in TEXT_EXT:
        continue
    rel=p.relative_to(root).as_posix()
    if rel.startswith(".git/") or rel.startswith("04-MEDIA/library/"):
        continue
    files+=1
    try:
        s=p.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue

    # Tool source itself may contain guard-pattern names, but it contains no
    # real-world identity string.
    if rel!="tools/audit_public_lab.py":
        for rx in FORBIDDEN:
            if rx.search(s):
                violations.append({"path":rel,"pattern":rx.pattern})

    if rel.startswith(STALE_PREFIXES):
        for token in STALE:
            if token in s:
                stale.append({"path":rel,"token":token})

# Neutral-ID / bounded-pack checks.
for design in "ABCD":
    mf=root/"04-MEDIA/packs"/f"wave01-{design}-public-v3.json"
    if not mf.is_file():
        violations.append({"path":mf.relative_to(root).as_posix(),"pattern":"missing pack"})
        continue
    d=json.loads(mf.read_text(encoding="utf-8"))
    if not (36 <= len(d.get("items",[])) <= 42):
        violations.append({"path":mf.relative_to(root).as_posix(),"pattern":"pack count outside 36-42"})
    for item in d.get("items",[]):
        if item.get("identity_id") not in {"founder-main-01","generated-demo-01","neutral-subject"}:
            violations.append({"path":mf.relative_to(root).as_posix(),"pattern":"non-neutral identity_id"})
        if "source_path" in item or "ssd_relative_source_path" in item:
            violations.append({"path":mf.relative_to(root).as_posix(),"pattern":"source path key leakage"})

result={
    "text_files_scanned":files,
    "violations":violations,
    "stale_launch_tokens":stale,
}

print(json.dumps(result,ensure_ascii=False,indent=2))
if violations or stale:
    raise SystemExit(2)

print("PUBLIC_LAB_TEXT_AUDIT_PASS")
