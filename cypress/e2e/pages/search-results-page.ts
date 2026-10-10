/// <reference types="cypress" />

import { BasePage } from './base-page';

export class SearchResultsPage extends BasePage {

    // ==========================================================================
    // LOCATORS
    // store all element locators here
    // ==========================================================================
    readonly locatorResultTile = '[data-cy="resultTile"]';
    readonly locatorManufacturerTab = '[data-testid="tab-manufacturers"]';

    // ==========================================================================
    // METHODS
    // store reusable element getters and actions here, using the locators above
    // assertions belong in the spec files, chained onto the elements returned here
    // ==========================================================================

    resultTile() {
        return cy.get(this.locatorResultTile);
    }

    manufacturerTab() {
        return cy.get(this.locatorManufacturerTab);
    }

}