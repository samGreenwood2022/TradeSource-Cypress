/// <reference types="cypress" />

// ==============================================================================
// STAGE 2 OF 3: FLAT, OPTIMISED (same tests, tidied up)
// Same five tests as the un-optimised file, still in one flat file with no page objects.
//
// Improvements made:
//  - beforeEach: the shared setup runs once per test from one place, not copied into each test
//  - Variables: repeated selectors are stored in consts (searchField, phoneLink, websiteLink)
//  - Short tests: each test now only contains its own assertions
//  - Comments: each test says what it checks
//
// Still not ideal:
//  - Selectors are strings inside the spec, so other spec files can't reuse them
//  - If a selector changes, every spec that uses it must be edited
//
// Next: see regression-tests-pom.cy.ts, where the Page Object Model solves this.
// ==============================================================================


describe('Smoke Test', () => {
    // Runs before every test: accept cookies, close the pop-up, search "vor",
    // open the Manufacturers tab, select the Vortix tile and confirm we landed on its overview page
    beforeEach('should visit the homepage', () => {
        const searchField = '#search-desktop';

        cy.visit('/');
        cy.get('[data-cy="consentAccept"]').click();
        cy.get('[data-cy="newFeatureClose"]').click();
        cy.get(searchField).click();
        cy.get(searchField).type('vor{enter}');
        //cy.get('#search-button-desktop').click();
        cy.get('[data-testid="tab-manufacturers"]').click();
        cy.get('[data-cy="resultTile"]').click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');
    });
    //test 01 - Page title
    // Asserts the browser tab title contains "Vortix | Overview | TradeSource"
    it('should have the correct page title', () => {
        cy.title()
            .should('include', 'Vortix | Overview | TradeSource');
    });

    //test 02 - H1 header
    // Asserts the h1 contains "Vortix" and is visible
    it('should display correct h1 header', () => {
        cy.get('h1').contains('Vortix')
            .should('be.visible');
    });

    //test 03 - Header paragraph
    // Asserts the tagline text matches exactly and is visible
    it('should display correct header paragraph', function () {
        cy.get('[data-testid="manufacturer-tagline"]')
            .should('have.text', 'Commercial cleaning equipment, built for daily use')
            .should('be.visible');
    });

    //test 04 - Telephone link
    // Asserts the phone link is visible, its href contains the tel: number and its title is "Call Vortix"
    it('should display the telephone link', () => {
        const phoneLink = '[data-testid="manufacturer-phone"]';

        cy.get(phoneLink).should('be.visible')
            .should('have.attr', 'href')
            .and('include', 'tel:08001234567')
        cy.get(phoneLink)
            .should('have.attr', 'title', 'Call Vortix');
    });

    //test 05 - Website link
    // Asserts the website link is visible, points to the right URL, has the right hover title
    // and opens in a new tab (target="_blank")
    it('should display the website link', () => {
        const websiteLink = '[data-testid="manufacturer-website"]';

        cy.get(websiteLink)
            .should('be.visible')
        cy.get(websiteLink)
            .should('have.attr', 'href').and('include', 'https://www.vortix-commercial.example/overview')
        cy.get(websiteLink)
            .should('have.attr', 'title', 'Visit https://www.vortix-commercial.example/overview')
        cy.get(websiteLink)
            .should('have.attr', 'target', '_blank');
    });
});
