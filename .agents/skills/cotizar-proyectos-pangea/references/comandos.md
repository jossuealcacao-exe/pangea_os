# Comandos del Cotizador Pangea

## Desde Codex o un chat compatible con skills

```text
$cotizar-proyectos-pangea analiza este brief y prepara una precotizacion editable.
```

```text
$cotizar-proyectos-pangea cotiza este proyecto, muestra primero el resumen interno y despues la propuesta para cliente.
```

```text
$cotizar-proyectos-pangea recalcula la propuesta con un precio objetivo de 65000 MXN antes de IVA.
```

```text
$cotizar-proyectos-pangea reduce el alcance para acercarnos al presupuesto del cliente sin aplicar un descuento silencioso.
```

```text
$cotizar-proyectos-pangea autoriza la version para cliente con pagos 40/30/30.
```

## Desde otra IA

1. Copiar el contenido de `assets/prompt-portable.md`.
2. Adjuntar o pegar el brief.
3. Guardar la respuesta como JSON.
4. Llevar el JSON a Pangea para calcular el precio.

## Desde terminal

Calcular y mostrar el resultado interno en JSON:

```bash
node .agents/skills/cotizar-proyectos-pangea/scripts/cotizar.mjs brief-normalizado.json --format json
```

Generar una propuesta en Markdown:

```bash
node .agents/skills/cotizar-proyectos-pangea/scripts/cotizar.mjs brief-normalizado.json --format markdown --output cotizacion.md
```

Usar otro catalogo de precios:

```bash
node .agents/skills/cotizar-proyectos-pangea/scripts/cotizar.mjs brief-normalizado.json --catalog catalogo-alternativo.json --format markdown
```

Ejecutar la prueba funcional:

```bash
node .agents/skills/cotizar-proyectos-pangea/scripts/test-cotizar.mjs
```

## Controles del propietario

Editar `owner_controls` en el brief normalizado:

```json
{
  "target_total_mxn": 65000,
  "adjustment_percent": 0,
  "risk_percent": 0.08,
  "include_iva": false,
  "authorized_for_client": false,
  "payment_schedule": [40, 30, 30]
}
```

- `target_total_mxn`: fija el precio comercial antes de IVA.
- `adjustment_percent`: aumenta o reduce la recomendacion de forma visible en el resumen interno.
- `risk_percent`: cambia la reserva interna de riesgo.
- `authorized_for_client`: permite generar una propuesta autorizada.
- `payment_schedule`: debe sumar 100.
