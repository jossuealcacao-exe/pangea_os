#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultCatalogPath = path.join(scriptDir, "..", "references", "catalogo-precios.json");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function roundRange(value) {
  return Math.round(value / 500) * 500;
}

function formatMoney(value, catalog) {
  return new Intl.NumberFormat(catalog.currency.locale, {
    style: "currency",
    currency: catalog.currency.code,
    maximumFractionDigits: 0
  }).format(value);
}

function textList(items, emptyText) {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];
  if (safeItems.length === 0) return `- ${emptyText}`;
  return safeItems.map((item) => `- ${item}`).join("\n");
}

function choosePaymentSchedule(input, catalog) {
  const supplied = input.owner_controls?.payment_schedule;
  if (Array.isArray(supplied) && supplied.length > 0) {
    const sum = supplied.reduce((total, value) => total + value, 0);
    assert(Math.abs(sum - 100) < 0.001, "owner_controls.payment_schedule debe sumar 100");
    return supplied;
  }

  const weeks = Number(input.project.timeline_weeks || 0);
  if (weeks > 12) return catalog.quote_defaults.payment_schedule_long;
  if (weeks > 3) return catalog.quote_defaults.payment_schedule_medium;
  return catalog.quote_defaults.payment_schedule_short;
}

function validateInput(input, catalog) {
  assert(input && typeof input === "object", "El brief normalizado debe ser un objeto JSON");
  assert(input.client?.name, "Falta client.name");
  assert(input.project?.name, "Falta project.name");
  assert(input.project?.objective, "Falta project.objective");
  assert(input.project?.summary, "Falta project.summary");
  assert(input.service_id, "Falta service_id");
  assert(catalog.services[input.service_id], `service_id desconocido: ${input.service_id}`);

  const complexity = input.complexity || "standard";
  const urgency = input.urgency || "normal";
  assert(catalog.complexity_multipliers[complexity] !== undefined, `complexity desconocida: ${complexity}`);
  assert(catalog.urgency_multipliers[urgency] !== undefined, `urgency desconocida: ${urgency}`);

  for (const [moduleId, quantity] of Object.entries(input.modules || {})) {
    assert(catalog.modules[moduleId], `Modulo desconocido: ${moduleId}`);
    assert(Number.isInteger(quantity) && quantity >= 0, `Cantidad invalida para ${moduleId}`);
  }

  const controls = input.owner_controls || {};
  if (controls.risk_percent !== undefined && controls.risk_percent !== null) {
    assert(controls.risk_percent >= 0 && controls.risk_percent <= 1, "owner_controls.risk_percent debe estar entre 0 y 1");
  }
  if (controls.adjustment_percent !== undefined) {
    assert(controls.adjustment_percent >= -100, "owner_controls.adjustment_percent no puede ser menor a -100");
  }
  if (controls.target_total_mxn !== undefined && controls.target_total_mxn !== null) {
    assert(controls.target_total_mxn >= 0, "owner_controls.target_total_mxn no puede ser negativo");
  }
}

export function calculateQuote(input, catalog) {
  validateInput(input, catalog);

  const service = catalog.services[input.service_id];
  const complexity = input.complexity || "standard";
  const urgency = input.urgency || "normal";
  const complexityMultiplier = catalog.complexity_multipliers[complexity];
  const urgencyMultiplier = catalog.urgency_multipliers[urgency];
  const controls = input.owner_controls || {};
  const riskPercent = controls.risk_percent ?? catalog.quote_defaults.risk_percent;
  const adjustmentPercent = controls.adjustment_percent ?? 0;

  const lineItems = [{
    id: input.service_id,
    name: service.name,
    quantity: 1,
    unit_price_mxn: service.base_price_mxn,
    total_mxn: service.base_price_mxn,
    kind: "base"
  }];

  if (complexityMultiplier !== 1) {
    const complexityAmount = roundMoney(service.base_price_mxn * (complexityMultiplier - 1));
    lineItems.push({
      id: `complexity_${complexity}`,
      name: `Ajuste por complejidad: ${complexity}`,
      quantity: 1,
      unit_price_mxn: complexityAmount,
      total_mxn: complexityAmount,
      kind: "complexity"
    });
  }

  for (const [moduleId, quantity] of Object.entries(input.modules || {})) {
    if (quantity === 0) continue;
    const module = catalog.modules[moduleId];
    lineItems.push({
      id: moduleId,
      name: module.name,
      quantity,
      unit_price_mxn: module.unit_price_mxn,
      total_mxn: roundMoney(module.unit_price_mxn * quantity),
      kind: "module"
    });
  }

  const scopeSubtotal = roundMoney(lineItems.reduce((total, item) => total + item.total_mxn, 0));
  const urgencyAmount = roundMoney(scopeSubtotal * (urgencyMultiplier - 1));
  if (urgencyAmount !== 0) {
    lineItems.push({
      id: `urgency_${urgency}`,
      name: `Ajuste por prioridad: ${urgency}`,
      quantity: 1,
      unit_price_mxn: urgencyAmount,
      total_mxn: urgencyAmount,
      kind: "urgency"
    });
  }

  const subtotalAfterUrgency = roundMoney(scopeSubtotal + urgencyAmount);
  const commercialAdjustment = roundMoney(subtotalAfterUrgency * (adjustmentPercent / 100));
  if (commercialAdjustment !== 0) {
    lineItems.push({
      id: "owner_commercial_adjustment",
      name: `Ajuste comercial autorizado (${adjustmentPercent}%)`,
      quantity: 1,
      unit_price_mxn: commercialAdjustment,
      total_mxn: commercialAdjustment,
      kind: "owner_adjustment"
    });
  }

  const beforeRisk = roundMoney(subtotalAfterUrgency + commercialAdjustment);
  const riskAmount = roundMoney(beforeRisk * riskPercent);
  if (riskAmount !== 0) {
    lineItems.push({
      id: "risk_reserve",
      name: `Reserva de riesgo (${roundMoney(riskPercent * 100)}%)`,
      quantity: 1,
      unit_price_mxn: riskAmount,
      total_mxn: riskAmount,
      kind: "risk"
    });
  }

  const systemRecommendedNet = roundMoney(beforeRisk + riskAmount);
  const suggestedFloor = roundRange(systemRecommendedNet * (1 - catalog.quote_defaults.range_low_percent));
  const suggestedCeiling = roundRange(systemRecommendedNet * (1 + catalog.quote_defaults.range_high_percent));
  const targetTotal = controls.target_total_mxn ?? null;
  const selectedNet = targetTotal === null ? systemRecommendedNet : roundMoney(targetTotal);
  const targetAdjustment = targetTotal === null ? 0 : roundMoney(selectedNet - systemRecommendedNet);

  if (targetAdjustment !== 0) {
    lineItems.push({
      id: "owner_target_adjustment",
      name: "Ajuste al precio objetivo definido por el propietario",
      quantity: 1,
      unit_price_mxn: targetAdjustment,
      total_mxn: targetAdjustment,
      kind: "owner_target"
    });
  }

  const includeIva = controls.include_iva ?? catalog.currency.tax_included_by_default;
  const taxAmount = includeIva ? roundMoney(selectedNet * catalog.currency.tax_rate) : 0;
  const totalWithTax = roundMoney(selectedNet + taxAmount);
  const paymentSchedule = choosePaymentSchedule(input, catalog);

  const warnings = [];
  if (catalog.meta.owner_review_required) warnings.push("El catalogo de precios sigue pendiente de aprobacion del propietario.");
  if (targetTotal !== null && selectedNet < suggestedFloor) warnings.push("El precio objetivo esta por debajo del piso sugerido por el sistema.");
  if ((input.open_questions || []).length > 0) warnings.push("Existen preguntas abiertas que pueden cambiar alcance, precio o calendario.");
  if ((input.confidence || "medium") === "low") warnings.push("La confianza del brief es baja; presentar solo como estimacion exploratoria.");
  if ((input.proposal_stage || "prequote") === "closed_quote" && (input.open_questions || []).length > 0) {
    warnings.push("La propuesta se marco como cerrada, pero todavia tiene preguntas abiertas.");
  }

  const authorized = Boolean(controls.authorized_for_client);
  let documentStatus = "BORRADOR INTERNO - NO ENVIAR";
  if (catalog.meta.owner_review_required) {
    documentStatus = "BORRADOR INTERNO - CATALOGO PENDIENTE DE APROBACION";
  } else if (authorized && (input.proposal_stage || "prequote") === "closed_quote" && (input.open_questions || []).length === 0) {
    documentStatus = "COTIZACION COMERCIAL";
  } else if (authorized) {
    documentStatus = "PRECOTIZACION AUTORIZADA";
  }

  return {
    catalog: {
      id: catalog.meta.catalog_id,
      version: catalog.meta.version,
      status: catalog.meta.status,
      owner_review_required: catalog.meta.owner_review_required
    },
    status: {
      document: documentStatus,
      authorized_for_client: authorized,
      client_ready: authorized && !catalog.meta.owner_review_required,
      proposal_stage: input.proposal_stage || "prequote",
      confidence: input.confidence || "medium"
    },
    client: input.client,
    project: input.project,
    service: {
      id: input.service_id,
      name: service.name,
      family: service.family,
      included: service.included
    },
    scope: {
      complexity,
      urgency,
      deliverables: input.project.deliverables || service.included,
      assumptions: input.assumptions || [],
      exclusions: input.exclusions || [],
      open_questions: input.open_questions || [],
      third_party_costs: input.third_party_costs || []
    },
    pricing: {
      currency: catalog.currency.code,
      line_items: lineItems,
      scope_subtotal_mxn: scopeSubtotal,
      system_recommended_net_mxn: systemRecommendedNet,
      suggested_range_mxn: {
        floor: suggestedFloor,
        ceiling: suggestedCeiling
      },
      owner_selected_net_mxn: selectedNet,
      tax_included: includeIva,
      tax_rate: catalog.currency.tax_rate,
      tax_mxn: taxAmount,
      total_mxn: totalWithTax,
      payment_schedule: paymentSchedule
    },
    warnings
  };
}

export function renderMarkdown(quote, catalog) {
  const visibleScopeItems = quote.pricing.line_items
    .filter((item) => ["base", "module"].includes(item.kind))
    .map((item) => `- ${item.name}${item.quantity > 1 ? ` x ${item.quantity}` : ""}`)
    .join("\n");
  const payments = quote.pricing.payment_schedule
    .map((percent, index) => `- Pago ${index + 1}: ${percent}% (${formatMoney(quote.pricing.owner_selected_net_mxn * percent / 100, catalog)} antes de IVA)`)
    .join("\n");
  const timeline = quote.project.timeline_weeks
    ? `${quote.project.timeline_weeks} semanas, sujeto a accesos, contenido y aprobaciones del cliente.`
    : "Se confirma al cerrar alcance y dependencias.";
  const taxText = quote.pricing.tax_included
    ? `IVA (${quote.pricing.tax_rate * 100}%): ${formatMoney(quote.pricing.tax_mxn, catalog)}. Total con IVA: ${formatMoney(quote.pricing.total_mxn, catalog)}.`
    : "IVA no incluido; se agrega cuando corresponda.";

  return `# ${quote.status.document}

## Propuesta para ${quote.client.company || quote.client.name}

**Proyecto:** ${quote.project.name}<br>
**Vigencia:** ${catalog.quote_defaults.validity_days} dias naturales

### Lo que vamos a resolver

${quote.project.objective}

${quote.project.summary}

### Alcance y entregables

${textList(quote.scope.deliverables, "Se define al cerrar el brief")}

### Calendario estimado

${timeline}

### Inversion

${visibleScopeItems}

**Subtotal antes de IVA: ${formatMoney(quote.pricing.owner_selected_net_mxn, catalog)}**

${taxText}

### Forma de pago

${payments}

### Supuestos

${textList(quote.scope.assumptions, "Sin supuestos adicionales registrados")}

### No incluido

${textList(quote.scope.exclusions, "Todo lo no descrito en alcance y entregables")}

### Costos de terceros

${textList(quote.scope.third_party_costs, "Se confirmaran segun plataforma y consumo")}

### Siguiente paso

Confirmar alcance, calendario e inversion. La ejecucion inicia con la aceptacion de la propuesta y el primer pago.

— Jossue Alcala<br>
Head of E-commerce & Digital Growth<br>
Shopify Product · UX/CRO · Desarrollo web · IA aplicada
`;
}

function parseArgs(argv) {
  const args = { input: null, catalog: defaultCatalogPath, format: "json", output: null };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("-") && !args.input) args.input = token;
    else if (token === "--catalog") args.catalog = argv[++index];
    else if (token === "--format") args.format = argv[++index];
    else if (token === "--output") args.output = argv[++index];
    else if (token === "--help" || token === "-h") args.help = true;
    else throw new Error(`Argumento desconocido: ${token}`);
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.input) {
    process.stdout.write("Uso: node cotizar.mjs <brief.json> [--catalog catalogo.json] [--format json|markdown] [--output archivo]\n");
    process.exitCode = args.help ? 0 : 1;
    return;
  }
  assert(["json", "markdown"].includes(args.format), "--format debe ser json o markdown");

  const [input, catalog] = await Promise.all([
    readFile(path.resolve(args.input), "utf8").then(JSON.parse),
    readFile(path.resolve(args.catalog), "utf8").then(JSON.parse)
  ]);
  const quote = calculateQuote(input, catalog);
  const output = args.format === "markdown"
    ? renderMarkdown(quote, catalog)
    : `${JSON.stringify(quote, null, 2)}\n`;

  if (args.output) await writeFile(path.resolve(args.output), output, "utf8");
  else process.stdout.write(output);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main().catch((error) => {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exitCode = 1;
  });
}
