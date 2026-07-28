# Pangea OS

**Uno para gobernarlos a todos.**

Pangea OS es un sistema operativo de ingeniería web y continuidad multiagente. Permite abrir el mismo repositorio con Cursor, Claude Code, OpenCode, Codex, ChatGPT o un host local con Ollama sin perder reglas, contexto, decisiones, backlog, QA ni handoff.

**Autor y director del sistema:** Jossue Alcalá  
**Versión:** 1.0.0  
**Fecha:** 23 de julio de 2026

## Arquitectura

```text
Pangea Kernel          → reglas, autoridad, routing y ciclo de ejecución
Project Registry       → perfiles aislados de cada sitio
Web Engines            → diseño, frontend, backend, Shopify, SEO, analytics y QA
AHP+ State Plane       → memoria, evidencia, backlog, decisiones y handoff
Platform Adapters      → Cursor, Claude Code, OpenCode, Codex, ChatGPT y Ollama
Git Transport          → historial, ramas, PR, conciliación y releases
```

## Primer latido

```bash
node scripts/pangea.mjs doctor
node scripts/pangea.mjs scan .
node scripts/pangea.mjs conflicts
node scripts/pangea.mjs status
node tools/ahp-plus/ahp.mjs verify .
```

En cualquier agente:

```text
/pangea status
/agent status
/pangea bootstrap tiendaonline
/agent context tiendaonline
```

## Trabajo sobre proyectos existentes

Pangea no exige mover todos los sitios. Puede registrar carpetas existentes en la raíz o dentro de `projects/`. El escáner detecta stacks sin cargar todo el contenido en cada sesión y crea perfiles aislados bajo `agent/projects/`.

## Seguridad operativa

Por defecto:

- Lee antes de escribir.
- No mezcla contexto entre proyectos.
- No declara QA sin evidencia.
- No lee secretos.
- No hace push, deploy, borrado o migración irreversible sin autorización explícita.
- Detecta un commit base obsoleto antes de handoff.

## Instalación en una carpeta existente

Consulta `docs/INSTALL_MACOS_EXISTING_FOLDER.md`. El instalador crea respaldos y no mueve tus páginas.

## Commercial templates

Pangea includes a productization lifecycle for converting proven project patterns into sanitized, documented and QA-backed commercial templates. See `core/13_TEMPLATE_PRODUCTIZATION.md`.

## AHP+

Pangea integra una instancia compatible con **AHP+ 1.0.0**. La especificación independiente vive en el repositorio `jossuealcacao-exe/ahp_plus`.

## Estado legal

Consulta `LICENSE`, `AUTHORSHIP.md`, `NOTICE` y `docs/legal/AUTHORSHIP_PROTECTION_PLAN.md`.
