# Layout y responsive

## Mobile-first

Diseñar base para 320–420px. Desktop añade capacidad; no reescribe el producto.

## Herramientas

- Grid y flex.
- `minmax(0, 1fr)` para evitar desbordes.
- Container queries para componentes reutilizables.
- `clamp()` para padding y tipo.
- Logical properties.
- Safe areas.

## Breakpoints de referencia Vineria

- Base: móvil.
- 42rem: tablet.
- 62rem: desktop.
- 88rem: amplio.

Estos valores son referencia, no dogma. Ajustar donde el contenido se rompa.

## MUST

- Verificar 360/390px.
- Verificar texto aumentado y zoom.
- Evitar overflow horizontal accidental.
- No depender de hover.
- Dar composición propia a mobile en estilos densos/maximalistas.
