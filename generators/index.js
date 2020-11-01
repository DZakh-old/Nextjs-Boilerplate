/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const { execSync } = require('child_process');
const path = require('path');
// import fs from 'fs';

const appRootPath = require('app-root-path').path;

const { componentGenerator } = require('./component');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);

  // plop.setGenerator('container', containerGenerator);
  // plop.setGenerator('language', languageGenerator);
  // plop.addHelper('directory', (comp) => {
  //   try {
  //     fs.accessSync(path.join(__dirname, `../../app/containers/${comp}`), fs.F_OK);
  //     return `containers/${comp}`;
  //   } catch (e) {
  //     return `components/${comp}`;
  //   }
  // });
  // plop.addHelper('curly', (object, open) => (open ? '{' : '}'));

  plop.setActionType('prettify', (answers, config) => {
    const folderPath = path.join(
      appRootPath,
      '/src/',
      config.path,
      plop.getHelper('kebabCase')(answers.name),
      '**'
    );

    execSync(`npm run prettify -- "${folderPath}"`);
    return folderPath;
  });
};
