# K1 — Model Profile / Provider Route Decision

Date: 2026-09-25
Status: ACCEPTED_CENTRAL_DECISION

## Decision

Do NOT make ModelProfileRevision own one provider deployment.
Do NOT make ModelProfileRevision own an opaque deployment set either.

Normalize the relationship.

Use:

CapabilityDefinition
→ ModelIdentity
→ ModelProfile
→ ModelProfileRevision

and separately:

Provider
→ ProviderDeployment

joined by:

ModelRoute

Then:

GenerationStrategy
→ selects one or more eligible ModelRoutes

GenerationAttempt
→ pins exactly one executed ModelRoute + ModelDeploymentSnapshot.

## Objects

### CapabilityDefinition

Influencer OS semantic task contract:
image.generate, image.edit, image_to_video, text_to_video, video.extend, etc.

Owns typed product-level input/output semantics.
Does not know vendor HTTP details.

### ModelIdentity

Stable conceptual external model identity when the upstream vendor exposes one meaningfully.

Examples conceptually:
a named/versioned model family.

If external version identity is unavailable, record that limitation; do not invent one.

### ModelProfile

Stable Influencer OS product-facing identity.

It is what product UX can refer to over time.

### ModelProfileRevision

Immutable semantic/configuration revision of a ModelProfile.

Pins:
- ModelIdentity when known;
- CapabilityDefinition set;
- EngineAdapterVersion;
- defaults;
- semantic constraints;
- eval target/version;
- release policy metadata.

It is provider-route independent.

### Provider

Vendor/gateway identity.

### ProviderDeployment

One addressable access route:
- provider;
- endpoint/region where relevant;
- provider model slug/alias;
- provider-side advertised constraints;
- discovery/verification metadata.

A provider alias is not assumed immutable.

### ProviderAdapterVersion

Versioned code that owns:
- auth mechanism;
- request serialization;
- response parsing;
- polling/webhook logic;
- provider error normalization;
- provider cost/usage extraction.

### ModelRoute

Immutable approved compatibility binding:

ModelProfileRevision
+ ProviderDeployment
+ ProviderAdapterVersion
+ route-specific effective constraint overrides
+ ResearchEvidence/Eval evidence
+ promotion status
+ reproducibility level.

A ModelProfileRevision may have zero, one or many ModelRoutes.

The relationship is explicit and independently auditable.

### GenerationStrategy

Job-level policy that selects routes.

Examples:
- exact route;
- ordered fallback routes;
- cheapest compatible LIVE route;
- lowest-latency compatible route;
- explicit parallel comparison.

Fallback strategy belongs here, NOT inside ModelProfileRevision.

### ModelDeploymentSnapshot

Attempt-time evidence of what was actually addressed/observed:
- provider;
- route ID;
- requested slug/alias;
- returned model/version identifier when available;
- provider capability/version headers when available;
- observed_at;
- adapter versions;
- reproducibility level/fingerprint.

## Historical pinning

PromptBuild pins:
- ModelProfileRevision;
- EngineAdapterVersion;
- OS ruleset/compiler version;
- exact creative revisions.

PromptBuild does not need to pin provider transport when semantic prompt build is provider-route independent.

GenerationJob pins:
- selected ModelProfileRevision;
- GenerationStrategy snapshot.

GenerationAttempt pins:
- exact ModelRoute;
- ProviderConnection;
- ProviderAdapterVersion;
- ModelDeploymentSnapshot;
- exact outbound request hash.

## Why this is better than the two earlier options

One profile revision = one deployment:
too restrictive; duplicates semantic profiles across direct/gateway routes and mixes model semantics with transport.

One profile revision owns deployment set:
still overloads profile lifecycle with operational routing.

Separate immutable ModelRoute:
keeps semantics, routing, evidence and history orthogonal.

## Mutable alias drift

On periodic verification or runtime evidence:

If provider alias fingerprint/returned model identity materially changes:
1. mark affected route DRIFT_SUSPECTED;
2. do not rewrite old route/attempt history;
3. create new candidate ModelRoute or re-verified route record;
4. run adapter contract tests + relevant evals;
5. promote new route explicitly;
6. retire/deprecate old route if appropriate.

If provider exposes no immutable version:
set reproducibility_level = EXTERNAL_VERSION_OPAQUE.
Never claim pixel/model exact reproducibility.

## Release state vs health

Do not conflate.

Route/profile promotion:
HIDDEN → EXPERIMENTAL → BETA → LIVE → DEPRECATED → RETIRED.

Operational health:
UNKNOWN / AVAILABLE / DEGRADED / UNAVAILABLE.

A LIVE route can temporarily be DEGRADED.
A BETA route can be AVAILABLE.
These are different facts.

## Code vs config

May be data/config without new deploy when:
- existing EngineAdapterVersion supports semantic behavior;
- existing ProviderAdapterVersion supports protocol;
- new route only changes declarative limits/defaults/slugs;
- eval/promotion passes.

Requires code deploy when:
- prompt transformation semantics change;
- provider auth/protocol changes;
- request/response schema needs new logic;
- polling/webhook lifecycle changes;
- error/cost normalization needs new logic.

## Automatic fallback rule

Only between ModelRoutes explicitly marked capability-compatible for the requested task/profile revision.

Fallback never rewrites PromptBuild.

Each fallback creates a new GenerationAttempt with its own route/deployment snapshot.

No fallback from SUBMISSION_UNKNOWN.

## Result

K1 is CLOSED centrally.

Astra does not need to decide K1 unless new evidence proves this normalized ModelRoute architecture fails a real product requirement.
