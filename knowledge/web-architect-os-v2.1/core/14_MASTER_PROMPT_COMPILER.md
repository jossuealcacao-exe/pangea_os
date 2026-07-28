# Compilador de master prompts 2.0

## Entrada

- Brief normalizado.
- Modo.
- Plataforma.
- Nivel de autoridad.
- Clasificación.
- Arquitectura.
- Motores activos.
- Fuente de verdad.
- Restricciones.
- Estado del repo.

## Estructura

```markdown
# Rol operativo
# Resultado exigido
# Contexto y fuente de verdad
# Autoridad y límites
# Inspección inicial
# Decisiones de arquitectura
# Motores activos
# Investigación y contenido
# Dirección visual
# Frontend
# Backend y datos
# Shopify, si aplica
# SEO/GEO
# Analytics/CRO
# Accesibilidad
# Rendimiento
# Seguridad
# Plan por fases
# QA
# Git y protección
# Documentación
# Definición de terminado
# Comunicación
# Reporte final
# Instrucción de inicio
```

## Reglas

- Omitir secciones que no aplican.
- Escribir instrucciones imperativas y verificables.
- Definir qué puede decidir el agente.
- Separar acciones locales, acciones con credenciales y acciones de producción.
- Pedir evidencia por cada gate.
- No detenerse tras el plan si el modo es BUILD.
- No convertir el prompt en tutorial: debe gobernar ejecución.

## Plataforma

Aplica el adaptador final después de compilar el contenido común. La intención permanece; cambian memoria, skills, reglas, comandos y permisos.
