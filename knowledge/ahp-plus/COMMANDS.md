# Interfaz `/agent`

AHP+ ofrece dos capas equivalentes:

1. **Comando semántico en chat:** `/agent ...`
2. **CLI portable:** `node bin/ahp.mjs ...` o, dentro de Pangea, `node tools/ahp-plus/ahp.mjs ...`

La plataforma puede adaptar la sintaxis, pero no debe cambiar el significado ni afirmar que una operación ocurrió sin confirmación de herramienta.

## Lectura

| Chat | CLI | Resultado |
|---|---|---|
| `/agent verify` | `node bin/ahp.mjs verify .` | Valida estructura, JSON, niveles de certeza, secretos, IDs, handoffs e integridad |
| `/agent verify --strict` | `node bin/ahp.mjs verify . --strict` | Convierte warnings en fallo de validación |
| `/agent status` | `node bin/ahp.mjs status .` | Estado, Git, conteos, locks y warnings |
| `/agent context [project]` | `node bin/ahp.mjs context . --project ID` | Estado, perfil, registros activos y handoffs recientes |
| `/agent brief` | `node bin/ahp.mjs brief .` | Regenera `agent/INDEX.md` |
| `/agent backlog [project]` | `node bin/ahp.mjs backlog . --project ID` | Backlog y tareas no terminales |
| `/agent decisions` | `node bin/ahp.mjs decisions .` | Decisiones registradas |
| `/agent tasks` | `node bin/ahp.mjs tasks .` | Tareas registradas |
| `/agent bugs` | `node bin/ahp.mjs bugs .` | Bugs registrados |
| `/agent risks` | `node bin/ahp.mjs risks .` | Riesgos registrados |
| `/agent qa` | `node bin/ahp.mjs qa .` | Recibos QA |
| `/agent evidence` | `node bin/ahp.mjs evidence .` | Evidencia registrada |
| `/agent history` | `node bin/ahp.mjs history .` | Sesiones y handoffs |

## Escritura

### Inicializar

```bash
node bin/ahp.mjs init . --owner "Jossue Alcalá" --project pangea-os
```

### Actualizar estado

```bash
node bin/ahp.mjs set-state . \
  --project portfolio \
  --phase IN_PROGRESS \
  --objective "Refinar hero" \
  --next-action "Ejecutar QA responsive" \
  --confidence USER_CONFIRMED
```

### Registrar trabajo

```bash
node bin/ahp.mjs record task . \
  --title "Refinar navegación móvil" \
  --status IN_PROGRESS \
  --confidence USER_CONFIRMED \
  --source "agent/records/decisions/DEC-...json"
```

Tipos: `decision`, `task`, `bug`, `risk`, `qa`, `session`, `requirement`.

Una decisión `ACCEPTED` requiere confianza `VERIFIED` o `USER_CONFIRMED`. Un QA `PASS` requiere al menos una referencia de evidencia.

### Registrar evidencia

```bash
node bin/ahp.mjs record evidence . \
  --title "Build de producción" \
  --type command \
  --locator "npm run build" \
  --result PASS \
  --exit-code 0 \
  --confidence VERIFIED
```

Tipos de evidencia: `file`, `command`, `test`, `commit`, `url`, `user_confirmation`, `artifact`, `screenshot`.

### Cerrar o superseder

```bash
node bin/ahp.mjs close TASK-... . --status COMPLETED --reason "Criterios satisfechos"
node bin/ahp.mjs supersede DEC-... . --title "Nueva decisión propuesta"
```

Las decisiones aceptadas son inmutables: se corrigen mediante `supersede`, no reescribiendo el registro original.

### Handoff

```bash
node bin/ahp.mjs handoff . \
  --from claude-code \
  --to cursor \
  --summary "Implementación lista para inspección" \
  --done-criteria "Build PASS|QA visual PASS"
```

El handoff incluye rama, commit, working tree, decisiones, QA, riesgos, tareas y digest SHA-256. El receptor debe verificar el repositorio antes de continuar.

### Locks cooperativos

```bash
node bin/ahp.mjs lock . --scope "portfolio/src" --owner "Cursor" --minutes 60
node bin/ahp.mjs unlock LOCK-... . --owner "Cursor"
```

Los locks reducen colisiones entre agentes, pero Git no es un sistema de bloqueo distribuido en tiempo real. Todos los agentes deben hacer `pull/fetch`, verificar commit y respetar locks antes de escribir.

## Control de concurrencia

Todos los comandos de escritura aceptan:

```bash
--expected-base <commit>
```

Si el commit actual no coincide, la operación se detiene como conflicto. Esto no sustituye la revisión del diff ni la resolución de merges.

## Límite deliberado

AHP+ no ejecuta `git pull`, `commit`, `push`, `merge`, deploy ni publicación. Son acciones externas con autorización y permisos propios. El protocolo registra y verifica el estado; no convierte una solicitud de memoria en permiso de despliegue.
