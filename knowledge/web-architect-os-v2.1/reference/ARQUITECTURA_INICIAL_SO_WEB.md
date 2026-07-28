# Arquitectura del Sistema Operativo para Creación Web mediante Prompts

**Nombre provisional:** Web Architect OS  
**Versión de arquitectura:** 0.1  
**Propietario:** Jossue Alcalá  
**Fecha:** 20 de julio de 2026  
**Estado:** Arquitectura aprobable antes de construir el paquete completo

---

## 1. Propósito

Este Sistema Operativo convierte una idea de sitio web, el contexto aportado por el usuario y las fuentes disponibles en un **master prompt ejecutable dentro de una carpeta local** mediante Claude Code, Codex, ChatGPT Work u otro agente de código compatible.

El master prompt debe conducir al agente desde la inspección inicial hasta un entregable funcional, probado, documentado y preparado para despliegue.

El sistema no debe imponer una única tecnología ni una estética predeterminada. Debe seleccionar la arquitectura, el stack, la estrategia de renderizado, la infraestructura, el sistema visual y la profundidad de QA que mejor correspondan al proyecto.

---

## 2. Principio rector

> Tecnología avanzada no significa tecnología máxima. Significa utilizar la solución más capaz que resuelva el problema con la menor complejidad operativa razonable.

El SO debe evitar dos extremos:

1. **Subarquitectura:** elegir una solución demasiado simple que limite SEO, rendimiento, crecimiento, datos o funcionalidades.
2. **Sobrearquitectura:** introducir backend, microservicios, estado global, autenticación, colas o infraestructura distribuida cuando el proyecto no los necesita.

El resultado debe ser moderno, mantenible y técnicamente justificable.

---

## 3. Herencia de Vineria

La memoria de Vineria se integra como una biblioteca de patrones probados, especialmente en:

- TypeScript estricto.
- Fuente única de verdad para datos.
- Diseño mobile-first.
- Tokens visuales.
- Accesibilidad desde el inicio.
- `prefers-reduced-motion`.
- Contenido humano y no genérico.
- Verificación objetiva, no basada únicamente en “se ve bien”.
- QA con typecheck, lint, tests y build.
- Validación de recursos y licencias.
- Registro de bugs, causa raíz y solución reutilizable.

Estas reglas se vuelven **universales cuando aplican**, pero no se convierten en obligaciones específicas de stack o estilo.

Ejemplos:

- “Datos tipados y no duplicados” sí es una regla general.
- “Usar React 19 + Vite” no es una regla general.
- “Usar neumorfismo” no es una regla general.
- “Mantener contraste, foco y estados accesibles aun en neumorfismo” sí es una regla general.
- “No depender de recursos externos en runtime” será una política seleccionable, no un dogma para todos los proyectos.

---

## 4. Arquitectura general del SO

```text
Idea y datos del usuario
        ↓
Motor de descubrimiento
        ↓
Clasificador del proyecto
        ↓
Investigación y fuentes
        ↓
Selector de arquitectura
        ↓
Motor UX/UI y dirección visual
        ↓
Diseño de contenido, datos y backend
        ↓
SEO + GEO + analítica + accesibilidad + seguridad
        ↓
Compilador del master prompt
        ↓
Adaptador de plataforma
        ↓
QA del prompt
        ↓
Master prompt ejecutable en carpeta local
        ↓
Memoria y AHP de continuidad
```

El sistema tendrá dos productos distintos:

### Producto A — Especificación previa

Documento compacto que explique:

- Qué se construirá.
- Qué arquitectura se eligió.
- Por qué se eligió.
- Qué supuestos permanecen.
- Qué riesgos existen.

### Producto B — Master prompt ejecutable

Prompt completo adaptado a Claude Code, Codex o ChatGPT Work, con:

- Autoridad.
- Rutas y límites.
- Fases.
- Stack.
- investigación.
- UX/UI.
- Implementación.
- QA.
- Definición de terminado.
- Reporte final.

---

## 5. Estructura de archivos propuesta

```text
web-architect-os/
├── 00_START_HERE.md
├── 01_PROJECT_INSTRUCTIONS.md
├── 02_CORE_OS.md
├── 03_INTAKE_AND_DISCOVERY.md
├── 04_PROJECT_CLASSIFIER.md
├── 05_ARCHITECTURE_SELECTOR.md
├── 06_RENDERING_AND_DEPLOYMENT.md
├── 07_DESIGN_DIRECTION_ENGINE.md
├── 08_UX_UI_STANDARDS.md
├── 09_CONTENT_AND_RESEARCH_ENGINE.md
├── 10_FRONTEND_ENGINEERING.md
├── 11_BACKEND_DATA_AND_APIS.md
├── 12_SEO_GEO_AND_DISCOVERABILITY.md
├── 13_ANALYTICS_AND_EXPERIMENTATION.md
├── 14_ACCESSIBILITY_PERFORMANCE_SECURITY.md
├── 15_QA_AND_VISUAL_VALIDATION.md
├── 16_MASTER_PROMPT_COMPILER.md
├── 17_OUTPUT_CONTRACTS.md
├── 18_PLATFORM_ADAPTERS.md
├── 19_AHP_HANDOFF_PROTOCOL.md
├── 20_COMMANDS_AND_TRIGGERS.md
├── 21_CHANGELOG.md
├── manifest.json
└── reference/
    ├── memoria-vineria.md
    ├── bugs-and-fixes-vineria.md
    ├── design-style-catalog.md
    ├── architecture-patterns.md
    └── web-standards-sources.md
```

---

## 6. Función de cada módulo

### `00_START_HERE.md`

Explica:

- Qué hace el SO.
- Cómo instalarlo en ChatGPT Projects.
- Cómo usarlo para generar prompts.
- Cómo ejecutar el prompt en una carpeta local.
- Comandos principales.
- Diferencia entre generar un proyecto nuevo y mejorar uno existente.

### `01_PROJECT_INSTRUCTIONS.md`

Instrucciones compactas y persistentes para ChatGPT Projects.

Debe ordenar al sistema:

- Interpretar la idea.
- Solicitar únicamente datos críticos.
- Clasificar el proyecto.
- Seleccionar arquitectura.
- Crear el master prompt.
- No ejecutar la web dentro del chat salvo que el usuario lo pida.
- No imponer tecnologías sin diagnóstico.
- No declarar estándares cumplidos sin QA verificable.

### `02_CORE_OS.md`

Núcleo normativo.

Define:

- Identidad.
- Misión.
- Autoridad.
- Principios.
- Jerarquía de decisión.
- Manejo de ambigüedad.
- Fuentes de verdad.
- Prohibiciones.
- Criterio de terminado.

### `03_INTAKE_AND_DISCOVERY.md`

Transforma una idea en un brief suficiente.

Debe detectar:

- Nombre y propósito.
- Audiencia.
- Problema.
- Objetivos comerciales o informativos.
- Tipo de contenido.
- Funcionalidades.
- Conversión principal.
- Necesidad de autenticación.
- Necesidad de backend.
- Volumen de contenido.
- Frecuencia de actualización.
- Integraciones.
- Países, idiomas y regulación.
- Branding disponible.
- Estilo visual deseado.
- Restricciones.
- Hosting o despliegue.
- Nivel de autonomía del agente.

No deberá preguntar por elementos que puedan decidirse razonablemente mediante investigación o convenciones.

### `04_PROJECT_CLASSIFIER.md`

Clasifica el proyecto en uno o varios arquetipos:

- Landing page.
- Portafolio.
- Sitio corporativo.
- Sitio editorial.
- Documentación.
- Catálogo.
- Ecommerce.
- Aplicación web.
- SaaS.
- Dashboard.
- Marketplace.
- Comunidad.
- Directorio.
- Micrositio de campaña.
- Experiencia experimental.
- Aplicación PWA.
- Sitio multilingüe.
- Sitio con CMS.
- Plataforma con autenticación.
- Plataforma transaccional.

La clasificación determina arquitectura, renderizado, datos, analítica y QA.

### `05_ARCHITECTURE_SELECTOR.md`

Motor de elección tecnológica.

No elegirá por moda. Evaluará:

- SEO y rastreabilidad.
- Interactividad.
- Personalización.
- Actualización de contenido.
- Volumen de rutas.
- Datos en tiempo real.
- Autenticación.
- Procesos de servidor.
- Presupuesto de JavaScript.
- Hosting.
- Experiencia del mantenedor.
- Escalabilidad real.
- Portabilidad.
- Coste operativo.
- Madurez del ecosistema.
- Riesgo de dependencia del proveedor.

### `06_RENDERING_AND_DEPLOYMENT.md`

Selecciona:

- SSG.
- SSR.
- CSR.
- ISR.
- Renderizado híbrido.
- Streaming.
- Server Components.
- Islands Architecture.
- Server Islands.
- Edge rendering.
- Static export.
- SPA instalable.
- Backend tradicional.
- Serverless.
- Edge functions.

Define despliegue:

- Hosting estático.
- Vercel.
- Netlify.
- Cloudflare.
- Railway.
- Servidor Node.
- Contenedores.
- Shopify.
- WordPress/headless.
- Infraestructura propia.

### `07_DESIGN_DIRECTION_ENGINE.md`

Convierte estilos subjetivos en reglas observables.

Catálogo inicial:

- Minimalismo.
- Minimalismo editorial.
- Neumorfismo.
- Neo-skeuomorfismo.
- Glassmorfismo.
- Liquid Glass.
- Brutalismo.
- Neo-brutalismo.
- Maximalismo.
- Skeuomorfismo.
- Swiss/International.
- Bento.
- Retro digital.
- Futurismo.
- Cyber.
- Orgánico.
- Lujo editorial.
- Y2K.
- Material design adaptado.
- Diseño tipográfico.
- Experiencias cinemáticas.

Cada estilo debe contener:

- Cuándo usarlo.
- Cuándo evitarlo.
- Paleta.
- Superficies.
- Tipografía.
- Composición.
- Iconografía.
- Movimiento.
- Profundidad.
- Estados interactivos.
- Riesgos de accesibilidad.
- Antipatrones.
- Compatibilidad con otros estilos.

Regla: no mezclar más de dos lenguajes visuales dominantes sin una jerarquía explícita.

### `08_UX_UI_STANDARDS.md`

Estándares universales:

- Mobile-first.
- Diseño responsive por viewport y contenedor.
- Jerarquía.
- Navegación.
- Arquitectura de información.
- Touch targets.
- Foco.
- Estados.
- Formularios.
- Feedback.
- Errores.
- Loading.
- Empty states.
- Modales y drawers.
- Tablas.
- Búsqueda.
- Filtros.
- Acciones destructivas.
- Microinteracciones.
- Motion responsable.
- Progressive disclosure.
- Prevención de errores.
- Compatibilidad con teclado.
- Experiencia en dispositivos lentos.
- Orientación horizontal.
- Safe areas.
- Zoom y tamaños de texto.

### `09_CONTENT_AND_RESEARCH_ENGINE.md`

Define cuándo investigar y cómo convertir fuentes en copy.

Incluye:

- Jerarquía de fuentes.
- Registro de evidencia.
- Claims.
- Licencias.
- Copy humano.
- Voz de marca.
- Arquitectura editorial.
- Scannability.
- FAQs.
- Metodología.
- Manejo de datos discutidos.
- Páginas legales.
- Contenido estructurado.
- Internacionalización.
- Localización.

### `10_FRONTEND_ENGINEERING.md`

Biblioteca de estándares frontend:

- HTML semántico.
- CSS moderno.
- TypeScript estricto cuando aplique.
- Design tokens.
- Componentes.
- Estados.
- Data-driven UI.
- Validación de esquemas.
- Carga de imágenes.
- Fuentes.
- Iconos.
- Lazy loading.
- Code splitting.
- Error boundaries.
- Progressive enhancement.
- Feature detection.
- Container queries.
- View transitions con fallback.
- Reduced motion.
- Reduced data.
- Compatibilidad Baseline.
- Gestión de estado proporcional.
- Estrategia de rutas.
- Testing.

### `11_BACKEND_DATA_AND_APIS.md`

Selecciona backend solamente cuando sea necesario.

Patrones disponibles:

- Sin backend.
- Archivos locales tipados.
- Headless CMS.
- Backend as a Service.
- Serverless functions.
- Edge functions.
- API REST.
- GraphQL.
- RPC tipado.
- Backend for Frontend.
- Monolito modular.
- Event-driven.
- Colas y jobs.
- Webhooks.
- WebSockets o realtime.
- Microservicios únicamente con justificación de dominio, escala o equipos.

Decisiones de datos:

- SQLite.
- PostgreSQL.
- Almacenamiento documental.
- KV.
- Object storage.
- Search index.
- Cache.
- CDN.

Incluye:

- Autenticación.
- Autorización.
- Sesiones.
- Validación.
- Migraciones.
- Seeds.
- Rate limiting.
- Idempotencia.
- Manejo de errores.
- Logs.
- Backups.
- Privacidad.

### `12_SEO_GEO_AND_DISCOVERABILITY.md`

Debe evitar “hacks GEO”.

Incluye:

- HTML rastreable.
- Arquitectura semántica.
- Titles y descriptions.
- Canonical.
- Robots.
- Sitemap.
- Hreflang.
- Open Graph.
- Enlazado interno.
- Breadcrumbs.
- Datos estructurados válidos.
- Organización, autor y entidades.
- Contenido útil, original y con experiencia.
- Fuentes y metodología.
- Imágenes y video.
- Search Console.
- Merchant Center o Business Profile cuando aplique.
- Accesibilidad del árbol semántico para agentes.
- Crawlability.
- No crear `llms.txt` como requisito de posicionamiento.
- Permitirlo como documento opcional de interoperabilidad, nunca como garantía.

### `13_ANALYTICS_AND_EXPERIMENTATION.md`

Primero define el plan de medición; después instala herramientas.

Incluye:

- Objetivos.
- KPIs.
- Taxonomía de eventos.
- Convención de nombres.
- Parámetros.
- Embudo.
- Eventos de interacción.
- Eventos de error.
- Conversiones.
- Ecommerce.
- Atribución.
- Consentimiento.
- Privacidad.
- QA de analytics.
- DebugView.
- Data layer tipado cuando aplique.
- GA4.
- GTM.
- Matomo, Plausible u otras alternativas cuando convengan.
- Heatmaps solamente con propósito.
- A/B testing con hipótesis y guardrails.
- RUM para Core Web Vitals.

### `14_ACCESSIBILITY_PERFORMANCE_SECURITY.md`

Tres puertas independientes.

#### Accesibilidad

- WCAG 2.2 AA como objetivo base.
- Navegación por teclado.
- Foco.
- Contraste.
- Semántica.
- Formularios.
- Lectores de pantalla.
- Zoom.
- Movimiento.
- Objetivos táctiles.
- Pruebas automáticas y manuales.

#### Rendimiento

- Presupuesto de JavaScript.
- Imágenes responsivas.
- Fuentes.
- LCP.
- INP.
- CLS.
- Caching.
- CDN.
- Compresión.
- Preload y priority hints con criterio.
- Terceros.
- Lazy loading.
- RUM y laboratorio.

Objetivos de campo iniciales:

- LCP ≤ 2.5 s.
- INP ≤ 200 ms.
- CLS ≤ 0.1.

#### Seguridad

- OWASP ASVS proporcional al riesgo.
- CSP.
- Headers.
- XSS.
- CSRF.
- SSRF.
- Inyección.
- Validación.
- Secrets.
- Dependencias.
- Auth.
- Cookies.
- CORS.
- Rate limiting.
- Auditoría.
- Registro seguro.

### `15_QA_AND_VISUAL_VALIDATION.md`

QA obligatorio por capas:

1. Inspección.
2. Typecheck.
3. Lint.
4. Unit tests.
5. Integration tests.
6. E2E.
7. Build.
8. Preview del build.
9. Enlaces.
10. Assets.
11. Responsive.
12. Accesibilidad.
13. Visual regression.
14. Comportamiento.
15. Performance.
16. SEO.
17. Analytics.
18. Seguridad.
19. Git diff.
20. Documentación.

El prompt final elegirá solamente las pruebas proporcionales al proyecto, pero nunca omitirá build, responsive, accesibilidad y verificación visual.

### `16_MASTER_PROMPT_COMPILER.md`

Es el corazón operativo.

Recibe:

- Brief.
- Clasificación.
- Arquitectura.
- Estilo.
- Stack.
- Fuentes.
- Restricciones.
- Nivel de autoridad.
- Plataforma destino.

Produce un prompt con:

1. Rol.
2. Autoridad.
3. Objetivo.
4. Contexto.
5. Fuente de verdad.
6. Inspección previa.
7. Investigación.
8. Arquitectura elegida.
9. Dirección UX/UI.
10. Contenido.
11. Frontend.
12. Backend.
13. SEO/GEO.
14. Analytics.
15. Accesibilidad.
16. Rendimiento.
17. Seguridad.
18. QA.
19. Documentación.
20. Git.
21. Definición de terminado.
22. Reporte final.

### `17_OUTPUT_CONTRACTS.md`

Contratos:

- Diagnóstico.
- Brief.
- Especificación técnica.
- Master prompt completo.
- Solo prompt.
- Auditoría.
- Iteración UX.
- Fix técnico.
- Handoff.
- Reporte QA.

### `18_PLATFORM_ADAPTERS.md`

Adaptadores para:

- Claude Code.
- Codex.
- ChatGPT Work.
- Cursor.
- GitHub Copilot.
- Agente genérico.

Claude Code y Codex deberán incluir:

- Inspección de repositorio.
- Git status.
- Protección de cambios existentes.
- Comandos.
- QA.
- Diff.
- Commit sugerido.

### `19_AHP_HANDOFF_PROTOCOL.md`

Conserva:

- Objetivo.
- Stack.
- Arquitectura.
- Decisiones.
- Archivos.
- Estado.
- Tests.
- Bugs.
- Riesgos.
- Próxima acción.

### `20_COMMANDS_AND_TRIGGERS.md`

Comandos propuestos:

```text
Crear master prompt:
[Idea]

Sitio nuevo:
[Idea]

Proyecto existente:
[Objetivo + memoria]

Solo prompt:
[Idea]

Audita arquitectura:
[Idea o prompt]

Modo landing:
[Idea]

Modo ecommerce:
[Idea]

Modo web app:
[Idea]

Modo experimental:
[Idea]

Dirección visual:
[Idea]

Iteración UX:
[Cambio]

Fix técnico:
[Problema]

AHP:
[Estado]
```

---

## 7. Selector de arquitectura

### Perfil A — Landing, portafolio o campaña

Preferencia:

- Astro cuando predomine contenido con interactividad localizada.
- React + Vite cuando sea una experiencia SPA independiente o experimental.
- Next.js cuando requiera integración futura, rutas dinámicas o backend React.
- HTML/CSS/JS cuando la complejidad no justifique framework.

Renderizado:

- SSG o static export.

Backend:

- Ninguno, formulario externo o función serverless mínima.

### Perfil B — Sitio editorial o catálogo

Preferencia:

- Astro con Content Collections.
- Next.js, Nuxt o SvelteKit cuando existan rutas dinámicas, CMS o personalización.
- Headless CMS si editores no técnicos actualizarán contenido.

Renderizado:

- SSG, ISR o híbrido.

### Perfil C — Sitio corporativo con leads

Preferencia:

- Astro, Next.js o Nuxt.
- CMS cuando el equipo requiera autonomía.
- Backend ligero para formularios, CRM y automatizaciones.

### Perfil D — Ecommerce

Preferencia:

- Shopify Liquid para storefront tradicional.
- Hydrogen/Remix cuando exista justificación headless en Shopify.
- Next.js o framework equivalente para commerce composable.
- Plataforma nativa antes que reconstruir checkout, catálogo, impuestos o inventario.

Debe evaluar:

- Catálogo.
- Variantes.
- Mercados.
- Checkout.
- Pagos.
- SEO.
- Feed.
- Analytics.
- CRO.
- Integraciones.

### Perfil E — Aplicación web o SaaS

Preferencia:

- Next.js, Nuxt, SvelteKit o arquitectura equivalente full-stack.
- Backend for Frontend.
- PostgreSQL cuando existan relaciones y transacciones.
- Auth y permisos por rol.
- Jobs y colas cuando existan procesos asíncronos reales.

### Perfil F — Dashboard interno

Preferencia:

- SPA o full-stack.
- CSR para vistas privadas cuando SEO no importe.
- API tipada.
- Control de acceso.
- Tablas virtualizadas cuando el volumen lo justifique.

### Perfil G — Experiencia inmersiva

Preferencia:

- React/Vite, SvelteKit o Astro con islas.
- Canvas, WebGL o Three.js solamente cuando el concepto lo requiera.
- Progressive enhancement.
- Fallback accesible.
- Presupuesto explícito de GPU, batería y JavaScript.

### Perfil H — Alto tráfico global

Preferencia:

- SSG/ISR.
- CDN.
- Edge.
- Cache.
- Imágenes optimizadas.
- Origen desacoplado.
- Observabilidad.

Microservicios no son requisito de alto tráfico; primero se escala un monolito modular bien diseñado.

---

## 8. Matriz de selección de stack

Cada candidato se puntúa de 0 a 3:

| Criterio | Peso |
|---|---:|
| SEO y HTML inicial | 3 |
| Rendimiento esperado | 3 |
| Interactividad | 3 |
| Datos dinámicos | 3 |
| Backend | 3 |
| Mantenibilidad | 3 |
| Madurez | 2 |
| Hosting disponible | 2 |
| Experiencia del equipo | 2 |
| Portabilidad | 2 |
| Coste operativo | 2 |
| Necesidad de CMS | 2 |
| Internacionalización | 1 |
| Escalabilidad real | 1 |

El SO debe mostrar:

- Stack elegido.
- Segunda opción.
- Motivo.
- Tradeoffs.
- Tecnologías descartadas.
- Señales que justificarían migrar.

---

## 9. Política visual

El usuario puede pedir cualquier estilo moderno, pero el SO debe traducirlo a componentes medibles.

Ejemplo:

### Neumorfismo

- Superficie base común.
- Luz coherente.
- Sombras tokenizadas.
- Estados presionados.
- Foco independiente.
- Contraste reforzado en controles.
- Evitar usar relieve como único indicador.

### Glassmorfismo

- Transparencia controlada.
- Contraste del contenido.
- Blur con fallback.
- Bordes y tintes.
- No colocar texto sobre fondos impredecibles.
- Presupuesto de composición y GPU.

### Brutalismo

- Tipografía fuerte.
- Contraste.
- Bordes visibles.
- Retícula intencional.
- Interacciones explícitas.
- No confundir crudeza con descuido.

### Maximalismo

- Jerarquía dominante.
- Capas controladas.
- Límites de densidad.
- Ruta visual.
- Movimiento con pausas.
- Mobile como composición propia, no versión comprimida.

### Minimalismo

- Espacio con función.
- Tipografía precisa.
- Baja carga cognitiva.
- Jerarquía clara.
- No ocultar navegación ni información crítica “por limpieza”.

---

## 10. Contrato de entrada mínimo

El usuario podrá escribir una idea libre.

El SO extraerá o inferirá:

```yaml
project:
  name:
  type:
  purpose:
  audience:
  primary_action:
  pages:
  features:
  content:
  data:
  integrations:
  languages:
  region:
  brand:
  visual_direction:
  references:
  deployment:
  analytics:
  seo:
  constraints:
  existing_assets:
  existing_repository:
  platform_target:
```

Preguntas críticas máximas:

1. Información cuya ausencia cambie la arquitectura.
2. Información legal, comercial o de identidad que no pueda inferirse.
3. Acceso o credenciales indispensables.

Los demás vacíos se resuelven con supuestos declarados o placeholders.

---

## 11. Contrato de salida del compilador

### A. Diagnóstico

- Tipo de proyecto.
- Complejidad.
- Riesgos.
- Datos faltantes.

### B. Arquitectura propuesta

- Stack.
- Renderizado.
- Backend.
- Datos.
- Hosting.
- Analytics.
- SEO/GEO.
- Seguridad.
- QA.

### C. Dirección visual

- Estilo.
- Sistema de tokens.
- Tipografía.
- Layout.
- Movimiento.
- Antipatrones.
- Accesibilidad.

### D. Master prompt

Listo para copiar en el agente local.

### E. Variables

- Dominio.
- IDs de analytics.
- Credenciales.
- Textos legales.
- Datos comerciales.
- Recursos pendientes.

### F. Checklist previo a ejecución

- Carpeta correcta.
- Git.
- Herramientas.
- Accesos.
- Fuentes.
- Restricciones.

---

## 12. Reglas obligatorias para todos los master prompts

1. Inspeccionar antes de editar.
2. No inventar rutas, APIs, herramientas ni datos.
3. Proteger cambios existentes.
4. Justificar dependencias.
5. Mantener una fuente de verdad.
6. Diseñar mobile-first.
7. Usar HTML semántico.
8. Accesibilidad desde la arquitectura.
9. SEO y analítica desde el diseño de información.
10. Definir presupuesto de rendimiento.
11. Incluir seguridad proporcional.
12. No usar estética como excusa para degradar UX.
13. No usar tecnologías experimentales sin fallback o justificación.
14. Verificar imágenes, licencias y atribuciones.
15. Ejecutar QA real.
16. Verificar build de producción.
17. Revisar responsive en viewports reales.
18. Documentar lo que no se pudo comprobar.
19. Revisar Git diff.
20. No declarar terminado un prototipo incompleto.

---

## 13. Puertas de calidad del SO

### Gate 1 — Prompt

- Objetivo inequívoco.
- Plataforma definida.
- Autoridad definida.
- Arquitectura justificada.
- Entregable verificable.
- Sin contradicciones.

### Gate 2 — Diseño

- Estilo traducido a reglas.
- Mobile definido.
- Estados definidos.
- Accesibilidad integrada.
- Motion con fallback.
- Tokens.

### Gate 3 — Ingeniería

- Stack proporcional.
- Datos.
- Frontend.
- Backend.
- Infraestructura.
- Seguridad.

### Gate 4 — Descubrimiento

- SEO.
- GEO.
- Structured data.
- Analytics.
- Fuentes.
- Contenido.

### Gate 5 — QA

- Comandos.
- Viewports.
- Navegación.
- Build.
- Performance.
- Accesibilidad.
- Reporte.
- Criterio de terminado.

---

## 14. Decisiones importantes

### 14.1 React/Vite no será obligatorio

Se conservará como excelente opción para experiencias estáticas interactivas, pero el sistema podrá elegir Astro, Next.js, Nuxt, SvelteKit, Shopify, WordPress/headless u otra arquitectura.

### 14.2 Self-contained será un perfil

Vineria demostró el valor de no depender de terceros en runtime. El SO ofrecerá:

- `SELF_CONTAINED`
- `MANAGED_SERVICES`
- `HYBRID`

La selección dependerá de privacidad, offline, velocidad, contenido y mantenimiento.

### 14.3 GEO no será una colección de trucos

El sistema tratará GEO como extensión de:

- SEO técnico.
- Contenido original.
- Entidades claras.
- Datos estructurados.
- Fuentes.
- Accesibilidad semántica.
- Crawlability.
- Autoridad real.

### 14.4 Los estilos no dictarán el stack

Neumorfismo, glassmorfismo, brutalismo o maximalismo son direcciones de diseño. No justifican por sí solos React, Three.js, WebGL o una librería de animación.

### 14.5 Backend proporcional

No se creará backend “para que se vea serio”. Se añade cuando existen datos, autenticación, integraciones, lógica protegida, pagos, automatizaciones o procesos de servidor.

---

## 15. Próxima fase

Construir la versión 1.0 del paquete con este orden:

1. `01_PROJECT_INSTRUCTIONS.md`
2. `02_CORE_OS.md`
3. `03_INTAKE_AND_DISCOVERY.md`
4. `04_PROJECT_CLASSIFIER.md`
5. `05_ARCHITECTURE_SELECTOR.md`
6. `07_DESIGN_DIRECTION_ENGINE.md`
7. `16_MASTER_PROMPT_COMPILER.md`
8. `17_OUTPUT_CONTRACTS.md`
9. `18_PLATFORM_ADAPTERS.md`
10. `15_QA_AND_VISUAL_VALIDATION.md`
11. Módulos especializados restantes.
12. Referencias Vineria.
13. Manifest.
14. Changelog.
15. Prueba con tres ideas distintas:
    - Landing editorial.
    - Ecommerce.
    - SaaS con autenticación.

La versión 1.0 se considerará válida cuando produzca prompts arquitectónicamente distintos para los tres casos, sin copiar una plantilla universal disfrazada.
