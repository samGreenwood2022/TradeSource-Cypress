declare global {
      namespace Cypress {
          interface Chainable {
              loginUser(): Chainable<void>;
          }
      }
  }

  export {};