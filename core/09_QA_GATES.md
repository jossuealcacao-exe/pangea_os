# QA gates

A task cannot be `VERIFIED` solely because code was generated.

Minimum gates by change:

- Build/typecheck/lint where available.
- Tests affected by the change.
- Manual behavior verification.
- Responsive and keyboard checks for UI.
- Accessibility checks for interactive changes.
- Performance/SEO checks when affected.
- Git diff review.
- No secrets or accidental artifacts.

Record `PASS`, `FAIL`, `NOT_RUN` or `BLOCKED`. Never convert `NOT_RUN` into `PASS`.
