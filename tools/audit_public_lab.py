#!/usr/bin/env python3
"""Fail-closed audit of the current PUBLIC lab before a launch freeze.

Usage:
  python3 tools/audit_public_lab.py <repo_root>

Checks:
- retired identity strings are absent from active/public text;
- active governance/run specs have no stale launch tokens;
- Wave v4 transport manifests are bounded and contain no source paths;
- current official E/Q runs point at Wave v4 rather than deprecated v3 previews.
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

# Construct retired identity patterns without storing the retired full token or
# real-world display name as contiguous public source strings.
retired_id="founder_"+"milena_"+"ioanna"
retired_name="Milena"+" "+"Ioanna"
retired_handle="@"+"milena"+"ioanna"
retired_domain="milena"+"ioanna.com"
retired_card="MILENA"+" "+"MILANI"+" "+"CAROL"

IDENTITY_PATTERNS=[
    re.compile(re.escape(retired_id),re.I),
    re.compile(re.escape(retired_name),re.I),
    re.compile(re.escape(retired_handle),re.I),
    re.compile(re.escape(retired_domain),re.I),
    re.compile(re.escape(retired_card),re.I),
    re.compile(r"source_identity_claim_from_m001",re.I),
]

STALE=[
    "WAVE01-A-V1-PENDING",
    "WAVE01-B-V1-PENDING",
    "WAVE01-C-V1-PENDING",
    "WAVE01-D-V1-PENDING",
    "BLOCKED_ON_CURATED_MEDIA_V1",
    "TO_BE_PINNED_AT_LAUNCH",
]

# Historical reports may truthfully quote old state. Identity strings, however,
# are forbidden in all current text files except this detector source itself.
STALE_PREFIXES=("00-GOVERNANCE/","01-BASE/","06-EXPERIMENTS/")

violations=[]
stale=[]
files=0

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

    if rel!="tools/audit_public_lab.py":
        for rx in IDENTITY_PATTERNS:
            if rx.search(s):
                violations.append({"path":rel,"pattern":"retired_identity"})

    if rel.startswith(STALE_PREFIXES):
        for token in STALE:
            if token in s:
                stale.append({"path":rel,"token":token})

# Official run specs must use v4 transport.
for n,design in [(4,"A"),(5,"A"),(6,"B"),(7,"B"),(8,"C"),(9,"C"),(10,"D"),(11,"D")]:
    run_id=f"ZAI-E{n:03d}"
    p=root/"06-EXPERIMENTS"/run_id/"RUN.md"
    if not p.is_file():
        violations.append({"path":p.relative_to(root).as_posix(),"pattern":"missing official run"})
        continue
    s=p.read_text(encoding="utf-8")
    expected=f"04-MEDIA/transport/wave01-v4/packs/{design}.json"
    if expected not in s:
        violations.append({"path":p.relative_to(root).as_posix(),"pattern":"run not bound to Wave v4"})
    if "wave01-"+design+"-public-v3" in s:
        violations.append({"path":p.relative_to(root).as_posix(),"pattern":"deprecated v3 preview reference"})

q=root/"06-EXPERIMENTS/ZAI-Q001/RUN.md"
if not q.is_file() or "04-MEDIA/transport/wave01-v4/packs/C.json" not in q.read_text(encoding="utf-8"):
    violations.append({"path":"06-EXPERIMENTS/ZAI-Q001/RUN.md","pattern":"Q001 not bound to Wave v4"})

# Transport manifests: path leakage is prohibited HERE even though historical
# governance may legitimately document local Mac/SSD paths.
transport=root/"04-MEDIA/transport/wave01-v4"
for design in "ABCD":
    mf=transport/"packs"/f"{design}.json"
    if not mf.is_file():
        violations.append({"path":mf.relative_to(root).as_posix(),"pattern":"missing Wave v4 pack"})
        continue
    raw=mf.read_text(encoding="utf-8")
    if "/Users/" in raw or "/Volumes/" in raw or '"source_path"' in raw or "ssd_relative" in raw:
        violations.append({"path":mf.relative_to(root).as_posix(),"pattern":"transport source-path leakage"})
    d=json.loads(raw)
    items=d.get("items",[])
    if not 30 <= len(items) <= 45:
        violations.append({"path":mf.relative_to(root).as_posix(),"pattern":f"pack count {len(items)} outside 30-45"})
    for item in items:
        if item.get("identity_id") not in {"founder-main-01","generated-demo-01","neutral-subject","generated-or-demo"}:
            violations.append({"path":mf.relative_to(root).as_posix(),"pattern":"non-neutral identity_id"})

result={
    "text_files_scanned":files,
    "violations":violations,
    "stale_launch_tokens":stale,
}

print(json.dumps(result,ensure_ascii=False,indent=2))
if violations or stale:
    raise SystemExit(2)

print("PUBLIC_LAB_TEXT_AUDIT_PASS")
