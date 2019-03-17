const gitCommit = require('git-current-commit');

module.exports = {
  commit: gitCommit.sync(),
};
