# Influencer OS Site V2.1 — Z.ai Browser Experiment

> **EXPERIMENTAL · NOT CANONICAL · NOT PRODUCTION**

This repository exists only as a transport bridge and experiment workspace for browser-agent development in **Chat.Z.AI** (https://chat.z.ai/) around Influencer OS Site V2.1.

The canonical Influencer OS site/product repositories live elsewhere and must remain separate.

## Purpose

1. Transport source truth, design references, media samples, and mission files into Chat.Z.AI agents through reproducible public HTTPS/GitHub URLs.
2. Run multiple independent experiments across GLM-5.2, GLM-5.3-Flash, and GLM-5.3.
3. Compare model behavior under controlled inputs and explore multiple design directions without changing product truth.
4. Preserve reproducible run metadata.
5. Export only selected successful ideas back into the real V2.1 workflow after human review.

## Hard boundary

Do **not**:
- deploy this repository as production;
- treat it as canonical product history;
- merge it automatically into the real site;
- store API keys, passwords, production credentials, customer data, or secrets here.

Promotion path:

`Z.ai experiment → forensic audit → selected candidate → real Git branch → Codex/ZCode refinement → optional V2.1 integration`

Start with `00-GOVERNANCE/START-HERE.md`.
