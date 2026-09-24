# 08 — Architecture Council Bridge

Purpose: durable architectural handoff between the central ChatGPT architect, GPT-6 Astra, Codex, and future reviewer agents.

This folder is NOT a replacement for product truth or founder decisions.

Authority:
1. founder product decisions;
2. current public project memory / governance;
3. verified source behavior;
4. accepted architecture ADRs;
5. reviewer recommendations.

Reviewers may challenge architecture, but they do not redefine product intent.

## Why this exists

The Influencer OS Site V2.1 browser project has grown beyond a landing page into a multi-surface product platform with:
- Public/Product Experience;
- Creator App;
- OS Core/API/Generation Services;
- MCP/Agent Surface;
- versioned creative domain objects;
- provider/model adapters;
- asynchronous generation;
- asset lineage;
- guided Studios;
- expert workflow graph;
- export/import;
- EN/RU;
- public experimental browser builds.

The architecture now needs durable reasoning artifacts that survive any one chat.

## Read order for an architecture reviewer

1. `01-ARCHITECT-STATE.md`
2. `02-NONNEGOTIABLES.md`
3. `03-OPEN-ARCHITECTURE-QUESTIONS.md`
4. `04-DECISION-REGISTER.md`
5. reviewer-specific mission:
   - `05-ASTRA-REVIEW-MISSION.md`
   - `06-CODEX-IMPLEMENTATION-AUDIT.md`
6. `07-REVIEW-OUTPUT-CONTRACT.md`
7. then follow the repository authority/read order from `../00-GOVERNANCE/START-HERE.md`

## Reviewer operating rule

First review is READ-ONLY.

Do not edit implementation.
Do not silently decide product requirements.
Do not use sibling experiment implementations as canonical source truth.

The first deliverable is an architecture decision package.
Only accepted decisions are later promoted into governance/architecture files.

## State-update rule

The central architect updates this folder when:
- a major architecture decision changes;
- a new blocker appears;
- an external reviewer resolves an open question;
- a candidate audit disproves an assumption.

This folder stores explicit decisions, evidence, uncertainties and rationale.
It does not store hidden chain-of-thought.
