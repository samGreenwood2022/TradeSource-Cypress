/// <reference types="cypress" />

// Elements and actions shared by every page (cookie banner, pop-up, search, sign-in).
// Other page classes extend this.
export class BasePage {

    // ==========================================================================
    // LOCATORS
    // Store all element locators here
    // ==========================================================================

    // "Accept" button on the cookie consent banner
    readonly consentAcceptButton = '[data-cy="consentAccept"]';
    // Close (X) button on the "new feature" pop-up
    readonly newFeatureCloseButton = '[data-cy="newFeatureClose"]';
    // Search text box in the desktop header
    readonly searchField = '[data-cy="searchFormDesktop"] > [data-cy="searchFieldSearch"]';
    // Search submit button
    readonly searchButton = '[data-cy="searchButton"]';
    // Sign in button in the header
    readonly signInButton = '[data-cy="signInButton"]';
    // Email text box on the sign-in form
    readonly signInEmailField = '[data-cy="signInEmail"]';
    // "Next" button after entering the email
    readonly signInNextButton = '[data-cy="signInNext"]';
    // Password text box on the sign-in form
    readonly signInPasswordField = '[data-cy="signInPassword"]';
    // Submit button on the sign-in form
    readonly signInSubmitButton = '[data-cy="signInSubmit"]';
    // User avatar (profile button), shown once signed in
    readonly userAvatar = '[data-cy="userAvatar"]';

    // ==========================================================================
    // METHODS
    // Store reusable element getters and actions here, using the locators above
    // Assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

    // Getters: return the element so the spec can click, type or assert on it
    getConsentAcceptButton() {
        return cy.get(this.consentAcceptButton);
    }

    getNewFeatureCloseButton() {
        return cy.get(this.newFeatureCloseButton);
    }

    getSearchField() {
        return cy.get(this.searchField);
    }

    getSearchButton() {
        return cy.get(this.searchButton);
    }

    getSignInButton() {
        return cy.get(this.signInButton);
    }

    getSignInEmailField() {
        return cy.get(this.signInEmailField);
    }

    getSignInNextButton() {
        return cy.get(this.signInNextButton);
    }

    getSignInPasswordField() {
        return cy.get(this.signInPasswordField);
    }

    getSignInSubmitButton() {
        return cy.get(this.signInSubmitButton);
    }

    getUserAvatar() {
        return cy.get(this.userAvatar);
    }

    // Actions: steps made of several getters
    // Opens the home page, accepts cookies and closes the new feature pop-up
    visitHomePage() {
        cy.visit('/');
        this.getConsentAcceptButton().click();
        this.getNewFeatureCloseButton().click();
    }
}
