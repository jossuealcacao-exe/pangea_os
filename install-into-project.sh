#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Uso: $0 /ruta/al/proyecto" >&2
  exit 1
fi

SOURCE_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET="$(mkdir -p "$1" && cd "$1" && pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="$TARGET/.web-os-backup-$STAMP"

backup_path() {
  local rel="$1"
  if [[ -e "$TARGET/$rel" ]]; then
    mkdir -p "$BACKUP/$(dirname "$rel")"
    cp -R "$TARGET/$rel" "$BACKUP/$rel"
    echo "Respaldo: $rel -> ${BACKUP#$TARGET/}/$rel"
  fi
}

for rel in AGENTS.md opencode.json .opencode _web-os; do
  backup_path "$rel"
done

cp "$SOURCE_DIR/AGENTS.md" "$TARGET/AGENTS.md"
cp "$SOURCE_DIR/opencode.json" "$TARGET/opencode.json"
mkdir -p "$TARGET/.opencode"
cp -R "$SOURCE_DIR/.opencode/agents" "$TARGET/.opencode/"
cp -R "$SOURCE_DIR/.opencode/commands" "$TARGET/.opencode/"
cp -R "$SOURCE_DIR/.opencode/skills" "$TARGET/.opencode/"
rm -rf "$TARGET/_web-os"
cp -R "$SOURCE_DIR/_web-os" "$TARGET/_web-os"

cat <<EOF

Web Architect OS para OpenCode instalado en:
$TARGET

Siguiente paso:
  cd "$TARGET"
  opencode

Dentro de OpenCode:
  /os-status
  /web-architect [tu idea]
EOF
