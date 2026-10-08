# TradeSource-Cypress

Cypress automation framework, built step by step as a learning exercise (following a Cypress course, but tested against my own practice site instead of NBS Source).

## Working style

- I build the framework myself. Claude reviews each step, points out where it differs from best practice, and suggests next steps. Claude doesn't write the framework unless I ask.
- The test site can be changed when needed (e.g. adding `data-cy` attributes).

## Repos

| Repo | Local path | GitHub |
|------|------------|--------|
| Cypress framework | `C:\Users\sam_g\Documents\Automation\TradeSource-Cypress` | `samGreenwood2022/TradeSource-Cypress` |
| Test site | `C:\Users\sam_g\Documents\Automation\tradesource-site` | `samGreenwood2022/tradesource-site` (public, branch `master`) |

**Test site:** plain Node `http` server with no dependencies. Start it with `npm start` and it runs at `http://localhost:4321` (the port can be overridden with `PORT`).

## Progress log

### 2026-10-08
- [x] Created the Cypress repo, added `package.json` and `cypress` as a dev dependency, plus `.gitignore` (node_modules, videos, screenshots, downloads, cypress.env.json, .env)
- [x] Pushed the Cypress repo to GitHub
- [x] Moved the test site to `tradesource-site` and ran `git init`
- [x] Created `CLAUDE.md` (this file) to log progress
- [x] Ran `npx cypress open` and completed E2E setup. This generated `cypress.config.js` (default, no `baseUrl` yet), `cypress/support/` (commands.js, e2e.js), `cypress/fixtures/example.json`, and the example specs in `cypress/e2e/1-getting-started` and `2-advanced-examples`
- [x] Set `baseUrl: 'http://localhost:4321'` in `cypress.config.js`
- [x] Committed the Cypress setup (commit `f45fdcf`) on branch `Feature/initial-framework-setup` and pushed it to origin
- [x] Made the site repo's first commit (`b0f3fb9`) and pushed it to the public GitHub repo `samGreenwood2022/tradesource-site`
- [x] Moved the example specs (`1-getting-started`, `2-advanced-examples`) from `cypress/e2e/` to `training/` at the repo root. They're kept for reference, but they sit outside the default `specPattern`, so neither the runner nor CI picks them up

## Next steps (in order)

1. Write one smoke test (e.g. `cypress/e2e/smoke.cy.js`) and get it passing locally
2. Add `.github/workflows/cypress.yml`:
   - check out this repo
   - check out the site repo into a subfolder (`repository:` + `path:`)
   - `actions/setup-node`
   - `cypress-io/github-action` with `start:` (to launch the site) and `wait-on: 'http://localhost:4321'`

## Decisions

- CI starts the site fresh on every run. No Docker and no deployment.
- Get one test passing locally before adding CI, so that a CI failure means a CI problem.
