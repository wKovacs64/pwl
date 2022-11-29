module.exports = {
  extends: [
    'plugin:wkovacs64/react',
    'plugin:wkovacs64/testing-library',
    'plugin:wkovacs64/typescript',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
  ignorePatterns: ['cypress.config.ts', 'vite.config.ts'],
};
