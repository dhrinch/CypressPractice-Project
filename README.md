# CypressPractice-Project

## Visual testing
Framework does not require installation of additional tools or plugins, other than [cypress-image-snapshot](https://github.com/jaredpalmer/cypress-image-snapshot) which is used for visual testing purposes.
 
### Plugin installation

Install from npm

```bash
npm install --save-dev cypress-image-snapshot
```
#### Installation tips

Following error can be thrown during installation:

```
npm install --save-dev cypress-image-snapshot
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: poly-explorer-feature@0.0.1
npm ERR! Found: cypress@7.5.0
npm ERR! node_modules/cypress
npm ERR!   dev cypress@"^7.4.0" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer cypress@"^4.5.0" from cypress-image-snapshot@4.0.1
npm ERR! node_modules/cypress-image-snapshot
npm ERR!   dev cypress-image-snapshot@"^4.0.1" from the root project
```

it can be overridden by using ```npm install --save-dev cypress-image-snapshot``` with ```--legacy-peer-deps``` key.

### Initial setup

Add the following in your project's `<rootDir>/cypress/plugins/index.js`:

```js
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
};
```

and in `<rootDir>/cypress/support/commands.js` add:

```js
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();
```

## Usage

### In tests

```js
describe('Login', () => {
  it('should be publicly accessible', () => {
    cy.visit('/login');

    // snapshot name will be the test title
    cy.matchImageSnapshot();

    // snapshot name will be the name passed in
    cy.matchImageSnapshot('login');

    // options object passed in
    cy.matchImageSnapshot(options);

    // match element snapshot
    cy.get('#login').matchImageSnapshot();
  });
});
```

### Updating snapshots

Run Cypress with `--env updateSnapshots=true` in order to update the base image files for all of your tests.

### Preventing failures

Run Cypress with `--env failOnSnapshotDiff=false` in order to prevent test failures when an image diff does not pass.

## Options

- `customSnapshotsDir` : Path to the directory that snapshot images will be written to, defaults to `<rootDir>/cypress/snapshots`.
- `customDiffDir`: Path to the directory that diff images will be written to, defaults to a sibling `__diff_output__` directory alongside each snapshot.

Additionally, any options for [`cy.screenshot()`](https://docs.cypress.io/api/commands/screenshot.html#Arguments) and [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot#optional-configuration) can be passed in the `options` argument to `addMatchImageSnapshotCommand` and `cy.matchImageSnapshot()`. The local options in `cy.matchImageSnapshot()` will overwrite the default options set in `addMatchImageSnapshot`.

For example, the default options we use in `<rootDir>/cypress/support/commands.js` are:

```js
addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport', // capture viewport in screenshot
});
```

Additional info can be found on plugin [page](https://github.com/jaredpalmer/cypress-image-snapshot).
