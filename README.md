# TradeSource Cypress

A Cypress and TypeScript test automation framework, built step by step as a learning project and teaching aid.

It tests [TradeSource](https://github.com/samGreenwood2022/tradesource-site), a fictional trade-directory website made for automation practice.

## What's in it

- **UI regression tests** of a manufacturer page: title, headings, links and sign-in
- **Page Object Model (POM)** design, with the same tests written three ways so you can see how a framework improves:
  1. `regression-tests-flat-un-optimised.cy.ts`: the first draft, with repeated steps and selectors
  2. `regression-tests-flat-optimised.cy.ts`: tidied up with `beforeEach` and variables
  3. `regression-tests-pom.cy.ts`: page objects in `cypress/e2e/pages`, the best-practice version
- **Visual regression testing:** compares a full-page screenshot with a saved baseline image
- **Accessibility checks** with `cypress-axe`. Violations are listed in the report and do not fail the test
- **CI pipeline** on GitHub Actions, with an HTML report and results sent to Cypress Cloud

## Getting started

1. Clone and run the test site ([tradesource-site](https://github.com/samGreenwood2022/tradesource-site)):
   ```
   npm start
   ```
   It runs at `http://localhost:4321`.
2. In this repo, install the dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in the sign-in `EMAIL` and `PASSWORD`.

## Running the tests

| Command | What it does |
|---|---|
| `npm run cy:open` | Opens the interactive Cypress runner |
| `npm run cy:run` | Runs the POM spec headless and writes the HTML report |
| `npm run cy:headed` | Runs all specs with a visible browser |
| `npm run cy:baseline` | Saves new visual baseline images (see below) |

The report is written to `cypress/reports/html/index.html`. Open it in a browser. Failure screenshots and accessibility violations are included.

## Visual baselines

Baseline images are kept per operating system in `cypress/visual/baseline/<platform>/`, because fonts render differently on Windows and Linux. If a baseline is missing, the visual test fails and tells you how to create one.

## Project layout

```
cypress/
  e2e/            spec files, and pages/ with the page objects
  support/        custom commands, types and visual-regression tasks
  visual/         baseline images for visual regression
training/         Cypress example specs, kept for reference
.github/workflows CI pipeline
```

## Coming next

- API testing
- Cucumber (BDD) tests
