# Wave v4 Local SSD Runbook

Date: 2026-09-25
Purpose: prepare sanitized media transport without committing local master/private paths.

Run from:
`/Volumes/F/INFLUENCER-OS-ZAI-LAB/repo`

## Preflight

```bash
cd "/Volumes/F/INFLUENCER-OS-ZAI-LAB/repo"
git pull --ff-only origin main
python3 -c "import PIL; print(PIL.__version__)"
ffmpeg -version | head -n 1
```

Required local inputs:
- `04-MEDIA/library/`
- `04-MEDIA/packs/master-v1.json`

These are local/private and MUST remain uncommitted.

## Step 1 — rebuild exact curated manifests

```bash
python3 tools/make_run_media_packs.py \
  "04-MEDIA/packs/master-v1.json" \
  "04-MEDIA/packs"
```

Expected PASS counts:
- A = 39
- B = 42
- C = 33
- D = 36

Expected local outputs:
- wave01-A-v3-curated.json
- wave01-B-v3-curated.json
- wave01-C-v3-curated.json
- wave01-D-v3-curated.json

Stop if count differs or any selected source is missing/held/duplicate.

## Step 2 — build sanitized public Wave v4

```bash
python3 tools/build_public_wave_bundle.py .
```

Expected final line:
`PUBLIC_WAVE_BUNDLE_READY_FOR_REVIEW`

Expected public candidate directory:
`04-MEDIA/transport/wave01-v4/`

The builder:
- uses neutral asset IDs;
- strips image metadata by re-encoding;
- re-encodes video to H.264;
- strips video metadata/audio;
- removes source paths from public manifests;
- fails over the GitHub safety size gate.

## Step 3 — machine verification

```bash
python3 tools/verify_public_wave.py .
```

Expected:
`PUBLIC_WAVE_V4_VERIFIED`

Do not continue on any error.

## Step 4 — build actual-transport visual atlas

```bash
rm -rf "04-MEDIA/_wave-v4-review"

python3 tools/build_wave_review_atlas.py \
  "." \
  "04-MEDIA/_wave-v4-review"
```

Expected:
`WAVE_REVIEW_ATLAS_READY ...`

## Step 5 — human visual QA

Open every PACK-A/B/C/D contact sheet in:
`04-MEDIA/_wave-v4-review/`

For every tile/poster check:
- correct subject/identity;
- no child/privacy reject;
- no visible identity card/private identifier;
- no unintended bystander/crowd rejected by policy;
- orientation/crop sane;
- image/video poster readable;
- no corrupted file;
- role makes sense for its pack.

Known forbidden records must not exist:
- G0027/s01
- G0068/s06
- G0111/s05

If a transported tile fails:
DO NOT manually patch only the public asset.
Change the explicit source selection/curation record, rebuild the complete bundle, rerun verification and rebuild/review the atlas.

## Step 6 — governance checks

```bash
python3 tools/validate_run_contracts.py .
python3 tools/audit_public_lab.py .
```

Both must PASS.

Important:
passing these checks means TRANSPORT READY only.
It does NOT authorize E004–E011/Q001 launch before post-Astra Architecture V4.

## Step 7 — inspect Git boundary

```bash
git status --short
```

Expected private/local paths should be ignored:
- 04-MEDIA/library/
- 04-MEDIA/packs/master-v1.json
- local v1 manifests
- local v3-curated manifests
- 04-MEDIA/_wave-v4-review/

The intended public addition is only sanitized:
- 04-MEDIA/transport/wave01-v4/

Before `git add`, inspect:
```bash
find 04-MEDIA/transport/wave01-v4 -type f -maxdepth 3 | sort
grep -R -n -E '/Users/|/Volumes/|ssd_relative|source_path' 04-MEDIA/transport/wave01-v4 || true
```

Do NOT use `git add .`.

Use explicit add only after visual QA:
```bash
git add 04-MEDIA/transport/wave01-v4
```

Then re-run:
```bash
python3 tools/verify_public_wave.py .
python3 tools/audit_public_lab.py .
git diff --cached --stat
git diff --cached -- 04-MEDIA/transport/wave01-v4/BUNDLE-MANIFEST.json
```

Commit only after those checks pass.
