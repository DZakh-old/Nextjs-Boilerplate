/* eslint-disable import/no-extraneous-dependencies */

const appRootPath = require('app-root-path').path;

const isEmpty = require('lodash/isEmpty');
const values = require('lodash/values');

const { entityExists } = require('../generator-helpers');

const COMPONENT_TYPES = {
  connected: 'connected',
  ui: 'ui',
};
const TEMPLATES_BASE_PATH = './components';
const ENTITY_STARTER_TEMPLATE_PATH = `${TEMPLATES_BASE_PATH}/entity-starter`;
const ENTITY_BASE_PATH = `${appRootPath}/src/components`;

const makeComponentsGenerator = (plop) => {
  const kebabCase = plop.getHelper('kebabCase');

  return {
    description: 'Add a component',
    prompts: [
      {
        type: 'list',
        name: 'entityType',
        message: 'Select a destination folder that is related to the type of a component.',
        choices: values(COMPONENT_TYPES),
      },
      {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'Button',
        validate: (value, answers) => {
          const name = kebabCase(value);

          if (isEmpty(name)) {
            return 'The name is required.';
          }

          if (!/^[a-z]/.test(name)) {
            return 'The name should be started with a latin letter.';
          }

          if (!/^[a-z][\w-]*$/.test(name)) {
            return 'The name should contain only latin letters or numbers.';
          }

          const entityFolderPath = `${ENTITY_BASE_PATH}/${answers.entityType}`;
          if (entityExists([entityFolderPath], name)) {
            return `An entity with the name "${value}" (${name}) already exists.`;
          }

          return true;
        },
      },
    ],
    actions(answers) {
      const entityName = kebabCase(answers.name);
      const entityDestination = `${ENTITY_BASE_PATH}/${answers.entityType}/${entityName}`;
      const mainFilePath = `${entityDestination}/${entityName}.component.tsx`;

      const actions = [
        {
          type: 'addMany',
          base: ENTITY_STARTER_TEMPLATE_PATH,
          destination: entityDestination,
          templateFiles: `${ENTITY_STARTER_TEMPLATE_PATH}/**`,
          data: {
            name: entityName,
          },
        },
      ];

      actions.push({
        type: 'addMany',
        base: `${TEMPLATES_BASE_PATH}/${answers.entityType}`,
        destination: entityDestination,
        templateFiles: `${TEMPLATES_BASE_PATH}/${answers.entityType}/**`,
        data: {
          name: entityName,
        },
      });

      actions.push({
        type: 'format',
        path: entityDestination,
      });

      actions.push({
        type: 'openFile',
        path: mainFilePath,
      });

      return actions;
    },
  };
};

module.exports = { makeComponentsGenerator };
