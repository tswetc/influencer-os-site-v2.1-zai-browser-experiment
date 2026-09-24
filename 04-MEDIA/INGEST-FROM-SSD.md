# Media Ingest from Founder SSD

Goal: founder can add many images/videos directly without routing them through ChatGPT attachments.

## Recommended local workspace

On the SSD:

`/Volumes/F/INFLUENCER-OS-ZAI-LAB/`

Suggested structure:

```
/Volumes/F/INFLUENCER-OS-ZAI-LAB/
├── originals/          # founder originals; DO NOT commit by default
├── selected/           # selected assets for the browser lab
├── web/                # optimized derivatives to commit
├── video-web/          # short optimized MP4s to commit
└── repo/               # clone of the GitHub experiment repo
```

## Clone once

```bash
mkdir -p "/Volumes/F/INFLUENCER-OS-ZAI-LAB"
cd "/Volumes/F/INFLUENCER-OS-ZAI-LAB"
git clone https://github.com/tswetc/influencer-os-site-v2.1-zai-browser-experiment.git repo
```

## Image policy

Do NOT dump all camera originals into Git.

Prefer curated web derivatives:
- JPEG/PNG;
- ~1600–3000 px long edge;
- normally < 2–4 MB each;
- preserve enough quality for fullscreen browser work;
- no file > 100 MB.

If ImageMagick is installed:

```bash
mkdir -p web
magick input.jpg -auto-orient -resize '2600x2600>' -strip -quality 88 web/output.jpg
```

macOS `sips` fallback:

```bash
mkdir -p web
sips -Z 2600 input.jpg --out web/output.jpg
```

Keep the original outside Git on the SSD.

## Video policy

For design/testing, commit only short web derivatives where practical.

Recommended:
- H.264 MP4;
- 1080p or lower;
- short clips/loops;
- target < 20–40 MB each;
- never exceed GitHub's 100 MB single-file hard limit.

Example with ffmpeg:

```bash
ffmpeg -i input.mov -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 20 -preset medium -movflags +faststart -an video-web/output.mp4
```

For very large originals, use external/object storage later instead of bloating Git.

## Copy into the experiment repo

Use stable folders:

```
04-MEDIA/
├── characters/<character-or-series-id>/
├── worlds/diary/
├── worlds/raw/
├── worlds/staged/
├── references/
├── examples/
└── video/
```

Example:

```bash
cd "/Volumes/F/INFLUENCER-OS-ZAI-LAB/repo"

mkdir -p 04-MEDIA/characters/founder-set-01
cp ../web/*.jpg 04-MEDIA/characters/founder-set-01/

git add 04-MEDIA/
git status
git commit -m "media: add founder set 01 web derivatives"
git push origin main
```

## Manifest rule

Every committed media item must be represented in `04-MEDIA/manifest.json`.

Minimum metadata:
- path;
- id;
- media_type;
- role;
- character_or_series;
- world_hint;
- provenance;
- rights_status;
- public_use_allowed;
- sha256;
- notes.

Never mix different character identities inside one case/narrative block unless explicitly intended.

## After upload

Tell the central coordinator:
- which commit was pushed;
- folder path;
- approximate item count;
- whether files are founder-owned / reference-only / generated.

The coordinator will pin that commit for the experiment wave.
