/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

const appRootPath = require('app-root-path').path;

const includes = require('lodash/includes');

const pageComponents = fs.readdirSync(path.join(appRootPath, '/src/components'));
// const pageContainers = fs.readdirSync(path.join(__dirname, '../../../src/containers'));
const components = pageComponents;

// TODO: Check in depth
function componentExists(comp) {
  return includes(components, comp);
}

module.exports = { componentExists };
