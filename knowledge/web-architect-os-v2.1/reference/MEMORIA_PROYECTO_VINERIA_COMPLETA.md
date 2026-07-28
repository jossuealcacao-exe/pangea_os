# Memoria de proyecto — Vineria

Guía de desarrollo web, buenas prácticas de UX, formato, arreglos y bugs resueltos.
El objetivo de este documento es que cualquier persona (o un ingeniero de prompts) pueda **replicar estos estándares en nuevas páginas web con un margen de error bajo**. Está escrito como lista de reglas accionables, no como narrativa.

Fecha de cierre: 20 de julio de 2026.

---

## 1. Qué es Vineria y con qué está hecho

Sitio editorial e interactivo de una página para descubrir 24 variedades de uva (origen, perfil, estilos, maridajes). Español de México, tono "sin poses".

**Stack**
- React 19 + TypeScript **estricto** (`strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`).
- Vite 8 (dev + build estático). Se despliega como sitio estático, sin backend.
- CSS propio con variables (tokens), mobile-first, neumorfismo.
- Fuentes autohospedadas con Fontsource (Fraunces Variable display, Manrope Variable texto), OFL-1.1.
- Vitest + Testing Library + ESLint.

**Principios rectores (no negociables)**
1. **Self-contained en runtime:** nada externo en tiempo de ejecución (sin CDNs, tiles de mapa, fuentes remotas, fetch). Todo se hospeda local en `public/`.
2. **Dirigido por datos tipados:** una sola fuente de verdad (`src/data/grapes.ts`). La UI, la documentación y la página de fuentes se derivan de ahí; no hay copias divergentes.
3. **Mobile-first:** los estilos base son de móvil; el escritorio se agrega con `@media (min-width: …)`.
4. **Accesibilidad y `prefers-reduced-motion` desde el inicio**, no como parche final.

---

## 2. Arquitectura

```
src/
├── components/   UI (Header, Filters, GrapeCard, GrapeDialog, Meter, Icon, Flag)
├── data/         grapes.ts (verdad tipada) + grape-images.ts (mapa id→imagen, autogenerado)
├── styles/       tokens.css (variables) + global.css (todo el CSS)
└── App.tsx       composición de secciones + observadores de scroll
public/           imágenes locales, world-map.svg, source-log.html (generado), fuentes SEO
scripts/          generate-research.ts (genera docs + página de fuentes desde los datos)
```

- El catálogo se define como `catalog` y se exporta ya "enriquecido": `export const grapes = catalog.map(g => ({ ...g, image: grapeImages[g.id] ?? g.image }))`. Así los datos quedan puros y las imágenes se inyectan por `id`.
- **Regla:** cuando un dato se muestra en varios lugares (tarjeta, ficha, página de fuentes), vive una sola vez en `data/` y se consume; nunca se duplica en el JSX.

---

## 3. Sistema visual neumórfico (calibración que funcionó)

El neumorfismo se rompe fácil (se ve "plástico" o con brillos). Reglas que dieron un relieve 3D **mate y creíble**:

1. **Mismo color que el fondo.** El elemento comparte el color del lienzo; el relieve nace solo de dos sombras.
2. **Dos sombras, una fuente de luz (arriba-izquierda):** sombra oscura abajo-derecha (offsets positivos) + realce claro arriba-izquierda (offsets negativos).
3. **Menos brillo:** el realce NO es blanco puro. Usa un crema cálido con opacidad baja (~0.46–0.5). El blanco puro a 0.8–0.9 produce "shine" plástico.
4. **Sombra un poco más profunda que el realce** → lectura física, más realista.
5. **Tono cálido coherente:** sombra en marrón cálido (no gris), realce en crema (no blanco).
6. **Estados:** levantado = sombra dual exterior; presionado/seleccionado/hueco = sombra interior (`inset`). Un toggle seleccionado se ve "hundido".

Tokens finales (en `tokens.css`), reutilízalos tal cual como punto de partida sobre lienzos claros y cálidos:

```css
--shadow-raised: 10px 10px 24px rgb(96 66 45 / .22), -8px -8px 18px rgb(255 250 242 / .5);
--shadow-small:  5px 5px 13px rgb(96 66 45 / .2),  -4px -4px 11px rgb(255 250 242 / .46);
--shadow-inset:  inset 4px 4px 10px rgb(96 66 45 / .22), inset -4px -4px 9px rgb(255 250 242 / .46);
```

- **Regla:** todo el neumorfismo pasa por estos tokens. Evita sombras "ad-hoc" con blanco puro; si necesitas una, cálida y con opacidad baja.
- El neumorfismo aplica sobre superficies **claras**. Sobre superficies oscuras (una tarjeta vino), no uses estos tokens: ahí el relieve se logra con un anillo claro sutil + sombra oscura suave.

Otros tokens del sistema: paleta (vino/crema/corcho), radios (`--radius-sm..xl`), duraciones (`--duration-fast/duration`) y una curva `--ease: cubic-bezier(.2,.8,.2,1)`. Reutilizar tokens = coherencia y menos error.

---

## 4. Catálogo de buenas prácticas de UX aplicadas

Cada una: **qué / por qué / cómo**.

1. **Tarjeta 100% clicable con un solo control enfocable.**
   Por qué: el usuario espera hacer clic en toda la tarjeta, pero anidar varios interactivos daña la accesibilidad.
   Cómo: un único `<button>` real; el resto de la tarjeta se hace clicable con un pseudo-overlay `::after { position:absolute; inset:0 }` sobre el botón, y el foco se dibuja en toda la tarjeta con `:has(.boton:focus-visible)`.

2. **Altura uniforme y CTA alineado en filas.**
   Por qué: títulos de 1 vs 2 líneas descuadran los botones.
   Cómo: grid con `align-items: stretch` + tarjeta en `flex-direction: column; height:100%`; reservar el título a 2 líneas (`min-height` en `em`); empujar el CTA al fondo con `margin-top:auto`.

3. **Aparición y animación al hacer scroll (reveal on scroll).**
   Por qué: da vida sin recargar; en móvil el contenido debe "entrar" al llegar.
   Cómo: `IntersectionObserver`. Para contenido **estático** basta un observador único en `App`. Para contenido **dinámico** (tarjetas que cambian al filtrar), cada componente observa su propia visibilidad y togglea una clase `is-visible`. Siempre con fallback: si no hay `IntersectionObserver` o hay `prefers-reduced-motion`, marca todo visible de inmediato.

4. **Animación "de relleno" de medidores por nivel.**
   Cómo: los puntos llenos aparecen escalonados (delay por `:nth-child`) con un keyframe de escala/opacidad; se disparan al entrar la tarjeta en viewport, y en el diálogo con `key={id}` para reproducir en cada navegación.

5. **Portada colapsable (sticky) en móvil.**
   Cómo: en móvil, el contenedor scrollea y la imagen es `position: sticky; top:0` con altura que se **comprime** al pasar un umbral de scroll (clase togglada por JS). En escritorio se revierte a columnas.

6. **Scroll independiente por región.**
   Cómo: en un diálogo de dos columnas, la columna de contenido necesita **altura acotada propia** (`max-height` + `min-height:0` + `overflow-y:auto`) para poder desbordar/scrollear; un grid item sin altura acotada NO scrollea (ver bug §7).

7. **Scrollbars integrados (neumórficos).**
   Cómo: `scrollbar-width: thin; scrollbar-color: …` (Firefox) + `::-webkit-scrollbar-thumb` con un `border` del color del fondo para que el "pulgar" flote e integre.

8. **Mapa real, no ilustración abstracta.**
   Cómo: SVG de mundo en **proyección equirectangular (Plate Carrée)** con `viewBox 0 0 360 180`, de modo que las coordenadas se proyecten linealmente: `x = lon + 180`, `y = 90 - lat`. Marcadores y rutas se posicionan por lon/lat reales. Se generó el SVG desde datos de Natural Earth (dominio público) para mantenerlo local y ligero.

9. **Jerarquía clara en formularios/filtros.**
   Cómo: el buscador es protagonista (grande, "hundido"); los filtros son botones/pills neumórficos alineados en una fila que envuelve. Evitar rejillas apretadas donde los elementos se encimen.

10. **Copys humanos (ver §6).** El texto es UX.

11. **Imágenes con licencia y atribución.** Fotos reales de Wikimedia Commons (CC / dominio público), hospedadas local, con crédito por archivo en un manifest y visible en la ficha. Ver §7 (rate limiting y validación visual).

---

## 5. Formato y páginas secundarias

- La **página de fuentes** (`public/source-log.html`) se **genera desde los mismos datos** (`scripts/generate-research.ts`). Es HTML autocontenido, estilado con la paleta del sitio y tipografías de respaldo (Georgia/Arial), agrupado por uva. 
- **Regla:** una página de "documentación/registro" no se sirve como `.md` crudo (el navegador la muestra en texto plano). Genera HTML con formato, o renderízala dentro de la app.
- **Regla:** si un contenido se deriva de datos, genéralo con un script versionado; no lo escribas a mano (evita divergencias).

---

## 6. Voz de copy — alejarse del "estilo AI"

Objetivo: que lo escriba "un sommelier con lenguaje humano". **Reinterpretar** (misma información, mejor forma), no cambiar los hechos.

**Evitar (señales de texto AI):**
- Aperturas "Descubre / Explora / Sumérgete".
- Estructuras "no solo X, sino también Y" y simetrías excesivas.
- Relleno y matices huecos ("en el vasto mundo del vino").
- Entusiasmo genérico y listas perfectamente paralelas.
- Abuso de guiones largos.

**Preferir:**
- Tú directo, frases de ritmo variable, imágenes concretas y sensoriales.
- Una pizca de opinión y humor sobrio.
- Especificidad ("a las alturas de Mendoza" mejor que "a regiones de altura").

**Ejemplos del proyecto:**
- Antes: "Descubre qué hay detrás de cada copa…" → Después: "Qué hay detrás de cada copa: a qué sabe, de dónde viene y con qué llevarla a la mesa."
- Antes: "Descriptor para sensaciones que recuerdan piedra… no significa 'beber suelo'." → Después: "Notas que recuerdan a piedra, tiza o sal. Tranquilo: no estás bebiendo suelo."

**Regla operativa:** al cambiar copy visible, revisa si algún test asserta ese texto y actualízalo (ver §7).

---

## 7. Bugs y arreglos (catálogo de errores → causa raíz → regla)

Esta es la sección de mayor valor para reducir el margen de error. Cada entrada es reutilizable.

1. **CSS `background: url()` roto en producción, no en dev.**
   - Síntoma: el mapa (SVG) no aparecía tras `build`.
   - Causa: `url(./x.svg)` en CSS resuelve **relativo al archivo CSS empaquetado** (`dist/assets/`), no a la raíz del sitio.
   - Solución/Regla: para assets de `public/`, referéncialos con `<img src="./x.svg">` (resuelve como el documento, y funciona con `base: './'`), o impórtalos por el bundler. No uses `url()` a `public/` con rutas relativas.

2. **`noUncheckedIndexedAccess` (TS estricto) rompe accesos por índice.**
   - Síntoma: `Object is possibly 'undefined'` en `arr[0]`, `list[i]`.
   - Regla: con esta bandera, todo acceso por índice puede ser `undefined`. Usa guardas: `const x = arr[i]; if (x) …` o `(arr[0] ?? fallback)`.

3. **`React.KeyboardEvent` no definido (nuevo JSX transform).**
   - Síntoma: "React is not defined" al tipar eventos.
   - Regla: no uses el espacio de nombres `React.*` si no importas React. Importa el tipo: `import { type KeyboardEvent } from 'react'`.

4. **Tests rompen en jsdom por APIs de navegador ausentes.**
   - Síntoma: `matchMedia`/`IntersectionObserver` undefined en Vitest/jsdom.
   - Regla: feature-detecta siempre (`typeof IntersectionObserver === 'undefined'`, `typeof window.matchMedia === 'function'`) y degrada (marca visible / sin animación). Esto también hace el código más robusto en producción.

5. **"Temblor" de la portada colapsable al hacer scroll.**
   - Síntoma: el header sticky que cambia de altura oscilaba/temblaba al bajar.
   - Causa: el **scroll anchoring** del navegador reajusta `scrollTop` cuando cambia la altura de un elemento superior, y vuelve a cruzar el umbral → bucle.
   - Solución/Regla: en el contenedor de scroll, `overflow-anchor: none` + **histéresis** (umbral distinto para comprimir vs expandir; p. ej. comprimir >80px, expandir <24px). Suaviza con `transition`. (Safari no tiene scroll anchoring; el bug era de Chrome/Edge/Android.)

6. **Columna de diálogo no scrollea en escritorio.**
   - Síntoma: contenido largo recortado, sin scroll, en layout de 2 columnas (grid).
   - Causa: un grid item con `overflow:auto` **no scrollea si su altura no está acotada** (la fila crece con el contenido).
   - Solución/Regla: da a la región scrollable su propia `max-height` + `min-height: 0` + `overflow-y: auto`. No dependas de que el contenedor grid la acote.

7. **Neumorfismo con "shine" plástico.**
   - Causa: realces (highlight) demasiado brillantes/opacos (blanco a 0.8–0.9).
   - Solución/Regla: baja el realce a crema cálido ~0.46–0.5 y sube ligeramente la sombra. Ver §3.

8. **Rate limiting (HTTP 429) al descargar imágenes de Wikimedia.**
   - Regla: al bajar muchos assets externos (en build/tooling, nunca en runtime), usa **User-Agent identificable**, **throttle** (espacia peticiones) y **reintentos con backoff exponencial** ante 429.

9. **Imágenes de terceros: contenido equivocado o ilustración en vez de foto.**
   - Síntoma: resultados que eran láminas botánicas, paisajes, botellas o etiquetas en vez del sujeto.
   - Regla: **verifica visualmente** cada imagen (no confíes en el nombre de archivo). Confirma licencia y guarda atribución (autor + licencia + URL) por archivo.

10. **Faltante honesto (sin fuente libre).**
    - Caso: no existía foto libre de una variedad; se marcó como "aportada por el usuario, licencia por validar" y se documentó, en lugar de fingir una atribución.
    - Regla: cuando no hay activo con licencia clara, dilo y marca "validar antes de publicar"; no inventes procedencia.

11. **Node `--experimental-strip-types` exige extensiones explícitas.**
    - Síntoma: `ERR_MODULE_NOT_FOUND` al correr un script TS que importa otro módulo sin extensión.
    - Solución/Regla: en imports que Node ejecuta directamente, usa la extensión `.ts` y habilita `allowImportingTsExtensions` en el `tsconfig` que cubre esos archivos. (Vite/esbuild lo toleran.)

12. **Emojis de bandera no renderizan en Windows.**
    - Regla: no uses emojis de bandera para UI seria; en Windows se ven como dos letras. Usa **SVG inline** (banderas simplificadas con colores/disposición nacionales) autohospedados.

13. **`100svh` en el héroe atrapa las capturas headless.**
    - Síntoma: al capturar con ventana muy alta, el héroe (`min-height:100svh`) llenaba todo.
    - Regla para QA: usa una altura de viewport realista y captura "full page" con herramienta (no ventana gigante).

14. **Alineación por escalonados decorativos.**
    - Caso: `transform: translateY()` en cada 3.ª tarjeta rompía la alineación.
    - Regla: si piden "misma altura/alineado", elimina offsets decorativos y confía en `grid` + `stretch`.

---

## 8. Accesibilidad y rendimiento (checklist)

- HTML semántico, jerarquía de encabezados, enlace "saltar al contenido".
- `<dialog>` nativo (cierre por Escape, retorno de foco, `::backdrop`).
- `aria-pressed` en toggles, `aria-label` en controles de icono, `role="status"` + `aria-live` en resultados.
- Foco visible sólido e independiente de sombras.
- Objetivos táctiles ≥ 44×44 px.
- `prefers-reduced-motion`: toda animación/scroll suave se desactiva o simplifica.
- Imágenes con `alt`, `width`/`height` y `loading="lazy"` bajo el pliegue; hero con `fetchPriority="high"`.
- SVG decorativos con `aria-hidden`.
- Contraste: textos por encima del relieve decorativo (validar tonos "muted" pequeños).

---

## 9. Flujo de verificación (cómo comprobamos, con evidencia objetiva)

- **Puerta de calidad estándar (correr siempre antes de entregar):**
  `npm run typecheck` · `npm run lint` · `npm run test` · `npm run build`.
- **Verificación visual sin depender de "se ve bien":** Chrome headless + `puppeteer-core` (instalado con `--no-save`, usa el Chrome ya instalado; no descarga navegador). Capturas de secciones y del diálogo en desktop y móvil emulado.
- **Verificación objetiva de comportamiento** (mejor que una captura para dinámicas):
  - Scroll estable: fijar `scrollTop` cerca del umbral y **muestrear** el valor en el tiempo para confirmar que no oscila.
  - Scrolleabilidad: comparar `scrollHeight > clientHeight` y confirmar que fijar `scrollTop` "pega".
  - Reveal: leer `is-visible`/opacidad antes y después de desplazar el elemento al viewport.
- **Comprobar el build real:** que los assets esperados existan en `dist/` y respondan 200 al servir `vite preview`.
- **Higiene:** no dejar scripts temporales en la raíz del repo (romperían `lint`); el scratchpad va fuera del proyecto.

---

## 10. Checklist previo a entregar

1. `typecheck` / `lint` / `test` / `build` en verde.
2. Assets nuevos presentes en `dist/` y referenciados correctamente (ojo con `url()` de CSS, §7.1).
3. Si cambió copy visible, tests de texto actualizados.
4. Accesibilidad §8 revisada; `prefers-reduced-motion` respetado.
5. Nada externo en runtime; todo en `public/`.
6. Atribución de imágenes al día; marcar "validar antes de publicar" lo que no tenga licencia clara.
7. Sin archivos temporales/artefactos de QA en el repo.
8. URLs de ejemplo (canonical, sitemap, robots) sustituidas antes de producción.

---

## 11. Guía para el ingeniero de prompts

Para crear páginas nuevas con bajo margen de error, incluye estas **reglas de oro** en el prompt de sistema/instrucciones del agente:

> **Reglas de construcción web (Vineria-style):**
> 1. Stack: React 19 + TS estricto + Vite. Mobile-first. Sin dependencias externas en runtime; todo en `public/`.
> 2. Dirige la UI por datos tipados en un solo archivo; no dupliques contenido en el JSX.
> 3. Usa un sistema de tokens de sombra neumórficos (mismo color que el fondo, doble sombra, realce **crema cálido tenue** ~0.46–0.5, nunca blanco puro; sombra un poco más profunda que el realce). Seleccionado/hueco = `inset`.
> 4. Tarjetas: un solo control enfocable + overlay clicable; altura uniforme con grid `stretch` + `margin-top:auto` en el CTA.
> 5. Animaciones al hacer scroll con `IntersectionObserver`; por-componente si el contenido es dinámico; siempre con fallback y respetando `prefers-reduced-motion`.
> 6. Regiones scrollables: `max-height` + `min-height:0` + `overflow-y:auto`. Headers colapsables: `overflow-anchor:none` + histéresis.
> 7. Assets de `public/` referenciados con `<img>` (no `url()` de CSS relativo). Base del build `./`.
> 8. Accesibilidad: `<dialog>` nativo, `aria-*`, foco visible, ≥44px táctil, `alt`, `loading="lazy"`.
> 9. Copy humano (voz de experto sin poses): sin "Descubre/Explora", sin "no solo… sino…", concreto y con ritmo. Reinterpretar, no cambiar los hechos.
> 10. Imágenes con licencia verificada y atribución; lo dudoso se marca "validar antes de publicar".
> 11. Antes de entregar: `typecheck`, `lint`, `test`, `build` en verde + verificación visual/objetiva headless + assets presentes en `dist/`.

**Cómo pedir cambios sin ambigüedad (plantilla):**
> "En [sección/componente], quiero [objetivo de UX]. Respeta el sistema neumórfico (tokens de sombra, sin brillo). Mantén accesibilidad y `prefers-reduced-motion`. No cambies el significado del texto; reinterprétalo con voz humana. Al terminar, corre typecheck/lint/test/build y verifícalo con captura headless."

**Errores a vigilar explícitamente** (los del §7): `url()` de CSS en prod, índices con TS estricto, APIs de navegador en tests, temblor por scroll anchoring, grid items sin altura acotada, "shine" del neumorfismo, banderas emoji en Windows.

---

## 12. Limitaciones conocidas del proyecto

- Contenido de las 24 fichas (historia/tip/dato) aún en su redacción original densa; el chrome del sitio ya está en voz humana. Reinterpretarlas manteniendo hechos y el rango de 70–120 palabras es el siguiente paso natural.
- Una variedad (Verdejo) usa imagen aportada por el usuario con licencia sin verificar (marcada para validar).
- Canonical/sitemap/robots con URL de ejemplo hasta conocer el dominio final.
- Lighthouse no se corrió en el entorno (sin Chromium en CI); la verificación visual se hizo con el Chrome instalado localmente.
