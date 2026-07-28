# Adaptadores por plataforma

## 1. ChatGPT Projects

### Priorizar

- Instrucciones persistentes claras.
- Archivos de conocimiento modulares.
- Comandos de activación.
- Contratos de salida.
- Manejo de ambigüedad.
- Separación entre reglas permanentes y contexto temporal.

### Evitar

- Repetir la misma regla en todos los archivos.
- Enterrar la misión entre ejemplos.
- Convertir información temporal en instrucción permanente.
- Suponer herramientas o conectores.

### Estructura recomendada

- `01_PROJECT_INSTRUCTIONS.md`: comportamiento principal.
- Archivos adicionales: reglas, plantillas, QA y handoff.
- Conversación: contexto específico de cada tarea.

---

## 2. Claude

### Priorizar

- Contexto documental bien delimitado.
- XML o Markdown cuando ayuden a separar bloques.
- Instrucciones explícitas sobre análisis, ejecución y salida.
- Definición de autoridad.
- Criterios de terminado.

### Patrón recomendado

```xml
<role>...</role>
<objective>...</objective>
<context>...</context>
<task>...</task>
<constraints>...</constraints>
<output>...</output>
<validation>...</validation>
```

No usar XML por decoración; solo cuando reduzca mezcla de instrucciones.

---

## 3. Claude Code

### Priorizar

- Ruta del proyecto.
- Rama.
- Estado del working tree.
- Archivos probables.
- Revisión antes de edición.
- Cambio mínimo.
- Comandos de QA.
- Protección frente a acciones destructivas.
- Resumen de archivos modificados.

### Instrucción base

```markdown
Antes de editar, inspecciona el repositorio y confirma el patrón existente. No inventes rutas, no sobrescribas cambios ajenos y no ejecutes acciones destructivas sin autorización.
```

---

## 4. Codex

### Priorizar

- Objetivo verificable.
- Alcance de edición.
- Restricciones técnicas.
- Definición de terminado.
- Pruebas.
- Entrega basada en cambios reales.

### Evitar

- Solicitudes abiertas como “mejora el proyecto”.
- Mezclar investigación, arquitectura y ejecución sin fases.
- Pedir refactor completo sin límites.

---

## 5. Cursor

### Priorizar

- Archivo o selección objetivo.
- Contexto de repositorio.
- Convenciones existentes.
- Diff mínimo.
- No alterar archivos fuera del alcance.
- Pasos de verificación.

### Patrón

```markdown
Trabaja únicamente en [ARCHIVOS/ÁREA]. Revisa referencias antes de modificar. Conserva las convenciones existentes y explica cualquier cambio fuera del alcance antes de aplicarlo.
```

---

## 6. Generadores de imagen

### Priorizar

- Sujeto.
- Composición.
- Perspectiva.
- Escala.
- Luz.
- Materiales.
- Estética observable.
- Elementos obligatorios.
- Restricciones.
- Formato.

### Evitar

- Adjetivos acumulados.
- Estilos contradictorios.
- Pedir texto complejo dentro de imágenes.
- Repetir “ultra”, “hiper” y “8K” como sustituto de dirección visual.

---

## 7. Generadores de video

Añadir:

- Duración.
- Secuencia temporal.
- Movimiento de cámara.
- Movimiento del sujeto.
- Velocidad.
- Transiciones.
- Continuidad.
- Audio.
- Primer y último fotograma.
- Restricciones de deformación.

---

## 8. Automatizaciones

### Priorizar

- Disparador.
- Frecuencia.
- Fuente.
- Condición.
- Acción.
- Excepciones.
- Registro.
- Notificación.
- Manejo de fallos.

### Plantilla mínima

```markdown
Cuando [DISPARADOR], consulta [FUENTE]. Si [CONDICIÓN], ejecuta [ACCIÓN]. No actúes cuando [EXCEPCIÓN]. Registra [DATOS] y notifica mediante [CANAL].
```

---

## 9. Multiplataforma

Separar:

### Núcleo común

- Objetivo.
- Contexto.
- Restricciones.
- Salida.

### Adaptador

- Herramientas.
- Formato.
- Autoridad.
- Persistencia.
- QA.

No mantener versiones completamente independientes si eso provoca divergencia. El núcleo debe ser la fuente de verdad y los adaptadores deben contener solo diferencias.
