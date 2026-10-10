/// <reference types="cypress" />

// Custom Cypress commands (cy.<name>) shared across specs. Loaded by e2e.ts.
// Each new command also needs a type declaration in index.d.ts.
// Docs: https://on.cypress.io/custom-commands

import { BasePage } from '../e2e/pages/base-page';

const basePage = new BasePage();

// cy.loginUser(): signs in with the EMAIL and PASSWORD environment values
Cypress.Commands.add('loginUser', () => {
    // Remember which page we're on, so we can check we land back here after logging in
    cy.url().as('currentUrl');

    // Click the sign-in button to start the login process
    basePage.getSignInButton().click();

    // Credentials only exist inside .then(); the password is kept out of the Command Log
    cy.env(['EMAIL', 'PASSWORD']).then(({ EMAIL, PASSWORD }) => {
        basePage.getSignInEmailField().type(EMAIL);
        basePage.getSignInNextButton().click();
        basePage.getSignInPasswordField().type(PASSWORD, { log: false });
        basePage.getSignInSubmitButton().click();
    });

    // Check that we have returned to the original page after logging in
    cy.get<string>('@currentUrl').then((currentUrl) => {
        cy.url().should('include', currentUrl);
    });

    // Check the user avatar is shown, which means we are signed in
    basePage.getUserAvatar()
        .should('be.visible');
});

// cy.matchSnapshot(name): screenshots the whole page and compares it with cypress/visual/baseline/<name>.png
Cypress.Commands.add('matchSnapshot', (name: string) => {
    // Fixed window width, so the page lays out the same way on every run
    cy.viewport(1280, 720);

    // Scroll down and back up so lazy-loaded content appears, then wait for every image to load.
    // Otherwise the page can still be changing while the full-page screenshot is stitched together
    cy.scrollTo('bottom', { duration: 500 });
    cy.scrollTo('top', { duration: 500 });
    cy.get('img').should(($images) => {
        const allLoaded = [...$images].every((image) => (image as HTMLImageElement).complete);
        expect(allLoaded, 'all images loaded').to.equal(true);
    });

    // Take a screenshot of the whole page, not just the visible part (overwrite replaces the previous run's)
    cy.screenshot(name, { capture: 'fullPage', overwrite: true });

    // Compare it with the baseline (the task fails with a message if there is no baseline)
    const screenshotsFolder = Cypress.config('screenshotsFolder');
    cy.task('compareSnapshot', {
        name,
        actualPath: `${screenshotsFolder}/${Cypress.spec.name}/${name}.png`,
    });
});
