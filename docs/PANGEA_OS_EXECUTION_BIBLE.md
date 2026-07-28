# Pangea OS Execution Bible

Guia maestra de comandos, agentes y tareas diarias para operar Pangea OS y AHP+ en macOS, Windows, iOS, Cursor, Claude Code, OpenCode, Codex, ChatGPT Plus y Ollama.

**Autor y propietario:** Jossue Alcala  
**Sistema:** Pangea OS 1.0.0  
**Protocolo de continuidad:** AHP+ 1.0.0  
**Principio:** Uno para gobernarlos a todos.  

---

## 0. Regla de oro

Pangea OS opera proyectos web. AHP+ preserva memoria, evidencia y handoff. Git transporta la verdad entre plataformas.

Nunca trates una conversacion como fuente canonica si Git o `/agent` dicen otra cosa.

Antes de editar cualquier cosa, ejecuta:

```bash
cd "$HOME/Pangea OS"
node scripts/pangea.mjs doctor
node tools/ahp-plus/ahp.mjs verify . --strict
git status -sb
```

Si estas en Windows:

```powershell
cd "$HOME\Pangea OS"
node scripts\pangea.mjs doctor
node tools\ahp-plus\ahp.mjs verify . --strict
git status -sb
```

---

## 1. Modelo mental

### Pangea OS

Usalo para:

- Registrar proyectos web.
- Seleccionar proyecto activo.
- Auditar arquitectura, UX/UI, SEO, rendimiento y seguridad.
- Ejecutar builds con agentes de IA.
- Coordinar proyectos de portafolio.
- Productizar templates.
- Trabajar con Shopify, frontend, backend, analytics y QA.
- Enrutar tareas entre Cursor, Claude Code, OpenCode, Codex, ChatGPT y Ollama.

### AHP+

Usalo para:

- Consultar memoria permanente.
- Registrar decisiones.
- Registrar tareas, bugs y riesgos.
- Registrar evidencia.
- Crear handoffs entre plataformas.
- Evitar alucinaciones y perdida de contexto.
- Bloquear alcance mientras un agente trabaja.
- Distinguir `VERIFIED`, `USER_CONFIRMED`, `INFERRED`, `UNVERIFIED`, `STALE` y `CONFLICTED`.

### Git

Usalo para:

- Versionar Pangea.
- Sincronizar entre maquinas y agentes.
- Validar ramas, commits y diffs.
- Publicar cambios a GitHub.
- Crear tags y releases.
- Recuperar estados anteriores sin depender del chat.

---

## 2. Comandos diarios universales

| Momento | Comando | Para que sirve |
|---|---|---|
| Entrar a Pangea | `cd "$HOME/Pangea OS"` | Abre la raiz del sistema en macOS/Linux. |
| Ver salud | `node scripts/pangea.mjs doctor` | Confirma que Pangea vive y AHP+ esta legible. |
| Ver estado | `node scripts/pangea.mjs status` | Muestra proyecto activo, proyectos registrados y Git. |
| Ver conflictos | `node scripts/pangea.mjs conflicts` | Detecta instrucciones viejas o configuraciones cruzadas. |
| Validar AHP+ | `node tools/ahp-plus/ahp.mjs verify . --strict` | Valida `/agent` con reglas estrictas. |
| Git corto | `git status -sb` | Muestra rama, upstream y cambios locales. |
| Log reciente | `git log --oneline --decorate -5` | Muestra los ultimos commits. |
| Reescanear proyectos | `node scripts/pangea.mjs scan .` | Actualiza `agent/PROJECTS.json`. |

---

## 3. macOS

### Abrir Pangea desde Terminal

```bash
cd "$HOME/Pangea OS"
```

### Verificar instalacion

```bash
node scripts/pangea.mjs doctor
node scripts/pangea.mjs conflicts
node tools/ahp-plus/ahp.mjs verify . --strict
git status -sb
```

### Abrir con Cursor

```bash
cursor "$HOME/Pangea OS"
```

### Abrir con Claude Code

```bash
cd "$HOME/Pangea OS"
claude
```

### Abrir con OpenCode

```bash
cd "$HOME/Pangea OS"
opencode
```

### Abrir con Codex

```bash
cd "$HOME/Pangea OS"
codex
```

### OpenCode con Ollama

```bash
cd "$HOME/Pangea OS"
ollama list
opencode
```

Dentro de OpenCode selecciona el proveedor/modelo local configurado. Ollama solo corre el modelo; OpenCode aporta lectura, escritura, shell y Git.

---

## 4. Windows

### Carpeta recomendada

```powershell
mkdir "$HOME\Pangea OS"
cd "$HOME\Pangea OS"
```

### Verificar instalacion

```powershell
node scripts\pangea.mjs doctor
node scripts\pangea.mjs conflicts
node tools\ahp-plus\ahp.mjs verify . --strict
git status -sb
```

### Abrir con Cursor

```powershell
cursor "$HOME\Pangea OS"
```

### Abrir con Claude Code

```powershell
cd "$HOME\Pangea OS"
claude
```

### Abrir con OpenCode

```powershell
cd "$HOME\Pangea OS"
opencode
```

### Abrir con Codex

```powershell
cd "$HOME\Pangea OS"
codex
```

### Notas Windows

- Usa PowerShell como terminal principal.
- Si algun comando falla por rutas con espacios, conserva comillas alrededor de `"$HOME\Pangea OS"`.
- Mantener Git instalado y autenticado es obligatorio para continuidad real.
- Si usas WSL, trata WSL como entorno Linux separado y no mezcles rutas Windows con rutas WSL sin decidirlo antes.

---

## 5. iOS

iOS no reemplaza una terminal local. Sirve para consultar, planear, revisar y pedir cambios cuando ChatGPT tiene acceso al repositorio mediante GitHub o archivos cargados.

### ChatGPT Plus / iOS

Usa un proyecto llamado `Pangea OS` y arranca con:

```text
/pangea status
```

Consultas utiles:

```text
/agent context jossue-portfolio
/agent backlog jossue-portfolio
/agent decisions
/agent risks
/agent qa
/agent evidence
/pangea handoff codex
```

### Reglas iOS

- Si ChatGPT no puede leer GitHub o archivos actuales, solo puede planear.
- No aceptes afirmaciones como "ya edite" sin evidencia de herramienta.
- Para pedir cambios desde iPhone, indica repo, rama, proyecto, alcance y QA esperado.

Ejemplo:

```text
Usa Pangea OS sobre el repo jossuealcacao-exe/pangea_os.
Lee /agent, verifica rama main, revisa el estado de jossue-portfolio y propon un plan.
No edites nada todavia.
```

---

## 6. Pangea OS CLI

Estos comandos corren en la terminal dentro de la raiz de Pangea.

```bash
node scripts/pangea.mjs doctor
node scripts/pangea.mjs scan .
node scripts/pangea.mjs status
node scripts/pangea.mjs select <project-id>
node scripts/pangea.mjs project <project-id>
node scripts/pangea.mjs conflicts
node scripts/pangea.mjs sync-status
node scripts/pangea.mjs version
```

### Cuándo usarlos

| Comando | Uso diario |
|---|---|
| `doctor` | Primer comando de salud. |
| `scan .` | Despues de agregar, mover o limpiar proyectos. |
| `status` | Antes de trabajar con cualquier agente. |
| `select <project-id>` | Cuando cambias el foco a un sitio concreto. |
| `project <project-id>` | Antes de auditar o construir sobre un proyecto. |
| `conflicts` | Antes de abrir un agente o despues de migraciones. |
| `sync-status` | Antes o despues de pull/push. |
| `version` | Para reportes, handoffs y releases. |

### Proyectos registrados actuales

| Project ID | Tipo | Stack |
|---|---|---|
| `bloqio-site` | static | Static HTML |
| `jossue-portfolio` | astro | Astro, TypeScript |
| `miawseo` | nextjs | Next.js, React, TypeScript |
| `tiendaonline` | shopify-theme | Shopify Liquid |
| `vineria` | vite | Vite, React, TypeScript |

---

## 7. AHP+ CLI

Estos comandos consultan y escriben memoria permanente en `/agent`.

### Lectura

```bash
node tools/ahp-plus/ahp.mjs verify .
node tools/ahp-plus/ahp.mjs verify . --strict
node tools/ahp-plus/ahp.mjs status .
node tools/ahp-plus/ahp.mjs context . --project <project-id>
node tools/ahp-plus/ahp.mjs brief .
node tools/ahp-plus/ahp.mjs backlog . --project <project-id>
node tools/ahp-plus/ahp.mjs decisions .
node tools/ahp-plus/ahp.mjs tasks .
node tools/ahp-plus/ahp.mjs bugs .
node tools/ahp-plus/ahp.mjs risks .
node tools/ahp-plus/ahp.mjs qa .
node tools/ahp-plus/ahp.mjs evidence .
node tools/ahp-plus/ahp.mjs history .
node tools/ahp-plus/ahp.mjs version
```

### Escritura

```bash
node tools/ahp-plus/ahp.mjs init . --owner "Jossue Alcala" --project pangea-os
```

```bash
node tools/ahp-plus/ahp.mjs set-state . \
  --project <project-id> \
  --phase IN_PROGRESS \
  --objective "Objetivo actual" \
  --next-action "Siguiente accion verificable" \
  --confidence USER_CONFIRMED
```

```bash
node tools/ahp-plus/ahp.mjs record task . \
  --title "Titulo de tarea" \
  --status IN_PROGRESS \
  --confidence USER_CONFIRMED
```

```bash
node tools/ahp-plus/ahp.mjs record bug . \
  --title "Descripcion breve del bug" \
  --status OPEN \
  --confidence VERIFIED
```

```bash
node tools/ahp-plus/ahp.mjs record risk . \
  --title "Riesgo detectado" \
  --status OPEN \
  --confidence INFERRED
```

```bash
node tools/ahp-plus/ahp.mjs record evidence . \
  --title "Build de produccion" \
  --type command \
  --locator "npm run build" \
  --result PASS \
  --confidence VERIFIED
```

```bash
node tools/ahp-plus/ahp.mjs close <record-id> . \
  --status COMPLETED \
  --reason "Criterios satisfechos"
```

```bash
node tools/ahp-plus/ahp.mjs supersede <decision-id> . \
  --title "Nueva decision"
```

```bash
node tools/ahp-plus/ahp.mjs handoff . \
  --from <platform> \
  --to <platform> \
  --summary "Resumen verificable"
```

```bash
node tools/ahp-plus/ahp.mjs lock . \
  --scope "<path>" \
  --owner "<platform-or-agent>" \
  --minutes 60
```

```bash
node tools/ahp-plus/ahp.mjs unlock <lock-id> . \
  --owner "<platform-or-agent>"
```

### Escritura segura con commit base

Usa esto cuando varios agentes puedan estar trabajando:

```bash
BASE=$(git rev-parse HEAD)
node tools/ahp-plus/ahp.mjs set-state . \
  --expected-base "$BASE" \
  --project <project-id> \
  --phase IN_PROGRESS \
  --objective "..." \
  --next-action "..." \
  --confidence USER_CONFIRMED
```

---

## 8. Comandos semanticos multiagente

Estos comandos se escriben dentro del agente de IA cuando el adaptador los soporta.

```text
/pangea status
/pangea bootstrap <project>
/pangea audit <project>
/pangea plan <project>
/pangea build <project> <task>
/pangea qa <project>
/pangea handoff <platform>
/pangea promote-pattern
/pangea template-release
/agent status
/agent context <project>
/agent backlog <project>
/agent decisions
/agent evidence
```

### Significado

| Comando | Tarea |
|---|---|
| `/pangea status` | Consulta estado sin editar. |
| `/pangea bootstrap <project>` | Entiende un proyecto existente y prepara memoria inicial. |
| `/pangea audit <project>` | Auditoria read-only de arquitectura, UX, SEO, rendimiento, seguridad y Git. |
| `/pangea plan <project>` | Plan de trabajo sin tocar archivos. |
| `/pangea build <project> <task>` | Implementacion controlada con QA y AHP+. |
| `/pangea qa <project>` | Validacion real con evidencia. |
| `/pangea handoff <platform>` | Transferencia de contexto verificable a otra IA. |
| `/pangea promote-pattern` | Convertir un patron probado en reusable. |
| `/pangea template-release` | Auditoria de template vendible antes de release. |
| `/agent ...` | Consultar o actualizar memoria AHP+. |

---

## 9. Cursor

### Arranque

```bash
cursor "$HOME/Pangea OS"
```

### Comandos principales

```text
/pangea status
/bootstrap jossue-portfolio
/audit jossue-portfolio
/build jossue-portfolio mejorar hero
/qa jossue-portfolio
/handoff claude-code
/agent status
/agent context jossue-portfolio
```

### Tareas ideales para Cursor

- Refactors con vista de proyecto.
- Edicion de UI.
- Navegacion entre archivos.
- Reorganizacion de componentes.
- QA asistido por reglas del repo.
- Trabajar sobre proyectos existentes con contexto de carpeta.

### Prompt seguro de inicio

```text
/pangea status

Verifica Git y AHP+. No edites archivos. Resume el proyecto activo,
riesgos, cambios locales y siguiente accion recomendada.
```

---

## 10. Claude Code

### Arranque

```bash
cd "$HOME/Pangea OS"
claude
```

### Comandos principales

```text
/pangea status
/pangea audit jossue-portfolio
/pangea build jossue-portfolio <tarea>
/pangea qa jossue-portfolio
/agent context jossue-portfolio
```

Si no reconoce slash commands:

```text
Usa la skill pangea. Lee AGENTS.md, agent/MANIFEST.json y
agent/CURRENT_STATE.json. Verifica Git y AHP+ antes de trabajar.
```

### Tareas ideales para Claude Code

- Implementacion profunda.
- Analisis de arquitectura.
- Refactors con plan.
- Correccion de bugs complejos.
- Preparacion de handoffs estructurados.

---

## 11. OpenCode

### Arranque

```bash
cd "$HOME/Pangea OS"
opencode
```

### Comandos principales

```text
/pangea status
/agent status
/bootstrap jossue-portfolio
/audit jossue-portfolio
/build jossue-portfolio <tarea>
/qa jossue-portfolio
/handoff cursor
/os-status
```

### Comandos especializados OpenCode

```text
/web-architect <request>
/visual-design <request>
/shopify-architect <request>
/web-qa <scope>
/ahp-handoff <destination>
/template-release <template>
/promote-pattern <source-project>
```

### Agentes OpenCode incluidos

| Agente | Uso |
|---|---|
| `web-plan` | Planeacion sin editar. |
| `web-build` | Ejecucion controlada. |
| `pangea-plan` | Planeacion usando kernel Pangea. |
| `pangea-build` | Build usando Pangea y AHP+. |
| `visual-director` | Direccion visual, tokens y QA visual. |
| `shopify-auditor` | Temas Shopify, Liquid, CRO y riesgos. |
| `qa-auditor` | Validacion, evidencia y cierre. |

### Tareas ideales para OpenCode

- Trabajo CLI-first.
- Alternar agentes especializados.
- Usar Ollama como modelo local.
- Auditorias de Shopify.
- QA estructurado.

---

## 12. Codex

### Arranque

```bash
cd "$HOME/Pangea OS"
codex
```

### Comandos principales

```text
$pangea
$agent
```

Si el skill no aparece:

```text
Usa Pangea OS. Lee AGENTS.md y .agents/skills/pangea/SKILL.md.
Verifica /agent y Git antes de editar.
```

### Tareas ideales para Codex

- Cambios de codigo con verificacion.
- Generacion de docs.
- Edicion de scripts.
- QA con comandos locales.
- Handoff hacia GitHub, Cursor o Claude Code.

---

## 13. ChatGPT Plus

### Arranque en Project

Usa el proyecto `Pangea OS` y escribe:

```text
/pangea status
```

### Consultas recomendadas

```text
/agent context jossue-portfolio
/agent backlog jossue-portfolio
/agent decisions
/agent risks
/agent qa
/agent evidence
/pangea handoff codex
```

### Tareas ideales para ChatGPT Plus

- Consultar contexto desde iOS.
- Preparar prompts.
- Revisar estrategia.
- Convertir conversaciones en planes.
- Pedir handoffs.
- Trabajar con GitHub cuando el conector lo permita.

### Regla importante

Si ChatGPT no tiene acceso al repo actual, debe decirlo. No puede afirmar que edito, probo o subio cambios.

---

## 14. Ollama

Ollama es runtime de modelos, no agente completo.

### Flujo recomendado

```bash
cd "$HOME/Pangea OS"
ollama list
opencode
```

Dentro de OpenCode:

```text
/pangea status
/audit jossue-portfolio
```

### Tareas ideales para Ollama

- Experimentos locales.
- Analisis sin enviar codigo a nube.
- Borradores de planes.
- Auditorias simples.

### Limites

- Ollama solo no tiene Git, shell ni filesystem operativo.
- Necesita un host como OpenCode.
- Sus respuestas deben tratarse como `UNVERIFIED` hasta que una herramienta confirme archivos y comandos.

---

## 15. Git esencial

### Estado

```bash
git status -sb
git branch -vv
git log --oneline --decorate -10
git remote -v
```

### Comparar cambios

```bash
git diff --stat
git diff
git diff --check
git diff --name-only
```

### Preparar commit

```bash
git add -A
git status --short
git commit -m "tipo: descripcion"
```

### Subir cambios

```bash
git push
```

### Traer cambios

```bash
git fetch --all --prune
git pull --ff-only
```

### Crear rama

```bash
git switch -c feature/nombre-corto
```

### Cambiar rama

```bash
git switch main
```

### Tags de release

```bash
git tag -a v1.0.0 -m "Pangea OS 1.0.0"
git push origin v1.0.0
```

### Revisar un archivo de otro commit

```bash
git show HEAD~1:path/to/file
```

### Reglas Git de Pangea

- No uses `git reset --hard` sin intencion explicita.
- No uses `git clean -fd` sin respaldo y aprobacion.
- No hagas push si el repo esta sucio de forma no entendida.
- Antes de un handoff, registra rama, commit y working tree.
- Si hay cambios de otro agente, entiende el diff antes de editar.

---

## 16. Flujos diarios

### Inicio de dia

```bash
cd "$HOME/Pangea OS"
git fetch --all --prune
git status -sb
node scripts/pangea.mjs doctor
node scripts/pangea.mjs status
node tools/ahp-plus/ahp.mjs verify . --strict
```

### Seleccionar proyecto

```bash
node scripts/pangea.mjs select jossue-portfolio
node scripts/pangea.mjs project jossue-portfolio
node scripts/pangea.mjs status
```

### Auditar sin editar

```text
/pangea audit jossue-portfolio
```

### Construir una tarea

```text
/pangea build jossue-portfolio mejorar navegacion mobile
```

### QA

```text
/pangea qa jossue-portfolio
```

### Cierre de sesion

```bash
node tools/ahp-plus/ahp.mjs verify . --strict
node scripts/pangea.mjs conflicts
git status -sb
git diff --stat
```

Si hubo cambios listos:

```bash
git add -A
git commit -m "docs: update pangea state"
git push
```

---

## 17. Flujos AHP+ diarios

### Consultar contexto

```bash
node tools/ahp-plus/ahp.mjs context . --project jossue-portfolio
```

### Ver backlog

```bash
node tools/ahp-plus/ahp.mjs backlog . --project jossue-portfolio
```

### Registrar evidencia QA

```bash
node tools/ahp-plus/ahp.mjs record evidence . \
  --title "Validacion de portafolio" \
  --type command \
  --locator "npm run validate" \
  --result PASS \
  --confidence VERIFIED
```

### Crear handoff

```bash
node tools/ahp-plus/ahp.mjs handoff . \
  --from opencode \
  --to codex \
  --summary "Auditoria terminada; pendiente implementar prioridad alta"
```

### Crear lock para evitar colisiones

```bash
node tools/ahp-plus/ahp.mjs lock . \
  --scope "jossue-portfolio/src" \
  --owner "Cursor" \
  --minutes 60
```

---

## 18. Tareas que puedes hacer con Pangea OS

### Portafolio

- Auditar estructura y UX.
- Mejorar hero, navegacion, proyectos y CTAs.
- Optimizar SEO y metadatos.
- Agregar casos de estudio.
- Crear pages nuevas.
- Validar responsive y accesibilidad.
- Preparar deploy.
- Registrar decisiones de marca.

### Templates para venta

- Extraer patrones reutilizables.
- Sanitizar contenido privado.
- Documentar instalacion.
- Crear demo limpia.
- Verificar licencias de assets.
- QA de clean install.
- Versionar releases.
- Preparar changelog.

### Shopify

- Auditar theme Liquid.
- Revisar sections y blocks.
- Mejorar PDP, PLP, cart y navigation.
- Modelar metafields y metaobjects.
- QA de mobile commerce.
- Revisar CRO.
- Preparar cambios sin tocar live theme sin autorizacion.

### Web apps

- Seleccionar arquitectura.
- Definir frontend y backend.
- Crear sistema visual.
- Implementar features.
- Validar build, lint, tests y QA visual.
- Preparar handoff.

### Gobernanza

- Registrar decisiones.
- Registrar riesgos.
- Registrar bugs.
- Registrar evidencia.
- Crear handoffs.
- Crear locks.
- Sincronizar con GitHub.
- Mantener memoria portable entre agentes.

---

## 19. Checklist anti-alucinaciones

Antes de aceptar una respuesta de cualquier IA, verifica:

- Dijo que edito archivos: debe haber diff.
- Dijo que corrio tests: debe mostrar comando y resultado.
- Dijo que hizo push: GitHub o `git status -sb` debe confirmarlo.
- Dijo que algo esta limpio: `git status -sb` debe confirmarlo.
- Dijo que AHP+ esta OK: `verify --strict` debe pasar.
- Dijo que no hay conflictos: `node scripts/pangea.mjs conflicts` debe dar `0`.
- Dijo que un proyecto esta activo: `node scripts/pangea.mjs status` debe mostrarlo.
- Dijo que un handoff existe: debe existir archivo en `agent/handoffs/`.

---

## 20. Niveles de certeza AHP+

| Nivel | Significado | Puede gobernar cambios |
|---|---|---|
| `VERIFIED` | Observado con herramienta, archivo, comando, commit o fuente primaria. | Si |
| `USER_CONFIRMED` | Confirmado directamente por Jossue o autoridad definida. | Si |
| `INFERRED` | Deduccion razonable basada en evidencia. | No sin validacion |
| `UNVERIFIED` | Afirmacion sin evidencia suficiente. | No |
| `STALE` | Antes valido, pero posiblemente desactualizado. | No sin revalidar |
| `CONFLICTED` | Fuentes incompatibles. | Bloquea decisiones dependientes |

---

## 21. Mensajes iniciales listos para copiar

### Status universal

```text
/pangea status

Verifica Git, Pangea y AHP+. No edites archivos. Reporta proyecto activo,
working tree, riesgos, locks, handoffs y siguiente accion recomendada.
```

### Auditoria

```text
/pangea audit jossue-portfolio

Haz auditoria read-only de arquitectura, UX/UI, accesibilidad, SEO,
performance, seguridad, dependencias y Git. Separa VERIFIED de INFERRED.
No modifiques archivos.
```

### Build controlado

```text
/pangea build jossue-portfolio mejorar hero mobile

Antes de editar, verifica AHP+, Git y alcance. Propón plan breve, implementa
solo lo necesario, ejecuta QA disponible, registra evidencia y termina con diff.
```

### Handoff

```text
/pangea handoff cursor

Genera handoff AHP+ con rama, commit, cambios, QA, riesgos, pendientes y
siguiente accion exacta. No inventes pruebas ni estado de archivos.
```

---

## 22. Cierre maestro

Cuando termines cualquier sesion seria:

```bash
cd "$HOME/Pangea OS"
node scripts/pangea.mjs doctor
node scripts/pangea.mjs conflicts
node tools/ahp-plus/ahp.mjs verify . --strict
git status -sb
git diff --stat
```

Si hay cambios que deben preservarse:

```bash
git add -A
git commit -m "tipo: descripcion clara"
git push
```

Si hay trabajo pendiente:

```bash
node tools/ahp-plus/ahp.mjs handoff . \
  --from <platform> \
  --to <platform> \
  --summary "Estado actual y siguiente accion"
```

La sesion no esta realmente cerrada hasta que Git y AHP+ puedan explicar que paso.
