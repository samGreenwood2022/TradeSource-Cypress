/// <reference types="cypress" />

import { BasePage } from './base-page';

// The page shown after a search, listing results in tabs (e.g. Manufacturers)
export class SearchResultsPage extends BasePage {

    // ==========================================================================
    // LOCATORS
    // Store all element locators here
    // ==========================================================================

    // A result tile in the results list (clicking it opens that result)
    readonly resultTile = '[data-cy="resultTile"]';
    // The "Manufacturers" tab above the results
    readonly manufacturerTab = '[data-testid="tab-manufacturers"]';

    // ==========================================================================
    // METHODS
    // Store reusable element getters and actions here, using the locators above
    // Assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

    // Getters: return the element so the spec can click, type or assert on it
    getResultTile() {
        return cy.get(this.resultTile);
    }

    getManufacturerTab() {
        return cy.get(this.manufacturerTab);
    }
}
