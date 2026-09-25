# Pre-Astra Source / Behavior Matrix

Date: 2026-09-25
Status: PHASE_1_COMPLETE
Canonical private source audited at:
`tswetc/influencer-os@1158007fdaefd823e24d7a38d4fa7258814b541c`

This matrix records architecture-relevant CURRENT behavior. It does not promote the current implementation shape into the target architecture.

| Area | Verified current behavior | Target implication | Astra relevance |
|---|---|---|---|
| Product boundary | Next.js Web App with landing/app/license surfaces | preserve product behavior while expanding into one larger platform | migration only |
| Character | `CharacterPassport` contains identity full/mid/micro, references, Anomaly Lock, face adherence, device and optional Canon | Character and Canon remain first-class; do not collapse to generic prompt blob | A2/A6 |
| Canon | `ModelCanon` stores whoSheIs/place/objects/homeWorld/favoritePacks/voice/habits | narrative canon must remain independently historizable from identity | A2 |
| Scene | `SceneSpec` is mutable browser data with character id, world, technique, capture, motion/audio, refs and confidence | future execution must bind exact effective creative state | A2/A6 |
| Worlds | A=Diary, B=Raw, C=Staged; world changes prompt/capture semantics | world behavior is inherited source truth | none; baseline |
| Prompt compiler | engine-specific executable prompt logic lives in `lib/engines.ts` | provider/model differences are real executable semantics, not UI metadata | A3 |
| Engine identity | hardcoded `EngineId` union: nano_pro, kling_3, seedance_2, veo_scene, veo_broll, omni_flash | current IDs are compatibility/source routes, not sufficient future market registry | A3 |
| Engine metadata | UI metadata and word/prompt rules are compiled with engine behavior | future model/profile registry must not silently rewrite historical prompt semantics | A3 |
| Negative prompts | only Kling/Veo routes expose negative field in current canon | lowest-common-denominator provider abstraction would lose source semantics | A3 |
| Parsing | dedicated RU→EN parser with aliases, ambiguity handling, transliteration/fuzzy matching and word budgets | future platform must preserve deterministic pre-LLM normalization behavior | A6 |
| Vision/LLM | configured provider requests currently go directly from browser using BYOK | current direct-browser secret model is legacy behavior, not hosted target | A5/A6 |
| Vision providers | Anthropic/OpenAI/Gemini/OpenRouter/custom endpoint are supported by current adapter layer | provider connection migration must preserve user-visible provider choice | A5/A6 |
| Vision cache | content-addressed by analysis kind + provider + model + image hash; heavy cache in IndexedDB | server migration should retain dedupe/credit-saving semantics where valid | A6 |
| Provider switching | switching provider clears API key + model; tests defend stale-credential isolation | ProviderConnection model must preserve this security invariant | A5/A6 |
| Local persistence | small settings in localStorage; heavy characters/history/favorites/version data in IndexedDB | target hosted product needs server-canonical durable objects; local may become cache/draft/import bridge | A6 |
| Passport versions | whole-passport snapshots, newest-first, capped; cascade delete behavior exists | useful legacy evidence, but insufficient for full multi-object reproducibility | A2/A6 |
| History | prompt-oriented history with engine/mode/prompt/outcome | target needs job/attempt/asset lineage without losing simple user history UX | A2/A4/A6 |
| Scenes | saved scene library is local persistent data | must map into Project ownership during migration | A6 |
| Presets/UserDict | local persistent user customizations | migration/export plan must decide ownership and import mapping | A6 |
| Backup/export | validated schema-versioned backup; default excludes API key; optional key inclusion exists in legacy flow | hosted import must preserve data semantics but must never silently upload legacy provider secrets | A5/A6 |
| Import | merge/replace behavior, malformed-shape rejection, unknown-engine rejection, no mutation on invalid input | future two-phase import must preserve fail-closed behavior | A6 |
| Self-check | built-in deterministic self-check has >=160 tests; release contract records 164 source assertions | self-check should remain inspectable/versioned OS intelligence | A2/A3/A6 |
| Planning | Series/Shoot/Feed/multishot/season/cutaway/caption mechanics exist | target Plan/Shot layer must preserve those product semantics | A2/A6 |
| License | server route validates Gumroad, signs HMAC token, client has grace/recheck/use-limit semantics | future Entitlement should absorb commercial access without scattering license checks | A5/A6 |
| Remote canon manifest | small versioned remote manifest, defensive parse, informational update signal | demonstrates need for fail-closed versioned update channels | A3/A6 |
| EN/RU | tests require both languages for all dictionary keys and guard encoding | semantic bilingual parity is current behavior, not optional redesign | A6 |
| Keyboard/modal | tests guard global shortcuts when modal is open | interaction parity constraint for UI recomposition | migration/QA only |
| Public prompt privacy | current product contains teaser/redaction behavior for public surfaces | public proof surfaces must not accidentally expose protected prompt content | A5/A6 |
| Deployment | current product is not a durable multi-provider generation backend | GenerationJob/Attempt orchestration is a target extension, not inherited current behavior | A4 |
| MCP | current private Web App does not provide the target full remote MCP product surface | MCP architecture is a product extension over shared use cases | A5 and execution baseline |
| Expert graph | target contract is new; current Web App does not provide full durable graph execution | graph is a product extension and must not be misrepresented as source parity | execution baseline |

## Current implementation facts that must NOT become target constraints

- one giant browser orchestration surface;
- browser-local API key storage;
- browser persistence as sole durable product canon;
- hardcoded finite market model list as permanent architecture;
- synchronous/button-handler assumptions for expensive generation;
- current local history shape as the complete future lineage model.

## Current behavior that MUST survive migration unless explicitly retired

- Character Passport / Canon semantics;
- Worlds / techniques / packs / prompt compiler semantics;
- deterministic parser and trust-oriented normalization;
- provider-switch stale-secret clearing;
- content-addressed vision-cache intent;
- validated backup/import and fail-closed invalid import;
- EN/RU parity;
- self-check/diagnostic behavior;
- planning semantics;
- license/entitlement behavior at the product level;
- public prompt redaction/privacy behavior;
- current tested edge cases.

## Evidence classification

`VERIFIED_PRIVATE_SOURCE` — directly checked at the pinned private source commit.
`DERIVED_CURRENT_BEHAVIOR` — summarized in the public behavior contract from the pinned private source.
`TARGET_EXTENSION` — required by founder/product architecture but not current source behavior.

## Result

`PRE_ASTRA_PHASE_1_SOURCE_AUDIT_COMPLETE`