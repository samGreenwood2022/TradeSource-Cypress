/// <reference types="cypress" />

import { BasePage } from './base-page';

// A manufacturer's overview page (e.g. Vortix): header, tagline and contact links
export class ManufacturerHomePage extends BasePage {

    // ==========================================================================
    // LOCATORS
    // Store all element locators here
    // ==========================================================================

    // Main page heading (the manufacturer's name)
    readonly h1Header = 'h1';
    // Tagline shown under the heading
    readonly headerParagraph = '[data-testid="manufacturer-tagline"]';
    // Phone link (href is a tel: number)
    readonly telephoneLink = '[data-testid="manufacturer-phone"]';
    // Website link (opens the manufacturer's site in a new tab)
    readonly websiteLink = '[data-testid="manufacturer-website"]';

    // ==========================================================================
    // METHODS
    // Store reusable element getters and actions here, using the locators above
    // Assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

    // Getters: return the element so the spec can click, type or assert on it
    getH1Header() {
        return cy.get(this.h1Header);
    }

    getHeaderParagraph() {
        return cy.get(this.headerParagraph);
    }

    getTelephoneLink() {
        return cy.get(this.telephoneLink);
    }

    getWebsiteLink() {
        return cy.get(this.websiteLink);
    }
}
