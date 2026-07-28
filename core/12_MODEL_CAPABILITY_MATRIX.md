# Capability matrix

Pangea is model-neutral, not capability-blind.

Before delegating, check whether the host can:

- Read/write files.
- Run shell commands.
- Access Git.
- Browse official documentation.
- Render or inspect UI.
- Preserve long context.
- Use local/private models.

A model without tools may plan or review supplied text, but must not claim repository operations. Ollama alone is a runtime; pair it with an agent host for file operations.
