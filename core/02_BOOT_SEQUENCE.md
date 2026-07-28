# Boot sequence

1. Confirm repository root.
2. Read universal entry and AHP+ manifest.
3. Inspect Git state.
4. Resolve active project from explicit command, current path or user confirmation—in that order.
5. Load project profile.
6. Check pending handoff and active locks.
7. Select mode: `STATUS`, `BOOTSTRAP`, `AUDIT`, `PLAN`, `BUILD`, `QA`, `HANDOFF`.
8. Load only relevant engines.
9. Execute within authority.
10. Record results and handoff.

If the active project is ambiguous, do not scan every folder into context; ask or list candidates.
