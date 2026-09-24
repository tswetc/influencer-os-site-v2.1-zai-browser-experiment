#!/usr/bin/env python3
"""Create contact sheets from the ACTUAL sanitized Wave v4 transport assets.

This is a pre-publication visual QA tool. It does not modify transport media.

Usage:
  python3 tools/build_wave_review_atlas.py \
    <repo_root> \
    <output_dir>

Creates one or more JPEG sheets per design A/B/C/D and INDEX.md.
Video thumbnails are extracted from the sanitized transport MP4 files with ffmpeg.
"""

from __future__ import annotations

import json
import math
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

if len(sys.argv) != 3:
    raise SystemExit("usage: build_wave_review_atlas.py <repo_root> <output_dir>")

repo = Path(sys.argv[1]).expanduser().resolve()
out = Path(sys.argv[2]).expanduser().resolve()
root = repo / "04-MEDIA/transport/wave01-v4"

COLS = 4
ROWS = 4
PER_SHEET = COLS * ROWS
TILE_W = 360
TILE_H = 410
IMG_H = 340
PAD = 18
HEADER = 58

if out.exists():
    shutil.rmtree(out)
out.mkdir(parents=True)
tmp = out / "_video_posters"
tmp.mkdir()

try:
    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 13)
except Exception:
    font = ImageFont.load_default()
    small = font

def video_poster(src: Path, dst: Path):
    if shutil.which("ffmpeg") is None:
        raise RuntimeError("ffmpeg required for video review posters")
    p = subprocess.run([
        "ffmpeg","-y","-ss","1","-i",str(src),
        "-frames:v","1","-vf","scale=720:-2",str(dst)
    ],capture_output=True,text=True,check=False)
    if p.returncode:
        raise RuntimeError((p.stderr or p.stdout)[-2000:])

index_lines = [
    "# Wave v4 Transport Visual Review Atlas",
    "",
    "Review the actual sanitized files that would be pushed to the public lab.",
    "Each tile shows neutral asset ID and media type only.",
    "",
]

for design in "ABCD":
    manifest = json.loads((root/"packs"/f"{design}.json").read_text(encoding="utf-8"))
    items = manifest["items"]
    pages = math.ceil(len(items)/PER_SHEET)
    index_lines += [f"## Pack {design}", f"- items: {len(items)}", f"- sheets: {pages}", ""]

    for page in range(pages):
        chunk = items[page*PER_SHEET:(page+1)*PER_SHEET]
        canvas = Image.new(
            "RGB",
            (PAD + COLS*(TILE_W+PAD), HEADER + PAD + ROWS*(TILE_H+PAD)),
            "white"
        )
        draw = ImageDraw.Draw(canvas)
        draw.text(
            (PAD,18),
            f"WAVE V4 · PACK {design} · PAGE {page+1}/{pages} · {len(items)} ITEMS",
            fill="black",font=font
        )

        for j,item in enumerate(chunk):
            row=j//COLS
            col=j%COLS
            x=PAD+col*(TILE_W+PAD)
            y=HEADER+PAD+row*(TILE_H+PAD)
            asset=repo/item["download_path"]

            if item["media_type"]=="video":
                poster=tmp/(item["asset_id"]+".jpg")
                video_poster(asset,poster)
                source=poster
            else:
                source=asset

            with Image.open(source) as im:
                im=ImageOps.exif_transpose(im).convert("RGB")
                fitted=ImageOps.contain(im,(TILE_W,IMG_H))
                bg=Image.new("RGB",(TILE_W,IMG_H),(238,238,236))
                ox=(TILE_W-fitted.width)//2
                oy=(IMG_H-fitted.height)//2
                bg.paste(fitted,(ox,oy))
                canvas.paste(bg,(x,y))

            label=f"{item['asset_id']} · {item['media_type'].upper()}"
            draw.text((x,y+IMG_H+10),label,fill="black",font=small)
            fam=", ".join(item.get("family_ids",[])[:2])
            draw.text((x,y+IMG_H+30),fam[:48],fill=(80,80,80),font=small)

        target=out/f"PACK-{design}-{page+1:02d}.jpg"
        canvas.save(target,"JPEG",quality=86,optimize=True)
        index_lines.append(f"- {target.name}")

    index_lines.append("")

shutil.rmtree(tmp)
(out/"INDEX.md").write_text("\n".join(index_lines),encoding="utf-8")
print(f"WAVE_REVIEW_ATLAS_READY {out}")
