/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
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
