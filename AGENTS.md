# Influencer OS — repository instructions

## Scope

This repository contains the deployable Influencer OS web application. It is a
product of **AI Influencer Startup**, not Persona. Do not mix in Noira/Persona
assistant logic, Líirae private materials, or STUDIO media libraries unless a
task explicitly defines a product integration and links its canonical source.

Claude Artifact, CLOUD/OFFLINE Prompt Studio, and Photo Studio NANO-CORE are
sibling product forms inside Influencer OS, not archives and not folders to
drop into this Web App root. STUDIO models are separate product/production
tracks and may have their own builds.

## Context route

Read only what the task needs:

1. `docs/current-state.md`
2. `docs/context.md`
3. the GitHub issue or task brief
4. the relevant product-intent canon in `tswetc/project-memory`, using the
   preferred sibling clone at `/Users/mac/Projects/project-memory` when it is
   available or the portable GitHub links in `docs/context.md`
5. the relevant source files

Notion is not required for normal work and is not the active product-intent
canon. Consult it only when a task explicitly needs historical or legacy
documentation context; do not crawl its workspace or archives.

## Truth and conflicts

- Influencer OS product intent lives in the project-memory
  [product-family canon](https://github.com/tswetc/project-memory/blob/main/ai-influencer-startup/influencer-os/README.md),
  with Web App meaning in its
  [form canon](https://github.com/tswetc/project-memory/blob/main/ai-influencer-startup/influencer-os/web-app.md)
  and overall system status in
  [CURRENT.md](https://github.com/tswetc/project-memory/blob/main/CURRENT.md).
- This repository is the source of truth for code, tests, CI, engineering
  state, tags, GitHub Releases, implementation version, and release evidence.
- Implemented behavior is proved by the current Git commit and tests.
- Live behavior is proved by a deployment tied to a commit.
- If those layers disagree, record `CONFLICT`; do not silently choose or merge
  versions.
- The release source artifact is `os23.6.zip` for product version `1.23` and
  package version `1.23.0`. Its SHA-256 is recorded in
  `docs/current-state.md`. The production, license, and purchase smoke tests
  were user-verified on 2026-08-12; retain the recorded artifact provenance
  when preparing the GitHub release.

## Required verification

Use pnpm 9.15.9 and run:

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm typecheck
pnpm build
```

For behavior changes, add or update a test. A passing built-in self-check is
necessary but not sufficient for release.

## Workflow

- Work from one issue or explicit task at a time.
- Keep product-intent canon in `tswetc/project-memory`; link it instead of
  copying it here. Keep implementation truth in this repository.
- Update `docs/current-state.md` when release state, blockers, or the verified
  source/deployment relationship changes.
- Keep the deployment provider/account replaceable. Do not hard-bind this
  repository or its project memory to a Vercel/v0 account without an explicit
  release task; record only the exact commit and resulting deployment URL.
- Record durable engineering decisions in `docs/adr/`.
- Keep pull requests small enough to verify. State tests, risks, deployment
  effect, and any remaining conflict.
- Never commit `.env`, keys, license secrets, tokens, or customer license data.
- Do not create a release tag until the exact commit has passed CI and its
  deployment has been verified.
