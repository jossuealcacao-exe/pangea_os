# Install Pangea OS into an existing macOS folder

This guide assumes your current master folder is:

```text
$HOME/Pangea OS
```

and already contains sites such as `jossue-portfolio`, `tiendaonline`, `vineria` or Bloqio projects.

## Requirements

```bash
node --version   # Node 20 or newer
git --version
```

## 1. Protect the current folder

```bash
cd "$HOME/Pangea OS"
pwd
git status 2>/dev/null || true
```

Do not delete or move site folders. Commit or copy anything irreplaceable before installation.

## 2. Extract the release outside the target

```bash
cd "$HOME/Downloads"
unzip Pangea-OS-v1.0.0.zip
```

## 3. Run a dry-run

```bash
node "$HOME/Downloads/Pangea-OS-v1.0.0/scripts/install-into-existing.mjs" \
  "$HOME/Pangea OS" \
  --dry-run
```

The dry-run lists files, collisions and protected entries without modifying the target.

## 4. Install

```bash
node "$HOME/Downloads/Pangea-OS-v1.0.0/scripts/install-into-existing.mjs" \
  "$HOME/Pangea OS"
```

Safety behavior:

- Existing collisions are copied to `.pangea-backup/install-<timestamp>/`.
- Existing AHP+ `/agent` state is preserved on reinstall.
- A non-Pangea root `package.json` is preserved.
- `.gitignore` and `.gitattributes` are merged instead of replaced.
- Site folders are not moved.
- `--replace-state` exists, but should only be used after an explicit backup and review.

## 5. Verify that Pangea is alive

```bash
cd "$HOME/Pangea OS"
node scripts/pangea.mjs doctor
node scripts/pangea.mjs scan .
node scripts/pangea.mjs conflicts
node scripts/pangea.mjs status
node tools/ahp-plus/ahp.mjs verify .
node tools/ahp-plus/ahp.mjs brief .
```

Expected core result:

```json
"alive": true
```

## 6. Review legacy Web Architect OS copies

Your existing sites may still contain `_web-os`, old `AGENTS.md` files or platform adapters. Detect first:

```bash
node scripts/migrate-legacy.mjs .
```

This is plan-only. After reviewing the output and protecting Git state:

```bash
node scripts/migrate-legacy.mjs . --apply
```

The script moves detected legacy artifacts into `.pangea-backup/legacy-<timestamp>/`; it does not delete them. See `docs/CLEANUP_LEGACY_SITE_ADAPTERS.md`.

## 7. Select a project

After `scan` lists project IDs:

```bash
node scripts/pangea.mjs select jossue-portfolio
node scripts/pangea.mjs status
```

## 8. Open an AI coding host at the root

```bash
cursor "$HOME/Pangea OS"
cd "$HOME/Pangea OS" && claude
cd "$HOME/Pangea OS" && opencode
cd "$HOME/Pangea OS" && codex
```

Start the agent session with:

```text
/pangea status
/agent verify
/pangea bootstrap jossue-portfolio
```

Open the Pangea root, not only a nested `src` folder, when you expect universal context and AHP+ continuity.
