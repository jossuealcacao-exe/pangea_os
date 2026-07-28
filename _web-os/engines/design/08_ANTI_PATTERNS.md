# Anti-patrones visuales y de interacción

## Fuente Vineria — NO repetir

1. Sombras exageradas que parecen “vibe coding”.
2. `box-shadow` en fieldset con render incorrecto: usar grupo accesible adecuado.
3. `overflow:hidden` permanente que recorta sombras.
4. Scroll anchoring que hace vibrar un sticky: usar histéresis/cooldown.
5. `transform` compartido por reveal y hover: separar propiedades.
6. Colores y sombras hardcodeados.
7. Contraste sacrificado por estética.

## Generalizados

8. Glass sin fallback ni contraste estable.
9. Maximalismo sin ruta visual.
10. Minimalismo que oculta navegación.
11. Tres o más estilos dominantes.
12. Motion que inicia antes de que el contenido llegue al viewport.
13. Componentes “bonitos” sin estados de error/disabled.
14. Dark mode por inversión automática.
15. Librería pesada para un único icono o animación.
