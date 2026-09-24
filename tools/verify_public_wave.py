#!/usr/bin/env python3
"""Fail-closed verification for public Wave 01 transport packs.

Usage:
  python3 tools/verify_public_wave.py <repo_root>

Checks A/B/C/D v2 packs under 04-MEDIA/transport/.
"""

from __future__ import annotations
import hashlib,json,re,sys
from pathlib import Path

if len(sys.argv)!=2:
    raise SystemExit("usage: verify_public_wave.py <repo_root>")

repo=Path(sys.argv[1]).expanduser().resolve()
forbidden=re.compile(r"(milena|ioanna|milani|/Users/|/Volumes/|@milena|source_path|ssd_relative)",re.I)

def sha256(path):
    h=hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda:f.read(1024*1024),b""):
            h.update(chunk)
    return h.hexdigest()

errors=[]
summary={}
for design in "ABCD":
    pack_id=f"wave01-{design}-v2"
    root=repo/"04-MEDIA/transport"/pack_id
    manifest=root/"manifest.json"
    if not manifest.is_file():
        errors.append(f"{pack_id}: missing manifest")
        continue
    raw=manifest.read_text(encoding="utf-8")
    if forbidden.search(raw):
        errors.append(f"{pack_id}: forbidden identity/path token in public manifest")
    d=json.loads(raw)
    items=d.get("items",[])
    if not (30 <= len(items) <= 45):
        errors.append(f"{pack_id}: item count {len(items)} outside 30-45")
    if d.get("source_paths_included") is not False:
        errors.append(f"{pack_id}: source_paths_included must be false")

    seen=set()
    total=0
    types={}
    for item in items:
        fn=item.get("filename","")
        if fn in seen:
            errors.append(f"{pack_id}: duplicate filename {fn}")
        seen.add(fn)
        if not re.fullmatch(r"IOS-[A-Z0-9-]+-\d{3}\.(jpg|mp4)",fn):
            errors.append(f"{pack_id}: non-neutral filename {fn}")
        p=root/fn
        if not p.is_file():
            errors.append(f"{pack_id}: missing file {fn}")
            continue
        got=sha256(p)
        if got!=item.get("sha256"):
            errors.append(f"{pack_id}: hash mismatch {fn}")
        total+=p.stat().st_size
        t=item.get("media_type","unknown")
        types[t]=types.get(t,0)+1

    extras=[p.name for p in root.iterdir() if p.is_file() and p.name!="manifest.json" and p.name not in seen]
    if extras:
        errors.append(f"{pack_id}: unmanifested files: {extras[:8]}")

    summary[pack_id]={"items":len(items),"bytes":total,"media_type":types}

print(json.dumps({"summary":summary,"errors":errors},ensure_ascii=False,indent=2))
if errors:
    raise SystemExit(2)
print("PUBLIC_WAVE_VERIFIED")
