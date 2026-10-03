# PALE REVERIE — Quality & Acceptance Bar

## G1 — Hero fidelity

Eira must match the founder's accepted visual references across:
- front;
- 3/4;
- profile;
- gameplay medium distance;
- motion.

Critical identity mismatch = fail regardless of average VLM score.

## G2 — Character motion

No obvious mannequin/procedural-body feel in primary hero gameplay.

Evaluate run, stop, jump/land, dodge, idle, attack, glide and mane secondary motion.

## G3 — Core gameplay feel

Normal player input must support intended movement/combat.

## G4 — World visual authorship

Representative views of every major region must look intentionally composed rather than sparse procedural placeholders.

Triangle/grass counts are diagnostics, not art-quality pass/fail metrics.

## G5 — Progression honesty

Fresh save can reach required story milestones through normal input.

Forbidden as proof:
- unlockAll;
- direct state flags;
- direct boss damage;
- debug teleport used to bypass progression.

## G6 — Save integrity

Save/reload preserves critical story/game state.

## G7 — Visual comparison

Use:
- matched camera presets;
- side-by-side reference/render sheets;
- multi-angle comparisons;
- pairwise new-vs-old review.

Vision scoring can support the audit but is not the only judge.

## G8 — Browser stability/performance

Measure the actual environment.

Do not claim performance on unknown hardware from headless/sandbox timing.

## G9 — Export reproducibility

Final accepted stage:
- package/source manifest;
- SHA-256;
- extract to empty directory;
- install from lockfile;
- tests/build;
- browser smoke;
- standalone smoke if standalone is part of the deliverable.

## Feature freeze

When G1–G6 are red, do not spend a development wave on unrelated minigames, collectibles or achievement breadth unless explicitly founder-prioritized.

## Status vocabulary

Use only:
- PASS;
- FAIL;
- BLOCKED;
- NOT_CHECKED.

Do not write "accepted except for the main failed gate".
