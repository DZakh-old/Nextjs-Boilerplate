/* eslint-disable import/no-extraneous-dependencies */

const appRootPath = require('app-root-path').path;

const isEmpty = require('lodash/isEmpty');

const { EXTENTION } = require('../generator-constants');
const { entityExists } = require('../generator-helpers');

const TEMPLATES_BASE_PATH = './utils';
const ENTITY_STARTER_TEMPLATE_PATH = `${TEMPLATES_BASE_PATH}/entity-starter`;

const ENTITY_BASE_PATH = `${appRootPath}/src/utils`;

const makeUtilsGenerator = (plop) => {
  const kebabCase = plop.getHelper('kebabCase');

  return {
    description: 'Add an util file',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'math-helper',
        validate: (value) => {
          const name = kebabCase(value);

          if (isEmpty(name)) {
            return 'The name is required.';
          }

          if (!/^[a-z][\w-]*$/.test(name)) {
            return 'The name should contain only latin letters or numbers.';
          }

          const entityFolderPath = ENTITY_BASE_PATH;
          if (entityExists([entityFolderPath], name)) {
            return `An entity with the name "${value}" (${name}) already exists.`;
          }

          return true;
        },
      },
    ],
    actions: (answers) => {
      const entityName = kebabCase(answers.name);
      const entityDestination = `${ENTITY_BASE_PATH}`;
      const mainFilePath = `${entityDestination}/${entityName}.${EXTENTION}`;

      const actions = [
        {
          type: 'addMany',
          base: ENTITY_STARTER_TEMPLATE_PATH,
          destination: entityDestination,
          templateFiles: `${ENTITY_STARTER_TEMPLATE_PATH}/**`,
          data: {
            name: entityName,
            ext: EXTENTION,
          },
        },
      ];

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

module.exports = { makeUtilsGenerator };
