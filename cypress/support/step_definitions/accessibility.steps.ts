/// <reference types="cypress" />

// Steps for accessibility.feature

import { Then } from '@badeball/cypress-cucumber-preprocessor';

// Uses the checkAccessibility custom command (see cypress/support/commands.ts).
// Violations are listed in the HTML report but never fail the step
Then('the page should be scanned for accessibility violations', () => {
    cy.checkAccessibility();
});
