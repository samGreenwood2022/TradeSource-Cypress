/// <reference types="cypress" />

// ==============================================================================
// STAGE 3 OF 3: PAGE OBJECT MODEL (best practice)
// Same five tests again, plus a login test, now using the Page Object Model (POM) design pattern.
//
// How it works:
//  - Locators and element getters live in page classes in ./pages (one class per page)
//  - Shared items (cookie banner, search, sign-in) sit in BasePage; other pages extend it
//  - Specs only describe behaviour: what to do and what to assert
//  - Assertions stay in the spec, chained onto the elements the page objects return
//
// Benefits:
//  - One place to update: if a selector changes, fix it once in the page class
//  - Reusable: any spec can use the same page objects
//  - Readable: tests read like steps, e.g. manufacturerHomePage.getTelephoneLink()
// ==============================================================================

import { BasePage } from './pages/base-page';
import { SearchResultsPage } from './pages/search-results-page';
import { ManufacturerHomePage } from './pages/manufacturer-home-page';


describe('Regression tests', () => {
    // Runs before every test: accept cookies, close the pop-up, search "vor",
    // open the Manufacturers tab, select the Vortix tile and confirm we landed on its overview page
    beforeEach('should visit the homepage', () => {
        const basePage = new BasePage();
        const searchResultsPage = new SearchResultsPage();

        cy.visit('/');
        basePage.getConsentAcceptButton().click();
        basePage.getNewFeatureCloseButton().click();
        basePage.getSearchField().click();
        basePage.getSearchField().type('vor{enter}');
        searchResultsPage.getManufacturerTab().click();
        searchResultsPage.getResultTile().click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');
    });

    // test 01 - Page title
    // Asserts the browser tab title contains "Vortix | Overview | TradeSource"
    it('should have the correct page title', () => {
        cy.title()
            .should('include', 'Vortix | Overview | TradeSource');
    });

    // test 02 - H1 header
    // Asserts the h1 contains "Vortix" and is visible
    it('should display correct h1 header', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.getH1Header().contains('Vortix')
            .should('be.visible');
    });

    // test 03 - Header paragraph
    // Asserts the tagline text matches exactly and is visible
    it('should display correct header paragraph', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.getHeaderParagraph()
            .should('have.text', 'Commercial cleaning equipment, built for daily use')
            .should('be.visible');
    });

    // test 04 - Telephone link
    // Asserts the phone link is visible, its href contains the tel: number and its title is "Call Vortix"
    it('should display the telephone link', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.getTelephoneLink().should('be.visible')
            .should('have.attr', 'href')
            .and('include', 'tel:08001234567');
        manufacturerHomePage.getTelephoneLink()
            .should('have.attr', 'title', 'Call Vortix');
    });

    // test 05 - Website link
    // Asserts the website link is visible, points to the right URL, has the right hover title
    // and opens in a new tab (target="_blank")
    it('should display the website link', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.getWebsiteLink()
            .should('be.visible');
        manufacturerHomePage.getWebsiteLink()
            .should('have.attr', 'href').and('include', 'https://www.vortix-commercial.example/overview');
        manufacturerHomePage.getWebsiteLink()
            .should('have.attr', 'title', 'Visit https://www.vortix-commercial.example/overview');
        manufacturerHomePage.getWebsiteLink()
            .should('have.attr', 'target', '_blank');
    });

    // test 06 - Login
    // Uses the loginUser custom command (see cypress/support/commands.ts), which asserts
    // we return to the same page and the user avatar is visible
    it('should login the user', () => {
        cy.loginUser();
    });

    // test 07 - Visual snapshot
    // Asserts the page looks the same as the saved baseline image (cypress/visual/baseline/<platform>).
    // With no baseline the test fails and explains how to create one
    it.only('should match the visual snapshot', () => {
        cy.matchSnapshot('vortix-overview');
    });
});
