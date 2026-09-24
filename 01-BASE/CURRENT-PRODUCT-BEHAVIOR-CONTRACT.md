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
