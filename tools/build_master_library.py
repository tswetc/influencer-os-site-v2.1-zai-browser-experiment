#!/usr/bin/env python3
"""Materialize a ZAI-M001 MASTER-SELECTION.json into a web-ready master library.

Expected selected item fields:
- source_path
- media_type
- proposed_role
- family_id
- identity_or_subject
- product_use
- design_set_affinity
- rights_status

Usage:
  python3 tools/build_master_library.py \
    "/Volumes/F/INFLUENCER-OS-ZAI-LAB/originals" \
    "04-MEDIA/selections/MASTER-SELECTION.json" \
    "04-MEDIA/library/master-v1" \
    "04-MEDIA/packs/master-v1.json"

Images:
- converted to JPEG
- auto-oriented by sips
- max long edge 2600px
- JPEG quality 88

Videos:
- H.264 MP4
- max 1920px width
- audio removed
- faststart

Originals are never modified.
"""

from __future__ import annotations

import hashlib
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

IMAGE_EXTS={".jpg",".jpeg",".png",".heic",".tif",".tiff",".webp",".avif"}
VIDEO_EXTS={".mp4",".mov",".m4v",".webm",".avi",".mkv"}

def sha256(path: Path) -> str:
    h=hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda:f.read(1024*1024),b""):
            h.update(chunk)
    return h.hexdigest()

def slug(s: str) -> str:
    s=s.strip().replace(" ","-")
    s=re.sub(r"[^A-Za-z0-9._-]+","-",s)
    s=re.sub(r"-+","-",s).strip("-")
    return s[:120] or "media"

def run(cmd):
    p=subprocess.run(cmd,capture_output=True,text=True,check=False)
    if p.returncode!=0:
        raise RuntimeError((p.stderr or p.stdout)[-3000:])

def build_image(src: Path,dst: Path):
    if shutil.which("sips") is None:
        raise RuntimeError("macOS sips is required")
    dst=dst.with_suffix(".jpg")
    dst.parent.mkdir(parents=True,exist_ok=True)
    tmp=dst.with_name(dst.stem+".tmp.jpg")
    run(["sips","-s","format","jpeg","-s","formatOptions","88","-Z","2600",str(src),"--out",str(tmp)])
    tmp.replace(dst)
    return dst

def build_video(src: Path,dst: Path):
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg is required for selected videos")
    dst=dst.with_suffix(".mp4")
    dst.parent.mkdir(parents=True,exist_ok=True)
    run([
        "ffmpeg","-y","-i",str(src),
        "-vf","scale='min(1920,iw)':-2",
        "-c:v","libx264","-crf","20","-preset","medium",
        "-movflags","+faststart","-an",str(dst)
    ])
    return dst

def main():
    if len(sys.argv)!=5:
        raise SystemExit("usage: build_master_library.py <originals_dir> <selection_json> <output_dir> <manifest_json>")

    originals=Path(sys.argv[1]).expanduser().resolve()
    selection_path=Path(sys.argv[2]).expanduser().resolve()
    out=Path(sys.argv[3]).expanduser().resolve()
    manifest_path=Path(sys.argv[4]).expanduser().resolve()

    data=json.loads(selection_path.read_text(encoding="utf-8"))
    selected=data.get("items",data if isinstance(data,list) else None)
    if not isinstance(selected,list):
        raise SystemExit("MASTER-SELECTION must be a JSON array or an object with an items array")

    out.mkdir(parents=True,exist_ok=True)
    manifest=[]
    errors=[]

    for i,item in enumerate(selected,1):
        rel=Path(item["source_path"])
        src=originals/rel
        if not src.is_file():
            errors.append({"source_path":rel.as_posix(),"error":"missing_source"})
            continue

        ext=src.suffix.lower()
        family=slug(str(item.get("family_id") or "shared"))
        base=f"{i:04d}-{slug(src.stem)}"
        dst_base=out/family/base

        try:
            if ext in IMAGE_EXTS or item.get("media_type")=="image":
                dst=build_image(src,dst_base)
                media_type="image"
            elif ext in VIDEO_EXTS or item.get("media_type")=="video":
                dst=build_video(src,dst_base)
                media_type="video"
            else:
                errors.append({"source_path":rel.as_posix(),"error":f"unsupported_extension:{ext}"})
                continue
        except Exception as e:
            errors.append({"source_path":rel.as_posix(),"error":str(e)})
            continue

        manifest.append({
            "id":f"master-v1-{i:04d}",
            "path":dst.relative_to(Path.cwd()).as_posix() if dst.is_relative_to(Path.cwd()) else dst.as_posix(),
            "source_path":rel.as_posix(),
            "media_type":media_type,
            "bytes":dst.stat().st_size,
            "sha256":sha256(dst),
            "proposed_role":item.get("proposed_role"),
            "family_id":item.get("family_id"),
            "identity_or_subject":item.get("identity_or_subject"),
            "product_use":item.get("product_use"),
            "design_set_affinity":item.get("design_set_affinity",["shared"]),
            "rights_status":item.get("rights_status","review"),
            "visual_reason":item.get("visual_reason"),
            "confidence":item.get("confidence")
        })
        print(f"OK {i}/{len(selected)} {rel} -> {dst}")

    payload={
        "pack_id":"master-v1",
        "version":1,
        "selection_source":selection_path.as_posix(),
        "items":manifest,
        "errors":errors
    }
    manifest_path.parent.mkdir(parents=True,exist_ok=True)
    manifest_path.write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding="utf-8")

    print(json.dumps({
        "selected_input":len(selected),
        "materialized":len(manifest),
        "errors":len(errors),
        "manifest":manifest_path.as_posix()
    },ensure_ascii=False,indent=2))

if __name__=="__main__":
    main()
