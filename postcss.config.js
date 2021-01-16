/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
      stage: 0,
    }),
  ],
};
