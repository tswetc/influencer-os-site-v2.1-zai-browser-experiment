# Media Manifest Schema

Example item:

```json
{
  "id": "founder-set-01-001",
  "path": "04-MEDIA/characters/founder-set-01/001.jpg",
  "media_type": "image",
  "role": "identity_reference",
  "character_or_series": "founder-set-01",
  "world_hint": null,
  "provenance": "founder_media",
  "rights_status": "founder_confirmed_for_experiment",
  "public_use_allowed": false,
  "sha256": "...",
  "notes": "Primary identity reference"
}
```

Allowed role examples:
- identity_reference
- scene_reference
- product_reference
- motion_reference
- editorial_example
- background_texture
- design_reference_only
- output_example
- before
- after
