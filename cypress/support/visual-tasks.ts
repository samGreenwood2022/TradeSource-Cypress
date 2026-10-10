// Node-side tasks for visual regression (called from commands.ts with cy.task).
// Cypress tests run in the browser and can't read files, so the image work happens here.
import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

// Test passes if no more than this % of pixels differ (allows tiny rendering noise)
const MAX_DIFF_PERCENT = 0.1;

export function visualTasks(config: Cypress.PluginConfigOptions) {
    const baselineDir = path.join(config.projectRoot, 'cypress', 'visual', 'baseline');
    const diffDir = path.join(config.projectRoot, 'cypress', 'visual', 'diff');

    return {
        // Compares the new screenshot with the saved baseline image of the same name
        compareSnapshot({ name, actualPath }: { name: string; actualPath: string }) {
            const baselinePath = path.join(baselineDir, `${name}.png`);
            const diffPath = path.join(diffDir, `${name}.png`);

            // Update mode (npm run cy:baseline): save the new screenshot as the baseline
            if (config.env.updateBaseline) {
                fs.mkdirSync(baselineDir, { recursive: true });
                fs.copyFileSync(actualPath, baselinePath);
                console.log(`Baseline saved: ${baselinePath}`);
                return null;
            }

            // No baseline yet: fail with a message explaining how to create one
            if (!fs.existsSync(baselinePath)) {
                throw new Error(
                    `No baseline image found for "${name}".\n`
                    + `Locally: run "npm run cy:baseline", check the image in cypress/visual/baseline, then commit it.\n`
                    + `In the pipeline: download the "cypress-screenshots" artifact, copy "${name}.png" to `
                    + `cypress/visual/baseline/ and commit it.`
                );
            }

            const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
            const actual = PNG.sync.read(fs.readFileSync(actualPath));

            // Images must be the same size to compare
            if (baseline.width !== actual.width || baseline.height !== actual.height) {
                throw new Error(
                    `"${name}" is ${actual.width}x${actual.height} but the baseline is `
                    + `${baseline.width}x${baseline.height}. If the change is intended, update the baseline.`
                );
            }

            // Compare pixel by pixel and draw the differences into a diff image
            const diff = new PNG({ width: baseline.width, height: baseline.height });
            const diffPixels = pixelmatch(
                baseline.data, actual.data, diff.data, baseline.width, baseline.height, { threshold: 0.1 }
            );
            const diffPercent = (diffPixels / (baseline.width * baseline.height)) * 100;

            if (diffPercent > MAX_DIFF_PERCENT) {
                fs.mkdirSync(diffDir, { recursive: true });
                fs.writeFileSync(diffPath, PNG.sync.write(diff));
                throw new Error(
                    `"${name}" differs from the baseline by ${diffPercent.toFixed(2)}% `
                    + `(allowed ${MAX_DIFF_PERCENT}%). See the diff image: ${diffPath}. `
                    + `If the change is intended, run "npm run cy:baseline" and commit the new baseline.`
                );
            }

            return null;
        },
    };
}
