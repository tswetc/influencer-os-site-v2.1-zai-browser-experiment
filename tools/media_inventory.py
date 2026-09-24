#!/usr/bin/env python3
"""Inventory founder media on macOS without modifying originals.

Usage:
  python3 tools/media_inventory.py \
    "/Volumes/F/INFLUENCER-OS-ZAI-LAB/originals" \
    "04-MEDIA/inventory/founder-originals.json"

Outputs JSON with folder/file structure, byte sizes, extensions and, where
available, image dimensions (via macOS sips) and video duration/dimensions
(via ffprobe if installed).

No media files are copied or changed.
"""

from __future__ import annotations

import hashlib
import json
import mimetypes
import shutil
import subprocess
import sys
from collections import Counter, defaultdict
from pathlib import Path

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".tif", ".tiff", ".heic", ".avif"}
VIDEO_EXTS = {".mp4", ".mov", ".m4v", ".webm", ".avi", ".mkv"}

def run(cmd):
    try:
        p = subprocess.run(cmd, capture_output=True, text=True, check=False)
        if p.returncode == 0:
            return p.stdout
    except Exception:
        pass
    return ""

def image_meta(path: Path):
    if shutil.which("sips") is None:
        return {}
    out = run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(path)])
    meta = {}
    for line in out.splitlines():
        line = line.strip()
        if line.startswith("pixelWidth:"):
            try: meta["width"] = int(line.split(":",1)[1].strip())
            except: pass
        elif line.startswith("pixelHeight:"):
            try: meta["height"] = int(line.split(":",1)[1].strip())
            except: pass
    return meta

def video_meta(path: Path):
    if shutil.which("ffprobe") is None:
        return {}
    out = run([
        "ffprobe","-v","error",
        "-select_streams","v:0",
        "-show_entries","stream=width,height,duration:format=duration",
        "-of","json", str(path)
    ])
    try:
        data = json.loads(out)
    except Exception:
        return {}
    meta = {}
    streams = data.get("streams") or []
    if streams:
        s = streams[0]
        if s.get("width"): meta["width"] = int(s["width"])
        if s.get("height"): meta["height"] = int(s["height"])
        dur = s.get("duration")
        if dur not in (None, "N/A"):
            try: meta["duration_sec"] = round(float(dur), 3)
            except: pass
    if "duration_sec" not in meta:
        dur = (data.get("format") or {}).get("duration")
        if dur:
            try: meta["duration_sec"] = round(float(dur), 3)
            except: pass
    return meta

def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: media_inventory.py <originals_dir> <output_json>")
    root = Path(sys.argv[1]).expanduser().resolve()
    out_path = Path(sys.argv[2]).expanduser()
    if not root.is_dir():
        raise SystemExit(f"not a directory: {root}")

    items = []
    ext_counts = Counter()
    folder_counts = defaultdict(int)
    folder_bytes = defaultdict(int)
    total_bytes = 0

    for path in sorted(root.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(root).as_posix()
        size = path.stat().st_size
        ext = path.suffix.lower()
        ext_counts[ext or "<none>"] += 1
        parts = Path(rel).parts
        top = parts[0] if parts else "."
        folder_counts[top] += 1
        folder_bytes[top] += size
        total_bytes += size

        item = {
            "path": rel,
            "bytes": size,
            "extension": ext,
            "media_type": (
                "image" if ext in IMAGE_EXTS else
                "video" if ext in VIDEO_EXTS else
                (mimetypes.guess_type(path.name)[0] or "other")
            ),
        }
        if ext in IMAGE_EXTS:
            item.update(image_meta(path))
        elif ext in VIDEO_EXTS:
            item.update(video_meta(path))
        items.append(item)

    payload = {
        "schema_version": 1,
        "source_root": str(root),
        "note": "Metadata only; originals are not committed.",
        "summary": {
            "files": len(items),
            "bytes": total_bytes,
            "extensions": dict(sorted(ext_counts.items())),
            "top_level_folders": {
                k: {"files": folder_counts[k], "bytes": folder_bytes[k]}
                for k in sorted(folder_counts)
            },
        },
        "items": items,
    }

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(payload["summary"], ensure_ascii=False, indent=2))
    print(f"\nWrote: {out_path}")

if __name__ == "__main__":
    main()
