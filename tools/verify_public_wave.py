#!/usr/bin/env python3
"""Verify committed/public Wave v4 bundle before freeze.

Usage:
  python3 tools/verify_public_wave.py <repo_root>
"""

from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

if len(sys.argv)!=2:
    raise SystemExit("usage: verify_public_wave.py <repo_root>")

repo=Path(sys.argv[1]).expanduser().resolve()
root=repo/"04-MEDIA/transport/wave01-v4"
forbidden=re.compile(
    r"(founder_milena_ioanna|milena\s+ioanna|@milenaioanna|milenaioanna\.com|milena\s+milani\s+carol|/Users/|/Volumes/|ssd_relative_source_path|source_path)",
    re.I,
)
errors=[]
summary={}

def sha256(path):
    h=hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda:f.read(1024*1024),b""):
            h.update(chunk)
    return h.hexdigest()

if not (root/"BUNDLE-MANIFEST.json").is_file():
    errors.append("missing BUNDLE-MANIFEST.json")

referenced=set()

for design in "ABCD":
    p=root/"packs"/f"{design}.json"
    if not p.is_file():
        errors.append(f"{design}: missing pack manifest")
        continue
    raw=p.read_text(encoding="utf-8")
    if forbidden.search(raw):
        errors.append(f"{design}: forbidden identity/path token in manifest")
    d=json.loads(raw)
    items=d.get("items",[])
    if not 30 <= len(items) <= 45:
        errors.append(f"{design}: item count {len(items)} outside 30-45")
    if d.get("source_paths_included") is not False:
        errors.append(f"{design}: source_paths_included != false")

    ids=set()
    types={}
    total=0
    for item in items:
        aid=item.get("asset_id")
        if aid in ids:
            errors.append(f"{design}: duplicate asset_id {aid}")
        ids.add(aid)
        if not re.fullmatch(r"IOS-W01-[A-F0-9]{16}",aid or ""):
            errors.append(f"{design}: invalid neutral asset_id {aid}")
        rel=item.get("download_path","")
        if not rel.startswith("04-MEDIA/transport/wave01-v4/assets/"):
            errors.append(f"{design}: invalid download_path {rel}")
            continue
        f=repo/rel
        if not f.is_file():
            errors.append(f"{design}: missing {rel}")
            continue
        referenced.add(f.resolve())
        got=sha256(f)
        if got!=item.get("sha256"):
            errors.append(f"{design}: hash mismatch {rel}")
        if f.stat().st_size>=100*1024*1024:
            errors.append(f"{design}: GitHub 100MB gate {rel}")
        total+=f.stat().st_size
        t=item.get("media_type","unknown")
        types[t]=types.get(t,0)+1

    summary[design]={"items":len(items),"types":types,"bytes":total}

assets=root/"assets"
if assets.is_dir():
    all_assets={p.resolve() for p in assets.iterdir() if p.is_file()}
    extra=sorted(p.name for p in all_assets-referenced)
    if extra:
        errors.append(f"unreferenced transport assets: {extra[:12]}")
else:
    errors.append("missing assets directory")

print(json.dumps({"summary":summary,"errors":errors},ensure_ascii=False,indent=2))
if errors:
    raise SystemExit(2)
print("PUBLIC_WAVE_V4_VERIFIED")
