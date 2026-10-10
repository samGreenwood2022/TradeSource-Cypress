/// <reference types="cypress" />

import { BasePage } from './base-page';

// A manufacturer's overview page (e.g. Vortix): header, tagline and contact links
export class ManufacturerHomePage extends BasePage {

    // ==========================================================================
    // LOCATORS
    // store all element locators here
    // ==========================================================================

    // Main page heading (the manufacturer's name)
    readonly locatorh1Header = 'h1';
    // Tagline shown under the heading
    readonly locatorHeaderParagraph = '[data-testid="manufacturer-tagline"]';
    // Phone link (href is a tel: number)
    readonly locatorTelephoneLink = '[data-testid="manufacturer-phone"]';
    // Website link (opens the manufacturer's site in a new tab)
    readonly locatorWebsiteLink = '[data-testid="manufacturer-website"]';


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

    telephoneLink() {
        return cy.get(this.locatorTelephoneLink);
    }

    websiteLink() {
        return cy.get(this.locatorWebsiteLink);
    }

}
