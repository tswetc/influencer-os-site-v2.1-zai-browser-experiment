# PALE REVERIE — Asset Transport Contract

Goal: create character refs, GLB models, Seedance cinematics, motion refs, textures and audio separately, then deliver exact reviewed versions to Browser Z AI workers through GitHub without dumping raw libraries into the public repository.

This follows the existing lab principle:
original → registry → selected derivative → frozen pack → transport.

## 1. Asset tiers

### Tier 0 — originals
Founder/local originals and high-resolution generation masters.

Keep outside public Git by default.
Do not rename/delete/overwrite automatically.

### Tier 1 — registry
Metadata for stable asset identity:
- asset_id;
- content SHA-256;
- type;
- role;
- provenance;
- rights/transport state;
- version;
- notes.

### Tier 2 — curated derivative
Optimized working derivative made from an approved original.

Examples:
- reference JPG/PNG;
- compressed GLB;
- 1080p H.264 MP4;
- web audio derivative.

### Tier 3 — frozen pack
A bounded set for one purpose/wave.

A run must never scan the entire asset library when its pack is already frozen.

### Tier 4 — Browser transport
Only exact approved derivatives needed by the run, with neutral filenames and hashes.

## 2. Public transport rule

The current Browser experiment repository is PUBLIC.

Therefore no raw/private asset is committed merely because a worker needs it.

Before public transport, explicitly mark:
`public_transport_allowed: true`.

Unknown/restricted assets stay local/private and require a different transport route.

## 3. Recommended pack families

- `identity-core-vN` — Eira/Velm/Blu/Carr identity references;
- `world-style-vN` — environment/color/material references;
- `characters-models-vN` — GLB/VRM game character candidates;
- `motion-reference-vN` — traversal/combat/acting clips;
- `cinematics-vN` — Seedance in-game movies/trailer derivatives;
- `audio-vN` — music/SFX derivatives if later needed.

Do not put unrelated assets into one pack.

## 4. Stable transport paths

Planned public transport root:
`10-PALE-REVERIE/02-ASSETS/transport/<pack-id>/`

Each pack contains:
- `PACK.json`;
- `files/` with neutral filenames;
- optional contact sheet/poster sheet for visual verification.

Do not expose private local source paths.

## 5. Manifest item

Minimum fields:

```json
{
  "asset_id": "pr-eira-ref-001",
  "version": 1,
  "file": "files/pr-eira-ref-001.jpg",
  "media_type": "image",
  "role": "identity_reference",
  "subject": "eira",
  "sha256": "...",
  "bytes": 0,
  "provenance": "founder_generated",
  "rights_status": "founder_confirmed_for_experiment",
  "public_transport_allowed": true,
  "review_status": "approved_for_transport",
  "notes": ""
}
```

For generated 3D/video also record generator/tool/version when known, without secrets.

## 6. Naming

Transport filenames are neutral and stable:
- `pr-eira-ref-001.jpg`
- `pr-eira-model-001.glb`
- `pr-intro-awakening-001.mp4`

Do not use random chat-upload hashes as semantic IDs.

A new file version gets a new version/derivative hash. Never silently replace bytes under an already-frozen pack.

## 7. Images

Recommended transport derivative:
- JPEG/PNG/WebP;
- long edge roughly 1600–3000 px;
- normally a few MB or less;
- metadata stripped where privacy matters.

Keep higher-resolution original outside public Git.

## 8. 3D models

Preferred:
- GLB;
- textures embedded or stable relative files;
- A/T pose when intended for humanoid rigging;
- skeleton included when available;
- separate hair/accessory meshes when useful;
- compressed only after confirming Browser/Three.js compatibility.

Do not assume an unrigged image-to-3D output can be auto-rigged reliably.

Every candidate model should get:
- front/3/4/profile/back preview;
- triangle/material/skeleton summary;
- load smoke test before wave freeze.

## 9. Video

Preferred transport derivative:
- H.264 MP4 or verified WebM;
- 1080p or lower unless a concrete need exists;
- fast-start;
- short clips;
- target tens of MB, not giant masters.

Normal Git must never receive a single file above GitHub's hard file limit.

Avoid Git LFS as the default Browser-run transport unless the actual worker path has been tested to fetch real LFS bytes rather than pointer files.

If media becomes too large, use a dedicated asset repository or GitHub release/object transport only after a transport smoke test. The wave packet still pins exact hashes.

## 10. Seedance slots

Current planned in-game names:
- intro_awakening.mp4
- title_loop.mp4
- boss_warden_intro.mp4
- ending_tide.mp4

Marketing/trailer pack may include separately versioned:
- trailer_main.mp4
- eira_mane.mp4
- fpv_glide.mp4
- combat.mp4
- glass_garden.mp4
- name.mp4

A missing cinematic must have an engine fallback if the active game contract requires one.

## 11. Asset pack freeze

Before a wave:
1. select exact asset IDs;
2. verify every file hash;
3. inspect contact sheets/model previews/video posters;
4. confirm roles;
5. freeze PACK.json;
6. record pack SHA/hash in every affected run packet;
7. stop mutating that pack.

Changes require a new pack version, not an in-place silent edit.

## 12. Worker behavior

A Browser worker:
- receives only the pack(s) required by its run;
- verifies hashes before use;
- does not search the wider asset library for replacements;
- records which input asset versions were actually used;
- never publishes or modifies source assets.

Generated candidate assets created by a worker are output artifacts until centrally reviewed. They do not silently become new canonical transport assets.
