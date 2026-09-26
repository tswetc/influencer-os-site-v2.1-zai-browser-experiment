# W001 Frozen Shared Interfaces V1

Date: 2026-09-26
Status: FROZEN_FOR_W001_PRELAUNCH
Scope: W001 only
Reason: resolve Z3 P1 cross-lane contract gaps before final packet minting.

These are launch-time shared contracts.
Workers may implement lane-local code that conforms to them, but may not invent incompatible alternatives.

## 1. Deterministic JSON canon

W001 deterministic serialization uses the following algorithm for JSON-safe semantic values.

### Allowed values

- null;
- boolean;
- string;
- finite JavaScript number;
- array;
- plain object with string keys.

Reject:
- undefined;
- function;
- symbol;
- bigint;
- NaN;
- +Infinity;
- -Infinity;
- Date instances or other class instances unless converted to an allowed scalar/object before canonicalization.

### Objects

- preserve exact key/value content;
- do not Unicode-normalize keys or string values;
- sort object keys by Unicode scalar/code-point ascending order;
- recursively canonicalize values;
- emit no insignificant whitespace.

### Arrays

Array order is preserved exactly.

If a domain concept is semantically unordered, that domain layer must sort it explicitly before canonicalization.
The canonicalizer itself never reorders arrays.

### Strings

Use standard JSON string escaping equivalent to ECMAScript `JSON.stringify(string)`.

No Unicode normalization is performed.

### Numbers

- finite numbers only;
- normalize negative zero to `0`;
- emit using ECMAScript `JSON.stringify(number)` representation.

### Encoding

Canonical text is encoded as UTF-8 with no BOM and no trailing newline.

### Digest

Canonical digest:
`sha256:<64 lowercase hex>`

over the exact UTF-8 canonical bytes.

Use:
`SERIALIZATION-VECTORS-V1.json`
as mandatory compatibility vectors.

## 2. Timestamp canon

Persistence/provenance timestamps use:
RFC3339 UTC with exactly millisecond precision:

`YYYY-MM-DDTHH:mm:ss.sssZ`

Rules:
- pure deterministic helpers must not call `Date.now()` internally;
- timestamp is passed/injected by the caller when needed;
- deterministic hashes exclude wall-clock timestamps unless the timestamp is explicitly part of the semantic identity payload;
- invalid/non-UTC/non-millisecond timestamp inputs are rejected at the canonical contract boundary unless a lane explicitly documents a normalization adapter.

## 3. ID rules

### Legacy IDs

Preserve legacy IDs byte-for-byte.
Do not rewrite existing CharacterPassport/reference/history IDs.

### New persistent IDs

W001 does not freeze UUID vs ULID vs another random generator.

Any function that creates a nondeterministic persistent ID must receive:
- an explicit ID;
or
- an injected `IdFactory`.

No hidden randomness inside deterministic helpers.

### Deterministic derived identity

When a mission explicitly requires a deterministic content/input/recipe identity:
- build an explicit namespaced identity payload;
- canonicalize with section 1;
- digest as `sha256:<hex>`.

Do not silently use truncated hashes as globally persistent entity IDs.

## 4. ModelStrategy V1

The exact W001 model-strategy enum is:

- `BEST_QUALITY`
- `FAST`
- `LOW_COST`
- `BEST_CHARACTER`
- `BEST_PRODUCT`
- `BEST_MOTION`
- `PINNED_MODEL`

Normative source:
`architecture/MODEL-EVOLUTION-V1.md`.

Rules:
- strategy is semantic selection intent;
- exact immutable ModelRoute is resolved separately;
- provider-native mutable alias is not semantic identity;
- A07 and A08 must not add/rename enum values during W001.

Any proposed new strategy is an INTERFACE_CHANGE_REQUEST.

## 5. Application command/result envelope V1

A08 owns implementation inside `lib/osv3/application/**`.

R01 and future Guided/Graph contracts must reference the same semantics and must not define a competing envelope.

### ApplicationCommand

Normative structural shape:

```ts
type ApplicationCommandV1<TInput = unknown> = {
  schema: "osv3.application-command.v1";
  commandType: string;
  commandVersion: 1;
  input: TInput;
};
```

Rules:
- pure semantic command description only;
- no provider secret;
- no paid execution side effect;
- no implicit timestamp/random ID;
- `commandType` is a stable namespaced semantic command identifier;
- input must be JSON-safe according to section 1 when persisted/hashed.

### ApplicationIssue

```ts
type ApplicationIssueV1 = {
  code: string;
  message: string;
  path?: string;
};
```

Issue codes are stable machine-readable strings.
Human message does not define semantics.

### ApplicationResult

```ts
type ApplicationResultV1<TValue = unknown> =
  | {
      schema: "osv3.application-result.v1";
      status: "OK";
      value: TValue;
      warnings: ApplicationIssueV1[];
    }
  | {
      schema: "osv3.application-result.v1";
      status: "REJECTED";
      errors: ApplicationIssueV1[];
      warnings: ApplicationIssueV1[];
    };
```

Rules:
- semantic validation/capability rejection is `REJECTED`;
- programmer/internal exceptions are not silently converted to semantic success;
- pure command execution must not create GenerationAttempt;
- paid/nondeterministic execution remains a later explicit boundary.

## 6. Workflow bridge

R01 workflow nodes that represent application behavior must reference:

- `commandType`;
- `commandVersion: 1`;
- input/output port mapping.

R01 may define workflow node structure but must not duplicate/reimplement application business logic.

The graph describes/invokes the A08 application contract.

No same-wave source import from A08 is required; both lanes implement against this frozen launch contract.

## 7. Character migration / round-trip

A02 must satisfy the existing frozen regression/migration rules:

- legacy CharacterPassport remains valid;
- round-trip preserves every existing field;
- original backup/source representation remains preservable;
- no invented biometric fields;
- no invented provider/model provenance;
- unknown legacy reference semantics remain explicit.

The W001 canonical serialization rules apply to NEW OS v3 deterministic identities/normalized candidate structures.

They do NOT authorize byte-rewriting of legacy backup content merely to canonicalize it.

## 8. Interface-change rule

A01-A08/R01 workers may not change these shared contracts independently.

If a worker believes a contract is insufficient:
- continue independent backlog where possible;
- emit `INTERFACE_CHANGE_REQUEST`;
- do not silently fork the contract.

Central/integration decides whether a new W001 construction/context revision is required.
