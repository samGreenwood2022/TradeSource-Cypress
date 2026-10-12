/// <reference types="cypress" />

// Steps shared by more than one feature file: opening the site and getting to a page

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { BasePage } from '../../e2e/pages/base-page';
import { SearchResultsPage } from '../../e2e/pages/search-results-page';

const basePage = new BasePage();
const searchResultsPage = new SearchResultsPage();

// Opens the home page, accepts cookies and closes the new feature pop-up
Given('I have opened the TradeSource home page', () => {
    basePage.visitHomePage();
});

// Opens a page by its address, then accepts cookies and closes the new feature pop-up
Given('I open the page at {string}', (path: string) => {
    cy.visit(path);
    basePage.getConsentAcceptButton().click();
    basePage.getNewFeatureCloseButton().click();
});

// Types the text into the search box and presses enter
When('I search for {string}', (searchText: string) => {
    basePage.getSearchField().click();
    basePage.getSearchField().type(`${searchText}{enter}`);
});

When('I open the Manufacturers tab', () => {
    searchResultsPage.getManufacturerTab().click();
});

// Clicks the first result tile (a manufacturer, as the Manufacturers tab is open)
When('I select the first result', () => {
    searchResultsPage.getResultTile().click();
});

Then('the URL should include {string}', (text: string) => {
    cy.url().should('include', text);
});
