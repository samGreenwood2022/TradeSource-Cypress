/// <reference types="cypress" />

// Steps for api-regression.feature: replace the certifications API response, then check what the page shows

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { ManufacturerHomePage } from '../../e2e/pages/manufacturer-home-page';
import { CertificationsPage } from '../../e2e/pages/certifications-page';
import { interceptCertificationTiles } from '../network-stubs';

const manufacturerHomePage = new ManufacturerHomePage();
const certificationsPage = new CertificationsPage();

// ==========================================================================
// GIVEN: each step sets up one way the API can respond
// ==========================================================================

// Lets the request reach the real API, then renames the first certification in the response
Given('the API returns the first certification named {string}', (name: string) => {
    interceptCertificationTiles((req) => {
        req.continue((res) => {
            // The response is a list with one entry; change the name of the first certification
            res.body[0].data.certifications.byBrandId.paginatedResponse.items[0].name = name;
        });
    });
});

// Lets the request reach the real API, then empties the list and sets the total to match
Given('the API returns no certifications', () => {
    interceptCertificationTiles((req) => {
        req.continue((res) => {
            const paginatedResponse = res.body[0].data.certifications.byBrandId.paginatedResponse;
            paginatedResponse.items = [];
            paginatedResponse.totalItems = 0;
        });
    });
});

// Replies with a fake error and never contacts the real API
Given('the API returns a 500 error', () => {
    interceptCertificationTiles((req) => {
        req.reply({
            statusCode: 500,
            body: { errors: [{ message: 'Internal Server Error' }] },
        });
    });
});

// Simulates a network failure: the browser gets no response at all (different from a 500, which is a response)
Given('the API connection is dropped', () => {
    interceptCertificationTiles((req) => {
        req.destroy();
    });
});

// Lets the request reach the real API, then holds the response back before the page receives it.
// Keep the delay under 4 seconds, Cypress's default wait
Given('the API responds after {int} seconds', (seconds: number) => {
    interceptCertificationTiles((req) => {
        req.continue((res) => {
            res.setDelay(seconds * 1000);
        });
    });
});

// ==========================================================================
// WHEN
// ==========================================================================

When('I open the Certifications tab', () => {
    manufacturerHomePage.getCertificatesTab().click();
});

// ==========================================================================
// THEN
// ==========================================================================

Then('the first certification should be named {string}', (name: string) => {
    certificationsPage.getResultTileTitle().first()
        .should('contain.text', name);
});

Then('I should see the no results message {string}', (message: string) => {
    certificationsPage.getNoResultsGuidance()
        .should('be.visible')
        .and('contain.text', message);
});

Then('no certification tiles should be shown', () => {
    certificationsPage.getResultTile()
        .should('not.exist');
});

// The site shows nothing when the request fails, so we wait for "Loading..." to go away
// (the page has given up waiting) and then check there are no tiles and no message
Then('no certifications or messages should be shown', () => {
    certificationsPage.getLoading()
        .should('not.exist');
    certificationsPage.getResultTile()
        .should('not.exist');
    certificationsPage.getNoResultsGuidance()
        .should('not.exist');
});

Then('I should see the loading message', () => {
    certificationsPage.getLoading()
        .should('be.visible');
});

// Cypress retries for 4 seconds, longer than the delay
Then('the certification tiles should appear', () => {
    certificationsPage.getResultTile()
        .should('have.length.greaterThan', 0);
});
