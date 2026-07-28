# Arquitectura de themes Shopify

## Inspección

Revisar `shopify.theme.toml`, schema/config, layout, templates JSON, sections, blocks, snippets, assets, locales, Theme Check y Git.

## Principios

- Compatible con Online Store.
- Sections y blocks configurables.
- No hardcodear contenido administrable.
- Dynamic sources.
- Metafields y metaobjects.
- Traducciones.
- Progressive enhancement.
- No romper editor.

## Liquid

- Escapar output.
- Preferir `render`.
- Evitar lógica excesiva.
- Limitar loops.
- Paginar.
- Comprobar objetos opcionales.
- Mantener schema válido.

## JavaScript

Vanilla o custom elements por defecto, bundles locales, Cart API y Section Rendering cuando aplique. Fallback sin JS cuando sea razonable.

## CSS

Tokens, componentes aislados, responsive y sin selectores frágiles.

## Sections

Definir nombre, settings, blocks, presets, defaults, límites y labels comprensibles.
