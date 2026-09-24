# Model Selection Policy — Product Lab

## Current founder preference

For substantial full-product / architecture-heavy browser runs, prefer the strongest available GLM runtime in this order:

1. GLM-5.3 — preferred when capacity is available.
2. GLM-5.3-Flash — preferred for high-throughput visual/media/reference work and as the primary fallback for full-product runs.
3. GLM-5.2 — useful as a baseline, fallback, and comparison/control runtime.

This is an operating preference, NOT yet a proven capability ranking.

The lab must distinguish:
- founder/model-selection preference;
- observed run evidence;
- controlled matched-model comparison.

## Runtime identity rule

Every run records:
- requested model;
- actual UI-displayed model at launch;
- whether the actual runtime differs from the original RUN.md declaration.

If a stronger runtime becomes available at launch, the founder may intentionally override the planned model.

Record:
`MODEL_OVERRIDE_AT_LAUNCH`

Do not pretend that a run with an overridden runtime is still a controlled comparison against the originally assigned model.

## Two evaluation lanes

### Product-quality lane

Goal: obtain the strongest candidate product.

Use the strongest available runtime, normally GLM-5.3.

Cross-run model fairness is secondary.

### Model-benchmark lane

Goal: compare runtime behavior.

Inputs and model assignments must remain matched and fixed.

If model assignments change, the run becomes a product-quality candidate or repeatability run, not a clean model benchmark.

## Current pilot interpretation

- ZAI-P001: GLM-5.2
- ZAI-P002: GLM-5.3-Flash

These remain a useful cross-model design-set-A pilot pair.

- ZAI-P003: GLM-5.3
- ZAI-P004: GLM-5.3

These form a same-model replication pair on design-set-B and can be used to measure run-to-run variance / repeatability rather than model-vs-model capability.

No claim that GLM-5.3 is superior should be recorded as lab fact until candidate audits provide evidence.
