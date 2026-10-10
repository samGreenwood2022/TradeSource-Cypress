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

### 2026-10-10
- [x] Added npm scripts: `cy:open`, `cy:run`, `cy:chrome`, `cy:headed`, `test`
- [x] Wrote a smoke spec (`smoke.cy.ts`) and fixed its assertion failures (see Lessons learned)
- [x] Built the same five tests in three stages, each with a header comment explaining the stage:
  1. `regression-tests-flat-un-optimised.cy.ts` (bad practice: repeated setup and selectors)
  2. `regression-tests-flat-optimised.cy.ts` (`beforeEach` + consts)
  3. `regression-tests-pom.cy.ts` (Page Object Model)
- [x] Page objects in `cypress/e2e/pages/`: `base-page.ts` (shared: consent, pop-up, search), `search-results-page.ts`, `manufacturer-home-page.ts`, `trade-source-home-page.ts` (empty so far). Each has LOCATORS and METHODS sections; assertions stay in the spec
- [x] Added a `loginUser` custom command in `cypress/support/commands.ts`, with credentials loaded from `.env` via `dotenv`

- [x] Added `.github/workflows/cypress.yml`: checks out both repos, starts the site, runs only `regression-tests-pom.cy.ts`, uploads the HTML report as the `cypress-report` artifact (always, even on failure). Not yet run on GitHub
- [x] Added `cypress-mochawesome-reporter` (config in `cypress.config.ts`, registered in `cypress/support/e2e.ts`); report goes to `cypress/reports/html/index.html` with failure screenshots embedded. `cypress/reports/` is gitignored

## Approaches and conventions (course notes)

- **Spec files** must end in `.cy.ts` or the runner's default `specPattern` ignores them.
- **Page objects:** locators are string properties named after the element, with no prefix (`readonly consentAcceptButton = '...'`); getters are methods with a `get` prefix returning `cy.get(this.consentAcceptButton)` (`getConsentAcceptButton()`). The `get` prefix avoids a name clash between the property and the method. Methods, not properties, so the query runs when called rather than when the class is constructed. Assertions are chained onto the returned elements in the spec.
- **Comments are for training:** every test says what it asserts; every locator says which element it targets.
- **Repetition in the early stages is intentional.** Don't flag or refactor it before the course reaches that stage.
- **Credentials:** kept in `.env` (gitignored; `.env.example` is the template). `cypress.config.ts` loads it with `dotenv/config` and passes `EMAIL`/`PASSWORD` into `env`. Specs and commands read them with `cy.env([...])`. In CI they come from GitHub secrets.
- **Custom commands** need a type declaration on `Cypress.Chainable`, or TypeScript reports error 2345.
- **Remembering a value between commands:** use an alias (`cy.url().as('currentUrl')`, then `cy.get<string>('@currentUrl')`). A plain `let` variable is read before the queued commands run.

## Lessons learned

- `should('have.attr', 'href')` with one argument changes the subject to the string value, so a chained `have.attr` after it fails. Use the three-argument form (`'have.attr', name, value`) or a fresh `cy.get`.
- `have.a.property` checks JS properties on the jQuery wrapper; use `have.attr` for HTML attributes (`have.prop` for live DOM properties).
- Cypress 16 has no `Cypress.env()`. Use the `cy.env([...])` command; the values only exist inside `.then()`.
- Reading a variable outside the callback that sets it gives `undefined` at run time, because Cypress commands are queued. TypeScript's `!` hides this rather than fixing it.
- Cypress doesn't read `.env` on its own; it needs `dotenv` in the config or a `cypress.env.json`.

## Pipeline progress

- [x] Workflow file written: `.github/workflows/cypress.yml` (triggers: push, pull_request, manual `workflow_dispatch`)
- [x] Steps in order: check out this repo, check out `samGreenwood2022/tradesource-site` (`master`) into `site/`, `actions/setup-node` (Node 22, npm cache), `cypress-io/github-action@v6` (`start: npm start --prefix site`, `wait-on: http://localhost:4321`, `spec: cypress/e2e/regression-tests-pom.cy.ts`), then `actions/upload-artifact@v4` with `if: always()`
- [x] Report: `cypress-mochawesome-reporter` produces one self-contained HTML file with failure screenshots embedded; uploaded as the `cypress-report` artifact (14 days)
- [x] Credentials: `EMAIL` and `PASSWORD` are passed as `env:` from GitHub secrets; `cypress.config.ts` reads them from `process.env`
- [ ] Add repository secrets `EMAIL` and `PASSWORD` (Settings > Secrets and variables > Actions)
- [ ] Commit and push the workflow, config, `package.json` and `package-lock.json` changes
- [ ] First CI run: check it passes, that the artifact downloads, and that the report path `cypress/reports/html/` is right (not yet confirmed; only read from the reporter's source)
- [ ] Force a failing test once, to confirm the screenshot is embedded in the report

Status: the pipeline has not been run on GitHub yet. The editor warns "Context access might be invalid" for `secrets.EMAIL` / `secrets.PASSWORD` until the secrets exist.

## Next steps (in order)

1. Finish the pipeline checklist above (secrets, push, first run, forced failure)
2. Re-run the POM spec locally and confirm the sign-in test and `loginUser` command pass after the rename to `get...` getters
3. Move on with the course: fill in `trade-source-home-page.ts` and add further page objects as needed

## Decisions

- CI starts the site fresh on every run. No Docker and no deployment.
- Get one test passing locally before adding CI, so that a CI failure means a CI problem.
- CI runs only the POM spec (the final stage); the flat specs are for teaching and are not run in the pipeline.
- The report is a single HTML artifact rather than a published site, so no extra hosting is needed.
