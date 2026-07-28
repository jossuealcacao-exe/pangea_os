# SO de Ingeniería de Prompts

Versión: 1.0  
Estado: Activo  
Idioma operativo: Español  
Propietario del sistema: Jossue Alcalá

## Propósito

Este paquete convierte el proyecto en un Sistema Operativo para crear, optimizar, auditar, adaptar y transferir prompts entre modelos, agentes y plataformas.

El sistema no busca producir prompts innecesariamente largos. Su función es reducir la ambigüedad, conservar la intención original y entregar instrucciones ejecutables con el menor margen de error razonable.

## Instalación recomendada

### En ChatGPT Projects

1. Usa `01_PROJECT_INSTRUCTIONS.md` como base de las instrucciones del proyecto.
2. Adjunta el resto de los archivos `.md` como conocimiento del proyecto.
3. Conserva la carpeta `reference/` como fuente normativa.
4. Inicia una conversación escribiendo una idea o un prompt.
5. Usa `Solo prompt` cuando no necesites diagnóstico ni explicación.

### En Claude Code, Codex, Cursor o repositorios locales

1. Copia toda esta carpeta dentro del proyecto.
2. Mantén `02_CORE_OS.md` como fuente central de comportamiento.
3. Usa `08_PLATFORM_ADAPTERS.md` para adaptar cada salida.
4. Usa `07_AHP_HANDOFF_PROTOCOL.md` cuando el trabajo deba continuar en otra plataforma.
5. No modifiques la guía de referencia; registra cambios del sistema en `10_CHANGELOG.md`.

## Flujo principal

```text
Entrada del usuario
        ↓
Detección de intención
        ↓
Clasificación del tipo de prompt
        ↓
Selección del modo operativo
        ↓
Construcción o refactorización
        ↓
Adaptación a plataforma
        ↓
Control de calidad
        ↓
Entrega final
```

## Archivos

| Archivo | Función |
|---|---|
| `01_PROJECT_INSTRUCTIONS.md` | Instrucciones compactas listas para un proyecto de IA |
| `02_CORE_OS.md` | Núcleo completo del Sistema Operativo |
| `03_OPERATING_MODES.md` | Modos de trabajo y reglas de activación |
| `04_OUTPUT_CONTRACTS.md` | Formatos obligatorios de entrega |
| `05_PROMPT_TEMPLATES.md` | Plantillas reutilizables |
| `06_QA_CHECKLIST.md` | Validación y control de calidad |
| `07_AHP_HANDOFF_PROTOCOL.md` | Transferencia de contexto entre plataformas |
| `08_PLATFORM_ADAPTERS.md` | Adaptadores para ChatGPT, Claude, Codex, Cursor y generadores visuales |
| `09_COMMANDS_AND_TRIGGERS.md` | Comandos rápidos del usuario |
| `10_CHANGELOG.md` | Historial de versiones |
| `reference/` | Fuente normativa original |

## Comportamiento esperado

Cuando el usuario escriba una idea o prompt, el sistema debe asumir que quiere convertirlo en una instrucción mejor diseñada, salvo que indique expresamente:

```text
Respóndeme, no optimices el prompt.
```

No debe hacer preguntas por detalles menores. Debe preguntar únicamente cuando una ausencia de información bloquee o cambie de forma importante el resultado.
