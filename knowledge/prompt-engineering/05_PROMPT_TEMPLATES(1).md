# Plantillas reutilizables

## 1. Plantilla universal compacta

```markdown
Necesito que [ACCIÓN PRINCIPAL].

Contexto:
[INFORMACIÓN NECESARIA].

Restricciones:
- [LÍMITE 1].
- [LÍMITE 2].
- No inventes información.

Entrega:
[FORMATO EXACTO].
```

## 2. Plantilla universal completa

```markdown
# Rol

Actúa como [FUNCIÓN] con experiencia en [ÁREA], únicamente dentro del alcance descrito.

# Objetivo

[RESULTADO PRINCIPAL].

# Contexto

[CONTEXTO RELEVANTE].

# Fuente de verdad

1. [FUENTE PRIORITARIA].
2. [FUENTE SECUNDARIA].

# Tarea

1. [ACCIÓN].
2. [ACCIÓN].
3. [VALIDACIÓN].

# Restricciones

- [LÍMITE].
- No inventes información.
- No amplíes el alcance sin declararlo.
- Si falta información crítica, detente y solicita únicamente lo indispensable.
- Si falta información secundaria, usa un placeholder o supuesto declarado.

# Formato de salida

[FORMATO].

# Criterios de calidad

- [CRITERIO].
- [CRITERIO].

# Validación

- [PRUEBA O CHECK].
```

## 3. Plantilla para código

```markdown
Actúa como desarrollador senior especializado en [STACK].

# Objetivo

[FEATURE, FIX O REFACTOR].

# Contexto técnico

- Proyecto: [NOMBRE].
- Repositorio o carpeta: [RUTA].
- Rama: [BRANCH].
- Stack: [TECNOLOGÍAS].
- Estado actual: [ESTADO].
- Problema: [PROBLEMA].
- Archivos probables: [ARCHIVOS].

# Procedimiento

1. Revisa la arquitectura y el código relacionado antes de modificar.
2. Identifica la causa o el punto mínimo de intervención.
3. Aplica el cambio mínimo necesario.
4. Conserva compatibilidad con los patrones existentes.
5. Ejecuta las validaciones disponibles.
6. Documenta riesgos y limitaciones.

# Restricciones

- No inventes archivos ni APIs.
- No cambies contratos públicos sin necesidad.
- No agregues dependencias sin justificar.
- No hagas refactors amplios fuera del alcance.
- No modifiques estilos globales salvo autorización.
- No ocultes fallos de pruebas.

# QA

- [BUILD].
- [LINT].
- [TEST].
- [PRUEBA MANUAL].
- [CASO LÍMITE].

# Entrega

1. Resumen.
2. Archivos modificados.
3. Validaciones ejecutadas.
4. Riesgos.
5. Commit sugerido.
```

## 4. Plantilla para análisis estratégico

```markdown
Actúa como estratega senior en [ÁREA].

# Objetivo

[DECISIÓN O PLAN].

# Contexto

- Empresa: [NOMBRE].
- Mercado: [MERCADO].
- Audiencia: [AUDIENCIA].
- Estado actual: [ESTADO].
- Recursos: [RECURSOS].
- Restricciones: [RESTRICCIONES].
- Periodo: [PERIODO].

# Fuente de verdad

[DATOS O SISTEMAS].

# Tarea

1. Diagnostica la situación con evidencia.
2. Identifica oportunidades.
3. Prioriza por impacto, esfuerzo y riesgo.
4. Propón un plan accionable.
5. Define métricas de éxito.
6. Señala dependencias y limitaciones.

# Restricciones

- No uses generalidades.
- No inventes datos.
- Distingue hechos, inferencias y supuestos.
- No prometas resultados garantizados.

# Entrega

1. Resumen ejecutivo.
2. Diagnóstico.
3. Oportunidades priorizadas.
4. Plan.
5. Riesgos.
6. Métricas.
7. Siguiente acción.
```

## 5. Plantilla visual

```markdown
Crea una imagen destinada a [USO].

# Objetivo visual

[QUÉ DEBE COMUNICAR].

# Sujeto principal

[DESCRIPCIÓN PRECISA].

# Composición

- Encuadre: [TIPO].
- Posición: [UBICACIÓN].
- Perspectiva: [TIPO].
- Escala: [RELACIÓN].
- Fondo: [DESCRIPCIÓN].
- Iluminación: [TIPO].
- Profundidad de campo: [TIPO].

# Dirección estética

[ESTILO CON ATRIBUTOS OBSERVABLES].

# Elementos obligatorios

- [ELEMENTO].
- [ELEMENTO].

# Restricciones

- No agregues elementos no solicitados.
- Mantén anatomía, escala y perspectiva coherentes.
- No deformes marcas, rostros, manos, texto o dispositivos.
- Evita texto inventado o ilegible.
- No sustituyas el sujeto principal.

# Formato

- Relación de aspecto: [FORMATO].
- Resolución o destino: [USO].
- Fondo: [TIPO].
```

## 6. Plantilla de agente

```markdown
# Identidad

Eres [NOMBRE O FUNCIÓN DEL AGENTE].

# Misión

[RESULTADO PERSISTENTE].

# Alcance

Puedes:
- [CAPACIDAD].

No puedes:
- [LÍMITE].

# Autoridad

Nivel: [CONSULTIVO / ASISTIDO / EJECUTOR LIMITADO / AUTÓNOMO CONTROLADO].

# Entradas

- [TIPO DE ENTRADA].

# Fuentes y herramientas

- [FUENTE].
- [HERRAMIENTA].

No asumas acceso a herramientas no confirmadas.

# Memoria

Debes conservar:
- [DECISIONES].
- [ESTADO].
- [PREFERENCIAS].

No debes guardar:
- [DATOS TEMPORALES O SENSIBLES].

# Flujo

1. Interpreta.
2. Valida contexto.
3. Propón o ejecuta según autoridad.
4. Comprueba.
5. Registra estado.
6. Entrega siguiente acción.

# Modos

- [MODO].
- [MODO].

# Restricciones

- [REGLA].

# Contrato de salida

[FORMATO].

# Escalamiento

Solicita autorización humana cuando:
- [CONDICIÓN].
```

## 7. Plantilla de Sistema Operativo

```markdown
# Sistema

Nombre: [NOMBRE].
Propósito: [PROPÓSITO].

# Principios

- [PRINCIPIO].

# Arquitectura

- Núcleo.
- Modos.
- Memoria.
- Herramientas.
- Plantillas.
- Validación.
- Handoff.
- Changelog.

# Autoridad

[NIVEL Y LÍMITES].

# Flujo principal

[ENTRADA → DECISIÓN → EJECUCIÓN → QA → SALIDA].

# Manejo de errores

- [REGLA].

# Definición de terminado

- [CRITERIO].
```

## 8. Plantilla de investigación

```markdown
# Objetivo de investigación

[PREGUNTA].

# Alcance

- Tema:
- Periodo:
- Geografía:
- Fuentes permitidas:
- Fuentes excluidas:

# Método

1. Separa hechos, interpretaciones e inferencias.
2. Prioriza fuentes primarias.
3. Contrasta afirmaciones relevantes.
4. Registra discrepancias.
5. No rellenes vacíos con suposiciones silenciosas.

# Entrega

1. Respuesta ejecutiva.
2. Evidencia.
3. Puntos de desacuerdo.
4. Limitaciones.
5. Fuentes.
```
