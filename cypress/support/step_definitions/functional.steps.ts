/// <reference types="cypress" />

// Steps for functional-regression.feature: checks on a manufacturer's overview page

import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { BasePage } from '../../e2e/pages/base-page';
import { ManufacturerHomePage } from '../../e2e/pages/manufacturer-home-page';

const basePage = new BasePage();
const manufacturerHomePage = new ManufacturerHomePage();

// The two links the feature file can talk about, so one step can serve both
const getLink = {
    telephone: () => manufacturerHomePage.getTelephoneLink(),
    website: () => manufacturerHomePage.getWebsiteLink(),
};
type LinkName = keyof typeof getLink;

Then('the page title should include {string}', (title: string) => {
    cy.title().should('include', title);
});

Then('the h1 header should contain {string}', (text: string) => {
    manufacturerHomePage.getH1Header().contains(text);
});

Then('the h1 header should be visible', () => {
    manufacturerHomePage.getH1Header().should('be.visible');
});

Then('the header paragraph should say {string}', (text: string) => {
    manufacturerHomePage.getHeaderParagraph().should('have.text', text);
});

Then('the header paragraph should be visible', () => {
    manufacturerHomePage.getHeaderParagraph().should('be.visible');
});

// {word} is "telephone" or "website"
Then('the {word} link should be visible', (link: LinkName) => {
    getLink[link]().should('be.visible');
});

// Checks an attribute matches exactly, e.g. the title or target
Then('the {word} link {string} attribute should be {string}', (link: LinkName, attribute: string, value: string) => {
    getLink[link]().should('have.attr', attribute, value);
});

// checks the link will open in a new tab
Then('the {word} link will open in a new tab', (link: LinkName) => {
    getLink[link]().should('have.attr', 'target', '_blank');
});

// Checks an attribute contains the text, e.g. the href
Then('the {word} link {string} attribute should include {string}', (link: LinkName, attribute: string, text: string) => {
    getLink[link]().should('have.attr', attribute).and('include', text);
});

// Uses the loginUser custom command (see cypress/support/commands.ts)
When('I sign in', () => {
    cy.url().as('startUrl');
    cy.loginUser();
});

// Checks that the users Avatar is displayed
Then('I should see the user avatar', () => {
    basePage.getUserAvatar().should('be.visible');
});

// Checks that the user is returned to the original page after signing in
Then('be returned to the original page we clicked sign in from', () => {
    cy.get('@startUrl').then((startUrl) => {
        cy.url().should('eq', startUrl as string);
    });
});
