#!/usr/bin/env python3
"""Build one deduplicated sanitized PUBLIC Wave media bundle from local master derivatives.

Input:
  repo root containing the LOCAL (untracked) master-v1 library + master manifest
  and four bounded wave01-{A,B,C,D}-v2 manifests.

Output:
  04-MEDIA/transport/wave01-v4/
    assets/<neutral files>
    packs/A.json
    packs/B.json
    packs/C.json
    packs/D.json
    BUNDLE-MANIFEST.json

The output is intended for temporary public GitHub transport after review.

Usage:
  python3 tools/build_public_wave_bundle.py <repo_root>
"""

from __future__ import annotations

import hashlib
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageOps

if len(sys.argv) != 2:
    raise SystemExit("usage: build_public_wave_bundle.py <repo_root>")

repo=Path(sys.argv[1]).expanduser().resolve()
out=repo/"04-MEDIA/transport/wave01-v4"
staging=out.with_name(out.name+".__staging__")

PACK_FILES={d:repo/f"04-MEDIA/packs/wave01-{d}-v2.json" for d in "ABCD"}
FORBIDDEN=re.compile(
    r"(founder_milena_ioanna|milena\s+ioanna|@milenaioanna|milenaioanna\.com|milena\s+milani\s+carol|/Users/|/Volumes/|ssd_relative_source_path)",
    re.I,
)
MAX_FILE_BYTES=95*1024*1024

def sha256(path: Path) -> str:
    h=hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda:f.read(1024*1024),b""):
            h.update(chunk)
    return h.hexdigest()

def run(cmd):
    p=subprocess.run(cmd,capture_output=True,text=True,check=False)
    if p.returncode:
        raise RuntimeError((p.stderr or p.stdout)[-4000:])

def image_copy(src: Path,dst: Path):
    with Image.open(src) as im:
        im=ImageOps.exif_transpose(im).convert("RGB")
        # Deliberately omit EXIF/IPTC/XMP.
        im.save(dst,"JPEG",quality=90,optimize=True,progressive=True)

def video_copy(src: Path,dst: Path):
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg is required for public video transport")
    # Re-encode to reduce Git transport size and strip metadata/audio.
    run([
        "ffmpeg","-y","-i",str(src),
        "-map","0:v:0",
        "-vf","scale='min(1080,iw)':-2",
        "-c:v","libx264","-crf","24","-preset","medium",
        "-pix_fmt","yuv420p",
        "-map_metadata","-1","-an",
        "-movflags","+faststart",str(dst)
    ])

def public_item(item,asset_id,filename,file_sha,file_bytes):
    return {
        "asset_id":asset_id,
        "filename":filename,
        "download_path":f"04-MEDIA/transport/wave01-v4/assets/{filename}",
        "sha256":file_sha,
        "bytes":file_bytes,
        "media_type":item.get("media_type"),
        "roles":item.get("roles",[]),
        "family_ids":item.get("family_ids",[]),
        "identity_id":item.get("identity_or_subject"),
        "provenance":item.get("provenance"),
        "publication_state":"PUBLIC_LAB_DEVELOPMENT_ONLY",
    }

# Preflight.
packs={}
for design,p in PACK_FILES.items():
    if not p.is_file():
        raise SystemExit(f"missing bounded pack: {p}")
    d=json.loads(p.read_text(encoding="utf-8"))
    items=d.get("items",[])
    if not 30 <= len(items) <= 45:
        raise SystemExit(f"{design}: expected 30-45 bounded items, got {len(items)}")
    # Pixel-level identity-card exclusion must never enter transport.
    if any((x.get("group_number"),x.get("slot"))==(27,1) for x in items):
        raise SystemExit(f"{design}: forbidden G0027/s01 visible identity-card frame selected")
    packs[design]=d

if staging.exists():
    shutil.rmtree(staging)
(staging/"assets").mkdir(parents=True)
(staging/"packs").mkdir(parents=True)

# Deduplicate by verified local master derivative SHA.
source_by_sha={}
membership={design:[] for design in "ABCD"}

for design,d in packs.items():
    for item in d["items"]:
        rel=item.get("path")
        if not rel:
            raise SystemExit(f"{design}: item missing materialized path")
        src=(repo/rel).resolve()
        if not src.is_file():
            raise SystemExit(f"{design}: missing local master derivative {src}")
        got=sha256(src)
        expected=item.get("sha256")
        if expected and got!=expected:
            raise SystemExit(f"{design}: master hash mismatch {rel}")
        source_by_sha.setdefault(got,item)
        membership[design].append(got)

asset_meta={}
for n,(src_sha,item) in enumerate(sorted(source_by_sha.items()),1):
    src=(repo/item["path"]).resolve()
    media_type=item.get("media_type")
    ext=".mp4" if media_type=="video" else ".jpg"
    asset_id=f"IOS-W01-{src_sha[:16].upper()}"
    filename=f"{asset_id}{ext}"
    dst=staging/"assets"/filename

    if media_type=="video":
        video_copy(src,dst)
    else:
        image_copy(src,dst)

    size=dst.stat().st_size
    if size>MAX_FILE_BYTES:
        raise SystemExit(f"GitHub file-size gate failed: {filename} = {size} bytes")

    out_sha=sha256(dst)
    asset_meta[src_sha]=public_item(item,asset_id,filename,out_sha,size)

pack_summaries={}
for design in "ABCD":
    seen=set()
    public=[]
    for src_sha in membership[design]:
        a=asset_meta[src_sha]
        if a["asset_id"] in seen:
            continue
        seen.add(a["asset_id"])
        public.append(a)

    payload={
        "pack_id":f"wave01-{design}-public-v4",
        "schema_version":4,
        "design_set":design,
        "item_count":len(public),
        "target_range":[30,45],
        "transport_mode":"SANITIZED_WEB_DERIVATIVES",
        "identity_policy":"opaque IDs only",
        "source_paths_included":False,
        "metadata_stripped":True,
        "items":public,
    }
    raw=json.dumps(payload,ensure_ascii=False,indent=2)
    m=FORBIDDEN.search(raw)
    if m:
        raise SystemExit(f"{design}: forbidden public-manifest token: {m.group(0)!r}")
    (staging/"packs"/f"{design}.json").write_text(raw,encoding="utf-8")
    pack_summaries[design]={
        "items":len(public),
        "images":sum(x["media_type"]=="image" for x in public),
        "videos":sum(x["media_type"]=="video" for x in public),
        "bytes":sum(x["bytes"] for x in public),
    }

bundle={
    "bundle_id":"wave01-public-v4",
    "schema_version":4,
    "asset_count":len(asset_meta),
    "asset_bytes":sum(x["bytes"] for x in asset_meta.values()),
    "packs":pack_summaries,
    "source_paths_included":False,
    "metadata_stripped":True,
}
raw=json.dumps(bundle,ensure_ascii=False,indent=2)
if FORBIDDEN.search(raw):
    raise SystemExit("bundle manifest sanitization failed")
(staging/"BUNDLE-MANIFEST.json").write_text(raw,encoding="utf-8")

if out.exists():
    shutil.rmtree(out)
staging.replace(out)

print(json.dumps(bundle,ensure_ascii=False,indent=2))
print("PUBLIC_WAVE_BUNDLE_READY_FOR_REVIEW")
