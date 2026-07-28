# /pangea

Route subcommands: `status`, `bootstrap <project>`, `audit <project>`, `plan <project>`, `build <project> <task>`, `qa <project>`, `handoff <platform>`. Read `core/02_BOOT_SEQUENCE.md`.

# /agent

Use AHP+ semantics from `knowledge/ahp-plus/COMMANDS.md` or `node tools/ahp-plus/ahp.mjs`. Verify before writing.

# /pangea bootstrap

Inspect an existing project without edits, register its path/stack/commands, create evidence-backed profile and backlog candidates, then wait for approval before material refactors.

# /pangea audit

Read-only audit of architecture, UX/UI, accessibility, performance, SEO, security, dependencies and Git state. Separate verified findings from hypotheses.

# /pangea build

Resolve active project, preflight, plan exact scope, implement minimal coherent changes, run QA, record AHP+ state and produce handoff.

# /pangea qa

Run relevant checks, capture command/exit/commit evidence, report PASS/FAIL/NOT_RUN/BLOCKED and update QA records.

# /pangea handoff

Generate an AHP+ handoff tied to current branch and commit. Receiver must revalidate before continuing.

# /pangea promote-pattern

Promote a proven project pattern only after sanitization, provenance review, a decision record and reusable QA.

# /pangea template-release

Run commercial template release gates; publication always requires explicit approval.
