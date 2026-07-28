# Patrones de componentes

## Estado completo

Todo control debe considerar default, hover, focus-visible, active, selected, disabled, loading, error y success cuando apliquen.

## Patrones de Vineria

- Pill con touch target 46–48px.
- Segmented control con `role="group"` y `aria-pressed`.
- Tarjeta clicable con un solo control enfocable.
- Input con contador `role="status"` y `aria-live`.
- Filtros sticky plegables con cooldown de scroll.
- `<dialog>` nativo con portada móvil sticky.
- Iconos SVG propios con `currentColor`.

## Regla de adopción

Usa estos patrones cuando resuelvan la interacción. No conviertas un patrón editorial en obligación para formularios, dashboards o comercio.

## MUST

- Semántica nativa primero.
- Focus independiente de efectos decorativos.
- No anidar interactivos.
- No ocultar affordance en sombras o color únicamente.
