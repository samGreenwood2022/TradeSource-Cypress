/// <reference types="cypress" />

import { BasePage } from './base-page';

// The page shown after a search, listing results in tabs (e.g. Manufacturers)
export class SearchResultsPage extends BasePage {

    // ==========================================================================
    // LOCATORS
    // store all element locators here
    // ==========================================================================

    // A result tile in the results list (clicking it opens that result)
    readonly resultTile = '[data-cy="resultTile"]';
    // The "Manufacturers" tab above the results
    readonly manufacturerTab = '[data-testid="tab-manufacturers"]';

    // ==========================================================================
    // METHODS
    // store reusable element getters and actions here, using the locators above
    // assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

    getResultTile() {
        return cy.get(this.resultTile);
    }

    getManufacturerTab() {
        return cy.get(this.manufacturerTab);
    }

}
