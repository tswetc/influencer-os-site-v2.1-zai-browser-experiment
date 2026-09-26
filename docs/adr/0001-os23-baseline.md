# ADR 0001 — Preserve and verify the os 23 baseline

- Date: 2026-07-28
- Status: accepted

## Context

The founder supplied `os 23.zip` as the newest code, while the currently sold
deployment is older. Earlier documentation proposed placing the export inside
`src/`, but the archive is itself a complete Next.js project root.

## Decision

- Preserve the ZIP checksum and source marker in the repository documentation.
- Keep the exported project at repository root.
- Treat it as a version 1.23 candidate, not as a deployed release.
- Fix only proven baseline/infrastructure discrepancies before the first
  release candidate.
- Create the final release tag only after CI and deployment verification.

## Consequences

The Git history begins with reproducible evidence rather than an empty scaffold
or a misleading release tag. Product behavior changes remain separate from the
baseline-import work.
