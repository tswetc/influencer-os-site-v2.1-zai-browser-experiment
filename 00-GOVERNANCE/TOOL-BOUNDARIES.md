# Tool / Repository Boundaries

## Shared lab repository

Role: immutable-ish input and coordination plane.

Allowed:
- founder/central coordinator updates governance, missions, source truth, reference sets, media manifests and experiment specs;
- agents download commit-pinned content.

Disallowed by default:
- browser agents pushing implementation code;
- several agents sharing one branch;
- production deployment;
- storing secrets.

## Chat.Z.AI browser sandbox

Role: isolated implementation environment for one experiment.

Each run owns:
- its source tree;
- local Git history;
- docs/logs;
- provider experiments;
- generated assets;
- final export.

Never assume another Chat.Z.AI run can see this sandbox.

## Canonical Influencer OS repos

Role: real product history.

No automatic writes from this lab.

Only after human audit may selected work be promoted into a dedicated real branch.

## Why this exists

Isolation prevents:
- cross-run corruption;
- accidental convergence;
- one hallucinated run rewriting shared truth;
- production agents treating experiments as canonical.
