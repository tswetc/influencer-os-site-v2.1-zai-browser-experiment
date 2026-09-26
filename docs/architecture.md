# Code architecture

## Product boundary

This source tree is one deployable inside the **Influencer OS** product family:
the Web App. Claude Artifact, CLOUD/OFFLINE Prompt Studio, and Photo Studio
NANO-CORE are sibling Influencer OS product forms with separate manifests and
versioned homes.

STUDIO is a different contour inside AI Influencer Startup: it produces
specific models. Each model may have its own builds and products. Model-owned
artifacts are not placed in this Web App repository unless an explicit
integration contract is approved.

## Runtime surfaces

- `/` — marketing landing page.
- `/app` — licensed prompt studio.
- `/api/license` — server-side Gumroad license verification and signed cache.
- `/robots.txt` and `/sitemap.xml` — generated deployment metadata.

## Main source areas

- `app/` — Next.js routes and page composition.
- `components/` — interactive UI and studio surfaces.
- `lib/engines.ts` — prompt-engine canon and routing.
- `lib/selfcheck.ts` — 164 built-in invariants.
- `lib/storage.ts` and `lib/idb.ts` — local data, migrations, and backups.
- `lib/license.ts` — browser-side license state.
- `app/api/license/route.ts` — server-side Gumroad verification.
- `public/` — PWA shell and product showcase media.
- `tests/` — executable unit/invariant tests.

## Release chain

```text
project-memory product decision
  → issue / accepted task
  → code + tests
  → pull request
  → CI
  → merge commit
  → deployment tied to commit
  → smoke / purchase / license verification
  → release tag
```
