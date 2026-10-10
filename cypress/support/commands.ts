/// <reference types="cypress" />
// Custom Cypress commands (cy.<name>) shared across specs. Loaded by e2e.ts.
// None yet. The commented-out examples below show the syntax.
// Each new command also needs a type declaration on Cypress.Chainable.
// Docs: https://on.cypress.io/custom-commands
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { BasePage } from '../e2e/pages/base-page';
const basePage = new BasePage();

Cypress.Commands.add('loginUser', () => {

    // Remember which page we're on, so we can check we land back here after logging in
    cy.url().as("currentUrl");

    // Click the sign-in button to start the login process
    basePage.getSignInButton().click();
    cy.env(['EMAIL', 'PASSWORD']).then(({ EMAIL, PASSWORD }) => {
        
        basePage.getSignInEmailField().type(EMAIL);
        basePage.getSignInNextButton().click();
        basePage.getSignInPasswordField().type(PASSWORD, { log: false });
        basePage.getSignInSubmitButton().click();
    });
    // Check that we have returned to the original page after logging in
    cy.get<string>("@currentUrl").then((currentUrl) => {
        cy.url().should("include", currentUrl);
    });
    
    basePage.getUserAvatar()
        .should('be.visible');

});

