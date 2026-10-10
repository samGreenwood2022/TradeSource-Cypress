// Cypress configuration. Cypress loads this file on startup (open and run).
import 'dotenv/config'; // Loads .env into process.env (in CI the secrets are already env vars)
import { defineConfig } from 'cypress';
import cypressMochawesomeReporter from 'cypress-mochawesome-reporter/plugin';
import { visualTasks } from './cypress/support/visual-tasks';

export default defineConfig({
    // Cypress Cloud project that recorded runs are sent to
    projectId: 'kz74x5',
    // Values read by cy.env([...]) in specs and commands. Sourced from .env, never hard-coded
    env: {
        EMAIL: process.env.EMAIL,
        PASSWORD: process.env.PASSWORD,
    },
    // HTML report, written to cypress/reports/html. Failure screenshots are embedded in it
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        reportDir: 'cypress/reports/html',
        reportPageTitle: 'TradeSource regression report',
        charts: true,
        embeddedScreenshots: true,
        inlineAssets: true, // Single self-contained HTML file (easy to download from CI)
        saveAllAttempts: false,
    },
    // End-to-end testing settings
    e2e: {
        // The local TradeSource practice site (start it with `npm start` in tradesource-site)
        // Lets specs use relative paths, e.g. cy.visit('/')
        baseUrl: 'http://localhost:4321',
        // Node-side hooks: the reporter plugin builds the HTML report after the run,
        // and the visual tasks compare screenshots with their baselines
        setupNodeEvents(on, config) {
            cypressMochawesomeReporter(on);
            on('task', visualTasks(config));
        },
    },
});
