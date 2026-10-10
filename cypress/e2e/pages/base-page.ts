/// <reference types="cypress" />


// Elements and actions shared by every page (cookie banner, pop-up, search). Other page classes extend this.
export class BasePage {

    // ==========================================================================
    // LOCATORS
    // store all element locators here
    // ==========================================================================

    // "Accept" button on the cookie consent banner
    readonly locatorConsentAcceptButton = '[data-cy="consentAccept"]';
    // Close (X) button on the "new feature" pop-up
    readonly locatorNewFeatureCloseButton = '[data-cy="newFeatureClose"]';
    // Search text box in the desktop header
    readonly locatorSearchInput = '[data-cy="searchFormDesktop"] > [data-cy="searchFieldSearch"]';
    // Search submit button
    readonly locatorSearchButton = '[data-cy="searchButton"]';


    // ==========================================================================
    // METHODS
    // store reusable element getters and actions here, using the locators above
    // assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

    // Getters: return the element so the spec can click, type or assert on it
    consentAcceptButton() {
        return cy.get(this.locatorConsentAcceptButton);
    }

    newFeatureCloseButton() {
        return cy.get(this.locatorNewFeatureCloseButton);
    }

    searchInput() {
        return cy.get(this.locatorSearchInput);
    }

    searchButton() {
        return cy.get(this.locatorSearchButton);
    }

    // Action: opens the home page, accepts cookies and closes the new feature pop-up
    visitHomePage() {
        cy.visit('/');
        this.consentAcceptButton().click();
        this.newFeatureCloseButton().click();
    }
}
