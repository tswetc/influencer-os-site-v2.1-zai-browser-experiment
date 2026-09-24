#!/usr/bin/env python3
"""Create a sanitized HTTP-fetchable transport pack from a bounded Wave manifest.

The source master library stays local. The output folder is intended to be safe
for the temporary PUBLIC lab after review.

Usage:
  python3 tools/build_public_transport_pack.py \
    <repo_root> \
    04-MEDIA/packs/wave01-A-v2.json \
    04-MEDIA/transport/wave01-A-v2

Requirements:
- Pillow for images
- ffmpeg for video metadata stripping
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

FORBIDDEN_TEXT = re.compile(
    r"(milena|ioanna|milani|/Users/|/Volumes/|@milena|source_path|ssd_relative)",
    re.IGNORECASE,
)

def sha256(path: Path) -> str:
    h=hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda:f.read(1024*1024),b""):
            h.update(chunk)
    return h.hexdigest()

def run(cmd):
    p=subprocess.run(cmd,capture_output=True,text=True,check=False)
    if p.returncode != 0:
        raise RuntimeError((p.stderr or p.stdout)[-4000:])

def sanitize_image(src: Path,dst: Path):
    with Image.open(src) as im:
        im=ImageOps.exif_transpose(im).convert("RGB")
        # Re-save without source EXIF/IPTC metadata.
        im.save(dst,"JPEG",quality=90,optimize=True,progressive=True)

def sanitize_video(src: Path,dst: Path):
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg is required")
    # Master videos are already H.264/no-audio. Stream-copy while dropping metadata.
    run([
        "ffmpeg","-y","-i",str(src),
        "-map","0:v:0","-c:v","copy",
        "-map_metadata","-1","-an",
        "-movflags","+faststart",str(dst)
    ])

def main():
    if len(sys.argv)!=4:
        raise SystemExit("usage: build_public_transport_pack.py <repo_root> <wave_manifest> <output_dir>")

    repo=Path(sys.argv[1]).expanduser().resolve()
    manifest_path=(repo/Path(sys.argv[2])).resolve() if not Path(sys.argv[2]).is_absolute() else Path(sys.argv[2]).resolve()
    out=(repo/Path(sys.argv[3])).resolve() if not Path(sys.argv[3]).is_absolute() else Path(sys.argv[3]).resolve()

    wave=json.loads(manifest_path.read_text(encoding="utf-8"))
    items=wave.get("items",[])
    pack_id=wave.get("pack_id","unknown-pack")

    if pack_id.endswith("-shared-v2"):
        pass
    elif not (30 <= len(items) <= 45):
        raise SystemExit(f"transport pack {pack_id} must contain 30-45 items, got {len(items)}")

    staging=out.with_name(out.name+".__staging__")
    if staging.exists():
        shutil.rmtree(staging)
    staging.mkdir(parents=True,exist_ok=True)

    public=[]
    for i,item in enumerate(items,1):
        rel=item.get("path")
        if not rel:
            raise SystemExit(f"item {i} missing materialized path")
        src=(repo/rel).resolve()
        if not src.is_file():
            raise SystemExit(f"missing source derivative: {src}")

        expected=item.get("sha256")
        got=sha256(src)
        if expected and expected != got:
            raise SystemExit(f"hash mismatch before transport: {rel}")

        media_type=item.get("media_type")
        ext=".mp4" if media_type=="video" else ".jpg"
        code=re.sub(r"[^A-Za-z0-9]+","-",pack_id).upper()
        filename=f"IOS-{code}-{i:03d}{ext}"
        dst=staging/filename

        if media_type=="video":
            sanitize_video(src,dst)
        else:
            sanitize_image(src,dst)

        pub={
            "asset_id":f"IOS-{code}-{i:03d}",
            "filename":filename,
            "sha256":sha256(dst),
            "bytes":dst.stat().st_size,
            "media_type":media_type,
            "roles":item.get("roles",[]),
            "family_ids":item.get("family_ids",[]),
            "identity_id":item.get("identity_or_subject"),
            "provenance":item.get("provenance"),
            "publication_status":item.get("publication_status"),
            "public_lab_transport":True,
        }
        public.append(pub)

    payload={
        "pack_id":pack_id,
        "transport_schema_version":1,
        "source_manifest":manifest_path.name,
        "item_count":len(public),
        "identity_policy":"opaque IDs only",
        "source_paths_included":False,
        "metadata_stripped":True,
        "items":public,
    }

    serialized=json.dumps(payload,ensure_ascii=False,indent=2)
    m=FORBIDDEN_TEXT.search(serialized)
    if m:
        raise SystemExit(f"PUBLIC_MANIFEST_SANITIZATION_FAILED: forbidden token {m.group(0)!r}")

    (staging/"manifest.json").write_text(serialized,encoding="utf-8")

    if out.exists():
        shutil.rmtree(out)
    staging.replace(out)

    print(json.dumps({
        "pack_id":pack_id,
        "items":len(public),
        "bytes":sum(x["bytes"] for x in public),
        "manifest":(out/"manifest.json").as_posix(),
        "status":"PUBLIC_TRANSPORT_PACK_READY_FOR_REVIEW"
    },ensure_ascii=False,indent=2))

if __name__=="__main__":
    main()
