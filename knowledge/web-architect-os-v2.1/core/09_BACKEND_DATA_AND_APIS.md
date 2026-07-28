# Backend, datos y APIs

## Regla

No crear backend para aparentar sofisticación.

## Perfiles

### Sin backend
Contenido estático, datos locales, sin auth ni lógica protegida.

### Headless CMS
Editores no técnicos, workflow editorial, preview o distribución multicanal.

### Backend as a Service
Auth, base de datos y storage gestionados cuando la dependencia del proveedor sea aceptable.

### Serverless o Edge
Formularios, webhooks, APIs pequeñas y personalización ligera.

### Monolito modular
Preferencia inicial para aplicaciones con dominio real, transacciones y crecimiento razonable.

### Microservicios
Solo con dominios independientes, equipos separados, escalado desigual o aislamiento justificado.

## Datos

- PostgreSQL para relaciones y transacciones.
- SQLite para local, prototipo o edge compatible.
- KV para estado simple y cache.
- Object storage para archivos.
- Search index para búsqueda avanzada.
- Documental cuando el dominio lo justifique.

## APIs

Elegir REST, GraphQL, RPC tipado, BFF, WebSockets o webhooks según necesidad.

Definir contratos, validación, errores, idempotencia, rate limiting, auth, autorización, logs, migraciones, backups y privacidad.
