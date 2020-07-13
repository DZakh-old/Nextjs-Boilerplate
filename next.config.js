/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withOptimizedImages = require('next-optimized-images');

const sassConfig = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[path]--[name]__[local]__[hash:base64:5]',
  },
};

const optimizedImagesConfig = {
  inlineImageLimit: 8192,
  imagesFolder: 'images',
  imagesName: '[name]-[hash].[ext]',
  optimizeImagesInDev: false,
  mozjpeg: {
    quality: 80,
  },
  optipng: {
    optimizationLevel: 3,
  },
  pngquant: false,
  gifsicle: {
    interlaced: true,
    optimizationLevel: 3,
  },
  svgo: {
    // enable/disable svgo plugins here
  },
  webp: {
    preset: 'default',
    quality: 75,
  },
};

const nextConfiguration = {
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: config => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');

    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      })
    );

    config.module.rules.push({
      test: /\.(woff|woff2|eot|otf|ttf)(\?v=\d\.\d\.\d)?$/,
      loader: 'url-loader',
      options: {
        limit: 100000,
        esModule: false,
      },
    });

    return config;
  },
};

module.exports = withPlugins(
  [
    [withSass, sassConfig],
    [withOptimizedImages, optimizedImagesConfig],
  ],
  nextConfiguration
);
