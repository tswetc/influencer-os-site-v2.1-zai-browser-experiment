#!/usr/bin/env python3
"""Build bounded Wave 01 media pack manifests from master-v1.json.

Design goal:
- approximately 30–45 genuinely selected items per A/B/C/D run;
- coherent family coverage;
- deterministic diversity inside large families;
- fail closed if a run pack falls outside the target range.

This script writes manifests only. It does not copy media.

Usage:
  python3 tools/make_run_media_packs.py \
    "04-MEDIA/packs/master-v1.json" \
    "04-MEDIA/packs"
"""

from __future__ import annotations

import json
import math
import sys
from pathlib import Path

if len(sys.argv) != 3:
    raise SystemExit("usage: make_run_media_packs.py <master_manifest> <output_dir>")

src = Path(sys.argv[1])
out = Path(sys.argv[2])
data = json.loads(src.read_text(encoding="utf-8"))
items = data["items"]
out.mkdir(parents=True, exist_ok=True)

TARGET_MIN = 30
TARGET_MAX = 45

# Per-family caps encode product/design intent. They are intentionally smaller
# than the available master library.
PACK_CAPS = {
    "shared": {
        "founder-character-01": 4,
        "world-diary-01": 3,
        "world-raw-01": 2,
        "world-staged-01": 2,
        "capability-flora-01": 5,
        "capability-bts-01": 2,
    },
    "A": {
        "founder-character-01": 4,
        "founder-editorial-colorlight-01": 2,
        "founder-editorial-blue-01": 2,
        "founder-editorial-apartment-01": 2,
        "founder-editorial-pinkhair-01": 2,
        "founder-editorial-tutu-01": 2,
        "founder-editorial-cape-01": 1,
        "founder-editorial-ruin-01": 1,
        "founder-editorial-museum-01": 1,
        "founder-editorial-sunsetgown-01": 1,
        "founder-editorial-gallerywalk-01": 1,
        "world-diary-01": 3,
        "world-raw-01": 2,
        "world-staged-01": 2,
        "still-life-ai-01": 3,
        "still-life-01": 2,
        "capability-flora-01": 4,
        "capability-bts-01": 2,
    },
    "B": {
        "founder-character-01": 4,
        "founder-editorial-cliffwind-01": 2,
        "founder-editorial-seacave-01": 2,
        "founder-editorial-nightwhite-01": 1,
        "founder-editorial-nightblack-01": 2,
        "founder-editorial-goldenroad-01": 2,
        "founder-editorial-river-01": 2,
        "founder-editorial-sea-01": 2,
        "founder-editorial-gallerywalk-01": 1,
        "founder-editorial-turquoise-01": 1,
        "founder-editorial-whiteruffle-01": 2,
        "founder-editorial-blackseries-01": 2,
        "founder-editorial-palace-01": 2,
        "founder-editorial-dining-01": 2,
        "world-diary-01": 3,
        "world-raw-01": 2,
        "world-staged-01": 2,
        "motion-pack-01": 5,
    },
    "C": {
        "founder-character-01": 4,
        "founder-editorial-colorlight-01": 2,
        "founder-editorial-blue-01": 2,
        "founder-editorial-apartment-01": 2,
        "world-diary-01": 3,
        "world-raw-01": 2,
        "world-staged-01": 2,
        "still-life-ai-01": 3,
        "still-life-01": 2,
        "capability-flora-01": 5,
        "capability-bts-01": 2,
        "motion-pack-01": 5,
    },
    "D": {
        "founder-character-01": 4,
        "founder-editorial-gallerywalk-01": 1,
        "founder-editorial-cape-01": 2,
        "founder-editorial-cliffwind-01": 2,
        "founder-editorial-museum-01": 2,
        "founder-editorial-ruin-01": 2,
        "founder-editorial-nightblack-01": 2,
        "founder-editorial-sunsetgown-01": 2,
        "founder-editorial-palace-01": 2,
        "world-diary-01": 3,
        "world-raw-01": 2,
        "world-staged-01": 2,
        "motion-pack-01": 5,
        "capability-flora-01": 5,
    },
}

def families(item):
    value = item.get("family_ids") or []
    if isinstance(value, str):
        value = [value]
    return list(value)

def even_sample(seq, cap):
    """Select up to cap items, spreading picks across the source order."""
    if cap <= 0 or not seq:
        return []
    if len(seq) <= cap:
        return list(seq)
    if cap == 1:
        return [seq[len(seq)//2]]
    # Stable, distinct positions including both ends.
    idxs=[]
    for i in range(cap):
        pos=round(i*(len(seq)-1)/(cap-1))
        if pos not in idxs:
            idxs.append(pos)
    return [seq[i] for i in idxs]

# Preserve master order for final manifest.
master_index={id(item):i for i,item in enumerate(items)}

summary={}
failed=[]

for key,caps in PACK_CAPS.items():
    chosen_by_obj={}
    selected_family_counts={}
    missing_required=[]

    for family,cap in caps.items():
        candidates=[item for item in items if family in families(item)]
        if not candidates:
            missing_required.append(family)
            selected=[]
        else:
            selected=even_sample(candidates,cap)
        selected_family_counts[family]=len(selected)
        for item in selected:
            chosen_by_obj[id(item)]=item

    chosen=sorted(chosen_by_obj.values(), key=lambda x: master_index[id(x)])

    type_counts={}
    for item in chosen:
        t=item.get("media_type","unknown")
        type_counts[t]=type_counts.get(t,0)+1

    payload={
        "pack_id":f"wave01-{key}-v2",
        "version":2,
        "source_pack":"master-v1-local-materialized",
        "selection_method":"explicit_family_caps_with_even_sampling",
        "target_range":None if key=="shared" else [TARGET_MIN,TARGET_MAX],
        "family_caps":caps,
        "selected_family_counts":selected_family_counts,
        "public_release_status":"TRANSPORT_BUILD_REQUIRED",
        "items":chosen,
    }

    target=out/f"wave01-{key}-v2.json"
    target.write_text(json.dumps(payload,ensure_ascii=False,indent=2),encoding="utf-8")

    ok=True
    reasons=[]
    if missing_required:
        ok=False
        reasons.append("missing families: "+", ".join(missing_required))
    if key!="shared" and not (TARGET_MIN <= len(chosen) <= TARGET_MAX):
        ok=False
        reasons.append(f"item count {len(chosen)} outside {TARGET_MIN}-{TARGET_MAX}")

    summary[key]={
        "pack_id":payload["pack_id"],
        "items":len(chosen),
        "media_type":type_counts,
        "families":sum(1 for n in selected_family_counts.values() if n>0),
        "path":target.as_posix(),
        "status":"PASS" if ok else "FAIL",
        "reasons":reasons,
    }
    if not ok:
        failed.append(key)

print(json.dumps(summary,ensure_ascii=False,indent=2))

if failed:
    raise SystemExit("PACK_BUILD_FAILED: "+", ".join(failed))
