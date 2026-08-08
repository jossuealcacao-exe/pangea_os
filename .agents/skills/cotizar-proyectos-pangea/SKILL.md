---
name: cotizar-proyectos-pangea
description: Analizar briefs y preparar precotizaciones o cotizaciones editables para sitios web, ecommerce, Shopify, UX/CRO, analitica, automatizaciones y sistemas a medida usando los alcances de Pangea OS. Usar cuando el usuario pida cotizar, presupuestar, estimar un proyecto, convertir un brief en alcance comercial, comparar escenarios de inversion o generar una propuesta lista para enviar.
---

# Cotizar proyectos con Pangea

Convertir un brief en un alcance verificable, una recomendacion de inversion controlada por el propietario y una propuesta entendible para el cliente. Mantener separadas la clasificacion tecnica, la referencia de mercado y la decision final de precio.

## Flujo

1. Leer el brief adjunto o pegado. Extraer texto de PDF, DOCX, imagen o enlace con las herramientas disponibles; no inventar contenido ilegible.
2. Leer `references/alcances-pangea.md`, `references/catalogo-precios.json` y `references/politica-comercial.md`.
3. Consultar `references/mercado-mexico-guadalajara.md` solo si se pide calibracion de mercado, comparacion competitiva o una revision anual del catalogo.
4. Normalizar el brief con `references/brief-normalizado.schema.json`. Identificar objetivo, usuario, entregables, integraciones, contenido, datos, responsables, plazo, restricciones y costos de terceros.
5. Clasificar el proyecto con los marcos canonicos que correspondan:
   - `knowledge/web-architect-os-v2.1/core/02_INTAKE_AND_DISCOVERY.md`
   - `knowledge/web-architect-os-v2.1/core/03_PROJECT_CLASSIFIER.md`
   - `knowledge/web-architect-os-v2.1/core/04_ARCHITECTURE_SELECTOR.md`
   - `knowledge/web-architect-os-v2.1/engines/shopify/SHOPIFY_PROJECT_CLASSIFIER.md` para Shopify.
6. Distinguir lo confirmado, lo inferido y lo pendiente. Si faltan datos que cambian materialmente el precio, generar una **precotizacion** con rango y preguntas; no simular precision.
7. Elegir un `service_id`, nivel de complejidad y modulos del catalogo. No agregar modulos que el brief no necesita.
8. Guardar el brief normalizado como JSON temporal o de trabajo y ejecutar:

   `node .agents/skills/cotizar-proyectos-pangea/scripts/cotizar.mjs <brief.json> --format markdown`

9. Revisar el resultado. Explicar al propietario que puede cambiar el precio objetivo, el ajuste comercial, el riesgo o cualquier partida mediante `owner_controls` y volver a calcular.
10. Entregar dos capas:
    - **Resumen interno:** clasificacion, supuestos, dudas, desglose, rango, riesgos y recomendacion.
    - **Cotizacion para cliente:** problema, alcance, entregables, calendario, inversion, pagos, exclusiones y vigencia usando `assets/cotizacion-cliente.md`.

## Reglas de precio

- Tratar `references/catalogo-precios.json` como la unica fuente automatica de importes.
- Tratar todos sus importes iniciales como borrador hasta que Jossue los apruebe. Conservar `owner_review_required: true` mientras siga pendiente esa aprobacion.
- Usar el mercado solo como contexto. Nunca copiar el precio mas barato ni sustituir tarifas del propietario con una media externa.
- Mostrar importes en MXN y aclarar si incluyen IVA. Mantener licencias, hosting, dominio, pauta, comisiones y consumo de APIs como costos del cliente salvo indicacion expresa.
- No reducir precio silenciosamente para ajustarse al presupuesto. Proponer una fase, alcance o calendario alternativo.
- Marcar un precio objetivo por debajo del piso sugerido; aceptarlo solo como decision visible del propietario.
- No exponer al cliente notas internas, piso, margen, comparables ni advertencias comerciales.

## Control y autorizacion

- Usar `owner_controls.target_total_mxn` para fijar el total que Jossue quiera presentar.
- Usar `owner_controls.adjustment_percent` para un ajuste porcentual transparente.
- Usar `owner_controls.risk_percent` para reemplazar la reserva de riesgo por defecto.
- Mantener `owner_controls.authorized_for_client: false` hasta recibir aprobacion explicita del precio y alcance.
- Si no esta autorizado, encabezar el documento con `BORRADOR INTERNO - NO ENVIAR`.
- Preparar el mensaje o documento para enviar, pero no enviarlo a ninguna persona ni sistema sin autorizacion explicita.

## Calidad minima

Antes de terminar, comprobar que:

- cada partida corresponde a un entregable o riesgo identificable;
- el alcance incluido y excluido no se contradicen;
- los costos recurrentes estan separados;
- el calendario refleja dependencias del cliente;
- las condiciones de pago suman 100%;
- el precio calculado coincide con el documento para cliente;
- la propuesta distingue precotizacion de cotizacion cerrada;
- el lenguaje es humano, concreto y comercial, sin promesas de resultados garantizados.

Para briefs procesados por otra IA, usar `assets/prompt-portable.md` y exigir como salida el JSON normalizado; recalcular siempre dentro de Pangea con el script determinista.

Consultar `references/comandos.md` para invocaciones desde chat, terminal y otras IAs.
