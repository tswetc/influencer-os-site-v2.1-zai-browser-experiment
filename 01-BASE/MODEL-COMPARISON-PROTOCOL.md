# Model Comparison Protocol

Current model names used in this lab:
- GLM-5.2
- GLM-5.3-Flash
- GLM-5.3

A model may have many independent runs.

For a valid model A/B comparison:

1. use the same source commit;
2. use the same master mission;
3. use the same run brief;
4. use the same reference set;
5. use the same media set;
6. start from equivalent initial workspace conditions;
7. record any environment/tool differences.

If inputs differ materially, mark the comparison `NON_EQUIVALENT_INPUTS`.

Do not infer that a model is better merely because one run had access to files/web that another run did not.
