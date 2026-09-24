# ZAI-Q001 — Disposable Launch Qualification

STATUS: WAITING_FOR_PUBLIC_TRANSPORT_FREEZE
TYPE: DISPOSABLE_PIPELINE_QUALIFICATION
MODEL_POLICY: GLM-5.3-Flash preferred for throughput
INPUT_COMMIT: PROVIDED_BY_LAUNCH_PROMPT
MEDIA_SET: wave01-C-v2
REFERENCE_SET: design-set-c
GITHUB_MODE: READ_ONLY_INPUT

## Purpose

Qualify the SAME frozen input chain used by the product-quality wave while E004–E011 may run in parallel.

This run is disposable. It does not compete as a product candidate.

## Test chain

1. fetch exact pinned governance/architecture/source inputs;
2. fetch and SHA-verify the assigned public media pack;
3. inspect at least 10 media files visually;
4. research/capture the assigned design references;
5. instantiate the Architecture V3 source/module skeleton;
6. implement one deep vertical slice:
   CharacterRevision + CanonRevision
   → Scene
   → PromptBuild
   → SelfCheck
   → GenerationJob/GenerationAttempt mock
   → AssetVersion
   → Lineage;
7. expose the same PromptBuild through one MCP tool;
8. create a minimal typed Expert Workflow Graph that executes the slice;
9. run automated tests;
10. capture desktop/mobile screenshots;
11. export a fresh ZIP;
12. verify ZIP manifest hashes.

## Qualification failures to detect

- stale/missing public input;
- bad media URLs;
- hash mismatch;
- identity leakage;
- hidden source-path leakage;
- source-contract ambiguity;
- architecture contradiction;
- node graph unable to represent core flow;
- web/MCP core divergence;
- export staleness;
- browser route/runtime limitation not documented.

## Output

- QUALIFICATION-REPORT.md
- INPUT-VERIFY.md
- ARCHITECTURE-SLICE.md
- MEDIA-VERIFY.md
- REFERENCE-VERIFY.md
- TEST-RESULTS.md
- EXPORT-MANIFEST.md
- ZAI-Q001-FINAL.zip

Final line:
`QUALIFICATION_PASS`
or
`QUALIFICATION_FAIL`
