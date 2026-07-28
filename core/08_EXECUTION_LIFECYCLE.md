# Execution lifecycle

## PREFLIGHT

Git state, active project, authority, secrets, locks, handoff.

## DISCOVERY

Read exact files and reproduce current behavior.

## PLAN

State scope, files, risks, QA and rollback.

## APPROVAL GATE

Required for R2–R4 actions or material ambiguity.

## BUILD

Small coherent changes. No unrelated cleanup.

## VERIFY

Run targeted checks first, then broader checks. Capture receipts.

## RECORD

Update decision/task/bug/QA/session records and current state.

## HANDOFF

Generate exact next action tied to current commit.
