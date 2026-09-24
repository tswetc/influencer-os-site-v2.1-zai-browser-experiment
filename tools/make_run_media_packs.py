#!/usr/bin/env python3
"""Create run-design media pack manifests from master-v1.json.

Usage:
  python3 tools/make_run_media_packs.py \
    "04-MEDIA/packs/master-v1.json" \
    "04-MEDIA/packs"

Creates:
- wave01-shared-v1.json
- wave01-A-v1.json
- wave01-B-v1.json
- wave01-C-v1.json
- wave01-D-v1.json

Affinities are taken from design_set_affinity in the curated master selection.
"""

from __future__ import annotations
import json,sys
from pathlib import Path

if len(sys.argv)!=3:
    raise SystemExit("usage: make_run_media_packs.py <master_manifest> <output_dir>")

src=Path(sys.argv[1])
out=Path(sys.argv[2])
data=json.loads(src.read_text(encoding="utf-8"))
items=data["items"]
out.mkdir(parents=True,exist_ok=True)

def norm_aff(item):
    a=item.get("design_set_affinity",["shared"])
    if isinstance(a,str): a=[a]
    return {str(x).strip().upper() for x in a}

specs={
    "shared":lambda a: "SHARED" in a,
    "A":lambda a: "A" in a or "SHARED" in a,
    "B":lambda a: "B" in a or "SHARED" in a,
    "C":lambda a: "C" in a or "SHARED" in a,
    "D":lambda a: "D" in a or "SHARED" in a,
}

for key,pred in specs.items():
    chosen=[x for x in items if pred(norm_aff(x))]
    payload={
        "pack_id":f"wave01-{key}-v1",
        "version":1,
        "source_pack":"master-v1",
        "items":chosen
    }
    path=out/f"wave01-{key}-v1.json"
    path.write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding="utf-8")
    print(key,len(chosen),path)
