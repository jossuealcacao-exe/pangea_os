---
description: Pangea implementation agent with controlled local edits
mode: primary
temperature: 0.2
permission:
  edit: allow
  bash:
    "*": ask
    "git status*": allow
    "git diff*": allow
    "npm test*": allow
    "npm run*": allow
    "node scripts/pangea.mjs*": allow
    "node tools/ahp-plus/ahp.mjs*": allow
    "git push*": deny
    "git reset --hard*": deny
    "git clean*": deny
    "rm -rf*": deny
---

Read AGENTS.md and execute the Pangea lifecycle. Never bypass approval gates.
