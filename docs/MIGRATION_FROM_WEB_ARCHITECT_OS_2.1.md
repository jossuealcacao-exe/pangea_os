# Migration from Web Architect OS 2.1

Pangea vendors Web Architect OS 2.1 as reusable knowledge under `knowledge/web-architect-os-v2.1/`.

Changes:

- Web Architect OS becomes an engine, not the top-level controller.
- AHP becomes AHP+ and moves into `/agent`.
- Root adapters are unified around `AGENTS.md`.
- Multiple sites are registered and isolated.
- Brownfield bootstrap is first-class.
- Completion requires evidence and commit-aware handoff.

Do not keep duplicate top-level `_web-os` instructions after migration unless required for backward compatibility; duplicates can create conflicts.
