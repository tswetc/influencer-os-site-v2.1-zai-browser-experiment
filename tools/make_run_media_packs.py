#!/usr/bin/env python3
"""Build explicitly curated Wave 01 media-pack manifests from master-v1.json.

Design principles:
- 30–45 genuinely selected items per A/B/C/D run;
- every chosen item is named by exact audited atlas group+slot;
- no second-stage "take everything available" behavior;
- no even/random sampling at build time;
- fail closed on missing, held, duplicate or unexpected items.

M001 already performed visual curation of the source candidates. This file is
the second-stage run-pack decision: an explicit, reviewable subset tailored to
each design recipe.

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

TARGET_MIN = 30
TARGET_MAX = 45

# Never enter PUBLIC browser-run transport.
PUBLIC_TRANSPORT_EXCLUDE = {
    (27, 1),   # visible real-world identity card in image
    (68, 6),   # video poster visibly includes multiple bystanders
    (111, 5),  # foreground metro crowd / other identifiable people
}

# Exact design-specific decisions. Keep these lists intentionally explicit.
# Format: (atlas_group, atlas_slot)
PACK_SELECTIONS = {
    "A": [
        # identity
        (6,1),(30,2),(30,4),(130,3),
        # controlled graphic/editorial
        (35,1),(35,4),(39,1),(39,4),(40,1),(43,2),
        (72,1),(72,4),(73,1),(73,5),(79,3),(104,3),(137,5),(94,4),(52,2),
        # worlds / environmental rhythm
        (9,5),(24,3),(62,1),(116,1),(116,4),(117,1),(117,5),
        # still-life / material
        (186,1),(187,4),(188,5),(147,1),
        # capability proof
        (189,2),(192,4),(195,3),(198,5),(131,2),(134,5),
        # motion
        (25,6),(131,6),(159,6),
    ],
    "B": [
        # identity
        (6,1),(30,2),(30,4),(130,3),
        # quiet photographic cinema
        (100,1),(100,4),(93,2),(93,5),(66,1),(67,1),(67,2),
        (17,1),(17,3),(18,2),(18,3),(19,1),(19,2),(52,2),(50,1),
        (11,2),(11,4),(14,2),(14,4),(81,2),(81,5),(145,1),(145,5),
        # worlds
        (10,1),(21,4),(24,1),(116,1),(116,4),(117,1),(117,5),
        # motion / sequencing
        (65,6),(100,6),(112,6),(143,6),(159,6),
        # capability anchors
        (189,2),(193,3),(198,5),
    ],
    "C": [
        # identity
        (6,1),(30,2),(30,4),(130,3),
        # authoring inputs / contrasting media
        (35,1),(35,4),(39,1),(39,4),(40,1),(43,2),
        # worlds
        (9,5),(10,1),(24,3),(116,1),(116,4),(117,1),(117,5),
        # still-life / material nodes
        (186,1),(187,4),(188,5),(147,1),
        # capability/workflow proof
        (189,2),(192,1),(193,3),(197,1),(198,5),(131,2),(134,5),
        # motion nodes
        (25,6),(100,6),(112,6),(131,6),(143,6),
    ],
    "D": [
        # identity
        (6,1),(30,2),(30,4),(130,3),
        # continuous spatial/editorial system
        (52,2),(79,2),(79,3),(100,1),(100,4),(137,3),(137,5),
        (104,1),(104,3),(67,1),(67,2),(94,2),(94,4),(81,2),(81,5),
        # spatial worlds
        (21,4),(24,2),(62,3),(116,1),(116,4),(117,1),(117,5),
        # motion / state continuity
        (65,6),(100,6),(112,6),(131,6),(143,6),
        # capability proof
        (189,2),(192,1),(193,3),(197,1),(198,5),
    ],
}

index = {}
duplicates = []
for item in items:
    key = (item.get("group_number"), item.get("slot"))
    if key in index:
        duplicates.append(key)
    index[key] = item

if duplicates:
    raise SystemExit(f"MASTER_MANIFEST_DUPLICATE_GROUP_SLOT: {duplicates}")

summary = {}
failures = []

for design, wanted in PACK_SELECTIONS.items():
    if len(wanted) != len(set(wanted)):
        failures.append(f"{design}: duplicate group/slot in explicit selection")
        continue

    forbidden = sorted(set(wanted) & PUBLIC_TRANSPORT_EXCLUDE)
    if forbidden:
        failures.append(f"{design}: forbidden public items selected: {forbidden}")
        continue

    missing = [key for key in wanted if key not in index]
    if missing:
        failures.append(f"{design}: missing selected items: {missing}")
        continue

    chosen = [index[key] for key in wanted]

    # Master-v1 is expected to contain local-materialization-approved rows only.
    held = [key for key,item in zip(wanted,chosen)
            if item.get("materialize_local_allowed") is False]
    if held:
        failures.append(f"{design}: held items present in master manifest: {held}")
        continue

    if not TARGET_MIN <= len(chosen) <= TARGET_MAX:
        failures.append(
            f"{design}: explicit item count {len(chosen)} outside {TARGET_MIN}-{TARGET_MAX}"
        )
        continue

    source_paths = [x.get("source_path") for x in chosen]
    if len(source_paths) != len(set(source_paths)):
        failures.append(f"{design}: duplicate source_path after selection")
        continue

    media_types = {}
    families = set()
    for item in chosen:
        media_types[item.get("media_type","unknown")] = (
            media_types.get(item.get("media_type","unknown"),0) + 1
        )
        value=item.get("family_ids") or []
        if isinstance(value,str):
            value=[value]
        families.update(value)

    payload = {
        "pack_id": f"wave01-{design}-v3-curated",
        "version": 3,
        "source_pack": "master-v1-local-materialized",
        "selection_method": "explicit_human_auditable_group_slot_allowlist",
        "target_range": [TARGET_MIN,TARGET_MAX],
        "public_transport_exclusions": [list(x) for x in sorted(PUBLIC_TRANSPORT_EXCLUDE)],
        "selected_group_slots": [list(x) for x in wanted],
        "public_release_status": "TRANSPORT_BUILD_REQUIRED",
        "items": chosen,
    }

    target = out / f"wave01-{design}-v3-curated.json"
    target.write_text(
        json.dumps(payload,ensure_ascii=False,indent=2),
        encoding="utf-8"
    )

    summary[design] = {
        "pack_id": payload["pack_id"],
        "items": len(chosen),
        "media_type": media_types,
        "families": len(families),
        "path": target.as_posix(),
        "status": "PASS",
    }

print(json.dumps(summary,ensure_ascii=False,indent=2))

if failures:
    print(json.dumps({"failures":failures},ensure_ascii=False,indent=2))
    raise SystemExit("PACK_BUILD_FAILED")
