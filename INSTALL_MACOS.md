# Instalación de Web Architect OS para OpenCode en macOS

## 1. Instalar OpenCode

### Método recomendado: Homebrew

```bash
brew install anomalyco/tap/opencode
```

El tap de OpenCode suele recibir versiones antes que la fórmula mantenida por Homebrew.

### Aplicación de escritorio opcional

```bash
brew install --cask opencode-desktop
```

### Verificar

```bash
opencode --version
which opencode
```

Si `brew` no existe, instala Homebrew primero desde su sitio oficial y vuelve a ejecutar los comandos.

## 2. Conectar un proveedor

Abre OpenCode:

```bash
opencode
```

Dentro del TUI:

```text
/connect
```

Opciones prácticas:

- **OpenAI**: puedes iniciar sesión con ChatGPT Plus/Pro desde el navegador.
- **API key**: OpenAI, Anthropic u otro proveedor compatible.
- **OpenCode Zen/Go**: servicio opcional de OpenCode.
- **Modelos locales**: Ollama, LM Studio o servidores compatibles.

Después:

```text
/models
```

Selecciona el modelo disponible que quieras utilizar. No fijamos uno en `opencode.json`, así el SO no queda atado a proveedor ni modelo.

> No uses plugins no oficiales para reutilizar Claude Pro/Max. Usa un método permitido por el proveedor, como una API key.

## 3. Preparar el proyecto

Para un proyecto nuevo:

```bash
mkdir -p ~/Projects/mi-proyecto
cd ~/Projects/mi-proyecto
git init
```

Para un repo existente:

```bash
cd ~/Projects/mi-proyecto
git status
```

Git es recomendable porque OpenCode usa snapshots y puede integrar undo/redo con el estado del repositorio.

## 4. Instalar Web Architect OS

Descomprime `Web-Architect-OS-OpenCode-Ready-v2.1.0.zip` en Descargas. En Terminal:

```bash
cd ~/Downloads/Web-Architect-OS-OpenCode-Ready-v2.1.0
chmod +x install-into-project.sh
./install-into-project.sh ~/Projects/mi-proyecto
```

El instalador:

- Copia `AGENTS.md` y `opencode.json`.
- Instala `.opencode/skills`, `commands` y `agents`.
- Copia el núcleo a `_web-os/`.
- Crea respaldos con timestamp si encuentra archivos con el mismo nombre.
- No toca `.git`, código de la aplicación ni credenciales.

## 5. Primer arranque

```bash
cd ~/Projects/mi-proyecto
opencode
```

Ejecuta:

```text
/os-status
```

Debes obtener PASS para memoria, configuración, skills, comandos, agentes y núcleo.

Después puedes usar:

```text
/web-architect Quiero crear...
/visual-design Quiero una dirección...
/shopify-architect Necesito una tienda...
/web-qa
/ahp-handoff para Claude Code
```

Usa `Tab` para alternar entre agentes principales:

- `web-plan`: analiza sin editar.
- `web-build`: implementa de extremo a extremo.

Los subagentes se invocan con `@`:

```text
@visual-director revisa la dirección visual actual
@shopify-auditor audita el theme
@qa-auditor revisa la evidencia de QA
```

## 6. ¿Debo ejecutar `/init`?

El paquete ya incluye `AGENTS.md`, por lo que **no es necesario**. Si quieres que OpenCode agregue convenciones específicas del repositorio:

1. Haz commit o respaldo de `AGENTS.md`.
2. Ejecuta `/init`.
3. Revisa el diff.
4. Conserva intacta la sección de Web Architect OS.

## 7. Configuración global opcional

OpenCode lee reglas personales desde:

```text
~/.config/opencode/AGENTS.md
```

Puedes copiar la plantilla incluida:

```bash
mkdir -p ~/.config/opencode
cp GLOBAL_AGENTS.example.md ~/.config/opencode/AGENTS.md
```

Las reglas del proyecto tienen prioridad sobre las globales.

## 8. Editor externo opcional

Para usar Cursor como editor al ejecutar `/editor` o `/export`:

```bash
echo 'export EDITOR="cursor --wait"' >> ~/.zshrc
source ~/.zshrc
```

El comando `cursor` debe estar instalado en PATH. También puedes usar `code --wait`, `nvim`, `vim` o `nano`.

## 9. Actualización y diagnóstico

```bash
opencode upgrade
opencode --print-logs
opencode auth list
```

Si Desktop falla por caché, ciérralo completamente y limpia `~/.cache/opencode` antes de reiniciar.

## Estructura instalada

```text
mi-proyecto/
├── AGENTS.md
├── opencode.json
├── .opencode/
│   ├── agents/
│   ├── commands/
│   └── skills/
└── _web-os/
    ├── core/
    ├── engines/
    ├── shopify/
    └── reference/
```
