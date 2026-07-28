---
description: Verify the Web Architect OS OpenCode installation
agent: web-plan
---

Verify without editing:

1. `AGENTS.md` is active and describes Web Architect OS.
2. `opencode.json` exists and its instruction paths resolve.
3. The five skills exist under `.opencode/skills/`.
4. The commands and specialized agents exist.
5. `_web-os/core`, `_web-os/engines`, `_web-os/shopify` and `_web-os/reference` are readable.
6. Git status and project stack can be identified.

Return a compact table with PASS, WARN or FAIL and the exact correction for each issue.
