#!/usr/bin/env python3
"""Audit the current PUBLIC lab working tree before launch.

This is a text/governance safety audit. It does not replace media hash
verification or runtime candidate QA.

Usage:
  python3 tools/audit_public_lab.py <repo_root>
"""

from __future__ import annotations
import json,re,sys
from pathlib import Path

if len(sys.argv)!=2:
    raise SystemExit("usage: audit_public_lab.py <repo_root>")

root=Path(sys.argv[1]).expanduser().resolve()

TEXT_EXT={".md",".txt",".json",".py",".ts",".tsx",".js",".mjs",".yml",".yaml",".csv",".html",".css"}
IGNORE_PARTS={".git","04-MEDIA/library"}
FORBIDDEN=[
    re.compile(r"founder_milena_ioanna",re.I),
    re.compile(r"Milena\s+Ioanna",re.I),
    re.compile(r"@milenaioanna",re.I),
    re.compile(r"milenaioanna\.com",re.I),
    re.compile(r"MILENA\s+MILANI\s+CAROL",re.I),
]
STALE=[
    "WAVE01-A-V1-PENDING",
    "WAVE01-B-V1-PENDING",
    "WAVE01-C-V1-PENDING",
    "WAVE01-D-V1-PENDING",
    "BLOCKED_ON_CURATED_MEDIA_V1",
    "TO_BE_PINNED_AT_LAUNCH",
]

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
    for rx in FORBIDDEN:
        if rx.search(s):
            violations.append({"path":rel,"pattern":rx.pattern})
    for token in STALE:
        if token in s:
            stale.append({"path":rel,"token":token})

# Transport pack checks if present.
transport=root/"04-MEDIA/transport"
transport_dirs=[]
if transport.exists():
    for d in sorted(transport.iterdir()):
        if d.is_dir():
            transport_dirs.append(d.name)
            mf=d/"manifest.json"
            if not mf.is_file():
                violations.append({"path":d.relative_to(root).as_posix(),"pattern":"missing manifest.json"})
                continue
            raw=mf.read_text(encoding="utf-8")
            if '"source_path"' in raw or "/Volumes/" in raw or "/Users/" in raw:
                violations.append({"path":mf.relative_to(root).as_posix(),"pattern":"source path leakage"})

result={
    "text_files_scanned":files,
    "forbidden_identity_violations":violations,
    "stale_launch_tokens":stale,
    "transport_dirs":transport_dirs,
}
print(json.dumps(result,ensure_ascii=False,indent=2))

if violations or stale:
    raise SystemExit(2)

print("PUBLIC_LAB_TEXT_AUDIT_PASS")
