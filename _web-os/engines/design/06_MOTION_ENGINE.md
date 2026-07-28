# Motion Engine

## Principio

Animar entrada o cambio de estado; no animar por ansiedad estética.

## Fuente Vineria

- IntersectionObserver para reveal al entrar en viewport.
- `translate` para entrada y `transform` para hover para evitar colisión.
- Micro-stagger discreto.
- Curva única.
- Reduced motion obligatorio.

## MUST

- Definir propósito de cada animación.
- Respetar `prefers-reduced-motion` en CSS y JS.
- Evitar bloquear scroll o interacción.
- Evitar parallax agresivo.
- Evitar animar propiedades costosas cuando pueda usarse transform/opacity.
- Probar en móvil y dispositivos lentos.

## Fallback

Sin soporte, JS o motion: el contenido sigue visible, operable y comprensible.
