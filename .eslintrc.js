const cliRulesOverrides = {
  // Prevent eslint from autofixing this rule
  'react-hooks/exhaustive-deps': 'off',
};

module.exports = {
  env: {
    es6: true,
  },
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    'import/resolver': {
      typescript: {}, // This loads <rootdir>/tsconfig.json to eslint
    },
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:sonarjs/recommended',
    'plugin:prettier/recommended',
    'plugin:lodash/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['optimize-regex', 'sonarjs', 'no-loops', 'no-use-extend-native', 'prettier', 'lodash'],
  rules: {
    'optimize-regex/optimize-regex': 'warn',
    'no-loops/no-loops': 'warn',
    'prettier/prettier': 'warn',

    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/jsx-fragments': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],

    // It's an impossible rule to follow
    'sonarjs/cognitive-complexity': 'off',

    // Deal with prettier
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: false,
        assignment: false,
      },
    ],
    'react/jsx-one-expression-per-line': 'off',

    'no-underscore-dangle': 'off',
    camelcase: 'off',
    'prefer-rest-params': 'off',
    curly: ['error', 'all'],
    'no-console': ['error', { allow: ['error'] }],

    // For the next-optimized-images
    'import/no-unresolved': [
      'error',
      { ignore: ['\\.(png|jpg|svg)\\?(url|original|include|inline|webp|sprite)$'] },
    ],
    // I'm not a Deno creator, I won't force you :)
    'import/extensions': 'off',
    // Instead try to avoid use of default exports
    'import/prefer-default-export': 'off',
    // Set a strict order of imports
    'import/order': [
      'error',
      {
        groups: ['object', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          // Separate lodash methods from other libs
          { pattern: 'lodash/*', group: 'external', position: 'after' },

          // Split the main components of the app to avoid a solid wall of imports.
          // Other folders from the src will be imported together.
          { pattern: '@/utils/**', group: 'internal', position: 'after' },
          { pattern: '@/components/**', group: 'internal', position: 'after' },

          { pattern: './*.module.scss', group: 'index', position: 'after' },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Для работы с immer
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsForRegex: ['[dD]raft'] },
    ],

    ...(process.env.ESLINT_CLI ? cliRulesOverrides : {}),
  },
  globals: {
    React: 'writable',
  },
};