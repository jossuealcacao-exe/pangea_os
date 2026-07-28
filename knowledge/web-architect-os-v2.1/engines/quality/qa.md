# QA y validación visual

## Puerta estándar

Ejecutar equivalentes de:

```text
typecheck
lint
test
build
```

## Capas

1. Inspección.
2. Validación estática.
3. Unit tests.
4. Integración.
5. E2E.
6. Build.
7. Preview.
8. Assets.
9. Enlaces.
10. Responsive.
11. Accesibilidad.
12. Regresión visual.
13. Comportamiento.
14. Rendimiento.
15. SEO.
16. Analytics.
17. Seguridad.
18. Git diff.
19. Documentación.

## Viewports

Móvil pequeño, móvil moderno, tablet vertical/horizontal, laptop y desktop ancho.

## Verificación objetiva

Comprobar scroll, foco, estados, atributos, respuestas 200, assets de build y navegación por teclado.

## Bugs conocidos

- Rutas de assets en producción.
- Índices inseguros con TS estricto.
- APIs ausentes en jsdom.
- Scroll anchoring.
- Grid sin altura acotada.
- Sombras plásticas.
- Rate limiting.
- Imágenes no verificadas.
- Banderas emoji.
- Viewports headless irreales.
- Scripts temporales.
- Tests rotos por cambios de copy.

Nunca declarar una prueba ejecutada si solo se leyó código.
