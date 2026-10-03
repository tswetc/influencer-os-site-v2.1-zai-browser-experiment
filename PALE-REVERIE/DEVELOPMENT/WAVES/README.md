# PALE REVERIE — Browser Z AI Wave System

This folder contains the engineering mechanism used to develop the game with Browser Z AI / GLM agents.

It is intentionally nested under DEVELOPMENT because waves are a method, not the product.

## Why waves

The previous approach concentrated too much product context, implementation, QA and visual work in one long Browser chat.

The wave model instead uses:
- one frozen source SHA;
- frozen game/shared contracts;
- bounded asset packs;
- multiple independent worker missions;
- non-overlapping WRITE_SET ownership;
- local Git history per worker;
- auditable artifact handoff;
- central integration after workers finish.

## Read order

1. `../CURRENT-STATE.md`
2. `../../GAME/GAME-BIBLE.md`
3. active `PR-Wxxx-*.md`
4. `WAVE-PROTOCOL.md`
5. exact run packet.

Do not launch a worker from an unpinned branch tip or giant chat-only mission.
