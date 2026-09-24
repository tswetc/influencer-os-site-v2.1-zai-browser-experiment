#!/usr/bin/env python3
"""Build a compact visual review atlas from founder SSD originals.

The atlas is for human/agent curation before full-resolution media packs exist.
It DOES NOT modify originals and DOES NOT copy the entire library.

Design:
- read the metadata inventory already committed in 04-MEDIA/inventory/
- ignore archive-control/derived thumbnail folders
- treat each media parent folder as a logical group
- sample up to 5 images + 1 video poster per group
- create one JPEG contact sheet per logical group
- write catalog.json and INDEX.md mapping every preview back to its exact SSD-relative source path

Requirements:
- macOS sips
- ffmpeg for video posters (optional but strongly recommended)
- Python Pillow: python3 -m pip install --user Pillow

Usage:
  python3 tools/build_review_atlas.py \
    "/Volumes/F/INFLUENCER-OS-ZAI-LAB/originals" \
    "04-MEDIA/inventory/founder-originals.json" \
    "04-MEDIA/review-atlas"
"""

from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageOps
except Exception:
    raise SystemExit(
        "Pillow is required. Install once with:\n"
        "  python3 -m pip install --user Pillow\n"
        "Then rerun this command."
    )

IMAGE_TYPES = {"image"}
VIDEO_TYPES = {"video"}

IGNORE_TOKENS = (
    "_ARCHIVE_CONTROL",
    "_00_ARCHIVE_CONTROL",
    "_CURATION",
    "_work",
    "thumbs_cache",
    "/thumbs/",
    "_UNSORTED_REVIEW",
    "_ARCHIVE_REAUDIT",
    "_duplicates",
    "_ duplicates",
    "/джипег/",
)

MAX_IMAGES_PER_GROUP = 5
MAX_VIDEOS_PER_GROUP = 1
THUMB_SIZE = 480
COLS = 3
ROWS = 2
HEADER_H = 74
GAP = 16
BG = (246, 244, 239)
FG = (18, 18, 18)
MUTED = (120, 120, 120)

def run(cmd: list[str]) -> tuple[int, str, str]:
    p = subprocess.run(cmd, capture_output=True, text=True, check=False)
    return p.returncode, p.stdout, p.stderr

def stable_id(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8")).hexdigest()[:14]

def evenly_sample(items: list[dict], cap: int) -> list[dict]:
    if len(items) <= cap:
        return items
    if cap <= 1:
        return [items[len(items)//2]]
    indices = sorted(set(round(i * (len(items)-1) / (cap-1)) for i in range(cap)))
    return [items[i] for i in indices]

def prepare_image(src: Path, dst: Path) -> bool:
    if shutil.which("sips") is None:
        raise SystemExit("macOS sips not found.")
    code, _, err = run([
        "sips",
        "-s", "format", "jpeg",
        "-s", "formatOptions", "72",
        "-Z", str(THUMB_SIZE * 2),
        str(src),
        "--out", str(dst),
    ])
    if code != 0:
        print(f"WARN image preview failed: {src}\n{err[-500:]}")
        return False
    return dst.is_file()

def prepare_video(src: Path, dst: Path, duration: float | None) -> bool:
    if shutil.which("ffmpeg") is None:
        print("WARN ffmpeg missing; video poster skipped:", src)
        return False
    t = 1.0
    if duration and duration > 0:
        t = max(0.2, min(duration * 0.33, max(duration - 0.15, 0.2)))
    code, _, err = run([
        "ffmpeg", "-y", "-ss", f"{t:.3f}", "-i", str(src),
        "-frames:v", "1",
        "-vf", f"scale='min({THUMB_SIZE*2},iw)':-2",
        "-q:v", "3",
        str(dst),
    ])
    if code != 0:
        print(f"WARN video poster failed: {src}\n{err[-500:]}")
        return False
    return dst.is_file()

def make_tile(preview: Path, label: str, kind: str) -> Image.Image:
    im = Image.open(preview).convert("RGB")
    fit = ImageOps.contain(im, (THUMB_SIZE, THUMB_SIZE))
    tile = Image.new("RGB", (THUMB_SIZE, THUMB_SIZE), BG)
    x = (THUMB_SIZE - fit.width)//2
    y = (THUMB_SIZE - fit.height)//2
    tile.paste(fit, (x, y))
    draw = ImageDraw.Draw(tile)
    draw.rectangle((10, 10, 64, 40), fill=(255,255,255))
    draw.text((18, 17), label, fill=FG)
    if kind == "video":
        draw.rectangle((THUMB_SIZE-82, 10, THUMB_SIZE-10, 40), fill=(255,255,255))
        draw.text((THUMB_SIZE-70, 17), "VIDEO", fill=FG)
    return tile

def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("usage: build_review_atlas.py <originals_dir> <inventory_json> <output_dir>")

    originals = Path(sys.argv[1]).expanduser().resolve()
    inventory_path = Path(sys.argv[2]).expanduser().resolve()
    out = Path(sys.argv[3]).expanduser().resolve()

    if not originals.is_dir():
        raise SystemExit(f"originals directory not found: {originals}")
    if not inventory_path.is_file():
        raise SystemExit(f"inventory not found: {inventory_path}")

    data = json.loads(inventory_path.read_text(encoding="utf-8"))

    usable = []
    for item in data["items"]:
        if item.get("media_type") not in IMAGE_TYPES | VIDEO_TYPES:
            continue
        path = item["path"]
        if any(token in path for token in IGNORE_TOKENS):
            continue
        usable.append(item)

    groups: dict[str, list[dict]] = {}
    for item in usable:
        p = Path(item["path"])
        parent = p.parent.as_posix() if p.parent.as_posix() != "." else "<root>"
        groups.setdefault(parent, []).append(item)

    sheets_dir = out / "sheets"
    if out.exists():
        shutil.rmtree(out)
    sheets_dir.mkdir(parents=True, exist_ok=True)

    atlas_groups = []
    errors = []
    group_items = sorted(groups.items(), key=lambda kv: kv[0].lower())

    with tempfile.TemporaryDirectory(prefix="ios-zai-atlas-") as tmp_s:
        tmp = Path(tmp_s)

        for idx, (group_path, items) in enumerate(group_items, start=1):
            images = sorted([x for x in items if x["media_type"] == "image"], key=lambda x: x["path"])
            videos = sorted([x for x in items if x["media_type"] == "video"], key=lambda x: x["path"])

            selected = [(x, "image") for x in evenly_sample(images, MAX_IMAGES_PER_GROUP)]
            selected += [(x, "video") for x in evenly_sample(videos, MAX_VIDEOS_PER_GROUP)]

            previews = []
            entries = []
            for slot, (item, kind) in enumerate(selected, start=1):
                src = originals / item["path"]
                if not src.is_file():
                    errors.append({"path": item["path"], "error": "missing_source"})
                    continue

                preview = tmp / f"{idx:04d}-{slot:02d}.jpg"
                ok = (
                    prepare_image(src, preview)
                    if kind == "image"
                    else prepare_video(src, preview, item.get("duration_sec"))
                )
                if not ok:
                    errors.append({"path": item["path"], "error": "preview_failed"})
                    continue

                previews.append((preview, kind))
                entries.append({
                    "slot": len(entries) + 1,
                    "source_path": item["path"],
                    "media_type": kind,
                    "bytes": item.get("bytes"),
                    "width": item.get("width"),
                    "height": item.get("height"),
                    "duration_sec": item.get("duration_sec"),
                })

            if not previews:
                continue

            canvas_w = COLS * THUMB_SIZE + (COLS + 1) * GAP
            canvas_h = HEADER_H + ROWS * THUMB_SIZE + (ROWS + 1) * GAP
            canvas = Image.new("RGB", (canvas_w, canvas_h), BG)
            draw = ImageDraw.Draw(canvas)
            draw.text((GAP, 18), f"GROUP {idx:04d}  |  {len(items)} MEDIA  |  {len(entries)} PREVIEWS", fill=FG)
            draw.text((GAP, 42), f"ID {stable_id(group_path)}", fill=MUTED)

            for n, (preview, kind) in enumerate(previews):
                row = n // COLS
                col = n % COLS
                x = GAP + col * (THUMB_SIZE + GAP)
                y = HEADER_H + GAP + row * (THUMB_SIZE + GAP)
                tile = make_tile(preview, f"{n+1:02d}", kind)
                canvas.paste(tile, (x, y))

            sheet_name = f"{idx:04d}-{stable_id(group_path)}.jpg"
            sheet_path = sheets_dir / sheet_name
            canvas.save(sheet_path, "JPEG", quality=78, optimize=True)

            atlas_groups.append({
                "group_number": idx,
                "group_path": group_path,
                "group_media_count": len(items),
                "group_image_count": len(images),
                "group_video_count": len(videos),
                "sheet_path": f"04-MEDIA/review-atlas/sheets/{sheet_name}",
                "samples": entries,
            })

            if idx % 25 == 0:
                print(f"built {idx}/{len(group_items)} groups")

    catalog = {
        "schema_version": 1,
        "inventory_source": str(inventory_path),
        "originals_root": str(originals),
        "selection_rule": {
            "max_images_per_group": MAX_IMAGES_PER_GROUP,
            "max_video_posters_per_group": MAX_VIDEOS_PER_GROUP,
            "sampling": "deterministic_evenly_spaced_by_sorted_path",
            "ignored_tokens": list(IGNORE_TOKENS),
        },
        "summary": {
            "usable_media_items": len(usable),
            "logical_groups": len(atlas_groups),
            "contact_sheets": len(atlas_groups),
            "preview_slots": sum(len(g["samples"]) for g in atlas_groups),
            "errors": len(errors),
        },
        "groups": atlas_groups,
        "errors": errors,
    }
    (out / "catalog.json").write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")

    md = [
        "# Founder Media Review Atlas",
        "",
        f"- logical groups: **{len(atlas_groups)}**",
        f"- preview slots: **{catalog['summary']['preview_slots']}**",
        f"- preview errors: **{len(errors)}**",
        "",
        "Each sheet is a sparse visual sample, not a final selection.",
        "The numbered slots map to exact SSD-relative source paths below.",
        "",
    ]
    for g in atlas_groups:
        md += [
            f"## GROUP {g['group_number']:04d} — {g['group_path']}",
            "",
            f"![GROUP {g['group_number']:04d}](sheets/{Path(g['sheet_path']).name})",
            "",
        ]
        for e in g["samples"]:
            extra = f" · {e['duration_sec']}s" if e.get("duration_sec") else ""
            md.append(f"- **{e['slot']:02d}** {e['source_path']} · {e['media_type']}{extra}")
        md.append("")

    (out / "INDEX.md").write_text("\n".join(md), encoding="utf-8")

    print(json.dumps(catalog["summary"], ensure_ascii=False, indent=2))
    print(f"\nWrote atlas: {out}")

if __name__ == "__main__":
    main()
