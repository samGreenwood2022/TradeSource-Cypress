// Node-side tasks for visual regression (called from commands.ts with cy.task).
// Cypress tests run in the browser and can't read files, so the image work happens here.
import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

// Test passes if no more than this % of pixels differ (allows tiny rendering noise)
const MAX_DIFF_PERCENT = 0.001;

// Reads a PNG file as a base64 data URI, which the HTML report shows inline as an image
const toDataUri = (filePath: string) => `data:image/png;base64,${fs.readFileSync(filePath).toString('base64')}`;

export function visualTasks(config: Cypress.PluginConfigOptions) {
    // One baseline folder per operating system (win32, linux, darwin), because fonts render differently on each
    const platform = process.platform;
    const baselineDir = path.join(config.projectRoot, 'cypress', 'visual', 'baseline', platform);
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
                    `No ${platform} baseline image found for "${name}".\n`
                    + `Locally: run "npm run cy:baseline", check the image in cypress/visual/baseline/${platform}, then commit it.\n`
                    + `In the pipeline: download the "cypress-screenshots" artifact, copy "${name}.png" to `
                    + `cypress/visual/baseline/${platform}/ and commit it.`
                );
            }

            const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
            const actual = PNG.sync.read(fs.readFileSync(actualPath));

            // Images must be the same size to compare (no diff image can be drawn, so only baseline and actual are returned)
            if (baseline.width !== actual.width || baseline.height !== actual.height) {
                return {
                    message: `"${name}" is ${actual.width}x${actual.height} but the ${platform} baseline is `
                        + `${baseline.width}x${baseline.height}. If the change is intended, update the baseline.`,
                    baseline: toDataUri(baselinePath),
                    actual: toDataUri(actualPath),
                    diff: null,
                };
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
                // Return the images instead of throwing, so the test can embed them in the HTML report
                return {
                    message: `"${name}" differs from the baseline by ${diffPercent.toFixed(2)}% `
                        + `(allowed ${MAX_DIFF_PERCENT}%). The baseline, actual and diff images are in the report. `
                        + `If the change is intended, run "npm run cy:baseline" and commit the new baseline.`,
                    baseline: toDataUri(baselinePath),
                    actual: toDataUri(actualPath),
                    diff: toDataUri(diffPath),
                };
            }

            return null;
        },
    };
}
