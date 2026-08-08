#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { calculateQuote, renderMarkdown } from "./cotizar.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const catalog = JSON.parse(await readFile(path.join(scriptDir, "..", "references", "catalogo-precios.json"), "utf8"));

const landingBrief = {
  client: {name: "Ana", company: "Marca Ejemplo", market: "Guadalajara"},
  project: {
    name: "Landing para nuevo servicio",
    objective: "Generar solicitudes calificadas.",
    summary: "Una landing responsive con formulario avanzado y copy para cinco bloques.",
    timeline_weeks: 4,
    deliverables: ["Landing responsive", "Formulario avanzado", "Medicion de conversion"]
  },
  service_id: "landing_conversion",
  complexity: "standard",
  urgency: "normal",
  modules: {advanced_form: 1, content_copy_page: 1},
  assumptions: ["La identidad visual esta disponible"],
  exclusions: ["Pauta digital"],
  open_questions: [],
  third_party_costs: ["Dominio y hosting"],
  confidence: "high",
  proposal_stage: "prequote",
  owner_controls: {
    target_total_mxn: null,
    adjustment_percent: 0,
    risk_percent: null,
    include_iva: false,
    authorized_for_client: false,
    payment_schedule: [40, 30, 30]
  }
};

const landingQuote = calculateQuote(landingBrief, catalog);
assert.equal(landingQuote.pricing.scope_subtotal_mxn, 33000);
assert.equal(landingQuote.pricing.system_recommended_net_mxn, 35640);
assert.equal(landingQuote.pricing.owner_selected_net_mxn, 35640);
assert.equal(landingQuote.pricing.total_mxn, 35640);
assert.equal(landingQuote.status.client_ready, false);
assert.match(renderMarkdown(landingQuote, catalog), /BORRADOR INTERNO/);
assert.match(renderMarkdown(landingQuote, catalog), /\$35,640/);
assert.doesNotMatch(renderMarkdown(landingQuote, catalog), /Reserva de riesgo/);
assert.doesNotMatch(renderMarkdown(landingQuote, catalog), /Ajuste.*propietario/);

const systemBrief = {
  ...landingBrief,
  project: {
    name: "Portal operativo",
    objective: "Centralizar solicitudes y seguimiento.",
    summary: "Sistema con autenticacion, dashboard e integracion externa.",
    timeline_weeks: 16,
    deliverables: ["Portal responsive", "Roles", "Dashboard", "Integracion API"]
  },
  service_id: "web_app_mvp",
  complexity: "high",
  urgency: "priority",
  modules: {auth_roles: 1, dashboard: 1, custom_api: 1},
  confidence: "medium",
  owner_controls: {
    target_total_mxn: 180000,
    adjustment_percent: 0,
    risk_percent: 0.1,
    include_iva: true,
    authorized_for_client: true,
    payment_schedule: [30, 25, 25, 20]
  }
};

const systemQuote = calculateQuote(systemBrief, catalog);
assert.equal(systemQuote.pricing.owner_selected_net_mxn, 180000);
assert.equal(systemQuote.pricing.tax_mxn, 28800);
assert.equal(systemQuote.pricing.total_mxn, 208800);
assert.ok(systemQuote.warnings.some((warning) => warning.includes("debajo del piso")));
assert.equal(systemQuote.status.client_ready, true, "El catalogo aprobado permite autorizar una precotizacion para cliente");
assert.equal(systemQuote.status.document, "PRECOTIZACION AUTORIZADA");

process.stdout.write("cotizar-proyectos-pangea: 2 escenarios aprobados\n");
