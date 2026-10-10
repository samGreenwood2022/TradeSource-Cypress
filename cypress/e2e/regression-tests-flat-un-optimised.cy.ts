/// <reference types="cypress" />


describe('Smoke Test', () => {
    it('should visit the homepage', () => {
        cy.visit('/');
        cy.get('[data-cy="consentAccept"]').click();
        cy.get('[data-cy="newFeatureClose"]').click();
        cy.get('#search-desktop').click();
        cy.get('#search-desktop').type('vor{enter}');
        cy.get('#search-button-desktop').click();
        cy.get('[data-testid="tab-manufacturers"]').click();
        cy.get('[data-cy="resultTile"]').click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');
    });

    it('should have the correct page title', () => {
        cy.visit('/');
        cy.get('[data-cy="consentAccept"]').click();
        cy.get('[data-cy="newFeatureClose"]').click();
        cy.get('#search-desktop').click();
        cy.get('#search-desktop').type('vor{enter}');
        cy.get('#search-button-desktop').click();
        cy.get('[data-testid="tab-manufacturers"]').click();
        cy.get('[data-cy="resultTile"]').click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');

        cy.title().should('include', 'Vortix | Overview | TradeSource');
    });

    it('should display correct h1 header', () => {
        cy.visit('/');
        cy.get('[data-cy="consentAccept"]').click();
        cy.get('[data-cy="newFeatureClose"]').click();
        cy.get('#search-desktop').click();
        cy.get('#search-desktop').type('vor{enter}');
        cy.get('#search-button-desktop').click();
        cy.get('[data-testid="tab-manufacturers"]').click();
        cy.get('[data-cy="resultTile"]').click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');

        cy.get('h1').contains('Vortix').should('be.visible');
    });

    it('should display correct header paragraph', function () {
        cy.visit('/');
        cy.get('[data-cy="consentAccept"]').click();
        cy.get('[data-cy="newFeatureClose"]').click();
        cy.get('#search-desktop').click();
        cy.get('#search-desktop').type('vor{enter}');
        cy.get('#search-button-desktop').click();
        cy.get('[data-testid="tab-manufacturers"]').click();
        cy.get('[data-cy="resultTile"]').click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');

        cy.get('[data-testid="manufacturer-tagline"]').should('have.text', 'Commercial cleaning equipment, built for daily use').should('be.visible');
    });

    it('should display the telephone link', () => {
        cy.visit('/');
        cy.get('[data-cy="consentAccept"]').click();
        cy.get('[data-cy="newFeatureClose"]').click();
        cy.get('#search-desktop').click();
        cy.get('#search-desktop').type('vor{enter}');
        cy.get('#search-button-desktop').click();
        cy.get('[data-testid="tab-manufacturers"]').click();
        cy.get('[data-cy="resultTile"]').click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');

        cy.get('[data-testid="manufacturer-phone"]').should('be.visible')
            .should('have.attr', 'href').and('include', 'tel:08001234567')
        cy.get('[data-testid="manufacturer-phone"]').should('have.attr', 'title', 'Call Vortix');
    });

    it('should display the website link', () => {
        cy.visit('/');
        cy.get('[data-cy="consentAccept"]').click();
        cy.get('[data-cy="newFeatureClose"]').click();
        cy.get('#search-desktop').click();
        cy.get('#search-desktop').type('vor{enter}');
        cy.get('#search-button-desktop').click();
        cy.get('[data-testid="tab-manufacturers"]').click();
        cy.get('[data-cy="resultTile"]').click();
        cy.url().should('include', '/manufacturer/vortix/vtxA1B2C3D4E5F6G7H8/overview');

        cy.get('[data-testid="manufacturer-website"]')
            .should('be.visible')
        cy.get('[data-testid="manufacturer-website"]').should('have.attr', 'href').and('include', 'https://www.vortix-commercial.example/overview')
        cy.get('[data-testid="manufacturer-website"]').should('have.attr', 'title','Visit https://www.vortix-commercial.example/overview')
        cy.get('[data-testid="manufacturer-website"]').should('have.attr', 'target', '_blank');
    });
});