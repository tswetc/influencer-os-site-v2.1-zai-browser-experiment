# Product context and sources

## Ownership

- Logical project: **AI Influencer Startup**
- Product family: **Influencer OS**
- Deployable artifact in this repository: **Influencer OS Web App**
- Other confirmed Influencer OS product forms include Claude Artifact,
  CLOUD/OFFLINE Prompt Studio, and Photo Studio NANO-CORE. They are not
  archives; each receives its own artifact manifest, version, and code home.
- The Web App is one form of Influencer OS; STUDIO is not part of the Web App.
- Persona and AI Influencer Startup are independent projects.
- Noira belongs to Persona. Her physical placement in STUDIO does not make her
  an Influencer OS marketing asset or part of the Web App.
- Líirae is a separate active AI influencer and is not part of the Web App.
- Persona Builder is not Influencer OS.
- STUDIO models are their own production/product tracks. A model can have its
  own builds and products; those do not become Influencer OS artifacts merely
  because they live under the same startup.

## GitHub-first product context

- [Influencer OS product-intent canon](https://github.com/tswetc/project-memory/blob/main/ai-influencer-startup/influencer-os/README.md)
- [Influencer OS Web App canon](https://github.com/tswetc/project-memory/blob/main/ai-influencer-startup/influencer-os/web-app.md)
- [Overall current system state](https://github.com/tswetc/project-memory/blob/main/CURRENT.md)

For local work, the preferred sibling clone is
`/Users/mac/Projects/project-memory`. That path is a convenient route, not the
sole portable identifier; use the GitHub links above whenever the sibling clone
is unavailable.

Notion is optional historical/legacy documentation context. It is not required
for normal work, is not the active product-intent canon, and is not an
onboarding prerequisite.

This repository, `tswetc/influencer-os`, remains the source of truth for code,
tests, CI, engineering state, tags, GitHub Releases, implementation version,
and release evidence.

## Engine model in this source

- Five primary engine cards are exposed in the main UI.
- Six internal `EngineId` routes exist because `veo_broll` is a specialized
  internal Veo route.
- The old “seven engines” wording is stale unless a seventh current adapter is
  explicitly restored and implemented.
- Negative fields are emitted only for Kling and Veo routes.

## Current release claim

The release artifact identifies itself as product version `1.23`, while the
repository package version is `1.23.0`. The final `os23.6.zip` artifact,
production UI, license activation, and test purchase were verified on
2026-08-12. Deployment was performed through v0/Vercel rather than from this
repository, so artifact checksum provenance is retained alongside the GitHub
release commit.

```text
os23.6.zip → verified production 1.23 → GitHub release v1.23.0
```

The canonical source artifact checksum is recorded in `docs/current-state.md`.
Future deployments should be tied directly to a Git commit when practical.
