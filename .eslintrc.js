module.exports = {
  extends: ['@wkovacs64/eslint-config-ts-react'],
  plugins: ['emotion'],
  rules: {
    // 'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/import-from-emotion': 'error',
    'emotion/styled-import': 'error',
    'emotion/syntax-preference': ['error', 'string'],
  },
};
