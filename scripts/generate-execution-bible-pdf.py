from __future__ import annotations

import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs" / "PANGEA_OS_EXECUTION_BIBLE.md"
OUT = ROOT / "output" / "pdf" / "pangea-os-execution-bible.pdf"


def sh(command: list[str]) -> str:
    try:
        return subprocess.check_output(command, cwd=ROOT, text=True).strip()
    except Exception:
        return "UNAVAILABLE"


def esc(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def inline(text: str) -> str:
    safe = esc(text)
    safe = re.sub(r"`([^`]+)`", r"<font name='Courier'>\1</font>", safe)
    safe = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", safe)
    return safe


def split_row(line: str) -> list[str]:
    return [part.strip() for part in line.strip().strip("|").split("|")]


def make_table(lines: list[str], styles) -> Table:
    rows = []
    for idx, line in enumerate(lines):
        cells = split_row(line)
        rows.append([Paragraph(inline(cell), styles["TableHead" if idx == 0 else "TableCell"]) for cell in cells])
    col_count = max(len(r) for r in rows)
    widths = [6.6 * inch / col_count] * col_count
    t = Table(rows, colWidths=widths, hAlign="LEFT", repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#351719")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("BACKGROUND", (0, 1), (-1, -1), colors.HexColor("#fffaf4")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#fffaf4"), colors.HexColor("#f4eee7")]),
                ("GRID", (0, 0), (-1, -1), 0.35, colors.HexColor("#d7c9bf")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return t


def build_story(markdown: str, styles):
    story = []
    lines = markdown.splitlines()
    i = 0
    in_code = False
    code_lines: list[str] = []

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if stripped.startswith("```"):
            if not in_code:
                in_code = True
                code_lines = []
            else:
                in_code = False
                story.append(Preformatted("\n".join(code_lines), styles["CodeBlock"]))
                story.append(Spacer(1, 0.08 * inch))
            i += 1
            continue

        if in_code:
            code_lines.append(line)
            i += 1
            continue

        if not stripped or stripped == "---":
            story.append(Spacer(1, 0.05 * inch))
            i += 1
            continue

        if stripped.startswith("|") and i + 1 < len(lines) and lines[i + 1].strip().startswith("|---"):
            table_lines = [stripped]
            i += 2
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i].strip())
                i += 1
            story.append(make_table(table_lines, styles))
            story.append(Spacer(1, 0.1 * inch))
            continue

        if stripped.startswith("# "):
            story.append(Paragraph(inline(stripped[2:]), styles["TitleWine"]))
        elif stripped.startswith("## "):
            story.append(Paragraph(inline(stripped[3:]), styles["H2"]))
        elif stripped.startswith("### "):
            story.append(Paragraph(inline(stripped[4:]), styles["H3"]))
        elif stripped.startswith("- "):
            items = []
            while i < len(lines) and lines[i].strip().startswith("- "):
                items.append(ListItem(Paragraph(inline(lines[i].strip()[2:]), styles["Body"]), bulletColor=colors.HexColor("#7d1d2a")))
                i += 1
            story.append(ListFlowable(items, bulletType="bullet", leftIndent=14))
            story.append(Spacer(1, 0.05 * inch))
            continue
        else:
            story.append(Paragraph(inline(stripped), styles["Body"]))
        i += 1

    return story


def build():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="TitleWine",
            parent=styles["Title"],
            fontName="Helvetica-Bold",
            fontSize=23,
            leading=28,
            textColor=colors.HexColor("#5a1420"),
            spaceAfter=12,
            alignment=TA_LEFT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H2",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=14,
            leading=18,
            textColor=colors.HexColor("#5a1420"),
            spaceBefore=10,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="H3",
            parent=styles["Heading3"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=colors.HexColor("#351719"),
            spaceBefore=7,
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["BodyText"],
            fontSize=9,
            leading=12,
            textColor=colors.HexColor("#2f2523"),
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableCell",
            parent=styles["BodyText"],
            fontSize=7.6,
            leading=9.5,
            textColor=colors.HexColor("#2f2523"),
        )
    )
    styles.add(
        ParagraphStyle(
            name="TableHead",
            parent=styles["BodyText"],
            fontSize=7.6,
            leading=9.5,
            textColor=colors.white,
            fontName="Helvetica-Bold",
        )
    )
    styles.add(
        ParagraphStyle(
            name="CodeBlock",
            parent=styles["Code"],
            fontName="Courier",
            fontSize=7.2,
            leading=9.3,
            leftIndent=8,
            rightIndent=8,
            backColor=colors.HexColor("#f2ebe4"),
            borderColor=colors.HexColor("#d7c9bf"),
            borderWidth=0.35,
            borderPadding=5,
            spaceAfter=7,
        )
    )

    markdown = SOURCE.read_text(encoding="utf-8")
    branch = sh(["git", "branch", "--show-current"])
    commit = sh(["git", "rev-parse", "--short", "HEAD"])
    generated = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    story = [
        Paragraph("Pangea OS Execution Bible", styles["TitleWine"]),
        Paragraph(
            f"Documento maestro de ejecuciones diarias. Generado {generated}. Branch {branch}, commit base {commit}.",
            styles["Body"],
        ),
        Spacer(1, 0.1 * inch),
    ]
    story.extend(build_story(markdown, styles)[1:])

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#6b5c58"))
        canvas.drawString(0.55 * inch, 0.42 * inch, "Pangea OS Execution Bible")
        canvas.drawRightString(8.0 * inch, 0.42 * inch, f"Pagina {doc.page}")
        canvas.restoreState()

    doc = SimpleDocTemplate(
        str(OUT),
        pagesize=letter,
        rightMargin=0.45 * inch,
        leftMargin=0.45 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.62 * inch,
        title="Pangea OS Execution Bible",
        author="Jossue Alcala",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUT)


if __name__ == "__main__":
    build()
