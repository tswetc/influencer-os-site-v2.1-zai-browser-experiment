#!/usr/bin/env python3
"""Build web-ready media derivatives from a selection file.

Selection JSON example:
{
  "pack_id": "founder-character-01",
  "items": [
    {"path": "CharacterA/street/IMG_0012.JPG", "role": "identity_reference"},
    {"path": "CharacterA/street/IMG_0044.JPG", "role": "scene_reference"}
  ]
}

Usage:
  python3 tools/build_media_pack.py \
    "/Volumes/F/INFLUENCER-OS-ZAI-LAB/originals" \
    selection.json \
    "04-MEDIA/library"

On macOS, images are converted/resized with sips.
Videos are converted only if ffmpeg is installed; otherwise they are skipped
with a clear warning.

Original files are never modified.
"""

from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".heic", ".tif", ".tiff"}
VIDEO_EXTS = {".mp4", ".mov", ".m4v", ".webm"}

def sha256(path: Path):
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def safe_name(rel: Path):
    parts = [p.replace(" ", "-") for p in rel.parts]
    return Path(*parts)

def build_image(src: Path, dst: Path):
    if shutil.which("sips") is None:
        raise RuntimeError("sips not found")
    dst = dst.with_suffix(".jpg")
    dst.parent.mkdir(parents=True, exist_ok=True)
    tmp = dst.with_name(dst.stem + ".tmp.jpg")
    cmd = ["sips", "-s", "format", "jpeg", "-s", "formatOptions", "88",
           "-Z", "2600", str(src), "--out", str(tmp)]
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        raise RuntimeError(p.stderr.strip() or p.stdout.strip())
    tmp.replace(dst)
    return dst

def build_video(src: Path, dst: Path):
    if shutil.which("ffmpeg") is None:
        return None
    dst = dst.with_suffix(".mp4")
    dst.parent.mkdir(parents=True, exist_ok=True)
    cmd = [
        "ffmpeg","-y","-i",str(src),
        "-vf","scale='min(1920,iw)':-2",
        "-c:v","libx264","-crf","20","-preset","medium",
        "-movflags","+faststart","-an",str(dst)
    ]
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        raise RuntimeError(p.stderr[-2000:])
    return dst

def main():
    if len(sys.argv) != 4:
        raise SystemExit("usage: build_media_pack.py <originals_dir> <selection_json> <output_root>")

    originals = Path(sys.argv[1]).expanduser().resolve()
    selection_path = Path(sys.argv[2]).expanduser().resolve()
    output_root = Path(sys.argv[3]).expanduser().resolve()

    selection = json.loads(selection_path.read_text(encoding="utf-8"))
    pack_id = selection["pack_id"]
    pack_root = output_root / pack_id
    manifest_items = []

    for spec in selection["items"]:
        rel = Path(spec["path"])
        src = originals / rel
        if not src.is_file():
            print(f"SKIP missing: {src}")
            continue
        clean_rel = safe_name(rel)
        ext = src.suffix.lower()

        try:
            if ext in IMAGE_EXTS:
                dst = build_image(src, pack_root / clean_rel)
                media_type = "image"
            elif ext in VIDEO_EXTS:
                dst = build_video(src, pack_root / clean_rel)
                if dst is None:
                    print(f"SKIP video (ffmpeg missing): {src}")
                    continue
                media_type = "video"
            else:
                print(f"SKIP unsupported: {src}")
                continue
        except Exception as e:
            print(f"ERROR {src}: {e}")
            continue

        manifest_items.append({
            "path": dst.relative_to(output_root.parents[1]).as_posix()
                    if len(output_root.parents) >= 2 else dst.as_posix(),
            "source_relative_path": rel.as_posix(),
            "media_type": media_type,
            "role": spec.get("role", "unclassified"),
            "provenance": spec.get("provenance", "founder_media"),
            "rights_status": spec.get("rights_status", "founder_confirmed_for_experiment"),
            "bytes": dst.stat().st_size,
            "sha256": sha256(dst),
            "notes": spec.get("notes", ""),
        })
        print(f"OK {src.name} -> {dst.name}")

    manifest = {
        "pack_id": pack_id,
        "version": 1,
        "description": selection.get("description", ""),
        "items": manifest_items,
    }
    manifest_path = output_root.parent / "packs" / f"{pack_id}.json"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nWrote manifest: {manifest_path}")
    print(f"Items: {len(manifest_items)}")

if __name__ == "__main__":
    main()
