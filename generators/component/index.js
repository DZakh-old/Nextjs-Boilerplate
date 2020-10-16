/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Component Generator
 */

const appRootPath = require('app-root-path').path;

const values = require('lodash/values');

const { componentExists } = require('../utils/componentExists');

const COMPONENT_TYPES = {
  connected: 'connected',
  ui: 'ui',
  screens: 'screens',
};

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
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'addMany',
        base: `./component/${data.componentType}`,
        destination: `${appRootPath}/src/components/${data.componentType}/{{kebabCase name}}`,
        templateFiles: `./component/${data.componentType}/**`,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'prettify',
      path: `/components/${data.componentType}`,
    });

    return actions;
  },
};

module.exports = { componentGenerator };
