#!/usr/bin/env python3
"""Extract selected atlas slots into standalone provisional JPEGs.

For integration runs only. Output is a low-resolution crop from the review atlas.
Do not treat it as founder-original quality.

Usage:
  python3 tools/extract_atlas_pack.py <repo_root> <pack_json> <output_dir>

The contact-sheet geometry matches tools/build_review_atlas.py:
- canvas 1504x1082
- 3 columns x 2 rows
- tile 480x480
- gap 16
- header 74
"""

from __future__ import annotations
import json,sys
from pathlib import Path
from PIL import Image

THUMB=480
GAP=16
HEADER=74
COLS=3

if len(sys.argv)!=4:
    raise SystemExit("usage: extract_atlas_pack.py <repo_root> <pack_json> <output_dir>")

repo=Path(sys.argv[1]).resolve()
pack_path=Path(sys.argv[2]).resolve()
out=Path(sys.argv[3]).resolve()
out.mkdir(parents=True,exist_ok=True)
pack=json.loads(pack_path.read_text(encoding="utf-8"))

manifest=[]
for i,item in enumerate(pack["items"],1):
    sheet=repo/item["sheet_path"]
    if not sheet.is_file():
        raise SystemExit(f"missing sheet: {sheet}")
    slot=int(item["slot"])
    idx=slot-1
    row=idx//COLS
    col=idx%COLS
    left=GAP+col*(THUMB+GAP)
    top=HEADER+GAP+row*(THUMB+GAP)
    box=(left,top,left+THUMB,top+THUMB)
    with Image.open(sheet).convert("RGB") as im:
        crop=im.crop(box)
        name=f'{i:03d}-g{int(item["group_number"]):04d}-s{slot:02d}.jpg'
        dst=out/name
        crop.save(dst,"JPEG",quality=92,optimize=True)
    row_out=dict(item)
    row_out["extracted_path"]=dst.as_posix()
    manifest.append(row_out)
    print("OK",dst)

(out/"manifest.json").write_text(json.dumps({
    "pack_id":pack["pack_id"],
    "quality":"ATLAS_PREVIEW_DERIVATIVE",
    "items":manifest
},ensure_ascii=False,indent=2),encoding="utf-8")
print(f"Extracted {len(manifest)} items to {out}")
