# Web Architect OS 2.1

**Un SO para controlar agentes web sin obligarlos a pensar igual.**

Web Architect OS transforma una idea, memoria o repositorio en una especificación y un master prompt ejecutable para:

- Claude Code.
- Cursor.
- Codex.
- ChatGPT Projects / Work.
- OpenCode.

## Qué incorpora 2.1

La versión 2.1 añade un adaptador nativo para OpenCode con:

- `AGENTS.md` de proyecto.
- `opencode.json` con instrucciones y permisos seguros.
- Skills progresivas en `.opencode/skills/`.
- Comandos reutilizables en `.opencode/commands/`.
- Agentes principales `web-build` y `web-plan`.
- Subagentes de dirección visual, Shopify y QA.
- Instalador seguro y guía específica para macOS.

La arquitectura común se mantiene:

```text
Idea
→ Intake
→ Clasificador
→ Router de motores
→ Arquitectura
→ Visual Design Engine
→ Ingeniería / Shopify
→ SEO / GEO / Analytics
→ QA
→ Adaptador de plataforma
→ Master prompt o ejecución
→ AHP
```

El documento `DESIGN-SYSTEM-VINERIA.md` permanece íntegro como fuente. Sus principios, tokens, patrones, anti-patrones y checklist alimentan los motores de diseño sin convertir el neumorfismo en estilo obligatorio.

## Activación rápida

### OpenCode en macOS

Instala OpenCode, extrae el paquete Ready y ejecuta el instalador dentro de la carpeta descomprimida:

```bash
./install-into-project.sh ~/Projects/mi-proyecto
cd ~/Projects/mi-proyecto
opencode
```

Dentro del TUI:

```text
/os-status
/web-architect [describe tu idea]
```

### Claude Code

```text
/web-architect
```

### Codex

```text
$web-architect
```

### Cursor y ChatGPT

Usa el adaptador correspondiente en `platforms/`.

## Regla central

> La estructura y las reglas producen la calidad; la paleta produce la identidad.

## Modos

- `PROMPT_ONLY`
- `PLAN`
- `BUILD`
- `AUDIT`
- `FIX`
- `HANDOFF`

## Seguridad

- Inspección antes de edición.
- No publicar ni hacer push sin autorización.
- No leer secretos.
- No sustituir evidencia por afirmaciones.
- No declarar terminado sin QA.
