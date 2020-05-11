module.exports = {
  env: {
    'cypress/globals': true,
  },
  plugins: ['cypress'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'jest/valid-expect-in-promise': 'off',
    'testing-library/await-async-query': 'off',
    'testing-library/prefer-screen-queries': 'off',
  },
};
