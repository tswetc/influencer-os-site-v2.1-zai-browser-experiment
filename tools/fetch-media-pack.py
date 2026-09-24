#!/usr/bin/env python3
"""Download one commit-pinned media pack from the experiment GitHub repo.

Usage:
  python tools/fetch-media-pack.py <commit_sha> <pack_json_url_or_local_path> <output_dir>

The script verifies SHA-256 for each downloaded item.
"""

from __future__ import annotations

import hashlib
import json
import sys
import urllib.request
from pathlib import Path

OWNER = "tswetc"
REPO = "influencer-os-site-v2.1-zai-browser-experiment"

if len(sys.argv) != 4:
    raise SystemExit("usage: fetch-media-pack.py <commit_sha> <pack_json_url_or_local_path> <output_dir>")

commit, manifest_arg, output_arg = sys.argv[1:]
out = Path(output_arg)
out.mkdir(parents=True, exist_ok=True)

if manifest_arg.startswith("http://") or manifest_arg.startswith("https://"):
    with urllib.request.urlopen(manifest_arg) as response:
        manifest = json.loads(response.read().decode("utf-8"))
else:
    manifest = json.loads(Path(manifest_arg).read_text(encoding="utf-8"))

for item in manifest["items"]:
    rel = item["path"]
    url = f"https://raw.githubusercontent.com/{OWNER}/{REPO}/{commit}/{rel}"
    target = out / Path(rel).name
    print(f"download {url}")
    with urllib.request.urlopen(url) as response:
        data = response.read()
    digest = hashlib.sha256(data).hexdigest()
    expected = item["sha256"]
    if digest != expected:
        raise SystemExit(f"SHA256 mismatch for {rel}: {digest} != {expected}")
    target.write_bytes(data)
    print(f"ok {target} {len(data)} bytes {digest}")
