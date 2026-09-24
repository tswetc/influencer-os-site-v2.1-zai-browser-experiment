# Naming

## Repository

`influencer-os-site-v2.1-zai-browser-experiment`

## Experiment IDs

Use monotonically increasing IDs:

- `ZAI-E001`
- `ZAI-E002`
- `ZAI-E003`
- ...

Never use vague names such as `final`, `best`, `new2`, or `latest`.

## Model codes

- `GLM52` = GLM-5.2
- `GLM53F` = GLM-5.3-Flash
- `GLM53` = GLM-5.3

Do not invent non-existent model names.

## Extended run name

`ZAI-E###-<MODEL>-<DESIGN_VARIANT>`

Examples:
- `ZAI-E001-GLM52-NEUTRAL`
- `ZAI-E002-GLM53F-NEUTRAL`
- `ZAI-E003-GLM52-MEDIA`
- `ZAI-E004-GLM53F-MEDIA`

## Run identity rule

Every run records:
- experiment ID;
- model as displayed by Z.ai UI;
- source commit SHA;
- mission commit/version;
- reference set;
- media set;
- start/end time;
- transport verification state.

If the runtime model identifier cannot be independently observed from the agent environment, record `MODEL_RUNTIME_ID_UNVERIFIED` rather than guessing.
