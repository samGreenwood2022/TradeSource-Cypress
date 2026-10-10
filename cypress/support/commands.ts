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
Cypress.Commands.add('loginUser', () => {

    // Remember which page we're on, so we can check we land back here after logging in
    cy.url().as("currentUrl");

    // Click the sign-in button to start the login process
    cy.get('[data-cy="signInButton"]').click();
    cy.env(['EMAIL', 'PASSWORD']).then(({ EMAIL, PASSWORD }) => {
        cy.get('[data-cy="signInEmail"]').type(EMAIL);
        cy.get('[data-cy="signInNext"]').click();
        cy.get('[data-cy="signInPassword"]').type(PASSWORD, { log: false });
        cy.get('[data-cy="signInSubmit"]').click();
    });
    // Check that we have returned to the original page after logging in
    cy.get<string>("@currentUrl").then((currentUrl) => {
        cy.url().should("include", currentUrl);
    });
    cy.get('[data-cy="userAvatar"]')
        .should('be.visible');

});

