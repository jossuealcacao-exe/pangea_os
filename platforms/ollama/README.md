# Ollama experimental adapter

Ollama runs the model; it does not by itself provide repository tools. Recommended path:

1. Run Ollama locally.
2. Use OpenCode as the agent host.
3. Configure the Ollama OpenAI-compatible endpoint.
4. Select a tool-capable coding model that fits available RAM.
5. Run `/pangea status` and confirm tool calls work.

Increase context to roughly 16k–32k if tool calls truncate, subject to model and hardware capacity. Treat local output as unverified until files and commands are inspected.
