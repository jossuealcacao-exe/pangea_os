# Contratos de salida

Los contratos definen cómo debe entregarse cada resultado. No usar todas las secciones por defecto; seleccionar el contrato adecuado.

## Contrato A: Optimización estándar

```markdown
## Diagnóstico rápido

[Problema principal en 1 a 3 párrafos breves.]

## Prompt optimizado

[PROMPT FINAL]

## Ajustes realizados

- [AJUSTE]
- [AJUSTE]
- [AJUSTE]

## Riesgos o datos faltantes

[ÚNICAMENTE SI APLICA]
```

## Contrato B: Solo prompt

```markdown
[PROMPT FINAL]
```

No añadir texto externo.

## Contrato C: Auditoría

```markdown
# Resultado de auditoría

## Evaluación general

[PUNTUACIÓN O DIAGNÓSTICO]

## Hallazgos

| Prioridad | Hallazgo | Impacto | Corrección |
|---|---|---|---|

## Riesgos críticos

[RIESGOS]

## Recomendación

[ACCIÓN]
```

## Contrato D: Multiplataforma

```markdown
# Núcleo común

[OBJETIVO Y CONTEXTO COMPARTIDO]

# ChatGPT

[VERSIÓN ADAPTADA]

# Claude / Claude Code

[VERSIÓN ADAPTADA]

# Codex / Cursor

[VERSIÓN ADAPTADA]

# Diferencias relevantes

| Plataforma | Ajuste | Motivo |
|---|---|---|
```

No duplicar bloques idénticos si una referencia al núcleo común basta.

## Contrato E: Agente o SO

```markdown
# Arquitectura propuesta

[RESUMEN]

# Archivos

| Archivo | Función |
|---|---|

# Contenido

## [ARCHIVO 1]

[CONTENIDO]

## [ARCHIVO 2]

[CONTENIDO]

# Activación

[COMANDO DE INICIO]
```

Cuando se generen archivos reales, entregar enlaces y no repetir todo su contenido en el mensaje.

## Contrato F: Prompt técnico

```markdown
# Objetivo

[OBJETIVO]

# Contexto técnico

[CONTEXTO]

# Tarea

1. [PASO]
2. [PASO]
3. [PASO]

# Restricciones

- [RESTRICCIÓN]

# Validación

- [PRUEBA]

# Entrega

- Resumen.
- Archivos modificados.
- Pruebas.
- Riesgos.
- Commit sugerido.
```

## Contrato G: Prompt visual

```markdown
# Objetivo visual

[OBJETIVO]

# Composición

- Sujeto:
- Encuadre:
- Perspectiva:
- Fondo:
- Iluminación:
- Profundidad:

# Dirección estética

[ESTILO OPERATIVO]

# Elementos obligatorios

- [ELEMENTO]

# Restricciones

- [RESTRICCIÓN]

# Formato

- Relación de aspecto:
- Resolución o uso:
- Fondo:
```

## Regla de limpieza

No incluir:

- Secciones vacías.
- Riesgos inexistentes.
- Diagnósticos obvios.
- Explicaciones repetidas.
- Frases de cortesía dentro del prompt.
- Comentarios sobre “lo bien diseñado” que está el resultado.
