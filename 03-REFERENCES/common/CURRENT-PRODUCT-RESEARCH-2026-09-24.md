# Current External Product Research Update — 2026-09-24

Status: RESEARCH_ONLY

External products are architecture/UX/interaction references. They do not override Influencer OS semantics.

## Figma Weave — current official evidence

Official research used:
- https://www.figma.com/blog/five-figma-weave-workflows/
- https://www.figma.com/blog/connecting-figma-and-weave/
- https://www.figma.com/blog/config-2026-recap/
- https://www.figma.com/release-notes/

Observed current mechanics:
- node-based generative workflow canvas;
- models/assets/transformations connected into inspectable pipelines;
- branching/remixing/comparing/refining across models;
- reusable workflows/templates;
- complex workflows packaged as simpler tools;
- Figma frames can participate as workflow nodes;
- current Figma-node behavior exposes selected text/image layers as inputs while preserving design structure.

Influencer OS transfer:
- Expert Workflow Graph is a first-class professional mode;
- Character/Canon/Scene/Prompt/Generation/Asset objects become typed workflow inputs/outputs;
- intermediate outputs remain inspectable;
- downstream reruns preserve upstream lineage;
- a validated workflow can become a bounded reusable Studio tool.

Do NOT:
- copy Figma/Weave chrome, branding or visual skin;
- force the node graph onto every creator;
- use graph visuals without real typed data/execution semantics.

Detailed product contract:
`01-BASE/EXPERT-WORKFLOW-GRAPH-CONTRACT.md`.

## Higgsfield — current official evidence

Official research used:
- https://higgsfield.ai/
- https://higgsfield.ai/creator-hub/help-center/tools/which-higgsfield-tool-should-i-use
- https://higgsfield.ai/creator-hub/help-center/getting-started/official-higgsfield-platforms
- https://higgsfield.ai/creator-hub/help-center/integrations/what-is-higgsfield-mcp
- https://higgsfield.ai/creator-hub/help-center/integrations/what-is-the-higgsfield-api

Observed current product architecture:
- a broad website/creator suite with distinct Studios/jobs;
- AI Influencer as a dedicated character job;
- Canvas for chained model workflows and reusable templates;
- MCP/CLI as agent-facing access;
- API as a developer/product-integration surface with its own operational/billing boundary;
- creations/assets remain part of the wider product experience.

Influencer OS transfer:
- expose clear job-based Studios without collapsing the product into one generator;
- keep one reusable Character/Canon system across jobs;
- Creator App, API/generation core and MCP should share the same domain model;
- MCP is a true agent surface, not a separate marketing demo;
- public/product explanation and creator execution may be different logical domains while remaining one product experience.

Do NOT:
- copy Higgsfield visual skin;
- copy their game-style character semantics into Character Passport;
- copy model/consistency claims;
- assume their billing/deployment architecture is right for Influencer OS.

## Research conclusion

The useful pattern is NOT “one giant frontend.”

It is:
- one coherent product;
- multiple purpose-built interaction surfaces;
- shared durable creative objects;
- a first-class expert workflow graph;
- API/generation infrastructure beneath the UI;
- MCP/agent access through the same core.

This directly supports the current four-domain Influencer OS architecture.
