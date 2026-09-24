#!/usr/bin/env python3
"""Materialize the centrally normalized M001 selection into web-ready local media.

This tool is conservative:
- originals are never modified;
- records with materialize_local_allowed=false are skipped;
- public_use_allowed is preserved exactly and defaults to false;
- this script does NOT push anything to GitHub.

Usage:
  python3 tools/build_master_library.py \
    "/Volumes/F/INFLUENCER-OS-ZAI-LAB/originals" \
    "04-MEDIA/selections/MASTER-SELECTION-NORMALIZED.json" \
    "04-MEDIA/library/master-v1" \
    "04-MEDIA/packs/master-v1.json"

Images:
- converted to JPEG
- max long edge 2600 px
- JPEG quality 88

Videos:
- H.264 MP4
- max width 1920
- audio removed
- faststart
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

def repo_relative(path: Path) -> str:
    cwd=Path.cwd().resolve()
    p=path.resolve()
    try:
        return p.relative_to(cwd).as_posix()
    except ValueError:
        return p.as_posix()

def main():
    if len(sys.argv)!=5:
        raise SystemExit("usage: build_master_library.py <originals_dir> <normalized_selection_json> <output_dir> <manifest_json>")

    originals=Path(sys.argv[1]).expanduser().resolve()
    selection_path=Path(sys.argv[2]).expanduser().resolve()
    out=Path(sys.argv[3]).expanduser().resolve()
    manifest_path=Path(sys.argv[4]).expanduser().resolve()

    # Always build into a fresh sibling staging directory. This prevents stale
    # files from an earlier selection/materialization run from surviving when
    # the allowed set or row numbering changes.
    staging=out.with_name(out.name + ".__staging__")
    if staging.exists():
        shutil.rmtree(staging)
    staging.mkdir(parents=True,exist_ok=True)

    data=json.loads(selection_path.read_text(encoding="utf-8"))
    selected=data.get("items")
    if not isinstance(selected,list):
        raise SystemExit("normalized selection must contain an items array")

    manifest=[]
    errors=[]
    skipped=[]

    allowed=[x for x in selected if x.get("materialize_local_allowed",False)]

    for i,item in enumerate(allowed,1):
        rel=Path(item["source_path"])
        src=originals/rel

        if not src.is_file():
            errors.append({"source_path":rel.as_posix(),"error":"missing_source"})
            continue

        ext=src.suffix.lower()
        family=(item.get("family_ids") or ["shared"])[0]
        family_slug=slug(str(family))
        base=f"{i:04d}-g{int(item.get('group_number',0)):04d}-s{int(item.get('slot',0)):02d}-{slug(src.stem)}"
        dst_base=staging/family_slug/base

        try:
            if item.get("media_type")=="image" or ext in IMAGE_EXTS:
                dst=build_image(src,dst_base)
                media_type="image"
            elif item.get("media_type")=="video" or ext in VIDEO_EXTS:
                dst=build_video(src,dst_base)
                media_type="video"
            else:
                errors.append({"source_path":rel.as_posix(),"error":f"unsupported_extension:{ext}"})
                continue
        except Exception as e:
            errors.append({"source_path":rel.as_posix(),"error":str(e)})
            continue

        row=dict(item)
        final_dst=out/dst.relative_to(staging)
        row.update({
            "id":f"master-v1-{i:04d}",
            "path":repo_relative(final_dst),
            "source_path":rel.as_posix(),
            "media_type":media_type,
            "materialized_bytes":dst.stat().st_size,
            "sha256":sha256(dst),
        })
        manifest.append(row)
        print(f"OK {i}/{len(allowed)} {rel} -> {dst}")

    for item in selected:
        if not item.get("materialize_local_allowed",False):
            skipped.append({
                "source_path":item.get("source_path"),
                "publication_status":item.get("publication_status"),
                "rights_review_reason":item.get("rights_review_reason")
            })

    payload={
        "pack_id":"master-v1-local-materialized",
        "version":1,
        "selection_source":repo_relative(selection_path),
        "public_release_status":"NOT_APPROVED",
        "items":manifest,
        "skipped_holds":skipped,
        "errors":errors
    }

    if errors:
        print(json.dumps({
            "normalized_input":len(selected),
            "eligible_local_materialization":len(allowed),
            "materialized":len(manifest),
            "skipped_holds":len(skipped),
            "errors":len(errors),
            "staging":repo_relative(staging),
            "status":"FAILED_STAGING_PRESERVED"
        },ensure_ascii=False,indent=2))
        raise SystemExit(2)

    # Replace the prior generated tree only after the fresh build completed.
    if out.exists():
        shutil.rmtree(out)
    staging.replace(out)

    manifest_path.parent.mkdir(parents=True,exist_ok=True)
    manifest_path.write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding="utf-8")

    print(json.dumps({
        "normalized_input":len(selected),
        "eligible_local_materialization":len(allowed),
        "materialized":len(manifest),
        "skipped_holds":len(skipped),
        "errors":len(errors),
        "manifest":repo_relative(manifest_path),
        "status":"CLEAN_REBUILD_COMPLETE"
    },ensure_ascii=False,indent=2))

if __name__=="__main__":
    main()
