// Cypress configuration. Cypress loads this file on startup (open and run).
import { defineConfig } from "cypress";

export default defineConfig({
  // End-to-end testing settings
  e2e: {
    // The local TradeSource practice site (start it with `npm start` in tradesource-site).
    // Lets specs use relative paths, e.g. cy.visit('/').
    baseUrl: 'http://localhost:4321',
    // Hook for Node-side plugins and events (e.g. tasks, reporters). Unused for now.
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
