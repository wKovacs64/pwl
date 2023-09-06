module.exports = {
  extends: [
    'plugin:wkovacs64/react',
    'plugin:wkovacs64/testing-library',
    'plugin:wkovacs64/typescript',
    'plugin:playwright/playwright-test',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
  ignorePatterns: ['vite.config.ts'],
};
