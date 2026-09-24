#!/usr/bin/env python3
"""Download and verify one commit-pinned public Wave v4 pack.

Usage:
  python3 fetch_public_wave_pack.py \
    https://raw.githubusercontent.com/OWNER/REPO/FULL_SHA \
    A \
    ./media

Design must be A, B, C or D.
"""

from __future__ import annotations

import hashlib
import json
import sys
import urllib.request
from pathlib import Path

if len(sys.argv)!=4:
    raise SystemExit("usage: fetch_public_wave_pack.py <raw_base_at_full_sha> <A|B|C|D> <output_dir>")

base=sys.argv[1].rstrip("/")
design=sys.argv[2].upper()
out=Path(sys.argv[3]).resolve()
if design not in "ABCD" or len(design)!=1:
    raise SystemExit("design must be A/B/C/D")
if "/main" in base or base.endswith("/main"):
    raise SystemExit("raw base must be commit-pinned, not main")

def get(url):
    req=urllib.request.Request(url,headers={"User-Agent":"Influencer-OS-Lab/1"})
    with urllib.request.urlopen(req,timeout=60) as r:
        return r.read()

def sha256(data):
    return hashlib.sha256(data).hexdigest()

manifest_url=f"{base}/04-MEDIA/transport/wave01-v4/packs/{design}.json"
manifest_bytes=get(manifest_url)
manifest=json.loads(manifest_bytes.decode("utf-8"))

items=manifest.get("items",[])
if not 30 <= len(items) <= 45:
    raise SystemExit(f"pack count out of bounds: {len(items)}")
if manifest.get("source_paths_included") is not False:
    raise SystemExit("source path contract failed")

out.mkdir(parents=True,exist_ok=True)
records=[]
for i,item in enumerate(items,1):
    rel=item["download_path"]
    data=get(f"{base}/{rel}")
    got=sha256(data)
    if got!=item["sha256"]:
        raise SystemExit(f"SHA mismatch {rel}: {got} != {item['sha256']}")
    dst=out/item["filename"]
    dst.write_bytes(data)
    records.append({**item,"local_path":dst.as_posix()})
    print(f"OK {i}/{len(items)} {item['asset_id']} {len(data)} bytes")

(out/"manifest.json").write_text(json.dumps({
    **manifest,
    "download_base":base,
    "items":records
},ensure_ascii=False,indent=2),encoding="utf-8")

print(json.dumps({
    "pack_id":manifest["pack_id"],
    "items":len(records),
    "bytes":sum(x["bytes"] for x in records),
    "status":"PACK_DOWNLOAD_VERIFIED"
},ensure_ascii=False,indent=2))
