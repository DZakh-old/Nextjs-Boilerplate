/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Component Generator
 */

const appRootPath = require('app-root-path').path;

const isEmpty = require('lodash/isEmpty');
const kebabCase = require('lodash/kebabCase');
const trim = require('lodash/trim');
const values = require('lodash/values');

const COMPONENT_TYPES = {
  connected: 'connected',
  ui: 'ui',
};
const COMPONENTS_BASE_PATH = `${appRootPath}/src/components`;

const componentGenerator = {
  description: 'Add a component',
  prompts: [
    {
      type: 'list',
      name: 'componentType',
      message: 'Select a destination folder that is related to the type of component.',
      choices: values(COMPONENT_TYPES),
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if (isEmpty(trim(value))) {
          return 'The name is required';
        }

        return true;
      },
    },
  ],
  actions: (data) => {
    const componentName = kebabCase(data.name);
    const componentDestination = `${COMPONENTS_BASE_PATH}/${data.componentType}/${componentName}`;

    const actions = [
      {
        type: 'addMany',
        base: `./component/${data.componentType}`,
        destination: componentDestination,
        templateFiles: `./component/${data.componentType}/**`,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'prettify',
      path: `/components/${data.componentType}`,
    });

    actions.push({
      type: 'openFile',
      path: `${componentDestination}/${componentName}.component.tsx`,
    });

    return actions;
  },
};

module.exports = { componentGenerator };
