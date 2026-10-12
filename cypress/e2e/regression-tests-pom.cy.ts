/// <reference types="cypress" />

// ==============================================================================
// STAGE 3 OF 3: PAGE OBJECT MODEL (best practice)
// Same five tests again, plus a login test, now using the Page Object Model (POM) design pattern.
//
// How it works:
//  - Locators and element getters live in page classes in ./pages (one class per page)
//  - Shared items (cookie banner, search, sign-in) sit in BasePage; other pages extend it
//  - Specs only describe behaviour: what to do and what to assert
//  - Assertions stay in the spec, chained onto the elements the page objects return
//
// Benefits:
//  - One place to update: if a selector changes, fix it once in the page class
//  - Reusable: any spec can use the same page objects
//  - Readable: tests read like steps, e.g. manufacturerHomePage.getTelephoneLink()
// ==============================================================================

import type { CyHttpMessages } from 'cypress/types/net-stubbing';
import { BasePage } from './pages/base-page';
import { SearchResultsPage } from './pages/search-results-page';
import { ManufacturerHomePage } from './pages/manufacturer-home-page';
import { CertificationsPage } from './pages/certifications-page';

// Fake certification name used by the "rename" test. It is not a real name, so if the page shows it we know our stub was used
const STUBBED_CERTIFICATION_NAME = 'Stubbed Test Certification';

// How long the "slow" test holds the response back (in milliseconds). Kept under Cypress's 4 second default wait
const SLOW_RESPONSE_MS = 2000;

// Sets up an intercept on the request that loads the certification tiles; `onTiles` decides what to do with it.
// Two requests share the operation name "certifications": one loads the filter options and one loads the tiles.
// Only the tiles request asks for "paginatedResponse", so that is how we pick it out.
// The filter request is left alone so the rest of the page still loads normally
const interceptCertificationTiles = (onTiles: (req: CyHttpMessages.IncomingHttpRequest) => void) => {
    cy.intercept('POST', '/api/graphql', (req) => {
        // The site sends its requests as a list (a batch), so check each one
        const isTilesRequest = req.body.some(
            (operation: { operationName: string; query: string }) =>
                operation.operationName === 'certifications' && operation.query.includes('paginatedResponse'),
        );
        if (isTilesRequest) {
            onTiles(req);
        }
    });
};


describe('Regression tests', () => {
    // Runs before every test: accept cookies, close the pop-up, search "vor",
    // open the Manufacturers tab, select the Vortix tile and confirm we landed on its overview page
    beforeEach('should visit the homepage', () => {
        const basePage = new BasePage();
        const searchResultsPage = new SearchResultsPage();

        cy.visit('/');
        basePage.getConsentAcceptButton().click();
        basePage.getNewFeatureCloseButton().click();
        basePage.getSearchField().click();
        basePage.getSearchField().type('vor{enter}');
        searchResultsPage.getManufacturerTab().click();
        searchResultsPage.getResultTile().click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');
    });

    // test 01 - Page title
    // Asserts the browser tab title contains "Vortix | Overview | TradeSource"
    it('should have the correct page title', () => {
        cy.title()
            .should('include', 'Vortix | Overview | TradeSource');
    });

    // test 02 - H1 header
    // Asserts the h1 contains "Vortix" and is visible
    it('should display correct h1 header', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.getH1Header().contains('Vortix')
            .should('be.visible');
    });

    // test 03 - Header paragraph
    // Asserts the tagline text matches exactly and is visible
    it('should display correct header paragraph', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.getHeaderParagraph()
            .should('have.text', 'Commercial cleaning equipment, built for daily use')
            .should('be.visible');
    });

    // test 04 - Telephone link
    // Asserts the phone link is visible, its href contains the tel: number and its title is "Call Vortix"
    it('should display the telephone link', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.getTelephoneLink().should('be.visible')
            .should('have.attr', 'href')
            .and('include', 'tel:08001234567');
        manufacturerHomePage.getTelephoneLink()
            .should('have.attr', 'title', 'Call Vortix');
    });

    // test 05 - Website link
    // Asserts the website link is visible, points to the right URL, has the right hover title
    // and opens in a new tab (target="_blank")
    it('should display the website link', () => {
        const manufacturerHomePage = new ManufacturerHomePage();

        manufacturerHomePage.getWebsiteLink()
            .should('be.visible');
        manufacturerHomePage.getWebsiteLink()
            .should('have.attr', 'href').and('include', 'https://www.vortix-commercial.example/overview');
        manufacturerHomePage.getWebsiteLink()
            .should('have.attr', 'title', 'Visit https://www.vortix-commercial.example/overview');
        manufacturerHomePage.getWebsiteLink()
            .should('have.attr', 'target', '_blank');
    });

    // test 06 - Login
    // Uses the loginUser custom command (see cypress/support/commands.ts), which asserts
    // we return to the same page and the user avatar is visible
    it('should login the user', () => {
        cy.loginUser();
    });

    // test 07 - Visual snapshot
    // Asserts the page looks the same as the saved baseline image (cypress/visual/baseline/<platform>).
    // With no baseline the test fails and explains how to create one
    it('should match the visual snapshot', () => {
        cy.matchSnapshot('vortix-overview');
    });

    // test 08 - accessibility
    // Scans the page with axe. Violations are listed in the HTML report but do not fail the test
    it('should pass accessibility checks', () => {
        cy.checkAccessibility();
    });

    // test 09 - API test - rename the first certification
    // Changes the real response so the first certification has a fake name, then asserts the tab shows it
    it('certificate can be renamed', () => {
        const manufacturerHomePage = new ManufacturerHomePage();
        const certificationsPage = new CertificationsPage();

        // Set up the stub BEFORE opening the tab, so it is ready when the request is sent
        interceptCertificationTiles((req) => {
            // Let the request reach the real API, then change the response before the page sees it
            req.continue((res) => {
                // The response is a list with one entry; change the name of the first certification
                res.body[0].data.certifications.byBrandId.paginatedResponse.items[0].name = STUBBED_CERTIFICATION_NAME;
            });
        });

        manufacturerHomePage.getCertificatesTab().click();

        certificationsPage.getResultTileTitle().first()
            .should('contain.text', STUBBED_CERTIFICATION_NAME);
    });

    // test 10 - API test - no certifications
    // Replaces the response with an empty list, then asserts the "no results" message shows and there are no tiles
    it('should show the no results message when there are no certifications', () => {
        const manufacturerHomePage = new ManufacturerHomePage();
        const certificationsPage = new CertificationsPage();

        interceptCertificationTiles((req) => {
            req.continue((res) => {
                // Empty the list and set the total to match
                const paginatedResponse = res.body[0].data.certifications.byBrandId.paginatedResponse;
                paginatedResponse.items = [];
                paginatedResponse.totalItems = 0;
            });
        });

        manufacturerHomePage.getCertificatesTab().click();

        certificationsPage.getNoResultsGuidance()
            .should('be.visible')
            .and('contain.text', 'Sorry, no results were found');
        certificationsPage.getResultTile()
            .should('not.exist');
    });

    // test 11 - API test - server error
    // Makes the API fail with a 500 error, then asserts the page shows no tiles and no message
    // (the site shows nothing at all when the request fails, so this test documents that gap)
    it('should show no certifications when the API returns a 500 error', () => {
        const manufacturerHomePage = new ManufacturerHomePage();
        const certificationsPage = new CertificationsPage();

        interceptCertificationTiles((req) => {
            // Reply with a fake error and never contact the real API
            req.reply({
                statusCode: 500,
                body: { errors: [{ message: 'Internal Server Error' }] },
            });
        });

        manufacturerHomePage.getCertificatesTab().click();

        // Wait for "Loading..." to go away, so we know the page has given up waiting
        certificationsPage.getLoading()
            .should('not.exist');
        certificationsPage.getResultTile()
            .should('not.exist');
        certificationsPage.getNoResultsGuidance()
            .should('not.exist');
    });

    // test 12 - API test - dropped connection
    // Cuts the connection so no response ever arrives, then asserts the page shows no tiles and no message
    it('should show no certifications when the connection is dropped', () => {
        const manufacturerHomePage = new ManufacturerHomePage();
        const certificationsPage = new CertificationsPage();

        interceptCertificationTiles((req) => {
            // Simulate a network failure: the browser gets no response at all (different from a 500, which is a response)
            req.destroy();
        });

        manufacturerHomePage.getCertificatesTab().click();

        certificationsPage.getLoading()
            .should('not.exist');
        certificationsPage.getResultTile()
            .should('not.exist');
        certificationsPage.getNoResultsGuidance()
            .should('not.exist');
    });

    // test 13 - API test - slow response
    // Delays the real response, then asserts "Loading..." shows first and the tiles appear once the data arrives
    it('should show the certifications after a slow response', () => {
        const manufacturerHomePage = new ManufacturerHomePage();
        const certificationsPage = new CertificationsPage();

        interceptCertificationTiles((req) => {
            req.continue((res) => {
                // Hold the real response back before the page receives it
                res.setDelay(SLOW_RESPONSE_MS);
            });
        });

        manufacturerHomePage.getCertificatesTab().click();

        // While we wait, the loading text is shown and there are no tiles yet
        certificationsPage.getLoading()
            .should('be.visible');
        certificationsPage.getResultTile()
            .should('not.exist');
        // Once the response arrives, the tiles appear (Cypress retries for 4 seconds, longer than the delay)
        certificationsPage.getResultTile()
            .should('have.length.greaterThan', 0);
    });
});
