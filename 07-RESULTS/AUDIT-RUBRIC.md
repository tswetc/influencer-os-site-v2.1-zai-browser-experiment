# Candidate Audit Rubric — Evidence and Defect Model

Do not judge by the founder report alone and do not reward feature count by itself.

## Evidence first

Inspect:
- exact input commit and runtime model label;
- source tree and local Git chronology;
- source reconciliation;
- run decision/failure logs;
- tests and commands actually executed;
- provider code/state;
- MCP code/state;
- auth/persistence truth;
- media/provenance;
- reference research;
- screenshot sets and runtime behavior;
- export manifest and ZIP freshness.

## Severity

### P0
- source/canon contradiction;
- privacy/rights/security exposure;
- fabricated LIVE/provider/deployment state;
- broken primary workflow;
- stale or wrong export;
- identity mixing in a single narrative when prohibited;
- inability to reproduce the claimed build.

A candidate with an actionable P0 cannot be COMPLETE.

### P1
- major product-depth gap;
- major visual/reference miss;
- broken mobile/RU/a11y path;
- non-functional MCP when claimed;
- persistence/auth architecture materially weaker than represented;
- primary media/provenance weakness.

### P2
- meaningful polish/craft/secondary-flow issue.

### P3
- optional enhancement or low-impact craft issue.

## Finding states

Use:
- `OPEN`
- `FIXED_PENDING_VERIFICATION`
- `VERIFIED_FIXED`
- `BLOCKED_EXTERNAL`
- `NOT_VERIFIED`
- `NOT_APPLICABLE`
- `INTENTIONAL_WITH_EVIDENCE`

Do not use “PASS by construction” for a runtime property.

## Audit dimensions

- current-source fidelity;
- release-artifact fidelity;
- product-topology honesty;
- Character/Canon fidelity;
- Prompt Lab transformation visibility;
- Image workflow depth;
- Video continuity depth;
- Series/Shoot/Feed depth;
- project/asset lineage;
- model/provider status truth;
- MCP protocol correctness and auth;
- persistence/backup/import truth;
- reference research quality;
- design-system coherence;
- typography/grid/material precision;
- motion/interaction quality;
- media quality and provenance;
- responsive/mobile quality;
- EN/RU quality;
- accessibility;
- security/privacy;
- failure recovery;
- prioritization;
- regression/testing;
- Git hygiene;
- export freshness/portability.

## Claim-evidence rule

Every material conclusion must point to:
- file/path + line/range when possible;
- runtime screenshot/recording;
- test output;
- exact Git SHA;
- external official source with date.

Agent self-report is evidence of what the agent *claims*, not evidence that the product actually has that property.

## Runtime honesty

Keep these distinct:
- source verified;
- build verified;
- runtime smoke verified;
- interaction verified;
- screen-reader verified;
- measured performance verified;
- external provider verified;
- deployment verified.

Never collapse them into a generic PASS.

## Final disposition

Record:
- strengths;
- defects;
- blockers;
- exact remediation;
- reusable ideas worth synthesis.

Do not blindly merge code from candidates.
