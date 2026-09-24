# Media Selections

Selection files specify which founder originals should become web-ready experiment packs.

Example:

```json
{
  "pack_id": "founder-character-01",
  "description": "Primary identity + street sequence",
  "items": [
    {
      "path": "CharacterA/street/IMG_0012.JPG",
      "role": "identity_reference"
    },
    {
      "path": "CharacterA/street/IMG_0044.JPG",
      "role": "scene_reference"
    }
  ]
}
```

Selections refer to paths inside the SSD originals root.

Do not manually duplicate RAW files just to create a pack.
