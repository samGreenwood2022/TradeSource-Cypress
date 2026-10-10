/// <reference types="cypress" />

import { BasePage } from './pages/base-page';
import { SearchResultsPage } from './pages/search-results-page';
import { ManufacturerHomePage } from './pages/manufacturer-home-page';


describe('Smoke Test', () => {
    beforeEach('should visit the homepage', () => {
        const basePage = new BasePage();
        const searchResultsPage = new SearchResultsPage();

        cy.visit('/');
        basePage.consentAcceptButton().click();
        basePage.newFeatureCloseButton().click();
        basePage.searchInput().click();
        basePage.searchInput().type('vor{enter}');
        searchResultsPage.manufacturerTab().click();
        // cy.get('[data-testid="tab-manufacturers"]').click();
        searchResultsPage.resultTile().click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');
    });
    //test 01 - Page title
    it('should have the correct page title', () => {
        cy.title()
            .should('include', 'Vortix | Overview | TradeSource');
    });

    //test 02 - H1 header
    it('should display correct h1 header', () => {
        const manufacturerHomePage = new ManufacturerHomePage();
        
        manufacturerHomePage.h1Header().contains('Vortix')
            .should('be.visible');
    });

    //test 03 - Header paragraph
    it('should display correct header paragraph', function () {
        cy.get('[data-testid="manufacturer-tagline"]')
            .should('have.text', 'Commercial cleaning equipment, built for daily use')
            .should('be.visible');
    });

    //test 04 - Telephone link
    it('should display the telephone link', () => {
        const phoneLink = '[data-testid="manufacturer-phone"]';

        cy.get(phoneLink).should('be.visible')
            .should('have.attr', 'href')
            .and('include', 'tel:08001234567')
        cy.get(phoneLink)
            .should('have.attr', 'title', 'Call Vortix');
    });

    //test 05 - Website link
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