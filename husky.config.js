module.exports = {
  hooks: {
    'pre-commit': 'tsc && lint-staged',
  },
};
