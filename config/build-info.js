const gitCommit = require('git-current-commit');
const pkg = require('../package.json');

module.exports = {
  commit: gitCommit.sync(),
  version: pkg.version,
};
