/// <reference types="cypress" />

// ==============================================================================
// STAGE 3 OF 3: PAGE OBJECT MODEL (best practice)
// Same five tests again, now using the Page Object Model (POM) design pattern.
//
// How it works:
//  - Locators and element getters live in page classes in ./pages (one class per page)
//  - Shared items (cookie banner, search) sit in BasePage; other pages extend it
//  - Specs only describe behaviour: what to do and what to assert
//  - Assertions stay in the spec, chained onto the elements the page objects return
//
// Benefits:
//  - One place to update: if a selector changes, fix it once in the page class
//  - Reusable: any spec can use the same page objects
//  - Readable: tests read like steps, e.g. manufacturerHomePage.telephoneLink()
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
        basePage.consentAcceptButton().click();
        basePage.newFeatureCloseButton().click();
        basePage.searchInput().click();
        basePage.searchInput().type('vor{enter}');
        searchResultsPage.manufacturerTab().click();
        searchResultsPage.resultTile().click();
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
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.h1Header().contains('Vortix')
            .should('be.visible');
    });

    //test 03 - Header paragraph
    // Asserts the tagline text matches exactly and is visible
    it('should display correct header paragraph', function () {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.headerParagraph()
            .should('have.text', 'Commercial cleaning equipment, built for daily use')
            .should('be.visible');
    });

    //test 04 - Telephone link
    // Asserts the phone link is visible, its href contains the tel: number and its title is "Call Vortix"
    it('should display the telephone link', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.telephoneLink().should('be.visible')
            .should('have.attr', 'href')
            .and('include', 'tel:08001234567')
        manufacturerHomePage.telephoneLink()
            .should('have.attr', 'title', 'Call Vortix');
    });

    //test 05 - Website link
    // Asserts the website link is visible, points to the right URL, has the right hover title
    // and opens in a new tab (target="_blank")
    it('should display the website link', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.websiteLink()
            .should('be.visible')
        manufacturerHomePage.websiteLink()
            .should('have.attr', 'href').and('include', 'https://www.vortix-commercial.example/overview')
        manufacturerHomePage.websiteLink()
            .should('have.attr', 'title', 'Visit https://www.vortix-commercial.example/overview')
        manufacturerHomePage.websiteLink()
            .should('have.attr', 'target', '_blank');
    });

    it('should login the user', () => {
        cy.loginUser();
    }); 
});
