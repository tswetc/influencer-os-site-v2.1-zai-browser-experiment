# Current Product Behavior Contract — Derived Audit · 2026-09-24

This is a behavior-level contract derived from the current private `tswetc/influencer-os` repository.

It intentionally does NOT reproduce the private repository source.

Audit head:
`1158007fdaefd823e24d7a38d4fa7258814b541c`

Verified release artifact:
`os23.6.zip` SHA-256
`8fd6f6a9e5bf8fc4e83cf04f26973b241a5319652a355017ef0c36e897233a84`

## Deployable boundary

The canonical repository currently implements the Influencer OS **Web App** product form.

Observed route-level implementation:
- public landing;
- product studio/app;
- license API;
- layout/PWA/SEO surfaces.

A future browser candidate may propose broader navigation, but must distinguish proposed architecture from current implementation.

## Canonical mechanics that must survive

- Character Passport identity levels;
- references and vision-derived context;
- Anomaly Lock;
- static/motion face adherence;
- Model Canon;
- Worlds A=Diary / B=Raw / C=Staged;
- 24 Techniques;
- 18 Scene Packs / 92 explicit scenes;
- source self-check semantics (164 built-in assertions in the verified release);
- engine-specific prompt adaptation;
- Frame / Series / Shoot / Feed planning;
- multishot / season / cutaway / caption logic;
- provider settings and safe provider switching;
- prompt/canon visibility sufficient for inspection;
- export/backup/restore behavior where exposed;
- EN/RU parity.

## Current implementation behavior outside the public 23-file source pack

Future runs must not silently reinvent these areas:

### Input / parsing
The current Web App contains dedicated scene parsing and normalization behavior.

### Vision / references
The current Web App contains reference-vision analysis plus cache behavior.

### Storage / backup
The current Web App contains typed persistence, IndexedDB/local-storage migration behavior, backup/import validation and reminders.

### License
The current Web App contains a server-side license route and client license behavior.

### Consistency / labeling
The current Web App includes display-label normalization and product-consistency tests.

### Edge cases
The current repository includes dedicated edge-case tests covering provider switching, persistence/import and other release-hardening behavior.

## Release validation contract

A full-product candidate is not source-faithful merely because:
- its counts equal 24/18/92/164;
- it has similarly named UI;
- it has more features.

It must reconcile the meaning of the underlying rules and preserve tested behavior or explicitly document a deliberate extension.

## Extension labels

Every behavior should be classed as one of:
- `CURRENT_CANONICAL_BEHAVIOR`
- `SOURCE_PRESERVING_UI_RECOMPOSITION`
- `PRODUCT_EXTENSION`
- `EXPERIMENT_ONLY`
- `MOCK`
- `UNVERIFIED_EXTERNAL`

A candidate may contain extensions. It may not present them as inherited source truth.


## Additional verified current behaviors from canonical Web App audit

These are behavior contracts, not copied private source.

### Parser / language normalization

- dedicated RU→EN scene parser exists;
- final prompts are built in English regardless of UI language;
- parser has normalization, aliases, ambiguity handling, fuzzy/transliteration support and engine word-budget behavior;
- a future recomposition must not replace this with a generic free-text field and call it source-parity.

### Vision / reference analysis

- current Web App has multi-provider vision/reference analysis;
- current implementation can call configured providers directly from the browser with BYOK;
- the vision layer has explicit provider/model resolution and structured error classes;
- image analysis results are parsed into Scene fields with confidence.

Architecture V3 may move secret-bearing execution behind a safer provider service/connection boundary, but must preserve the user-visible capability and truthful BYOK/provider semantics.

### Vision cache

- vision analysis is content-addressed;
- cache identity includes analysis kind + provider + model + image-content hash;
- repeat analysis of the same pixels/provider/model reuses stored results to avoid unnecessary provider calls/credits;
- heavy cache data uses IndexedDB.

### Storage / backup / revision behavior

Current implementation distinguishes small local settings from heavier IndexedDB data and includes:
- character persistence;
- Passport version snapshots;
- history;
- favorites;
- presets;
- saved scenes;
- last draft;
- backup reminders;
- schema migration;
- export/import validation;
- merge/replace import behavior.

Current tests specifically defend:
- malformed collection/object rejection;
- malformed nested element rejection;
- unsupported future schema rejection;
- provider/theme/language setting validation;
- unknown engine IDs in imported objects;
- no storage mutation on invalid import;
- scene merge-by-id behavior;
- active-Passport reset after replace;
- API-key clearing when imported provider changes;
- Passport nested-shape validation;
- version-history cascade delete.

Architecture V3 should generalize these into server/domain persistence without losing the semantics.

### Provider switching

Current tests verify provider-specific credentials/model fields are cleared or preserved deliberately when switching providers.

Never carry a stale provider API key/model slug into another provider connection by accident.

### License / entitlement behavior

Current Web App has:
- server-validated license behavior;
- signed cached state;
- grace/recheck semantics;
- bounded use-state behavior.

Architecture V3 should model product access as `Entitlement` + auth/license adapter rather than baking commercial gating into arbitrary UI components.

Do not infer current public price/refund/availability from this code.

### Remote canon manifest

The current Web App can read a small versioned remote canon manifest defensively.

Malformed remote data must fail closed rather than mutating local canon blindly.

### Redaction / public prompt privacy

Current implementation contains explicit redaction utilities and leak checks for hidden prompt text on public surfaces.

A public proof surface must not accidentally reveal prompt sections that product design intends to redact.

### Prompt Doctor

Current implementation includes a deterministic Prompt Doctor/diagnostic layer over SceneSpec + Passport + built output.

This is distinct from freeform chat assistance and should survive as inspectable OS intelligence if exposed in the next product.

### Export / display consistency

Current tests distinguish:
- user-facing display labels in TXT/Markdown exports;
- stable internal IDs in JSON exports;
- human-readable filenames;
- terminology consistency;
- token-estimate wording rather than unsupported cost wording.

Do not conflate internal IDs with public labels.

### i18n

Current tests require RU and EN coverage for every dictionary key and guard broken encoding.

Full-product candidates need semantic EN/RU parity, not partial route translation.

### Keyboard/modal interaction consistency

Current tests guard global Studio shortcuts while an aria-modal is open.

Keyboard systems/command palettes in new candidates must respect focus/modal state.

## Migration rule

When Architecture V3 changes implementation shape, classify the change:

- current behavior preserved under new storage/API boundary;
- deliberate product extension;
- deliberately retired behavior.

Do not silently lose current tested behavior during visual/product expansion.
