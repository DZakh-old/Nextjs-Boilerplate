/* eslint-disable import/no-extraneous-dependencies */

const appRootPath = require('app-root-path').path;

const isEmpty = require('lodash/isEmpty');

const { entityExists } = require('../generator-helpers');

const HOOK_PARAMS_VALUES = {
  withStyles: 'withStyles',
  withAssets: 'withAssets',
};

const TEMPLATES_BASE_PATH = './hooks';
const ENTITY_STARTER_TEMPLATE_PATH = `${TEMPLATES_BASE_PATH}/entity-starter`;
const WITH_STYLES_TEMPLATE_PATH = `${TEMPLATES_BASE_PATH}/with-styles`;
const WITH_ASSETS_TEMPLATE_PATH = `${TEMPLATES_BASE_PATH}/with-assets`;

const ENTITY_BASE_PATH = `${appRootPath}/src/hooks`;

const makeHooksGenerator = (plop) => {
  const kebabCase = plop.getHelper('kebabCase');

  return {
    description: 'Add a react hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What should it be called?',
        default: 'useCustomHook',
        validate: (value) => {
          const name = kebabCase(value);

          if (isEmpty(name)) {
            return 'The name is required.';
          }

          if (!/^use-.*/.test(name)) {
            return 'Hook name should be started with "use".';
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
      {
        type: 'checkbox',
        name: 'params',
        message: 'Select hook params.',
        choices: [
          {
            name: 'Is hook with css?',
            value: HOOK_PARAMS_VALUES.withStyles,
            short: 'With css',
          },
          {
            name: 'Is hook with assets?',
            value: HOOK_PARAMS_VALUES.withAssets,
            short: 'With assets',
          },
        ],
      },
    ],
    actions: (answers) => {
      const entityName = kebabCase(answers.name);
      const entityDestination = `${ENTITY_BASE_PATH}/${entityName}`;
      const mainFilePath = `${entityDestination}/${entityName}.hook.jsx`;

      const paramsSet = new Set(answers.params);
      const withStyles = paramsSet.has(HOOK_PARAMS_VALUES.withStyles);
      const withAssets = paramsSet.has(HOOK_PARAMS_VALUES.withAssets);

      const actions = [
        {
          type: 'addMany',
          base: ENTITY_STARTER_TEMPLATE_PATH,
          destination: entityDestination,
          templateFiles: `${ENTITY_STARTER_TEMPLATE_PATH}/**`,
          data: {
            name: entityName,
            withStyles,
            withAssets,
          },
        },
      ];

      if (withStyles) {
        actions.push({
          type: 'addMany',
          base: WITH_STYLES_TEMPLATE_PATH,
          destination: entityDestination,
          templateFiles: `${WITH_STYLES_TEMPLATE_PATH}/**`,
          data: {
            name: entityName,
          },
        });
      }

      if (withAssets) {
        actions.push({
          type: 'addMany',
          base: WITH_ASSETS_TEMPLATE_PATH,
          destination: entityDestination,
          templateFiles: `${WITH_ASSETS_TEMPLATE_PATH}/**`,
          data: {},
        });
      }

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

module.exports = { makeHooksGenerator };
