# Template productization

Pangea supports two output classes:

1. **Bespoke project:** a site built for one brand or portfolio.
2. **Commercial template:** a reusable product intended for sale or licensing.

A project does not become a template merely by removing a logo.

## Promotion lifecycle

`OBSERVED → CANDIDATE → GENERALIZED → SANITIZED → VERIFIED → RELEASE_CANDIDATE → RELEASED`

### OBSERVED

A useful pattern exists in a real project and has evidence.

### CANDIDATE

A decision record proposes reuse and names its source project and constraints.

### GENERALIZED

Brand-specific content, APIs, routes, data assumptions and visual tokens are replaced with documented extension points.

### SANITIZED

Remove client data, secrets, analytics IDs, private copy, licensed assets that cannot be redistributed, personal information and hidden project dependencies.

### VERIFIED

Run installation, build, responsive, keyboard, accessibility, SEO, performance and empty-state QA from a clean consumer fixture.

### RELEASE_CANDIDATE

Freeze a version, changelog, supported stack, license, dependency policy, screenshots, setup guide and known limitations.

### RELEASED

Tag and publish only after explicit owner approval.

## Required template manifest

Each commercial template should define:

- Template ID and version.
- Supported runtime and package manager.
- Framework and dependency versions.
- Included pages and components.
- Required configuration and environment variables by name only.
- Replaceable brand tokens and content sources.
- Asset provenance and redistribution rights.
- Accessibility target.
- Browser/device support.
- Installation and upgrade procedure.
- QA evidence tied to a commit.
- License and commercial terms.

## Cross-project learning rule

Pangea may inspect projects for patterns, but it must not silently merge their identities. Promotion to shared knowledge requires:

- A source reference.
- Removal of project-specific information.
- A decision record.
- Human review.
- A reproducible fixture.

## Release gates

A template cannot be marked ready for sale when any required gate is `NOT_RUN`, `BLOCKED` or `FAIL`. Visual polish does not compensate for missing provenance, accessibility, installation or build evidence.
