#!/usr/bin/env python3
"""Fetch a commit-pinned bounded public atlas media pack and extract its slots.

Usage:
  python3 tools/fetch_public_atlas_pack.py \
    <commit_sha> \
    <manifest_url_or_local_path> \
    <output_dir>

The manifest contains NO SSD source paths.
Each item points to an existing public atlas contact sheet + slot and records the
Git blob SHA of that sheet. The script:
- downloads only the unique sheets required by the pack;
- verifies each sheet against its Git blob SHA;
- crops the selected slot;
- writes neutral filenames;
- strips source metadata by re-encoding JPEG;
- writes local-manifest.json with SHA-256 for every extracted derivative.

ATLAS geometry:
- 1504x1082 sheet
- header 74px
- gap 16px
- 3 columns x 2 rows
- tile 480x480
"""

from __future__ import annotations
import hashlib
import json
import re
import sys
import urllib.request
from pathlib import Path

try:
    from PIL import Image
except Exception as exc:
    raise SystemExit("Pillow is required: pip install Pillow") from exc

OWNER="tswetc"
REPO="influencer-os-site-v2.1-zai-browser-experiment"

THUMB=480
GAP=16
HEADER=74
COLS=3

if len(sys.argv)!=4:
    raise SystemExit("usage: fetch_public_atlas_pack.py <commit_sha> <manifest_url_or_local_path> <output_dir>")

commit, manifest_arg, out_arg = sys.argv[1:]
if not re.fullmatch(r"[0-9a-fA-F]{40}", commit):
    raise SystemExit("commit_sha must be a full 40-char SHA")

out=Path(out_arg).expanduser().resolve()
out.mkdir(parents=True,exist_ok=True)
sheet_dir=out/"_sheets"
sheet_dir.mkdir(parents=True,exist_ok=True)

def read_manifest(arg):
    if arg.startswith("http://") or arg.startswith("https://"):
        with urllib.request.urlopen(arg) as r:
            return json.loads(r.read().decode("utf-8"))
    return json.loads(Path(arg).read_text(encoding="utf-8"))

def git_blob_sha(data: bytes) -> str:
    prefix=f"blob {len(data)}\0".encode("utf-8")
    return hashlib.sha1(prefix+data).hexdigest()

def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

pack=read_manifest(manifest_arg)
items=pack.get("items",[])
if not (30 <= len(items) <= 45):
    raise SystemExit(f"pack count outside 30-45: {len(items)}")

sheets={}
for item in items:
    p=item["sheet_path"]
    expected=item["sheet_blob_sha"]
    prev=sheets.get(p)
    if prev and prev!=expected:
        raise SystemExit(f"conflicting blob SHA for {p}")
    sheets[p]=expected

for idx,(rel,expected) in enumerate(sorted(sheets.items()),1):
    url=f"https://raw.githubusercontent.com/{OWNER}/{REPO}/{commit}/{rel}"
    target=sheet_dir/Path(rel).name
    print(f"SHEET {idx}/{len(sheets)} {url}")
    with urllib.request.urlopen(url) as r:
        data=r.read()
    got=git_blob_sha(data)
    if got!=expected:
        raise SystemExit(f"sheet blob mismatch for {rel}: {got} != {expected}")
    target.write_bytes(data)

local=[]
for i,item in enumerate(items,1):
    sheet=sheet_dir/Path(item["sheet_path"]).name
    slot=int(item["slot"])
    if slot<1 or slot>6:
        raise SystemExit(f"invalid slot {slot}")
    idx=slot-1
    row=idx//COLS
    col=idx%COLS
    left=GAP+col*(THUMB+GAP)
    top=HEADER+GAP+row*(THUMB+GAP)
    box=(left,top,left+THUMB,top+THUMB)

    asset_id=item["asset_id"]
    filename=f"{asset_id}.jpg"
    dst=out/filename

    with Image.open(sheet).convert("RGB") as im:
        crop=im.crop(box)
        crop.save(dst,"JPEG",quality=92,optimize=True,progressive=True)

    data=dst.read_bytes()
    row_out=dict(item)
    row_out.update({
        "filename":filename,
        "local_sha256":sha256(data),
        "bytes":len(data),
        "transport_derivative_type":"ATLAS_PREVIEW_DERIVATIVE_JPEG"
    })
    local.append(row_out)
    print(f"ASSET {i}/{len(items)} {filename}")

payload={
    "pack_id":pack["pack_id"],
    "input_commit":commit,
    "item_count":len(local),
    "source_paths_included":False,
    "identity_policy":"opaque IDs only",
    "quality":"ATLAS_PREVIEW_DERIVATIVE",
    "items":local,
}
(out/"local-manifest.json").write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding="utf-8")
print(json.dumps({
    "pack_id":pack["pack_id"],
    "items":len(local),
    "unique_sheets":len(sheets),
    "output":str(out),
    "status":"PUBLIC_ATLAS_PACK_FETCHED_AND_VERIFIED"
},ensure_ascii=False,indent=2))
