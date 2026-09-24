# Product Launch Queue — Current

## Already running

### ZAI-P001
Runtime: GLM-5.2  
Design: A / Controlled Graphic Editorial  
Type: integration pilot  
Input: provisional atlas derivatives

### ZAI-P002
Runtime: GLM-5.3-Flash  
Design: A / Controlled Graphic Editorial  
Type: integration pilot  
Input: provisional atlas derivatives

### ZAI-P003
Runtime: GLM-5.3  
Design: B / Quiet Photographic Cinema  
Type: integration pilot with launch-time model override  
Input: provisional atlas derivatives

### ZAI-P004
Runtime: GLM-5.3  
Design: B / Quiet Photographic Cinema  
Type: integration pilot with launch-time model override  
Input: provisional atlas derivatives

### ZAI-M001
Status: complete + centrally audited.

## Next immediate wave — after sanitized transport commit

Launch all independently from ONE freeze commit:

- ZAI-E004 — design A — strongest available runtime, GLM-5.3 preferred
- ZAI-E005 — design A — strongest available runtime, GLM-5.3 preferred
- ZAI-E006 — design B — strongest available runtime, GLM-5.3 preferred
- ZAI-E007 — design B — strongest available runtime, GLM-5.3 preferred
- ZAI-E008 — design C — strongest available runtime, GLM-5.3 preferred
- ZAI-E009 — design C — strongest available runtime, GLM-5.3 preferred
- ZAI-E010 — design D — strongest available runtime, GLM-5.3 preferred
- ZAI-E011 — design D — strongest available runtime, GLM-5.3 preferred

Also launch:

- ZAI-Q001 — disposable launch qualification — GLM-5.3-Flash preferred for throughput.

## Interpretation

E004–E011 are PRODUCT_QUALITY runs.

They are not a clean model benchmark when actual runtimes differ.

If two runs happen to use the same runtime + same design + same freeze, they become useful repeatability evidence.

## Isolation

Every run:
- unique ID;
- separate fresh chat;
- own sandbox/local Git;
- GitHub read-only;
- unique export ZIP;
- no sibling creative-direction reading.

## Freeze rule

All E004–E011 and Q001 should consume the same immutable freeze commit.

No prompt may say “latest main”.
