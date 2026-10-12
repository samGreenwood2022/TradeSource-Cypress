/// <reference types="cypress" />

// Steps for visual-regression.feature

import { Then } from '@badeball/cypress-cucumber-preprocessor';

// Uses the matchSnapshot custom command (see cypress/support/commands.ts).
// With no baseline image the step fails and explains how to create one
Then('the page should match the {string} visual snapshot', (snapshotName: string) => {
    cy.matchSnapshot(snapshotName);
});
