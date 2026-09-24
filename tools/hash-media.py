#!/usr/bin/env python3
"""Print SHA-256/size records for committed media under 04-MEDIA.

This intentionally does not guess rights, identity or semantic roles.
Use the output to update 04-MEDIA/manifest.json.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MEDIA = ROOT / "04-MEDIA"
EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".mov", ".webm"}

rows = []
for path in sorted(MEDIA.rglob("*")):
    if not path.is_file() or path.suffix.lower() not in EXTS:
        continue
    rel = path.relative_to(ROOT).as_posix()
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    rows.append({
        "path": rel,
        "bytes": path.stat().st_size,
        "sha256": digest,
    })

print(json.dumps(rows, ensure_ascii=False, indent=2))
