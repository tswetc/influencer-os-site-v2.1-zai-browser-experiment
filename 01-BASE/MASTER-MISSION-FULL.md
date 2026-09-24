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
      );

      // --- Fix Pack 11: technique core --------------------------------
      check("fp11: 24 techniques", TECHNIQUES.length === 24);
      check(
        "fp11: five phrases per technique",
        TECHNIQUES.every((tq) =>
          [tq.cameraReason, tq.light, tq.state, tq.surface, tq.artifact].every(
            (s) => s.trim().length > 0,
          ),
        ),
      );
      const techAll = TECHNIQUES.map((tq) => techniqueText(tq))
        .join(" ")
        .toLowerCase();
      check(
        "fp11: no banned terms in techniques",
        BANNED_TERMS.every((b) => !techAll.includes(b)),
      );
      check(
        "fp11: film terms only in world C",
        TECHNIQUES.filter((tq) => tq.world !== "C").every((tq) =>
          FILM_TERMS.every((f) => !techniqueText(tq).toLowerCase().includes(f)),
        ),
      );
      check("fp11+12: 18 packs", SCENE_PACKS.length === 18);
      check(
        "fp11: every pack has a world and known techniques",
        SCENE_PACKS.every(
          (p) =>
            ["A", "B", "C"].includes(p.world) &&
            p.techniqueIds.length >= 1 &&
            p.techniqueIds.every((id) => Boolean(TECHNIQUE_BY_ID[id])),
        ),
      );
      const packAll = SCENE_PACKS.map((p) =>
        p.scenes.map((s) => packSceneText(s)).join(" "),
      )
        .join(" ")
        .toLowerCase();
      check(
        "fp11: no banned terms in packs",
        BANNED_TERMS.every((b) => !packAll.includes(b)),
      );
      const gated = filterCaptureForWorld(
        {
          cap: "film_35mm",
          opt: "",
          expo: [],
          imperf: ["film_dust"],
          film: "portra",
        },
        "A",
      );
      const kept = filterCaptureForWorld(
        { cap: "film_35mm", opt: "", expo: [], imperf: [], film: "portra" },
        "C",
      );
      check(
        "fp11: film capture stripped outside world C",
        gated.film === "" &&
          gated.cap === "iphone_hdr" &&
          !gated.imperf.includes("film_dust") &&
          kept.film === "portra" &&
          kept.cap === "film_35mm",
      );
      check(
        "fp11: series x6",
        SERIES_SHIFTS.length === 6 &&
          techniqueSeries(TECHNIQUES[0]).length === 6,
      );
      check(
        "fp11: world suffixes present",
        (["A", "B", "C"] as const).every((w) => WORLD_SUFFIX[w].length > 10),
      );
      // --- Fix Pack 11.2: shoot / feed / cutaways / captions -----------------
      check(
        "fp11.2: B-roll pool 3-5 on every pack",
        SCENE_PACKS.every((p) => {
          const n = CUTAWAY_POOLS[p.id]?.length ?? 0;
          return n >= 3 && n <= 5;
        }),
      );
      check(
        "fp11.2: prop pool on every pack",
        SCENE_PACKS.every((p) => (PROP_POOLS[p.id]?.length ?? 0) >= 3),
      );
      const cut = buildCutaway(SCENE_PACKS[0], 0, "en");
      check(
        "fp11.2: B-roll has no person and no identity",
        cut.prompt.includes("no people, no face") &&
          !cut.prompt.includes("IDENTITY"),
      );
      const comp = shootComposition(8);
      check(
        "fp11.2: shoot 8 = 5 hero + 2 detail + 1 B-roll",
        comp.filter((r) => r === "hero").length === 5 &&
          comp.filter((r) => r === "detail").length === 2 &&
          comp.filter((r) => r === "cutaway").length === 1,
      );
      check(
        "fp11.2: feed rhythm - one off frame, B-roll 15-25%",
        [12, 16, 30].every((n) => {
          const plan = planFeed(n);
          const off = plan.filter((x) => x.role === "off").length;
          const cuts = plan.filter((x) => x.role === "cutaway").length / n;
          return off === 1 && cuts >= 0.15 && cuts <= 0.25;
        }),
      );
      check(
        "fp11.2: captions follow world voice",
        caption("A", "hero", 0, "en") ===
          caption("A", "hero", 0, "en").toLowerCase() &&
          caption("C", "hero", 0, "en").length > 0 &&
          caption("A", "off", 0, "en") === "…",
      );
      const days = assignDays(16);
      check(
        "fp11.2: posting days are monotonic",
        days.length === 16 && days.every((d, i) => i === 0 || d >= days[i - 1]),
      );
    }

    // Fix Pack 11.3: canon smoke tests.
    {
      // Lazy-import to avoid circular dep; canon imports from types only.
      check("fp11.3: emptyCanon is not filled", !canonFilled(emptyCanon()));
      check(
        "fp11.3: emptyCanon props/habits/captions/B-roll are empty arrays",
        canonProps(emptyCanon()).length === 0 &&
          canonHabits(emptyCanon()).length === 0 &&
          canonCaptions(emptyCanon()).length === 0 &&
          canonCutaways(emptyCanon()).length === 0,
      );
      check(
        "fp11.3: canonMood on empty canon is empty string",
        canonMood(emptyCanon()) === "",
      );
      const filledCanon = {
        ...emptyCanon(),
        whoSheIs: "off-duty archivist, slow mornings",
        objects: ["her chipped enamel mug", "her worn linen tote"],
        place: ["Berlin, Prenzlauer Berg, cluttered kitchen shelf"],
        habits: ["tilts phone at hip, elbow locked"],
        voiceWords: ["still", "quieter"],
      };
      check("fp11.3: filled canon is canonFilled", canonFilled(filledCanon));
      check(
        "fp11.3: canonProps returns her objects first",
        canonProps(filledCanon)[0] === "her chipped enamel mug",
      );
      check(
        "fp11.3: canonHabits returns her habits",
        canonHabits(filledCanon)[0] === "tilts phone at hip, elbow locked",
      );
      check(
        "fp11.3: canonCaptions returns her voice words",
        canonCaptions(filledCanon).includes("still"),
      );
      check(
        "fp11.3: canonCutaways has her place",
        canonCutaways(filledCanon).length > 0 &&
          canonCutaways(filledCanon)[0].text.includes("Berlin"),
      );
      check(
        "fp11.3: canonMood on filled canon is non-empty",
        canonMood(filledCanon).length > 0,
      );
      check(
        "fp11.3: parseCanonText round-trips valid JSON",
        (() => {
          const raw = JSON.stringify({
            who: "test archetype",
            place: ["Paris, loft"],
            objects: ["her old wallet"],
            world: "A",
            favoritePacks: ["pack_diary"],
            voiceStyle: "lowercase, minimal",
            voiceWords: ["soft", "bare"],
            habits: ["holds camera low"],
          });
          const c = parseCanonText(raw);
          return c !== null && c.whoSheIs === "test archetype";
        })(),
      );
      check(
        "fp11.3: parseCanonText returns null on empty object",
        parseCanonText("{}") === null,
      );
      // Canon integrates with caption(): with canon words, hero caption = her word.
      const capWithCanon = caption("A", "hero", 0, "en", filledCanon);
      check(
        "fp11.3: caption uses canon voice words on hero frame",
        filledCanon.voiceWords.includes(capWithCanon),
      );
      check(
        "fp11.3: caption B-roll role ignores canon (uses B-roll pool)",
        caption("A", "cutaway", 0, "en", filledCanon).length >= 0,
      );
      check(
        "fp11.3: caption off role returns ellipsis regardless of canon",
        caption("A", "off", 0, "en", filledCanon) === "\u2026",
      );
      // Canon integrates with propPool(): her objects are first.
      const pool = propPool("pack_diary", filledCanon);
      check(
        "fp11.3: propPool puts canon objects first",
        pool[0] === "her chipped enamel mug",
      );
    }

    // --- Fix Pack 12: full catalog — 18 packs + 2 modifier layers ------------
    {
      const ids = SCENE_PACKS.map((p) => p.id);
      check(
        "fp12: six new packs present",
        [
          "pack_fitting",
          "pack_steam",
          "pack_4am",
          "pack_screen",
          "pack_motion",
          "pack_night",
        ].every((id) => ids.includes(id)),
      );
      check(
        "fp12: every pack has prop and B-roll pools",
        ids.every(
          (id) =>
            (PROP_POOLS[id] || []).length >= 3 &&
            (CUTAWAY_POOLS[id] || []).length >= 3,
        ),
      );
      const covered = new Set(SCENE_PACKS.flatMap((p) => p.techniqueIds));
      const uncovered = TECHNIQUES.filter(
        (t) => !t.modifier && t.id !== "t_body_landscape" && !covered.has(t.id),
      );
      check(
        "fp12: all wave-1 techniques covered by packs",
        uncovered.length === 0,
      );
      check(
        "fp12: fragile & deadpan are modifier layers",
        TECHNIQUE_BY_ID.t_fragility.modifier === true &&
          TECHNIQUE_BY_ID.t_deadpan.modifier === true,
      );
      const modSpec = {
        ...demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro"),
        world: "A" as const,
        modifiers: ["t_fragility"],
      };
      const [mr] = buildPrompts(modSpec, {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      });
      check(
        "fp12: modifier phrases reach the prompt",
        mr.prompt.includes("goosebumps"),
      );
      const plainSpec = {
        ...demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro"),
        world: "A" as const,
      };
      const [pr] = buildPrompts(plainSpec, {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      });
      check(
        "fp12: no modifier leak without chips",
        !pr.prompt.includes("goosebumps"),
      );
    }

    // --- Fix Pack 13: strength meter, anti-detect tips, journal, backup ------
    {
      const demo = demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro");
      const full = promptStrength(demo, DEMO_CHARACTER);
      check(
        "fp13: strength score is bounded 0..100",
        full.score >= 0 && full.score <= 100,
      );
      const empty = promptStrength(
        { ...emptySceneSpec(), mode: "photo", engine: "nano_pro" },
        null,
      );
      check(
        "fp13: empty spec scores below a filled one",
        empty.score < full.score,
      );
      check(
        "fp13: empty spec reports the location gap",
        empty.gaps.includes("location"),
      );

      const engines = [
        "nano_pro",
        "kling_3",
        "seedance_2",
        "veo_scene",
        "veo_broll",
        "omni_flash",
      ] as const;
      check(
        "fp13: every engine gets at least four anti-detect tips",
        engines.every((e) => antiDetectTips(e).length >= 4),
      );
      const nanoIds = antiDetectTips("nano_pro").map((x) => x.id);
      const klingIds = antiDetectTips("kling_3").map((x) => x.id);
      check(
        "fp13: negatives tip only on kling/veo, not nano",
        klingIds.includes("negatives") && !nanoIds.includes("negatives"),
      );
      check(
        "fp13: motion tip only on video engines",
        antiDetectTips("kling_3").some((x) => x.id === "motion") &&
          !antiDetectTips("nano_pro").some((x) => x.id === "motion"),
      );

      const old = new Date(Date.now() - 30 * 864e5).toISOString();
      const fresh = new Date().toISOString();
      check(
        "fp13: backupDue fires on stale backup with real data",
        backupDue(old, 2, 0) === true,
      );
      check(
        "fp13: backupDue stays quiet on a fresh backup",
        backupDue(fresh, 5, 50) === false,
      );
      check(
        "fp13: backupDue stays quiet with little data",
        backupDue(undefined, 1, 3) === false,
      );

      const shots: BuildResult[] = [
        { prompt: "p1", role: "hero", day: 1, caption: "c1" },
        { prompt: "p2", role: "detail", day: 2 },
      ];
      const sl = shotListText(shots, {
        engine: "nano_pro",
        mode: "photo",
        scene: "test",
      });
      check(
        "fp13: shot list groups days and numbers shots",
        sl.includes("## Day 1") &&
          sl.includes("## Day 2") &&
          sl.includes("Shot 2/2"),
      );

      check(
        "fp13: changelog newest entry matches APP_VERSION",
        CHANGELOG[0].version === APP_VERSION &&
          CHANGELOG[0].ru.length > 0 &&
          CHANGELOG[0].en.length > 0,
      );

      const st = outcomeStats([
        {
          id: "1",
          engine: "nano_pro",
          mode: "photo",
          scenePreview: "",
          prompt: "",
          createdAt: "",
          outcome: "hit",
        },
        {
          id: "2",
          engine: "nano_pro",
          mode: "photo",
          scenePreview: "",
          prompt: "",
          createdAt: "",
          outcome: "miss",
        },
        {
          id: "3",
          engine: "nano_pro",
          mode: "photo",
          scenePreview: "",
          prompt: "",
          createdAt: "",
        },
      ]);
      check(
        "fp13: outcomeStats counts only rated records",
        st.rated === 2 && st.hits === 1 && st.byEngine.nano_pro.rated === 2,
      );
    }

    // --- Fix Pack 14: prompt doctor, canon manifest, version -----------------
    {
      const empty = emptySceneSpec();
      const sugg = diagnose(empty, null);
      check(
        "fp14: doctor flags missing character and location as fixes",
        sugg.some((s) => s.id === "character" && s.severity === "fix") &&
          sugg.some((s) => s.id === "location" && s.severity === "fix"),
      );
      const firstTip = sugg.findIndex((s) => s.severity === "tip");
      check(
        "fp14: doctor sorts fixes before tips",
        firstTip === -1 ||
          sugg.slice(firstTip).every((s) => s.severity === "tip"),
      );
      const video = diagnose(emptySceneSpec("video", "kling_3"), null);
      check(
        "fp14: doctor asks for motion only on video engines",
        video.some((s) => s.id === "motion") &&
          !sugg.some((s) => s.id === "motion"),
      );
      const filled = diagnose(
        demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro"),
        DEMO_CHARACTER,
      );
      check(
        "fp14: doctor quiets down on a filled demo spec",
        filled.filter((s) => s.severity === "fix").length <
          sugg.filter((s) => s.severity === "fix").length,
      );
      check(
        "fp14: doctor flags a too-short result",
        diagnose(empty, null, { prompt: "x", underMin: true }).some(
          (s) => s.id === "short",
        ),
      );

      check(
        "fp14: manifest rejects malformed payloads",
        parseManifest(null) === null &&
          parseManifest("nope") === null &&
          parseManifest({}) === null &&
          parseManifest({ version: "" }) === null,
      );
      const m = parseManifest({
        version: "2026.07",
        title: "Canon",
        notes: ["a", 1, "b"],
        packs: ["p1"],
      });
      check(
        "fp14: manifest accepts a valid payload and keeps only strings",
        m !== null &&
          m.version === "2026.07" &&
          m.notes.length === 2 &&
          (m.packs || []).length === 1,
      );
    }

    // --- Fix Pack 15: §2 teaser privacy + landing hero machine ---------------
    {
      const scene = DEMO_WORLDS[0].scenes[0];
      const opts = {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      };
      const [nano] = buildPrompts(demoSpec(scene, "nano_pro"), opts);
      const [head, tail] = teaserSplit(nano.prompt);
      check(
        "fp15: teaser split joins back to the exact prompt",
        head + tail === nano.prompt,
      );
      check(
        "fp15: teaser hides most of the demo prompt",
        tail.length > head.length,
      );
      const teaser = makeTeaser(nano.prompt);
      check(
        "fp15: teaser is truncated and marked with an ellipsis",
        teaser.length < nano.prompt.length && teaser.endsWith("…"),
      );
      check(
        "fp15: teaser keeps short prompts intact",
        makeTeaser("one two three") === "one two three",
      );
      check(
        "fp15: teaser caps at the word budget",
        teaser.split(/\s+/).filter(Boolean).length <= TEASER_WORDS + 1,
      );
      const blocks = splitPromptBlocks(nano.prompt);
      check("fp15: demo prompt splits into display blocks", blocks.length >= 2);
      check(
        "fp15: display blocks preserve every prompt word",
        blocks.join(" ").split(/\s+/).filter(Boolean).length ===
          nano.prompt.split(/\s+/).filter(Boolean).length,
      );
      const heroEngines: EngineId[] = [
        "nano_pro",
        "kling_3",
        "seedance_2",
        "veo_scene",
        "omni_flash",
      ];
      check(
        "fp15: all five hero engines build non-empty prompts",
        heroEngines.every(
          (e) => buildPrompts(demoSpec(scene, e), opts)[0].prompt.length > 60,
        ),
      );
      check(
        "fp15: changelog keeps the 1.15 entry",
        CHANGELOG.some((e) => e.version === "1.15"),
      );
      check(
        "fp15: changelog lists the current version first",
        CHANGELOG[0].version === APP_VERSION,
      );
    }

    // --- Fix Pack 16: Proof & Life -------------------------------------------
    {
      // §2 redaction: bars instead of blur — hidden text never renders at all.
      const hidden = "her full scene formula stays inside the studio";
      const bars = redactBars(hidden, 7);
      check(
        "fp16: redaction leaks no hidden word",
        isRedacted(bars) && !redactionLeaks(hidden, bars),
      );
      check("fp16: redaction is deterministic", bars === redactBars(hidden, 7));
      check(
        "fp16: redaction keeps the word rhythm",
        bars.split(" ").length === hidden.split(/\s+/).length,
      );
      const tilts = Array.from({ length: 12 }, (_, i) => tiltFor(i));
      check(
        "fp16: gallery tilts stay small and never repeat in a row",
        tilts.every(
          (v, i) =>
            Math.abs(v) <= 2.5 && v !== 0 && (i === 0 || v !== tilts[i - 1]),
        ),
      );
      // Season Sync — deterministic, no weather APIs.
      const july = new Date(2026, 6, 17, 19, 0, 0);
      check(
        "fp16: July reads summer in the north, winter in a southern canon",
        seasonFor(july, null) === "summer" &&
          seasonFor(july, ["Sydney, Australia"]) === "winter",
      );
      check(
        "fp16: dayparts split the clock",
        daypartOf(8) === "morning" &&
          daypartOf(13) === "day" &&
          daypartOf(19) === "evening" &&
          daypartOf(23) === "night",
      );
      const sp = seasonPhrases(july, null, 0);
      check(
        "fp16: seasonal phrases are non-empty and deterministic",
        sp.light.length > 0 &&
          sp.cutaway.length > 0 &&
          sp.light === seasonPhrases(july, null, 0).light,
      );
      check(
        "fp16: daylight header tones differ morning vs night",
        daylightTone(8).tint !== daylightTone(23).tint,
      );
      // Feed Voice — caption formats from the profile atlas.
      check(
        "fp16: archive captions look like 0347.jpg",
        /^\d{4}\.jpg$/.test(archiveName(3)),
      );
      check(
        "fp16: the voice rhythm stays mostly plain with three special formats",
        VOICE_RHYTHM.filter((v) => v === "plain").length >= 4 &&
          (["dump", "sms", "archive"] as const).every((v) =>
            VOICE_RHYTHM.includes(v),
          ),
      );
      check(
        "fp16: special voices produce captions in both languages",
        (["dump", "sms", "archive"] as const).every(
          (v) =>
            voiceCaption(v, 2, "ru").length > 0 &&
            voiceCaption(v, 2, "en").length > 0,
        ),
      );
      // Season + voice inside a real generated feed.
      const opts16 = {
        character: DEMO_CHARACTER,
        hasReference: false,
        compress: false,
        variants: 1,
      };
      const feed16 = buildFeed(
        [SCENE_PACKS[0]],
        demoSpec(DEMO_WORLDS[0].scenes[0], "nano_pro"),
        opts16,
        12,
        "en",
        {
          continuity: true,
          loose: false,
          captions: true,
          season: true,
          now: july,
        },
      );
      check(
        "fp16: season sync bakes the seasonal light into feed prompts",
        feed16.frames.some((f) => f.prompt.includes(sp.light)),
      );
      check(
        "fp16: feed frames carry voice format marks",
        feed16.frames.some(
          (f) =>
            f.voice === "dump" || f.voice === "sms" || f.voice === "archive",
        ),
      );
      // Codex line.
      check(
        "fp16: the Codex line reads 5/5 and lists five rules",
        codexLine("ru").includes("5/5") &&
          codexLine("en").includes("5/5") &&
          codexDetails("ru").length === 5 &&
          codexDetails("en").length === 5,
      );
      // Cliché guard.
      check(
        "fp16: the cliché guard flags latte art and stays quiet on Codex scenes",
        clicheAdvice("girl with latte art in a cafe", "en") !== null &&
          clicheAdvice("crumpled tee on the chair, hard window light", "en") ===
            null,
      );
      check(
        "fp16: the ban list holds 12+ clichés with tips in both languages",
        CLICHES.length >= 12 &&
          CLICHES.every((c) => c.tip.ru.length > 0 && c.tip.en.length > 0),
      );
      // Cluster quiz.
      check(
        "fp16: the quiz asks 4 questions with 3 world-mapped options each",
        QUIZ_QUESTIONS.length === 4 &&
          QUIZ_QUESTIONS.every((q) => q.options.length === 3),
      );
      check(
        "fp16: quiz scoring is majority-based and deterministic",
        scoreQuiz(["A", "A", "B", "C"]) === "A" &&
          scoreQuiz(["A", "B", "B", "C"]) === "B" &&
          scoreQuiz(["A", "B", "C", "C"]) === "C",
      );
      check(
        "fp16: every world code names two starting packs",
        (["A", "B", "C"] as const).every(
          (w) =>
            WORLD_CODE[w].packs.length === 2 && WORLD_CODE[w].name.length > 0,
        ),
      );
      // Fix Pack 16.1 — b-roll no-people guard.
      check(
        "fp16.1: the b-roll guard flags person words and stays quiet otherwise",
        personWordIn("she pours coffee") !== null &&
          personWordIn("coffee drips into a cup") === null,
      );
      check(
        "fp23: app version is 1.23 and the changelog leads with it",
        APP_VERSION === "1.23" && CHANGELOG[0].version === "1.23",
      );
      // Fix Pack 23 - architecture invariants.
      check(
        "fp23: seed presets live in lib and keep unique ids",
        SEED_PRESETS.length >= 3 &&
          new Set(SEED_PRESETS.map((p) => p.id)).size === SEED_PRESETS.length,
      );
      check(
        "fp23: format ranges stay sane (min <= default <= max)",
        (["series", "shoot", "feed"] as const).every(
          (f) =>
            FMT_RANGE[f].min <= FMT_RANGE[f].def &&
            FMT_RANGE[f].def <= FMT_RANGE[f].max,
        ),
      );
      check(
        "fp23: a full backup carries presets and the quota guard is sane",
        (BACKUP_FIELDS as readonly string[]).includes("presets") &&
          STORAGE_SOFT_LIMIT_BYTES > 3 * 1024 * 1024 &&
          STORAGE_SOFT_LIMIT_BYTES < 5 * 1024 * 1024,
      );
      check(
        "fp23: the 1.23 changelog entry ships localized copy",
        CHANGELOG[0].ru.length > 0 &&
          CHANGELOG[0].ru.join("|") !== CHANGELOG[0].en.join("|"),
      );
      // Fix Pack 17 — media showcase invariants.
      check(
        "fp19: showcase has eleven projects and every path lives under /showcase/",
        SHOWCASE_PROJECTS.length === 11 &&
          SHOWCASE_PROJECTS.every((s) =>
            s.items.every((it) =>
              (it.kind === "video" ? it.src : it.full).startsWith("/showcase/"),
            ),
          ),
      );
      check(
        "fp19: six projects lead with a loop, the passport is stills-only",
        SHOWCASE_PROJECTS.filter((s) => s.items[0].kind === "video").length ===
          6 &&
          SHOWCASE_PROJECTS.every(
            (s) =>
              s.id !== "passport" || s.items.every((it) => it.kind === "image"),
          ),
      );
      check(
        "fp17: every video ships a poster and every image ships a thumb",
        SHOWCASE_PROJECTS.every((s) =>
          s.items.every((it) =>
            it.kind === "video"
              ? it.poster.length > 0 && it.src.endsWith(".mp4")
              : it.thumb.length > 0 && it.full.endsWith(".jpg"),
          ),
        ),
      );
      check(
        "fp17: every showcase item carries an English alt text",
        SHOWCASE_PROJECTS.every((s) =>
          s.items.every((it) => it.alt.trim().length > 5),
        ),
      );
      // Fix Pack 18 — the showcase tells the creation story first.
      check(
        "fp18: the story leads with creation — create video first, passport second",
        SHOWCASE_PROJECTS[0].id === "create" &&
          SHOWCASE_PROJECTS[0].items[0].kind === "video" &&
          SHOWCASE_PROJECTS[1].id === "passport",
      );
      check(
        "fp18: all 29 promo assets are placed exactly once (6 loops + 23 stills)",
        (() => {
          const paths = SHOWCASE_PROJECTS.flatMap((s) =>
            s.items.map((it) => (it.kind === "video" ? it.src : it.full)),
          );
          return (
            paths.length === 29 &&
            new Set(paths).size === 29 &&
            paths.filter((p) => p.endsWith(".mp4")).length === 6
          );
        })(),
      );
      // Fix Pack 18.1 — encoding guards: broken characters never ship again.
      check(
        "fp18.1: dictionaries are free of broken encoding (U+FFFD)",
        !JSON.stringify({
          techniques: TECHNIQUES,
          changelog: CHANGELOG,
          showcase: SHOWCASE_PROJECTS,
          packs: SCENE_PACKS,
        }).includes("\uFFFD"),
      );
      check(
        'fp18.1: transliteration maps "shch" to the Cyrillic letter',
        translitToCyr("shch") === "щ",
      );
      // Fix Pack 19 — real-shoot grouping + glass redaction.
      check(
        "fp19: shoots never mix — the blush frame lives only with the lipstick campaign",
        SHOWCASE_PROJECTS.every((s) =>
          s.items.every(
            (it) =>
              it.kind === "video" ||
              !it.full.includes("style-blush") ||
              s.id === "lipstick",
          ),
        ) &&
          SHOWCASE_PROJECTS.some(
            (s) =>
              s.id === "lipstick" &&
              s.items.some(
                (it) => it.kind === "image" && it.full.includes("style-blush"),
              ),
          ),
      );
      {
        const hiddenGlass = "cinematic 85mm portrait natural skin texture";
        const glass = redactWords(hiddenGlass, 5);
        check(
          "fp19: glass decoys keep the rhythm and leak no hidden word",
          glass === redactWords(hiddenGlass, 5) &&
            !glass.includes(REDACT_GLYPH) &&
            !redactionLeaks(hiddenGlass, glass) &&
            glass.split(/\s+/).length === hiddenGlass.split(/\s+/).length,
        );
      }
      // Fix Pack 20 — security layer.
      check(
        "fp20: license cache is server-signed (hmac-v2), client salt removed",
        LICENSE_PROTOCOL === "hmac-v2" && USES_LIMIT === 10,
      );
      check(
        "fp20: key-storage warning and rate-limit message are localized",
        t("key.warn", "ru").length > 20 &&
          t("key.warn", "en").length > 20 &&
          t("license.rate", "ru").length > 5 &&
          t("license.rate", "en").length > 5,
      );
      // Fix Pack 21 — studio UX layer.
      check(
        "fp21: guided tour has four anchored steps with localized copy",
        TOUR_STEPS.length === 4 &&
          new Set(TOUR_STEPS.map((s) => s.target)).size === 4 &&
          TOUR_STEPS.every(
            (s) =>
              t(s.titleKey, "ru").length > 0 &&
              t(s.titleKey, "en").length > 0 &&
              t(s.bodyKey, "ru") !== t(s.bodyKey, "en"),
          ),
      );
      check(
        "fp21: undo/redo and the hotkey sheet are localized",
        t("undo.label", "ru") !== t("undo.label", "en") &&
          t("hk.title", "ru") !== t("hk.title", "en") &&
          t("hotkeys.hint", "ru").includes("?"),
      );
      check(
        "fp21: long lists virtualize beyond a sane threshold",
        VIRTUAL_THRESHOLD >= 20 && VIRTUAL_THRESHOLD <= 100,
      );
      // Fix Pack 22 - UI/UX polish invariants.
      check(
        "fp22: silent draft restore ships localized copy with an undo action",
        t("draft.restored", "ru") !== t("draft.restored", "en") &&
          t("draft.undo", "ru").length > 0 &&
          t("draft.undo", "en").length > 0,
      );
      check(
        "fp22: app preferences moved into settings and the bar popover is labeled",
        t("settings.language", "ru") !== t("settings.language", "en") &&
          t("settings.appearance", "ru") !== t("settings.appearance", "en") &&
          t("build.options", "ru") !== t("build.options", "en"),
      );
      check(
        "fp22: the hints layer copy is emoji-free (quiet, opt-in)",
        !t("hints.label", "ru").includes("💡") &&
          !t("hints.label", "en").includes("💡"),
      );
    }
  } catch {
    out.push({ name: "suite crashed", pass: false });
  }

  return out;
}

```


---

## SOURCE FILE: `lib/strength.ts`
SHA-256: `877c31b4553015f282921fe39d62a8cd34e199a2aabf82dc3805c83ea197487f`

```ts
// Fix Pack 13: prompt strength meter. Pure scoring over a SceneSpec (+optional
// passport) so it is unit-testable in selfcheck. Returns 0..100 plus the list
// of gap ids the UI turns into "what to strengthen" hints.

import type { CharacterPassport, SceneSpec } from "./types";

export interface StrengthReport {
  score: number; // 0..100
  gaps: string[]; // i18n suffixes: strength.gap.<id>
}

const VIDEO_ENGINES = ["kling_3", "seedance_2", "veo_scene", "veo_broll"];

function filled(v: string): boolean {
  return v.trim().length > 0;
}

export function promptStrength(
  spec: SceneSpec,
  passport: CharacterPassport | null,
): StrengthReport {
  let total = 0;
  let earned = 0;
  const gaps: string[] = [];

  const add = (weight: number, ok: boolean, gap: string) => {
    total += weight;
    if (ok) earned += weight;
    else gaps.push(gap);
  };

  add(20, filled(spec.location), "location");
  add(15, filled(spec.lighting), "lighting");
  add(10, filled(spec.pose), "pose");
  add(10, filled(spec.outfit), "outfit");

  const cap = spec.capture;
  const captureOk =
    filled(cap.cap) ||
    filled(cap.opt) ||
    filled(cap.film) ||
    cap.expo.length > 0 ||
    cap.imperf.length > 0;
  add(10, captureOk, "capture");

  add(10, spec.realism.length >= 2, "realism");

  if (VIDEO_ENGINES.includes(spec.engine)) {
    add(15, filled(spec.motion.action), "motion");
  }

  if (passport) {
    const identityOk =
      filled(passport.identity.full) ||
      filled(passport.identity.mid) ||
      passport.referencePhotos.length > 0;
    add(15, identityOk, "identity");

    const anomalyOk =
      passport.anomalyLock.checkboxes.length > 0 ||
      filled(passport.anomalyLock.freeText);
    add(10, anomalyOk, "anomaly");
  } else {
    add(25, false, "character");
  }

  const score = total > 0 ? Math.round((earned / total) * 100) : 0;
  return { score, gaps };
}

```


---

## SOURCE FILE: `lib/series.ts`
SHA-256: `b8b406f699d9e319f3bf8941d0481a1f064406340b39c59751e92f0ecf8a6ea8`

```ts
// ============================================================================
// CAROUSEL SERIES — deterministic multi-shot builder (Fix Pack 6).
// One scene -> 3 or 5 coherent shots for a social carousel.
// Identity, outfit, lighting, mood and Anomaly Lock stay IDENTICAL across
// shots; only the framing changes. No LLM involved — pure canon composition.
// Photo mode (Nano Banana Pro) only.
// ============================================================================

import { type BuildOptions, buildPrompts } from "./engines";
import type { BuildResult, Lang, SceneSpec } from "./types";

export type SeriesCount = 3 | 5;

export interface ShotDef {
  id: string;
  label: { ru: string; en: string };
  /** English framing phrase injected into the SCENE/POSE block. */
  framing: string;
}

// Order matters: this is the carousel narrative (context -> person -> texture).
export const SHOTS: ShotDef[] = [
  {
    id: "wide",
    label: { ru: "Общий план", en: "Wide shot" },
    framing:
      "wide establishing shot from a few meters away, full body visible, environment dominates the frame",
  },
  {
    id: "medium",
    label: { ru: "Средний план", en: "Medium shot" },
    framing: "medium shot framed from the waist up, natural candid framing",
  },
  {
    id: "closeup",
    label: { ru: "Крупный план", en: "Close-up" },
    framing: "close-up portrait framing, face and shoulders filling the frame",
  },
  {
    id: "detail",
    label: { ru: "Деталь", en: "Detail shot" },
    framing:
      "detail shot, hands and outfit texture in sharp focus, face softly out of frame",
  },
  {
    id: "pov",
    label: { ru: "Селфи POV", en: "Selfie POV" },
    framing:
      "casual phone selfie at arm's length, slight wide-angle look, first-person feel",
  },
];

export function seriesShots(count: SeriesCount): ShotDef[] {
  return count === 3 ? SHOTS.slice(0, 3) : SHOTS;
}

/**
 * Build a coherent carousel series. Wraps the canonical buildPrompts():
 * per shot we only extend the pose with a framing phrase — every canon rule
 * (block order, budgets, POS_SKIN, U-attention) is applied by the engine.
 */
export function buildSeries(
  spec: SceneSpec,
  opts: BuildOptions,
  count: SeriesCount,
  lang: Lang,
): BuildResult[] {
  return seriesShots(count).map((shot) => {
    const shotSpec: SceneSpec = {
      ...spec,
      pose: [spec.pose, shot.framing].filter(Boolean).join(", "),
    };
    const result = buildPrompts(shotSpec, { ...opts, variants: 1 })[0];
    return { ...result, label: shot.label[lang] };
  });
}

// ============================================================================
// Fix Pack 11 — TECHNIQUE SERIES ×6: six frames of ONE technique.
// Identity, world and technique stay fixed; only state/artifact shift.
// ============================================================================

import { SERIES_SHIFTS } from "./techniques";

export function buildTechniqueSeries(
  spec: SceneSpec,
  opts: BuildOptions,
  lang: Lang,
): BuildResult[] {
  return SERIES_SHIFTS.map((shift, i) => {
    const shotSpec: SceneSpec = shift
      ? { ...spec, pose: [spec.pose, shift].filter(Boolean).join(", ") }
      : spec;
    const result = buildPrompts(shotSpec, { ...opts, variants: 1 })[0];
    return {
      ...result,
      label: (lang === "ru" ? "Кадр " : "Frame ") + (i + 1),
    };
  });
}

```


---

## SOURCE FILE: `lib/shoot.ts`
SHA-256: `d623f99489e77f21625fb0a4b85a1d96edf4aff4f357bbdfd1b162b2239fbfa4`

```ts
// ============================================================================
// Fix Pack 11.2 — SHOOT: one location + one outfit, like a real account shoot.
// 6–12 frames: N hero shots + 2 detail crops + 1 cutaway. Six variation axes
// (pose · angle · distance · prop-in-hands · gaze · artifact). Continuity ON
// keeps location/lighting/outfit VERBATIM in every frame — one place, one day.
// Also here: the flexible technique series (4–8) and the Strict/Live layer.
// ============================================================================

import { canonHabits, canonProps } from "./canon";
import { buildAdHocCutaway, buildCutaway } from "./cutaways";
import { type BuildOptions, buildPrompts } from "./engines";
import type { ScenePack } from "./packs";
import { SERIES_SHIFTS } from "./techniques";
import type { BuildResult, Lang, ModelCanon, SceneSpec } from "./types";

export type FrameRole = "hero" | "detail" | "cutaway" | "off";

/** Deterministic pool pick — reproducible builds; re-roll bumps the seed. */
export function pick<T>(pool: T[], n: number): T {
  return pool[((n % pool.length) + pool.length) % pool.length];
}

// --- Six variation axes -------------------------------------------------------
export const AXIS_POSE = [
  "weight shifted to the other leg",
  "sitting back on her heels",
  "leaning a shoulder against the wall",
  "hand raised to her hair mid-gesture",
  "head tilted, collarbone forward",
  "half-turned away from the camera",
];
export const AXIS_ANGLE = [
  "shot at eye level",
  "shot from slightly above",
  "shot from hip height looking up",
  "framed through the mirror",
];
export const AXIS_DISTANCE = [
  "medium shot from the waist up",
  "full-body shot with the room visible",
  "close framing, face and shoulders",
];
export const AXIS_GAZE = [
  "looking straight into the lens",
  "looking past the camera at something outside the frame",
  "eyes closed, lids heavy",
];
export const AXIS_ARTIFACT = [
  "slight handheld motion blur",
  "one highlight gently clipped",
  "focus caught on the wrong plane for a beat",
  "visible sensor grain in the shadows",
];

// --- Prop pools («предмет в руках») per pack. Defaults only — Fix Pack 11.3
// (Canon) will put the model's own objects first in this pool.
export const PROP_POOLS: Record<string, string[]> = {
  pack_diary: [
    "her phone",
    "a hairbrush",
    "a mug of tea",
    "a pillow hugged to her chest",
  ],
  pack_flash: [
    "a kettle",
    "her phone with the flash still on",
    "a slice of bread on a fork",
  ],
  pack_sunlight: ["a striped towel", "a tube of suncream", "cold soda can"],
  pack_americana: [
    "a motel key fob",
    "a glass soda bottle",
    "oversized sunglasses",
  ],
  pack_studio: ["a numbered casting card", "a clothes hanger", "a pin cushion"],
  pack_suburb: [
    "a garden hose",
    "an envelope from the mailbox",
    "iced lemonade",
  ],
  pack_concrete: [
    "her keys",
    "a plastic shopping bag",
    "her phone in a tired grip",
  ],
  pack_cup: ["a chipped coffee cup", "a croissant on a napkin", "a teaspoon"],
  pack_transit: [
    "her phone",
    "a paper ticket",
    "keys on one finger",
    "earphones",
  ],
  pack_wide: ["her phone at arm's length", "a snack bag", "a soda can"],
  pack_polaroid90: [
    "a polaroid print",
    "a disposable camera",
    "a glass tumbler",
  ],
  pack_fitting: [
    "a pin cushion on a wrist strap",
    "a paper measuring tape",
    "a numbered garment tag",
  ],
  pack_steam: ["a hairbrush", "a corner of the towel", "a face cream jar"],
  pack_4am: [
    "her phone lighting the face from below",
    "a glass of water",
    "the edge of a blanket",
  ],
  pack_screen: ["her phone", "a laptop lid", "a charging cable"],
  pack_motion: [
    "her phone at arm's length",
    "keys on one finger",
    "a hairbrush",
  ],
  pack_night: [
    "a fork straight from the pan",
    "a warm mug",
    "the fridge door handle",
  ],
  pack_squint: [
    "a glass of water catching the light",
    "sunglasses in one hand",
    "the edge of the curtain",
  ],
};

/** Fix Pack 11.3: her personal objects go FIRST; the pack pool is the default. */
export function propPool(packId?: string, canon?: ModelCanon | null): string[] {
  const base = (packId && PROP_POOLS[packId]) || PROP_POOLS.pack_diary;
  const own = canonProps(canon);
  return own.length > 0 ? [...own, ...base] : base;
}

// --- Strict / Live: «Живо» allows controlled codex violations ----------------
export const LOOSE_BREAKS = [
  "strong motion blur smearing half the frame",
  "the top of the head cropped out by the frame",
  "horizon visibly tilted, careless framing",
  "harsh unmotivated direct flash flattening the scene",
];

// --- Continuity OFF: each frame re-describes the place in its own words --------
export const LOCATION_DRIFT = [
  "seen from the opposite corner of the room",
  "another angle of the same place, described loosely",
  "the same spot, but the frame finds a different wall",
  "a step to the side, new background detail",
];

export const DETAIL_FRAMING =
  "extreme detail crop, hands and fabric texture in sharp focus, face outside the frame";

export interface ShootConfig {
  continuity: boolean;
  loose: boolean;
  /** Pack powering prop & cutaway pools; null falls back to generic pools. */
  pack: ScenePack | null;
  /** Base seed; re-roll bumps seeds[i] to rebuild ONE frame only. */
  seed?: number;
  seeds?: number[];
  /** Fix Pack 11.3: the model's canon; null/empty = pack defaults. */
  canon?: ModelCanon | null;
}

/** Role layout: N-3 heroes, 2 details woven in, cutaway second-to-last. */
export function shootComposition(size: number): FrameRole[] {
  const n = Math.min(12, Math.max(6, Math.round(size)));
  const roles: FrameRole[] = [];
  const heroes = n - 3;
  for (let i = 0; i < heroes; i++) {
    roles.push("hero");
    if (i === 1 || i === 3) roles.push("detail");
  }
  while (roles.filter((r) => r === "detail").length < 2) roles.push("detail");
  roles.splice(roles.length - 1, 0, "cutaway");
  return roles.slice(0, n);
}

/** One hero frame = 4–5 of the six axes moved; deterministic by (i, seed). */
export function heroPhrase(
  i: number,
  seed: number,
  packId?: string,
  loose?: boolean,
  canon?: ModelCanon | null,
): string {
  const s = seed + i * 7;
  // Fix Pack 11.3: her body habits go first on the pose axis.
  const poses = [...canonHabits(canon), ...AXIS_POSE];
  const parts = [
    pick(poses, s),
    pick(AXIS_ANGLE, s + 1),
    pick(AXIS_DISTANCE, s + 2),
    pick(AXIS_GAZE, s + 3),
  ];
  if (i % 2 === 1)
    parts.push(`holding ${pick(propPool(packId, canon), s + 4)}`);
  parts.push(pick(AXIS_ARTIFACT, s + 5));
  if (loose && i % 3 === 2) parts.push(pick(LOOSE_BREAKS, s + 6));
  return parts.join(", ");
}

/**
 * Build a shoot: 6–12 frames of one location + one outfit.
 * Continuity ON: location/lighting/outfit strings ride verbatim into every
 * frame (the shoot reads as one place, one day). OFF: location drifts.
 */
export function buildShoot(
  spec: SceneSpec,
  opts: BuildOptions,
  size: number,
  lang: Lang,
  cfg: ShootConfig,
): BuildResult[] {
  const roles = shootComposition(size);
  const seed = cfg.seed ?? 0;
  let heroIdx = 0;
  let detailIdx = 0;
  return roles.map((role, i) => {
    const s = cfg.seeds?.[i] ?? seed;
    if (role === "cutaway") {
      const r = cfg.pack
        ? buildCutaway(cfg.pack, s + i, lang, opts.character?.device, cfg.canon)
        : buildAdHocCutaway(
            spec.location,
            spec.lighting,
            spec.world ?? "A",
            lang,
            opts.character?.device,
          );
      return { ...r, role };
    }
    const drift = cfg.continuity ? "" : pick(LOCATION_DRIFT, s + i);
    const pose =
      role === "detail"
        ? `${DETAIL_FRAMING}, holding ${pick(propPool(cfg.pack?.id, cfg.canon), s + i)}`
        : [
            spec.pose,
            heroPhrase(heroIdx, s, cfg.pack?.id, cfg.loose, cfg.canon),
          ]
            .filter(Boolean)
            .join(", ");
    const frameSpec: SceneSpec = {
      ...spec,
      location: [spec.location, drift].filter(Boolean).join(", "),
      pose,
    };
    const r = buildPrompts(frameSpec, { ...opts, variants: 1 })[0];
    const num = role === "hero" ? ++heroIdx : ++detailIdx;
    const label =
      role === "hero"
        ? `Hero ${num}`
        : `${lang === "ru" ? "Деталь" : "Detail"} ${num}`;
    return { ...r, label, role };
  });
}

// --- Flexible technique series: 4–8 frames of ONE technique --------------------
export const EXTRA_SHIFTS = [
  "micro shift: weight to the other hip, jaw relaxed",
  "one step closer to the camera, same framing logic",
];

export function buildSeriesFlex(
  spec: SceneSpec,
  opts: BuildOptions,
  count: number,
  lang: Lang,
): BuildResult[] {
  const n = Math.min(8, Math.max(4, Math.round(count)));
  const shifts = [...SERIES_SHIFTS, ...EXTRA_SHIFTS].slice(0, n);
  return shifts.map((shift, i) => {
    const shotSpec: SceneSpec = shift
      ? { ...spec, pose: [spec.pose, shift].filter(Boolean).join(", ") }
      : spec;
    const r = buildPrompts(shotSpec, { ...opts, variants: 1 })[0];
    return {
      ...r,
      label: (lang === "ru" ? "Кадр " : "Frame ") + (i + 1),
      role: "hero" as const,
    };
  });
}

```


---

## SOURCE FILE: `lib/feed.ts`
SHA-256: `e0efc02a530087e9c5ab2a0de74d128a15c49a561b660a77d042e7a02737b7a1`

```ts
// ============================================================================
// Fix Pack 11.2 — FEED: a ready slice of a profile, 12–30 frames (step 2).
// 2–3 shoots from packs of ONE world (mixing worlds is allowed but flagged),
// ~20% cutaways woven in by a rhythm template (hero → hero → cutaway → hero →
// detail), exactly ONE deliberately broken frame (role "off") near the end,
// captions + posting-day marks. Deterministic; re-roll bumps one frame's seed.
// ============================================================================

import {
  assignDays,
  caption,
  type CaptionVoice,
  voiceCaption,
  voiceFor,
} from "./captions";
import { buildCutaway } from "./cutaways";
import { type BuildOptions, buildPrompts } from "./engines";
import type { PackScene, ScenePack } from "./packs";
import {
  DETAIL_FRAMING,
  type FrameRole,
  heroPhrase,
  LOCATION_DRIFT,
  LOOSE_BREAKS,
  pick,
  propPool,
} from "./shoot";
import { seasonPhrases } from "./season";
import type { BuildResult, Lang, ModelCanon, SceneSpec } from "./types";

export interface FeedConfig {
  continuity: boolean;
  loose: boolean;
  captions: boolean;
  seed?: number;
  seeds?: number[];
  /** Fix Pack 11.3: the model's canon; null/empty = pack defaults. */
  canon?: ModelCanon | null;
  /** Fix Pack 16: bake the canon city's season into light / wardrobe. */
  season?: boolean;
  /** Fixed date injection point (selfcheck); defaults to now. */
  now?: Date;
}

export interface FeedPlanItem {
  role: FrameRole;
  shoot: number;
}

export interface FeedOutput {
  frames: BuildResult[];
  mixedWorlds: boolean;
  size: number;
}

export function clampFeedSize(n: number): number {
  return Math.min(30, Math.max(12, Math.round(n / 2) * 2));
}

/**
 * Rhythm template, not random: hero → hero → cutaway → hero → detail, cycled;
 * shoots are contiguous chunks (a real profile drops shoots in batches);
 * exactly one hero near the end becomes the broken "off" frame.
 */
export function planFeed(size: number): FeedPlanItem[] {
  const n = clampFeedSize(size);
  const shoots = n <= 18 ? 2 : 3;
  const pattern: FrameRole[] = ["hero", "hero", "cutaway", "hero", "detail"];
  const items: FeedPlanItem[] = [];
  for (let i = 0; i < n; i++) {
    items.push({
      role: pattern[i % pattern.length],
      shoot: Math.min(shoots - 1, Math.floor(i / (n / shoots))),
    });
  }
  for (let i = n - 2; i >= 0; i--) {
    if (items[i].role === "hero") {
      items[i] = { ...items[i], role: "off" };
      break;
    }
  }
  return items;
}

/** Apply a pack scene onto the base spec (same wiring as applying a pack). */
export function specFromPackScene(
  base: SceneSpec,
  pack: ScenePack,
  scene: PackScene,
): SceneSpec {
  return {
    ...base,
    location: scene.fields.location,
    lighting: scene.fields.lighting,
    pose: scene.fields.pose,
    outfit: scene.fields.outfit,
    mood: scene.fields.mood,
    capture: scene.capture,
    style: scene.style,
    world: pack.world,
    technique: scene.techniqueId,
  };
}

export function buildFeed(
  packs: ScenePack[],
  base: SceneSpec,
  opts: BuildOptions,
  size: number,
  lang: Lang,
  cfg: FeedConfig,
): FeedOutput {
  const chosen = packs.slice(0, 3);
  const plan = planFeed(size);
  const seed = cfg.seed ?? 0;
  // Fix Pack 16 — Season Sync: one quiet seasonal layer, no weather APIs.
  const sz = cfg.season
    ? seasonPhrases(cfg.now ?? new Date(), cfg.canon?.place ?? null, seed)
    : null;
  const mixedWorlds = new Set(chosen.map((p) => p.world)).size > 1;
  const shootsCount = Math.max(...plan.map((p) => p.shoot)) + 1;
  // One scene = one location + one outfit per shoot; packs cycled across shoots.
  const shootScenes = Array.from({ length: shootsCount }, (_, k) => {
    const pack = chosen[k % chosen.length];
    const scene = pack.scenes[(seed + k) % pack.scenes.length];
    const spec = specFromPackScene(base, pack, scene);
    if (sz) {
      spec.lighting = [spec.lighting, sz.light].filter(Boolean).join(", ");
      if (k === 0)
        spec.outfit = [spec.outfit, sz.wardrobe].filter(Boolean).join(", ");
    }
    return { pack, spec };
  });
  const days = assignDays(plan.length);
  let heroN = 0;
  let detailN = 0;
  let cutN = 0;
  const frames = plan.map((item, i) => {
    const s = cfg.seeds?.[i] ?? seed;
    const { pack, spec } = shootScenes[item.shoot];
    // Fix Pack 16 — Feed Voice: some hero/detail captions drop in a special
    // format (photo-dump / unsent sms / archive numbering).
    const voice: CaptionVoice =
      cfg.captions && (item.role === "hero" || item.role === "detail")
        ? voiceFor(i, s)
        : "plain";
    const vCap = voice === "plain" ? "" : voiceCaption(voice, s + i, lang);
    const cap = cfg.captions
      ? vCap || caption(pack.world, item.role, s + i, lang, cfg.canon)
      : undefined;
    if (item.role === "cutaway") {
      cutN++;
      const r = buildCutaway(
        pack,
        s + i,
        lang,
        opts.character?.device,
        cfg.canon,
      );
      return {
        ...r,
        // Fix Pack 16: the first cutaway carries the seasonal cue.
        prompt: sz && cutN === 1 ? `${r.prompt} ${sz.cutaway}` : r.prompt,
        role: "cutaway" as const,
        caption: cap,
        day: days[i],
        label: `B-roll ${cutN} · ${r.label ?? ""}`,
      };
    }
    const drift = cfg.continuity ? "" : pick(LOCATION_DRIFT, s + i);
    let pose: string;
    if (item.role === "detail") {
      detailN++;
      pose = `${DETAIL_FRAMING}, holding ${pick(propPool(pack.id, cfg.canon), s + i)}`;
    } else {
      pose = [
        spec.pose,
        heroPhrase(
          heroN,
          s + i,
          pack.id,
          cfg.loose && item.role !== "off",
          cfg.canon,
        ),
      ]
        .filter(Boolean)
        .join(", ");
      if (item.role === "off") pose = `${pose}, ${pick(LOOSE_BREAKS, s + i)}`;
      heroN++;
    }
    const frameSpec: SceneSpec = {
      ...spec,
      location: [spec.location, drift].filter(Boolean).join(", "),
      pose,
    };
    const r = buildPrompts(frameSpec, { ...opts, variants: 1 })[0];
    const label =
      item.role === "off"
        ? lang === "ru"
          ? "OFF-кадр · одно нарушение Codex"
          : "OFF frame · one broken Codex rule"
        : item.role === "detail"
          ? `${lang === "ru" ? "Деталь" : "Detail"} ${detailN}`
          : `Hero ${heroN}`;
    return {
      ...r,
      role: item.role,
      caption: cap,
      day: days[i],
      label,
      voice: voice === "plain" ? undefined : voice,
    };
  });
  return { frames, mixedWorlds, size: plan.length };
}

// --- Fix Pack 16: Codex Line ---------------------------------------------------

/** One quiet line under a generated feed: the codex holds. */
export function codexLine(lang: Lang): string {
  return lang === "ru"
    ? "Codex 5/5 · одно намеренное нарушение"
    : "Codex 5/5 · one intentional break";
}

/** The five codex rules behind the line (popover content). */
export function codexDetails(lang: Lang): string[] {
  return lang === "ru"
    ? [
        "один мир на ленту — эстетика не смешивается",
        "hero → hero → B-roll → hero → деталь",
        "~20% кадров — B-roll без человека",
        "ровно один кадр намеренно нарушает Codex",
        "подписи — голосом мира или её собственными словами",
      ]
    : [
        "one world per feed — aesthetics never mix",
        "rhythm hero → hero → B-roll → hero → detail",
        "~20% of frames are no-person B-roll",
        "exactly one frame breaks Codex on purpose",
        "captions speak the world's voice or her own words",
      ];
}

```


---

## SOURCE FILE: `lib/multishot.ts`
SHA-256: `df803d78338afaabecd77b9b3856e57bfe70d088de2aa68e83c815aa810c294e`

```ts
// ============================================================================
// KLING MULTI-SHOT - deterministic multi-shot builder (Fix Pack 10, A2).
// One scene -> 2..6 shots inside ONE Kling 3.0 prompt ("Shot N (3s): ...").
// Canon: up to 6 shots, at least 3 s per shot, ~15 s total; Kling may trim the
// tail beyond ~15 s and credits for trimmed footage are NOT refunded.
// Identity, outfit, lighting and Anomaly Lock stay IDENTICAL across shots;
// only framing and micro-action change. No LLM - pure canon composition.
// ============================================================================

import {
  type BuildOptions,
  NEG_KLING,
  anomalyText,
  identityText,
} from "./engines";
import { SHOTS, type ShotDef } from "./series";
import type { BuildResult, Lang, SceneSpec } from "./types";

export type MultishotCount = 2 | 3 | 4 | 5 | 6;

export const MULTISHOT_SHOT_SEC = 3;
export const MULTISHOT_TARGET_SEC = 15;

// 6th framing on top of the 5 carousel shot definitions.
const LOW_ANGLE: ShotDef = {
  id: "lowangle",
  label: {
    ru: "\u041d\u0438\u0436\u043d\u0438\u0439 \u0440\u0430\u043a\u0443\u0440\u0441",
    en: "Low angle",
  },
  framing:
    "low-angle shot from below chest height, subject slightly above the camera",
};

export const MULTISHOT_FRAMINGS: ShotDef[] = [...SHOTS, LOW_ANGLE];

export interface MultishotPlan {
  count: MultishotCount;
  perShotSec: number;
  totalSec: number;
  /** true when the sequence exceeds the ~15 s target: Kling may trim the tail, credits are not refunded. */
  overBudget: boolean;
}

export function planMultishot(count: MultishotCount): MultishotPlan {
  const totalSec = count * MULTISHOT_SHOT_SEC;
  return {
    count,
    perShotSec: MULTISHOT_SHOT_SEC,
    totalSec,
    overBudget: totalSec > MULTISHOT_TARGET_SEC,
  };
}

// Neutral English continuations; shot 1 always uses the user's action.
const CONTINUATIONS = [
  "she continues the same action naturally",
  "she pauses and looks around the scene",
  "she shifts her weight and adjusts her posture",
  "she reacts with a small genuine expression",
  "she finishes the movement and settles",
];

/**
 * Build ONE Kling prompt with a numbered shot list. Wraps engine canon:
 * identity comes from identityText() (micro lock with reference), the
 * Anomaly Lock rides in the header so it applies to every shot.
 */
export function buildMultishot(
  spec: SceneSpec,
  opts: BuildOptions,
  count: MultishotCount,
  lang: Lang,
): BuildResult {
  const plan = planMultishot(count);
  const identity = identityText(spec, opts.character, opts.hasReference);
  const anomaly = anomalyText(opts.character);
  const character = `Character: ${identity}${spec.outfit ? " in " + spec.outfit : ""}.${anomaly ? " " + anomaly + "." : ""}`;
  const scene = `Scene: ${spec.location || "natural setting"}${spec.lighting ? ", " + spec.lighting : ""}.`;
  const camera = spec.motion.cameraMove || "camera static on tripod";
  const header = `Multi-shot sequence, ${plan.count} shots, about ${plan.totalSec} seconds total, one continuous scene, the same character in every shot. ${character} ${scene} ${camera}.`;

  const action =
    spec.motion.action || "subtle natural micro-movements, breathing, blinking";
  const dialogue = spec.audio.dialogue.trim()
    ? ` [Character A: natural]: "${spec.audio.dialogue.trim().replace(/"/g, "'")}".`
    : "";
  // Dialogue rides on the close-up shot when there is one, otherwise shot 1.
  const dialogueIndex = plan.count >= 3 ? 2 : 0;

  const lines: string[] = [];
  for (let i = 0; i < plan.count; i++) {
    const framing = MULTISHOT_FRAMINGS[i].framing;
    const act =
      i === 0 ? action : CONTINUATIONS[(i - 1) % CONTINUATIONS.length];
    const say = dialogue && i === dialogueIndex ? dialogue : "";
    lines.push(
      `Shot ${i + 1} (${plan.perShotSec}s): ${framing}, ${act}.${say}`,
    );
  }

  const intensity = spec.motion.intensity || 0.5;
  const prompt = `${header} ${lines.join(" ")} Motion intensity ${intensity}.`;
  const label =
    lang === "ru"
      ? `\u041c\u0443\u043b\u044c\u0442\u0438\u0448\u043e\u0442 ${plan.count}\u00d7${plan.perShotSec} \u0441`
      : `Multi-shot ${plan.count}x${plan.perShotSec}s`;
  return { prompt, negative: NEG_KLING, label };
}

```


---

## SOURCE FILE: `lib/season.ts`
SHA-256: `5765cb5797bbc8cf4a38ea8e90b88391c8f5c8548edfd08549360d929e08d933`

```ts
// ============================================================================
// Fix Pack 16 — SEASON SYNC. Season + time of day derived DETERMINISTICALLY
// from the date and the canon place (no weather APIs — fragile, and 80% of
// the realism comes from season alone). The layer adds one quiet seasonal
// phrase to lighting, one wardrobe cue and one cutaway line. Also powers the
// landing “daylight header” tone.
// ============================================================================

import { pick } from "./shoot";
import type { Lang } from "./types";

export type Season = "winter" | "spring" | "summer" | "autumn";
export type Daypart = "morning" | "day" | "evening" | "night";

export function seasonOf(date: Date): Season {
  const m = date.getMonth();
  if (m === 11 || m <= 1) return "winter";
  if (m <= 4) return "spring";
  if (m <= 7) return "summer";
  return "autumn";
}

const SOUTH = [
  "australia",
  "sydney",
  "melbourne",
  "buenos aires",
  "argentina",
  "brazil",
  "rio",
  "sao paulo",
  "cape town",
  "johannesburg",
  "south africa",
  "auckland",
  "wellington",
  "new zealand",
  "santiago",
  "chile",
  "lima",
  "peru",
  "bolivia",
  "paraguay",
  "uruguay",
  "montevideo",
];

/** True when the canon place clearly lives in the southern hemisphere. */
export function isSouthern(place?: string[] | null): boolean {
  if (!place || place.length === 0) return false;
  const joined = place.join(" ").toLowerCase();
  return SOUTH.some((k) => joined.includes(k));
}

const FLIP: Record<Season, Season> = {
  winter: "summer",
  spring: "autumn",
  summer: "winter",
  autumn: "spring",
};

export function seasonFor(date: Date, place?: string[] | null): Season {
  const s = seasonOf(date);
  return isSouthern(place) ? FLIP[s] : s;
}

export function daypartOf(hour: number): Daypart {
  if (hour >= 5 && hour <= 10) return "morning";
  if (hour >= 11 && hour <= 16) return "day";
  if (hour >= 17 && hour <= 21) return "evening";
  return "night";
}

// --- Quiet seasonal phrase pools (EN, codex-compatible, no drama) -----------

export const SEASON_LIGHT: Record<Season, string[]> = {
  winter: [
    "low pale winter sun through the window",
    "early blue dusk outside the window",
    "cold grey daylight, radiators on",
  ],
  spring: [
    "thin bright spring light",
    "washed-out morning sun after rain",
    "open window light, curtains moving",
  ],
  summer: [
    "hard summer sun, deep shadows",
    "late golden evening light",
    "humid afternoon haze indoors",
  ],
  autumn: [
    "low amber autumn sun",
    "early dusk, lamps on by five",
    "flat overcast autumn daylight",
  ],
};

export const SEASON_WARDROBE: Record<Season, string[]> = {
  winter: [
    "a heavy coat thrown over the chair",
    "wool socks, sleeves pulled over hands",
    "a scarf still on indoors",
  ],
  spring: [
    "a light jacket over yesterday's tee",
    "bare ankles, first warm day",
    "a hoodie tied around the waist",
  ],
  summer: [
    "a thin cotton dress, hair up",
    "bare shoulders, sunscreen sheen",
    "yesterday's swimsuit drying on the rail",
  ],
  autumn: [
    "an oversized knit sweater",
    "a denim jacket over a hoodie",
    "boots by the door, first cold week",
  ],
};

export const SEASON_CUTAWAY: Record<Season, string[]> = {
  winter: [
    "A winter coat left over the chair back.",
    "Wet boot prints drying by the door.",
    "A mug steaming against a cold window.",
  ],
  spring: [
    "A light jacket dropped on the bed.",
    "Fresh mud on white sneakers by the door.",
    "An open window, curtain caught mid-move.",
  ],
  summer: [
    "A fan running on the floor.",
    "Half-melted ice in a glass on the sill.",
    "A swimsuit drying over the radiator.",
  ],
  autumn: [
    "A wet umbrella drying in the corner.",
    "Leaves stuck to the doormat.",
    "Tea going cold on the windowsill.",
  ],
};

export interface SeasonPhrases {
  season: Season;
  daypart: Daypart;
  light: string;
  wardrobe: string;
  cutaway: string;
}

/** Deterministic seasonal phrase set for a date + canon place + seed. */
export function seasonPhrases(
  date: Date,
  place: string[] | null | undefined,
  seed: number,
): SeasonPhrases {
  const season = seasonFor(date, place);
  const daypart = daypartOf(date.getHours());
  return {
    season,
    daypart,
    light: pick(SEASON_LIGHT[season], seed),
    wardrobe: pick(SEASON_WARDROBE[season], seed),
    cutaway: pick(SEASON_CUTAWAY[season], seed),
  };
}

const SEASON_LABEL: Record<Season, Record<Lang, string>> = {
  winter: { ru: "зима", en: "winter" },
  spring: { ru: "весна", en: "spring" },
  summer: { ru: "лето", en: "summer" },
  autumn: { ru: "осень", en: "autumn" },
};

const DAYPART_LABEL: Record<Daypart, Record<Lang, string>> = {
  morning: { ru: "утро", en: "morning" },
  day: { ru: "день", en: "day" },
  evening: { ru: "вечер", en: "evening" },
  night: { ru: "ночь", en: "night" },
};

/** One quiet UI line: “лето · вечер — сезон вшит в промпты”. */
export function seasonNote(s: SeasonPhrases, lang: Lang): string {
  const a = SEASON_LABEL[s.season][lang];
  const b = DAYPART_LABEL[s.daypart][lang];
  return lang === "ru"
    ? `${a} · ${b} — сезон её города вшит в свет и гардероб`
    : `${a} · ${b} — her city's season is baked into light and wardrobe`;
}

// --- Landing daylight header -------------------------------------------------

export interface DaylightTone {
  daypart: Daypart;
  /** Subtle top-strip gradient for the landing hero. */
  tint: string;
}

export function daylightTone(hour: number): DaylightTone {
  const daypart = daypartOf(hour);
  const tints: Record<Daypart, string> = {
    morning:
      "linear-gradient(180deg, rgba(255,244,224,0.9) 0%, rgba(255,255,255,0) 65%)",
    day: "linear-gradient(180deg, rgba(238,246,255,0.9) 0%, rgba(255,255,255,0) 65%)",
    evening:
      "linear-gradient(180deg, rgba(253,238,227,0.9) 0%, rgba(255,255,255,0) 65%)",
    night:
      "linear-gradient(180deg, rgba(233,237,246,0.95) 0%, rgba(255,255,255,0) 65%)",
  };
  return { daypart, tint: tints[daypart] };
}

```


---

## SOURCE FILE: `lib/cutaways.ts`
SHA-256: `d1a282049b910ffd7007b28b03e3eb1662df70d7d5bf254071d0409cbbc4e1b9`

```ts
// ============================================================================
// Fix Pack 11.2 — CUTAWAYS: frames without the person (~15–25% of a feed).
// A cutaway prompt NEVER contains IDENTITY / passport data: it is assembled
// here from scratch, not via the standard prompt builder. Each pack ships a pool of 3–5
// prompt-ready empty-scene moments; the pool is only the default — Fix Pack
// 11.3 (Canon) will cross it with the model's own place and personal objects.
// ============================================================================

import { canonCutaways } from "./canon";
import { DEV, SENSOR, WORLD_SUFFIX } from "./engines";
import type { ScenePack } from "./packs";
import type { BuildResult, Lang, ModelCanon } from "./types";

export type Cutaway = {
  id: string;
  label: Record<Lang, string>;
  /** English empty-scene phrase. No person, no face, no identity. */
  text: string;
  lighting: string;
};

export const CUTAWAY_POOLS: Record<string, Cutaway[]> = {
  pack_diary: [
    {
      id: "cut_diary_bed",
      label: { ru: "Неубранная кровать", en: "Unmade bed" },
      text: "an unmade bed, blanket pushed aside, a dent still in the pillow",
      lighting: "hard morning sunlight stripes across the sheets",
    },
    {
      id: "cut_diary_chair",
      label: { ru: "Одежда на стуле", en: "Clothes on a chair" },
      text: "yesterday's clothes slipping off the back of a chair",
      lighting: "flat grey daylight from the window",
    },
    {
      id: "cut_diary_sill",
      label: { ru: "Подоконник", en: "Window sill" },
      text: "a window sill with an empty glass and a single hair clip",
      lighting: "soft late-morning light, dust in the air",
    },
    {
      id: "cut_diary_cable",
      label: { ru: "Зарядка на полу", en: "Charger on the floor" },
      text: "a phone charger cable snaking across the bedroom floor",
      lighting: "warm low lamp light in the evening",
    },
  ],
  pack_flash: [
    {
      id: "cut_flash_table",
      label: { ru: "Кухонный стол", en: "Kitchen table" },
      text: "a bare kitchen table with one plate and crumbs, night outside",
      lighting: "harsh direct on-camera flash, background falling to black",
    },
    {
      id: "cut_flash_stairs",
      label: { ru: "Лестничная клетка", en: "Stairwell corner" },
      text: "a stairwell corner with peeling paint and a radiator",
      lighting: "direct flash flattening the wall, hard shadow behind the pipe",
    },
    {
      id: "cut_flash_fridge",
      label: { ru: "Открытый холодильник", en: "Open fridge" },
      text: "an open fridge glowing in a dark kitchen, shelves half empty",
      lighting: "cold fridge light only, everything else black",
    },
  ],
  pack_sunlight: [
    {
      id: "cut_sun_tiles",
      label: { ru: "Кафель у бассейна", en: "Pool tiles" },
      text: "wet pool tiles with a drying footprint trail",
      lighting: "hard noon sun, knife-sharp shadows",
    },
    {
      id: "cut_sun_lounger",
      label: { ru: "Шезлонг", en: "Vinyl lounger" },
      text: "a vinyl lounger with a striped towel flung over it",
      lighting: "blinding southern light, glare on the vinyl",
    },
    {
      id: "cut_sun_water",
      label: { ru: "Блики на воде", en: "Water glare" },
      text: "sun ripples on turquoise water, nothing else in the frame",
      lighting: "midday sun bouncing hard off the surface",
    },
  ],
  pack_americana: [
    {
      id: "cut_motel_sign",
      label: { ru: "Неон мотеля", en: "Motel neon" },
      text: "a motel vacancy sign against a dusk sky, wires crossing the frame",
      lighting: "neon glow against fading daylight",
    },
    {
      id: "cut_motel_bed",
      label: { ru: "Покрывало и телевизор", en: "Bedspread and TV" },
      text: "a patterned motel bedspread and an old TV on the dresser",
      lighting: "even artificial ceiling light, slightly too warm",
    },
    {
      id: "cut_motel_lot",
      label: { ru: "Парковка", en: "Parking lot" },
      text: "an almost empty motel parking lot with one dusty car",
      lighting: "flat overhead noon sun, saturated colors",
    },
  ],
  pack_studio: [
    {
      id: "cut_cast_wall",
      label: { ru: "Стена с метками", en: "Taped wall" },
      text: "a bare casting wall with tape marks and one plastic chair",
      lighting: "even businesslike daylight from a big window",
    },
    {
      id: "cut_cast_rail",
      label: { ru: "Рейл с номерами", en: "Numbered rail" },
      text: "a clothes rail with numbered cards pinned to garment bags",
      lighting: "neutral studio strip light",
    },
    {
      id: "cut_cast_polas",
      label: { ru: "Полароиды на стене", en: "Polaroids on the wall" },
      text: "a grid of test polaroids taped to a white wall",
      lighting: "flat daylight, no drama",
    },
  ],
  pack_suburb: [
    {
      id: "cut_sub_sprinkler",
      label: { ru: "Поливалка", en: "Sprinkler" },
      text: "a lawn sprinkler ticking over an empty, too-perfect lawn",
      lighting: "clean afternoon sun, saturated green",
    },
    {
      id: "cut_sub_mailbox",
      label: { ru: "Почтовые ящики", en: "Mailboxes" },
      text: "a row of identical suburban mailboxes along the curb",
      lighting: "hard 3pm light, long shadows",
    },
    {
      id: "cut_sub_pool",
      label: { ru: "Край бассейна", en: "Pool edge" },
      text: "a backyard pool edge with an inflatable float drifting alone",
      lighting: "postcard-bright sun, one wrong quiet note",
    },
  ],
  pack_concrete: [
    {
      id: "cut_conc_yard",
      label: { ru: "Двор панельки", en: "Panel-block yard" },
      text: "a panel-block courtyard with a bent swing and trampled snowless ground",
      lighting: "flat grey overcast daylight",
    },
    {
      id: "cut_conc_window",
      label: { ru: "Окно подъезда", en: "Stairwell window" },
      text: "a stairwell window with wired glass and a dying plant on the sill",
      lighting: "cold fluorescent tube overhead",
    },
    {
      id: "cut_conc_underpass",
      label: { ru: "Переход", en: "Underpass" },
      text: "an empty concrete underpass, wet floor reflecting the lights",
      lighting: "greenish fluorescent strips, uneven",
    },
  ],
  pack_cup: [
    {
      id: "cut_cup_table",
      label: { ru: "Чашка на столе", en: "Cup on the table" },
      text: "a half-finished coffee cup on a table with croissant crumbs",
      lighting: "soft morning window light",
    },
    {
      id: "cut_cup_sill",
      label: { ru: "Пар над чашкой", en: "Steam over the cup" },
      text: "a steaming cup on a windowsill, condensation on the glass",
      lighting: "backlit morning haze",
    },
    {
      id: "cut_cup_cafe",
      label: { ru: "Столик кафе", en: "Cafe table" },
      text: "an empty cafe table with sugar packets and a folded receipt",
      lighting: "daylight through a big cafe window",
    },
  ],
  pack_transit: [
    {
      id: "cut_tr_window",
      label: { ru: "Окно в дожде", en: "Rain-streaked window" },
      text: "a bus window streaked with rain, empty seat in front of it",
      lighting: "grey moving daylight, city smeared outside",
    },
    {
      id: "cut_tr_seat",
      label: { ru: "Свет на сиденье", en: "Light on the seat" },
      text: "golden hour light crossing worn train seat fabric",
      lighting: "low warm sun through the glass, moving shadows",
    },
    {
      id: "cut_tr_ticket",
      label: { ru: "Билет и ключи", en: "Ticket and keys" },
      text: "a paper ticket and keys dropped on the seat beside",
      lighting: "soft window light, reflections on the glass",
    },
  ],
  pack_wide: [
    {
      id: "cut_wide_shoes",
      label: { ru: "Кроссовки у двери", en: "Sneakers by the door" },
      text: "sneakers kicked off by the door, laces still tied",
      lighting: "hallway ceiling light, slightly green",
    },
    {
      id: "cut_wide_lift",
      label: { ru: "Пустой лифт", en: "Empty lift" },
      text: "an empty lift interior, scratched metal walls",
      lighting: "flat lift panel light",
    },
    {
      id: "cut_wide_floor",
      label: { ru: "Пол и обёртки", en: "Floor and wrappers" },
      text: "snack wrappers and a phone face-down on the floor",
      lighting: "TV glow flickering in a dim room",
    },
  ],
  pack_polaroid90: [
    {
      id: "cut_p90_prints",
      label: { ru: "Полароиды на ковре", en: "Prints on the carpet" },
      text: "a scatter of polaroid prints on a patterned carpet",
      lighting: "direct flash, hard falloff into the room",
    },
    {
      id: "cut_p90_wallcarpet",
      label: { ru: "Ковёр на стене", en: "Wall carpet" },
      text: "an ornamental wall carpet with one framed family photo",
      lighting: "bare bulb light, warm and uneven",
    },
    {
      id: "cut_p90_table",
      label: { ru: "Стол после гостей", en: "Table after guests" },
      text: "a festive table after everyone left, napkins and empty glasses",
      lighting: "flash-lit, deep shadows behind the chairs",
    },
  ],
  pack_fitting: [
    {
      id: "cut_fit_rail",
      label: { ru: "Рейл", en: "The rail" },
      text: "a rolling rail of numbered garments, tags swinging slightly",
      lighting: "flat studio daylight",
    },
    {
      id: "cut_fit_pins",
      label: { ru: "Булавки", en: "Pins" },
      text: "a pin cushion and a paper measuring tape on a stool",
      lighting: "even fluorescent working light",
    },
    {
      id: "cut_fit_wall",
      label: { ru: "Полароиды на стене", en: "Polaroids on the wall" },
      text: "fitting polaroids taped in a crooked row on the studio wall",
      lighting: "ceiling light glare on glossy prints",
    },
    {
      id: "cut_fit_floor",
      label: { ru: "Бирки на полу", en: "Tags on the floor" },
      text: "a small heap of clips and price tags by the mirror",
      lighting: "soft window light across the floor",
    },
  ],
  pack_steam: [
    {
      id: "cut_steam_mirror",
      label: { ru: "Полоса на зеркале", en: "Streak on the mirror" },
      text: "a fogged mirror with one hand-wiped streak, already fogging back",
      lighting: "warm bulb diffused by steam",
    },
    {
      id: "cut_steam_towel",
      label: { ru: "Полотенце", en: "The towel" },
      text: "a towel on a hook, still dripping onto the tiles",
      lighting: "grey light from a frosted window",
    },
    {
      id: "cut_steam_brush",
      label: { ru: "Расчёска", en: "Hairbrush" },
      text: "a hairbrush with wet strands left on the shelf",
      lighting: "single warm bathroom bulb",
    },
    {
      id: "cut_steam_tiles",
      label: { ru: "Конденсат", en: "Condensation" },
      text: "condensation running down the tiles in thin lines",
      lighting: "steamy warm light, soft edges",
    },
  ],
  pack_4am: [
    {
      id: "cut_4am_phone",
      label: { ru: "Телефон в простынях", en: "Phone in the sheets" },
      text: "a phone glowing face-down in the folds of the sheets",
      lighting: "cold screen light in a black room",
    },
    {
      id: "cut_4am_kettle",
      label: { ru: "Чайник", en: "The kettle" },
      text: "kettle steam rising against a black kitchen window",
      lighting: "one dim warm bulb",
    },
    {
      id: "cut_4am_clock",
      label: { ru: "Часы", en: "The clock" },
      text: "a dim clock reading 4:12 on a shelf in the dark",
      lighting: "faint glow, everything else underexposed",
    },
    {
      id: "cut_4am_blanket",
      label: { ru: "Откинутое одеяло", en: "Blanket thrown back" },
      text: "a blanket thrown back, a dent still in the pillow",
      lighting: "street light seeping through the curtain",
    },
  ],
  pack_screen: [
    {
      id: "cut_screen_laptop",
      label: { ru: "Пауза", en: "Paused" },
      text: "a laptop paused mid-frame in a dark room",
      lighting: "screen glow as the only source",
    },
    {
      id: "cut_screen_prop",
      label: { ru: "Телефон у чашки", en: "Phone against a mug" },
      text: "a phone propped against a mug, a call still connected",
      lighting: "cold screen light on the tabletop",
    },
    {
      id: "cut_screen_cables",
      label: { ru: "Зарядки", en: "Chargers" },
      text: "a tangle of chargers and cables on the desk edge",
      lighting: "dim desk lamp",
    },
    {
      id: "cut_screen_glare",
      label: { ru: "Блик экрана", en: "Screen glare" },
      text: "screen glare reflected in a glass of water",
      lighting: "blue screen light in a dark room",
    },
  ],
  pack_motion: [
    {
      id: "cut_motion_brush",
      label: { ru: "Расчёска на полу", en: "Brush on the floor" },
      text: "a hairbrush dropped in the middle of the floor",
      lighting: "soft window daylight",
    },
    {
      id: "cut_motion_jacket",
      label: { ru: "Куртка на ручке", en: "Jacket on the doorknob" },
      text: "a jacket flung over the doorknob, one sleeve inside out",
      lighting: "hallway ceiling light",
    },
    {
      id: "cut_motion_chair",
      label: { ru: "Стул", en: "The chair" },
      text: "a chair still rocking slightly, nobody in the frame",
      lighting: "flat daylight",
    },
    {
      id: "cut_motion_keys",
      label: { ru: "Ключи", en: "The keys" },
      text: "keys just landed in the bowl, still tilted",
      lighting: "warm entryway lamp",
    },
  ],
  pack_night: [
    {
      id: "cut_night_pan",
      label: { ru: "Сковорода", en: "The pan" },
      text: "a pan on the stove, thin steam rising into the bulb light",
      lighting: "single incandescent bulb overhead",
    },
    {
      id: "cut_night_window",
      label: { ru: "Чёрное окно", en: "Black window" },
      text: "a black kitchen window with the bulb's reflection hanging in it",
      lighting: "warm light inside, nothing outside",
    },
    {
      id: "cut_night_fork",
      label: { ru: "Вилка", en: "The fork" },
      text: "a fork left on the counter edge next to the pan lid",
      lighting: "low warm light, deep shadows",
    },
    {
      id: "cut_night_fridge",
      label: { ru: "Дверца холодильника", en: "Fridge door" },
      text: "the fridge door left ajar, cold light spilling on the floor",
      lighting: "cold fridge light in a dark kitchen",
    },
  ],
  pack_squint: [
    {
      id: "cut_sq_curtain",
      label: { ru: "Штора в контровом", en: "Backlit curtain" },
      text: "a thin curtain glowing with low sun, pattern of the window behind",
      lighting: "soft golden backlight, flare licking the frame edge",
    },
    {
      id: "cut_sq_balcony",
      label: { ru: "Перила балкона", en: "Balcony railing" },
      text: "a balcony railing catching the last warm light, city softened behind",
      lighting: "golden hour, gentle haze",
    },
    {
      id: "cut_sq_beam",
      label: { ru: "Луч на стене", en: "Beam on the wall" },
      text: "a dusty sunbeam crossing a plain wall, nothing else staged",
      lighting: "low warm side light, floating dust",
    },
  ],
};

/** Fix Pack 11.3: canon cutaways (her place × her objects) go FIRST. */
export function cutawayPool(
  packId: string,
  canon?: ModelCanon | null,
): Cutaway[] {
  return [...canonCutaways(canon), ...(CUTAWAY_POOLS[packId] ?? [])];
}

function composeCutaway(
  text: string,
  lighting: string,
  world: "A" | "B" | "C",
  device?: string,
): string {
  return [
    `SCENE: ${text}, ${lighting}, nobody in the frame, a lived-in moment just left behind.`,
    "TECHNIQUE: casual handheld phone snapshot of an empty scene, slightly careless framing, one physically plausible imperfection: soft handheld blur at the frame edges.",
    `TECHNICAL: ${device || DEV}, ${SENSOR}.`,
    `MOOD: quiet in-between moment, ${WORLD_SUFFIX[world]}.`,
    `(key: empty scene, no people, no face, no hands, ${lighting})`,
  ].join(" ");
}

/** Build one cutaway from a pack pool. Deterministic by index. */
export function buildCutaway(
  pack: ScenePack,
  index: number,
  lang: Lang,
  device?: string,
  canon?: ModelCanon | null,
): BuildResult {
  const pool = cutawayPool(pack.id, canon);
  if (pool.length === 0) {
    return buildAdHocCutaway("", "", pack.world, lang, device);
  }
  const c = pool[((index % pool.length) + pool.length) % pool.length];
  return {
    prompt: composeCutaway(c.text, c.lighting, pack.world, device),
    label: c.label[lang],
    role: "cutaway",
  };
}

/** Packless fallback: an empty-scene frame built from the current location. */
export function buildAdHocCutaway(
  location: string,
  lighting: string,
  world: "A" | "B" | "C",
  lang: Lang,
  device?: string,
): BuildResult {
  const text = location || "the corner of the room she just left";
  const light = lighting || "soft natural window light";
  return {
    prompt: composeCutaway(text, light, world, device),
    label: "B-roll",
    role: "cutaway",
  };
}

```


---

## SOURCE FILE: `lib/captions.ts`
SHA-256: `a2324520f101355e96fec2a56ed81b81b0296a49aa2a17eeed62b1b962fae0b6`

```ts
// ============================================================================
// Fix Pack 11.2 — CAPTIONS: generated together with the prompt, per world.
// A: lowercase 1–3 words · B: empty or one word · C: a short film-still title.
// Zero hashtags. The «⚙» popover switches captions off; Fix Pack 11.3
// (Canon) will replace the pools with the model's own caption voice.
// Posting rhythm: feed frames drop in day batches, like real accounts.
// ============================================================================

import { canonCaptions } from "./canon";
import { pick } from "./shoot";
import type { Lang, ModelCanon } from "./types";

export type World = "A" | "B" | "C";
export type CaptionRole = "hero" | "detail" | "cutaway" | "off";

export const CAPTION_POOLS: Record<World, Record<Lang, string[]>> = {
  A: {
    ru: ["ещё дома", "утро??", "4am", "ну такое", "день никакой", "жива"],
    en: ["still home", "morning??", "4am", "idk", "slow day", "alive"],
  },
  B: {
    ru: ["", "двор", "", "ночь", ""],
    en: ["", "yard", "", "night", ""],
  },
  C: {
    ru: [
      "motel, room 4",
      "casting day",
      "suburbia, 3pm",
      "лето, напечатано",
      "polaroid, '95",
    ],
    en: [
      "motel, room 4",
      "casting day",
      "suburbia, 3pm",
      "summer, printed",
      "polaroid, '95",
    ],
  },
};

export const CUTAWAY_CAPTIONS: Record<Lang, string[]> = {
  ru: ["", "тут", "свет", ""],
  en: ["", "here", "light", ""],
};

/** Deterministic caption for a frame. Empty string = post without caption. */
export function caption(
  world: World,
  role: CaptionRole,
  i: number,
  lang: Lang,
  canon?: ModelCanon | null,
): string {
  if (role === "off") return "…";
  if (role === "cutaway") return pick(CUTAWAY_CAPTIONS[lang], i);
  // Fix Pack 11.3: her own words replace the world pool on hero/detail frames.
  const own = canonCaptions(canon);
  if (own.length > 0) return pick(own, i);
  return pick(CAPTION_POOLS[world][lang], i);
}

export function dayLabel(day: number, lang: Lang): string {
  return (lang === "ru" ? "день " : "day ") + day;
}

/** Posting rhythm: batches of 1–3 frames per day, gaps between drop days. */
export const DAY_BATCHES = [2, 1, 3, 2, 2, 1];
export const DAY_GAPS = [1, 2, 1, 3, 1, 2];

export function assignDays(count: number): number[] {
  const days: number[] = [];
  let day = 1;
  let bi = 0;
  while (days.length < count) {
    const batch = DAY_BATCHES[bi % DAY_BATCHES.length];
    for (let j = 0; j < batch && days.length < count; j++) days.push(day);
    day += DAY_GAPS[bi % DAY_GAPS.length];
    bi++;
  }
  return days;
}

// ============================================================================
// Fix Pack 16 — FEED VOICE: caption FORMATS from the profile atlas become
// post formats: photo-dump, unsent sms, archive numbering. Mostly "plain"
// (the world pool / canon voice); the rhythm drops a special format roughly
// every third–fourth frame. Deterministic, like everything else here.
// ============================================================================

export type CaptionVoice = "plain" | "dump" | "sms" | "archive";

export const VOICE_RHYTHM: CaptionVoice[] = [
  "plain",
  "plain",
  "archive",
  "plain",
  "plain",
  "dump",
  "plain",
  "sms",
];

export function voiceFor(i: number, seed: number): CaptionVoice {
  return pick(VOICE_RHYTHM, i + seed);
}

export const DUMP_CAPTIONS: Record<Lang, string[]> = {
  ru: [
    "то, что забыла выложить",
    "фотодамп, без порядка",
    "с телефона, не отбирала",
  ],
  en: [
    "things I forgot to post",
    "photo dump, no order",
    "camera roll, unsorted",
  ],
};

export const SMS_CAPTIONS: Record<Lang, string[]> = {
  ru: [
    "не отправила: «я на месте»",
    "черновик: «наберу позже»",
    "не отправила: «спишь?»",
  ],
  en: ["unsent: “i'm here”", "draft: “call you later”", "unsent: “you up?”"],
};

/** Archive numbering caption: 0347.jpg — deterministic from the seed. */
export function archiveName(n: number): string {
  const num = 100 + (((((n + 1) * 97) % 900) + 900) % 900);
  return `${String(num).padStart(4, "0")}.jpg`;
}

/** Caption for a non-plain voice; plain falls back to caption(). */
export function voiceCaption(
  voice: CaptionVoice,
  n: number,
  lang: Lang,
): string {
  if (voice === "archive") return archiveName(n);
  if (voice === "dump") return pick(DUMP_CAPTIONS[lang], n);
  if (voice === "sms") return pick(SMS_CAPTIONS[lang], n);
  return "";
}

/** Short UI mark for the voice format; empty for plain. */
export function voiceLabel(voice: CaptionVoice, lang: Lang): string {
  const m: Record<CaptionVoice, Record<Lang, string>> = {
    plain: { ru: "", en: "" },
    dump: { ru: "дамп", en: "dump" },
    sms: { ru: "смс", en: "sms" },
    archive: { ru: "архив", en: "archive" },
  };
  return m[voice][lang];
}

```


---

## SOURCE FILE: `lib/provider-settings.ts`
SHA-256: `2c795a5620f101315ab1914b8a9ba1ed30160710dc1e7acb597aa14802b480de`

```ts
import type { Settings, VisionProvider } from "./types";

/** Provider-specific credentials/model must never leak across a real switch. */
export function providerSwitchPatch(
  oldProvider: VisionProvider,
  newProvider: VisionProvider,
): Partial<Settings> | null {
  if (oldProvider === newProvider) return null;
  return {
    provider: newProvider,
    apiKey: "",
    model: "",
  };
}

```


---

## SOURCE FILE: `lib/llm.ts`
SHA-256: `8ad3ac1c76f0d174231400bd8627a0fb3f6cf173717ccb2d957445e6766d8ada`

```ts
// Optional LLM helpers on top of the connected model: scene enhancement,
// unknown-word translation, prompt critique, and the assistant chat protocol.
// Final prompts are STILL built deterministically in engines.ts — the LLM only
// helps the user describe the scene and review/tweak results.

import type { EngineId, Lang, Mode } from "./types";
import { chatLlm, type LlmConfig, type LlmResult } from "./vision";

const HARD_RULES = `Hard rules (never violate):
- Generated prompts are always ENGLISH, physical/observable terms only.
- Photorealism canon: natural skin texture; never suggest beauty filters, skin smoothing or retouching.
- Never add seed parameters, watermarks or text overlays.
- Canonical blocks must stay VERBATIM if present: the device string ("black iPhone 15 Pro Max..."), the "natural skin texture..." block, negative prompt blocks, motion intensity values, "(no subtitles)", "Use Flow.", "under 10 seconds", @image/@video/@audio tags.`;

// --- Scene enhancement ----------------------------------------------------------

export async function enhanceScene(
  cfg: LlmConfig,
  sceneText: string,
  lang: Lang,
): Promise<LlmResult> {
  const langName = lang === "ru" ? "Russian" : "English";
  return chatLlm(
    cfg,
    [
      {
        role: "user",
        text: `You improve scene descriptions for an AI-influencer photo/video prompt builder. Rewrite the description below with more specific physical detail (location, lighting, camera, pose, outfit, mood). Keep it believable and non-generic. Reply in ${langName} with the rewritten description ONLY: max 40 words, comma-separated phrases, no quotes.\n\n${sceneText}`,
      },
    ],
    300,
  );
}

// --- Unknown-word translation -----------------------------------------------------

export interface TranslatedWord {
  word: string;
  en: string;
  cat: "location" | "lighting" | "camera" | "pose" | "outfit" | "mood";
}

const CATS = new Set([
  "location",
  "lighting",
  "camera",
  "pose",
  "outfit",
  "mood",
]);

export async function translateWords(
  cfg: LlmConfig,
  words: string[],
): Promise<{
  ok: boolean;
  entries: TranslatedWord[];
  error?: LlmResult["error"];
}> {
  const res = await chatLlm(
    cfg,
    [
      {
        role: "user",
        text: `Translate each word into a short English visual tag (1-3 words, lowercase) for photo/video prompts and classify it. Categories: location, lighting, camera, pose, outfit, mood. Reply ONLY with a JSON array like [{"word":"...","en":"...","cat":"..."}].\nWords: ${words.join(", ")}`,
      },
    ],
    400,
  );
  if (!res.ok) return { ok: false, entries: [], error: res.error };
  const m = res.text.match(/\[[\s\S]*\]/);
  if (!m) return { ok: false, entries: [], error: "empty" };
  try {
    const raw = JSON.parse(m[0]) as Array<Record<string, unknown>>;
    const entries: TranslatedWord[] = [];
    for (const r of raw) {
      const word =
        typeof r.word === "string" ? r.word.toLowerCase().trim() : "";
      const en = typeof r.en === "string" ? r.en.toLowerCase().trim() : "";
      const cat =
        typeof r.cat === "string" && CATS.has(r.cat)
          ? (r.cat as TranslatedWord["cat"])
          : "mood";
      if (word && en) entries.push({ word, en, cat });
    }
    return {
      ok: entries.length > 0,
      entries,
      error: entries.length > 0 ? undefined : "empty",
    };
  } catch {
    return { ok: false, entries: [], error: "empty" };
  }
}

// --- Prompt critique --------------------------------------------------------------

export async function critiquePrompt(
  cfg: LlmConfig,
  prompt: string,
  engine: EngineId,
  lang: Lang,
): Promise<LlmResult> {
  const langName = lang === "ru" ? "Russian" : "English";
  return chatLlm(
    cfg,
    [
      {
        role: "user",
        text: `You review prompts for a photorealistic UGC AI-influencer pipeline (engine: ${engine}).\n${HARD_RULES}\nCheck the prompt: photorealism wording, physical observable terms, internal contradictions (lighting vs location vs time), length sanity. Reply in ${langName}: at most 4 short bullet points starting with "\u2022 ", most important first. If it fully follows the canon, reply with exactly one short confirming line.\n\nPROMPT:\n${prompt}`,
      },
    ],
    400,
  );
}

// --- Assistant chat ---------------------------------------------------------------

export interface AssistantSuggestion {
  reply: string;
  scene?: string;
  prompt?: string;
}

export function buildAssistantSystem(args: {
  mode: Mode;
  engine: EngineId;
  sceneText: string;
  prompt: string | null;
  lang: Lang;
}): string {
  const langName = args.lang === "ru" ? "Russian" : "English";
  return [
    `You are the built-in assistant of Influencer OS, a prompt builder for AI-influencer photos and videos. Answer in ${langName}, max 80 words, concrete and neutral, no flattery.`,
    HARD_RULES,
    `Current state: mode=${args.mode}, engine=${args.engine}.`,
    `Scene description: ${args.sceneText || "(empty)"}`,
    args.prompt
      ? `Current generated prompt:\n${args.prompt}`
      : "No prompt has been generated yet.",
    `If the user wants to change the SCENE, include the full new scene description (same language as the user) wrapped exactly in [SCENE]...[/SCENE].`,
    `If a prompt exists and the user asks to tweak the result, include the FULL edited English prompt wrapped exactly in [PROMPT]...[/PROMPT]; change only what was asked and keep every canonical block verbatim.`,
    `Use a block only when the user asks for a change. Plain questions get a plain answer.`,
  ].join("\n");
}

export function parseAssistant(text: string): AssistantSuggestion {
  const scene = text.match(/\[SCENE\]([\s\S]*?)\[\/SCENE\]/i)?.[1]?.trim();
  const prompt = text.match(/\[PROMPT\]([\s\S]*?)\[\/PROMPT\]/i)?.[1]?.trim();
  const reply = text
    .replace(/\[SCENE\][\s\S]*?\[\/SCENE\]/gi, "")
    .replace(/\[PROMPT\][\s\S]*?\[\/PROMPT\]/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return { reply, scene: scene || undefined, prompt: prompt || undefined };
}

// Canonical fragments that must survive a manual prompt edit.
const CANON_FRAGMENTS: Array<{ label: string; text: string }> = [
  {
    label: "device",
    text: "black iPhone 15 Pro Max in a transparent silicone case",
  },
  { label: "skin texture", text: "natural skin texture with visible pores" },
  { label: "sensor noise", text: "subtle digital sensor noise" },
  { label: "(no subtitles)", text: "(no subtitles)" },
  { label: "Use Flow.", text: "Use Flow." },
  { label: "under 10 seconds", text: "under 10 seconds" },
];

/** Returns labels of canonical fragments that an edit removed (must be empty). */
export function checkPromptEdit(original: string, edited: string): string[] {
  const lost: string[] = [];
  for (const f of CANON_FRAGMENTS) {
    if (original.includes(f.text) && !edited.includes(f.text)) {
      lost.push(f.label);
    }
  }
  if (/\bseed\b/i.test(edited) && !/\bseed\b/i.test(original)) {
    lost.push("seed");
  }
  return lost;
}

```


---

## SOURCE FILE: `lib/storage.ts`
SHA-256: `ce439387e961473558dda2cc968a415af608a76aa637835c7c19fd2cb7d28f74`

```ts
// Typed storage layer. Small data stays in localStorage; HEAVY data
// (characters, history, favorites, passport versions) lives in IndexedDB
// (Fix Pack 10, C3) with a one-time localStorage migration.
// schemaVersion migrations, quota guard, export/import.

import { idbAvailable, idbDel, idbGet, idbSet } from "./idb";
import type {
  CharacterPassport,
  HistoryRecord,
  PassportVersion,
  Preset,
  Settings,
  UserDict,
  SavedScene,
} from "./types";

const KEYS = {
  settings: "ios_settings",
  characters: "ios_characters",
  scenes: "ios_scenes",
  history: "ios_history",
  favorites: "ios_favorites",
  last: "ios_last",
  presets: "ios_presets",
  userdict: "ios_userdict",
} as const;

export const CURRENT_SCHEMA = 1;
const HISTORY_CAP = 100;
export const PASSPORT_VERSIONS_CAP = 10;

// --- Low-level helpers -------------------------------------------------------

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Quota guard: returns false when write fails (near limit) instead of crashing. */
function write(key: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Approximate total localStorage usage in bytes. */
export function storageUsage(): number {
  if (typeof window === "undefined") return 0;
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    total += k.length + (localStorage.getItem(k)?.length || 0);
  }
  return total * 2; // UTF-16
}

/** Soft ceiling before we warn - most browsers cap localStorage near 5MB. */
export const STORAGE_SOFT_LIMIT_BYTES = 4.2 * 1024 * 1024;

export function storageNearLimit(): boolean {
  return storageUsage() > STORAGE_SOFT_LIMIT_BYTES;
}

// --- Heavy data layer (Fix Pack 10, C3) ---------------------------------------
// IndexedDB first. A value still sitting in localStorage is migrated over once
// and removed from localStorage. No IndexedDB (rare) => localStorage fallback.

async function readHeavy<T>(key: string, fallback: T): Promise<T> {
  if (!idbAvailable()) return read(key, fallback);
  const fromIdb = await idbGet<T>(key);
  if (fromIdb !== null) return fromIdb;
  const legacy = read<T | null>(key, null);
  if (legacy !== null) {
    await idbSet(key, legacy);
    try {
      localStorage.removeItem(key);
    } catch {
      // best effort
    }
    return legacy;
  }
  return fallback;
}

async function writeHeavy(key: string, value: unknown): Promise<boolean> {
  if (!idbAvailable()) return write(key, value);
  return idbSet(key, value);
}

// --- migrate() ---------------------------------------------------------------

/** Lifts data v1 -> v2 -> ... without losing unknown fields. */
export function migrate<T extends { schemaVersion?: number }>(data: T): T {
  const v = data.schemaVersion ?? 1;
  // Future: chain per-version transforms here (v1->v2, v2->v3, ...)
  if (v < CURRENT_SCHEMA) {
    return { ...data, schemaVersion: CURRENT_SCHEMA };
  }
  return data;
}

// --- Settings ----------------------------------------------------------------

export const DEFAULT_SETTINGS: Settings = {
  schemaVersion: CURRENT_SCHEMA,
  language: null,
  theme: "light",
  provider: "anthropic",
  apiKey: "",
  model: "",
  customEndpoint: "",
  onboarded: false,
};

// --- User dictionary (learn-from-edits, augments the parser canon) -----------

export const DEFAULT_USER_DICT: UserDict = {
  schemaVersion: CURRENT_SCHEMA,
  entries: {},
  ignored: [],
};

export function loadUserDict(): UserDict {
  const raw = read<Partial<UserDict>>(KEYS.userdict, {});
  return migrate({
    ...DEFAULT_USER_DICT,
    ...raw,
    entries: raw.entries && typeof raw.entries === "object" ? raw.entries : {},
    ignored: Array.isArray(raw.ignored) ? raw.ignored : [],
  }) as UserDict;
}

export function saveUserDict(d: UserDict): boolean {
  return write(KEYS.userdict, d);
}

export function loadSettings(): Settings {
  return migrate({
    ...DEFAULT_SETTINGS,
    ...read<Partial<Settings>>(KEYS.settings, {}),
  }) as Settings;
}

export function saveSettings(s: Settings): boolean {
  return write(KEYS.settings, s);
}

// --- Characters (IndexedDB since Fix Pack 10) ---------------------------------

export async function loadCharacters(): Promise<CharacterPassport[]> {
  const list = await readHeavy<CharacterPassport[]>(KEYS.characters, []);
  return list.map((c) => migrate(c));
}

export async function saveCharacters(
  list: CharacterPassport[],
): Promise<boolean> {
  return writeHeavy(KEYS.characters, list);
}

// --- Passport versions (Fix Pack 10, B3) ---------------------------------------

function versionsKey(characterId: string): string {
  return `ios_passport_versions:${characterId}`;
}

/** Pure helper (unit-testable): newest first, no duplicate snapshots, capped. */
export function appendVersion(
  list: PassportVersion[],
  passport: CharacterPassport,
  cap = PASSPORT_VERSIONS_CAP,
): PassportVersion[] {
  const snapshot = JSON.stringify(passport);
  if (list[0] && JSON.stringify(list[0].passport) === snapshot) return list;
  const v: PassportVersion = {
    id: `${passport.id}_${Date.now().toString(36)}_${list.length}`,
    savedAt: new Date().toISOString(),
    name: passport.name || "unnamed",
    passport: JSON.parse(snapshot) as CharacterPassport,
  };
  return [v, ...list].slice(0, cap);
}

export async function loadPassportVersions(
  characterId: string,
): Promise<PassportVersion[]> {
  return readHeavy<PassportVersion[]>(versionsKey(characterId), []);
}

export async function pushPassportVersion(
  passport: CharacterPassport,
): Promise<PassportVersion[]> {
  const list = appendVersion(await loadPassportVersions(passport.id), passport);
  await writeHeavy(versionsKey(passport.id), list);
  return list;
}

/** Remove all stored version snapshots for a deleted character. */
export async function deletePassportVersions(
  characterId: string,
): Promise<void> {
  const key = versionsKey(characterId);
  if (idbAvailable()) await idbDel(key);
  if (typeof window !== "undefined") {
    try {
      // Also remove a never-migrated legacy copy so it cannot be resurrected.
      localStorage.removeItem(key);
    } catch {
      // best effort
    }
  }
}

// --- History / favorites (IndexedDB since Fix Pack 10) -------------------------

export async function loadHistory(): Promise<HistoryRecord[]> {
  return readHeavy<HistoryRecord[]>(KEYS.history, []);
}

export async function pushHistoryMany(
  recs: HistoryRecord[],
): Promise<HistoryRecord[]> {
  const list = [...recs, ...(await loadHistory())].slice(0, HISTORY_CAP);
  await writeHeavy(KEYS.history, list);
  return list;
}

export async function pushHistory(
  rec: HistoryRecord,
): Promise<HistoryRecord[]> {
  return pushHistoryMany([rec]);
}

export async function saveHistory(list: HistoryRecord[]): Promise<boolean> {
  return writeHeavy(KEYS.history, list.slice(0, HISTORY_CAP));
}

// --- Hit journal (Fix Pack 13) -------------------------------------------------

/** Set or clear the hit/miss mark on one history record. */
export async function setHistoryOutcome(
  id: string,
  outcome: "hit" | "miss" | null,
): Promise<HistoryRecord[]> {
  const list = (await loadHistory()).map((r) =>
    r.id === id ? { ...r, outcome: outcome ?? undefined } : r,
  );
  await writeHeavy(KEYS.history, list);
  return list;
}

export interface OutcomeStats {
  rated: number;
  hits: number;
  byEngine: Record<string, { rated: number; hits: number }>;
}

/** Pure helper (unit-testable): counts only records the user actually rated. */
export function outcomeStats(history: HistoryRecord[]): OutcomeStats {
  const stats: OutcomeStats = { rated: 0, hits: 0, byEngine: {} };
  for (const r of history) {
    if (r.outcome !== "hit" && r.outcome !== "miss") continue;
    stats.rated += 1;
    if (r.outcome === "hit") stats.hits += 1;
    const e = (stats.byEngine[r.engine] ??= { rated: 0, hits: 0 });
    e.rated += 1;
    if (r.outcome === "hit") e.hits += 1;
  }
  return stats;
}

export async function loadFavorites(): Promise<HistoryRecord[]> {
  return readHeavy<HistoryRecord[]>(KEYS.favorites, []);
}

export async function saveFavorites(list: HistoryRecord[]): Promise<boolean> {
  return writeHeavy(KEYS.favorites, list);
}

// --- Presets -----------------------------------------------------------------

export function loadPresets(): Preset[] {
  return read<Preset[]>(KEYS.presets, []);
}

export function savePresets(list: Preset[]): boolean {
  return write(KEYS.presets, list);
}

// --- Scene library (Fix Pack 9, A4) -------------------------------------------

export function loadScenes(): SavedScene[] {
  return read<SavedScene[]>(KEYS.scenes, []);
}

export function saveScenes(list: SavedScene[]): boolean {
  return write(KEYS.scenes, list);
}

// --- Last draft (crash recovery) ----------------------------------------------

export interface LastDraft {
  sceneText: string;
  createdAt: string;
  prompt?: string;
}

export function loadLast(): LastDraft | null {
  return read<LastDraft | null>(KEYS.last, null);
}

export function saveLast(d: LastDraft): boolean {
  return write(KEYS.last, d);
}

export function clearLast(): void {
  if (typeof window !== "undefined") localStorage.removeItem(KEYS.last);
}

// --- Backup reminder (Fix Pack 13) ----------------------------------------------

/**
 * Pure helper (unit-testable): the reminder fires only when there is real data
 * to lose (2+ characters or 30+ history records) and the last backup is absent,
 * unparseable or older than 14 days.
 */
export function backupDue(
  lastBackupAt: string | undefined,
  characterCount: number,
  historyCount: number,
  now: number = Date.now(),
): boolean {
  if (characterCount < 2 && historyCount < 30) return false;
  if (!lastBackupAt) return true;
  const then = Date.parse(lastBackupAt);
  if (Number.isNaN(then)) return true;
  return now - then > 14 * 24 * 60 * 60 * 1000;
}

// --- Export / import ------------------------------------------------------------

export interface BackupFile {
  app: "Influencer OS";
  schemaVersion: number;
  exportedAt: string;
  settings: Omit<Settings, "apiKey"> & { apiKey?: string };
  characters: CharacterPassport[];
  scenes: SavedScene[];
  history: HistoryRecord[];
  favorites: HistoryRecord[];
  userdict?: UserDict;
  // FP23: custom presets travel with the backup too.
  presets?: Preset[];
}

/** Everything a full backup carries (FP23: asserted by the self-check). */
export const BACKUP_FIELDS = [
  "settings",
  "characters",
  "scenes",
  "history",
  "favorites",
  "userdict",
  "presets",
] as const;

export async function exportBackup(includeKey = false): Promise<BackupFile> {
  const settings = loadSettings();
  const { apiKey, ...safe } = settings;
  return {
    app: "Influencer OS",
    schemaVersion: CURRENT_SCHEMA,
    exportedAt: new Date().toISOString(),
    settings: includeKey ? settings : safe,
    characters: await loadCharacters(),
    scenes: read(KEYS.scenes, []),
    history: await loadHistory(),
    favorites: await loadFavorites(),
    userdict: loadUserDict(),
    presets: read(KEYS.presets, []),
  };
}

export async function downloadBackup(includeKey = false): Promise<void> {
  const data = await exportBackup(includeKey);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "influencer-os-backup.json";
  a.click();
  URL.revokeObjectURL(url);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (!isRecord(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function validSchemaVersion(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= CURRENT_SCHEMA
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function validMode(value: unknown): value is "photo" | "video" {
  return value === "photo" || value === "video";
}

function validEngineId(value: unknown): boolean {
  return (
    value === "nano_pro" ||
    value === "kling_3" ||
    value === "seedance_2" ||
    value === "veo_scene" ||
    value === "veo_broll" ||
    value === "omni_flash"
  );
}

function validProvider(value: unknown): boolean {
  return (
    value === "anthropic" ||
    value === "openai" ||
    value === "gemini" ||
    value === "openrouter" ||
    value === "custom"
  );
}

function validLanguage(value: unknown): boolean {
  return value === null || value === "ru" || value === "en";
}

function validTheme(value: unknown): boolean {
  return value === "light" || value === "dark" || value === "contrast";
}

function validBackupSettings(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    validSchemaVersion(value.schemaVersion) &&
    validLanguage(value.language) &&
    validTheme(value.theme) &&
    validProvider(value.provider) &&
    (value.apiKey === undefined || typeof value.apiKey === "string") &&
    typeof value.model === "string" &&
    typeof value.customEndpoint === "string" &&
    typeof value.onboarded === "boolean" &&
    (value.lastBackupAt === undefined || typeof value.lastBackupAt === "string")
  );
}

const USERDICT_CATEGORIES = new Set([
  "location",
  "lighting",
  "camera",
  "pose",
  "outfit",
  "mood",
]);

function validUserDict(value: unknown): boolean {
  if (!isRecord(value) || !validSchemaVersion(value.schemaVersion)) return false;
  if (!isPlainRecord(value.entries) || !isStringArray(value.ignored)) {
    return false;
  }
  return Object.values(value.entries).every(
    (entry) =>
      isPlainRecord(entry) &&
      typeof entry.en === "string" &&
      typeof entry.cat === "string" &&
      USERDICT_CATEGORIES.has(entry.cat),
  );
}

function validReferencePhoto(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const role = value.role;
  return (
    typeof value.id === "string" &&
    (role === "identity" ||
      role === "scene" ||
      role === "motion" ||
      role === "audio" ||
      role === "product") &&
    typeof value.slot === "number" &&
    Number.isFinite(value.slot) &&
    typeof value.angle === "string" &&
    typeof value.dataUrl === "string" &&
    typeof value.thumbUrl === "string" &&
    isStringArray(value.warnings) &&
    (value.visionJson === undefined || isRecord(value.visionJson))
  );
}

function validHistoryRecord(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    validEngineId(value.engine) &&
    validMode(value.mode) &&
    typeof value.scenePreview === "string" &&
    typeof value.prompt === "string" &&
    (value.negative === undefined || typeof value.negative === "string") &&
    typeof value.createdAt === "string" &&
    (value.outcome === undefined ||
      value.outcome === "hit" ||
      value.outcome === "miss")
  );
}

function validCaptureSelection(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.cap === "string" &&
    typeof value.opt === "string" &&
    isStringArray(value.expo) &&
    isStringArray(value.imperf) &&
    typeof value.film === "string"
  );
}

function validPreset(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    isStringArray(value.style) &&
    isStringArray(value.realism) &&
    validCaptureSelection(value.capture) &&
    validEngineId(value.engine) &&
    validMode(value.mode)
  );
}

function validSavedScene(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.text === "string" &&
    validMode(value.mode) &&
    validEngineId(value.engine) &&
    typeof value.createdAt === "string"
  );
}

export function validateBackup(raw: unknown): BackupFile | null {
  if (!isRecord(raw)) return null;
  const d = raw;
  // Accept the canon name and the legacy lowercase name for backward compatibility.
  if (
    (d.app !== "Influencer OS" && d.app !== "influencer-os") ||
    !validSchemaVersion(d.schemaVersion)
  )
    return null;

  const collectionValidators = {
    characters: (value: unknown) => validatePassport(value) !== null,
    history: validHistoryRecord,
    favorites: validHistoryRecord,
    scenes: validSavedScene,
    presets: validPreset,
  } as const;
  for (const [field, validateItem] of Object.entries(collectionValidators)) {
    const value = d[field];
    if (value === undefined) continue;
    if (!Array.isArray(value) || !value.every(validateItem)) return null;
  }
  if (
    "settings" in d &&
    d.settings !== undefined &&
    !validBackupSettings(d.settings)
  ) {
    return null;
  }
  if (
    "userdict" in d &&
    d.userdict !== undefined &&
    !validUserDict(d.userdict)
  ) {
    return null;
  }

  return migrate({
    ...d,
    app: "Influencer OS",
  } as unknown as BackupFile & { schemaVersion: number }) as BackupFile;
}

/** Minimal structural guard for standalone Passport JSON imports. */
export function validatePassport(raw: unknown): CharacterPassport | null {
  if (!isRecord(raw) || !validSchemaVersion(raw.schemaVersion)) return null;
  if (
    typeof raw.id !== "string" ||
    typeof raw.name !== "string" ||
    typeof raw.createdAt !== "string" ||
    typeof raw.updatedAt !== "string" ||
    typeof raw.device !== "string" ||
    typeof raw.visionSummary !== "string"
  )
    return null;

  if (!isRecord(raw.identity)) return null;
  if (
    typeof raw.identity.full !== "string" ||
    typeof raw.identity.mid !== "string" ||
    typeof raw.identity.micro !== "string"
  )
    return null;

  if (!isRecord(raw.anomalyLock)) return null;
  if (
    !isStringArray(raw.anomalyLock.checkboxes) ||
    typeof raw.anomalyLock.freeText !== "string" ||
    !isRecord(raw.anomalyLock.json)
  )
    return null;

  if (!isRecord(raw.faceAdherence)) return null;
  if (
    typeof raw.faceAdherence.static !== "number" ||
    !Number.isFinite(raw.faceAdherence.static) ||
    typeof raw.faceAdherence.motion !== "number" ||
    !Number.isFinite(raw.faceAdherence.motion)
  )
    return null;

  if (
    !Array.isArray(raw.referencePhotos) ||
    !raw.referencePhotos.every(validReferencePhoto)
  )
    return null;

  if (raw.canon !== undefined) {
    if (!isRecord(raw.canon)) return null;
    const canonArrayFields = [
      "place",
      "objects",
      "favoritePacks",
      "voiceWords",
      "habits",
    ] as const;
    for (const field of canonArrayFields) {
      if (!isStringArray(raw.canon[field])) return null;
    }
    if (
      !validSchemaVersion(raw.canon.schemaVersion) ||
      typeof raw.canon.whoSheIs !== "string" ||
      (raw.canon.homeWorld !== "" &&
        raw.canon.homeWorld !== "A" &&
        raw.canon.homeWorld !== "B" &&
        raw.canon.homeWorld !== "C") ||
      typeof raw.canon.voiceStyle !== "string" ||
      (raw.canon.generatedAt !== undefined &&
        typeof raw.canon.generatedAt !== "string")
    )
      return null;
  }

  return migrate(raw as unknown as CharacterPassport);
}

export async function importBackup(
  backup: BackupFile,
  mode: "merge" | "replace",
): Promise<void> {
  const validated = validateBackup(backup);
  if (!validated) return;
  backup = validated;

  if (mode === "replace") {
    await saveCharacters(backup.characters || []);
    await saveHistory(backup.history || []);
    await saveFavorites(backup.favorites || []);
    write(KEYS.scenes, backup.scenes || []);
    if (backup.presets) write(KEYS.presets, backup.presets);
    if (backup.userdict) saveUserDict(backup.userdict);
  } else {
    const chars = await loadCharacters();
    const ids = new Set(chars.map((c) => c.id));
    await saveCharacters([
      ...chars,
      ...(backup.characters || []).filter((c) => !ids.has(c.id)),
    ]);
    const hist = await loadHistory();
    const hids = new Set(hist.map((h) => h.id));
    await saveHistory([
      ...(backup.history || []).filter((h) => !hids.has(h.id)),
      ...hist,
    ]);
    const fav = await loadFavorites();
    const fids = new Set(fav.map((f) => f.id));
    await saveFavorites([
      ...fav,
      ...(backup.favorites || []).filter((f) => !fids.has(f.id)),
    ]);
    if (backup.scenes) {
      const curScenes = loadScenes();
      const sceneIds = new Set(curScenes.map((scene) => scene.id));
      saveScenes([
        ...curScenes,
        ...backup.scenes.filter((scene) => !sceneIds.has(scene.id)),
      ]);
    }
    if (backup.presets) {
      const curP = read<Preset[]>(KEYS.presets, []);
      const pids = new Set(curP.map((p) => p.id));
      write(KEYS.presets, [
        ...curP,
        ...backup.presets.filter((p) => !pids.has(p.id)),
      ]);
    }
    if (backup.userdict) {
      const cur = loadUserDict();
      saveUserDict({
        schemaVersion: CURRENT_SCHEMA,
        // Current (local) mappings win over imported ones on merge.
        entries: { ...backup.userdict.entries, ...cur.entries },
        ignored: Array.from(
          new Set([...cur.ignored, ...(backup.userdict.ignored || [])]),
        ),
      });
    }
  }
  const current = loadSettings();
  saveSettings({
    ...current,
    ...backup.settings,
    apiKey: "",
    schemaVersion: CURRENT_SCHEMA,
  });
}

```


---

## SOURCE FILE: `lib/demo.ts`
SHA-256: `2b1f0624baaa99e79a91c26ea623fa235838d5cc73cbdae8ac3ce546ed640bc7`

```ts
// Fix Pack 8 — demo character (B1). A fully fictional persona with her own
// Anomaly Lock, shared by the landing live demo and the one-tap studio
// example. She is not based on any real person and contains no private
// character data. Two "worlds" showcase the product range: raw UGC diary
// realism and staged cinematic Americana.

import { emptySceneSpec } from "./scene";
import type { CharacterPassport, EngineId, Lang, SceneSpec } from "./types";

export const DEMO_CHARACTER_ID = "demo_june";

export const DEMO_CHARACTER: CharacterPassport = {
  schemaVersion: 1,
  id: DEMO_CHARACTER_ID,
  name: "June (demo)",
  createdAt: "2026-07-11T00:00:00.000Z",
  updatedAt: "2026-07-11T00:00:00.000Z",
  identity: {
    full: "young woman in her early twenties, soft oval face, wide-set grey-green eyes, dark blonde hair with grown-out roots tucked behind one ear, light natural brows, faint smile lines, small silver stud earrings, relaxed unhurried presence",
    mid: "young woman, soft oval face, grey-green eyes, dark blonde hair tucked behind one ear",
    micro: "young woman, grey-green eyes, dark blonde hair",
  },
  // Empty device string means the builder falls back to the canon device.
  device: "",
  anomalyLock: {
    checkboxes: [],
    freeText:
      "Small chip on the corner of the left front tooth, visible when she smiles. Faint diagonal scar through the tail of the right eyebrow. Single dimple on the left cheek only. Three small moles in a line on the right side of the neck. Do not normalize or correct these features.",
    json: {},
  },
  faceAdherence: { static: 0.8, motion: 0.6 },
  referencePhotos: [],
  visionSummary: "",
};

export type DemoScene = {
  id: string;
  label: Record<Lang, string>;
  fields: Pick<SceneSpec, "location" | "lighting" | "pose" | "outfit" | "mood">;
  capture: SceneSpec["capture"];
  style: string[];
};

export type DemoWorld = {
  id: "diary" | "americana";
  label: Record<Lang, string>;
  tagline: Record<Lang, string>;
  scenes: DemoScene[];
};

export const DEMO_WORLDS: DemoWorld[] = [
  {
    id: "diary",
    label: { ru: "Дневник", en: "Diary" },
    tagline: {
      ru: "Сырой UGC-реализм: как кадры с телефона подруги",
      en: "Raw UGC realism: like frames from a friend's phone",
    },
    scenes: [
      {
        id: "diary_sun",
        label: { ru: "Свет на полу", en: "Sunlight on the floor" },
        fields: {
          location: "bedroom floor by the window",
          lighting: "hard morning sunlight stripes",
          pose: "sitting cross-legged, looking at the light",
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
        id: "diary_mirror",
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
        id: "diary_fitting",
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
    ],
  },
  {
    id: "americana",
    label: { ru: "Американа", en: "Americana" },
    tagline: {
      ru: "Постановочное кино-табло: насыщенный цвет, дедпэн",
      en: "Staged film-still tableau: saturated color, deadpan",
    },
    scenes: [
      {
        id: "amer_motel",
        label: { ru: "Мотель", en: "Motel at dusk" },
        fields: {
          location: "roadside motel doorway at dusk, neon vacancy sign",
          lighting: "mixed neon and warm tungsten light",
          pose: "standing still in the doorway, deadpan stare",
          outfit: "silk robe and heeled slippers",
          mood: "staged film-still calm, quiet suburban unease",
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
        id: "amer_market",
        label: { ru: "Супермаркет", en: "Supermarket" },
        fields: {
          location: "supermarket aisle",
          lighting: "flat fluorescent overhead light",
          pose: "leaning on a shopping cart, chin up, blank deadpan expression",
          outfit: "pastel sixties dress, set hair with rollers",
          mood: "drama of the mundane, saturated film-still",
        },
        capture: { cap: "", opt: "", expo: [], imperf: [], film: "portra" },
        style: ["fashion"],
      },
      {
        id: "amer_pool",
        label: { ru: "Бассейн", en: "Poolside" },
        fields: {
          location: "vintage motel pool with plastic sun loungers",
          lighting: "harsh afternoon sun, hard shadows",
          pose: "lying motionless on a lounger in sunglasses, staring at the sky",
          outfit: "retro one-piece swimsuit and a swim cap",
          mood: "saturated technicolor stillness",
        },
        capture: { cap: "", opt: "", expo: ["over"], imperf: [], film: "gold" },
        style: ["fashion"],
      },
    ],
  },
];

/** Build a full SceneSpec for a demo scene. */
export function demoSpec(
  scene: DemoScene,
  engine: EngineId = "nano_pro",
): SceneSpec {
  const spec = emptySceneSpec(
    engine === "nano_pro" ? "photo" : "video",
    engine,
  );
  spec.subject.characterId = DEMO_CHARACTER_ID;
  spec.location = scene.fields.location;
  spec.lighting = scene.fields.lighting;
  spec.pose = scene.fields.pose;
  spec.outfit = scene.fields.outfit;
  spec.mood = scene.fields.mood;
  spec.capture = {
    ...scene.capture,
    expo: [...scene.capture.expo],
    imperf: [...scene.capture.imperf],
  };
  spec.style = [...scene.style];
  if (engine !== "nano_pro") {
    spec.motion = {
      action: "subtle natural movement, she holds the moment",
      intensity: 0.4,
      cameraMove: "static handheld",
    };
  }
  return spec;
}

/** Scene text used when loading the demo into the studio scene field. */
export const DEMO_SCENE_TEXT: Record<Lang, string> = {
  ru: "девушка сидит на полу спальни у окна, жёсткое утреннее солнце полосами на полу, растянутая футболка, спокойно",
  en: "girl sitting on the bedroom floor by the window, hard morning sunlight stripes on the floor, oversized t-shirt, calm mood",
};

// ---------------------------------------------------------------------------
// Fix Pack 15 — §2-safe public prompt display helpers. Public surfaces
// (landing hero, live demo) never render the full prompt readable: only the
// teaser head is shown, the tail stays blurred and Copy hands out the teaser.
// Pure functions, unit-tested in selfcheck.
// ---------------------------------------------------------------------------

export const TEASER_WORDS = 32;

/** Split a prompt after the first `words` words: [readable head, hidden tail]. */
export function teaserSplit(
  prompt: string,
  words: number = TEASER_WORDS,
): [string, string] {
  let count = 0;
  const re = /\S+/g;
  let m: RegExpExecArray | null = re.exec(prompt);
  while (m) {
    count += 1;
    if (count === words) {
      const idx = m.index + m[0].length;
      return [prompt.slice(0, idx), prompt.slice(idx)];
    }
    m = re.exec(prompt);
  }
  return [prompt, ""];
}

/** Copy-safe teaser: the first words plus an ellipsis. */
export function makeTeaser(
  prompt: string,
  words: number = TEASER_WORDS,
): string {
  const [head, tail] = teaserSplit(prompt, words);
  return tail.trim().length > 0 ? `${head.trim()} …` : head.trim();
}

/** Split a built prompt into display blocks for the landing hero animation. */
export function splitPromptBlocks(prompt: string): string[] {
  let blocks = prompt
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  if (blocks.length < 2) {
    blocks = prompt
      .split(/\n/)
      .map((b) => b.trim())
      .filter(Boolean);
  }
  if (blocks.length < 2) {
    blocks = prompt
      .split(/(?<=[.!?])\s+/)
      .map((b) => b.trim())
      .filter(Boolean);
  }
  return blocks;
}

// ---------------------------------------------------------------------------
// Fix Pack 16 — showcase mode. True when the studio was opened with ?demo=1:
// the demo character + scene load automatically so screenshots and marketing
// videos have something to show. Prod behavior without the flag is untouched.
// ---------------------------------------------------------------------------

export function isDemoMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).get("demo") === "1";
  } catch {
    return false;
  }
}

```


---

## SOURCE FILE: `lib/tour.ts`
SHA-256: `49e0b3c28d763cc9efd5774b61e3eef3f53b17b01b1393b1beee2ed30a49f873`

```ts
// Fix Pack 21: the onboarding tour is data — four steps, each anchored to a
// real studio element via a [data-tour] attribute. Copy reuses the existing
// onb.* strings from lib/i18n, so the tour and the old modal say the same.

type I18nModule = typeof import("./i18n");
type I18nKey = Parameters<I18nModule["t"]>[0];

export interface TourStep {
  id: "key" | "character" | "reference" | "generate";
  /** Matches a data-tour attribute in the studio. */
  target: string;
  titleKey: I18nKey;
  bodyKey: I18nKey;
  /** The target lives inside the collapsed "Advanced options" section. */
  opensAdvanced?: boolean;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "key",
    target: "tour-key",
    titleKey: "onb.step1.title",
    bodyKey: "onb.step1.body",
  },
  {
    id: "character",
    target: "tour-character",
    titleKey: "onb.step2.title",
    bodyKey: "onb.step2.body",
    opensAdvanced: true,
  },
  {
    id: "reference",
    target: "tour-reference",
    titleKey: "onb.step3.title",
    bodyKey: "onb.step3.body",
    opensAdvanced: true,
  },
  {
    id: "generate",
    target: "tour-generate",
    titleKey: "onb.step4.title",
    bodyKey: "onb.step4.body",
  },
];

```


---

## SOURCE FILE: `lib/changelog.ts`
SHA-256: `2dbb77f589a6af42d473a3b01504f29401e865d46137b03419b4e60f90090837`

```ts
// Fix Pack 13: in-app "What's new" + the app version shown in the footer.
// The newest entry is first; selfcheck asserts it matches APP_VERSION.

export const APP_VERSION = "1.23";

export interface ChangelogEntry {
  version: string;
  date: string;
  ru: string[];
  en: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "1.23",
    date: "07.2026",
    ru: [
      "\u0421\u0442\u0443\u0434\u0438\u044f \u0440\u0430\u0441\u043f\u0438\u043b\u0435\u043d\u0430 \u043d\u0430 \u043c\u043e\u0434\u0443\u043b\u0438: \u043f\u0440\u0435\u0441\u0435\u0442\u044b \u0438 \u0444\u043e\u0440\u043c\u0430\u0442\u044b \u0432 lib, undo/redo \u2014 \u0445\u0443\u043a, \u0448\u0430\u043f\u043a\u0430, \u0431\u0430\u043d\u043d\u0435\u0440\u044b, \u043f\u0430\u043d\u0435\u043b\u044c \u0438 \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u2014 \u043e\u0442\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u043a\u043e\u043c\u043f\u043e\u043d\u0435\u043d\u0442\u044b",
      "\u0422\u044f\u0436\u0451\u043b\u044b\u0435 \u0431\u043b\u043e\u043a\u0438 (\u0441\u0430\u043c\u043e\u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430, \u0440\u0435\u0434\u0430\u043a\u0442\u043e\u0440 \u043a\u0430\u043d\u043e\u043d\u0430) \u043f\u043e\u0434\u0433\u0440\u0443\u0436\u0430\u044e\u0442\u0441\u044f \u043f\u043e \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u2014 \u0441\u0442\u0443\u0434\u0438\u044f \u0441\u0442\u0430\u0440\u0442\u0443\u0435\u0442 \u0431\u044b\u0441\u0442\u0440\u0435\u0435",
      "\u0411\u044d\u043a\u0430\u043f \u043f\u0435\u0440\u0435\u043d\u043e\u0441\u0438\u0442 \u0438 \u043f\u0440\u0435\u0441\u0435\u0442\u044b; \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u044b \u0430\u0432\u0442\u043e\u0442\u0435\u0441\u0442\u044b \u0438 CI; \u0441\u043b\u043e\u0432\u0430\u0440\u044c \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430 \u0442\u0438\u043f\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u043d",
    ],
    en: [
      "The studio is split into modules: presets and formats in lib, undo/redo as a hook, header, banners, bar and settings as components",
      "Heavy blocks (self-check, canon editor) load on demand for a faster start",
      "Backups now carry presets; vitest tests and CI added; the UI dictionary is typed",
    ],
  },
  {
    version: "1.22",
    date: "07.2026",
    ru: [
      "Нижняя панель — один ряд: формат слева, генерация справа, остальное — за кнопкой параметров",
      "Хедер стал чище: язык, тема и подсказки переехали в настройки, там же горячие клавиши",
      "Черновик восстанавливается сам (с отменой), баннеры — по одному, типографика и радиусы сведены к токенам",
    ],
    en: [
      "The action bar is one row: format left, Build right, the rest behind the options button",
      "A cleaner header: language, theme and hints moved into Settings, with the shortcuts list",
      "Drafts restore silently (with undo), banners show one at a time, type & radius scales are tokenized",
    ],
  },
  {
    version: "1.21",
    date: "07.2026",
    ru: [
      "Тур по студии теперь подсвечивает реальные элементы и ничего не блокирует",
      "Отмена и возврат генераций (⌘Z / ⇧⌘Z), клавиши 1–4 переключают видео-движок, ? — все горячие клавиши",
      "Приложение ставится как PWA и открывается офлайн; длинные списки истории и сцен больше не тормозят",
    ],
    en: [
      "The studio tour now spotlights the real UI and never blocks the screen",
      "Undo/redo for generations (⌘Z / ⇧⌘Z), keys 1–4 switch the video engine, ? shows all shortcuts",
      "Installable PWA with an offline shell; long history and scene lists stay fast",
    ],
  },
  {
    version: "1.20",
    date: "07.2026",
    ru: [
      "Лицензия: подпись кэша теперь выдаёт сервер (HMAC) — подделка из консоли больше не работает",
      "Защита проверки лицензии от перебора ключей: лимит запросов по IP",
      "CSP и security-заголовки для всего сайта; предупреждение о хранении ИИ-ключа рядом с полем ввода",
    ],
    en: [
      "License cache is now server-signed (HMAC) — console forgery no longer works",
      "License checks are protected from key brute-forcing: per-IP rate limit",
      "Site-wide CSP and security headers; a storage warning next to the AI key field",
    ],
  },
  {
    version: "1.19",
    date: "07.2026",
    ru: [
      "Витрина пересобрана по реальным съёмкам: 11 проектов, все миниатюры видны сразу — без вкладок, съёмки не смешиваются",
      "Витрина теперь сразу под обложкой; лендинг короче: демо-секция убрана, версии спрятаны в сворачиваемый блок",
      "Смена образа: слайдер до/после рядом с видео переодевания; новое стеклянное гауссово размытие промптов разной плотности",
    ],
    en: [
      "Showcase regrouped by real shoots: 11 projects, every thumbnail visible at once — no tabs, shoots never mix",
      "Showcase now sits right under the hero; shorter landing: the demo section is gone, versions fold away",
      "Outfit swap: a before/after slider next to the swap loop; new multi-density gaussian glass blur for prompts",
    ],
  },
  {
    version: "1.18.1",
    date: "07.2026",
    ru: [
      "Исправлены два битых символа в словарях: метка приёма «Транзит» и транслит буквы «щ»",
      "Самопроверка выросла до 150: новые стражи ловят битую кодировку в словарях автоматически",
    ],
    en: [
      "Fixed two broken characters in the dictionaries: the Transit technique label and the shch transliteration",
      "Self-check grew to 150: new guards catch broken encoding in the dictionaries automatically",
    ],
  },
  {
    version: "1.18",
    date: "07.2026",
    ru: [
      "Витрина пересобрана вокруг главного — создания персонажа с нуля: вкладка «Создание» открывает историю, дальше паспорт, одежда, свет и кампании",
      "Все 29 промо-медиа расставлены по сериям; клик по видео раскрывает весь процесс — ролики и кадры",
      "Живой портрет вернулся в hero",
    ],
    en: [
      "Showcase rebuilt around the core — creating a character from zero: the Create tab opens the story, then passport, outfit, light, and campaigns",
      "All 29 promo assets placed across the series; clicking a video opens the whole process — clips and stills",
      "The live portrait is back in the hero",
    ],
  },
  {
    version: "1.17",
    date: "07.2026",
    ru: [
      "Витрина медиа на лендинге: пять серий (одежда, свет, продукт, стиль, персонаж) с видео-лупами",
      "Лайтбокс: клик по любому кадру открывает всю серию в полном качестве",
      "Hero-видео «замена одежды на скале» и слайдер до/после на той же скале",
    ],
    en: [
      "Landing media showcase: five series (outfit, light, product, style, character) with video loops",
      "Lightbox: click any frame to browse the full series in full quality",
      "Hero video — the cliff outfit swap — plus a before/after slider on the same cliff",
    ],
  },
  {
    version: "1.16.1",
    date: "07.2026",
    ru: [
      "Строгая типизация журнала статистики; проверки типов при сборке снова включены",
      "B-roll: мягкий страж «кадр без людей» — подсказка, если в действии есть человек",
    ],
    en: [
      "Typed the stats journal strictly; build-time type checks re-enabled",
      "B-roll: a soft no-people guard — a hint when the action mentions a person",
    ],
  },
  {
    version: "1.16",
    date: "07.2026",
    ru: [
      "Квиз «код твоей героини» на лендинге + карточка кода (PNG)",
      "Season Sync: сезон и время её города вшиты в свет, гардероб и B-roll",
      "Голос ленты: фотодамп, недоотправленная смс, архив-нумерация 0347.jpg",
      "Series Card: ритм серии одной PNG с эпизодом S1·E№, без промптов",
      "Строка Codex под лентой, страж клише и чеклист маркировки ИИ в экспорте",
      "Редактура вместо блюра: скрытый текст промпта не попадает на страницу",
      "Витринный режим ?demo=1, блок «Что нового» и hero по времени суток",
    ],
    en: [
      "Cluster quiz “your character's code” on the landing + a PNG code card",
      "Season Sync: her city's season and time baked into light, wardrobe and B-roll",
      "Feed voice: photo-dump, unsent sms, archive numbering 0347.jpg",
      "Series Card: the series rhythm as one PNG with an S1·E№ episode, zero prompts",
      "A Codex line under the feed, a cliché guard and an AI-disclosure checklist in exports",
      "Redaction instead of blur: hidden prompt text never reaches the page",
      "Showcase mode ?demo=1, a public what's-new block and a daylight hero",
    ],
  },
  {
    version: "1.15",
    date: "07.2026",
    ru: [
      "Лендинг: промпт в демо защищён — читаемый тизер, хвост в блюре",
      "Hero: живая сборка промпта, автопереключение 5 движков, спидометр силы",
      "Грид 9 кадров с проявлением и живой видео-портрет персонажа",
      "Слайдер «до/после» и полароид-стиль галереи (включаются медиафайлами)",
    ],
    en: [
      "Landing: the demo prompt is protected — readable teaser, blurred tail",
      "Hero: live prompt assembly, auto-cycling 5 engines, a strength gauge",
      "9-frame reveal grid and a live video portrait of the character",
      "Before/after slider and polaroid-style gallery (enabled by media files)",
    ],
  },
  {
    version: "1.14",
    date: "07.2026",
    ru: [
      "Prompt Doctor: конкретные, зависящие от движка подсказки, что добавить в сцену",
      "Живое демо на лендинге: показ силы промпта и кнопка «Копировать»",
      "Блок для партнёров (аффилиатов) на лендинге — по env-флагу",
      "Канал обновлений канона: чтение удалённого манифеста со списком «Что нового»",
    ],
    en: [
      "Prompt Doctor: concrete, engine-aware hints on what to add to the scene",
      "Live landing demo: prompt strength readout and a Copy button",
      "Affiliate block on the landing — behind an env flag",
      "Canon update channel: reads a remote manifest with a what's-new list",
    ],
  },
  {
    version: "1.13",
    date: "07.2026",
    ru: [
      "Разовый персонаж — временный паспорт без записи в библиотеку",
      "Панель «Реализм и анти-детект» с советами под выбранный движок",
      "Индикатор силы промпта и список «что усилить»",
      "Журнал попаданий: отметки «сработал / не принят» и статистика по движкам",
      "Экспорт шот-листа (.md) для съёмки и ленты",
      "Напоминание о резервной копии и раздел «Что нового»",
      "Горячие клавиши: ⌘/Ctrl+Enter — генерация, C — копия промпта",
    ],
    en: [
      "One-off character — a temporary passport that never touches the library",
      "Engine-aware “Realism & anti-detection” panel",
      "Prompt strength meter with a “what to strengthen” list",
      "Hit journal: worked / rejected marks and per-engine stats",
      "Shot list export (.md) for shoots and feeds",
      "Backup reminder and a “What's new” section",
      "Hotkeys: ⌘/Ctrl+Enter — generate, C — copy the prompt",
    ],
  },
  {
    version: "1.12",
    date: "07.2026",
    ru: [
      "Пакеты сцен, миры A/B/C, техники и слои-модификаторы",
      "Канон модели: B-roll, подписи и реквизит становятся «её»",
      "Планировщик ленты, мультишот Kling, кэш Vision, версии паспорта",
    ],
    en: [
      "Scene packs, worlds A/B/C, techniques and modifier layers",
      "Model canon: B-roll, captions and props become hers",
      "Feed planner, Kling multi-shot, Vision cache, passport versions",
    ],
  },
];

```


---

## SOURCE FILE: `lib/presets.ts`
SHA-256: `92d171c0a839e056dace013ca94443eee12bf2c34f400e265a524337a8a07846`

```ts
// FP23: seed presets and format ranges, extracted from the page monolith so
// static data lives in lib and the page only wires state.

import type { Preset } from "./types";

/** Output format of a build: one frame, a series, a full shoot or a feed. */
export type PromptFormat = "single" | "series" | "shoot" | "feed";

/** Fix Pack 11.2: per-format size ranges for the series/shoot/feed slider. */
export const FMT_RANGE: Record<
  Exclude<PromptFormat, "single">,
  { min: number; max: number; def: number; step: number }
> = {
  series: { min: 4, max: 8, def: 6, step: 1 },
  shoot: { min: 6, max: 12, def: 8, step: 1 },
  feed: { min: 12, max: 30, def: 16, step: 2 },
};

/** First-launch presets seeded into the user's library exactly once. */
export const SEED_PRESETS: Preset[] = [
  {
    id: "seed_ugc",
    name: "UGC selfie iPhone HDR",
    style: ["ugc_raw", "selfie"],
    realism: ["anti_b", "sensor", "skin"],
    capture: { cap: "iphone_hdr", opt: "", expo: [], imperf: [], film: "" },
    engine: "nano_pro",
    mode: "photo",
  },
  {
    id: "seed_fashion",
    name: "Fashion 85mm bokeh",
    style: ["fashion"],
    realism: ["anti_b", "sensor", "skin"],
    capture: { cap: "", opt: "lens_85", expo: [], imperf: [], film: "" },
    engine: "nano_pro",
    mode: "photo",
  },
  {
    id: "seed_luxury",
    name: "Luxury travel 35mm",
    style: ["luxury", "travel"],
    realism: ["anti_b", "sensor", "skin"],
    capture: { cap: "", opt: "lens_35", expo: [], imperf: [], film: "portra" },
    engine: "nano_pro",
    mode: "photo",
  },
];

```


---

## SOURCE FILE: `lib/scene.ts`
SHA-256: `c860f9732e8d3ef6ca78da87ef97e93c9e8ed4bcc72b4e9b00bb98ff9b4d03a3`

```ts
// Neutral Scene Spec + helpers for the 4-phase pipeline.
// Phase 1 Load -> Phase 2 Analyze (Vision) -> Phase 3 Confirm (trust gate) -> Phase 4 Build.

import type { EngineId, Mode, SceneSpec } from "./types";

export function emptySceneSpec(
  mode: Mode = "photo",
  engine: EngineId = "nano_pro",
): SceneSpec {
  return {
    mode,
    engine,
    subject: { characterId: null, identityLevel: "full" },
    location: "",
    lighting: "",
    camera: "",
    pose: "",
    outfit: "",
    mood: "",
    capture: { cap: "", opt: "", expo: [], imperf: [], film: "" },
    style: [],
    realism: ["anti_b", "sensor", "skin"], // skin ON by default per spec
    motion: { action: "", intensity: 0.5, cameraMove: "" },
    audio: { dialogue: "", sfx: "", ambience: "" },
    references: [],
    confidence: {},
  };
}

export const LOW_CONFIDENCE = 0.6;

export function lowConfidenceFields(spec: SceneSpec): string[] {
  return Object.entries(spec.confidence)
    .filter(([, v]) => v < LOW_CONFIDENCE)
    .map(([k]) => k);
}

export function uuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return "id-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ============================================================================
// Fix Pack 9 - C2: location source priority.
// Rule: explicit scene-field text > scene-reference photo. When two scene
// references exist, the caller passes the last uploaded one. Identity
// references NEVER set the location - callers must pass refLocation only
// from scene-role photos. A conflict surfaces as a yellow chip in the
// trust gate; the text always wins.
// ============================================================================

export type LocationSource = "text" | "scene_ref" | "none";

export interface LocationDecision {
  location: string;
  source: LocationSource;
  conflict: { textLocation: string; refLocation: string } | null;
}

export function resolveLocation(
  textLocation: string,
  refLocation: string,
): LocationDecision {
  const text = textLocation.trim();
  const ref = refLocation.trim();
  if (text && ref && text.toLowerCase() !== ref.toLowerCase()) {
    return {
      location: text,
      source: "text",
      conflict: { textLocation: text, refLocation: ref },
    };
  }
  if (text) return { location: text, source: "text", conflict: null };
  if (ref) return { location: ref, source: "scene_ref", conflict: null };
  return { location: "", source: "none", conflict: null };
}

```
