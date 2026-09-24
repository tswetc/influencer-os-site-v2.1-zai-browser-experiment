# Product Launch Queue

## Lane 1 — run now

### ZAI-M001
Media curation.
Already running independently.

### ZAI-P001
GLM-5.2 full-system integration pilot.
Matched inputs with P002.

### ZAI-P002
GLM-5.3-Flash full-system integration pilot.
Matched inputs with P001.

### ZAI-P003
GLM-5.2 full-system integration pilot using design-set-b.
Matched inputs with P004.

### ZAI-P004
GLM-5.3-Flash full-system integration pilot using design-set-b.
Matched inputs with P003.

These pilots use provisional atlas derivatives and are not official Wave 01 candidates.

## Lane 2 — launch immediately after M001 media materialization + freeze

Pair A:
- ZAI-E004 — GLM-5.2
- ZAI-E005 — GLM-5.3-Flash

Pair B:
- ZAI-E006 — GLM-5.2
- ZAI-E007 — GLM-5.3-Flash

## Lane 3 — launch after the same freeze as soon as concurrency/resources allow

Pair C:
- ZAI-E008 — GLM-5.2
- ZAI-E009 — GLM-5.3-Flash

Pair D:
- ZAI-E010 — GLM-5.2
- ZAI-E011 — GLM-5.3-Flash

## Freeze rule

E004–E011 must all use the same launch-freeze commit unless an experiment explicitly tests a different input.

## No shared implementation

Every chat has:
- unique RUN_ID;
- own sandbox;
- own local Git;
- own export.

GitHub remains read-only input.
