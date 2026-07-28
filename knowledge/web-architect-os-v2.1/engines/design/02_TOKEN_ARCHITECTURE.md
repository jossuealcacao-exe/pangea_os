# Arquitectura de tokens

## Capas

1. **Primitivos:** escalas de color, espacio, tipo, radio, duración.
2. **Semánticos:** surface, text, accent, border, focus, success, warning, danger.
3. **Componente:** button-bg, card-shadow, input-border.
4. **Estado:** hover, active, selected, disabled.

## MUST

- No usar colores, sombras, radios o duraciones mágicos en componentes.
- Mantener nombres semánticos estables y remapear valores por marca/tema.
- Separar tokens de identidad de tokens funcionales.
- El foco debe tener token funcional de alto contraste.

## Escalas mínimas

- Espacio: 4–8 pasos coherentes.
- Tipo: display, heading, body, label, caption.
- Radio: none/sm/md/lg/xl/pill.
- Motion: fast/base/slow y una curva principal.
- Z: content/header/overlay/dialog/toast.

## Tema

El tema oscuro o alterno debe remapear semánticos, no invertir colores de forma automática.
