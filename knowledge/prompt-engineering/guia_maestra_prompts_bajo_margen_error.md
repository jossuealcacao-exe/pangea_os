# Guía Maestra para Mejorar la Redacción y Creación de Prompts

## 1. Propósito del archivo

Este documento define las reglas, límites, estructura y criterios de calidad para crear, revisar, optimizar y transformar prompts dirigidos a modelos de lenguaje, asistentes de IA, agentes de código, generadores visuales o flujos automatizados.

El objetivo es que cada prompt sea:

- Claro.
- Directo.
- No redundante.
- Fácil de interpretar por un LLM.
- Con bajo margen de error.
- Adaptado al objetivo real del usuario.
- Útil para ejecutar una tarea concreta sin ambigüedad innecesaria.

Este archivo debe usarse como referencia base cada vez que se solicite crear, mejorar, reescribir, auditar o convertir una idea en un prompt funcional.

---

## 2. Principio central

Un buen prompt no es el más largo.  
Un buen prompt es el que reduce la interpretación libre del modelo y aumenta la probabilidad de obtener exactamente el resultado esperado.

La prioridad siempre debe ser:

1. Entender la intención real del usuario.
2. Eliminar ambigüedades críticas.
3. Ordenar las instrucciones por jerarquía.
4. Quitar redundancias.
5. Definir formato de salida.
6. Incluir límites claros.
7. Agregar criterios de validación.

---

## 3. Alcance

Este marco aplica para prompts de:

- ChatGPT, Claude, Gemini, Perplexity u otros LLM.
- Cursor, Codex, Copilot u otros agentes de código.
- Generadores de imagen o video.
- Automatizaciones.
- Análisis de documentos.
- Estrategia, marketing, SEO, paid media, e-commerce, Shopify, desarrollo web y producto digital.
- Escritura creativa, técnica, comercial o profesional.
- Prompts para proyectos, fuentes, briefings, sistemas de trabajo o documentación interna.

---

## 4. Límites

Al optimizar un prompt, no se debe:

- Cambiar la intención principal del usuario.
- Inventar objetivos que el usuario no pidió.
- Añadir complejidad innecesaria.
- Convertir una petición simple en un sistema excesivo.
- Repetir la misma instrucción con palabras distintas.
- Mezclar demasiados roles si no aportan valor.
- Usar lenguaje ambiguo como “hazlo bonito”, “mejor”, “profesional” sin definir criterios.
- Incluir instrucciones contradictorias.
- Pedir al modelo que haga cosas imposibles, como garantizar resultados absolutos.
- Omitir restricciones importantes.
- Asumir datos sensibles, técnicos o comerciales no proporcionados.
- Forzar un formato de salida que no sirva al objetivo.

---

## 5. Jerarquía de instrucciones

Cuando se construya un prompt, las instrucciones deben ordenarse así:

1. **Rol o función del modelo**
   - Qué papel debe asumir.
   - Qué experiencia o enfoque debe usar.
   - Solo incluirlo si mejora la ejecución.

2. **Objetivo principal**
   - Qué debe lograr.
   - Cuál es el entregable final.

3. **Contexto relevante**
   - Información necesaria para ejecutar bien la tarea.
   - Evitar contexto ornamental o irrelevante.

4. **Instrucciones específicas**
   - Qué debe hacer.
   - Qué debe evitar.
   - Qué pasos debe seguir.

5. **Restricciones**
   - Límites técnicos, de estilo, formato, tono, alcance, datos o herramientas.

6. **Formato de salida**
   - Cómo debe entregar el resultado.
   - Ejemplo: tabla, checklist, markdown, JSON, prompt final, plan por fases, código, etc.

7. **Criterios de calidad**
   - Cómo saber si la respuesta es correcta o útil.

8. **Manejo de ambigüedad**
   - Qué debe hacer el modelo si falta información.
   - Preguntar solo si la falta de información bloquea la tarea.

---

## 6. Reglas de claridad

Todo prompt optimizado debe cumplir estas reglas:

### 6.1 Usar verbos concretos

Preferir:

- Analiza.
- Resume.
- Clasifica.
- Optimiza.
- Reescribe.
- Compara.
- Audita.
- Genera.
- Convierte.
- Estructura.
- Refactoriza.
- Valida.

Evitar:

- Mejora esto.
- Hazlo bien.
- Dale más fuerza.
- Que se vea profesional.
- Déjalo chido.
- Hazlo más bonito.

Si se usan palabras subjetivas, deben traducirse a criterios concretos.

Ejemplo:

> “Hazlo más profesional”

Debe convertirse en:

> “Usa un tono claro, directo, ejecutivo, sin exageraciones comerciales y con estructura escaneable.”

---

## 7. Reglas contra redundancia

Antes de entregar un prompt final, revisar y eliminar:

- Instrucciones duplicadas.
- Frases que dicen lo mismo con otra redacción.
- Adjetivos acumulados sin función.
- Roles inflados.
- Contexto que no afecta el resultado.
- Reglas obvias que el modelo ya puede inferir.
- Listas demasiado largas cuando 3 a 5 puntos son suficientes.

### Ejemplo de redundancia

Malo:

> Sé claro, preciso, directo, conciso, entendible, fácil de leer y sin confusión.

Mejor:

> Escribe con claridad, sin rodeos y sin ambigüedades.

---

## 8. Reglas de bajo margen de error

Para reducir errores, cada prompt debe intentar definir:

- Qué se quiere.
- Para quién es.
- Con qué información se cuenta.
- Qué no debe hacer el modelo.
- Qué formato debe entregar.
- Qué criterios debe respetar.
- Qué hacer si falta información.
- Qué supuestos puede tomar.
- Qué supuestos no puede tomar.

### Regla práctica

Si una instrucción puede interpretarse de tres formas distintas, todavía está mal escrita.

---

## 9. Manejo de ambigüedad

El modelo debe preguntar solo cuando falte información indispensable.

Si la falta de información no bloquea la tarea, debe avanzar con supuestos razonables y declararlos brevemente.

### Regla

- Si la ambigüedad afecta el resultado final: preguntar.
- Si la ambigüedad solo afecta detalles menores: asumir y continuar.
- Si hay riesgo de inventar información: no inventar.
- Si hay datos faltantes: usar placeholders.

Ejemplo:

```markdown
[Nombre del proyecto]
[Audiencia objetivo]
[Formato deseado]
[Restricciones técnicas]
```

---

## 10. Estructura recomendada para prompts finales

Usar esta estructura cuando se optimice una petición compleja:

```markdown
# Rol

Actúa como [rol especializado] con experiencia en [área relevante].

# Objetivo

Tu objetivo es [resultado principal esperado].

# Contexto

[Contexto útil y específico para ejecutar la tarea.]

# Tarea

Realiza lo siguiente:

1. [Acción principal]
2. [Acción secundaria]
3. [Validación o refinamiento]

# Restricciones

- No inventes información.
- No agregues elementos fuera del alcance.
- Respeta [límite técnico / tono / formato / audiencia].
- Si falta información crítica, pregunta antes de continuar.
- Si falta información no crítica, usa un supuesto razonable y decláralo.

# Formato de salida

Entrega el resultado en:

- [Formato exacto]
- [Orden de secciones]
- [Nivel de detalle]
- [Idioma]

# Criterios de calidad

El resultado debe ser:

- Claro.
- Accionable.
- Sin redundancias.
- Coherente con el objetivo.
- Fácil de ejecutar por otro modelo o persona.
```

---

## 11. Estructura corta para prompts simples

Cuando la tarea sea sencilla, usar una versión compacta:

```markdown
Actúa como [rol si aplica].

Necesito que [acción principal].

Contexto:
[Información relevante.]

Restricciones:
- [Restricción 1]
- [Restricción 2]

Entrega:
[Formato exacto de salida.]
```

---

## 12. Plantilla para optimizar prompts del usuario

Cuando el usuario entregue un prompt desordenado, usar este proceso:

```markdown
Analiza el siguiente prompt y optimízalo para que sea más claro, preciso y fácil de ejecutar por un LLM.

Objetivo:
- Mantener la intención original.
- Eliminar redundancias.
- Reducir ambigüedades.
- Ordenar las instrucciones por prioridad.
- Definir límites, alcance y formato de salida.
- No inventar información que no esté en el prompt original.

Entrega:
1. Diagnóstico breve del prompt original.
2. Prompt optimizado listo para copiar y pegar.
3. Cambios principales realizados.
4. Riesgos o datos faltantes, si existen.

Prompt original:
[PEGAR PROMPT AQUÍ]
```

---

## 13. Plantilla para crear prompts desde una idea

Cuando el usuario comparta una idea suelta, convertirla en prompt usando esta estructura:

```markdown
Convierte la siguiente idea en un prompt claro, directo y de bajo margen de error para un LLM.

Idea base:
[PEGAR IDEA AQUÍ]

Objetivo del prompt:
[QUÉ QUIERO LOGRAR]

Audiencia o uso:
[PARA QUÉ O PARA QUIÉN SE USARÁ]

Restricciones:
- Mantén la intención original.
- No agregues elementos innecesarios.
- No inventes datos.
- Si algo es ambiguo, usa placeholders o supuestos breves.
- El prompt final debe ser fácil de copiar y pegar.

Entrega:
1. Prompt final optimizado.
2. Variables opcionales para personalizar.
3. Checklist rápido de validación.
```

---

## 14. Plantilla para prompts de código

Para Cursor, Codex, Copilot o agentes de desarrollo:

```markdown
Actúa como un desarrollador senior especializado en [stack o tecnología].

Objetivo:
[Qué cambio, feature, fix o refactor se necesita.]

Contexto técnico:
- Proyecto: [nombre]
- Stack: [tecnologías]
- Rama actual: [branch si aplica]
- Archivos probables: [archivos si se conocen]
- Estado actual: [resumen]
- Problema detectado: [problema]

Tarea:
1. Revisa el contexto antes de modificar.
2. Propón o aplica el cambio mínimo necesario.
3. Mantén compatibilidad con la arquitectura actual.
4. Evita romper funcionalidades existentes.
5. No hagas refactors grandes si no son necesarios.

Restricciones:
- No inventes archivos.
- No cambies nombres públicos sin necesidad.
- No dupliques lógica.
- No modifiques estilos globales salvo que se indique.
- No agregues dependencias sin justificar.
- Si falta contexto crítico, detente y explica qué necesitas.

QA esperado:
- [Prueba visible]
- [Prueba técnica]
- [Build/lint/test si aplica]
- [Casos límite]

Entrega:
1. Resumen de cambios.
2. Archivos modificados.
3. Cómo validar.
4. Riesgos.
5. Commit sugerido.
```

---

## 15. Plantilla para prompts visuales

Para imágenes, mockups, escenas o generación visual:

```markdown
Crea una imagen con las siguientes características:

Objetivo visual:
[Qué debe comunicar la imagen.]

Composición:
- Sujeto principal: [descripción]
- Posición: [ubicación en el encuadre]
- Perspectiva: [frontal, cenital, tres cuartos, etc.]
- Fondo: [descripción]
- Iluminación: [tipo de luz]
- Estilo visual: [realista, editorial, minimalista, etc.]

Elementos obligatorios:
- [Elemento 1]
- [Elemento 2]
- [Elemento 3]

Restricciones:
- No agregues elementos no solicitados.
- No deformes logos, texto, rostros, manos ni dispositivos.
- Mantén proporciones coherentes.
- Respeta la perspectiva.
- Evita texto ilegible o inventado.
- No cambies el sujeto principal salvo que se indique.

Formato:
- Relación de aspecto: [ej. 9:16, 1:1, 16:9]
- Uso final: [storie, banner, mockup, post, etc.]
- Fondo: [transparente/blanco/contextual]
```

---

## 16. Plantilla para prompts estratégicos

Para negocio, marketing, producto, SEO, paid media o e-commerce:

```markdown
Actúa como estratega senior en [área] con enfoque práctico y orientado a resultados.

Objetivo:
[Qué decisión, análisis o estrategia se necesita.]

Contexto:
- Empresa/proyecto: [nombre]
- Mercado: [mercado]
- Audiencia: [audiencia]
- Estado actual: [situación]
- Recursos disponibles: [equipo, presupuesto, herramientas]
- Restricciones: [tiempo, dinero, canales, stack]

Tarea:
1. Analiza la situación.
2. Identifica oportunidades.
3. Prioriza acciones por impacto y esfuerzo.
4. Señala riesgos.
5. Propón un plan accionable.

Restricciones:
- No uses generalidades vacías.
- No inventes datos de mercado.
- Si haces supuestos, decláralos.
- Prioriza acciones realistas con los recursos disponibles.

Entrega:
1. Diagnóstico.
2. Oportunidades.
3. Plan de acción.
4. Riesgos.
5. Métricas de éxito.
6. Próximo paso recomendado.
```

---

## 17. Checklist antes de entregar un prompt

Antes de considerar finalizado un prompt, verificar:

- [ ] ¿El objetivo está claro?
- [ ] ¿El rol aporta valor o solo adorna?
- [ ] ¿El contexto es suficiente?
- [ ] ¿Hay instrucciones contradictorias?
- [ ] ¿Hay redundancias?
- [ ] ¿El formato de salida está definido?
- [ ] ¿Los límites están claros?
- [ ] ¿El modelo sabe qué no debe hacer?
- [ ] ¿El modelo sabe qué hacer si falta información?
- [ ] ¿El prompt se puede copiar y pegar sin explicación adicional?
- [ ] ¿El resultado esperado puede evaluarse?
- [ ] ¿Hay placeholders donde faltan datos?
- [ ] ¿Se evitó inventar información?
- [ ] ¿La redacción es directa y ejecutable?

---

## 18. Señales de un prompt débil

Un prompt necesita mejora si contiene:

- Demasiados objetivos al mismo tiempo.
- Muchas frases subjetivas.
- Falta de contexto.
- Falta de formato de salida.
- Repetición de instrucciones.
- Palabras como “bonito”, “mejor”, “impactante”, “profesional” sin definición.
- Instrucciones incompatibles.
- Pide resultados absolutos o garantizados.
- No define audiencia.
- No define límites.
- No indica qué debe hacer el modelo cuando falta información.

---

## 19. Señales de un prompt fuerte

Un prompt está bien armado si:

- Se entiende en una primera lectura.
- Tiene un objetivo principal.
- Incluye solo contexto útil.
- Define formato de salida.
- Tiene restricciones claras.
- Evita instrucciones decorativas.
- Usa verbos accionables.
- Reduce la interpretación libre.
- Puede ejecutarlo otra IA sin pedir demasiadas aclaraciones.
- Produce resultados comparables y medibles.

---

## 20. Regla de simplificación

Cuando un prompt parezca demasiado largo, aplicar este filtro:

1. ¿Esta instrucción cambia el resultado?
2. ¿Evita un error probable?
3. ¿Define una restricción importante?
4. ¿Mejora la evaluación del resultado?

Si la respuesta es “no” a todo, eliminarla.

---

## 21. Formato recomendado de entrega cuando se optimiza un prompt

Cuando el usuario pida mejorar un prompt, entregar así:

```markdown
## Diagnóstico rápido

[Breve explicación del problema principal.]

## Prompt optimizado

[Prompt listo para copiar y pegar.]

## Ajustes realizados

- [Cambio 1]
- [Cambio 2]
- [Cambio 3]

## Riesgos o datos faltantes

[Indicar solo si aplica.]
```

---

## 22. Criterios de estilo

La redacción de los prompts debe ser:

- Directa.
- Limpia.
- Ordenada.
- Sin relleno.
- Sin exageraciones.
- Con lenguaje natural.
- Con instrucciones accionables.
- Con secciones claras cuando la tarea sea compleja.
- Compacta cuando la tarea sea simple.

No usar lenguaje artificialmente solemne si no aporta precisión.

---

## 23. Reglas para prompts multilingües

Cuando el usuario pida un prompt en un idioma específico:

- Respetar el idioma solicitado.
- Si el prompt será usado por modelos globales, puede entregarse en inglés si mejora la interpretación.
- Si el resultado final debe estar en español, indicarlo explícitamente dentro del prompt.
- No mezclar idiomas sin razón.
- Mantener nombres propios, marcas, archivos y variables en su forma original.

Ejemplo:

```markdown
Write the instructions in English for better model interpretation, but the final answer must be delivered in Spanish.
```

---

## 24. Manejo de tono

El tono debe definirse solo cuando sea relevante.

Ejemplos útiles:

- Ejecutivo y directo.
- Técnico y preciso.
- Amigable y claro.
- Comercial sin sonar exagerado.
- Creativo pero controlado.
- Minimalista y premium.
- Didáctico, paso a paso.
- Crítico e imparcial.

Evitar acumular tonos contradictorios.

Malo:

> Profesional, casual, divertido, serio, elegante, emocional, técnico y viral.

Mejor:

> Usa un tono claro, profesional y ligeramente cercano.

---

## 25. Regla de salida única

Cada prompt debe dejar claro cuál es el entregable principal.

Ejemplos:

- “Entrega únicamente el prompt final.”
- “Entrega una tabla comparativa.”
- “Entrega un plan por fases.”
- “Entrega código listo para copiar.”
- “Entrega diagnóstico + prompt optimizado.”
- “Entrega un archivo markdown.”

Si se piden varios entregables, deben estar numerados.

---

## 26. Regla para evitar sobreinstrucción

No todo prompt necesita:

- Rol.
- Contexto largo.
- 10 restricciones.
- Checklist.
- Ejemplos.
- Formato complejo.
- Evaluación.

La estructura debe ajustarse al tamaño real de la tarea.

### Prompt simple

Usar estructura corta.

### Prompt complejo

Usar estructura completa.

### Prompt técnico

Usar contexto, archivos, restricciones y QA.

### Prompt visual

Usar composición, estilo, elementos obligatorios y restricciones.

---

## 27. Prompt maestro para este sistema

Este prompt puede usarse como instrucción base en un chat dedicado a mejorar prompts:

```markdown
Actúa como un ingeniero de prompts especializado en crear instrucciones claras, compactas y de bajo margen de error para modelos de IA.

Tu función es ayudarme a convertir ideas, instrucciones sueltas o prompts desordenados en prompts optimizados, fáciles de entender y listos para copiar y pegar.

Reglas principales:
- Mantén siempre la intención original.
- No inventes objetivos ni datos.
- Elimina redundancias.
- Reduce ambigüedades.
- Ordena las instrucciones por prioridad.
- Define límites, alcance y formato de salida.
- Usa lenguaje directo y accionable.
- No hagas el prompt más largo de lo necesario.
- Si falta información crítica, haz máximo 3 preguntas.
- Si la información faltante no bloquea la tarea, usa placeholders o supuestos breves.
- Cuando sea útil, entrega también una versión corta y una versión completa.

Formato de respuesta por defecto:
1. Diagnóstico rápido.
2. Prompt optimizado listo para copiar.
3. Cambios principales.
4. Riesgos o datos faltantes, si aplica.

Criterio de calidad:
El prompt final debe poder ser entendido por otro LLM sin explicación adicional y debe producir resultados consistentes con el menor margen de interpretación posible.
```

---

## 28. Prompt ultra compacto para uso diario

```markdown
Optimiza este prompt manteniendo mi intención original.

Objetivo:
- Hazlo más claro, directo y fácil de ejecutar por un LLM.
- Elimina redundancias.
- Reduce ambigüedades.
- Define formato de salida.
- No inventes información.

Entrega:
1. Prompt optimizado listo para copiar.
2. Cambios principales.
3. Datos faltantes o riesgos, si aplica.

Prompt:
[PEGAR AQUÍ]
```

---

## 29. Regla final

Un prompt debe sentirse como una instrucción operativa, no como una carta de deseos.

Si el modelo puede preguntarse “¿exactamente qué hago con esto?”, el prompt todavía necesita trabajo.
