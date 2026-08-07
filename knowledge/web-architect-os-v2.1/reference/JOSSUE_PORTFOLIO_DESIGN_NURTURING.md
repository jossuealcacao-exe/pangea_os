# Nurturing de diseño: portfolio editorial orientado a conversión

## Estado y procedencia

- **Estado:** patrón compartido aprobado por el propietario el 6 de agosto de 2026.
- **Proyecto fuente:** `jossue-portfolio`.
- **Fuentes verificables:** `jossue-portfolio/docs/DESIGN_SYSTEM.md`,
  `jossue-portfolio/docs/DECISIONS.md`, `jossue-portfolio/src/styles/redesign.css`,
  `jossue-portfolio/src/scripts/motion.ts`, `jossue-portfolio/src/components/PageView.astro`
  y `jossue-portfolio/src/components/Icon.astro`.
- **Propósito:** orientar portafolios, sitios de servicios y casos de estudio donde la confianza
  debe venir de contenido, evidencia y claridad comercial.

Este documento generaliza reglas de diseño. No autoriza reutilizar nombres, retratos, CV,
logos, capturas de clientes, testimonios, números, enlaces de contacto ni afirmaciones del
proyecto fuente.

## Tesis visual

> Una experiencia profesional se siente sólida cuando el contenido verificable lleva el ritmo;
> la interfaz lo organiza y el motion solo hace visible la jerarquía.

La dirección combina una base editorial sobria, geometría rectilínea y una capa comercial
directa. Es apropiada cuando hay suficiente trabajo real para mostrar y el objetivo es abrir
conversaciones de negocio, no impresionar con ornamento.

## Reglas no negociables

1. **Evidencia antes de estética.** Cada caso debe separar contexto, rol, decisiones,
   evidencia, resultado y límites. Una cifra no se publica sin definición, periodo, fuente,
   permiso y atribución.
2. **Contenido antes de cromatismo.** El contraste, la escala, el espacio y el orden deben
   comunicar jerarquía antes que el color. El color de marca se reserva para activos oficiales
   o acentos funcionales, nunca se inventa para llenar tarjetas.
3. **Geometría con intención.** Radios rectos o mínimos, líneas finas y superficies planas
   favorecen una lectura precisa. No añadir cápsulas, sombras elevadas o efectos de vidrio por
   defecto.
4. **La selección es tipográfica.** En navegación o filtros, el estado activo puede ser peso,
   subrayado o indicador textual; no debe depender únicamente de un fondo llamativo o color.
5. **La identidad de cada caso es explícita.** Una cubierta puede usar el logo autorizado y
   color propio de la marca cuando la procedencia sea clara. El nombre del cliente sigue visible
   como texto; el logo nunca sustituye la etiqueta.
6. **Mobile es composición, no reducción.** El orden de información, las áreas táctiles, la
   densidad y los medios se diseñan primero para 320–430 px y luego escalan sin alterar la
   semántica.

## Sistema base adaptable

### Tipografía y ritmo

- Usar un display estrecho o expresivo solo para títulos, y una sans legible para cuerpo e
  interfaz. Priorizar fuentes autoalojadas cuando el proyecto lo permita.
- Definir una escala fluida con `clamp()` que conserve reflujo y zoom; nunca deformar glifos
  con `scaleX`, `font-stretch` no soportado ni tracking excesivo.
- Mantener titulares compactos, cuerpo de 45–75 caracteres por línea y una cadencia vertical
  consistente entre etiqueta, título, resumen, acciones, evidencia y nota.
- Distinguir labels de metadatos con tamaño pequeño, mayúsculas y espaciado moderado, sin
  convertirlos en el foco dominante.

### Tokens y superficie

- Crear tokens semánticos para `ink`, `paper`, `surface`, `muted`, `line`, `accent`, `focus`,
  espacios, alturas, motion y capas. Los valores concretos pertenecen a cada marca.
- Mantener una superficie editorial clara u oscura, un contraste de lectura alto y bordes que
  delimiten grupos sin convertir todo en tarjetas.
- Reservar sombras suaves para profundidad funcional (header sticky, diálogo o capa elevada),
  no como decoración repetida.
- El foco tiene token propio de alto contraste y siempre es visible con teclado.

### Composición y navegación

- Usar una columna de lectura y una retícula de contenido más amplia; el ancho de lectura no
  debe igualar al ancho de los medios o las galerías.
- Construir páginas como secuencias: propuesta clara, prueba de capacidad, selección de casos,
  proceso, canales de contacto. Cada sección tiene un título que se sostiene fuera de contexto.
- Para recorridos largos, un índice de sección o marcador sticky puede orientar el avance. Debe
  ser informativo, no bloquear el scroll, duplicar controles ni ocultar contenido.
- Header sticky con estado de scroll discreto; el CTA se mantiene claro pero no compite con la
  navegación ni se repite de forma agresiva.

### Casos, medios y conversión

- Cada card de proyecto presenta una promesa breve, marca identificable, alcance y ruta clara
  al detalle. No esconder la información esencial exclusivamente en hover.
- Las galerías son evidencia contextual: usar `figure` y `figcaption`, dimensiones conocidas y
  un diálogo nativo accesible para ampliación cuando aporte valor.
- Los CTA describen la siguiente acción en lenguaje humano: hablar del proyecto, revisar un
  caso, descargar perfil. Evitar urgencia ficticia, superlativos sin fuente y formularios
  opacos.
- Canales de contacto centralizados en una fuente de datos. Un cambio de correo, teléfono o
  WhatsApp no debe exigir buscar cadenas dispersas en componentes.

## Motion: presencia, no espectáculo

- Revelar secciones al entrar al viewport con opacidad y desplazamiento pequeño; mantener
  duraciones breves y una sola curva de salida.
- Permitir stagger ligero únicamente donde ayude a leer grupos de cards, métricas o marcas.
- Usar transiciones de navegación y header para continuidad, sin scroll-jacking, carruseles
  automáticos ni animaciones que escondan información.
- Con `prefers-reduced-motion: reduce`, dejar el contenido visible, operable y sin dependencia
  temporal. El fallback también debe cubrir ausencia de JavaScript u `IntersectionObserver`.

## Iconografía y activos

- Los iconos aclaran affordances (menú, enlace externo, descarga, contacto); las etiquetas
  siguen siendo la fuente principal de significado.
- Reutilizar solamente iconos con licencia y una fuente identificable. Si no hay activo
  autorizado, preferir texto antes que inventar un monograma o logo.
- Tratar capturas, logos y fotografías como elementos con permiso independiente. Verificar
  visualmente el archivo y su contexto; que esté disponible técnicamente no concede derecho de
  publicación.

## Accesibilidad y contenido responsable

- Orden de foco igual al orden visual; objetivo táctil suficiente; `Escape` y foco gestionado
  en diálogos; errores y éxito de formularios no dependen solo del color.
- Los medios incluyen texto alternativo según función, y la información crítica cuenta con
  equivalente textual.
- Soportar zoom, reflujo, navegación por teclado, idiomas equivalentes y contraste funcional.
- Declarar límites de resultados y conservar evidencia interna separada de contenido público.

## Anti-patrones a evitar

- Hero saturado de iconos, badges, gradientes, claims y CTAs en competencia.
- Navegación activa convertida en botón elevado, píldora decorativa o color sin señal textual.
- Logos genéricos, iconos inventados o colores atribuidos a una marca sin fuente oficial.
- Cards que cambian la jerarquía, cortan texto o dependen de hover para ser entendidas.
- Motion continuo, scroll mandatory, reveal que oculta contenido y efectos de "premium" sin
  función: blur excesivo, sombras repetidas o glassmorphism indiscriminado.
- Resultados comerciales sin fuente, permisos, fecha o definición verificable.

## Contrato para futuros agentes

Antes de aplicar este patrón, documentar:

```yaml
design:
  thesis: "Una oración que una intención de negocio y experiencia de lectura."
  dominant_style: editorial-rectilinear
  evidence_model: contexto-rol-decisiones-evidencia-resultados-limites
  identity_inputs: activos oficiales, paleta aprobada, permisos
  contact_source: archivo o sistema único
  mobile_priority: [320, 390, 430]
  motion: progressive-enhancement-with-reduced-motion
  exclusions: [logos inventados, claims sin fuente, ornamentación sin función]
```

Adaptar tokens, tipografía, densidad y color a la marca receptora. Mantener la tesis y los
guardrails, pero no copiar la apariencia literal del portfolio fuente.

## QA para adopción

1. Verificar jerarquía y rutas de conversión en 320, 390, 768 y desktop amplio.
2. Probar foco, teclado, menú, diálogo, formularios y enlaces externos.
3. Confirmar `prefers-reduced-motion`, overflow horizontal, reflujo con zoom y consola limpia.
4. Validar que cada activo de marca y cada claim tenga fuente y permiso correspondientes.
5. Ejecutar typecheck, lint, pruebas, build y revisión visual sobre una build servida.
6. Registrar resultado, limitaciones y fuentes en AHP+ antes de promover el patrón a otro
   proyecto.

## Límites de transferencia

Este patrón no prescribe una paleta monocromática, una fuente, un tamaño de contenedor ni una
librería. Tampoco autoriza reaprovechar los contactos, analítica, infraestructura Cloudflare o
contenidos del proyecto fuente. Su valor transferible es el método: identidad explícita,
contenido trazable, interfaz silenciosa y validación antes de afirmar resultados.
