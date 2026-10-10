// Global setup: Cypress runs this file automatically before every spec.
// Put shared hooks and global behaviour here.

// Register the custom commands defined in commands.ts
import "./commands"; // If you have custom commands

// Adds the mochawesome reporter hooks (needed to embed screenshots in the HTML report)
import "cypress-mochawesome-reporter/register";
