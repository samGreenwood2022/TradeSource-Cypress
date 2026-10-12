/// <reference types="cypress" />

import { BasePage } from './base-page';

// A manufacturer's Certifications tab: the list of certification tiles
export class CertificationsPage extends BasePage {

    // ==========================================================================
    // LOCATORS
    // Store all element locators here
    // ==========================================================================

    // "Loading..." text, shown while the certifications are being fetched
    readonly loading = '[data-cy="loading"]';
    // Wrapper around the results (only appears once the data has arrived)
    readonly resultWrapper = '[data-cy="searchResultWrapper"]';
    // One certification tile in the list
    readonly resultTile = '[data-cy="searchResultTile"]';
    // The name shown on a certification tile
    readonly resultTileTitle = '[data-cy="searchResultTileTitle"]';
    // "Sorry, no results were found" message
    readonly noResultsGuidance = '[data-cy="noResultsGuidance"]';

    // ==========================================================================
    // METHODS
    // Store reusable element getters and actions here, using the locators above
    // Assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

    // Getters: return the element so the spec can click, type or assert on it
    getLoading() {
        return cy.get(this.loading);
    }

    getResultWrapper() {
        return cy.get(this.resultWrapper);
    }

    getResultTile() {
        return cy.get(this.resultTile);
    }

    getResultTileTitle() {
        return cy.get(this.resultTileTitle);
    }

    getNoResultsGuidance() {
        return cy.get(this.noResultsGuidance);
    }
}
