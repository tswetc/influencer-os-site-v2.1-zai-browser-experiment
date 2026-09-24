# INFLUENCER OS — FULL BROWSER PRODUCT BUILD
## One-shot autonomous mission for Z.ai Agent / GLM-5.2
### SOURCE-GROUNDED EDITION · 2026-09-24

**Read this entire message before changing code.**

This instruction supersedes earlier browser-build instructions where they conflict with this one.

The goal is not to make a disposable demo and not to reduce quality because the work happens in a browser sandbox.

**Treat this as a full product-development mission.**

The browser environment is simply the current development environment. Build the most complete, coherent, high-quality Influencer OS product possible inside it, document any environment limits honestly, and leave a portable source project that can continue in Codex/ZCode later.

Public product name:

`Influencer OS`

Do NOT make “Browser Prototype” the product identity or use “prototype” as an excuse to omit important work. Internal docs may call this a browser build.

---

# 0. WHY THIS MESSAGE EXISTS

A previous long GLM-5.2 run produced a substantial working product, but the original binary attachment `os23.6.zip` was visible in the chat UI while never materializing inside the agent filesystem.

Therefore that run reconstructed Influencer OS from a written specification instead of actually reading the source.

That reconstruction contains useful UI, infrastructure and product extensions, but **its product semantics are not authoritative**.

This message solves that problem by embedding an authoritative source pack extracted directly from the real `os23.6.zip` into the message itself.

You do NOT need the ZIP attachment to become available in the filesystem in order to use the source appendix below.

The source appendix is in-band text and is authoritative.

ZIP SHA-256 from the founder-supplied archive:

`8fd6f6a9e5bf8fc4e83cf04f26973b241a5319652a355017ef0c36e897233a84`

Archive inventory: **189 entries**.

Core facts verified directly from source:

- exact `TECHNIQUES.length`: **24**
- exact `SCENE_PACKS.length`: **18**
- exact explicit scene count in the 18 packs: **92**
- exact `check(...)` calls in `lib/selfcheck.ts`: **164**
- Worlds: **A = Diary, B = Raw, C = Staged**
- `EngineId`: `nano_pro`, `kling_3`, `seedance_2`, `veo_scene`, `veo_broll`, `omni_flash`

If your current browser project has different Worlds, techniques, packs, self-check semantics, Passport schema, engine rules, or canon behavior, the embedded source wins.

---

# 1. OPERATING MODE — ONE LONG AUTONOMOUS RUN

Work for completeness and quality, not speed.

Do not stop after:
- research;
- a homepage;
- a design system;
- static UI;
- one studio;
- a mock generation flow;
- a successful lint;
- or one review cycle.

Do not ask the founder ordinary clarification questions during the run.

Make reasonable decisions and record them.

Do not rely on a future cron round to finish important work. Complete the mission inside the current long-running task as far as the environment permits.

Use Git locally if available.

Keep durable state in files, not only in chat.

Mandatory durable files:

- `docs/TODO.md`
- `docs/SOURCE-RECONCILIATION-OS23.6.md`
- `docs/PRODUCT-FORENSICS.md`
- `docs/PRODUCT-ARCHITECTURE.md`
- `docs/INFORMATION-ARCHITECTURE.md`
- `docs/DESIGN-SYSTEM.md`
- `docs/MOTION-SYSTEM.md`
- `docs/MEDIA-SYSTEM.md`
- `docs/MODEL-RESEARCH.md`
- `docs/MODEL-REGISTRY-SPEC.md`
- `docs/GENERATION-ARCHITECTURE.md`
- `docs/MCP-SPEC.md`
- `docs/MCP-CONNECTION-GUIDE.md`
- `docs/SECURITY-AND-DATA.md`
- `docs/DECISION-LOG.md`
- `docs/BUILD-LOG.md`
- `docs/FAILURE-LOG.md`
- `docs/TEST-RESULTS.md`
- `docs/OPEN-ISSUES.md`
- `docs/SELF-CRITIQUE.md`
- `docs/FINAL-HANDOFF.md`
- `docs/EXPORT-MANIFEST.md`

---

# 2. PRIORITY SYSTEM — PREVENT AUTONOMOUS DRIFT

Maintain one priority board.

## P0 — must be solved or honestly BLOCKED before completion

1. Reconcile current browser product with the real OS23.6 source below.
2. Preserve the actual Passport / canon / Worlds / techniques / packs / formats / engine prompt logic.
3. Replace invented source semantics that contradict OS23.6.
4. Build a coherent shared Influencer OS core used by web UI and MCP.
5. Build functioning Character, Image, Video, Prompt, Scene and multi-output workflows.
6. Make generation architecture truthful: LIVE vs MOCK vs UNVERIFIED.
7. Attempt at least one real generation-provider integration if the environment and credentials make it possible.
8. Implement/test MCP correctly enough for local client use; use official current MCP SDK/spec patterns where possible.
9. Build/test the project successfully.
10. Produce a fresh final export from the CURRENT final tree.
11. Keep secrets out of source/export.
12. Final export must match the final working tree.

## P1 — required product quality

- full EN/RU;
- responsive desktop/tablet/mobile;
- Projects / Assets / history;
- model registry;
- Examples / Community;
- actual route/deep-link strategy appropriate to the environment;
- auth/persistence prototype boundary;
- accessibility;
- current model research;
- polished high-density media/UI;
- truthful provenance;
- coherent public site + workbench;
- current docs and handoff.

## P2 — useful enhancement

Examples:
- QR export;
- extra keyboard shortcuts;
- convenience filters;
- cosmetic badges;
- minor export formats;
- extra palette actions.

**Hard rule:**
Do not spend an autonomous improvement round on P2 while an actionable P0 or P1 remains open.

A P0/P1 may be skipped only when it is explicitly marked `BLOCKED_SUBSYSTEM` or `DEFERRED_WITH_REASON`, with attempts and evidence recorded.

Do not repeatedly prefer easy local features over difficult core integration.

---

# 3. ATTACHMENT ACCESS RULE

Chat UI attachment visibility is NOT proof that a file exists in the sandbox.

For any future attachment, use:

1. locate physical file;
2. record path;
3. record byte size;
4. compute SHA-256 if possible;
5. open/list archive;
6. read at least three expected internal files;
7. only then mark `ATTACHMENT_VERIFIED`.

If the attachment never materializes:
- make at most three materially different access attempts;
- record `BLOCKED_ATTACHMENT_MOUNT`;
- do not keep waiting forever;
- continue using the in-band authoritative source in this message.

Never claim “I inspected the attachment” based only on filename metadata.

---

# 4. FIRST P0 — SOURCE RECONCILIATION BEFORE MORE CONVENIENCE FEATURES

If an existing browser product is already present, do NOT throw away useful UI automatically.

First audit it.

Create `docs/SOURCE-RECONCILIATION-OS23.6.md`.

Compare CURRENT BROWSER IMPLEMENTATION vs AUTHORITATIVE SOURCE for:

- `CharacterPassport`
- `identity.full / mid / micro`
- `device`
- `anomalyLock`
- `faceAdherence.static / motion`
- reference roles
- `ModelCanon`
- `SceneSpec`
- Worlds A/B/C
- all techniques
- all 18 packs
- all 92 explicit scenes
- engine IDs
- engine-specific prompt builders
- capture system
- film gate
- banned terms
- multishot
- cutaways
- canon mixing
- seasons
- Series
- Shoot
- Feed
- captions
- prompt strength
- all 164 source self-check assertions
- LLM/provider behavior
- history/storage/presets
- tour/changelog
- product truth boundaries.

For each mismatch classify:

- `REPLACE_WITH_REAL_OS_LOGIC`
- `MERGE`
- `KEEP_UI_ONLY`
- `PROTOTYPE_EXTENSION` / `BROWSER_EXTENSION`
- `REMOVE_INCORRECT_RECONSTRUCTION`
- `NEEDS_RESEARCH`

Important:

**Do not optimize for numeric count matching.**
The 164 checks are meaningful source checks, not a target number to exceed with invented assertions.

Do not turn:
`164 source checks`
into
`169 different checks`
and call that source parity.

Source fidelity means semantic fidelity.

---

# 5. SOURCE PARITY ACCEPTANCE TESTS

Add automated tests that fail if the migrated core drifts from these source facts.

At minimum assert:

- Worlds are exactly:
  - `A = Diary`
  - `B = Raw`
  - `C = Staged`
- technique count = `24`
- scene pack count = `18`
- explicit pack-scene count = `92`
- source self-check count = `164`
- actual technique IDs include exactly the source set below;
- pack IDs / world assignment / technique IDs match the source map below;
- `EngineId` union preserves all six source IDs;
- `CharacterPassport` preserves source fields;
- `SceneSpec` preserves source fields;
- film vocabulary remains world-C privileged according to source;
- banned terms remain enforced;
- engine prompt-builder tests preserve source semantics.

Exact technique IDs:

`t_tableau`, `t_noon`, `t_water`, `t_polaroid90`, `t_polaroid_fit`, `t_flash`, `t_concrete`, `t_kitchen_night`, `t_body_landscape`, `t_wall`, `t_lie_home`, `t_fitting`, `t_mirror`, `t_cup`, `t_shower`, `t_4am`, `t_screen`, `t_ultrawide`, `t_blur`, `t_grimace`, `t_transit`, `t_squint`, `t_fragility`, `t_deadpan`

Exact pack map:

- `pack_diary` — world `A` — techniques `t_lie_home, t_mirror, t_fitting, t_4am` — 8 scenes: diary2_sun, diary2_mirror, diary2_pillow, diary2_metro, diary2_fitting, diary2_kitchen, diary2_stairs, diary2_balcony
- `pack_flash` — world `B` — techniques `t_flash, t_kitchen_night` — 8 scenes: flash_wall, flash_laugh, flash_kitchen, flash_elevator, flash_street, flash_radiator, flash_fridge, flash_corridor
- `pack_sunlight` — world `C` — techniques `t_noon, t_water` — 8 scenes: sun_pool, sun_car, sun_bed, sun_hose, sun_beachlot, sun_sill, sun_roof, sun_kitchen
- `pack_americana` — world `C` — techniques `t_tableau, t_deadpan` — 8 scenes: amer2_motel, amer2_kitchen, amer2_market, amer2_pool, amer2_lawn, amer2_diner, amer2_salon, amer2_gas
- `pack_studio` — world `B` — techniques `t_wall, t_polaroid_fit` — 8 scenes: stud_grey, stud_wet, stud_shadow, stud_profile, stud_stool, stud_freckle, stud_wind, stud_contact
- `pack_suburb` — world `C` — techniques `t_tableau, t_deadpan` — 4 scenes: suburb_lawn, suburb_market, suburb_pool, suburb_kitchen
- `pack_concrete` — world `B` — techniques `t_concrete, t_flash` — 4 scenes: concrete_yard, concrete_stairwell, concrete_underpass, concrete_flash
- `pack_cup` — world `A` — techniques `t_cup, t_mirror` — 4 scenes: cup_morning, cup_windowsill, cup_cafe, cup_mirror
- `pack_transit` — world `A` — techniques `t_transit, t_squint` — 4 scenes: transit_train, transit_bus, transit_taxi, transit_sun
- `pack_wide` — world `A` — techniques `t_ultrawide, t_grimace, t_blur` — 4 scenes: wide_floor, wide_elevator, wide_grimace, wide_blur
- `pack_polaroid90` — world `C` — techniques `t_polaroid90` — 4 scenes: p90_carpet, p90_feast, p90_balcony, p90_bench
- `pack_squint` — world `A` — techniques `t_squint, t_fragility` — 4 scenes: squint_curtain, squint_car, squint_balcony, squint_window
- `pack_fitting` — world `A` — techniques `t_fitting, t_polaroid_fit` — 4 scenes: fit_rail, fit_mirror, fit_hand, fit_polaroid
- `pack_steam` — world `A` — techniques `t_shower, t_mirror` — 4 scenes: steam_fog, steam_hair, steam_robe, steam_streak
- `pack_4am` — world `A` — techniques `t_4am, t_screen` — 4 scenes: am4_screen, am4_kitchen, am4_sill, am4_awake
- `pack_screen` — world `A` — techniques `t_screen` — 4 scenes: screen_shot, screen_reshoot, screen_call, screen_gallery
- `pack_motion` — world `A` — techniques `t_blur, t_grimace` — 4 scenes: motion_home, motion_laugh, motion_turn, motion_shake
- `pack_night` — world `B` — techniques `t_kitchen_night, t_flash` — 4 scenes: night_bulb, night_window, night_fridge, night_flash

---

# 6. PRODUCT BOUNDARY — NEVER BLUR THIS

Influencer OS provides:

- identity canon;
- Character Passport;
- references;
- worlds;
- techniques;
- scene structure;
- capture/realism logic;
- formats;
- prompt assembly;
- model adaptation;
- planning;
- prompt strength;
- self-check;
- workflow intelligence.

External models/providers generate the final media.

Do not claim:
- Influencer OS itself is the image/video foundation model;
- guaranteed identity consistency;
- unsupported provider/model integration;
- fabricated benchmark superiority.

Use language such as:
- reduces drift;
- carries identity rules across workflows;
- structures prompts;
- adapts prompts to generation engines.

---

# 7. THE PRODUCT TO BUILD

This is not just a landing page.

Build one coherent product platform with a premium public site plus interactive workspace.

Recommended surfaces:

## Public
- Home
- Create Character
- Studios
- Models
- Examples / Community
- MCP
- Docs / How it works
- Pricing
- Sign in / Open Studio

## Workspace
- Character Studio
- Image Studio
- Video Studio
- Scene / Shot Studio
- Series / Shoot / Feed
- Prompt Lab
- Canvas / Workflow
- Projects
- Assets
- Compare
- Model browser/settings

The exact IA may evolve, but all major user jobs must remain discoverable.

---

# 8. SIGNATURE PRODUCT FLOW

A user should be able to experience:

`Discover → Character → Passport → Canon → World → Technique → Scene → Format → Model → Prompt adaptation → Self-check → Generate → Compare → Save → Reuse → Image-to-video / Series / Shoot / Feed → MCP`

The invisible Influencer OS intelligence must be visually inspectable.

Prompt Lab should show a clear transformation chain:

`Identity → Canon → World → Technique → Scene → Capture/Realism → Format → Engine Adapter → Quality/Self-check → Final provider payload`

Provide:
- friendly view;
- structured OS-block view;
- raw payload view.

When a user changes World, technique, format or model, the prompt should visibly change.

---

# 9. CHARACTER STUDIO

Character Studio is a primary surface.

Support:
- prompt-based creation;
- reference-based creation;
- demo character;
- reference roles;
- Passport inspector/editor;
- identity full/mid/micro;
- device;
- anomaly lock;
- static/motion face adherence;
- Canon;
- live summary;
- version/save behavior;
- handoff to Image / Scene / Video / Prompt.

Preserve source semantics.

Do not replace the source Passport with a generic face-feature questionnaire unless explicitly layered as an optional browser UI that maps correctly into the real Passport.

---

# 10. IMAGE STUDIO

Required:
- character/project context;
- reference strip;
- Scene/World/Technique context;
- capability-driven model controls;
- prompt inspector;
- generation status;
- variants;
- compare;
- Save to Assets;
- use as new reference;
- handoff to Video;
- handoff to Series/Shoot/Feed;
- provider/model/provenance display.

Do not show controls unsupported by the selected model adapter.

---

# 11. VIDEO STUDIO

Required:
- image-to-video and supported modes;
- character/scene context;
- motion action/intensity;
- camera movement;
- duration/aspect ratio/resolution where verified;
- audio/dialogue/ambience where verified;
- multi-shot where verified;
- prompt adapter view;
- generation status;
- variants;
- Save to Assets;
- comparison;
- provenance.

Use source engine logic as the baseline and add newer model profiles only through the model-registry extension layer.

---

# 12. SERIES / SHOOT / FEED

Do not reduce these to generic batch generation.

Port the actual source planning semantics.

Expose:
- roles;
- hero/detail/cutaway/off;
- frame planning;
- shot groupings;
- caption voice;
- feed rhythm;
- day marks;
- world/canon rules;
- deliberate imperfections where source logic requires them;
- pack/technique/cutaway logic.

Use real source structures from the appendix.

---

# 13. MODELS — CURRENT RESEARCH + EXTENSION LAYER

Research current image/video models using current public official sources.

Do not rewrite OS23.6 core IDs merely because new models exist.

Instead build:

`OS Core → Model Registry → Prompt Profile/Adapter → Provider Adapter → Job`

Every model profile should store:
- id;
- display label;
- family;
- modality;
- provider;
- current availability;
- API availability;
- LIVE / SUPPORTED_NOT_TESTED / UI_ONLY / UNAVAILABLE / DEPRECATED;
- inputs;
- reference support;
- duration/resolution/aspect ratio;
- audio/multishot/edit support;
- prompt behavior;
- source URLs;
- verified date;
- confidence.

Separate:
- official upstream model name;
- provider/API slug;
- third-party product label.

Do not convert another company's marketing label into a false upstream model claim.

Research priorities should include current relevant families such as Kling, Seedance, Veo, OpenAI/GPT Image, Gemini/Nano Banana, Seedream, Flux, Sora, WAN and other genuinely current options.

Use official docs first.
Use current user/community reports only as `COMMUNITY_SIGNAL`.

If live web research is unavailable, say so and do not fabricate research.

---

# 14. GENERATION PROVIDERS

Provider architecture:

1. `Mock/DemoProvider` — always works, clearly labeled.
2. at least one real provider adapter if credentials/environment allow.
3. clean extension interface for more providers.

Make a serious attempt at real image AND video generation.

Do not let missing credentials stop the rest of the product.

If blocked:
- record exact reason;
- keep all workflow/product logic functional;
- label mock results;
- do not claim LIVE.

API keys:
- never commit;
- never put in client bundle;
- avoid localStorage by default;
- use environment/server secret path or ephemeral BYOK;
- redact logs.

---

# 15. MCP — SHARED CORE, REAL PROTOCOL

Build `/mcp` product UX AND a locally testable MCP server.

Use current official MCP specification/SDK patterns if the environment allows.

Do not hand-roll a JSON-RPC imitation and call it fully compliant if the official SDK is installed and usable.

Core tool family may include:

- `create_character_passport`
- `update_character_passport`
- `get_character_passport`
- `list_characters`
- `list_models`
- `build_scene_prompt`
- `adapt_prompt_for_model`
- `validate_prompt`
- `get_prompt_strength`
- `plan_series`
- `plan_shoot`
- `plan_feed`
- `generate_image`
- `generate_video`
- `get_generation_status`
- `list_assets`

Pure prompt/planning tools should work locally.

Generation tools are LIVE only if provider calls truly work.

Test with an MCP client or protocol-level integration tests.

If remote exposure/auth cannot be completed:
- local MCP must still work;
- mark remote auth honestly;
- provide deployment/auth hardening instructions;
- continue mission.

---

# 16. AUTH / PERSISTENCE

Build a coherent prototype/full-browser auth boundary.

Public:
- marketing;
- examples;
- model catalog;
- docs;
- MCP info;
- guided demo.

Signed in:
- saved characters;
- projects;
- assets;
- jobs/history;
- provider connections/settings.

If the sandbox supports a stable DB/session layer, use it.

Do not imply production authentication if it is only a local demo session.

Document exactly:
- persistence;
- auth;
- storage;
- data deletion/export;
- BYOK handling.

---

# 17. DESIGN DIRECTION

Do not build three competing sites.

Internally compare a few possibilities briefly, then choose one coherent direction.

Target:
- premium;
- media-forward;
- fashion/editorial aware;
- Swiss/Scandinavian discipline;
- strong typography;
- strong photographic scale;
- product-dense workbench where needed;
- rare cinematic moments;
- precise motion;
- serious, not toy-like;
- visually authored;
- not generic AI-SaaS.

Reference roles:

## Product architecture
Study current public Higgsfield-style creative-platform IA/workflows:
- studio separation;
- AI influencer creation;
- model browsing;
- assets/community;
- image → video handoff;
- MCP surface.

Borrow architecture principles, not their skin.

## Existing Influencer OS V2
Preserve useful Dossier DNA:
- editorial evidence;
- provenance;
- typography;
- seriousness;
- dark/light quality;
- product truth.

## Media/narrative
Use principles from references such as:
- Getty Tracing Art — image-rich narrative, provenance, chapters;
- IVRESS — restrained cinematic sequencing;
- Acne Studios / strong fashion/editorial sites — image scale and restraint;
- K95 / strong editorial typography — confidence without generic SaaS;
- TouchDesigner / Nodes-like creator workbenches — visible relation between controls and output, without making default UI a node editor.

Do not clone one reference.

Avoid:
- purple AI gradients;
- glass everywhere;
- giant rounded cards;
- generic orb;
- pointless WebGL;
- scroll hijacking;
- gallery walls without narrative;
- excessive effects in settings/security UI.

---

# 18. MEDIA

Use founder-provided media first when accessible.

If not accessible:
- build robust media slots/layouts;
- use clearly licensed or clearly prototype-only temporary media;
- record provenance;
- never present random web imagery as Influencer OS-generated output.

The product is visual, so public pages, Examples, Character, Image, Video and Case/Proof surfaces must not remain visually empty.

Media density should be high but purposeful.

Every major visual should serve:
- identity proof;
- model/output proof;
- world/scene comparison;
- transition;
- editorial pacing;
- input/output explanation;
- community/example.

---

# 19. EN / RU / RESPONSIVE / ACCESSIBILITY

Full English first, then full authored Russian.

No placeholder RU.

Test RU separately.

Required responsive targets:
- 1920
- 1440
- 1024/768
- 430/390
- 360

Mobile studio layouts should use drawers/sheets/compact controls rather than squeezing desktop panels.

Accessibility:
- semantic structure;
- keyboard use;
- visible focus;
- ARIA where appropriate;
- contrast;
- reduced motion;
- touch targets;
- non-color-only states;
- clear progress/error states.

---

# 20. FAILURE PROTOCOL

Never loop indefinitely.

Maintain `docs/FAILURE-LOG.md`.

Statuses:
- `WORKING`
- `FIXED`
- `DEGRADED`
- `MOCKED`
- `UNVERIFIED`
- `BLOCKED_SUBSYSTEM`
- `DEFERRED`

Retry rules:

## Attachment
3 materially different attempts max → `BLOCKED_ATTACHMENT_MOUNT` → use in-band truth → continue.

## Public reference inaccessible
normal access → one public alternate source → `NOT_OBSERVED` → continue.

Do not fight CAPTCHA/login walls indefinitely.

## Package/install
up to 3 materially different approaches → stable substitute → continue.

## Browser/HMR
fresh session/server + alternate verification → max ~4 bounded approaches → record limitation → continue.

## Provider API
validate config → bounded transient retries → one alternate provider path if sensible → honest MOCK/UNVERIFIED fallback → continue.

## MCP remote
local first → bounded remote attempts → document remote limitation → continue.

## Build/type error
must be fixed or optional feature disabled/reverted until build is clean.

## Security/data-loss
never bypass. Disable unsafe subsystem and continue unrelated work.

---

# 21. MANDATORY REVIEW LOOPS — NOT OPEN-ENDED FEATURE DRIFT

After implementation, perform FOUR mandatory review passes.

## Review A — SOURCE/TRUTH
- compare implementation against embedded OS23.6 source;
- run source-parity tests;
- inspect claims/model statuses;
- remove invented semantics.

Fix defects.

## Review B — FUNCTIONAL/SECURITY
- test end-to-end journeys;
- provider states;
- auth/persistence;
- MCP;
- API-key handling;
- build/lint/type/test.

Fix defects.

## Review C — UX/VISUAL
- all major pages;
- EN/RU;
- dark/light;
- desktop/mobile;
- media density;
- empty/dead areas;
- interaction continuity;
- first-time usability.

Fix defects.

## Review D — PACKAGING/PORTABILITY
- docs current;
- Git clean;
- no accidental file-mode churn;
- no secrets;
- fresh export;
- export parity;
- run-from-clean-copy test if feasible.

Fix defects.

After these four passes, do ONE final integrated regression.

Do not start endless convenience-feature rounds after this unless a P0/P1 defect is found.

---

# 22. REQUIRED END-TO-END JOURNEYS

Test:

A. Home → guided demo → character → world → format → Prompt Lab.
B. Create character → edit Passport → save → Image Studio.
C. Image Studio → prompt → generate LIVE/MOCK → compare → save Asset.
D. Image result → Video Studio → generate LIVE/MOCK → save.
E. Character → Series/Shoot/Feed → planned outputs.
F. public → auth boundary → saved work persistence.
G. `/mcp` → local MCP client/tool call.
H. representative RU workflow.
I. representative 390/360 mobile workflow.
J. project export/import or portability flow.

---

# 23. REAL ROUTING

If the environment supports actual routes, prefer real URLs for public/product surfaces.

Do not call internal `ViewId` switching “deep links” if everything physically remains on `/`.

If a single-route shell is forced by the environment:
- state that clearly;
- make browser history/query/share behavior coherent;
- document production migration.

---

# 24. TEST STRATEGY

Do not equate:
- lint;
- a feature self-check;
- and manual browser clicking

with a complete test suite.

Create useful automated regression coverage for:
- source parity;
- prompt building;
- model adapter behavior;
- self-check;
- critical store/data behavior;
- MCP pure tools;
- routing/state;
- representative API/provider error paths.

Run:
- lint;
- typecheck;
- unit/integration tests;
- build;
- browser smoke/E2E where available.

Record exact commands/results.

---

# 25. GIT HYGIENE

If Git exists:

- use coherent commits;
- keep working tree understandable;
- before final:
  - `git status`
  - `git diff --stat`
  - `git diff --summary`
  - inspect unexpected mode changes;
  - ensure docs are current;
  - ensure generated export is refreshed after final commit.

Do not accidentally chmod every tracked file executable.

No force/reset/clean unless absolutely necessary and safe.

---

# 26. FINAL EXPORT MUST BE FRESH

The previous run produced an export before later improvement rounds. Do not repeat that.

Final sequence:

1. finish code;
2. finish all review/fix loops;
3. update docs;
4. final regression;
5. verify Git state;
6. create export FROM CURRENT TREE;
7. create `docs/EXPORT-MANIFEST.md`;
8. record file list + hashes where practical;
9. compare export contents to final tracked source;
10. verify critical late-added files are present;
11. if possible, unpack export into a temporary clean directory and run it.

Export should exclude:
- secrets;
- node_modules;
- caches;
- temporary research downloads.

Include:
- source;
- package/lock;
- `.env.example`;
- DB schema/migrations if used;
- tests;
- docs;
- local media required to run;
- MCP;
- README.

Create a downloadable archive such as:

`download/influencer-os-full-browser-build.zip`

---

# 27. COMPLETION STATUS

Final status must be one of:

- `COMPLETE`
- `COMPLETE_WITH_DEGRADED_SUBSYSTEMS`
- `INCOMPLETE`

Do not call a UI-only subsystem LIVE.

Final founder report in Russian must explicitly state:

- what was built;
- what source reconciliation changed;
- live vs mocked providers;
- image generation status;
- video generation status;
- MCP local/remote/auth status;
- auth/persistence status;
- EN/RU;
- responsive;
- test/build;
- source-parity result;
- research limitations;
- unresolved P0/P1;
- final export path;
- how to run;
- top production-hardening tasks.

---

# 28. EXECUTION ORDER NOW

1. Read this entire instruction and the authoritative source appendix below.
2. Create/update TODO with P0/P1/P2.
3. Reconcile current implementation against source before new convenience work.
4. Add source-parity tests.
5. Fix core OS semantics.
6. Research current models/references/MCP if web is genuinely available.
7. Finish shared architecture, real-generation attempt, MCP, auth/data.
8. Finish full product surfaces.
9. Complete EN/RU/responsive/accessibility.
10. Run Review A/B/C/D.
11. Final integrated regression.
12. Refresh docs.
13. Create fresh export from final tree.
14. Verify export parity.
15. Return final Russian founder report.

**Do not stop because the ZIP attachment is missing. The authoritative source needed for core reconciliation is embedded below.**

---

# 29. AUTHORITATIVE QUICK MAP EXTRACTED FROM REAL OS23.6

## Archive

- SHA-256: `8fd6f6a9e5bf8fc4e83cf04f26973b241a5319652a355017ef0c36e897233a84`
- Entries: 189
- Core source file hashes:

- `package.json` — `3288c1268ca6f4a3a3cf1bdc0ddef13d6d044d30b58d23eabda30034c83c1ef2` — 929 bytes
- `lib/types.ts` — `010a9f3b89ecee8229f2d5ad5d7af1b8b5bb4881fafe447ba49030e420bb7934` — 5568 bytes
- `lib/techniques.ts` — `a5fe432d68222a5deae333d8f20f464b5810b91d85bc3ec8f7e34ded90b0b372` — 12189 bytes
- `lib/packs.ts` — `7452f22444ea4f75f7fcd577aff75537053e0f9348127a19d35ac052b356becf` — 64216 bytes
- `lib/engines.ts` — `c425719e8365dd7c62680dae5a6919e24895890bd9f7e39b00e568e798e58060` — 23494 bytes
- `lib/canon.ts` — `e2a4a6bdfb114e1916cf5529dad291770db2c8319993b0d78efdaebff5311ccd` — 6961 bytes
- `lib/selfcheck.ts` — `444f5a7bd7ef47d1c4f27a4400740384069383b0c7c52b4de0568946d6562f1c` — 43550 bytes
- `lib/strength.ts` — `877c31b4553015f282921fe39d62a8cd34e199a2aabf82dc3805c83ea197487f` — 1894 bytes
- `lib/series.ts` — `b8b406f699d9e319f3bf8941d0481a1f064406340b39c59751e92f0ecf8a6ea8` — 3418 bytes
- `lib/shoot.ts` — `d623f99489e77f21625fb0a4b85a1d96edf4aff4f357bbdfd1b162b2239fbfa4` — 9383 bytes
- `lib/feed.ts` — `e0efc02a530087e9c5ab2a0de74d128a15c49a561b660a77d042e7a02737b7a1` — 7887 bytes
- `lib/multishot.ts` — `df803d78338afaabecd77b9b3856e57bfe70d088de2aa68e83c815aa810c294e` — 4269 bytes
- `lib/season.ts` — `5765cb5797bbc8cf4a38ea8e90b88391c8f5c8548edfd08549360d929e08d933` — 6230 bytes
- `lib/cutaways.ts` — `d1a282049b910ffd7007b28b03e3eb1662df70d7d5bf254071d0409cbbc4e1b9` — 17614 bytes
- `lib/captions.ts` — `a2324520f101355e96fec2a56ed81b81b0296a49aa2a17eeed62b1b962fae0b6` — 5087 bytes
- `lib/provider-settings.ts` — `2c795a5620f101315ab1914b8a9ba1ed30160710dc1e7acb597aa14802b480de` — 392 bytes
- `lib/llm.ts` — `8ad3ac1c76f0d174231400bd8627a0fb3f6cf173717ccb2d957445e6766d8ada` — 7052 bytes
- `lib/storage.ts` — `ce439387e961473558dda2cc968a415af608a76aa637835c7c19fd2cb7d28f74` — 22124 bytes
- `lib/demo.ts` — `2b1f0624baaa99e79a91c26ea623fa235838d5cc73cbdae8ac3ce546ed640bc7` — 9740 bytes
- `lib/tour.ts` — `49e0b3c28d763cc9efd5774b61e3eef3f53b17b01b1393b1beee2ed30a49f873` — 1199 bytes
- `lib/changelog.ts` — `2dbb77f589a6af42d473a3b01504f29401e865d46137b03419b4e60f90090837` — 14199 bytes
- `lib/presets.ts` — `92d171c0a839e056dace013ca94443eee12bf2c34f400e265a524337a8a07846` — 1568 bytes
- `lib/scene.ts` — `c860f9732e8d3ef6ca78da87ef97e93c9e8ed4bcc72b4e9b00bb98ff9b4d03a3` — 2552 bytes

## Exact source counts

- Techniques: 24
- Scene packs: 18
- Explicit scenes across packs: 92
- `check(...)` calls in `lib/selfcheck.ts`: 164

## Exact Worlds

- A · Diary
- B · Raw
- C · Staged

## Exact technique IDs

`t_tableau`, `t_noon`, `t_water`, `t_polaroid90`, `t_polaroid_fit`, `t_flash`, `t_concrete`, `t_kitchen_night`, `t_body_landscape`, `t_wall`, `t_lie_home`, `t_fitting`, `t_mirror`, `t_cup`, `t_shower`, `t_4am`, `t_screen`, `t_ultrawide`, `t_blur`, `t_grimace`, `t_transit`, `t_squint`, `t_fragility`, `t_deadpan`

## Exact pack → world → technique → scene map

- `pack_diary` — world `A` — techniques `t_lie_home, t_mirror, t_fitting, t_4am` — 8 scenes: diary2_sun, diary2_mirror, diary2_pillow, diary2_metro, diary2_fitting, diary2_kitchen, diary2_stairs, diary2_balcony
- `pack_flash` — world `B` — techniques `t_flash, t_kitchen_night` — 8 scenes: flash_wall, flash_laugh, flash_kitchen, flash_elevator, flash_street, flash_radiator, flash_fridge, flash_corridor
- `pack_sunlight` — world `C` — techniques `t_noon, t_water` — 8 scenes: sun_pool, sun_car, sun_bed, sun_hose, sun_beachlot, sun_sill, sun_roof, sun_kitchen
- `pack_americana` — world `C` — techniques `t_tableau, t_deadpan` — 8 scenes: amer2_motel, amer2_kitchen, amer2_market, amer2_pool, amer2_lawn, amer2_diner, amer2_salon, amer2_gas
- `pack_studio` — world `B` — techniques `t_wall, t_polaroid_fit` — 8 scenes: stud_grey, stud_wet, stud_shadow, stud_profile, stud_stool, stud_freckle, stud_wind, stud_contact
- `pack_suburb` — world `C` — techniques `t_tableau, t_deadpan` — 4 scenes: suburb_lawn, suburb_market, suburb_pool, suburb_kitchen
- `pack_concrete` — world `B` — techniques `t_concrete, t_flash` — 4 scenes: concrete_yard, concrete_stairwell, concrete_underpass, concrete_flash
- `pack_cup` — world `A` — techniques `t_cup, t_mirror` — 4 scenes: cup_morning, cup_windowsill, cup_cafe, cup_mirror
- `pack_transit` — world `A` — techniques `t_transit, t_squint` — 4 scenes: transit_train, transit_bus, transit_taxi, transit_sun
- `pack_wide` — world `A` — techniques `t_ultrawide, t_grimace, t_blur` — 4 scenes: wide_floor, wide_elevator, wide_grimace, wide_blur
- `pack_polaroid90` — world `C` — techniques `t_polaroid90` — 4 scenes: p90_carpet, p90_feast, p90_balcony, p90_bench
- `pack_squint` — world `A` — techniques `t_squint, t_fragility` — 4 scenes: squint_curtain, squint_car, squint_balcony, squint_window
- `pack_fitting` — world `A` — techniques `t_fitting, t_polaroid_fit` — 4 scenes: fit_rail, fit_mirror, fit_hand, fit_polaroid
- `pack_steam` — world `A` — techniques `t_shower, t_mirror` — 4 scenes: steam_fog, steam_hair, steam_robe, steam_streak
- `pack_4am` — world `A` — techniques `t_4am, t_screen` — 4 scenes: am4_screen, am4_kitchen, am4_sill, am4_awake
- `pack_screen` — world `A` — techniques `t_screen` — 4 scenes: screen_shot, screen_reshoot, screen_call, screen_gallery
- `pack_motion` — world `A` — techniques `t_blur, t_grimace` — 4 scenes: motion_home, motion_laugh, motion_turn, motion_shake
- `pack_night` — world `B` — techniques `t_kitchen_night, t_flash` — 4 scenes: night_bulb, night_window, night_fridge, night_flash

---

# 30. AUTHORITATIVE SOURCE APPENDIX

The following files are copied verbatim from the founder-supplied `os23.6.zip`.

Treat them as source-of-truth code.

Do not “improve” their semantics during reconciliation unless:
1. the existing source is preserved as a legacy/core profile, and
2. the new behavior is explicitly implemented as a browser/product extension layer.



---

## SOURCE FILE: `package.json`
SHA-256: `3288c1268ca6f4a3a3cf1bdc0ddef13d6d044d30b58d23eabda30034c83c1ef2`

```json
{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@base-ui/react": "^1.5.0",
    "@vercel/analytics": "1.6.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^1.16.0",
    "next": "16.2.11",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "shadcn": "^4.8.0",
    "tailwind-merge": "^3.3.1",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.0",
    "@types/node": "^24",
    "@types/react": "19.2.14",
    "@types/react-dom": "19.2.3",
    "postcss": "^8.5",
    "tailwindcss": "^4.2.0",
    "typescript": "5.7.3",
    "vitest": "^3.2.4"
  },
  "pnpm": {
    "overrides": {
      "hono": "4.12.25"
    }
  },
  "packageManager": "pnpm@9.15.9"
}

```


---

## SOURCE FILE: `lib/types.ts`
SHA-256: `010a9f3b89ecee8229f2d5ad5d7af1b8b5bb4881fafe447ba49030e420bb7934`

```ts
// Core data model types for Influencer OS

export type Mode = "photo" | "video";

export type EngineId =
  | "nano_pro"
  | "kling_3"
  | "seedance_2"
  | "veo_scene"
  | "veo_broll"
  | "omni_flash";

export type VisionProvider =
  "anthropic" | "openai" | "gemini" | "openrouter" | "custom";

export type Lang = "ru" | "en";

export type IdentityLevel = "full" | "mid" | "micro";

export type RefRole = "identity" | "scene" | "motion" | "audio" | "product";

export interface ReferencePhoto {
  id: string;
  role: RefRole;
  slot: number; // 1-4 face, 5 pose/scene
  angle: string;
  dataUrl: string; // compressed working image (base64 jpeg)
  thumbUrl: string; // ~256px thumbnail
  warnings: string[]; // i18n keys of soft quality warnings
  visionJson?: Record<string, unknown>;
}

// Fix Pack 11.3 — the model's canon: six blocks that make the pools hers.
// Stored ON the passport, so it rides versions, export and import for free.
export interface ModelCanon {
  schemaVersion: number;
  /** Who she is: archetype + vibe, 1–2 short EN phrases → MOOD. */
  whoSheIs: string;
  /** Her place: city + home type + interior phrases (EN) → cutaway scenes. */
  place: string[];
  /** 5–7 personal objects (EN, "her ...") → prop axis + cutaways. */
  objects: string[];
  /** Home world + favorite packs → library defaults. */
  homeWorld: "A" | "B" | "C" | "";
  favoritePacks: string[];
  /** Caption voice: style line + her own words/phrases → captions. */
  voiceStyle: string;
  voiceWords: string[];
  /** 2–3 body habits in frame (EN) → pose axis. */
  habits: string[];
  generatedAt?: string;
}

export interface CharacterPassport {
  schemaVersion: number;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  identity: { full: string; mid: string; micro: string };
  device: string;
  anomalyLock: {
    checkboxes: string[];
    freeText: string;
    json: Record<string, unknown>;
  };
  faceAdherence: { static: number; motion: number };
  referencePhotos: ReferencePhoto[];
  visionSummary: string;
  /** Fix Pack 11.3: the model's canon; absent or empty = pack defaults. */
  canon?: ModelCanon;
}

export interface CaptureSelection {
  cap: string; // key of CAP or ""
  opt: string; // key of OPT or ""
  expo: string[]; // keys of EXPO
  imperf: string[]; // keys of IMPERF
  film: string; // key of FILM or ""
}

export interface SceneSpec {
  mode: Mode;
  engine: EngineId;
  subject: { characterId: string | null; identityLevel: IdentityLevel };
  location: string;
  lighting: string;
  camera: string;
  pose: string;
  outfit: string;
  /** Fix Pack 10 - B2: English product description injected into prompts. */
  product?: string;
  mood: string;
  capture: CaptureSelection;
  style: string[];
  realism: string[];
  /** Fix Pack 11: world layer A/B/C driving the mood suffix + film gate. */
  world?: "A" | "B" | "C";
  /** Fix Pack 11: technique id from lib/techniques.ts. */
  technique?: string;
  /** Fix Pack 12: modifier technique ids (Fragile / Deadpan) layered on top. */
  modifiers?: string[];
  motion: { action: string; intensity: number; cameraMove: string };
  audio: { dialogue: string; sfx: string; ambience: string };
  references: { role: RefRole; fileRef: string }[];
  confidence: Record<string, number>;
}

export interface BuildResult {
  prompt: string;
  /** Shot label for a carousel series (localized at build time). */
  label?: string;
  negative?: string;
  words?: number;
  underMin?: boolean; // true when the prompt is under the engine's minimum word budget
  // Fix Pack 11.2: shoot/feed frame metadata.
  role?: "hero" | "detail" | "cutaway" | "off";
  caption?: string; // caption in the world's voice; "" = post without caption
  day?: number; // posting-day mark inside a feed
  // Fix Pack 16: caption voice format mark (dump / sms / archive).
  voice?: string;
}

export interface HistoryRecord {
  id: string;
  engine: EngineId;
  mode: Mode;
  scenePreview: string;
  prompt: string;
  negative?: string;
  createdAt: string;
  /** Fix Pack 13: hit journal — did the platform accept this result? */
  outcome?: "hit" | "miss";
}

export interface Preset {
  id: string;
  name: string;
  style: string[];
  realism: string[];
  capture: CaptureSelection;
  engine: EngineId;
  mode: Mode;
}

export type Theme = "light" | "dark" | "contrast";

export interface Settings {
  schemaVersion: number;
  language: Lang | null; // null = auto
  theme: Theme;
  provider: VisionProvider;
  apiKey: string;
  model: string; // model slug override ("" = provider default); used by openrouter/custom
  customEndpoint: string; // OpenAI-compatible endpoint for provider "custom"
  onboarded: boolean;
  /** Fix Pack 13: ISO timestamp of the last backup export (for the reminder). */
  lastBackupAt?: string;
}

// Learn-from-edits: the user's own RU->EN mappings + tags they removed.
export interface UserDict {
  schemaVersion: number;
  entries: Record<
    string,
    {
      en: string;
      cat: "location" | "lighting" | "camera" | "pose" | "outfit" | "mood";
    }
  >;
  ignored: string[]; // English tags the user removed (never auto-suggest again)
}

// Fix Pack 9 - A4: a saved scene in the scene library (ios_scenes).
export interface SavedScene {
  id: string;
  name: string;
  text: string;
  mode: Mode;
  engine: EngineId;
  createdAt: string;
}

// Fix Pack 10 - B3: a snapshot of a character passport (rollback support).
export interface PassportVersion {
  id: string;
  savedAt: string;
  name: string;
  passport: CharacterPassport;
}

```


---

## SOURCE FILE: `lib/techniques.ts`
SHA-256: `a5fe432d68222a5deae333d8f20f464b5810b91d85bc3ec8f7e34ded90b0b372`

```ts
// Fix Pack 11 - technique core. The atom of the visual system is a TECHNIQUE:
// a fixed bundle of five English phrases (camera reason, light, state, surface,
// artifact). Clusters are families of techniques; profiles are only sources.
// NO photographer or model names may ever appear in these strings.
// Film/instant terms are allowed ONLY in world "C" techniques (kitsch/cinema).

import type { Lang } from "./types";

export type World = "A" | "B" | "C";

export interface Technique {
  id: string;
  label: Record<Lang, string>;
  world: World;
  /** True for cross modifiers that mix into any world A/B pack. */
  modifier?: boolean;
  /** Why the camera is there and what holds it. */
  cameraReason: string;
  /** Motivated light source. */
  light: string;
  /** What the person is doing / feeling a second before the frame. */
  state: string;
  /** Honest texture of skin and environment. */
  surface: string;
  /** The kept imperfection that makes the frame believable. */
  artifact: string;
}

export const WORLDS: Record<
  World,
  { label: Record<Lang, string>; hint: Record<Lang, string> }
> = {
  A: {
    label: { ru: "Мир A · Diary", en: "World A · Diary" },
    hint: {
      ru: "Ситуация и быт: кадр между делами, телефон, честная цифра",
      en: "Situation and daily life: in-between frames, phone, honest digital",
    },
  },
  B: {
    label: { ru: "Мир B · Raw", en: "World B · Raw" },
    hint: {
      ru: "Жёсткий свет, бетон, ноль гламура",
      en: "Harsh light, concrete, zero glamour",
    },
  },
  C: {
    label: { ru: "Мир C · Staged", en: "World C · Staged" },
    hint: {
      ru: "Постановка и плёнка: табло, солнце, полароиды",
      en: "Staged and film: tableau, sun, polaroids",
    },
  },
};

export const TECHNIQUES: Technique[] = [
  // ---- World C: kitsch / cinema (film terms allowed here ONLY) ----
  {
    id: "t_tableau",
    label: { ru: "Табло", en: "Tableau" },
    world: "C",
    cameraReason: "static tripod frame staged like a film still",
    light: "even warm artificial glow, motel-sign color",
    state: "frozen mid-gesture, deadpan face",
    surface: "vinyl, formica, worn wallpaper",
    artifact: "one unsettling off detail inside an ordinary scene",
  },
  {
    id: "t_noon",
    label: { ru: "Полдень", en: "High noon" },
    world: "C",
    cameraReason: "35mm film frame at eye level, shot by a close friend",
    light: "harsh overhead midday sun, short deep shadows",
    state: "lazy squint, unbothered",
    surface: "hot skin with sunscreen sheen, dusty ground",
    artifact: "slight overexposure, blown highlights",
  },
  {
    id: "t_water",
    label: { ru: "У воды", en: "At the water" },
    world: "C",
    cameraReason: "waist-level candid frame from the shore",
    light: "low golden sun bouncing off the water",
    state: "mid-motion, wet hair stuck to the face",
    surface: "wet skin, salt traces, sand grit",
    artifact: "water drops on the lens",
  },
  {
    id: "t_polaroid90",
    label: { ru: "Polaroid ’95", en: "Polaroid ’95" },
    world: "C",
    cameraReason: "instant camera held by a family member",
    light: "bare ceiling bulb or built-in flash",
    state: "posing stiffly the way people posed for film",
    surface: "patterned carpet on the wall, lacquered furniture",
    artifact: "washed instant-photo colors, white frame, handwritten date",
  },
  {
    id: "t_polaroid_fit",
    label: { ru: "Полароид с примерки", en: "Fitting polaroid" },
    world: "C",
    cameraReason: "straight-on instant test shot from two meters",
    light: "flat institutional light, no styling",
    state: "neutral face, relaxed arms, measurement posture",
    surface: "plain wall, taped paper with a number",
    artifact: "instant film border, slight underexposure",
  },
  // ---- World B: underground ----
  {
    id: "t_flash",
    label: { ru: "Вспышка в лоб", en: "Direct flash" },
    world: "B",
    cameraReason: "compact camera with direct on-camera flash",
    light: "harsh frontal flash killing all depth",
    state: "caught rather than posed",
    surface: "sweaty skin shine, glossy fabric",
    artifact: "hard flash shadow outlining the body on the wall",
  },
  {
    id: "t_concrete",
    label: { ru: "Бетон", en: "Concrete" },
    world: "B",
    cameraReason: "handheld frame from a friend standing in the yard",
    light: "flat grey overcast, no sun",
    state: "still, hands in pockets, distant gaze",
    surface: "raw concrete panels, rusted metal, cracked asphalt",
    artifact: "muted desaturated palette, slightly tilted horizon",
  },
  {
    id: "t_kitchen_night",
    label: { ru: "Кухня ночью", en: "Night kitchen" },
    world: "B",
    cameraReason: "phone propped on the kitchen counter",
    light: "single practical source: open fridge or stove hood lamp",
    state: "mid-snack, unguarded, barefoot",
    surface: "chipped enamel, crumbs on the counter",
    artifact: "deep underexposure, high ISO noise",
  },
  {
    id: "t_body_landscape",
    label: { ru: "Тело в ландшафте", en: "Body in landscape" },
    world: "B",
    cameraReason: "distant tripod frame, a small figure in vast nature",
    light: "cold natural light of an empty landscape",
    state: "body as a sculptural form, face hidden or turned away",
    surface: "bare skin against grass, rock, soil",
    artifact: "a slight surreal wrongness in the pose",
  },
  {
    id: "t_wall",
    label: { ru: "У стены", en: "Against the wall" },
    world: "B",
    cameraReason: "straight-on casting frame at chest height",
    light: "one directional window or lamp light",
    state: "held still for the camera, eyes straight into the lens",
    surface: "bare scuffed wall, no set dressing",
    artifact: "visible test-shoot plainness, no retouch",
  },
  // ---- World A: diary / situation ----
  {
    id: "t_lie_home",
    label: { ru: "Лежу дома", en: "Lying at home" },
    world: "A",
    cameraReason: "phone held above the face while lying down",
    light: "soft window daylight across the bed",
    state: "heavy-lidded, between sleep and scrolling",
    surface: "creased sheets, pillow crease on the cheek",
    artifact: "slightly missed focus",
  },
  {
    id: "t_fitting",
    label: { ru: "Примерочная", en: "Fitting room" },
    world: "A",
    cameraReason: "mirror phone shot inside a store cabin",
    light: "flat LED strip from above",
    state: "mid-adjustment, caught between poses",
    surface: "price tags, pins, clothes half on",
    artifact: "mirror smudges, imperfect framing",
  },
  {
    id: "t_mirror",
    label: { ru: "Зеркало", en: "Mirror" },
    world: "A",
    cameraReason: "phone mirror selfie, phone covering part of the face",
    light: "single warm bathroom bulb",
    state: "checking rather than posing",
    surface: "toothpaste specks on the mirror glass",
    artifact: "flash bounce in the mirror",
  },
  {
    id: "t_cup",
    label: { ru: "Чашка", en: "Cup" },
    world: "A",
    cameraReason: "arm-length frame, the cup entering the frame edge",
    light: "morning window light on the steam",
    state: "just woke up, first sip, eyes elsewhere",
    surface: "chipped mug, ring stains on the table",
    artifact: "steam softening the focus",
  },
  {
    id: "t_shower",
    label: { ru: "Душ и пар", en: "Shower steam" },
    world: "A",
    cameraReason: "phone shot through fogged glass or mirror",
    light: "warm bathroom light diffused by steam",
    state: "wet hair pushed back, no makeup",
    surface: "condensation drops, fogged glass",
    artifact: "lens fog blooming the highlights",
  },
  {
    id: "t_4am",
    label: { ru: "4 утра", en: "4am" },
    world: "A",
    cameraReason: "front camera in the dark, screen as the only mirror",
    light: "phone screen glow or a single lamp",
    state: "insomniac honesty, tired eyes",
    surface: "dark room, tangled blanket",
    artifact: "heavy noise, crushed blacks",
  },
  {
    id: "t_screen",
    label: { ru: "Экран-в-экране", en: "Screen in screen" },
    world: "A",
    cameraReason: "photo of a screen or camera display showing a photo",
    light: "screen glow mixed with room light",
    state: "archival distance, an image inside an image",
    surface: "pixels, interface elements, camera UI frame",
    artifact: "moire, timestamp, battery icon",
  },
  {
    id: "t_ultrawide",
    label: { ru: "0.5x", en: "0.5x ultrawide" },
    world: "A",
    cameraReason: "0.5x ultra-wide phone lens held too close",
    light: "any available light, unflattering and honest",
    state: "playing with the distortion, not hiding it",
    surface: "stretched edges of the room",
    artifact: "barrel distortion, warped proportions",
  },
  {
    id: "t_blur",
    label: { ru: "Смаз", en: "Motion blur" },
    world: "A",
    cameraReason: "slow shutter in dim light, handheld",
    light: "dim warm interior light",
    state: "mid-movement, face slightly ghosted",
    surface: "light trails on the highlights",
    artifact: "deliberate motion blur kept as mood",
  },
  {
    id: "t_grimace",
    label: { ru: "Гримаса", en: "Grimace" },
    world: "A",
    cameraReason: "front camera at a deliberately bad angle",
    light: "flat unflattering light",
    state: "exaggerated grimace instead of a smile",
    surface: "close skin honesty, no retouch",
    artifact: "comic wide-angle closeness",
  },
  {
    id: "t_transit",
    label: { ru: "Транзит", en: "Transit" },
    world: "A",
    cameraReason: "phone selfie or window-seat frame in transit",
    light: "flickering carriage light or window daylight",
    state: "tired in-between-places gaze, headphones in",
    surface: "scratched glass, worn seat fabric",
    artifact: "reflections layered on the window",
  },
  {
    id: "t_squint",
    label: { ru: "Прищур", en: "Squint" },
    world: "A",
    cameraReason: "close frame right against low sunlight",
    light: "low golden sun striping across the face",
    state: "eyes squinting into the light, half-smile",
    surface: "sun-lit skin texture, flyaway hairs",
    artifact: "lens flare, one blown highlight stripe",
  },
  // ---- Cross modifiers (mix into any world A/B pack) ----
  {
    id: "t_fragility",
    label: { ru: "Хрупкость", en: "Fragility" },
    world: "A",
    modifier: true,
    cameraReason: "slightly farther than comfortable, giving the subject air",
    light: "pale soft daylight",
    state: "thin-skinned quiet, guard down",
    surface: "goosebumps, fine vellus hair visible",
    artifact: "pale muted palette",
  },
  {
    id: "t_deadpan",
    label: { ru: "Deadpan", en: "Deadpan" },
    world: "A",
    modifier: true,
    cameraReason: "centered symmetrical frame",
    light: "even flat light",
    state: "zero expression, held eye contact",
    surface: "an orderly banal setting",
    artifact: "tension from nothing happening",
  },
];

export const TECHNIQUE_BY_ID: Record<string, Technique> = Object.fromEntries(
  TECHNIQUES.map((t) => [t.id, t]),
);

/** One-line English text of a technique: the five phrases joined. */
export function techniqueText(t: Technique): string {
  return [t.cameraReason, t.light, t.state, t.surface, t.artifact]
    .filter(Boolean)
    .join(", ");
}

// Series x6: six frames of ONE technique with state/artifact variations.
// Variation phrases are appended to the scene; identity and world stay fixed.
export const SERIES_SHIFTS: string[] = [
  "",
  "same scene, eyes closed, breath out",
  "same scene, glance off-frame, a touch of motion blur",
  "same scene, detail crop: hands and the object",
  "same scene, a step back, wider environmental frame",
  "same scene, the artifact turned up one notch",
];

/** Six prompt-ready scene fragments for a technique series. */
export function techniqueSeries(t: Technique): string[] {
  const base = techniqueText(t);
  return SERIES_SHIFTS.map((s) => (s ? `${base}, ${s}` : base));
}

```


---

## SOURCE FILE: `lib/packs.ts`
SHA-256: `7452f22444ea4f75f7fcd577aff75537053e0f9348127a19d35ac052b356becf`

```ts
// Fix Pack 9 - A5: five scene packs in the gritty-realism direction.
// Each pack is a JSON-extensible set of ~8 prompt-ready scenes with a style
// preset, capture layers and wardrobe hints. Aesthetic references are
// expressed only through descriptive characteristics (light, color, framing,
// deadpan drama) - never through names. The editorial track uses FILM stock,
// the UGC track keeps digital sensor noise; the IMPERF layer stays available
// in every pack.

import type { Lang, SceneSpec } from "./types";

export type PackScene = {
  id: string;
  /** Fix Pack 11: primary technique powering this scene. */
  techniqueId?: string;
  label: Record<Lang, string>;
  fields: Pick<SceneSpec, "location" | "lighting" | "pose" | "outfit" | "mood">;
  capture: SceneSpec["capture"];
  style: string[];
};

export type ScenePack = {
  id: string;
  label: Record<Lang, string>;
  tagline: Record<Lang, string>;
  track: "ugc" | "editorial";
  /** Fix Pack 11: world layer A (diary) / B (underground) / C (kitsch-cinema). */
  world: "A" | "B" | "C";
  /** Fix Pack 11: technique ids from lib/techniques.ts powering this pack. */
  techniqueIds: string[];
  scenes: PackScene[];
};

/** Compose a readable one-line scene text from pack scene fields. */
export function packSceneText(s: PackScene): string {
  const f = s.fields;
  return [f.location, f.lighting, f.pose, f.outfit, f.mood]
    .filter(Boolean)
    .join(", ");
}

export const SCENE_PACKS: ScenePack[] = [
  {
    id: "pack_diary",
    label: { ru: "Model Diary", en: "Model Diary" },
    tagline: {
      ru: "Сырой UGC-реализм: кадры как с телефона подруги",
      en: "Raw UGC realism: frames like a friend's phone",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_lie_home", "t_mirror", "t_fitting", "t_4am"],
    scenes: [
      {
        id: "diary2_sun",
        label: { ru: "Свет на полу", en: "Sunlight on the floor" },
        fields: {
          location: "bedroom floor by the window",
          lighting: "hard morning sunlight stripes across the floor",
          pose: "sitting cross-legged, looking into the light",
          outfit: "oversized worn t-shirt",
          mood: "unhurried, private",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["tilt", "crop"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "diary2_mirror",
        label: { ru: "Зеркало", en: "Smudged mirror" },
        fields: {
          location: "small bathroom with a smudged mirror",
          lighting: "single warm bulb overhead",
          pose: "mirror selfie, phone covering half the face",
          outfit: "yesterday's hoodie",
          mood: "second-day hair, honest",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["motion"],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "diary2_pillow",
        label: { ru: "След от подушки", en: "Pillow crease" },
        fields: {
          location: "unmade bed close to the window",
          lighting: "soft pale morning window light",
          pose: "just woke up, pillow crease on the cheek, eyes half open",
          outfit: "tangled sheets and a worn tank top",
          mood: "drowsy, unguarded",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["miss_foc"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "diary2_metro",
        label: { ru: "Метро", en: "Metro seat" },
        fields: {
          location: "metro car seat by the doors",
          lighting: "flickering fluorescent carriage light",
          pose: "slumped against the glass with headphones on",
          outfit: "puffer jacket and a canvas tote",
          mood: "tired end of the day",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["high_iso"],
          imperf: ["motion"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "diary2_fitting",
        label: { ru: "Примерочная", en: "Fitting room" },
        fields: {
          location: "store fitting room",
          lighting: "flat LED light",
          pose: "mid-adjustment, fixing a sleeve, caught between poses",
          outfit: "half-tried outfit with price tags",
          mood: "candid, in-between",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["miss_foc"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "diary2_kitchen",
        label: { ru: "Кухня в 2 ночи", en: "2am kitchen" },
        fields: {
          location: "kitchen counter at night",
          lighting: "only the open fridge light in a dark room",
          pose: "eating cereal standing up, leaning on the counter",
          outfit: "oversized shirt and wool socks",
          mood: "quiet 2am honesty",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under", "high_iso"],
          imperf: [],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "diary2_stairs",
        label: { ru: "Лестница", en: "Stairwell" },
        fields: {
          location: "apartment stairwell landing",
          lighting: "golden hour through a dusty window",
          pose: "sitting on the steps, scrolling the phone",
          outfit: "jeans and worn sneakers",
          mood: "waiting for someone",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["vignette"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "diary2_balcony",
        label: { ru: "Балкон", en: "Balcony morning" },
        fields: {
          location: "small apartment balcony",
          lighting: "pale overcast morning light",
          pose: "wrapped in a blanket holding a mug with both hands",
          outfit: "blanket over pajamas",
          mood: "slow start of the day",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["crop"],
          film: "",
        },
        style: ["ugc_raw", "lifestyle"],
      },
    ],
  },
  {
    id: "pack_flash",
    label: { ru: "Flash", en: "Flash" },
    tagline: {
      ru: "Прямая вспышка в лоб: пересвет, дерзкий угол, без ретуши",
      en: "Direct on-camera flash: overexposed, tilted, unretouched",
    },
    track: "editorial",
    world: "B",
    techniqueIds: ["t_flash", "t_kitchen_night"],
    scenes: [
      {
        id: "flash_wall",
        label: { ru: "У стены", en: "Blank wall" },
        fields: {
          location: "bare apartment wall",
          lighting: "direct on-camera flash, harsh shadow outline behind",
          pose: "standing square, arms at sides, staring into the lens",
          outfit: "simple black dress",
          mood: "unretouched deadpan",
        },
        capture: {
          cap: "disposable",
          opt: "",
          expo: ["over"],
          imperf: [],
          film: "",
        },
        style: ["fashion"],
      },
      {
        id: "flash_laugh",
        label: { ru: "Смех в пересвет", en: "Overexposed laugh" },
        fields: {
          location: "house party hallway",
          lighting: "hard frontal flash overexposing the skin",
          pose: "caught mid-laugh, eyes squeezed shut",
          outfit: "sequin top",
          mood: "unguarded, loud",
        },
        capture: {
          cap: "disposable",
          opt: "",
          expo: ["over"],
          imperf: ["tilt"],
          film: "",
        },
        style: ["fashion", "ugc_raw"],
      },
      {
        id: "flash_kitchen",
        label: { ru: "Кухня на вечеринке", en: "Party kitchen" },
        fields: {
          location: "cramped kitchen at a house party",
          lighting: "direct flash mixed with warm tungsten",
          pose: "leaning on the counter with a drink, looking straight at the camera",
          outfit: "satin slip dress",
          mood: "tilted candid frame",
        },
        capture: {
          cap: "",
          opt: "",
          expo: ["mixed_wb"],
          imperf: ["tilt"],
          film: "gold",
        },
        style: ["fashion"],
      },
      {
        id: "flash_elevator",
        label: { ru: "Лифт", en: "Elevator mirror" },
        fields: {
          location: "old elevator with a scratched mirror",
          lighting: "harsh flash bouncing off the mirror",
          pose: "mirror selfie with the flash flaring",
          outfit: "faux fur coat",
          mood: "late night, on the way somewhere",
        },
        capture: {
          cap: "disposable",
          opt: "",
          expo: ["glare"],
          imperf: [],
          film: "",
        },
        style: ["selfie", "fashion"],
      },
      {
        id: "flash_street",
        label: { ru: "Ночная улица", en: "Night street" },
        fields: {
          location: "empty night street",
          lighting:
            "flash lighting only the subject, darkness swallowing the background",
          pose: "walking toward the camera mid-step",
          outfit: "long coat over a going-out dress",
          mood: "isolated by the flash",
        },
        capture: {
          cap: "",
          opt: "",
          expo: ["over"],
          imperf: ["motion"],
          film: "fuji",
        },
        style: ["fashion"],
      },
      {
        id: "flash_radiator",
        label: { ru: "У батареи", en: "By the radiator" },
        fields: {
          location: "bedroom floor against a radiator",
          lighting: "direct flash flattening the whole scene",
          pose: "sitting knees to chest, looking up at the camera",
          outfit: "oversized band t-shirt",
          mood: "raw and direct",
        },
        capture: {
          cap: "disposable",
          opt: "",
          expo: ["over"],
          imperf: ["crop"],
          film: "",
        },
        style: ["fashion", "ugc_raw"],
      },
      {
        id: "flash_fridge",
        label: { ru: "Холодильник", en: "Open fridge" },
        fields: {
          location: "dark kitchen at night",
          lighting: "flash mixing with the cold open-fridge glow",
          pose: "holding the fridge door open, glancing back over the shoulder",
          outfit: "silk robe",
          mood: "caught off guard",
        },
        capture: {
          cap: "",
          opt: "",
          expo: ["mixed_wb"],
          imperf: [],
          film: "gold",
        },
        style: ["fashion"],
      },
      {
        id: "flash_corridor",
        label: { ru: "Коридор отеля", en: "Hotel corridor" },
        fields: {
          location: "long hotel corridor with patterned carpet",
          lighting: "bare flash washing out the colors",
          pose: "standing centered far down the corridor, heels in hand",
          outfit: "evening dress, bare feet",
          mood: "end of the night",
        },
        capture: {
          cap: "",
          opt: "",
          expo: ["over"],
          imperf: ["vignette"],
          film: "fuji",
        },
        style: ["fashion"],
      },
    ],
  },
  {
    id: "pack_sunlight",
    label: { ru: "Riviera", en: "Riviera" },
    tagline: {
      ru: "Калифорнийское солнце, 35mm, ленивый полдень",
      en: "California sun, 35mm film, lazy afternoons",
    },
    track: "editorial",
    world: "C",
    techniqueIds: ["t_noon", "t_water"],
    scenes: [
      {
        id: "sun_pool",
        label: { ru: "У бассейна", en: "Poolside" },
        fields: {
          location: "hotel poolside with white loungers",
          lighting: "harsh midday sun with hard shadows",
          pose: "lying on a lounger, eyes closed, one knee up",
          outfit: "retro one-piece swimsuit, sunglasses pushed up",
          mood: "lazy heat",
        },
        capture: {
          cap: "film_35mm",
          opt: "lens_35",
          expo: ["over"],
          imperf: [],
          film: "gold",
        },
        style: ["fashion", "travel"],
      },
      {
        id: "sun_car",
        label: { ru: "В машине", en: "In the car" },
        fields: {
          location: "passenger seat of a parked vintage car",
          lighting: "low sun flaring through the windshield",
          pose: "head resting on the seat, looking out the side window",
          outfit: "cotton summer dress",
          mood: "wind-down afternoon",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: ["glare"],
          imperf: [],
          film: "gold",
        },
        style: ["travel", "lifestyle"],
      },
      {
        id: "sun_bed",
        label: { ru: "Дневной сон", en: "Afternoon bed" },
        fields: {
          location: "bedroom with sheer curtains",
          lighting: "warm afternoon sun across white sheets",
          pose: "sprawled on the bed, limbs loose, face half in the pillow",
          outfit: "oversized linen shirt",
          mood: "lazy nap stillness",
        },
        capture: {
          cap: "film_35mm",
          opt: "lens_50",
          expo: [],
          imperf: [],
          film: "portra",
        },
        style: ["lifestyle"],
      },
      {
        id: "sun_hose",
        label: { ru: "Шланг во дворе", en: "Garden hose" },
        fields: {
          location: "dry backyard lawn",
          lighting: "blinding late-day sun",
          pose: "spraying water from a garden hose, barefoot, mid-turn",
          outfit: "denim shorts and a tank top",
          mood: "careless summer",
        },
        capture: {
          cap: "film_35mm",
          opt: "lens_35",
          expo: ["glare"],
          imperf: [],
          film: "gold",
        },
        style: ["lifestyle"],
      },
      {
        id: "sun_beachlot",
        label: { ru: "Парковка у пляжа", en: "Beach parking lot" },
        fields: {
          location: "empty beach parking lot",
          lighting: "salt-hazy bright sun",
          pose: "sitting on a car hood with melting ice cream",
          outfit: "terry shorts and retro sneakers",
          mood: "roadtrip pause",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: [],
          imperf: [],
          film: "portra",
        },
        style: ["travel"],
      },
      {
        id: "sun_sill",
        label: { ru: "Подоконник", en: "Windowsill" },
        fields: {
          location: "wide windowsill of an old apartment",
          lighting: "dusty sunbeam cutting the room",
          pose: "curled on the sill with a book, cat-like",
          outfit: "soft knit set",
          mood: "warm stillness",
        },
        capture: {
          cap: "film_35mm",
          opt: "lens_35",
          expo: [],
          imperf: ["film_dust"],
          film: "portra",
        },
        style: ["lifestyle"],
      },
      {
        id: "sun_roof",
        label: { ru: "Крыша", en: "Rooftop" },
        fields: {
          location: "flat rooftop with white walls",
          lighting: "golden hour sidelight",
          pose: "leaning on the parapet, squinting at the sun",
          outfit: "slip dress and worn sandals",
          mood: "warm wind",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: [],
          imperf: [],
          film: "gold",
        },
        style: ["fashion", "travel"],
      },
      {
        id: "sun_kitchen",
        label: { ru: "Утренний сок", en: "Morning juice" },
        fields: {
          location: "bright kitchen",
          lighting: "hard low morning light through the window",
          pose: "drinking orange juice leaning on the counter",
          outfit: "boxer shorts and a white tee",
          mood: "unhurried morning",
        },
        capture: {
          cap: "film_35mm",
          opt: "lens_35",
          expo: [],
          imperf: [],
          film: "portra",
        },
        style: ["lifestyle"],
      },
    ],
  },
  {
    id: "pack_americana",
    label: { ru: "Motel", en: "Motel" },
    tagline: {
      ru: "Постановочное кино-табло: банальное + один тревожный акцент",
      en: "Staged film-still tableau: the banal plus one unsettling accent",
    },
    track: "editorial",
    world: "C",
    techniqueIds: ["t_tableau", "t_deadpan"],
    scenes: [
      {
        id: "amer2_motel",
        label: { ru: "Мотель", en: "Motel at dusk" },
        fields: {
          location: "roadside motel doorway at dusk under a neon vacancy sign",
          lighting: "mixed neon and warm tungsten light",
          pose: "standing motionless in the doorway, deadpan stare",
          outfit: "silk robe and heeled slippers",
          mood: "staged film-still calm, quiet unease",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: ["mixed_wb"],
          imperf: [],
          film: "gold",
        },
        style: ["fashion"],
      },
      {
        id: "amer2_kitchen",
        label: { ru: "Кухня 60-х", en: "Sixties kitchen" },
        fields: {
          location: "pastel sixties kitchen with patterned linoleum",
          lighting:
            "flat warm domestic light with a thin haze of cigarette smoke",
          pose: "sitting rigidly at the table, hands folded, staring straight ahead",
          outfit: "pastel housecoat, hair in rollers",
          mood: "frozen domestic tableau, something slightly off",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: [],
          imperf: [],
          film: "portra",
        },
        style: ["fashion"],
      },
      {
        id: "amer2_market",
        label: { ru: "Супермаркет", en: "Supermarket" },
        fields: {
          location: "supermarket aisle",
          lighting: "flat fluorescent overhead light",
          pose: "leaning on a shopping cart, chin up, blank deadpan expression",
          outfit: "pastel sixties dress, set hair",
          mood: "drama of the mundane",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: [],
          imperf: [],
          film: "portra",
        },
        style: ["fashion"],
      },
      {
        id: "amer2_pool",
        label: { ru: "Бассейн", en: "Motel pool" },
        fields: {
          location: "turquoise motel pool",
          lighting: "harsh afternoon sun, hard shadows",
          pose: "standing waist-deep, perfectly still, glassy stare at the camera",
          outfit: "white silicone swim cap and retro swimsuit",
          mood: "saturated stillness with an unsettling accent",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: ["over"],
          imperf: [],
          film: "gold",
        },
        style: ["fashion"],
      },
      {
        id: "amer2_lawn",
        label: { ru: "Газон", en: "Suburban lawn" },
        fields: {
          location: "manicured suburban front lawn with a sprinkler",
          lighting: "late golden light, long shadows",
          pose: "standing too straight holding a garden hose, smile held a beat too long",
          outfit: "floral day dress and rubber gloves",
          mood: "the neighbor knows something",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: [],
          imperf: [],
          film: "gold",
        },
        style: ["fashion"],
      },
      {
        id: "amer2_diner",
        label: { ru: "Дайнер", en: "Diner booth" },
        fields: {
          location: "vinyl diner booth by the window",
          lighting: "warm tungsten mixing with window daylight",
          pose: "sitting with an untouched slice of pie, staring past the camera, lipstick slightly smeared",
          outfit: "mint dress and pearl earrings",
          mood: "cheerful surface with a crack",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: ["mixed_wb"],
          imperf: [],
          film: "portra",
        },
        style: ["fashion"],
      },
      {
        id: "amer2_salon",
        label: { ru: "Салон", en: "Beauty salon" },
        fields: {
          location: "vintage beauty salon",
          lighting: "buzzing fluorescent tubes over warm bulbs",
          pose: "sitting under a dome hair dryer, eyes fixed forward, magazine unopened",
          outfit: "silky robe and foam curlers",
          mood: "time stopped mid-ritual",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: ["mixed_wb"],
          imperf: [],
          film: "portra",
        },
        style: ["fashion"],
      },
      {
        id: "amer2_gas",
        label: { ru: "Заправка", en: "Night gas station" },
        fields: {
          location: "empty night gas station",
          lighting: "sodium and tungsten glow against a black sky",
          pose: "standing by the pump, looking straight into the lens",
          outfit: "satin evening gown, out of place",
          mood: "cinematic banality, wrong-hour tension",
        },
        capture: {
          cap: "film_35mm",
          opt: "",
          expo: ["mixed_wb", "under"],
          imperf: [],
          film: "gold",
        },
        style: ["fashion"],
      },
    ],
  },
  {
    id: "pack_studio",
    label: { ru: "Casting", en: "Casting" },
    tagline: {
      ru: "Editorial-тесты: направленный свет, мокрые волосы, чистый фон",
      en: "Editorial tests: directional light, wet hair, plain backgrounds",
    },
    track: "editorial",
    world: "B",
    techniqueIds: ["t_wall", "t_polaroid_fit"],
    scenes: [
      {
        id: "stud_grey",
        label: { ru: "Серый фон", en: "Grey seamless" },
        fields: {
          location: "plain grey seamless backdrop",
          lighting: "single hard directional light from the left",
          pose: "standing square to camera, arms relaxed, deadpan test frame",
          outfit: "plain white tank top and straight-leg jeans",
          mood: "casting-test honesty",
        },
        capture: {
          cap: "",
          opt: "lens_85",
          expo: [],
          imperf: [],
          film: "portra",
        },
        style: ["fashion"],
      },
      {
        id: "stud_wet",
        label: { ru: "Мокрые волосы", en: "Wet hair" },
        fields: {
          location: "plain backdrop, tight close-up",
          lighting: "hard beauty light from above",
          pose: "wet hair slicked back, droplets on the shoulders, chin lifted",
          outfit: "simple black bandeau",
          mood: "polished editorial test",
        },
        capture: {
          cap: "",
          opt: "lens_85",
          expo: [],
          imperf: [],
          film: "portra",
        },
        style: ["fashion"],
      },
      {
        id: "stud_shadow",
        label: { ru: "Жёсткая тень", en: "Hard shadow" },
        fields: {
          location: "white studio wall",
          lighting: "single hard spotlight throwing a sharp long shadow",
          pose: "body angled into the light, half the face in shadow",
          outfit: "tailored black blazer",
          mood: "graphic and severe",
        },
        capture: { cap: "", opt: "lens_50", expo: [], imperf: [], film: "" },
        style: ["fashion"],
      },
      {
        id: "stud_profile",
        label: { ru: "Профиль", en: "Rim-light profile" },
        fields: {
          location: "black backdrop",
          lighting: "thin rim light outlining the profile",
          pose: "strict profile, chin parallel to the floor",
          outfit: "high-neck knit top, hair pulled tight",
          mood: "sculptural quiet",
        },
        capture: { cap: "", opt: "lens_85", expo: [], imperf: [], film: "" },
        style: ["fashion"],
      },
      {
        id: "stud_stool",
        label: { ru: "Табурет", en: "Stool full-length" },
        fields: {
          location: "grey backdrop with a metal stool",
          lighting: "soft key with a hard edge light",
          pose: "seated on the stool leaning forward, elbows on knees",
          outfit: "oversized white shirt",
          mood: "relaxed test between takes",
        },
        capture: {
          cap: "",
          opt: "lens_50",
          expo: [],
          imperf: [],
          film: "portra",
        },
        style: ["fashion"],
      },
      {
        id: "stud_freckle",
        label: { ru: "Текстура кожи", en: "Skin texture close-up" },
        fields: {
          location: "neutral backdrop, extreme close-up",
          lighting: "raking directional light across the skin",
          pose: "face filling the frame, eyes straight to camera",
          outfit: "thin gold chain, plain top",
          mood: "every pore and freckle visible",
        },
        capture: { cap: "", opt: "lens_85", expo: [], imperf: [], film: "" },
        style: ["fashion"],
      },
      {
        id: "stud_wind",
        label: { ru: "Вентилятор", en: "Fan wind" },
        fields: {
          location: "pale studio backdrop",
          lighting: "steady directional light with a studio fan running",
          pose: "hair mid-motion across the face, caught between frames",
          outfit: "crumpled poplin shirt",
          mood: "movement-test energy",
        },
        capture: {
          cap: "",
          opt: "lens_85",
          expo: [],
          imperf: ["motion"],
          film: "portra",
        },
        style: ["fashion"],
      },
      {
        id: "stud_contact",
        label: { ru: "Контактный лист", en: "Contact sheet turn" },
        fields: {
          location: "grey seamless backdrop",
          lighting: "even hard light",
          pose: "mid-turn of the head, like one frame from a contact sheet",
          outfit: "ribbed tank top",
          mood: "between-poses honesty",
        },
        capture: {
          cap: "",
          opt: "lens_50",
          expo: [],
          imperf: ["crop"],
          film: "",
        },
        style: ["fashion"],
      },
    ],
  },
  // ------------------------------------------------------------------------
  // Fix Pack 11 — seven technique-driven packs (worlds A/B/C).
  // ------------------------------------------------------------------------
  {
    id: "pack_suburb",
    label: { ru: "Suburbia", en: "Suburbia" },
    tagline: {
      ru: "Постановочный пригород: идеальная лужайка и одна тревожная нота",
      en: "Staged suburbia: a perfect lawn and one unsettling note",
    },
    track: "editorial",
    world: "C",
    techniqueIds: ["t_tableau", "t_deadpan"],
    scenes: [
      {
        id: "suburb_lawn",
        techniqueId: "t_tableau",
        label: { ru: "Лужайка", en: "Front lawn" },
        fields: {
          location: "manicured suburban front lawn at golden hour",
          lighting: "warm low sun, long shadows across cut grass",
          pose: "standing perfectly still with a garden hose, deadpan stare into the lens",
          outfit: "pastel house dress and rubber gloves",
          mood: "staged calm with one unsettling accent",
        },
        capture: {
          cap: "film_35mm",
          opt: "lens_50",
          expo: [],
          imperf: ["vignette"],
          film: "gold",
        },
        style: ["fashion"],
      },
      {
        id: "suburb_market",
        techniqueId: "t_tableau",
        label: { ru: "Парковка", en: "Supermarket lot" },
        fields: {
          location: "empty supermarket parking lot, one shopping cart nearby",
          lighting: "flat late-afternoon light, pale sky",
          pose: "seated inside the shopping cart, expression completely blank",
          outfit: "sunday-best coat and white socks",
          mood: "the banal turned slightly wrong",
        },
        capture: {
          cap: "film_35mm",
          opt: "lens_35",
          expo: [],
          imperf: ["tilt"],
          film: "portra",
        },
        style: ["fashion"],
      },
      {
        id: "suburb_pool",
        techniqueId: "t_deadpan",
        label: { ru: "Край бассейна", en: "Pool edge" },
        fields: {
          location: "backyard pool edge with a plastic flamingo",
          lighting: "hard midday sun on turquoise water",
          pose: "sitting rigidly on the pool edge fully dressed",
          outfit: "vintage swim cap and a terry robe",
          mood: "frozen mid-gesture, deadpan",
        },
        capture: {
          cap: "film_35mm",
          opt: "lens_50",
          expo: ["over"],
          imperf: [],
          film: "gold",
        },
        style: ["fashion"],
      },
      {
        id: "suburb_kitchen",
        techniqueId: "t_deadpan",
        label: { ru: "Идеальная кухня", en: "Perfect kitchen" },
        fields: {
          location: "pastel retro kitchen, everything in its place",
          lighting: "even warm artificial glow",
          pose: "holding a jello mold, centered symmetrical frame, zero expression",
          outfit: "an apron over a neat dress",
          mood: "tension from nothing happening",
        },
        capture: {
          cap: "film_35mm",
          opt: "lens_50",
          expo: [],
          imperf: [],
          film: "portra",
        },
        style: ["fashion"],
      },
    ],
  },
  {
    id: "pack_concrete",
    label: { ru: "Concrete", en: "Concrete" },
    tagline: {
      ru: "Серый день, панельки, ноль гламура",
      en: "Grey daylight, panel blocks, zero glamour",
    },
    track: "editorial",
    world: "B",
    techniqueIds: ["t_concrete", "t_flash"],
    scenes: [
      {
        id: "concrete_yard",
        techniqueId: "t_concrete",
        label: { ru: "Двор панельки", en: "Panel-block yard" },
        fields: {
          location: "courtyard between concrete panel blocks",
          lighting: "flat grey overcast, no sun",
          pose: "standing still, hands in pockets, distant gaze",
          outfit: "oversized second-hand leather jacket",
          mood: "muted, unglamorous",
        },
        capture: {
          cap: "raw_dslr",
          opt: "lens_35",
          expo: [],
          imperf: ["tilt"],
          film: "",
        },
        style: [],
      },
      {
        id: "concrete_stairwell",
        techniqueId: "t_concrete",
        label: { ru: "Подъезд", en: "Stairwell" },
        fields: {
          location: "concrete stairwell with peeling paint",
          lighting: "single bare bulb overhead",
          pose: "leaning on the railing, looking down the stairs",
          outfit: "worn hoodie and heavy boots",
          mood: "quiet, raw",
        },
        capture: {
          cap: "raw_dslr",
          opt: "lens_35",
          expo: ["under"],
          imperf: [],
          film: "",
        },
        style: [],
      },
      {
        id: "concrete_underpass",
        techniqueId: "t_concrete",
        label: { ru: "Переход", en: "Underpass" },
        fields: {
          location: "pedestrian underpass with tiled walls",
          lighting: "cold fluorescent tubes",
          pose: "walking toward the camera mid-step",
          outfit: "long dark coat",
          mood: "detached, urban",
        },
        capture: {
          cap: "raw_dslr",
          opt: "lens_35",
          expo: ["high_iso"],
          imperf: ["motion"],
          film: "",
        },
        style: [],
      },
      {
        id: "concrete_flash",
        techniqueId: "t_flash",
        label: { ru: "Вспышка у гаража", en: "Flash by the garage" },
        fields: {
          location: "night, a rusted garage door",
          lighting: "direct on-camera flash killing all depth",
          pose: "caught rather than posed, mid-laugh",
          outfit: "a thin dress despite the cold",
          mood: "raw, unretouched",
        },
        capture: { cap: "disposable", opt: "", expo: [], imperf: [], film: "" },
        style: [],
      },
    ],
  },
  {
    id: "pack_cup",
    label: { ru: "First Sip", en: "First Sip" },
    tagline: {
      ru: "Утро и пар над чашкой: кадр между глотками",
      en: "Morning and steam over a cup: frames between sips",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_cup", "t_mirror"],
    scenes: [
      {
        id: "cup_morning",
        techniqueId: "t_cup",
        label: { ru: "Первый глоток", en: "First sip" },
        fields: {
          location: "kitchen table by the window",
          lighting: "morning window light on the steam",
          pose: "first sip, eyes elsewhere, the cup entering the frame edge",
          outfit: "yesterday's oversized t-shirt",
          mood: "just woke up, unhurried",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["miss_foc"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "cup_windowsill",
        techniqueId: "t_cup",
        label: { ru: "Подоконник", en: "Windowsill" },
        fields: {
          location: "windowsill with a chipped mug and ring stains",
          lighting: "soft grey daylight",
          pose: "knees pulled up, mug held with both hands",
          outfit: "wool socks and an old sweater",
          mood: "private, warm",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["crop"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "cup_cafe",
        techniqueId: "t_cup",
        label: { ru: "У окна кафе", en: "Cafe window" },
        fields: {
          location: "cafe window seat, a paper cup on the table",
          lighting: "daylight through the glass, street reflections",
          pose: "looking out the window, cup near the face",
          outfit: "coat still on",
          mood: "in-between errands",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["tilt"],
          film: "",
        },
        style: ["ugc_raw", "lifestyle"],
      },
      {
        id: "cup_mirror",
        techniqueId: "t_mirror",
        label: { ru: "Чашка у зеркала", en: "Mirror with a cup" },
        fields: {
          location: "bathroom mirror, a mug on the shelf",
          lighting: "single warm bathroom bulb",
          pose: "mirror selfie, phone covering part of the face, mug in the other hand",
          outfit: "a towel on the head",
          mood: "checking rather than posing",
        },
        capture: { cap: "iphone_hdr", opt: "", expo: [], imperf: [], film: "" },
        style: ["selfie", "ugc_raw"],
      },
    ],
  },
  {
    id: "pack_transit",
    label: { ru: "Transit", en: "Transit" },
    tagline: {
      ru: "Между местами: поезд, автобус, такси, отражения в стекле",
      en: "Between places: train, bus, taxi, reflections in glass",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_transit", "t_squint"],
    scenes: [
      {
        id: "transit_train",
        techniqueId: "t_transit",
        label: { ru: "Окно поезда", en: "Train window" },
        fields: {
          location: "train window seat, landscape rushing past",
          lighting: "window daylight, reflections layered on the glass",
          pose: "temple resting on the glass, headphones in",
          outfit: "puffer jacket, a tote on the lap",
          mood: "tired, in-between places",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["motion"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "transit_bus",
        techniqueId: "t_transit",
        label: { ru: "Ночной автобус", en: "Night bus" },
        fields: {
          location: "night bus seat, city lights outside",
          lighting: "flickering carriage light",
          pose: "slumped selfie, half asleep",
          outfit: "hood up",
          mood: "end of the day",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["high_iso"],
          imperf: [],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "transit_taxi",
        techniqueId: "t_transit",
        label: { ru: "Заднее сиденье", en: "Backseat" },
        fields: {
          location: "taxi backseat",
          lighting: "passing streetlights sweeping the face",
          pose: "looking at the phone glow, seatbelt across",
          outfit: "evening outfit after the party",
          mood: "quiet ride home",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under"],
          imperf: [],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "transit_sun",
        techniqueId: "t_squint",
        label: { ru: "Солнце в глаза", en: "Sun in the eyes" },
        fields: {
          location: "tram seat on the sunny side",
          lighting: "low golden sun striping across the face",
          pose: "squinting into the light, half-smile",
          outfit: "a scarf and a warm coat",
          mood: "soft morning",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["glare"],
          imperf: [],
          film: "",
        },
        style: ["ugc_raw"],
      },
    ],
  },
  {
    id: "pack_wide",
    label: { ru: "0.5x", en: "0.5x" },
    tagline: {
      ru: "Ультра-ширик вплотную: игра с искажением, гримасы, смаз",
      en: "Ultrawide up close: distortion play, grimaces, blur",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_ultrawide", "t_grimace", "t_blur"],
    scenes: [
      {
        id: "wide_floor",
        techniqueId: "t_ultrawide",
        label: { ru: "С пола", en: "From the floor" },
        fields: {
          location: "bedroom floor, ultra-wide lens held too close",
          lighting: "any available light, unflattering and honest",
          pose: "sprawled toward the lens, playing with the distortion",
          outfit: "home clothes",
          mood: "silly, self-aware",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "wide",
          expo: [],
          imperf: ["crop"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "wide_elevator",
        techniqueId: "t_ultrawide",
        label: { ru: "Лифт", en: "Elevator" },
        fields: {
          location: "elevator mirror, warped proportions",
          lighting: "harsh top light",
          pose: "ultra-wide mirror shot at a deliberately bad angle",
          outfit: "gym fit and slides",
          mood: "ironic",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "wide",
          expo: [],
          imperf: ["tilt"],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "wide_grimace",
        techniqueId: "t_grimace",
        label: { ru: "Гримаса", en: "Grimace" },
        fields: {
          location: "kitchen, face right against the lens",
          lighting: "flat unflattering light",
          pose: "exaggerated grimace instead of a smile",
          outfit: "hair clips holding back the fringe",
          mood: "comic, unguarded",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "wide",
          expo: [],
          imperf: [],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "wide_blur",
        techniqueId: "t_blur",
        label: { ru: "Смаз", en: "Blur" },
        fields: {
          location: "hallway at dusk",
          lighting: "dim warm interior light",
          pose: "spinning mid-movement, face slightly ghosted",
          outfit: "a loose dress in motion",
          mood: "deliberate blur kept as mood",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under"],
          imperf: ["motion"],
          film: "",
        },
        style: ["ugc_raw"],
      },
    ],
  },
  {
    id: "pack_polaroid90",
    label: { ru: "Polaroid ’95", en: "Polaroid ’95" },
    tagline: {
      ru: "Семейный архив: ковёр, застолье, белая рамка",
      en: "Family archive: carpet wall, feast table, white frame",
    },
    track: "editorial",
    world: "C",
    techniqueIds: ["t_polaroid90"],
    scenes: [
      {
        id: "p90_carpet",
        techniqueId: "t_polaroid90",
        label: { ru: "Ковёр на стене", en: "Carpet wall" },
        fields: {
          location: "living room with a patterned carpet on the wall",
          lighting: "bare ceiling bulb",
          pose: "posing stiffly the way people posed for film",
          outfit: "a knit vest over a shirt",
          mood: "family-archive earnestness",
        },
        capture: {
          cap: "polaroid",
          opt: "",
          expo: [],
          imperf: ["film_dust"],
          film: "vintage",
        },
        style: [],
      },
      {
        id: "p90_feast",
        techniqueId: "t_polaroid90",
        label: { ru: "Застолье", en: "Feast table" },
        fields: {
          location: "kitchen table set for a family feast",
          lighting: "built-in flash, harsh and flat",
          pose: "caught mid-toast, looking straight into the camera",
          outfit: "the best sweater",
          mood: "loud, warm, dated",
        },
        capture: {
          cap: "polaroid",
          opt: "",
          expo: [],
          imperf: [],
          film: "vintage",
        },
        style: [],
      },
      {
        id: "p90_balcony",
        techniqueId: "t_polaroid90",
        label: { ru: "Балкон", en: "Balcony" },
        fields: {
          location: "cluttered balcony with drying laundry",
          lighting: "pale morning light",
          pose: "leaning on the railing, squinting at the yard",
          outfit: "a robe over pajamas",
          mood: "unhurried nineties morning",
        },
        capture: {
          cap: "polaroid",
          opt: "",
          expo: ["over"],
          imperf: [],
          film: "vintage",
        },
        style: [],
      },
      {
        id: "p90_bench",
        techniqueId: "t_polaroid90",
        label: { ru: "Лавка у подъезда", en: "Courtyard bench" },
        fields: {
          location: "bench by the building entrance",
          lighting: "overcast daylight",
          pose: "sitting close to a friend, stiff smiles",
          outfit: "denim on denim",
          mood: "posed but sincere",
        },
        capture: {
          cap: "polaroid",
          opt: "",
          expo: [],
          imperf: ["film_dust"],
          film: "vintage",
        },
        style: [],
      },
    ],
  },
  {
    id: "pack_squint",
    label: { ru: "Squint", en: "Squint" },
    tagline: {
      ru: "Низкое солнце в лицо и хрупкое спокойствие",
      en: "Low sun in the face and fragile calm",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_squint", "t_fragility"],
    scenes: [
      {
        id: "squint_curtain",
        techniqueId: "t_squint",
        label: { ru: "Штора", en: "Curtain gap" },
        fields: {
          location: "bedroom, sun through the curtain gap",
          lighting: "one blown highlight stripe across the face",
          pose: "eyes squinting into the light",
          outfit: "bare shoulders under a blanket",
          mood: "slow morning",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["glare"],
          imperf: [],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "squint_car",
        techniqueId: "t_squint",
        label: { ru: "Пассажирское", en: "Passenger seat" },
        fields: {
          location: "car passenger seat at sunset",
          lighting: "low golden sun through the windshield",
          pose: "half-smile against the light, a hand shielding the eyes",
          outfit: "seatbelt over a hoodie",
          mood: "golden and tired",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["glare"],
          imperf: ["crop"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "squint_balcony",
        techniqueId: "t_fragility",
        label: { ru: "Вечерний балкон", en: "Evening balcony" },
        fields: {
          location: "balcony rail at golden hour",
          lighting: "sun striping across the face, flyaway hairs lit",
          pose: "leaning into the light, eyes almost closed",
          outfit: "a thin knit against the wind",
          mood: "fragile calm",
        },
        capture: { cap: "iphone_hdr", opt: "", expo: [], imperf: [], film: "" },
        style: ["ugc_raw"],
      },
      {
        id: "squint_window",
        techniqueId: "t_fragility",
        label: { ru: "У окна", en: "By the window" },
        fields: {
          location: "by a tall window, pale daylight",
          lighting: "pale soft daylight",
          pose: "guard down, arms wrapped around the knees",
          outfit: "an oversized shirt",
          mood: "pale muted honesty",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["miss_foc"],
          film: "",
        },
        style: ["ugc_raw"],
      },
    ],
  },
  {
    id: "pack_fitting",
    label: { ru: "Fitting Room", en: "Fitting Room" },
    tagline: {
      ru: "Бэкстейдж примерки: рейл, булавки, чужие руки",
      en: "Fitting backstage: the rail, the pins, someone else's hands",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_fitting", "t_polaroid_fit"],
    scenes: [
      {
        id: "fit_rail",
        techniqueId: "t_fitting",
        label: { ru: "Рейл с булавками", en: "Rail with pins" },
        fields: {
          location: "fitting room corner, a rolling rail of numbered garments",
          lighting: "flat studio daylight from a big window",
          pose: "standing between the rail and the mirror, tag still on the sleeve",
          outfit: "sample dress one size off, clipped at the back",
          mood: "working, not posing",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["crop"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "fit_mirror",
        techniqueId: "t_fitting",
        label: { ru: "Зеркало студии", en: "Studio mirror" },
        fields: {
          location: "full-length studio mirror with stickers on the frame",
          lighting: "even fluorescent fill, no glamour",
          pose: "checking the fit in the mirror, phone half-raised",
          outfit: "muslin toile pinned at the waist",
          mood: "between changes, focused",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["tilt"],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "fit_hand",
        techniqueId: "t_fitting",
        label: { ru: "Чужая рука", en: "Someone else's hand" },
        fields: {
          location:
            "fitting room, a stylist's hand entering the frame with a pin",
          lighting: "flat working light",
          pose: "arms slightly lifted while the hem is being pinned",
          outfit: "half-fitted sample jacket",
          mood: "patient, mind elsewhere",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["miss_foc"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "fit_polaroid",
        techniqueId: "t_polaroid_fit",
        label: { ru: "Переснятый полароид", en: "Re-shot polaroid" },
        fields: {
          location:
            "a fitting polaroid taped to the studio wall, re-shot on a phone",
          lighting: "ceiling light glare on the glossy print",
          pose: "neutral full-length stance inside the polaroid frame",
          outfit: "the same sample outfit, front view",
          mood: "archival, matter-of-fact",
        },
        capture: { cap: "iphone_hdr", opt: "", expo: [], imperf: [], film: "" },
        style: ["ugc_raw"],
      },
    ],
  },
  {
    id: "pack_steam",
    label: { ru: "Steam", en: "Steam" },
    tagline: {
      ru: "Запотевшее зеркало и мокрые волосы: причина → следствие",
      en: "Fogged mirror and wet hair: cause and effect",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_shower", "t_mirror"],
    scenes: [
      {
        id: "steam_fog",
        techniqueId: "t_shower",
        label: { ru: "Запотевшее зеркало", en: "Fogged mirror" },
        fields: {
          location: "small bathroom, mirror fully fogged",
          lighting: "single warm bulb above the mirror diffused by steam",
          pose: "phone selfie into the fog, silhouette barely readable",
          outfit: "a towel wrapped, shoulders bare",
          mood: "just out of the shower, mind still elsewhere",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["miss_foc"],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "steam_hair",
        techniqueId: "t_shower",
        label: { ru: "Мокрые волосы", en: "Wet hair" },
        fields: {
          location: "bathroom doorway",
          lighting: "warm bathroom light spilling into a dark hallway",
          pose: "combing wet hair back with fingers, eyes down",
          outfit: "an old t-shirt with a dark damp patch on the collar",
          mood: "slow, unguarded",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["crop"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "steam_robe",
        techniqueId: "t_shower",
        label: { ru: "Халат", en: "Bathrobe" },
        fields: {
          location: "edge of the bathtub",
          lighting: "grey daylight from a small frosted window",
          pose: "sitting on the tub edge, towel turban, phone in one hand",
          outfit: "a worn waffle bathrobe",
          mood: "no plans yet",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["tilt"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "steam_streak",
        techniqueId: "t_mirror",
        label: { ru: "Протёртая полоса", en: "Wiped streak" },
        fields: {
          location: "fogged mirror with one hand-wiped streak",
          lighting: "warm bulb, steam haze at the frame edges",
          pose: "face visible only inside the wiped streak, phone below the chin",
          outfit: "bare shoulders, a towel",
          mood: "checking rather than posing",
        },
        capture: { cap: "iphone_hdr", opt: "", expo: [], imperf: [], film: "" },
        style: ["selfie", "ugc_raw"],
      },
    ],
  },
  {
    id: "pack_4am",
    label: { ru: "4AM", en: "4AM" },
    tagline: {
      ru: "Не спится: свет экрана и чернота квартиры",
      en: "Can't sleep: screen glow and a dark apartment",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_4am", "t_screen"],
    scenes: [
      {
        id: "am4_screen",
        techniqueId: "t_4am",
        label: { ru: "Свет экрана", en: "Screen glow" },
        fields: {
          location: "bed in a dark room",
          lighting: "cold white phone light from below, everything else black",
          pose: "lying on the side, face lit by the screen",
          outfit: "a blanket up to the chin",
          mood: "slightly too awake, alone",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under"],
          imperf: [],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "am4_kitchen",
        techniqueId: "t_4am",
        label: { ru: "Кухня в темноте", en: "Kitchen in the dark" },
        fields: {
          location: "kitchen at night, no lights on",
          lighting: "phone screen and a distant streetlight through the window",
          pose: "leaning on the counter with a glass of water",
          outfit: "an oversized sleep shirt",
          mood: "quiet, not tired enough",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under"],
          imperf: ["motion"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "am4_sill",
        techniqueId: "t_4am",
        label: { ru: "Подоконник ночью", en: "Windowsill at night" },
        fields: {
          location: "windowsill, city lights out of focus behind the glass",
          lighting: "cold screen light from the phone in her lap",
          pose: "knees pulled up, temple against the cold glass",
          outfit: "a blanket over the shoulders",
          mood: "thoughts louder than the street",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under"],
          imperf: ["crop"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "am4_awake",
        techniqueId: "t_screen",
        label: { ru: "Не спится", en: "Can't sleep" },
        fields: {
          location: "dark bedroom, a dim clock glowing on the shelf",
          lighting: "only the phone screen, cold and flat",
          pose: "scrolling, eyes half closed",
          outfit: "yesterday's t-shirt",
          mood: "4am honesty",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under"],
          imperf: ["miss_foc"],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
    ],
  },
  {
    id: "pack_screen",
    label: { ru: "Screenlife", en: "Screenlife" },
    tagline: {
      ru: "Жизнь через экран: скрин, пересъёмка, видеозвонок",
      en: "Life through the screen: screenshots, re-shoots, video calls",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_screen"],
    scenes: [
      {
        id: "screen_shot",
        techniqueId: "t_screen",
        label: { ru: "Скрин", en: "Screenshot" },
        fields: {
          location: "a phone screenshot of her own story, status bar visible",
          lighting: "screen-light flatness, interface glare",
          pose: "the frame inside the frame: her selfie inside the UI",
          outfit: "whatever the story caught",
          mood: "social feed relic",
        },
        capture: { cap: "iphone_hdr", opt: "", expo: [], imperf: [], film: "" },
        style: ["ugc_raw"],
      },
      {
        id: "screen_reshoot",
        techniqueId: "t_screen",
        label: { ru: "Пересъёмка экрана", en: "Re-shot screen" },
        fields: {
          location:
            "a laptop screen re-shot on a phone, pixels and glare visible",
          lighting: "screen glow in a dim room",
          pose: "her paused video frame on the screen",
          outfit: "as in the paused frame",
          mood: "found-footage feeling",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["miss_foc"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "screen_call",
        techniqueId: "t_screen",
        label: { ru: "Видеозвонок", en: "Video call" },
        fields: {
          location: "video call grid, her window among others",
          lighting: "laptop light, uneven webcam exposure",
          pose: "chin on palm, listening, camera slightly below the face",
          outfit: "a home sweater",
          mood: "half-present",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["tilt"],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "screen_gallery",
        techniqueId: "t_screen",
        label: { ru: "Галерея", en: "Gallery" },
        fields: {
          location: "phone gallery grid re-shot at an angle",
          lighting: "screen glare with a window reflection",
          pose: "thumbnails of the same day, her face repeated small",
          outfit: "varies across the thumbnails",
          mood: "an archive of one day",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["crop"],
          film: "",
        },
        style: ["ugc_raw"],
      },
    ],
  },
  {
    id: "pack_motion",
    label: { ru: "Motion", en: "Motion" },
    tagline: {
      ru: "Движение в статичном кадре: смаз, поворот, полусмех",
      en: "Motion inside a still frame: blur, turns, half-laughs",
    },
    track: "ugc",
    world: "A",
    techniqueIds: ["t_blur", "t_grimace"],
    scenes: [
      {
        id: "motion_home",
        techniqueId: "t_blur",
        label: { ru: "Движение дома", en: "Moving at home" },
        fields: {
          location: "living room, mid-step towards the camera",
          lighting: "soft window daylight",
          pose: "caught mid-motion, hair swinging",
          outfit: "socks and an oversized shirt",
          mood: "half-laugh, unposed",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["motion"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "motion_laugh",
        techniqueId: "t_grimace",
        label: { ru: "Полусмех", en: "Half-laugh" },
        fields: {
          location: "kitchen table, phone at arm's length",
          lighting: "flat daylight",
          pose: "strained comic grimace, eyes not laughing",
          outfit: "a home hoodie",
          mood: "irony as distance",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["tilt"],
          film: "",
        },
        style: ["selfie", "ugc_raw"],
      },
      {
        id: "motion_turn",
        techniqueId: "t_blur",
        label: { ru: "Поворот", en: "The turn" },
        fields: {
          location: "hallway mirror",
          lighting: "warm ceiling light",
          pose: "turning away mid-frame, face smeared by motion",
          outfit: "a coat halfway on",
          mood: "leaving in a hurry",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["motion"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "motion_shake",
        techniqueId: "t_blur",
        label: { ru: "Шевелёнка", en: "Camera shake" },
        fields: {
          location: "bedroom, dropping onto the bed",
          lighting: "evening lamp light",
          pose: "the whole frame shaken, limbs doubled by blur",
          outfit: "pajama shorts and a tee",
          mood: "too much energy for the hour",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: [],
          imperf: ["motion"],
          film: "",
        },
        style: ["ugc_raw"],
      },
    ],
  },
  {
    id: "pack_night",
    label: { ru: "Night Kitchen", en: "Night Kitchen" },
    tagline: {
      ru: "Лампа накаливания и чернота окна: между двумя делами",
      en: "A bare warm bulb and a black window: between two tasks",
    },
    track: "ugc",
    world: "B",
    techniqueIds: ["t_kitchen_night", "t_flash"],
    scenes: [
      {
        id: "night_bulb",
        techniqueId: "t_kitchen_night",
        label: { ru: "Лампа накаливания", en: "Bare bulb" },
        fields: {
          location: "small kitchen at night, one bare warm bulb",
          lighting: "single incandescent bulb, black window behind",
          pose: "standing at the counter, eating straight from the pan",
          outfit: "an old robe over a t-shirt",
          mood: "between two tasks, not performing",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under"],
          imperf: [],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "night_window",
        techniqueId: "t_kitchen_night",
        label: { ru: "Чернота окна", en: "Black window" },
        fields: {
          location:
            "kitchen window at night, her reflection doubled in the glass",
          lighting: "warm bulb inside, nothing outside",
          pose: "leaning on the sill, mug in hand, looking at nothing",
          outfit: "a stretched sweater",
          mood: "flat, unhurried",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under"],
          imperf: ["tilt"],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "night_fridge",
        techniqueId: "t_kitchen_night",
        label: { ru: "Холодильник", en: "Fridge" },
        fields: {
          location: "open fridge in a dark kitchen",
          lighting: "cold fridge light on the face, warm bulb far behind",
          pose: "standing in the fridge light deciding on nothing",
          outfit: "shorts and wool socks",
          mood: "3am appetite, zero drama",
        },
        capture: {
          cap: "iphone_hdr",
          opt: "",
          expo: ["under"],
          imperf: [],
          film: "",
        },
        style: ["ugc_raw"],
      },
      {
        id: "night_flash",
        techniqueId: "t_flash",
        label: { ru: "Вспышка", en: "Flash" },
        fields: {
          location: "kitchen doorway at night",
          lighting:
            "direct hard flash, background falling into black a meter behind",
          pose: "caught mid-turn with a fork in hand",
          outfit: "a robe slipping off one shoulder",
          mood: "apathy, hanger shoulders",
        },
        capture: { cap: "iphone_hdr", opt: "", expo: [], imperf: [], film: "" },
        style: ["ugc_raw"],
      },
    ],
  },
];

```


---

## SOURCE FILE: `lib/engines.ts`
SHA-256: `c425719e8365dd7c62680dae5a6919e24895890bd9f7e39b00e568e798e58060`

```ts
// ============================================================================
// ENGINE CANON — single source of truth for all prompt-building rules.
// Components NEVER hardcode prompt logic; everything routes through here.
// Update engine rules ONLY in this file.
// ============================================================================

import { canonMood } from "./canon";
import type {
  BuildResult,
  CaptureSelection,
  CharacterPassport,
  EngineId,
  Mode,
  SceneSpec,
} from "./types";
import { wc as budgetWc } from "./parse";
import { TECHNIQUE_BY_ID, techniqueText } from "./techniques";

// ----------------------------------------------------------------------------
// CONSTANTS (canon strings — always English)
// ----------------------------------------------------------------------------

// DEV describes the character's phone as a physical prop/device (not a shooting style).
export const DEV = "black iPhone 15 Pro Max in a transparent silicone case";

export const NEG_BASE =
  "beauty filter, skin smoothing, airbrushed skin, blemish removal, pore filling, face symmetry correction, nose reshaping, matte plastic skin";

export const NEG_UGC =
  "cinematic color grading, studio lighting, gimbal stabilization, instagram filter, watermark, text, logo";

// NEG_KLING is a STANDALONE canon string. Do NOT compose it from NEG_BASE + NEG_UGC.
export const NEG_KLING =
  "clothing changes, hair style changes, de-aging, extra limbs, joint distortion, background flickering, beauty filter, skin smoothing, airbrushed skin, face symmetry correction, nose reshaping, matte plastic skin";

export const NEG_VEO = `${NEG_BASE}, ${NEG_UGC}, subtitles, text overlays, on-screen text, captions, distorted hands, lip-sync issues, unnatural movements, oversaturation`;

export const POS_SKIN =
  "natural skin texture with visible pores and fine vellus hair, subtle sebum highlights in the T-zone, natural pigmentation with moles and freckles preserved, anatomical facial asymmetry, sharp focus";

export const SENSOR =
  "subtle digital sensor noise, natural dynamic range, slight handheld imperfection";

// Negative field exists ONLY for Kling and Veo.
// Nano / Seedance / Omni Flash use POSITIVE realism (POS_SKIN / SENSOR).
export const ENGINES_WITH_NEGATIVE: EngineId[] = [
  "kling_3",
  "veo_scene",
  "veo_broll",
];

// ----------------------------------------------------------------------------
// CAPTURE PRESETS (verbatim canon .mod strings)
// ----------------------------------------------------------------------------

export const CAP: Record<string, string> = {
  iphone_hdr:
    "shot on iPhone, Smart HDR, computational photography look, slightly oversharpened",
  raw_dslr:
    "full-frame DSLR RAW capture, natural dynamic range, true-to-life color",
  film_35mm:
    "35mm film photograph, organic film grain, subtle halation, analog color",
  film_16mm: "16mm film still, heavy grain, soft gate weave",
  polaroid: "Polaroid instant photo, washed colors, soft focus, white frame",
  disposable:
    "disposable camera with direct on-camera flash, harsh shadows, slight red-eye, date stamp",
  cctv: "low-resolution webcam/CCTV frame, compression artifacts, fixed high angle",
  gopro: "GoPro ultra-wide action cam, barrel distortion, high contrast",
};

export const OPT: Record<string, string> = {
  lens_35: "35mm focal length, mild environmental context",
  lens_50: "50mm focal length, natural perspective",
  lens_85: "85mm portrait compression, shallow depth of field",
  wide: "wide-angle lens distortion, stretched edges",
  bokeh: "shallow depth of field, creamy bokeh, subject isolation",
};

export const EXPO: Record<string, string> = {
  over: "slightly overexposed, blown highlights",
  under: "underexposed, low-key shadows, crushed blacks",
  high_iso: "high ISO noise, visible sensor grain",
  mixed_wb: "mixed white balance, color temperature shift",
  glare: "lens flare and glare, light leaks",
};

export const IMPERF: Record<string, string> = {
  tilt: "slightly tilted horizon, casual framing",
  motion: "subtle motion blur, handheld shake",
  miss_foc: "slightly missed focus, soft focus point",
  chroma: "chromatic aberration on high-contrast edges",
  vignette: "natural lens vignetting",
  film_dust: "dust and scratches, film artifacts",
  jpeg: "JPEG compression artifacts, slight banding",
  crop: "imperfect framing, subject partially cropped at edge",
};

export const FILM: Record<string, string> = {
  portra: "Kodak Portra 400 palette, warm natural skin tones",
  gold: "Kodak Gold 200, warm nostalgic cast",
  fuji: "Fujifilm color science, green-leaning shadows",
  log: "flat log color profile, ungraded",
  vintage: "faded vintage look, lifted blacks",
};

// ----------------------------------------------------------------------------
// Fix Pack 11 — WORLD LAYER + TECHNIQUE GATE
// ----------------------------------------------------------------------------

// World suffixes appended to the MOOD layer. A = diary/situation, B =
// underground document, C = kitsch/cinema. Film language is allowed ONLY in C.
export const WORLD_SUFFIX: Record<"A" | "B" | "C", string> = {
  A: "unstaged phone-diary moment caught between actions, honest digital capture",
  B: "raw underground document, harsh honest light, zero glamour",
  C: "deliberately staged film-still world, every detail art-directed, one quiet wrong note",
};

// Film/instant vocabulary is a world-C privilege.
export const FILM_TERMS = [
  "film",
  "polaroid",
  "kodak",
  "fuji",
  "35mm",
  "16mm",
  "analog",
  "halation",
  "instant",
];

export function filmAllowed(world?: "A" | "B" | "C"): boolean {
  return world === "C";
}

/** Outside world C, film stocks and film-look captures are stripped. */
export function filterCaptureForWorld(
  c: CaptureSelection,
  world?: "A" | "B" | "C",
): CaptureSelection {
  if (!world || world === "C") return c;
  const filmCaps = ["film_35mm", "film_16mm", "polaroid"];
  return {
    ...c,
    film: "",
    cap: filmCaps.includes(c.cap) ? "iphone_hdr" : c.cap,
    imperf: c.imperf.filter((k) => k !== "film_dust"),
  };
}

// Hard ban-list: these must NEVER appear in any prompt-facing string.
export const BANNED_TERMS = [
  "goldin",
  "teller",
  "tillmans",
  "corinne day",
  "nadia lee cohen",
  "purienne",
  "simona kust",
  "consani",
  "schafer",
  "westwood",
  "porodina",
  "beleiu",
  "carlijn jacobs",
  "david sims",
  "heroin chic",
];

// Style tag phrases (positive, appended to MOOD / Style layer)
export const STYLE_PHRASES: Record<string, string> = {
  ugc_raw: "raw UGC look, casual unfiltered feel",
  fashion: "editorial fashion styling",
  luxury: "quiet luxury aesthetic, premium materials",
  travel: "travel content vibe, wanderlust framing",
  fitness: "fitness content energy, athletic tone",
  dating: "dating-profile candid warmth",
  selfie: "casual phone selfie framing",
  lifestyle: "everyday lifestyle authenticity",
};

// Realism toggles (positive phrases only — no beauty/airbrush contradiction)
export const REALISM_PHRASES: Record<string, string> = {
  anti_b: "no beauty filter, unretouched",
  sensor: SENSOR,
  skin: POS_SKIN,
  no_ai: "indistinguishable from a real photo, no AI artifacts",
  imperf: "small natural imperfections kept intact",
};

export const STYLE_KEYS = Object.keys(STYLE_PHRASES);
export const REALISM_KEYS = Object.keys(REALISM_PHRASES);

// ----------------------------------------------------------------------------
// ENGINE METADATA (UI cards)
// ----------------------------------------------------------------------------

export interface EngineMeta {
  id: EngineId;
  name: string;
  mode: Mode;
  role: { ru: string; en: string };
  hasNegative: boolean;
  hasSeed: boolean;
}

export const ENGINE_META: EngineMeta[] = [
  {
    id: "nano_pro",
    name: "Nano Banana Pro",
    mode: "photo",
    role: { ru: "Фото — базовый кадр", en: "Photo - the base frame" },
    hasNegative: false,
    hasSeed: false,
  },
  {
    id: "kling_3",
    name: "Kling 3.0",
    mode: "video",
    role: { ru: "Оживить фото", en: "Animate the photo" },
    hasNegative: true,
    hasSeed: false,
  },
  {
    id: "seedance_2",
    name: "Seedance 2.5",
    mode: "video",
    role: { ru: "B-roll и хуки", en: "B-roll and hooks" },
    hasNegative: false,
    hasSeed: false,
  },
  {
    id: "veo_scene",
    name: "Veo 3.1",
    mode: "video",
    role: { ru: "Диалоги и сцены", en: "Dialogue and scenes" },
    hasNegative: true,
    hasSeed: false,
  },
  {
    id: "omni_flash",
    name: "Gemini Omni Flash",
    mode: "video",
    role: { ru: "Доработать готовый клип", en: "Refine an existing clip" },
    hasNegative: false,
    hasSeed: false,
  },
];

export const VIDEO_ENGINES = ENGINE_META.filter((e) => e.mode === "video");

// Word limits per engine
export const WORD_LIMITS: Record<string, { min: number; max: number }> = {
  nano_full: { min: 150, max: 250 },
  nano_tight: { min: 80, max: 150 },
  seedance: { min: 50, max: 70 },
  veo: { min: 100, max: 150 },
};

// ----------------------------------------------------------------------------
// mods() — assemble capture presets into a technical string
// ----------------------------------------------------------------------------

export function mods(c: CaptureSelection): string {
  const parts: string[] = [];
  if (c.cap && CAP[c.cap]) parts.push(CAP[c.cap]);
  if (c.opt && OPT[c.opt]) parts.push(OPT[c.opt]);
  for (const k of c.expo) if (EXPO[k]) parts.push(EXPO[k]);
  for (const k of c.imperf) if (IMPERF[k]) parts.push(IMPERF[k]);
  if (c.film && FILM[c.film]) parts.push(FILM[c.film]);
  return parts.join(", ");
}

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function realismString(realism: string[]): string {
  return realism
    .map((k) => REALISM_PHRASES[k])
    .filter(Boolean)
    .join(", ");
}

function styleString(style: string[]): string {
  return style
    .map((k) => STYLE_PHRASES[k])
    .filter(Boolean)
    .join(", ");
}

/** Clamp a text to a max word count (soft — trims trailing words). */
export function wc(text: string, max: number): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= max) return text;
  return words.slice(0, max).join(" ");
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Approximate token count (chars/4 heuristic). */
export function approxTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function identityText(
  spec: SceneSpec,
  character: CharacterPassport | null,
  hasRef: boolean,
): string {
  // Principle: replication > description. Ref present => micro lock.
  if (hasRef) {
    const micro = character?.identity.micro || "same as reference (photo 1)";
    return micro;
  }
  const level = spec.subject.identityLevel;
  if (character) {
    if (level === "full" && character.identity.full)
      return character.identity.full;
    if (level === "mid" && character.identity.mid)
      return character.identity.mid;
    if (character.identity.micro) return character.identity.micro;
  }
  return "consistent character identity as described";
}

export function anomalyText(character: CharacterPassport | null): string {
  if (!character) return "";
  const parts: string[] = [];
  const cb = character.anomalyLock.checkboxes;
  const CB_PHRASES: Record<string, string> = {
    moles: "natural moles preserved in exact positions",
    freckles: "light freckles preserved",
    asymmetry: "slight natural facial asymmetry preserved",
    scar: "small scar preserved",
    heterochromia: "heterochromia preserved",
    uneven_teeth: "slightly uneven teeth preserved",
    skin_texture: "real skin texture preserved",
  };
  for (const k of cb) if (CB_PHRASES[k]) parts.push(CB_PHRASES[k]);
  if (character.anomalyLock.freeText.trim())
    parts.push(character.anomalyLock.freeText.trim());
  return parts.join(", ");
}

const INTENSITY_PHRASE: Record<string, string> = {
  "0.3": "subtle restrained motion",
  "0.5": "natural moderate motion",
  "0.7": "lively pronounced motion",
};

// ----------------------------------------------------------------------------
// build() per engine
// ----------------------------------------------------------------------------

export interface BuildOptions {
  character: CharacterPassport | null;
  hasReference: boolean;
  compress: boolean; // Nano tight mode
  variants: number; // 1..4
}

/**
 * [1] Nano Banana Pro (PHOTO). Reasoning model. NO seed, NO negative.
 * Block order (strict): IDENTITY -> SCENE/POSE -> CLOTHING -> ANOMALY ANCHOR -> TECHNICAL -> MOOD.
 * Key info duplicated at START and END (U-attention).
 */
function buildNano(spec: SceneSpec, opts: BuildOptions): BuildResult[] {
  const identity = identityText(spec, opts.character, opts.hasReference);
  const scenePose = [spec.location, spec.lighting, spec.pose]
    .filter(Boolean)
    .join(", ");
  const clothing = spec.outfit || "casual everyday outfit";
  const anomaly = anomalyText(opts.character);
  const device = opts.character?.device || DEV;
  const technical = [
    device,
    mods(filterCaptureForWorld(spec.capture, spec.world)),
    realismString(spec.realism),
  ]
    .filter(Boolean)
    .join(", ");
  // Fix Pack 11.3: "who she is" appended to MOOD so every prompt carries her archetype.
  const moodCanon = canonMood(opts.character?.canon);
  const mood = [
    spec.mood,
    styleString(spec.style),
    spec.world ? WORLD_SUFFIX[spec.world] : "",
    moodCanon || "",
  ]
    .filter(Boolean)
    .join(", ");

  const limit = opts.compress ? WORD_LIMITS.nano_tight : WORD_LIMITS.nano_full;

  const variantAngles = [
    "",
    "slightly different camera angle, same scene",
    "alternative natural light direction, same scene",
    "reframed composition, same scene",
  ];

  const results: BuildResult[] = [];
  for (let v = 0; v < opts.variants; v++) {
    const blocks = [
      `IDENTITY: ${identity}.`,
      `SCENE/POSE: ${scenePose || "natural candid moment"}${variantAngles[v] ? ", " + variantAngles[v] : ""}.`,
      // Fix Pack 11: the technique bundle (camera reason + light + state +
      // surface + artifact) is one indivisible atom of the visual system.
      // Fix Pack 12: modifier layers (Fragile / Deadpan) ride on top of the
      // scene technique as extra phrases inside the same TECHNIQUE block.
      (() => {
        const parts: string[] = [];
        if (spec.technique && TECHNIQUE_BY_ID[spec.technique])
          parts.push(techniqueText(TECHNIQUE_BY_ID[spec.technique]));
        for (const m of spec.modifiers || [])
          if (TECHNIQUE_BY_ID[m] && m !== spec.technique)
            parts.push(techniqueText(TECHNIQUE_BY_ID[m]));
        return parts.length > 0 ? `TECHNIQUE: ${parts.join(", ")}.` : "";
      })(),
      `CLOTHING: ${clothing}.`,
      // Fix Pack 10 - B2: the product is described, never drives face/location.
      spec.product ? `PRODUCT: ${spec.product}.` : "",
      anomaly ? `ANOMALY ANCHOR: ${anomaly}.` : "",
      `TECHNICAL: ${technical}.`,
      `MOOD: ${mood || "calm, candid"}.`,
      // U-attention: duplicate key info at the END
      `(key: ${identity}, ${spec.lighting || "natural light"}, ${POS_SKIN.split(",")[0]})`,
    ].filter(Boolean);
    const clamped = budgetWc(blocks.join(" "), limit.min, limit.max);
    results.push({
      prompt: clamped.text,
      words: clamped.words,
      underMin: clamped.underMin,
    });
  }
  return results;
}

/**
 * [2] Kling 3.0 (VIDEO). HAS negative (NEG_KLING).
 * Order: Camera -> Character -> Reaction. Static camera stated POSITIVELY.
 * Variants = Motion Intensity 0.3 / 0.5 / 0.7 (built-in).
 */
function buildKling(spec: SceneSpec, opts: BuildOptions): BuildResult[] {
  const cameraMove = spec.motion.cameraMove || "camera static on tripod";
  const camera = `${cameraMove}${spec.camera ? ", " + spec.camera : ""}`;
  const identity = identityText(spec, opts.character, opts.hasReference);
  const character = `Character: ${identity}${spec.outfit ? " in " + spec.outfit : ""}.`;
  const reaction = `Reaction: ${spec.motion.action || "subtle natural micro-movements, breathing, blinking"}${spec.lighting ? ", " + spec.lighting : ""}.`;
  // Kling native audio: dialogue lives in the prompt, voices stay bound to the
  // character (Voice Binding). Canon format: [Character A: tone]: "line".
  const dialogue = spec.audio.dialogue.trim()
    ? ` [Character A: natural]: "${spec.audio.dialogue.trim().replace(/"/g, "'")}".`
    : "";
  // Fix Pack 10 - B2: optional product mention.
  const product = spec.product ? ` Product in frame: ${spec.product}.` : "";
  const base = `${camera}. ${character} ${reaction}${product}${dialogue}`;

  // Canon intensity presets are exactly 0.3 / 0.5 / 0.7. A single variant uses the
  // user's slider; a 4th variant reuses the slider value (no invented presets).
  const list =
    opts.variants <= 1
      ? [spec.motion.intensity || 0.5]
      : opts.variants >= 4
        ? [0.3, 0.5, 0.7, spec.motion.intensity || 0.5]
        : [0.3, 0.5, 0.7].slice(0, opts.variants);

  return list.map((i) => ({
    prompt: `${base} ${INTENSITY_PHRASE[String(i)] || "natural motion"}. Motion intensity ${i}.`,
    negative: NEG_KLING,
  }));
}

/**
 * [3] Seedance 2.5 (VIDEO). NO negative. @-tags MANDATORY:
 * @image1=identity, @video1=motion/camera, @audio1=rhythm.
 * Subject + Action + Scene + Camera + Style, 50-70 words.
 */
function buildSeedance(spec: SceneSpec, opts: BuildOptions): BuildResult[] {
  const identity = identityText(spec, opts.character, opts.hasReference);
  const subject = `${identity}${spec.outfit ? ", " + spec.outfit : ""}`;
  const motion = `${spec.motion.cameraMove || "static camera"} ${spec.motion.action || "subtle natural movement"}`;
  const audio = spec.audio.ambience || "quiet natural ambience";
  const style =
    [styleString(spec.style), realismString(["skin"])]
      .filter(Boolean)
      .join(", ") || "natural realism";

  const rewordings = [
    motion,
    `slow push-in, ${spec.motion.action || "she shifts weight naturally"}`,
    `gentle handheld drift, ${spec.motion.action || "one continuous natural gesture"}`,
    `locked-off frame, ${spec.motion.action || "small candid movement"}`,
  ];

  const results: BuildResult[] = [];
  for (let v = 0; v < opts.variants; v++) {
    const text = `@image1 ${subject}. @video1 ${rewordings[v] || motion}. @audio1 ${audio}. Scene: ${spec.location || "natural setting"}${spec.lighting ? ", " + spec.lighting : ""}. Style: ${style}.`;
    const clamped = budgetWc(
      text,
      WORD_LIMITS.seedance.min,
      WORD_LIMITS.seedance.max,
    );
    results.push({
      prompt: clamped.text,
      words: clamped.words,
      underMin: clamped.underMin,
    });
  }
  return results;
}

/**
 * [4] Veo 3.1 (VIDEO). HAS negative (NEG_VEO). 7 layers, CAMERA FIRST:
 * [camera+optics] [subject] [action+physics] [environment] [light] [style+texture] [audio]
 * Dialogue AFTER a colon (not in quotes) + "(no subtitles)". 3-6 sentences ~100-150 words.
 */
function buildVeo(
  spec: SceneSpec,
  opts: BuildOptions,
  broll: boolean,
): BuildResult[] {
  const identity = identityText(spec, opts.character, opts.hasReference);
  const cameraLayer = `${spec.camera || "Static 50mm shot on a tripod"}${broll ? " (that's where the camera is)" : ""}.`;
  const subjectLayer = broll
    ? ""
    : `${identity[0].toUpperCase() + identity.slice(1)}${spec.outfit ? " in " + spec.outfit : ""}.`;
  const actionLayer = `${spec.motion.action || (broll ? "Slow ambient movement in the scene, natural physics" : "Natural micro-movements, one clear action, believable physics")}.`;
  const envLayer = spec.location
    ? `${spec.location[0].toUpperCase() + spec.location.slice(1)}.`
    : "";
  const lightLayer = spec.lighting
    ? `${spec.lighting[0].toUpperCase() + spec.lighting.slice(1)}.`
    : "";
  const styleLayer = `${styleString(spec.style) || "UGC realism"}, ${POS_SKIN.split(",")[0]}, no color grade.`;
  const audioParts: string[] = [];
  if (spec.audio.ambience) audioParts.push(`Audio: ${spec.audio.ambience}`);
  if (spec.audio.sfx) audioParts.push(`SFX: ${spec.audio.sfx}`);
  const audioLayer = audioParts.length ? audioParts.join("; ") + "." : "";

  const variantCameras = [
    cameraLayer,
    `Slow handheld 35mm push-in${broll ? " (that's where the camera is)" : ""}.`,
    `85mm shallow-focus shot, slight drift${broll ? " (that's where the camera is)" : ""}.`,
    `Wide 24mm locked-off frame${broll ? " (that's where the camera is)" : ""}.`,
  ];

  const results: BuildResult[] = [];
  for (let v = 0; v < opts.variants; v++) {
    let prompt = [
      variantCameras[v] || cameraLayer,
      subjectLayer,
      actionLayer,
      envLayer,
      lightLayer,
      styleLayer,
      audioLayer,
    ]
      .filter(Boolean)
      .join(" ");
    if (!broll && spec.audio.dialogue.trim()) {
      // Dialogue after a colon, not in quotes, + (no subtitles). No gender assumptions.
      prompt += ` The subject says, softly: ${spec.audio.dialogue.trim().replace(/["]/g, "")} (no subtitles)`;
    }
    const clamped = budgetWc(prompt, WORD_LIMITS.veo.min, WORD_LIMITS.veo.max);
    results.push({
      prompt: clamped.text,
      words: clamped.words,
      underMin: clamped.underMin,
      negative: NEG_VEO,
    });
  }
  return results;
}

/**
 * [5] Gemini Omni Flash (VIDEO EDITOR). Reasoning, NO negative.
 * 5 parts: Goal -> Input role -> Scene -> Motion -> Constraints.
 * Stateful: separate CHANGES vs PRESERVED. <=5s / <=5 refs / <=5 edits. Use Flow.
 */
function buildOmni(spec: SceneSpec, opts: BuildOptions): BuildResult[] {
  const goal = spec.motion.action || "a single small natural adjustment";
  const constraintVariants = [
    `change only [${goal}]; PRESERVE identity, lighting, background, framing`,
    `apply exactly one edit — ${goal} — and nothing else; PRESERVE identity, outfit, lighting, background`,
    `modify [${goal}] only; everything else PRESERVED: identity, light, environment, camera`,
    `single edit: ${goal}; PRESERVE the full original state of identity, lighting, background`,
  ];

  const results: BuildResult[] = [];
  for (let v = 0; v < opts.variants; v++) {
    const prompt = `Goal: ${goal}. Input: the uploaded video is the source clip to edit. Scene: ${spec.location || "same scene, unchanged"}. Motion: ${spec.motion.cameraMove || "a single natural movement, under 10 seconds"}. Constraints: ${constraintVariants[v] || constraintVariants[0]}. Use Flow.`;
    results.push({ prompt });
  }
  return results;
}

// ----------------------------------------------------------------------------
// Router
// ----------------------------------------------------------------------------

export function buildPrompts(
  spec: SceneSpec,
  opts: BuildOptions,
): BuildResult[] {
  switch (spec.engine) {
    case "nano_pro":
      return buildNano(spec, opts);
    case "kling_3":
      return buildKling(spec, opts);
    case "seedance_2":
      return buildSeedance(spec, opts);
    case "veo_scene":
      return buildVeo(spec, opts, false);
    case "veo_broll":
      return buildVeo(spec, opts, true);
    case "omni_flash":
      return buildOmni(spec, opts);
  }
}

```


---

## SOURCE FILE: `lib/canon.ts`
SHA-256: `e2a4a6bdfb114e1916cf5529dad291770db2c8319993b0d78efdaebff5311ccd`

```ts
// ============================================================================
// Fix Pack 11.3 — CANON: the user's mini-Liireya. Six editable blocks that
// make cutaways, props, captions, poses and mood HERS instead of "from the
// pack". Generated in one click by the user's own LLM from the passport +
// home world, editable inline, stored ON the passport itself — so it rides
// passport versions, export and import automatically. Zero required fields:
// an empty canon keeps every pool at pack defaults (the product works exactly
// as before); a filled canon goes FIRST in the prop / cutaway / caption pools.
// ============================================================================

import type { CharacterPassport, Lang, ModelCanon } from "./types";
import { chatLlm, type LlmConfig } from "./vision";

export type { ModelCanon } from "./types";

export const ALLOWED_PACK_IDS = [
  "pack_diary",
  "pack_flash",
  "pack_sunlight",
  "pack_americana",
  "pack_studio",
  "pack_suburb",
  "pack_concrete",
  "pack_cup",
  "pack_transit",
  "pack_wide",
  "pack_polaroid90",
  "pack_squint",
];

export function emptyCanon(): ModelCanon {
  return {
    schemaVersion: 1,
    whoSheIs: "",
    place: [],
    objects: [],
    homeWorld: "",
    favoritePacks: [],
    voiceStyle: "",
    voiceWords: [],
    habits: [],
  };
}

/** True when at least one block has content — the mixing layer switches on. */
export function canonFilled(c?: ModelCanon | null): boolean {
  if (!c) return false;
  return Boolean(
    c.whoSheIs.trim() ||
    c.place.length > 0 ||
    c.objects.length > 0 ||
    c.homeWorld ||
    c.voiceWords.length > 0 ||
    c.habits.length > 0,
  );
}

// --- Mixing helpers: canon entries go FIRST, pack pools stay the defaults ----

/** Personal objects → the prop-in-hands axis. */
export function canonProps(c?: ModelCanon | null): string[] {
  return c ? c.objects.map((o) => o.trim()).filter(Boolean) : [];
}

/** Body habits → the pose axis. */
export function canonHabits(c?: ModelCanon | null): string[] {
  return c ? c.habits.map((h) => h.trim()).filter(Boolean) : [];
}

/** "Who she is" → appended to the MOOD block of every prompt. */
export function canonMood(c?: ModelCanon | null): string {
  return c?.whoSheIs.trim() ?? "";
}

/** Her caption words → replace the world caption pool on hero/detail frames. */
export function canonCaptions(c?: ModelCanon | null): string[] {
  return c ? c.voiceWords.map((w) => w.trim()).filter(Boolean) : [];
}

const CANON_LIGHTS = [
  "soft daylight from her own window",
  "warm low lamp light, evening at her place",
  "thin morning light across her room",
];

/** Her place × her objects → cutaways that go FIRST in every pack pool. */
export function canonCutaways(c?: ModelCanon | null): Array<{
  id: string;
  label: Record<Lang, string>;
  text: string;
  lighting: string;
}> {
  if (!c) return [];
  const places = c.place.map((p) => p.trim()).filter(Boolean);
  const objects = canonProps(c);
  return places.slice(0, 3).map((p, k) => {
    const obj = objects.length > 0 ? objects[k % objects.length] : "";
    return {
      id: `canon_cut_${k}`,
      label: { ru: "Её место", en: "Her place" },
      text: obj ? `${p}, ${obj} left where she dropped it` : p,
      lighting: CANON_LIGHTS[k % CANON_LIGHTS.length],
    };
  });
}

// --- One-click generation via the user's own LLM key -------------------------

export function buildCanonLlmPrompt(
  passport: CharacterPassport,
  world: "A" | "B" | "C",
  lang: Lang,
): string {
  const langName = lang === "ru" ? "Russian" : "English";
  const identity =
    passport.identity.full || passport.identity.mid || passport.identity.micro;
  return [
    `You build a "canon" for a fictional AI influencer model — not a biography, but the concrete visual and verbal habits that make her feed hers.`,
    `Appearance passport: ${identity || "(empty)"}. Name: ${passport.name || "(unnamed)"}. Home aesthetic world: ${world} (A = honest phone diary, B = raw underground, C = staged film-still kitsch).`,
    `Reply ONLY with one JSON object, no prose:`,
    `{"who":"1-2 short ENGLISH phrases: archetype + vibe","place":["city + type of home","2-3 short ENGLISH interior phrases, one per item"],"objects":["5-7 personal objects in ENGLISH, each starting with 'her', concrete and imperfect (chipped, worn, exact color)"],"world":"A|B|C","favoritePacks":["1-3 ids from: ${ALLOWED_PACK_IDS.join(", ")}"],"voiceStyle":"one ${langName} line describing how she writes captions","voiceWords":["8-12 caption words/phrases in ${langName}, lowercase, 1-3 words each, no hashtags"],"habits":["2-3 ENGLISH body habits in frame, e.g. how she holds the phone, how she sits"]}`,
    `Hard rules: never use names of real people, photographers, models or brands; physical observable terms only; no beauty-filter or retouching language.`,
  ].join("\n");
}

export function parseCanonText(text: string): ModelCanon | null {
  const m = text.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    const raw = JSON.parse(m[0]) as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
    const arr = (v: unknown, cap: number) =>
      Array.isArray(v)
        ? v
            .filter((x): x is string => typeof x === "string")
            .map((x) => x.trim())
            .filter(Boolean)
            .slice(0, cap)
        : [];
    const world = str(raw.world);
    const canon: ModelCanon = {
      schemaVersion: 1,
      whoSheIs: str(raw.who),
      place: arr(raw.place, 4),
      objects: arr(raw.objects, 7),
      homeWorld: world === "A" || world === "B" || world === "C" ? world : "",
      favoritePacks: arr(raw.favoritePacks, 3).filter((p) =>
        ALLOWED_PACK_IDS.includes(p),
      ),
      voiceStyle: str(raw.voiceStyle),
      voiceWords: arr(raw.voiceWords, 12),
      habits: arr(raw.habits, 3),
      generatedAt: new Date().toISOString(),
    };
    return canonFilled(canon) ? canon : null;
  } catch {
    return null;
  }
}

export async function generateCanon(
  cfg: LlmConfig,
  passport: CharacterPassport,
  world: "A" | "B" | "C",
  lang: Lang,
): Promise<{ ok: boolean; canon?: ModelCanon; error?: string }> {
  const res = await chatLlm(
    cfg,
    [{ role: "user", text: buildCanonLlmPrompt(passport, world, lang) }],
    700,
  );
  if (!res.ok) return { ok: false, error: res.error };
  const canon = parseCanonText(res.text);
  return canon ? { ok: true, canon } : { ok: false, error: "empty" };
}

// --- One quiet nudge after the FIRST built feed, shown exactly once ----------

const NUDGE_KEY = "ios_canon_nudge";

export function canonNudgeSeen(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(NUDGE_KEY) === "1";
}

export function markCanonNudgeSeen(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(NUDGE_KEY, "1");
}

```


---

## SOURCE FILE: `lib/selfcheck.ts`
SHA-256: `444f5a7bd7ef47d1c4f27a4400740384069383b0c7c52b4de0568946d6562f1c`

```ts
// In-app acceptance suite (P12): asserts that prompt assembly
// follows the canon. Mirrors the external verification test set.

import {
  DEV,
  NEG_BASE,
  NEG_UGC,
  NEG_KLING,
  NEG_VEO,
  POS_SKIN,
  SENSOR,
  ENGINE_META,
  buildPrompts,
  CAP,
  OPT,
  EXPO,
  IMPERF,
  FILM,
  STYLE_PHRASES,
  WORLD_SUFFIX,
  FILM_TERMS,
  filterCaptureForWorld,
  BANNED_TERMS,
} from "./engines";
import {
  SERIES_SHIFTS,
  TECHNIQUES,
  TECHNIQUE_BY_ID,
  techniqueSeries,
  techniqueText,
} from "./techniques";
import { emptySceneSpec, resolveLocation } from "./scene";
import { personWordIn } from "./hints";
import { t } from "./i18n";
import { LICENSE_PROTOCOL, USES_LIMIT } from "./license";
import { TOUR_STEPS } from "./tour";
import { VIRTUAL_THRESHOLD } from "./virtual";
import { translitToCyr } from "./parse";
import { buildMultishot, planMultishot } from "./multishot";
import { PRODUCT_PROMPT, fnv1a, visionCacheKey } from "./visionCache";
import {
  BACKUP_FIELDS,
  STORAGE_SOFT_LIMIT_BYTES,
  appendVersion,
  backupDue,
  outcomeStats,
} from "./storage";
import { FMT_RANGE, SEED_PRESETS } from "./presets";
import {
  DEMO_CHARACTER,
  DEMO_WORLDS,
  demoSpec,
  makeTeaser,
  splitPromptBlocks,
  teaserSplit,
  TEASER_WORDS,
} from "./demo";
import { SCENE_PACKS, packSceneText } from "./packs";
import {
  archiveName,
  assignDays,
  caption,
  VOICE_RHYTHM,
  voiceCaption,
} from "./captions";
import { CUTAWAY_POOLS, buildCutaway } from "./cutaways";
import { buildFeed, codexDetails, codexLine, planFeed } from "./feed";
import { PROP_POOLS, propPool, shootComposition } from "./shoot";
import {
  emptyCanon,
  canonFilled,
  canonProps,
  canonHabits,
  canonCaptions,
  canonCutaways,
  canonMood,
  parseCanonText,
} from "./canon";
import { bundleJson, bundleText, shotListText } from "./bundle";
import { promptStrength } from "./strength";
import { antiDetectTips } from "./antidetect";
import { diagnose } from "./doctor";
import { parseManifest } from "./manifest";
import { clicheAdvice, CLICHES } from "./cliche";
import { QUIZ_QUESTIONS, scoreQuiz, WORLD_CODE } from "./quiz";
import {
  isRedacted,
  REDACT_GLYPH,
  redactBars,
  redactionLeaks,
  redactWords,
  tiltFor,
} from "./redact";
import { daylightTone, daypartOf, seasonFor, seasonPhrases } from "./season";
import { APP_VERSION, CHANGELOG } from "./changelog";
import { SHOWCASE_PROJECTS } from "./showcase-data";
import type { BuildResult, EngineId } from "./types";

export type SelfCheckResult = { name: string; pass: boolean };

const CANON = {
  DEV: "black iPhone 15 Pro Max in a transparent silicone case",
  NEG_BASE:
    "beauty filter, skin smoothing, airbrushed skin, blemish removal, pore filling, face symmetry correction, nose reshaping, matte plastic skin",
  NEG_UGC:
    "cinematic color grading, studio lighting, gimbal stabilization, instagram filter, watermark, text, logo",
  NEG_KLING:
    "clothing changes, hair style changes, de-aging, extra limbs, joint distortion, background flickering, beauty filter, skin smoothing, airbrushed skin, face symmetry correction, nose reshaping, matte plastic skin",
  POS_SKIN:
    "natural skin texture with visible pores and fine vellus hair, subtle sebum highlights in the T-zone, natural pigmentation with moles and freckles preserved, anatomical facial asymmetry, sharp focus",
  SENSOR:
    "subtle digital sensor noise, natural dynamic range, slight handheld imperfection",
};

export function runSelfCheck(): SelfCheckResult[] {
  const out: SelfCheckResult[] = [];
  const check = (name: string, pass: boolean) => out.push({ name, pass });
  const opts = {
    character: null,
    hasReference: true,
    compress: false,
    variants: 1,
  };

  try {
    // Constants verbatim
    check("DEV verbatim", DEV === CANON.DEV);
    check("NEG_BASE verbatim", NEG_BASE === CANON.NEG_BASE);
    check("NEG_UGC verbatim", NEG_UGC === CANON.NEG_UGC);
    check("NEG_KLING verbatim", NEG_KLING === CANON.NEG_KLING);
    check(
      "NEG_VEO composed",
      NEG_VEO ===
        `${CANON.NEG_BASE}, ${CANON.NEG_UGC}, subtitles, text overlays, on-screen text, captions, distorted hands, lip-sync issues, unnatural movements, oversaturation`,
    );
    check("POS_SKIN verbatim", POS_SKIN === CANON.POS_SKIN);
    check("SENSOR verbatim", SENSOR === CANON.SENSOR);
    check(
      "no seed exposed",
      ENGINE_META.every((e) => e.hasSeed === false),
    );

    // Kling
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "kling_3";
      spec.audio.dialogue = "Hey, look at this";
      spec.motion.intensity = 0.4;
      const four = buildPrompts(spec, { ...opts, variants: 4 });
      check("kling: 4 variants", four.length === 4);
      check(
        "kling: intensities 0.3/0.5/0.7 + slider",
        four[0].prompt.includes("Motion intensity 0.3") &&
          four[1].prompt.includes("Motion intensity 0.5") &&
          four[2].prompt.includes("Motion intensity 0.7") &&
          four[3].prompt.includes("Motion intensity 0.4"),
      );
      check(
        "kling: dialogue format",
        four[0].prompt.includes('[Character A: natural]: "Hey, look at this"'),
      );
      check(
        "kling: negative = NEG_KLING",
        four.every((r) => r.negative === CANON.NEG_KLING),
      );
    }

    // Veo
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "veo_scene";
      spec.audio.dialogue = "Welcome back";
      const [r] = buildPrompts(spec, opts);
      check(
        "veo: dialogue + (no subtitles)",
        r.prompt.includes(
          "The subject says, softly: Welcome back (no subtitles)",
        ),
      );
      check("veo: negative = NEG_VEO", r.negative === NEG_VEO);
      check("veo: underMin flag works", r.underMin === true);
    }

    // Veo B-roll
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "veo_broll";
      spec.audio.dialogue = "should not appear";
      const [r] = buildPrompts(spec, opts);
      check(
        "b-roll: camera marker",
        r.prompt.includes("(that's where the camera is)"),
      );
      check("b-roll: no dialogue", !r.prompt.includes("should not appear"));
    }

    // Nano
    {
      const spec = emptySceneSpec();
      spec.engine = "nano_pro";
      spec.location = "cafe interior";
      spec.lighting = "soft window light";
      const [r] = buildPrompts(spec, opts);
      check("nano: no negative", r.negative === undefined);
      check("nano: canon device", r.prompt.includes(CANON.DEV));
      check("nano: U-attention key", r.prompt.includes("(key:"));
    }

    // Seedance
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "seedance_2";
      const [r] = buildPrompts(spec, opts);
      check(
        "seedance: @-tags",
        r.prompt.includes("@image1") &&
          r.prompt.includes("@video1") &&
          r.prompt.includes("@audio1"),
      );
      check("seedance: no negative", r.negative === undefined);
    }

    // Omni Flash
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "omni_flash";
      const [r] = buildPrompts(spec, opts);
      check(
        "omni: 5 parts + Use Flow",
        [
          "Goal:",
          "Input:",
          "Scene:",
          "Motion:",
          "Constraints:",
          "Use Flow.",
        ].every((p) => r.prompt.includes(p)),
      );
      check("omni: under 10 seconds", r.prompt.includes("under 10 seconds"));
      check("omni: PRESERVE present", r.prompt.includes("PRESERVE"));
      check("omni: no negative", r.negative === undefined);
    }

    // FP8 - demo character (B1)
    {
      const idWords = DEMO_CHARACTER.identity.full
        .split(/\s+/)
        .filter(Boolean).length;
      check("demo: identity 30-45 words", idWords >= 30 && idWords <= 45);
      check(
        "demo: anomaly lock canonical ending",
        DEMO_CHARACTER.anomalyLock.freeText.endsWith(
          "Do not normalize or correct these features.",
        ),
      );
      check(
        "demo: two worlds x three scenes",
        DEMO_WORLDS.length === 2 &&
          DEMO_WORLDS.every((w) => w.scenes.length === 3),
      );
      const spec = demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro");
      const [r] = buildPrompts(spec, {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      });
      check("demo: nano prompt has canon device", r.prompt.includes(CANON.DEV));
      check("demo: U-attention key present", r.prompt.includes("(key:"));
      check("demo: not under minimum", !r.underMin);
    }

    // --- Fix Pack 9: scene packs, location priority, package export ---------
    {
      check("fp9: original five packs still present", SCENE_PACKS.length >= 5);
      check(
        "fp9: every pack has 4+ scenes",
        SCENE_PACKS.every((p) => p.scenes.length >= 4),
      );
      check(
        "fp9: no photographer names in packs",
        !/(Goldin|Tillmans|Teller|Purienne|Cohen|Jacobs|litlonn)/i.test(
          JSON.stringify(SCENE_PACKS),
        ),
      );
      const sc0 = SCENE_PACKS[0].scenes[0];
      check(
        "fp9: pack scene text includes location",
        packSceneText(sc0).includes(sc0.fields.location),
      );
      check(
        "fp9: pack capture/style keys valid",
        SCENE_PACKS.every((p) =>
          p.scenes.every(
            (s) =>
              (!s.capture.cap || s.capture.cap in CAP) &&
              (!s.capture.opt || s.capture.opt in OPT) &&
              s.capture.expo.every((k) => k in EXPO) &&
              s.capture.imperf.every((k) => k in IMPERF) &&
              (!s.capture.film || s.capture.film in FILM) &&
              s.style.every((k) => k in STYLE_PHRASES),
          ),
        ),
      );
      const d1 = resolveLocation("kitchen at night", "hotel lobby");
      check(
        "fp9: scene text outranks scene reference",
        d1.location === "kitchen at night" &&
          d1.source === "text" &&
          d1.conflict !== null &&
          d1.conflict.refLocation === "hotel lobby",
      );
      const d2 = resolveLocation("", "hotel lobby");
      check(
        "fp9: reference fills empty text without conflict",
        d2.location === "hotel lobby" &&
          d2.source === "scene_ref" &&
          d2.conflict === null,
      );
      const d3 = resolveLocation("Hotel Lobby", "hotel lobby");
      check(
        "fp9: same location (case-insensitive) is not a conflict",
        d3.conflict === null && d3.source === "text",
      );
      const shots = [
        { label: "hook", prompt: "first prompt", negative: "neg one" },
        { prompt: "second prompt" },
      ] as BuildResult[];
      const meta = { engine: "kling_3", mode: "video", scene: "test scene" };
      const bt = bundleText(shots, meta);
      check(
        "fp9: bundle text has shot headers and negatives",
        bt.includes("Shot 1/2") &&
          bt.includes("Shot 2/2") &&
          bt.includes("NEGATIVE:") &&
          bt.includes("first prompt"),
      );
      const bj = JSON.parse(bundleJson(shots, meta)) as {
        engine: string;
        shots: Array<{ label: string | null; prompt: string }>;
      };
      check(
        "fp9: bundle json roundtrip",
        bj.shots.length === 2 &&
          bj.shots[0].label === "hook" &&
          bj.shots[1].label === null &&
          bj.engine === "kling_3",
      );
    }

    // --- Fix Pack 10: multishot, product slot, vision cache, versions -------
    {
      const spec = emptySceneSpec();
      spec.mode = "video";
      spec.engine = "kling_3";
      spec.motion.action = "pours coffee into a mug";
      spec.audio.dialogue = "Fresh batch";
      const ms = buildMultishot(spec, opts, 5, "en");
      check(
        "fp10: multishot has Shot 1..5",
        ms.prompt.includes("Shot 1 (3s):") &&
          ms.prompt.includes("Shot 5 (3s):") &&
          !ms.prompt.includes("Shot 6"),
      );
      check(
        "fp10: multishot continuous-scene header",
        ms.prompt.includes(
          "one continuous scene, the same character in every shot",
        ),
      );
      check(
        "fp10: multishot negative = NEG_KLING",
        ms.negative === CANON.NEG_KLING,
      );
      check(
        "fp10: multishot dialogue in Kling format",
        ms.prompt.includes('[Character A: natural]: "Fresh batch"'),
      );
      check(
        "fp10: plan 6 over budget, 5 fits 15s",
        planMultishot(6).overBudget === true &&
          planMultishot(5).totalSec === 15 &&
          planMultishot(5).overBudget === false,
      );

      const pspec = emptySceneSpec();
      pspec.engine = "nano_pro";
      pspec.product = "matte black ceramic mug";
      const [pn] = buildPrompts(pspec, opts);
      check(
        "fp10: nano PRODUCT block",
        pn.prompt.includes("PRODUCT: matte black ceramic mug."),
      );
      pspec.mode = "video";
      pspec.engine = "kling_3";
      const [pk] = buildPrompts(pspec, opts);
      check(
        "fp10: kling product in frame",
        pk.prompt.includes("Product in frame: matte black ceramic mug."),
      );

      const h1 = fnv1a("hello");
      check(
        "fp10: fnv1a deterministic and distinct",
        h1 === fnv1a("hello") && h1 !== fnv1a("hella") && h1.startsWith("fnv_"),
      );
      check(
        "fp10: cache key format",
        visionCacheKey(
          { provider: "anthropic", apiKey: "" },
          "abc",
          "scene",
        ) === "ios_vision_scene:anthropic:default:abc",
      );
      check(
        "fp10: product prompt canon (25 words, no brands)",
        PRODUCT_PROMPT.includes("25") &&
          PRODUCT_PROMPT.includes("no brand names"),
      );

      let vlist = appendVersion([], DEMO_CHARACTER);
      const afterDup = appendVersion(vlist, DEMO_CHARACTER);
      check(
        "fp10: version dedupe of identical snapshot",
        vlist.length === 1 && afterDup === vlist,
      );
      for (let i = 0; i < 12; i++) {
        vlist = appendVersion(vlist, { ...DEMO_CHARACTER, name: "v" + i });
      }
      check(
        "fp10: versions capped at 10, newest first",
        vlist.length === 10 && vlist[0].passport.name === "v11",
