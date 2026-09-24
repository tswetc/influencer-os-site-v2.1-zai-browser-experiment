# Founder Intent → Architecture Gap Map

Date: 2026-09-25
Purpose: compact product-context bridge for architecture reasoning.

This file contains only founder intent that materially changes architecture.

| Founder product intent | Existing/current evidence | Fundamental architecture gap |
|---|---|---|
| One large product, not a landing page | Public site V2 exists; OS Web App exists separately | one canonical product/domain/application boundary across public + creator + core + agent surfaces |
| Real Create Character experience | CharacterPassport exists locally | durable Workspace/Project/Character lifecycle, draft/revision/pinning/rebase |
| Real image + video generation | current OS mainly compiles prompts / provider-assisted analysis | durable async generation, job/attempt/provider/output lineage |
| Reuse one character everywhere | current Passport + Canon | exact dependency semantics across Scene/Plan/Workflow and later revisions |
| Guided Studios + interconnected mini-apps | current Web App is one studio surface; target contracts added | shared application commands and cross-surface execution/history |
| Expert Figma-Weave-like node graph | target contract exists | exact workflow execution/rerun/cache/reuse semantics |
| New image/video models continuously added | current source hardcodes EngineId and per-engine code | model/provider/adapter registry + research/eval/promotion/rollback lifecycle |
| Research real model behavior, not marketing copy | research process exists outside runtime | evidence-to-adapter promotion and regression evaluation architecture |
| BYOK provider APIs | current Settings has browser apiKey | production ProviderConnection/secret vault/session/worker boundary |
| Possible managed generation | not in current Web App | entitlement/quota/cost/accounting architecture that can coexist with BYOK |
| Real MCP usable by Codex/Claude/etc. | target MCP surface defined | OAuth/principal/workspace scopes and same-use-case parity |
| Some site usable without auth, richer product after auth | current V2 public/static; current OS local app | anonymous demo vs authenticated Workspace ownership/session boundary |
| EN/RU | current OS already has EN/RU behavior | preserve parity through shared domain/application services; not an Astra problem |
| Media-rich proof + examples | media lab is mature | production AssetVersion/provenance/publication model; transport lab is not production storage |
| Community/libraries later | desired surface, not core current requirement | defer social graph/community until ownership/publication model is stable |
| Full portable project/export | current backup exists | schema-versioned ExportBundle + media/hash/lineage import migration |
| Experimental browser candidates should help real product | public Z.ai lab + isolated runs | explicit promotion seam; never whole-candidate merge |
| High visual quality / creative references | reference recipes exist | design system issue, intentionally excluded from Astra R001 |
| Public experiment repo is temporary bridge | public raw GitHub currently required for Z.ai | sanitize transport; production architecture must not depend on public GitHub |

## Highest-risk mismatches today

1. Current Web App is local-first/browser-persistent; target product is multi-surface/server-durable.
2. Current generation engine identity is hardcoded in TypeScript; founder wants continuous model evolution.
3. Current product behavior is direct/studio-oriented; target also has reusable expert graph + MCP/API.
4. Current browser API keys are user settings; target needs secure server/agent execution.
5. Current “version history” is partial Passport snapshotting; target requires full multi-object historical lineage.
6. Browser lab candidates can visually approximate backends; production must not inherit those approximations as canonical architecture.

Astra R001 exists to resolve these mismatches, not to redesign the product.
