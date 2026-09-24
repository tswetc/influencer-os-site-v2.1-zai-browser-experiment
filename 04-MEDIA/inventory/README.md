# Media Inventory

Metadata-only inventories generated from founder SSD originals live here.

The originals themselves stay on SSD.

The inventory lets the central coordinator see:
- folder structure;
- file counts;
- total sizes;
- image dimensions;
- video duration/dimensions where ffprobe is available.

First command:

```bash
python3 tools/media_inventory.py \
  "/Volumes/F/INFLUENCER-OS-ZAI-LAB/originals" \
  "04-MEDIA/inventory/founder-originals.json"
```

Commit only the resulting JSON at this stage.
Do not copy all originals into Git.
