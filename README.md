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

You need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) (version 22 is used in CI) installed.

There are two separate repos: the **test site** (the website being tested) and this **Cypress framework** (the tests). Set them up one at a time, in the order below. Both go in the same parent folder, for example `Automation/`.

### Part 1: the test site

1. Open a terminal in your parent folder and clone the site ([tradesource-site](https://github.com/samGreenwood2022/tradesource-site)):
   ```
   git clone https://github.com/samGreenwood2022/tradesource-site.git
   ```
2. Go into the site folder:
   ```
   cd tradesource-site
   ```
3. Start the site. It has no dependencies, so there is no `npm install` here:
   ```
   npm start
   ```
4. Check it works by opening `http://localhost:4321` in a browser.

**Leave this terminal open.** The site must keep running while you run the tests.

### Part 2: the Cypress framework

1. Open a **new** terminal in the same parent folder and clone this repo:
   ```
   git clone https://github.com/samGreenwood2022/TradeSource-Cypress.git
   ```
2. Go into the framework folder:
   ```
   cd TradeSource-Cypress
   ```
3. Install the dependencies (this also downloads Cypress, so it can take a few minutes):
   ```
   npm install
   ```
4. Copy `.env.example` to `.env` and fill in the sign-in details. These are practice credentials for the fictional test site, so they are safe to share:
   ```
   EMAIL=test.user@tradesource.example
   PASSWORD=Password123!
   ```

You are now ready to run the tests.

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
