#!/usr/bin/env python3
"""Build bounded Wave 01 pack manifests from master-v1.json.

The audited M001 schema does not contain design_set_affinity. Pack membership is
therefore defined here by explicit family allowlists, not by a missing field.

Usage:
  python3 tools/make_run_media_packs.py \
    "04-MEDIA/packs/master-v1.json" \
    "04-MEDIA/packs"
"""

from __future__ import annotations
import json
import sys
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit("usage: make_run_media_packs.py <master_manifest> <output_dir>")

src = Path(sys.argv[1])
out = Path(sys.argv[2])
data = json.loads(src.read_text(encoding="utf-8"))
items = data["items"]
out.mkdir(parents=True, exist_ok=True)

PACKS = {
    "shared": {
        "founder-character-01",
        "world-diary-01", "world-raw-01", "world-staged-01",
        "capability-flora-01", "capability-bts-01",
    },
    "A": {
        "founder-character-01",
        "founder-editorial-colorlight-01",
        "founder-editorial-blue-01",
        "founder-editorial-apartment-01",
        "founder-editorial-pinkhair-01",
        "founder-editorial-tutu-01",
        "founder-editorial-cape-01",
        "founder-editorial-ruin-01",
        "founder-editorial-museum-01",
        "founder-editorial-sunsetgown-01",
        "founder-editorial-gallerywalk-01",
        "world-diary-01", "world-raw-01", "world-staged-01",
        "still-life-ai-01", "still-life-01",
        "capability-flora-01", "capability-bts-01",
    },
    "B": {
        "founder-character-01",
        "founder-editorial-cliffwind-01",
        "founder-editorial-seacave-01",
        "founder-editorial-nightwhite-01",
        "founder-editorial-nightblack-01",
        "founder-editorial-goldenroad-01",
        "founder-editorial-river-01",
        "founder-editorial-sea-01",
        "founder-editorial-gallerywalk-01",
        "founder-editorial-turquoise-01",
        "founder-editorial-whiteruffle-01",
        "founder-editorial-blackseries-01",
        "founder-editorial-palace-01",
        "founder-editorial-dining-01",
        "world-diary-01", "world-raw-01", "world-staged-01",
        "motion-pack-01",
    },
    "C": {
        "founder-character-01",
        "founder-editorial-colorlight-01",
        "founder-editorial-blue-01",
        "founder-editorial-apartment-01",
        "world-diary-01", "world-raw-01", "world-staged-01",
        "still-life-ai-01", "still-life-01",
        "capability-flora-01", "capability-bts-01",
        "motion-pack-01",
    },
    "D": {
        "founder-character-01",
        "founder-editorial-gallerywalk-01",
        "founder-editorial-cape-01",
        "founder-editorial-cliffwind-01",
        "founder-editorial-museum-01",
        "founder-editorial-ruin-01",
        "founder-editorial-nightblack-01",
        "founder-editorial-sunsetgown-01",
        "founder-editorial-palace-01",
        "world-diary-01", "world-raw-01", "world-staged-01",
        "motion-pack-01",
        "capability-flora-01",
    },
}

def families(item):
    value = item.get("family_ids") or []
    if isinstance(value, str):
        value = [value]
    return set(value)

summary = {}
for key, allowlist in PACKS.items():
    chosen = [item for item in items if families(item) & allowlist]
    payload = {
        "pack_id": f"wave01-{key}-v1",
        "version": 1,
        "source_pack": "master-v1-local-materialized",
        "selection_method": "explicit_family_allowlist",
        "family_allowlist": sorted(allowlist),
        "public_release_status": "NOT_APPROVED",
        "items": chosen,
    }
    target = out / f"wave01-{key}-v1.json"
    target.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    summary[key] = {
        "items": len(chosen),
        "families": len(set().union(*(families(x) for x in chosen))) if chosen else 0,
        "path": target.as_posix(),
    }

print(json.dumps(summary, ensure_ascii=False, indent=2))
