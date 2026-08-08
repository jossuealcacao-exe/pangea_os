# Prompt portable para normalizar un brief

Analiza el brief adjunto o pegado y devuelve unicamente un objeto JSON valido. No calcules precios ni inventes datos.

El JSON debe cumplir este contrato:

- `client`: `name`, `company` y `market`.
- `project`: `name`, `objective`, `summary`, `timeline_weeks`, `deliverables` y `success_criteria`.
- `service_id`: una de estas opciones: `discovery_scope`, `landing_conversion`, `corporate_site`, `editorial_catalog`, `shopify_store_setup`, `shopify_custom_theme`, `ux_cro_audit`, `ux_cro_sprint`, `ecommerce_optimization`, `analytics_growth_setup`, `ai_automation_prototype`, `web_app_mvp`, `custom_business_system` o `shopify_app`.
- `complexity`: `low`, `standard`, `high` o `very_high`.
- `urgency`: `normal`, `priority` o `critical`.
- `modules`: objeto de cantidades. Usa solo IDs conocidos por el catalogo de Pangea; si no conoces el ID, describe la necesidad en `open_questions`.
- `assumptions`, `exclusions`, `open_questions` y `third_party_costs`: listas de texto.
- `confidence`: `low`, `medium` o `high`.
- `proposal_stage`: `exploratory_estimate`, `prequote` o `closed_quote`.
- `owner_controls`: usa `target_total_mxn: null`, `adjustment_percent: 0`, `risk_percent: null`, `include_iva: false`, `authorized_for_client: false` y una forma de pago que sume 100.

Reglas:

1. Conserva la intencion y los hechos del brief.
2. Coloca cualquier dato no confirmado en `assumptions` u `open_questions`.
3. No conviertas deseos generales en funciones concretas sin marcar la inferencia.
4. No incluyas comentarios, Markdown ni texto fuera del JSON.
5. El precio se calculara despues dentro de Pangea OS con su catalogo controlado por el propietario.
