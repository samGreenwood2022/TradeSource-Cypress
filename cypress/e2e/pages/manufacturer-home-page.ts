/// <reference types="cypress" />

import { BasePage } from './base-page';

export class ManufacturerHomePage extends BasePage {

    // ==========================================================================
    // LOCATORS
    // store all element locators here
    // ==========================================================================
    readonly locatorh1Header = 'h1';
    readonly locatorHeaderParagraph = '[data-testid="manufacturer-tagline"]';


    // ==========================================================================
    // METHODS
    // store reusable element getters and actions here, using the locators above
    // assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

    h1Header() {
        return cy.get(this.locatorh1Header);
    }


    headerParagraph() {
        return cy.get(this.locatorHeaderParagraph);
    }

}