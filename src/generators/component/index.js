/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Component Generator
 */

const appRootPath = require('app-root-path').path;

const { componentExists } = require('../utils/componentExists');

const componentGenerator = {
  description: 'Add an unconnected component',
  prompts: [
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
    // TODO: Add folder select and more options
    const FOLDER = 'ui';

    const actions = [
      {
        type: 'addMany',
        base: `./component/${FOLDER}`,
        destination: `${appRootPath}/src/components/${FOLDER}/{{kebabCase name}}`,
        templateFiles: `./component/${FOLDER}/**`,
        abortOnFail: true,
      },
    ];

    actions.push({
      type: 'prettify',
      path: `/components/${FOLDER}`,
    });

    return actions;
  },
};

module.exports = { componentGenerator };
