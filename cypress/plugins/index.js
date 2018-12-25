const browserify = require('@cypress/browserify-preprocessor');

module.exports = (on /* , config */) => {
  const options = browserify.defaultOptions;
  options.browserifyOptions.plugin.push('tsify');

  on('file:preprocessor', browserify(options));
};
