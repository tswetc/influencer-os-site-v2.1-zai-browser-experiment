# PALE REVERIE

**PALE REVERIE: REQUIEM OF THE EBB**  
Original third-person 3D anime action-RPG / surreal dark fantasy.

This directory is the durable home of the game project.

The project is organized from product truth outward:

1. **GAME/** — what the game is: canon, world, characters, visual language, gameplay, narrative and quality bar.
2. **ASSETS/** — how references, 3D models, cinematics, motion and audio are versioned and transported.
3. **DEVELOPMENT/** — current implementation state, roadmap and engineering work.
4. **DEVELOPMENT/WAVES/** — the Browser Z AI / GLM multi-agent wave mechanism. This is a development method, not the identity of the game.

The game itself is the authority. Agent infrastructure exists only to build it.

## Start here

Read:
1. `GAME/GAME-BIBLE.md`
2. `DEVELOPMENT/CURRENT-STATE.md`
3. only then the active development/wave document.

## Core rule

Do not let implementation convenience silently change the game.

When code, agent output or a generated asset conflicts with the game canon, either fix the implementation/asset or record an explicit founder-approved canon change.

## Repository boundary

This public Browser Z AI repository is a coordination/transport surface.

Do not commit secrets, credentials, private raw references, unapproved copyrighted/reference material, or large raw libraries merely to make them accessible to an agent.

Game source will be frozen on dedicated baseline/construction branches. Browser workers use GitHub as immutable read-only input and return audited artifacts.
