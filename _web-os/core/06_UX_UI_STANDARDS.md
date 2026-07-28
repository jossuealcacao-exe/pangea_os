# Estándares UX/UI

## Mobile-first

- Estilos base móviles.
- Container queries cuando aporten.
- Safe areas y orientación horizontal.
- No depender de hover.
- Touch targets ≥ 44×44 px.
- Sin overflow accidental.

## Estados

Default, hover, focus, active, selected, disabled, loading, empty, error, success y offline cuando aplique.

## Formularios

Labels persistentes, validación clara, conservar datos, autocomplete, tipos de input correctos y errores asociados.

## Navegación

Jerarquía clara, una acción principal, foco gestionado, Escape y retorno de foco en overlays.

## Búsqueda y filtros

Contador, limpiar filtros, estado vacío, alias cuando aplique y URL compartible cuando sea razonable.

## Movimiento

Funcional, breve, compatible con `prefers-reduced-motion`, sin bloquear scroll.

## Patrones Vineria

- Tarjeta con un único control enfocable.
- Grid stretch y CTA al fondo.
- IntersectionObserver con fallback.
- Región scrollable con altura acotada y `min-height:0`.
- Headers colapsables con histéresis.
- Verificación objetiva del comportamiento.
