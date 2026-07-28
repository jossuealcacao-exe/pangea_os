# Platform matrix

| Platform | Persistent entry | Skills/commands | Repository actions | Notes |
|---|---|---|---|---|
| Cursor | `AGENTS.md`, `.cursor/rules` | `.cursor/commands` | Yes, subject to approvals | Open repo root |
| Claude Code | `CLAUDE.md`, `AGENTS.md` reference | `.claude/skills` | Yes | Keep CLAUDE.md compact |
| OpenCode | `AGENTS.md`, `opencode.json` | `.opencode/skills`, commands, agents | Yes | Granular permissions included |
| Codex | `AGENTS.md` | `.agents/skills` | Yes | Discovery is repository scoped |
| ChatGPT Plus | Project instructions + context pack + GitHub connector | Semantic `/pangea` and `/agent` | Only when tools/connectors permit | Project memory is secondary |
| Ollama | System prompt/Modelfile | Semantic commands through host | Not alone | Use OpenCode or another tool host |
