# Architecture

## Control plane

- `AGENTS.md`: universal entry.
- `core/`: policy, routing and lifecycle.
- `commands/`: portable command semantics.
- `platforms/`: native adapters.

## Knowledge plane

- `knowledge/web-architect-os-v2.1/`: reusable web engines.
- `knowledge/prompt-engineering/`: low-error prompt controls.
- `projects/`: optional project containers; existing root folders are also supported.

## State plane

- `agent/`: AHP+ instance.
- `agent/projects/`: isolated profiles.
- `agent/records/`: decisions, tasks, bugs, risks, QA and sessions.

## Transport plane

- Git branches, commits, tags, PRs and releases.

No provider-specific memory is canonical. Adapters are thin and replaceable.
