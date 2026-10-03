# PALE REVERIE — Gameplay

## Core loop

Explore
→ encounter a memory/world problem
→ traverse or fight through its physical consequences
→ recover/alter a memory state
→ world/NPC/path changes
→ gain access to deeper region truth
→ progress toward Lunar Pearls / Moon truth.

## Movement

Required baseline:
- walk;
- run;
- sprint;
- jump;
- dodge;
- camera-relative movement;
- slope/ground handling.

Authored traversal:
- Mirror Step;
- Moon Glide;
- climbing;
- swimming;
- wind currents;
- sky-whale traversal;
- region-specific gravity/mechanism traversal.

Movement should preserve momentum/weight without feeling sluggish.

## Combat

Goals:
- immediate input response;
- readable enemy telegraphs;
- short decisive hit feedback;
- clear state/reaction VFX;
- attacks that preserve camera comprehension.

Elements:
- Wind;
- Tide;
- Dream;
- Ebb;
- Silver.

Every reaction must answer:
1. what gameplay state changes?
2. how does the player recognize it?
3. why does it exist tactically?

## Characters

If multiple playable heroes remain in scope, they should differ mechanically as well as visually.

Avoid three characters that share one controller/attack kit with recolored VFX.

## Enemies

Enemy design should be regionally grounded.

Behavior vocabulary may include patrol/idle ecology, investigate, chase, attack, stagger, reposition, special state and death/dissolution.

Bosses need phase/state readability.

## World interaction

Reactive:
- grass/wind;
- water;
- lamps;
- memory objects;
- select fauna;
- region mechanisms.

Not everything needs physics.

## Quests/progression

Progression must be reachable through normal player input.

Debug APIs, direct quest flags, unlockAll, teleport and direct boss damage are development tools only and cannot prove campaign reachability.

## Save

At minimum preserve:
- player progression;
- region/story state;
- important memory choices;
- unlocked traversal;
- settings.

Save migrations should fail honestly rather than silently corrupt state.
