module.exports = {
  extends: [
    'plugin:wkovacs64/react',
    'plugin:wkovacs64/testing-library',
    'plugin:wkovacs64/typescript',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['emotion'],
  rules: {
    // 'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/import-from-emotion': 'error',
    'emotion/styled-import': 'error',
    'emotion/syntax-preference': ['error', 'string'],
  },
};
