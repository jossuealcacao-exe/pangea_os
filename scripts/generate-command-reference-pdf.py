from __future__ import annotations

import json
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "pangea-os-ahp-plus-command-reference.pdf"


def sh(command: list[str]) -> str:
    try:
        return subprocess.check_output(command, cwd=ROOT, text=True).strip()
    except Exception:
        return "UNAVAILABLE"


def load_projects() -> list[dict]:
    path = ROOT / "agent" / "PROJECTS.json"
    if not path.exists():
        return []
    return json.loads(path.read_text(encoding="utf-8")).get("projects", [])


def para(text: str, style):
    return Paragraph(text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"), style)


def code(text: str, style):
    safe = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return Paragraph(f"<font name='Courier'>{safe}</font>", style)


def header(text: str, style):
    safe = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return Paragraph(f"<font color='white'><b>{safe}</b></font>", style)


def table(rows, col_widths=None):
    t = Table(rows, colWidths=col_widths, hAlign="LEFT", repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#32191a")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("FONTSIZE", (0, 0), (-1, -1), 8.2),
                ("LEADING", (0, 0), (-1, -1), 10),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d8ccc4")),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#fffaf3")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#fffaf3"), colors.HexColor("#f5eee6")]),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return t


def bullets(items, style):
    return ListFlowable(
        [ListItem(para(item, style), bulletColor=colors.HexColor("#7b1f2a")) for item in items],
        bulletType="bullet",
        leftIndent=14,
    )


def add_section(story, title, styles):
    story.append(Paragraph(title, styles["H2"]))
    story.append(Spacer(1, 0.08 * inch))


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="TitleWine",
            parent=styles["Title"],
            alignment=TA_CENTER,
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=29,
            textColor=colors.HexColor("#5a1420"),
            spaceAfter=10,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Subtitle",
            parent=styles["BodyText"],
            alignment=TA_CENTER,
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#5d504c"),
            spaceAfter=18,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H2",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=17,
            textColor=colors.HexColor("#5a1420"),
            spaceBefore=10,
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Small",
            parent=styles["BodyText"],
            fontSize=8.5,
            leading=11,
            textColor=colors.HexColor("#2f2523"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontSize=9.5,
            leading=13,
            textColor=colors.HexColor("#2f2523"),
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="CodeSmall",
            parent=styles["BodyText"],
            fontName="Courier",
            fontSize=7.6,
            leading=10,
            textColor=colors.HexColor("#231b1a"),
        )
    )

    branch = sh(["git", "branch", "--show-current"])
    commit = sh(["git", "rev-parse", "--short", "HEAD"])
    generated = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    projects = load_projects()

    story = []
    story.append(Paragraph("Pangea OS + AHP+ Command Reference", styles["TitleWine"]))
    story.append(
        Paragraph(
            f"Guia rapida para uso diario multiagente. Generado desde Pangea OS en {generated}. "
            f"Repo: branch {branch}, commit {commit}.",
            styles["Subtitle"],
        )
    )

    add_section(story, "1. Regla mental de uso", styles)
    story.append(
        bullets(
            [
                "Usa Pangea para operar proyectos web, seleccionar contexto, auditar, construir, hacer QA y preparar handoffs.",
                "Usa AHP+ para leer y escribir memoria permanente: estado, backlog, decisiones, riesgos, bugs, evidencia y handoffs.",
                "La verdad viva esta en Git y en /agent. El chat de una plataforma no sustituye al repositorio.",
                "Antes de editar: status, contexto, Git limpio o cambios entendidos, y alcance claro.",
            ],
            styles["Body"],
        )
    )

    add_section(story, "2. Primeros comandos de cada dia", styles)
    rows = [
        [header("Objetivo", styles["Small"]), header("Comando", styles["Small"]), header("Uso", styles["Small"])],
        [para("Entrar al sistema", styles["Small"]), code('cd "$HOME/Pangea OS"', styles["CodeSmall"]), para("Siempre empieza desde la raiz de Pangea.", styles["Small"])],
        [para("Ver si Pangea vive", styles["Small"]), code("node scripts/pangea.mjs doctor", styles["CodeSmall"]), para("Confirma alive, Git, AHP+ y proyectos detectados.", styles["Small"])],
        [para("Estado resumido", styles["Small"]), code("node scripts/pangea.mjs status", styles["CodeSmall"]), para("Muestra proyecto actual, lista registrada y Git.", styles["Small"])],
        [para("Conflictos", styles["Small"]), code("node scripts/pangea.mjs conflicts", styles["CodeSmall"]), para("Detecta instrucciones viejas o configuraciones que chocan.", styles["Small"])],
        [para("Validar AHP+", styles["Small"]), code("node tools/ahp-plus/ahp.mjs verify . --strict", styles["CodeSmall"]), para("Valida el plano /agent con reglas estrictas.", styles["Small"])],
        [para("Git rapido", styles["Small"]), code("git status -sb", styles["CodeSmall"]), para("Confirma rama, upstream y si hay cambios.", styles["Small"])],
    ]
    story.append(table(rows, [1.25 * inch, 2.45 * inch, 2.8 * inch]))

    add_section(story, "3. Pangea OS CLI local", styles)
    rows = [[header("Comando", styles["Small"]), header("Para que sirve", styles["Small"]), header("Frecuencia", styles["Small"])]]
    for cmd, meaning, freq in [
        ("node scripts/pangea.mjs doctor", "Verifica instalacion, Git, AHP+ y estado vivo.", "Diario"),
        ("node scripts/pangea.mjs scan .", "Reescanea proyectos y actualiza agent/PROJECTS.json.", "Despues de mover/agregar sitios"),
        ("node scripts/pangea.mjs status", "Muestra estado actual y proyectos registrados.", "Diario"),
        ("node scripts/pangea.mjs select <project-id>", "Activa un proyecto para trabajo posterior.", "Al cambiar de sitio"),
        ("node scripts/pangea.mjs project <project-id>", "Muestra perfil de un proyecto especifico.", "Antes de auditar o construir"),
        ("node scripts/pangea.mjs conflicts", "Lista conflictos de instrucciones o legacy adapters.", "Antes de usar agentes"),
        ("node scripts/pangea.mjs sync-status", "Revisa estado de sincronizacion esperado.", "Antes/despues de push o pull"),
        ("node scripts/pangea.mjs version", "Muestra version de Pangea.", "Ocasional"),
    ]:
        rows.append([code(cmd, styles["CodeSmall"]), para(meaning, styles["Small"]), para(freq, styles["Small"])])
    story.append(table(rows, [2.65 * inch, 2.75 * inch, 1.1 * inch]))

    add_section(story, "4. Comandos semanticos Pangea para AI agents", styles)
    rows = [[header("Chat command", styles["Small"]), header("Uso recomendado", styles["Small"])]]
    semantic = [
        ("/pangea status", "Lee el estado actual sin editar. Primer comando en cualquier agente."),
        ("/pangea bootstrap <project>", "Inspecciona un proyecto existente, registra stack y crea contexto inicial."),
        ("/pangea audit <project>", "Auditoria read-only de arquitectura, UX, SEO, rendimiento, seguridad y Git."),
        ("/pangea plan <project>", "Propone un plan antes de editar."),
        ("/pangea build <project> <task>", "Implementa una tarea con preflight, QA y registro AHP+."),
        ("/pangea qa <project>", "Corre validaciones disponibles y separa PASS, FAIL, NOT_RUN y BLOCKED."),
        ("/pangea handoff <platform>", "Genera handoff atado a rama, commit, evidencia y siguiente accion."),
        ("/pangea promote-pattern", "Convierte un patron probado en candidato reutilizable, con sanitizacion y QA."),
        ("/pangea template-release", "Audita un template comercial antes de publicarlo o venderlo."),
        ("/agent ...", "Entra al plano AHP+ para memoria, registros, evidencia, locks y handoffs."),
    ]
    for cmd, meaning in semantic:
        rows.append([code(cmd, styles["CodeSmall"]), para(meaning, styles["Small"])])
    story.append(table(rows, [2.15 * inch, 4.35 * inch]))

    story.append(PageBreak())
    add_section(story, "5. AHP+ lectura - comandos de consulta", styles)
    rows = [[header("Chat", styles["Small"]), header("CLI en Pangea", styles["Small"]), header("Resultado", styles["Small"])]]
    read_cmds = [
        ("/agent verify", "node tools/ahp-plus/ahp.mjs verify .", "Valida estructura, JSON, niveles y handoffs."),
        ("/agent verify --strict", "node tools/ahp-plus/ahp.mjs verify . --strict", "Validacion estricta para cerrar trabajo."),
        ("/agent status", "node tools/ahp-plus/ahp.mjs status .", "Estado, Git, conteos, locks y warnings."),
        ("/agent context <project>", "node tools/ahp-plus/ahp.mjs context . --project <id>", "Contexto operativo de un proyecto."),
        ("/agent brief", "node tools/ahp-plus/ahp.mjs brief .", "Regenera agent/INDEX.md."),
        ("/agent backlog <project>", "node tools/ahp-plus/ahp.mjs backlog . --project <id>", "Backlog y tareas no terminales."),
        ("/agent decisions", "node tools/ahp-plus/ahp.mjs decisions .", "Decisiones registradas."),
        ("/agent tasks", "node tools/ahp-plus/ahp.mjs tasks .", "Tareas registradas."),
        ("/agent bugs", "node tools/ahp-plus/ahp.mjs bugs .", "Bugs registrados."),
        ("/agent risks", "node tools/ahp-plus/ahp.mjs risks .", "Riesgos registrados."),
        ("/agent qa", "node tools/ahp-plus/ahp.mjs qa .", "Recibos QA."),
        ("/agent evidence", "node tools/ahp-plus/ahp.mjs evidence .", "Evidencia registrada."),
        ("/agent history", "node tools/ahp-plus/ahp.mjs history .", "Sesiones y handoffs."),
    ]
    for chat, cli, result in read_cmds:
        rows.append([code(chat, styles["CodeSmall"]), code(cli, styles["CodeSmall"]), para(result, styles["Small"])])
    story.append(table(rows, [1.45 * inch, 3.15 * inch, 1.9 * inch]))

    add_section(story, "6. AHP+ escritura - memoria permanente", styles)
    rows = [[header("Objetivo", styles["Small"]), header("Comando base", styles["Small"]), header("Nota de seguridad", styles["Small"])]]
    write_cmds = [
        ("Inicializar", 'node tools/ahp-plus/ahp.mjs init . --owner "Jossue Alcala" --project pangea-os', "Solo al crear o reparar /agent."),
        ("Actualizar estado", 'node tools/ahp-plus/ahp.mjs set-state . --project <id> --phase IN_PROGRESS --objective "..." --next-action "..." --confidence USER_CONFIRMED', "Usa despues de cambiar foco o fase."),
        ("Registrar tarea", 'node tools/ahp-plus/ahp.mjs record task . --title "..." --status IN_PROGRESS --confidence USER_CONFIRMED', "No sustituye un issue si necesitas gestion externa."),
        ("Registrar decision", 'node tools/ahp-plus/ahp.mjs record decision . --title "..." --status PROPOSED --confidence USER_CONFIRMED', "Decision ACCEPTED requiere autoridad o evidencia."),
        ("Registrar evidencia", 'node tools/ahp-plus/ahp.mjs record evidence . --title "Build" --type command --locator "npm run build" --result PASS --confidence VERIFIED', "PASS exige evidencia real."),
        ("Cerrar registro", 'node tools/ahp-plus/ahp.mjs close <record-id> . --status COMPLETED --reason "..."', "No cierres si queda QA pendiente."),
        ("Superseder decision", 'node tools/ahp-plus/ahp.mjs supersede <decision-id> . --title "..."', "No edites decisiones aceptadas en silencio."),
        ("Handoff", 'node tools/ahp-plus/ahp.mjs handoff . --from codex --to cursor --summary "..."', "El receptor debe revalidar Git y evidencia."),
        ("Lock", 'node tools/ahp-plus/ahp.mjs lock . --scope "<path>" --owner "<agent>" --minutes 60', "Reduce colisiones, no reemplaza Git."),
        ("Unlock", 'node tools/ahp-plus/ahp.mjs unlock <lock-id> . --owner "<agent>"', "Solo el owner debe liberar el lock."),
    ]
    for obj, cmd, note in write_cmds:
        rows.append([para(obj, styles["Small"]), code(cmd, styles["CodeSmall"]), para(note, styles["Small"])])
    story.append(table(rows, [1.15 * inch, 3.95 * inch, 1.4 * inch]))

    story.append(PageBreak())
    add_section(story, "7. Control de concurrencia y Git", styles)
    story.append(para("Usa estos comandos alrededor de cualquier trabajo que pueda cambiar archivos, memoria o ramas.", styles["Body"]))
    rows = [[header("Momento", styles["Small"]), header("Comando", styles["Small"]), header("Criterio", styles["Small"])]]
    git_cmds = [
        ("Antes de editar", "git status -sb", "Debes entender cambios existentes."),
        ("Antes de escribir AHP+", "git rev-parse HEAD", "Usa el commit como --expected-base si hay riesgo de colision."),
        ("Escritura AHP+ segura", "node tools/ahp-plus/ahp.mjs set-state . --expected-base <commit> ...", "Falla si otro agente cambio la base."),
        ("Despues de cambios", "git diff --stat && git diff --check", "Resumen y errores de espacios."),
        ("Commit local", 'git add -A && git commit -m "tipo: descripcion"', "Solo con alcance claro y QA registrada."),
        ("Subir", "git push", "Accion externa. Requiere intencion explicita."),
        ("Traer remoto", "git fetch --all --prune", "Antes de continuar desde otra maquina/agente."),
        ("Comparar", "git status -sb && git branch -vv", "Confirma ahead/behind."),
    ]
    for moment, cmd, criterion in git_cmds:
        rows.append([para(moment, styles["Small"]), code(cmd, styles["CodeSmall"]), para(criterion, styles["Small"])])
    story.append(table(rows, [1.3 * inch, 3.2 * inch, 2.0 * inch]))

    add_section(story, "8. Atajos por plataforma", styles)
    rows = [[header("Plataforma", styles["Small"]), header("Comando o entrada", styles["Small"]), header("Notas", styles["Small"])]]
    platform_cmds = [
        ("Cursor", "/pangea status, /bootstrap <project>, /audit <project>, /build <task>, /qa, /handoff", "Usa .cursor/commands y AGENTS.md."),
        ("Claude Code", "Usa la skill pangea o escribe /pangea status", "Lee CLAUDE.md y .claude/skills."),
        ("Codex", "$pangea o $agent", "Lee AGENTS.md y .agents/skills."),
        ("OpenCode", "/pangea status, /agent status, /bootstrap, /audit, /build, /qa", "Usa .opencode/commands y agentes."),
        ("ChatGPT Plus/iOS", "/pangea status, /agent context <project>, /agent backlog <project>", "Requiere repo/archivos accesibles por GitHub o contexto subido."),
        ("Ollama", "Usarlo mediante OpenCode u otro host con herramientas", "Ollama solo ejecuta el modelo; no da Git ni archivos por si mismo."),
    ]
    for platform, cmd, note in platform_cmds:
        rows.append([para(platform, styles["Small"]), code(cmd, styles["CodeSmall"]), para(note, styles["Small"])])
    story.append(table(rows, [1.25 * inch, 3.15 * inch, 2.1 * inch]))

    add_section(story, "9. Flujos frecuentes", styles)
    flows = [
        ("Arrancar sesion", 'cd "$HOME/Pangea OS" && node scripts/pangea.mjs doctor && node scripts/pangea.mjs status && node tools/ahp-plus/ahp.mjs verify . --strict'),
        ("Cambiar proyecto activo", "node scripts/pangea.mjs select <project-id> && node scripts/pangea.mjs project <project-id>"),
        ("Registrar cambio de fase", 'node tools/ahp-plus/ahp.mjs set-state . --project <id> --phase IN_PROGRESS --objective "..." --next-action "..." --confidence USER_CONFIRMED'),
        ("Preparar handoff", 'node tools/ahp-plus/ahp.mjs handoff . --from <agent> --to <agent> --summary "..."'),
        ("Cerrar trabajo", "node tools/ahp-plus/ahp.mjs verify . --strict && git status -sb && git diff --stat"),
    ]
    for title, cmd in flows:
        story.append(Paragraph(f"<b>{title}</b>", styles["Body"]))
        story.append(code(cmd, styles["CodeSmall"]))
        story.append(Spacer(1, 0.05 * inch))

    add_section(story, "10. Proyectos registrados ahora", styles)
    rows = [[header("Project ID", styles["Small"]), header("Stack", styles["Small"]), header("Git", styles["Small"]), header("Estado", styles["Small"])]]
    for p in projects:
        git = p.get("git", {})
        detected = p.get("detected", {})
        stack = ", ".join(detected.get("stack", [])) or "-"
        git_text = f"{git.get('branch') or '-'} / {git.get('working_tree') or '-'}"
        rows.append([code(p.get("project_id", "-"), styles["CodeSmall"]), para(stack, styles["Small"]), para(git_text, styles["Small"]), para(p.get("status", "-"), styles["Small"])])
    story.append(table(rows, [1.65 * inch, 2.0 * inch, 1.4 * inch, 1.45 * inch]))

    story.append(PageBreak())
    add_section(story, "11. Reglas contra errores y alucinaciones", styles)
    story.append(
        bullets(
            [
                "No declares que una prueba paso si no hay salida de comando, evidencia o fuente primaria.",
                "No uses memoria de chat como verdad si Git o /agent dicen otra cosa.",
                "No mezcles proyectos: selecciona uno, carga su perfil y trabaja dentro de su alcance.",
                "No edites decisiones ACCEPTED; crea una decision que supersede a la anterior.",
                "No hagas push, deploy, publish Shopify, borrados o cambios externos sin autorizacion explicita.",
                "Usa VERIFICADO solo cuando lo viste en herramienta, archivo, comando, commit o fuente primaria.",
                "Si hay cambios locales de otro agente, entiende el diff antes de tocar esos archivos.",
                "Si el handoff viene de otra plataforma, revalida rama, commit, working tree, locks y evidencia.",
            ],
            styles["Body"],
        )
    )

    add_section(story, "12. Cierre rapido", styles)
    story.append(para("Checklist minimo antes de cerrar una sesion:", styles["Body"]))
    story.append(
        bullets(
            [
                "node scripts/pangea.mjs doctor",
                "node scripts/pangea.mjs conflicts",
                "node tools/ahp-plus/ahp.mjs verify . --strict",
                "git status -sb",
                "Registrar evidencia o handoff si hubo cambios relevantes.",
            ],
            styles["Body"],
        )
    )

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#6b5c58"))
        canvas.drawString(0.7 * inch, 0.45 * inch, "Pangea OS + AHP+ Command Reference")
        canvas.drawRightString(7.8 * inch, 0.45 * inch, f"Pagina {doc.page}")
        canvas.restoreState()

    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        rightMargin=0.55 * inch,
        leftMargin=0.55 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.65 * inch,
        title="Pangea OS + AHP+ Command Reference",
        author="Jossue Alcala",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUT)


if __name__ == "__main__":
    build()
