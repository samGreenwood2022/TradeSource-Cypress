/// <reference types="cypress" />


// Elements and actions shared by every page (cookie banner, pop-up, search). Other page classes extend this.
export class BasePage {

    // ==========================================================================
    // LOCATORS
    // store all element locators here
    // ==========================================================================

    // "Accept" button on the cookie consent banner
    readonly consentAcceptButton = '[data-cy="consentAccept"]';
    // Close (X) button on the "new feature" pop-up
    readonly newFeatureCloseButton = '[data-cy="newFeatureClose"]';
    // Search text box in the desktop header
    readonly searchInput = '[data-cy="searchFormDesktop"] > [data-cy="searchFieldSearch"]';
    // Search submit button
    readonly searchButton = '[data-cy="searchButton"]';
    // sign in button
    readonly signInButton = '[data-cy="signInButton"]';
    // sign in email field
    readonly signInEmailField = '[data-cy="signInEmail"]';
    // sign in next button
    readonly signInNextButton = '[data-cy="signInNext"]';
    // sign in submit button
    readonly signInSubmitButton = '[data-cy="signInSubmit"]';
    // sign in password field
    readonly signInPasswordField = '[data-cy="signInPassword"]';
    // avatar (user profile) button
    readonly userAvatar = '[data-cy="userAvatar"]';


    // ==========================================================================
    // METHODS
    // store reusable element getters and actions here, using the locators above
    // assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

    // Getters: return the element so the spec can click, type or assert on it
    getConsentAcceptButton() {
        return cy.get(this.consentAcceptButton);
    }

    getSignInButton() {
        return cy.get(this.signInButton);
    }

    getNewFeatureCloseButton() {
        return cy.get(this.newFeatureCloseButton);
    }

    getSearchInput() {
        return cy.get(this.searchInput);
    }

    getSearchButton() {
        return cy.get(this.searchButton);
    }

    getSignInSubmitButton() {
        return cy.get(this.signInSubmitButton);
    }

    getSignInPasswordField() {
        return cy.get(this.signInPasswordField);
    }

    getUserAvatar() {
        return cy.get(this.userAvatar);
    }

    // Action: opens the home page, accepts cookies and closes the new feature pop-up
    visitHomePage() {
        cy.visit('/');
        this.getConsentAcceptButton().click();
        this.getNewFeatureCloseButton().click();
    }

    getSignInEmailField() {
        return cy.get(this.signInEmailField);
    }

    getSignInNextButton() {
        return cy.get(this.signInNextButton);
    }
}
