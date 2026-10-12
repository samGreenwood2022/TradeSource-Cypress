// Cypress configuration. Cypress loads this file on startup (open and run).
import 'dotenv/config'; // Loads .env into process.env (in CI the secrets are already env vars)
import { defineConfig } from 'cypress';
import cypressMochawesomeReporter from 'cypress-mochawesome-reporter/plugin';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
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
        // Test files to run: the plain Cypress specs and the Cucumber feature files
        specPattern: ['cypress/e2e/**/*.cy.ts', 'cypress/e2e/**/*.feature'],
        // Node-side hooks: the reporter plugin builds the HTML report after the run,
        // the Cucumber plugin reads .feature files and writes the Cucumber report (settings in
        // .cypress-cucumber-preprocessorrc.json), and the visual tasks compare screenshots with their baselines
        async setupNodeEvents(on, config) {
            cypressMochawesomeReporter(on);
            await addCucumberPreprocessorPlugin(on, config);
            // Bundles the test files; the esbuild plugin turns .feature files into runnable tests
            on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
            on('task', visualTasks(config));
            return config;
        },
    },
});
