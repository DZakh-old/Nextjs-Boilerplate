/* eslint-disable import/no-extraneous-dependencies */

const { execSync } = require('child_process');
const path = require('path');

const { makeComponentsGenerator } = require('./components');
const { makeHooksGenerator } = require('./hooks');

module.exports = (plop) => {
  plop.setGenerator('components', makeComponentsGenerator(plop));
  plop.setGenerator('hooks', makeHooksGenerator(plop));

  plop.setActionType('format', (answers, config) => {
    execSync(`npm run lint -- --fix --ext .js,.jsx,.ts,.tsx "${config.path}"`);

    const folderPath = path.join(config.path, '**');
    execSync(`npm run prettify -- "${folderPath}"`);

    return config.path;
  });

  plop.setActionType('openFile', (answers, config) => {
    try {
      execSync(`code ${config.path}`);
    } catch (_err) {
      // Do nothing
    }
  });
};
