# Vineria — Sistema de Diseño & Receta de Construcción

> **Qué es este documento.** Una plantilla de conocimiento para alimentar un SO de desarrollo web.
> Captura *cómo se piensa, tokeniza y construye* un sitio de calidad premium, usando **Vineria**
> (guía editorial de uvas y vino) como implementación de referencia. No es documentación de una
> sola página: son **principios + tokens + patrones reutilizables** que cualquier IA puede aplicar
> a otro proyecto cambiando la paleta y el contenido, conservando el nivel de UX.
>
> **Cómo usarlo el SO.** Trátalo como reglas duras (SHOULD/MUST). Antes de generar un sitio:
> 1) copia el bloque de tokens y remapea la paleta a la marca destino;
> 2) sigue los principios rectores y los patrones de componentes;
> 3) valida contra el *checklist de calidad* del final;
> 4) evita explícitamente los *anti-patrones* documentados (son errores ya cometidos y corregidos).

---

## 1. Filosofía: cómo fue concebido

Vineria nace de una tesis: **un tema intimidante (el vino) se vuelve accesible con una interfaz
cálida, editorial y sin solemnidad**. Las decisiones de diseño se subordinan a esa voz.

Principios de concepción — replicables a cualquier producto:

- **Editorial primero, no “dashboard”.** Tipografía display grande con carácter, jerarquía clara,
  aire generoso, secciones con narrativa (kicker → título → bajada → contenido).
- **Calidez táctil (neumorfismo cálido y discreto).** Superficies que parecen del mismo material,
  con relieve suave. Nunca sombras duras ni “flotantes”. El relieve *sugiere* tridimensionalidad;
  no grita.
- **Contenido como única fuente de verdad.** Los datos viven tipados en un solo lugar
  (`src/data/*.ts`); UI, filtros y documentación derivan de ahí. Cero copias divergentes.
- **Mobile-first real.** Se diseña la columna estrecha primero; el desktop *añade*, no rehace.
- **Accesibilidad no negociable.** El relieve es decorativo; el contraste de texto y los focos son
  funcionales e independientes de las sombras.
- **Sin dependencias de adorno.** Cero librerías de iconos, animación, estado global o UI kit. Íconos
  SVG propios, animación con IntersectionObserver + CSS. Menos peso, más control, más longevidad.
- **Tono de marca en el microcopy.** El texto es parte del diseño: cercano, claro, con humor medido.

---

## 2. Stack tecnológico de referencia

| Capa | Elección | Por qué |
|---|---|---|
| Framework UI | **React 19** + **TypeScript estricto** | Componentes tipados, datos seguros. |
| Build/dev | **Vite** (`base: './'`) | Arranque instantáneo, build estático portable (Vercel/Netlify/Pages). |
| Estilos | **CSS moderno propio** (custom properties, `clamp()`, media queries, `grid-template-rows: 0fr→1fr`) | Sin runtime CSS-in-JS; theming por tokens. |
| Tipografías | **Fontsource** autohospedado (variables) | Sin llamadas a terceros, control de rendimiento y privacidad. |
| Calidad | **Vitest + Testing Library + ESLint + `tsc`** | Datos y componentes validados. |

**Regla del SO:** por defecto, sitio estático sin backend salvo que el requisito lo exija. Preferir
plataforma nativa del navegador (dialog nativo, IntersectionObserver, CSS moderno) sobre librerías.

---

## 3. Principios rectores (reglas de calidad)

1. **Mobile-first.** Escribe el estilo base para 320–420px; usa `min-width` para escalar.
2. **Tokeniza todo.** Ningún color, sombra, radio o duración “mágico” en los componentes: siempre `var(--token)`.
3. **Una escala tipográfica fluida.** Títulos con `clamp(min, vw, max)`; cuerpo estable y legible (~1rem, `line-height` 1.7).
4. **Ritmo vertical con una escala de espaciado** (no valores arbitrarios).
5. **Relieve discreto y coherente.** Fuente de luz única (arriba-izquierda clara, abajo-derecha oscura), sombras duales **simétricas**.
6. **Estados siempre presentes.** `:hover`, `:active`, `:focus-visible`, seleccionado/`aria-pressed`, `disabled`. Nada “muerto”.
7. **Movimiento con propósito y con freno.** Animar solo entrada/estado; respetar `prefers-reduced-motion`.
8. **Toque ≥ 44px**, foco visible que **no** dependa de la sombra decorativa.
9. **Semántica correcta** antes que `div`s: `header/nav/main/section/footer`, encabezados en orden, `dialog` nativo.
10. **Rendimiento por defecto:** imágenes con `width/height`, `loading="lazy"`, hero con `fetchPriority="high"`, fuentes locales, cero librerías de adorno.

---

## 4. Tokens de diseño (bloque copiable)

> Para otra marca: **mantén la estructura y los nombres**, remapea solo los valores.
> La paleta neumórfica exige que `--surface` sea el fondo dominante y que las sombras se deriven de
> un tono cálido/oscuro del fondo (sombra) y un tono claro del fondo (luz) — nunca negro/blanco puro.

```css
:root {
  /* ---- Marca (acento). Vineria: vino tinto ---- */
  --wine-950: #2f0a12;  --wine-900: #46101b;  --wine-800: #5a1825;
  --wine-700: #752438;  --wine-600: #93364b;

  /* ---- Neutros cálidos (corcho/madera) para textos y detalles ---- */
  --cork-700: #765035;  --cork-500: #a47651;  --cork-300: #c5a17f;

  /* ---- Superficies (crema). El fondo del neumorfismo ---- */
  --cream-50: #fffaf3;  --cream-100: #f6eee2; --cream-200: #ebdfcf; --cream-300: #dcc9b3;
  --surface: #eee3d5;   --surface-deep: #e4d5c3;

  /* ---- Acentos secundarios y semánticos ---- */
  --clay: #b76855;   --olive: #68704b;
  --ink: #2b201c;    --muted: #695b53;
  --focus: #0d6172;  /* foco: color frío, alto contraste, ajeno a la paleta cálida */

  /* ---- Tipografía ---- */
  --font-display: 'Fraunces Variable', Georgia, serif;   /* serif con carácter, para títulos */
  --font-body:    'Manrope Variable', Arial, sans-serif; /* sans neutra, para lectura */

  /* ---- Escala de espaciado ---- */
  --space-1:.5rem; --space-2:.75rem; --space-3:1rem; --space-4:1.5rem;
  --space-5:2rem;  --space-6:3rem;   --space-7:4.5rem; --space-8:7rem;

  /* ---- Radios (generosos = amable) ---- */
  --radius-sm:.9rem; --radius-md:1.4rem; --radius-lg:2rem; --radius-xl:3rem;

  /* ---- NEUMORFISMO: sombras duales simétricas, discretas ----
     Regla: offset y blur iguales en la sombra oscura (abajo-derecha) y la clara (arriba-izquierda).
     Blur ≈ 2–3× offset. Opacidad baja. La oscura es un marrón del fondo; la clara, crema casi blanco. */
  --shadow-raised: 6px 6px 16px rgb(93 64 42 / .16), -6px -6px 16px rgb(255 252 246 / .70);
  --shadow-small:  3px 3px 8px  rgb(93 64 42 / .13), -3px -3px 8px  rgb(255 252 246 / .60);
  --shadow-inset:  inset 3px 3px 7px rgb(93 64 42 / .17), inset -3px -3px 7px rgb(255 252 246 / .62);
  --shadow-wine:   8px 8px 20px rgb(30 6 12 / .30), -6px -6px 16px rgb(120 46 62 / .18); /* sobre superficie oscura de acento */
  --shadow-float:  12px 12px 30px rgb(93 64 42 / .20), -10px -10px 24px rgb(255 252 246 / .78); /* hover/elevación */

  /* ---- Movimiento ---- */
  --duration-fast: 150ms;
  --duration: 260ms;
  --ease: cubic-bezier(.2, .8, .2, 1); /* salida rápida, entrada suave */

  /* ---- Capas ---- */
  --z-header: 30;
  --z-dialog: 50;
}
```

### Reset base recomendado

```css
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 5rem; } /* deja aire bajo el header fijo */
body { margin: 0; min-width: 320px; background: var(--surface); color: var(--ink);
       overflow-x: hidden; font-family: var(--font-body); }
body:has(dialog[open]) { overflow: hidden; }       /* bloquea scroll con modal abierto */
img { max-width: 100%; display: block; }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 4px; } /* foco funcional */
h1,h2,h3 { font-family: var(--font-display); font-weight: 530; line-height: .98; letter-spacing: -.035em; }
p { line-height: 1.7; }
em { font-weight: 310; } /* la itálica de Fraunces adelgaza: acento editorial */
```

---

## 5. Neumorfismo (el corazón visual)

**Principio.** Las sombras son las protagonistas: dan profundidad. Se usan **dos** por elemento —una
oscura y una clara— para que parezca **extruido** (elevado) o **hundido** (inset) del *mismo* fondo.

Reglas duras para que se vea premium y no “vibe coding”:

- **El elemento y su contenedor comparten color** (`--surface` sobre `--surface`, `--cream-200`
  sobre `--cream-200`). Si difieren, el efecto se rompe.
- **Sombras duales simétricas**: mismo offset y blur para oscura y clara. Asimetrías = aspecto “pegado/flotante”.
- **Discreción**: opacidad baja (0.13–0.20 oscura), blur amplio. Offsets grandes + opacidad alta = duro y barato.
- **Luz coherente en todo el sitio**: clara arriba-izquierda, oscura abajo-derecha. Nunca mezclar direcciones.
- **Elevado = reposo, hundido = activo/seleccionado/pressed.** Es el lenguaje de estado.
  ```css
  .pill { box-shadow: var(--shadow-small); }                 /* reposo: extruido */
  .pill[aria-pressed="true"] { box-shadow: var(--shadow-inset); } /* seleccionado: hundido */
  .pill:active { box-shadow: var(--shadow-inset); }          /* al presionar */
  .card:hover { box-shadow: var(--shadow-float); transform: translateY(-5px); }
  .search input { box-shadow: var(--shadow-inset); }         /* campos: hundidos (invitan a escribir) */
  ```
- **Composición hundido-dentro-de-elevado**: una tarjeta elevada con su imagen en un “pozo” inset
  (`.card-image { box-shadow: var(--shadow-inset); }`) es la firma más reconocible del estilo.

---

## 6. Tipografía

- **Display (Fraunces):** títulos y cifras destacadas. `font-weight: 530` base; `em` en itálica
  ligera (`310`) para énfasis editorial (“El vino, explicado *sin poses*”).
- **Body (Manrope):** todo el texto de lectura y de UI. Pesos 650–800 para etiquetas/botones.
- **Escala fluida (usar `clamp`):**
  ```css
  h1            { font-size: clamp(3.6rem, 12vw, 8.8rem); letter-spacing: -.035em; }
  h2            { font-size: clamp(2.7rem, 7vw, 6rem); }
  .dialog h2    { font-size: clamp(2.8rem, 9vw, 5.5rem); }
  .lead         { font-size: clamp(1rem, 2vw, 1.25rem); color: #4c3a31; }
  ```
- **Kicker / eyebrow** (etiqueta de sección): mayúsculas, tracking amplio, color de acento.
  ```css
  .kicker { color: var(--wine-700); text-transform: uppercase; letter-spacing: .16em;
            font-size: .72rem; font-weight: 800; }
  ```
- **Patrón de encabezado de sección:** `kicker` → `h2` (con `<em>` de remate) → párrafo bajada `--muted`.

---

## 7. Layout y responsive

**Breakpoints** (mobile-first, en `rem`):

| Ancho | Rol |
|---|---|
| base (< 42rem / 672px) | Móvil. 1 columna. Nav en menú hamburguesa. |
| **42rem** (672px) | Tablet. Grids a 2 columnas; diálogo a 2 columnas. |
| **62rem** (992px) | Desktop. Nav horizontal, panel de filtros *sticky*, grid a 3 columnas. |
| **88rem** (1408px) | Amplio. Grid a 4 columnas. |

Convenciones:
- **Contenedores con padding fluido:** `padding: var(--space-7) clamp(1rem, 4vw, 4rem);`
- **Header fijo** (`position: fixed`) con `backdrop-filter: blur(18px)` y fondo translúcido; `scroll-padding-top` compensa el salto de anclas.
- **Grids fluidos:** `grid-template-columns: repeat(N, minmax(0, 1fr))` (el `minmax(0,…)` evita desbordes de contenido).

---

## 8. Patrones de componentes (probados aquí)

### Botón / pastilla (pill)
Radio `999px`, altura mínima 46–48px, sombra `--shadow-small`, transición de `box-shadow` y `color`.
Variantes: `primary` (superficie de acento + sombra fuerte), `ghost` (crema translúcida).

### Control segmentado (toggle de opciones)
Grupo de botones en una pastilla contenedora; el activo se **hunde** (`aria-pressed` → inset).
**Usar `<div role="group" aria-label>`, NO `<fieldset>`** (ver anti-patrones).

### Tarjeta neumórfica
Elevada sobre fondo del mismo color; imagen en pozo inset; hover eleva con `--shadow-float` y
`transform: translateY(-5px)`. Toda la tarjeta es clicable con **un** control enfocable
(`.card-open::after { position:absolute; inset:0 }` sobre un `<button>`).

### Buscador con contador vivo dentro de la barra
Input hundido (`--shadow-inset`), ícono absoluto a la izquierda, **badge de resultados dentro de la
barra** a la derecha (`role="status" aria-live="polite"`), que se actualiza con el estado de React.

### Panel de filtros *sticky* con plegado por scroll (móvil)
- Sticky bajo el header (`top` = alto del header).
- **Al bajar** se pliegan los filtros (queda solo la barra); **al subir** reaparecen.
- Animación de altura con `grid-template-rows: 1fr ↔ 0fr` (sin números mágicos).
- Detección de dirección con `requestAnimationFrame` + **cooldown lock** tras cada cambio (evita el
  bucle de *scroll-anchoring* que hace vibrar la barra — ver anti-patrones).
- `overflow: hidden` **solo mientras anima**; en reposo desplegado, `overflow: visible` para no
  recortar las sombras de los pills (ver anti-patrones).

### Diálogo / ficha (modal)
`<dialog>` nativo (cierre con Esc y retorno de foco gratis). Móvil: portada *sticky* que se comprime
al hacer scroll (`is-condensed`). `::backdrop` con blur. Controles en pastillas legibles sobre
cualquier fondo.

### Íconos
SVG propios en un solo componente `<Icon name size>`: `viewBox="0 0 24 24"`, `fill:none`,
`stroke:currentColor`, `stroke-width:1.7`, `linecap/linejoin: round`. Heredan color por `currentColor`.

---

## 9. Movimiento

- **Revelado al entrar en viewport** (no al cargar): `IntersectionObserver` añade `.is-visible`;
  el elemento pasa de `opacity:0; translate:0 1.6rem` a visible.
  - Usa la propiedad **`translate`** (no `transform`) para que el hover con `transform` no pelee con la entrada.
- **Micro-stagger** por índice para grids (retrasos escalonados de ~.08–.1s).
- **Duraciones:** `--duration-fast` (150ms) para estados; `--duration` (260ms)–700ms para entradas.
- **Easing único** `--ease` en todo el sitio.
- **Freno obligatorio:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration:.01ms !important; transition-duration:.01ms !important; }
  }
  ```
  Y en JS: si `matchMedia('(prefers-reduced-motion: reduce)')`, mostrar todo visible sin observar.

---

## 10. Accesibilidad (checklist)

- HTML semántico + orden de encabezados + `skip-link` al contenido.
- `dialog` nativo; foco visible (`:focus-visible`) **independiente** del relieve.
- Toques ≥ 44px. Contraste de texto deliberadamente superior al del neumorfismo.
- Estados de formulario etiquetados (`<label>`, `aria-label`, `aria-pressed`, `aria-live`).
- Respeto a `prefers-reduced-motion`. `lang` correcto en `<html>`.

---

## 11. Rendimiento

- Sin librerías de iconos, animación, mapas ni estado global.
- Imágenes con `width`/`height` (evita CLS), `loading="lazy"`, hero `fetchPriority="high"` en WebP ligero.
- Fuentes variables autohospedadas (sin terceros).
- SVG locales; nada bloqueante en `<head>`.

---

## 12. Anti-patrones (errores ya corregidos — NO repetir)

1. **Sombras exageradas = “vibe coding”.** Offsets 16–24px con opacidad >0.30 y highlight casi blanco
   se ven baratos y flotantes. → **Discreto y simétrico** (sección 5).
2. **`box-shadow` en `<fieldset>` sale con esquinas cuadradas** (bug de render del elemento). →
   Usar `<div role="group">`.
3. **`overflow: hidden` recorta las sombras** de los hijos en línea recta (esquinas cuadradas). →
   Clip solo mientras una altura anima; `overflow: visible` en reposo.
4. **Bucle de *scroll-anchoring*** al animar la altura de un sticky durante el scroll: el navegador
   reajusta `scrollY`, se invierte la dirección detectada y el elemento **vibra**. → **Cooldown lock**
   que ignora la reevaluación durante la transición.
5. **`transform` para entrada Y para hover a la vez**: se pisan. → Entrada con `translate`, hover con `transform`.
6. **Colores/sombras hardcodeados** en componentes. → Siempre tokens; los hover fuertes usan `--shadow-float`.
7. **Contraste sacrificado por estética.** El texto nunca depende del relieve para leerse.

---

## 13. Checklist de calidad (antes de entregar)

- [ ] Tokens remapeados a la marca; cero valores mágicos en componentes.
- [ ] Mobile-first verificado a 360/390px y en desktop ancho.
- [ ] Neumorfismo: mismo fondo, sombras duales simétricas, discretas, luz coherente.
- [ ] Todos los estados (`hover/active/focus-visible/selected/disabled`) presentes y visibles.
- [ ] Foco visible independiente de sombras; toques ≥ 44px; contraste AA en texto.
- [ ] `prefers-reduced-motion` respetado; entradas por viewport, no al cargar.
- [ ] Semántica + `dialog` nativo + `skip-link` + `lang`.
- [ ] Imágenes con dimensiones + `lazy`; sin librerías de adorno; fuentes locales.
- [ ] Sin ninguno de los 7 anti-patrones.
- [ ] `typecheck`, `lint`, `test`, `build` en verde.

---

## 14. Adaptar a otra marca (receta rápida para el SO)

1. **Define la superficie base** (`--surface`) = fondo dominante de la marca. Todo el neumorfismo se
   deriva de ahí.
2. **Genera las sombras** desde ese fondo: oscura = versión oscurecida/cálida; clara = versión
   aclarada casi blanca. Mantén los offsets/blur de los tokens; solo cambia los colores.
3. **Elige acento + neutro**: un color de marca (aquí, vino) y una familia neutra cálida o fría.
4. **Tipografía:** una display con carácter (serif o grotesca) + una sans neutra para lectura.
   Conserva la escala `clamp`.
5. **Conserva la estructura**: breakpoints, espaciado, radios, movimiento, patrones de componentes y
   accesibilidad. Solo cambian colores, tipos y contenido.
6. **Valida** contra el checklist. El resultado debe sentirse de la misma familia de calidad, con otra piel.

> Regla mental para el SO: **la estructura y las reglas producen la calidad; la paleta produce la
> identidad.** Cambia la piel, no el esqueleto.
