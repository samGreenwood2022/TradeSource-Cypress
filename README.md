# TradeSource Cypress

A Cypress and TypeScript test automation framework, built step by step as a learning project and teaching aid.

It tests [TradeSource](https://github.com/samGreenwood2022/tradesource-site), a fictional trade-directory website made for automation practice.

## What's in it

- **UI regression tests** of a manufacturer page: title, headings, links and sign-in
- **Page Object Model (POM)**, with the same tests written three ways so you can see how a framework improves:
  1. `regression-tests-flat-un-optimised.cy.ts`: the first draft, with repeated steps and selectors
  2. `regression-tests-flat-optimised.cy.ts`: tidied up with `beforeEach` and variables
  3. `regression-tests-pom.cy.ts`: page objects in `cypress/e2e/pages`, the best-practice version
- **Visual regression:** compares a full-page screenshot with a saved baseline image
- **Accessibility checks** with `cypress-axe`. Violations are listed in the report and do not fail the test
- **API tests:** replace the site's data (renamed, empty, error, dropped connection, slow) and check how the page copes
- **Cucumber (BDD):** the same tests written as plain-English scenarios, one feature file each for functional, visual, accessibility and API
- **CI pipeline** on GitHub Actions, running the Cucumber features, with reports and results sent to Cypress Cloud

## Getting started

You need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) (version 22 is used in CI). There are two repos, the **test site** (the website being tested) and this **framework** (the tests). Clone both into the same parent folder, for example `Automation/`.

### Part 1: the test site

1. Clone and enter the site ([tradesource-site](https://github.com/samGreenwood2022/tradesource-site)):
   ```
   git clone https://github.com/samGreenwood2022/tradesource-site.git
   cd tradesource-site
   ```
2. Start it (no `npm install` needed):
   ```
   npm start
   ```
3. Check it works by opening `http://localhost:4321` in a browser.

**Leave this terminal open.** The site must keep running while you run the tests.

### Part 2: the Cypress framework

1. Open a **new** terminal in the same parent folder, then clone and enter this repo:
   ```
   git clone https://github.com/samGreenwood2022/TradeSource-Cypress.git
   cd TradeSource-Cypress
   ```
2. Install the dependencies (this also downloads Cypress, so it can take a few minutes):
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in the sign-in details. These are practice credentials for the fictional site, so they are safe to share:
   ```
   EMAIL=test.user@tradesource.example
   PASSWORD=Password123!
   ```

## Running the tests

| Command | What it does |
|---|---|
| `npm run cy:open` | Opens the interactive Cypress runner |
| `npm run cy:run` | Runs the POM spec |
| `npm run bdd` | Runs all the Cucumber features |
| `npm run bdd:functional` | Runs only the functional feature |
| `npm run bdd:visual` | Runs only the visual feature |
| `npm run bdd:accessibility` | Runs only the accessibility feature |
| `npm run bdd:api` | Runs only the API feature |
| `npm run cy:baseline` | Saves new visual baseline images for the POM spec |
| `npm run bdd:baseline` | Saves new visual baseline images for the visual feature |

Two reports are written after each run. Open them in a browser:

- `cypress/reports/html/index.html`: includes failure screenshots and accessibility violations
- `cypress/reports/cucumber/cucumber-report.html`: the Cucumber report

## Cucumber (BDD)

Feature files in `cypress/e2e/features/` describe the tests in plain English. Each line (step) is linked to code in `cypress/support/step_definitions/`, which uses the same page objects as the specs.

- **Test another page:** the visual and accessibility features use a `Scenario Outline`. Add a row to its `Examples` table.
- **Run one tag:** `npm run bdd -- --expose tags=@api` (use `--expose`, not `--env`, in Cypress 16).

## Visual baselines

Baseline images are kept per operating system in `cypress/visual/baseline/<platform>/`, because fonts render differently on Windows and Linux. If a baseline is missing, the test fails and tells you how to create one.

## Project layout

```
cypress/
  e2e/            spec files, features/ (Cucumber) and pages/ (page objects)
  support/        custom commands, visual-regression tasks and step_definitions/
  visual/         baseline images for visual regression
training/         Cypress example specs, kept for reference
.github/workflows CI pipeline
```
