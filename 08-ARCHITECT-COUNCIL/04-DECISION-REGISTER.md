# Architecture Decision Register

Status values:
ACCEPTED · PROVISIONAL · OPEN · SUPERSEDED.

## ADR-001 — One product / four logical areas
Status: ACCEPTED

Public/Product Experience
Creator App
OS Core/API/Generation Services
MCP/Agent Surface

Reason:
clear responsibilities without artificial product fragmentation.

## ADR-002 — Modular monolith first
Status: PROVISIONAL — REQUEST ASTRA/CODEX REVIEW

Reason:
maximizes iteration speed and contract coherence while avoiding premature distributed systems.

Review must identify precise service-extraction triggers.

## ADR-003 — Shared application/core behavior
Status: ACCEPTED

Web and MCP cannot have separate prompt/generation semantics.

## ADR-004 — Immutable creative revisions
Status: ACCEPTED

CharacterRevision, CanonRevision, PromptBuild, AssetVersion and WorkflowRevision preserve reproducibility/history.

## ADR-005 — GenerationJob != GenerationAttempt
Status: ACCEPTED

Retry/fallback creates a new attempt.

## ADR-006 — Typed graph lineage
Status: ACCEPTED

Lineage is a graph with typed derivation edges.

## ADR-007 — Guided Studios + Expert Workflow Graph
Status: ACCEPTED

Two interaction layers, one underlying system.

## ADR-008 — Workflow runtime details
Status: OPEN

DAG/cycle policy, partial rerun semantics, cache and subflow semantics require review.

## ADR-009 — Persistence technology / transaction design
Status: OPEN

Browser prototypes may use adapters, but production architecture is not yet selected.

## ADR-010 — Worker/queue topology
Status: OPEN

Async generation strongly suggests a worker boundary, but exact timing/deployment shape is unresolved.

## ADR-011 — Provider abstraction / model registry evolution
Status: PROVISIONAL

Core concepts are accepted; exact contracts require review.

## ADR-012 — Production media storage
Status: OPEN

Current public atlas transport is not production media architecture.

## ADR-013 — MCP remote auth
Status: OPEN

Local parity semantics are defined; production remote auth/session architecture requires review.

## ADR-014 — Browser candidate promotion
Status: OPEN

No whole-candidate merge. Need formal promotion contract and compatibility tests.
