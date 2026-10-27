// Cypress configuration. Cypress loads this file on startup (open and run).
import 'dotenv/config'; // Loads .env into process.env (in CI the secrets are already env vars)
import { defineConfig } from 'cypress';
import cypressMochawesomeReporter from 'cypress-mochawesome-reporter/plugin';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { visualTasks } from './cypress/support/visual-tasks';
import fs from 'fs';
import path from 'path';

// Cypress only looks for Chrome under Program Files. When Chrome is installed for the current
// Windows user only (in AppData\Local), Cypress misses it and `--browser chrome` fails.
// This adds that copy to the browser list. It does nothing if Cypress already found Chrome (e.g. in CI)
const addPerUserChrome = (config: Cypress.PluginConfigOptions) => {
    // Chrome was already detected, so there is nothing to add
    if (config.browsers.some((browser) => browser.name === 'chrome')) return;
    const appDir = path.join(process.env.LOCALAPPDATA ?? '', 'Google', 'Chrome', 'Application');
    const exePath = path.join(appDir, 'chrome.exe');
    // No per-user install on this machine
    if (!fs.existsSync(exePath)) return;
    // Chrome keeps a folder named after its version (e.g. 156.0.8078.48) next to chrome.exe.
    // There can be two while an update is pending, so take the newest
    const version = fs.readdirSync(appDir)
        .filter((name) => /^\d+\.\d+\.\d+\.\d+$/.test(name))
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0];
    if (!version) return;
    config.browsers.push({
        name: 'chrome',
        family: 'chromium',
        channel: 'stable',
        displayName: 'Chrome',
        version,
        majorVersion: version.split('.')[0],
        path: exePath,
        isHeaded: true,
        isHeadless: true,
    });
};

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
            addPerUserChrome(config);
            return config;
        },
    },
});
