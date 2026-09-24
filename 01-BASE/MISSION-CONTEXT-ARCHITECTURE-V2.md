# Mission Context Architecture V2

The current full mission is intentionally exhaustive, but a single ~300 KB / 9k-line prompt is not the ideal long-term run interface.

## Risk

Very large monolithic instructions increase the chance that an agent:
- satisfies surface count but misses depth;
- loses run-specific design constraints;
- treats source appendix volume as more important than current behavior contracts;
- spends context on repeated code rather than evidence and correction loops.

## Future launch packet

Official runs should receive a small deterministic entrypoint that resolves these layers from one freeze SHA:

1. `RUN-CONTRACT`
   - run ID/type/model policy/output.
2. `PRODUCT-TOPOLOGY`
   - current-vs-proposed scope.
3. `CURRENT-PRODUCT-BEHAVIOR-CONTRACT`
   - behavior acceptance tests.
4. `OS23 RELEASE CORE`
   - authoritative mechanics and hashes.
5. `DESIGN-RECIPE + FROZEN REFERENCE EVIDENCE`
6. `MEDIA-PACK MANIFEST`
7. `QA / DEFECT / EXPORT CONTRACT`

The long embedded source mission remains available as an appendix/reference.

## Depth before breadth

Three flagship jobs are P0 and must be deeply functional:

1. Character → Passport/Canon → save/reuse.
2. Scene/Image/Prompt Lab → visible OS transformation → adapter/self-check → generation state → compare/save.
3. Reuse the same character/project state into Video and planning (Series/Shoot/Feed/Canvas) with lineage/provenance.

Secondary surfaces must support these jobs rather than merely increase route count.
