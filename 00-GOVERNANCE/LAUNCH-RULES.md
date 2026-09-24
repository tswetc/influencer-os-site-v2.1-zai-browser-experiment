# Launch Rules

Before a full run starts:

1. transport test has passed in that chat/environment;
2. source commit is pinned;
3. run ID is unique;
4. model UI label is recorded;
5. run-specific design brief is assigned;
6. common source/mission URLs are commit-pinned;
7. agent is explicitly told GitHub is read-only input;
8. output filename contains the run ID.

## Stop gates

For transport-only tests: STOP after verification.

For full runs: do not stop after a successful build; complete the mission/review/export gates.

## Model identity

Never infer model identity from the prompt.
Record the UI-displayed label when available.
Otherwise use `MODEL_RUNTIME_ID_UNVERIFIED`.
