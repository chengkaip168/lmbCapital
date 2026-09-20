# Tech Decisions

Architecture and strategy decision records for lmbCapital.

This directory is empty until the first decision is recorded — that is expected, not an error.

## Naming

```
NNN-short-kebab-title.md
```

`NNN` is a zero-padded sequence number (`001`, `002`, …). Numbers are never reused.

## Format

```markdown
# NNN — Title

- **Date**: YYYY-MM-DD
- **Status**: proposed | accepted | superseded by NNN

## Context
What forced the decision. Constraints, and what was true at the time.

## Decision
What was chosen, stated plainly.

## Consequences
What this makes easier, what it makes harder, and what it rules out.
```

## Scope

Record a decision here when it is costly to reverse, or when a future reader would
otherwise wonder why the code looks the way it does — hosting and deploy model,
dependency choices with lock-in, content and SEO strategy, brand positioning.

Routine implementation choices do not need a record.
