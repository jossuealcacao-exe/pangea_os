# Analytics y experimentación

## Orden

1. Objetivos.
2. KPIs.
3. Taxonomía.
4. Implementación.
5. Consentimiento.
6. QA.
7. Reportes.
8. Experimentos.

## Plan

```yaml
business_objective:
primary_conversion:
secondary_conversions:
funnel:
events:
properties:
user_properties:
error_events:
consent:
destinations:
qa:
```

## Reglas

- Nombres consistentes.
- No registrar PII.
- No duplicar eventos entre código y tag manager.
- Versionar cambios.
- Derivar eventos de acciones reales.

## Herramientas posibles

GA4, GTM, Matomo, Plausible, PostHog, Segment y RUM.

## Ecommerce

Cuando aplique: `view_item_list`, `select_item`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase`.

## Experimentación

Definir hipótesis, métrica primaria, guardrails, segmentos, duración, muestra, QA y criterio de decisión.

No llamar A/B test a comparar periodos sin control.
