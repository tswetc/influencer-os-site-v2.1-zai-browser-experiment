# Influencer OS

This repository contains the deployable Web App inside the **Influencer OS**
product family of **AI Influencer Startup**. It turns a character passport,
references, and scene intent into engine-specific prompts for AI image and
video workflows.

Claude Artifact, CLOUD/OFFLINE Prompt Studio, and Photo Studio NANO-CORE are
other Influencer OS products with separate versioned artifacts. STUDIO models
are a different contour and may have their own builds and products.

## Release status

- Product version: `1.23`
- Package version: `1.23.0`
- Final source artifact: `os23.6.zip`
- Source artifact SHA-256:
  `8fd6f6a9e5bf8fc4e83cf04f26973b241a5319652a355017ef0c36e897233a84`
- Production URL: <https://v0-influenceros01.vercel.app>
- Production, license activation, and test purchase were user-verified on
  2026-08-12.

## Local verification

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm build
```

Copy `.env.example` to a local ignored env file or configure the variables in
the deployment platform. `GUMROAD_PRODUCT_ID` and `LICENSE_SIGNING_SECRET` are
required for license verification.

## Project context

Start with [docs/context.md](docs/context.md). Repository conventions are in
[AGENTS.md](AGENTS.md).
