# Full Run Launch Prompt Template

Replace placeholders before sending.

```text
EXPERIMENT ID: <ZAI-E###>
EXPECTED Z.AI UI MODEL: <GLM-5.2 | GLM-5.3-Flash | GLM-5.3>
INPUT COMMIT: <40-char SHA>

This is a full autonomous Influencer OS Site V2.1 browser-product run.

GitHub is READ-ONLY input for this experiment.
Do not push, commit or modify the shared GitHub repository.

Your entire run must stay in this Chat.Z.AI sandbox.

First download and read this exact commit-pinned run entry:

https://raw.githubusercontent.com/tswetc/influencer-os-site-v2.1-zai-browser-experiment/<INPUT_COMMIT>/06-EXPERIMENTS/<ZAI-E###>/RUN.md

Then follow every common file it requires from THE SAME INPUT_COMMIT.

Before implementation:
1. verify transport;
2. verify the authoritative source;
3. record the actual model label you can observe; if you cannot independently observe it, use MODEL_RUNTIME_ID_UNVERIFIED;
4. complete the assigned reference research;
5. produce a measured DESIGN-CONSTITUTION / DESIGN-TOKENS / MOTION-SPEC;
6. only then make the final art-direction decision and implement.

Treat this as development of a complete product, not a disposable prototype.
Do not reduce scope because this is a browser environment.
Do not stop after research, a homepage, a build pass, or a pretty UI.

Use the P0 → P1 → P2 discipline.
Do not spend time on convenience P2 work while actionable P0/P1 remains.

Work autonomously.
Use bounded retries when blocked.
Never invent source truth.
Never claim MOCK/UNVERIFIED systems are LIVE.

At the end run all required source/truth, functional/security, UX/visual, responsive/i18n and packaging/export review loops.

Your final export filename must begin with the exact EXPERIMENT ID.

Do not depend on future cron rounds for critical work.
Do not read sibling experiment folders for creative direction.

Begin now and continue until the run mission is COMPLETE, COMPLETE_WITH_DEGRADED_SUBSYSTEMS, or honestly INCOMPLETE.
```
