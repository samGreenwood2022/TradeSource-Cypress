// Type declarations for custom commands. Each command in commands.ts needs an entry here.
declare global {
    namespace Cypress {
        interface Chainable {
            // Signs in with EMAIL and PASSWORD from the environment
            loginUser(): Chainable<void>;
        }
    }
}

export {};
