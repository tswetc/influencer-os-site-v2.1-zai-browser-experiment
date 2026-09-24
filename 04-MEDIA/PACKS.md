# Media Packs

Do not make every run download every photograph.

Media is assigned in named packs.

## Pack concept

Examples:
- `founder-character-01`
- `founder-editorial-01`
- `world-diary-01`
- `world-raw-01`
- `world-staged-01`
- `motion-reference-01`

Each pack has:
- a JSON manifest under `04-MEDIA/packs/`;
- stable repository paths;
- SHA-256 per file;
- role/provenance metadata.

A RUN.md names the exact packs it needs.

## Why

This keeps:
- downloads bounded;
- identities separated;
- experiments reproducible;
- context relevant;
- GitHub simple even with hundreds of available media items.

## Recommended pack size

Usually 10–40 images or a small number of short video clips.

A run may receive multiple packs, but only when each pack has a clear product role.
