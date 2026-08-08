# jossue-portfolio

- Project ID: jossue-portfolio
- Path: `jossue-portfolio`
- Type: astro
- Stack: Astro, TypeScript
- Status: REGISTERED
- Git branch: master
- Git commit: b5bd8f9cd7f06ba1fa59448265e558fa953ff39b
- Working tree: CLEAN
- Last observed: 2026-08-08T22:52:20.000Z
- Confidence: VERIFIED by filesystem scan

## Commands
- `npm run dev`: `astro dev`
- `npm run api`: `node --env-file=.env.api api/server.mjs`
- `npm run test:api`: `node --test api/server.test.mjs`
- `npm run test:worker`: `node --test worker/index.test.mjs`
- `npm run blog:validate`: `node scripts/blog/validate-content.mjs`
- `npm run blog:check`: `npm run blog:validate && npm run check --prefix blog && npm run build --prefix blog`
- `npm run build`: `astro build`
- `npm run build:production`: production build for `jossuealcala.com` with contact and GA4 configuration
- `npm run deploy`: production build and Cloudflare Worker deployment
- `npm run preview`: `astro preview`
- `npm run check`: `astro check`
- `npm run lint`: `eslint .`
- `npm run test:links`: `node scripts/test-links.mjs`
- `npm run test:routes`: `node scripts/test-routes.mjs`
- `npm run test:e2e`: `playwright test --config tests/playwright.config.ts`
- `npm run validate`: blog, Astro, lint, build, API, Worker, routes, links and Playwright release gate
- `npm run astro`: `astro`

## Bootstrap snapshot

- Astro 7.1.1 static portfolio plus an independent Astro blog deployed at
  `blog.jossuealcala.com` with Cloudflare Worker and D1 social moderation.
- Commit `b5bd8f9cd7f06ba1fa59448265e558fa953ff39b` is pushed to `origin/master`.
- Latest validation receipt: `npm run validate` passed with 7 localized entries, 31 portfolio
  pages, 20 blog pages, 595 links and 192/192 Playwright tests.
- GitHub Actions run `31282589326` passed content validation, Astro type checks and the
  production blog build for the corrective commit.
