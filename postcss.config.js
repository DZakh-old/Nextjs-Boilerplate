const plugins = {
  'postcss-flexbugs-fixes': {},
  'postcss-css-variables': {
    preserve: true,
  },
  autoprefixer: {},
};

if (process.env.NODE_ENV !== 'development') {
  plugins.cssnano = {};
}

module.exports = {
  plugins,
};
