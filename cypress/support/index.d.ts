// Type declarations for custom commands. Each command in commands.ts needs an entry here.
declare global {
    namespace Cypress {
        interface Chainable {
            // Signs in with EMAIL and PASSWORD from the environment
            loginUser(): Chainable<void>;
            // Screenshots the page and compares it with the saved baseline image
            matchSnapshot(name: string): Chainable<void>;
            // Scans the page for accessibility violations and lists them in the report (never fails the test)
            checkAccessibility(): Chainable<void>;
        }
    }
}

export {};
