# AHP — Agent Handoff Protocol

## 1. Objetivo

Transferir trabajo entre ChatGPT, Claude, Claude Code, Codex, Cursor u otros agentes sin perder:

- Intención.
- Estado.
- Decisiones.
- Restricciones.
- Archivos.
- Riesgos.
- Pendientes.
- Próxima acción.

## 2. Regla principal

Un handoff no es un resumen general. Es un paquete operativo para que otro agente pueda continuar sin reconstruir el contexto desde cero.

## 3. Estructura canónica

```markdown
# AHP

## Identidad

- Proyecto:
- Flujo:
- Agente origen:
- Agente destino:
- Fecha:
- Estado:

## Objetivo activo

[RESULTADO QUE SE ESTÁ BUSCANDO]

## Contexto mínimo

[SOLO EL CONTEXTO QUE CAMBIA DECISIONES]

## Fuente de verdad

1. [FUENTE].
2. [FUENTE].

## Decisiones confirmadas

- [DECISIÓN + MOTIVO].

## Estado actual

### Completado

- [ELEMENTO].

### En progreso

- [ELEMENTO].

### Pendiente

- [ELEMENTO].

## Archivos y rutas

| Ruta | Estado | Función | Observaciones |
|---|---|---|---|

## Restricciones

- [RESTRICCIÓN].

## Supuestos vigentes

- [SUPUESTO].

## Riesgos

- [RIESGO + MITIGACIÓN].

## Validaciones realizadas

- [PRUEBA + RESULTADO].

## Próxima acción exacta

[UNA ACCIÓN CONCRETA PARA CONTINUAR]

## Criterio de terminado

- [CRITERIO].

## Instrucción al agente receptor

Continúa desde el estado descrito. No repitas trabajo completado, no reviertas decisiones confirmadas y no amplíes el alcance sin indicarlo.
```

## 4. Estados permitidos

- `DISCOVERY`
- `PLANNED`
- `IN_PROGRESS`
- `BLOCKED`
- `READY_FOR_QA`
- `COMPLETED`
- `ARCHIVED`

## 5. Reglas de compresión

Incluir:

- Decisiones irreversibles o costosas.
- Rutas reales.
- Cambios ya realizados.
- Errores conocidos.
- Fuente de verdad.
- Próxima acción.

Excluir:

- Conversación social.
- Explicaciones repetidas.
- Ideas descartadas sin relevancia.
- Historial que no modifica la ejecución.
- Información personal innecesaria.

## 6. Handoff de código

Añadir:

```markdown
## Repositorio

- Ruta:
- Rama:
- Último commit:
- Working tree:
- Comandos ejecutados:

## Cambios

| Archivo | Cambio | Estado |
|---|---|---|

## QA

- Build:
- Lint:
- Tests:
- Prueba manual:
```

## 7. Handoff visual

Añadir:

```markdown
## Dirección creativa

- Concepto:
- Formato:
- Paleta:
- Tipografía:
- Composición:
- Elementos bloqueados:
- Variantes rechazadas:
- Referencias:
```

## 8. Handoff de análisis

Añadir:

```markdown
## Datos

- Periodo:
- Fuente:
- Cobertura:
- Limitaciones:
- Transformaciones:
- Métricas:
- Discrepancias:
```

## 9. Regla de continuidad

El agente receptor debe:

1. Leer el AHP completo.
2. Verificar que las rutas o fuentes existan.
3. Confirmar el estado real mediante herramientas disponibles.
4. Continuar desde la próxima acción exacta.
5. Actualizar el AHP al terminar.
