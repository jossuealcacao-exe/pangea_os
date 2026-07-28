# Especificación AHP+ 1.0

## 1. Alcance

AHP+ define un plano de continuidad para agentes de IA que colaboran sobre repositorios. No define un modelo, proveedor ni interfaz gráfica. Define datos, estados, evidencia, reglas de escritura, validación y handoff.

## 2. Términos normativos

- **DEBE / MUST:** requisito obligatorio para conformidad.
- **NO DEBE / MUST NOT:** prohibición obligatoria.
- **DEBERÍA / SHOULD:** recomendación cuya omisión debe justificarse.
- **PUEDE / MAY:** comportamiento opcional.

## 3. Fuente canónica

1. El directorio `/agent` del repositorio es la memoria operativa canónica.
2. La conversación, memoria privada del proveedor o resumen del modelo NO sustituye `/agent`.
3. Git es el transporte, historial y mecanismo de conciliación; no es una base de datos en tiempo real ni resuelve por sí solo conflictos semánticos.
4. Un registro sólo puede declararse `VERIFIED` cuando existe evidencia reproducible o una fuente primaria identificable.

## 4. Niveles de certeza

| Nivel | Significado | Uso permitido |
|---|---|---|
| `VERIFIED` | Observado mediante herramienta, archivo, comando o fuente primaria | Puede gobernar ejecución |
| `USER_CONFIRMED` | Confirmado explícitamente por el propietario | Puede gobernar ejecución; conservar cita o referencia |
| `INFERRED` | Deducción razonable a partir de evidencia | No puede presentarse como hecho |
| `UNVERIFIED` | Afirmación sin evidencia suficiente | No puede activar cambios de alto impacto |
| `STALE` | Antes válida, pero fuera de su ventana de vigencia | Debe revalidarse |
| `CONFLICTED` | Dos fuentes incompatibles | Bloquea decisiones dependientes |

Un agente NO DEBE promover `INFERRED` o `UNVERIFIED` a `VERIFIED` sin registrar nueva evidencia.

## 5. Identidad

Cada escritura DEBE registrar:

- `id` estable.
- `kind`.
- `created_at` y `updated_at` en UTC.
- `actor` con plataforma y modelo cuando estén disponibles.
- `project_id`.
- `status`.
- `confidence`.
- `source_refs`.
- `base_commit` cuando la operación modifica estado compartido.

## 6. Registros

Tipos normativos:

- `decision`
- `task`
- `bug`
- `risk`
- `qa`
- `session`
- `requirement`
- `handoff`
- `evidence`

Los registros de `decision` aceptados son inmutables. Una corrección crea una nueva decisión con `supersedes`.

## 7. Estados

Estados de flujo permitidos:

`DISCOVERY`, `PLANNED`, `IN_PROGRESS`, `BLOCKED`, `READY_FOR_QA`, `VERIFIED`, `COMPLETED`, `ARCHIVED`, `REJECTED`.

Transiciones de alto impacto:

- `READY_FOR_QA → VERIFIED` exige al menos un registro QA con evidencia.
- `VERIFIED → COMPLETED` exige criterios de terminado satisfechos.
- `COMPLETED → IN_PROGRESS` exige nueva tarea o regresión explícita.
- `decision: PROPOSED → ACCEPTED` exige aprobación del propietario o autoridad delegada.

## 8. Preflight obligatorio

Antes de editar código o memoria compartida, el agente DEBE:

1. Leer `agent/MANIFEST.json` y `agent/CURRENT_STATE.json`.
2. Obtener rama, commit base y estado del working tree.
3. Comprobar si hay handoff pendiente o lock vigente.
4. Verificar el alcance autorizado.
5. Declarar bloqueos reales.

## 9. Escritura segura

- Leer antes de escribir.
- No sobrescribir registros ajenos sin comparar `base_commit`.
- Preferir archivos independientes para reducir conflictos.
- No guardar secretos, tokens, cookies, datos personales innecesarios ni `.env`.
- No ejecutar push, deploy, cambios destructivos o migraciones irreversibles sin autorización explícita.
- Una operación con base obsoleta DEBE detenerse y marcarse `CONFLICTED`.

## 10. Evidencia

Una evidencia debe contener:

- Tipo: `file`, `command`, `test`, `commit`, `url`, `user_confirmation`, `artifact`, `screenshot`.
- Localizador reproducible.
- Hash cuando exista un artefacto estable.
- Fecha de observación.
- Actor.
- Resultado y limitaciones.

La salida textual de un modelo NO es evidencia de que una acción se ejecutó.

## 11. Handoff

Un handoff DEBE contener:

- Origen y destino.
- Objetivo activo.
- Commit base y rama.
- Dirty state.
- Decisiones aceptadas.
- Trabajo completado, activo y pendiente.
- Archivos relevantes.
- Validaciones con resultados.
- Riesgos y supuestos.
- Próxima acción exacta.
- Criterio de terminado.
- Hash del manifiesto del handoff.

El agente receptor DEBE verificar el estado real antes de continuar. No debe confiar ciegamente en el resumen.

## 12. Locks

Los locks son avisos cooperativos, no bloqueos distribuidos fuertes. Deben incluir propietario, alcance, commit base, creación y expiración. Un lock expirado no autoriza sobrescribir cambios; obliga a revalidar.

## 13. Compacción

La compacción puede resumir sesiones antiguas, pero NO puede eliminar:

- Decisiones aceptadas.
- Evidencia necesaria para QA.
- Riesgos abiertos.
- Bugs activos.
- Autoría y procedencia.

## 14. Conformidad

Una implementación es **AHP+ Core Conformant** cuando:

- Mantiene la estructura mínima.
- Valida tipos, estados y certeza.
- Respeta la inmutabilidad de decisiones aceptadas.
- Genera handoffs con commit base.
- Bloquea secretos obvios.
- Separa hechos, inferencias y suposiciones.

Consulta `docs/CONFORMANCE.md`.
