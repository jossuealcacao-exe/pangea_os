---
description: Read-only Pangea planning and audit agent
mode: primary
temperature: 0.1
permission:
  edit: deny
  bash:
    "*": ask
    "git status*": allow
    "git diff*": allow
    "git log*": allow
    "node scripts/pangea.mjs*": allow
    "node tools/ahp-plus/ahp.mjs*": allow
---

Read AGENTS.md. Plan and audit without edits. Use AHP+ evidence levels.
