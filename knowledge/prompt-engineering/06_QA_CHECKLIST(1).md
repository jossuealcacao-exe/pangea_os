# QA para prompts

## 1. Validación rápida obligatoria

Antes de entregar, comprobar:

- [ ] Existe un objetivo principal identificable.
- [ ] El entregable está definido.
- [ ] La intención original se conserva.
- [ ] No hay instrucciones duplicadas.
- [ ] No hay contradicciones críticas.
- [ ] El rol aporta valor.
- [ ] El contexto incluido cambia o mejora la ejecución.
- [ ] El alcance tiene límites.
- [ ] El formato de salida puede verificarse.
- [ ] Los datos faltantes se manejan sin inventar.
- [ ] La plataforma está indicada o inferida razonablemente.
- [ ] El prompt puede copiarse y ejecutarse.

## 2. Puntuación PROMPT-10

Calificar cada dimensión de 0 a 2.

| Dimensión | 0 | 1 | 2 |
|---|---|---|---|
| Propósito | Confuso | Parcial | Claro |
| Resultado | Indefinido | Implícito | Explícito |
| Orden | Caótico | Mejorable | Jerárquico |
| Margen de error | Alto | Medio | Bajo |
| Plataforma | Incorrecta | Genérica | Adaptada |

Puntuación total:

- 0–3: rehacer.
- 4–6: corregir.
- 7–8: funcional.
- 9–10: sólido.

## 3. Prueba de interpretación

Preguntar internamente:

> ¿Dos modelos razonables podrían ejecutar tareas significativamente distintas con este mismo prompt?

Si la respuesta es sí, identificar qué instrucción admite interpretaciones y corregirla.

## 4. Prueba de necesidad

Para cada bloque:

1. ¿Cambia el resultado?
2. ¿Evita un error probable?
3. ¿Define un límite importante?
4. ¿Permite validar la salida?

Si responde “no” a todo, eliminarlo.

## 5. Prueba de autoridad

- [ ] El agente sabe qué puede hacer.
- [ ] El agente sabe qué requiere autorización.
- [ ] No se concedieron permisos implícitos.
- [ ] Las acciones destructivas están protegidas.
- [ ] El usuario conserva el control solicitado.

## 6. Prueba técnica

Para prompts de código:

- [ ] Se indica revisar antes de editar.
- [ ] Se protege la arquitectura.
- [ ] Se evita inventar archivos o APIs.
- [ ] Se define alcance.
- [ ] Se piden pruebas adecuadas.
- [ ] Se reportan fallos reales.
- [ ] Se exige resumen de archivos modificados.

## 7. Prueba visual

- [ ] Hay sujeto principal.
- [ ] La composición está definida.
- [ ] La perspectiva es coherente.
- [ ] La luz está descrita.
- [ ] El estilo usa atributos observables.
- [ ] Se especifica relación de aspecto.
- [ ] Se restringen deformaciones y elementos no solicitados.

## 8. Prueba estratégica

- [ ] Se define fuente de verdad.
- [ ] Se diferencian hechos y supuestos.
- [ ] Hay priorización.
- [ ] Hay riesgos.
- [ ] Hay métricas.
- [ ] Existe siguiente acción.

## 9. Fallos críticos

Un prompt no debe entregarse como final si:

- Mezcla objetivos incompatibles.
- Otorga autonomía peligrosa no solicitada.
- Pide garantizar resultados.
- Depende de herramientas no disponibles.
- Obliga a inventar datos.
- No permite identificar el entregable.
- Contiene instrucciones mutuamente excluyentes.
