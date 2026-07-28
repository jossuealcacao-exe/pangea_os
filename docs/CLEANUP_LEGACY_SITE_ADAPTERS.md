# Migrating legacy Web Architect OS adapters

Pangea can contain sites previously initialized with Web Architect OS. Those sites may carry nested `AGENTS.md`, `CLAUDE.md`, `.cursor/`, `.claude/`, `.opencode/`, `.agents/`, `opencode.json` or `_web-os/` files.

Nested instructions are not automatically wrong, but legacy copies of the entire OS can override or duplicate the Pangea kernel. Pangea therefore reports them without deleting anything.

## 1. Detect

```bash
node scripts/pangea.mjs scan .
node scripts/pangea.mjs conflicts
node scripts/migrate-legacy.mjs .
```

The last command is **plan-only**.

## 2. Protect the current state

Review `git status`, commit or create a backup, and ensure no agent is editing the same paths.

## 3. Quarantine, do not delete

```bash
node scripts/migrate-legacy.mjs . --apply
```

Detected legacy artifacts are moved to `.pangea-backup/legacy-<timestamp>/` while preserving paths. The script only targets `_web-os` directly or instruction/configuration entries containing explicit Web Architect OS markers.

## 4. Validate

```bash
node scripts/pangea.mjs doctor
node scripts/pangea.mjs scan .
node tools/ahp-plus/ahp.mjs verify .
git diff --stat
git status
```

## Project-specific instructions after migration

Keep project facts in `agent/projects/<project-id>/`. A nested `AGENTS.md` may be reintroduced later when it contains only project-specific stack, commands and invariants and explicitly states that it cannot weaken the root Pangea constitution.
