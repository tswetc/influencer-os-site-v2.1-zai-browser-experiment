# Current state

Last verified: 2026-08-12

## Release state

- Product version: `1.23`; package version: `1.23.0`.
- Final source artifact: founder-supplied `os23.6.zip`.
- Source archive SHA-256:
  `8fd6f6a9e5bf8fc4e83cf04f26973b241a5319652a355017ef0c36e897233a84`.
- The archive contains 170 actual files.
- `164/164` means 164 built-in self-check assertions, not the source-file
  count.
- Production URL: <https://v0-influenceros01.vercel.app>.
- The production UI, license activation, and test purchase were user-verified
  on 2026-08-12 against the final `os23.6.zip` release artifact.
- The deployment was produced through v0/Vercel rather than this GitHub
  repository, so Git commit metadata is not embedded in the deployment. The
  archive checksum above is the durable source provenance for this release.

## Verification

The final artifact passes with pnpm 9.15.9:

- frozen install;
- 5 test files / 37 tests;
- all 164 built-in invariants;
- TypeScript typecheck;
- Next.js production build.

## Git and deployment

- Private remote: <https://github.com/tswetc/influencer-os>.
- Baseline commit: `b02ed90` on `main`.
- The final GitHub release commit and CI run are recorded by the `v1.23.0`
  tag and GitHub Release after the release PR is merged.
- Deployment account/provider: intentionally not linked. Vercel/v0 accounts
  may change; the target is selected for each release.
- Production deployment: live and user-verified.
- License and purchase-path smoke test: passed, including a test purchase.

## Next safe sequence

1. Merge the final source synchronization after GitHub CI is green.
2. Create tag and GitHub Release `v1.23.0` from the merged release commit.
3. Attach the exact `os23.6.zip` artifact and publish its SHA-256.
4. Keep future releases tied directly to a Git commit when the deployment
   workflow permits it.

## Known product boundary

This repository is the Influencer OS Web App. Claude Artifact, CLOUD/OFFLINE
Prompt Studio, and Photo Studio NANO-CORE are sibling products inside
Influencer OS, but must not be mixed into this deployable root without an
explicit packaging decision and a versioned artifact manifest.

STUDIO is not part of the Web App. Its models are a separate contour and remain
model-owned unless an explicit integration with Influencer OS is approved.
Persona Builder is not Influencer OS. Noira and Líirae do not belong to the Web
App.
