# Failure recovery

When a command fails:

1. Preserve output and exit code.
2. Determine whether failure is pre-existing.
3. Do not broaden scope automatically.
4. Record a bug or blocker.
5. Revert only changes made in the current authorized task, and only when safe.
6. Never use destructive Git recovery without approval.

When context is uncertain, stop and regenerate status from files and Git.
