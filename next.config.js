/* eslint-disable fp/no-mutation */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');
const withOptimizedImages = require('next-optimized-images');
const withSass = require('@zeit/next-sass');

module.exports = withPlugins([[withSass, { cssModules: true }], withFonts, withOptimizedImages]);
