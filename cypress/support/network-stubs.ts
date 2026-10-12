/// <reference types="cypress" />

import type { CyHttpMessages } from 'cypress/types/net-stubbing';

// Sets up an intercept on the request that loads the certification tiles; `onTiles` decides what to do with it.
// Two requests share the operation name "certifications": one loads the filter options and one loads the tiles.
// Only the tiles request asks for "paginatedResponse", so that is how we pick it out.
// The filter request is left alone so the rest of the page still loads normally
export const interceptCertificationTiles = (onTiles: (req: CyHttpMessages.IncomingHttpRequest) => void) => {
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
