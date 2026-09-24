#!/usr/bin/env python3
"""Fail-closed verification for public Wave media pack manifests.

Usage:
  python3 tools/verify_public_wave.py <repo_root>

This verifier checks the self-contained public v3 atlas-derivative manifests:
04-MEDIA/packs/wave01-{A,B,C,D}-public-v3.json

It intentionally does not require the private/local master library.
"""

from __future__ import annotations
import json
import re
import subprocess
import sys
from pathlib import Path

if len(sys.argv)!=2:
    raise SystemExit("usage: verify_public_wave.py <repo_root>")

repo=Path(sys.argv[1]).expanduser().resolve()
forbidden=re.compile(r"(founder_milena_ioanna|Milena\s+Ioanna|@milenaioanna|milenaioanna\.com|MILENA\s+MILANI\s+CAROL|/Users/|/Volumes/|source_path|ssd_relative)",re.I)

errors=[]
summary={}

def git_blob_sha(path: Path):
    p=subprocess.run(["git","hash-object",str(path)],capture_output=True,text=True,cwd=repo)
    if p.returncode!=0:
        return None
    return p.stdout.strip()

for design in "ABCD":
    manifest=repo/"04-MEDIA/packs"/f"wave01-{design}-public-v3.json"
    if not manifest.is_file():
        errors.append(f"{design}: missing manifest {manifest}")
        continue

    raw=manifest.read_text(encoding="utf-8")
    if forbidden.search(raw):
        errors.append(f"{design}: forbidden identity/path token in manifest")

    d=json.loads(raw)
    items=d.get("items",[])
    if not (36 <= len(items) <= 42):
        errors.append(f"{design}: item count {len(items)} outside 36-42")
    if d.get("source_paths_included") is not False:
        errors.append(f"{design}: source_paths_included must be false")

    seen_ids=set()
    types={}
    sheets=set()

    for item in items:
        aid=item.get("asset_id","")
        if aid in seen_ids:
            errors.append(f"{design}: duplicate asset_id {aid}")
        seen_ids.add(aid)

        if item.get("identity_id") not in {"founder-main-01","generated-demo-01","neutral-subject"}:
            errors.append(f"{design}: non-neutral identity_id {item.get('identity_id')}")

        slot=item.get("slot")
        if not isinstance(slot,int) or not (1 <= slot <= 6):
            errors.append(f"{design}: invalid slot {slot}")

        rel=item.get("sheet_path","")
        p=repo/rel
        if not p.is_file():
            errors.append(f"{design}: missing sheet {rel}")
        else:
            got=git_blob_sha(p)
            exp=item.get("sheet_blob_sha")
            if got and exp and got!=exp:
                errors.append(f"{design}: sheet blob mismatch {rel}")

        sheets.add(rel)
        t=item.get("media_type","unknown")
        types[t]=types.get(t,0)+1

    summary[design]={
        "pack_id":d.get("pack_id"),
        "items":len(items),
        "media_type":types,
        "unique_sheets":len(sheets),
    }

print(json.dumps({"summary":summary,"errors":errors},ensure_ascii=False,indent=2))
if errors:
    raise SystemExit(2)
print("PUBLIC_WAVE_MANIFESTS_VERIFIED")
