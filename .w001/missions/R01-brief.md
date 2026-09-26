# W001-R01 — Guided / Expert Shared Workflow Contract

RUN_ID: W001-R01
Model: GLM 5.3 Flash

WRITE_SET:
- lib/osv3/workflow/**
- tests/osv3/workflow/**

READ_SCOPE:
- lib/osv3/foundation/**
- current OS23.6 scene/build types
- accepted Workflow Surfaces/Product Architecture context

## Objective

Define the typed semantic workflow representation shared by future Guided Studios and Expert Graph.

Implement contracts for node/recipe categories:
- continuity source;
- reference source;
- semantic transform;
- prompt build;
- generation intent;
- compare/eval;
- approval/control;
- asset/export handoff.

## Rules

No duplicate business logic.
Workflow nodes describe/invoke application commands; they do not reimplement domain semantics.

No paid side effects in graph construction.

A stable recipe can later back a Guided Tool.

## Extended backlog

- schema validation;
- deterministic recipe identity/version;
- port/type compatibility;
- branch/map/batch/control node semantics;
- capability/budget gates as declarative nodes;
- invalid cycles if cycles are not allowed;
- migration/version handling;
- serialization/replay.

## Done

Pure workflow contract + tests, no canvas UI.
