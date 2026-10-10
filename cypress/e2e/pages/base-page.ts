/// <reference types="cypress" />


export class BasePage {

    // ==========================================================================
    // LOCATORS
    // store all element locators here
    // ==========================================================================

    readonly locatorConsentAcceptButton = '[data-cy="consentAccept"]';
    readonly locatorNewFeatureCloseButton = '[data-cy="newFeatureClose"]';
    readonly locatorSearchInput = '[data-cy="searchInput"]';
    readonly locatorSearchButton = '[data-cy="searchButton"]';
    

    // ==========================================================================
    // METHODS
    // store reusable element getters and actions here, using the locators above
    // assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

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

    visitHomePage() {
        cy.visit('/');
        this.consentAcceptButton().click();
        this.newFeatureCloseButton().click();
    }
}
