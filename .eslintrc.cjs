module.exports = {
  extends: ['plugin:wkovacs64/react', 'plugin:wkovacs64/typescript', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
  ignorePatterns: ['vite.config.ts'],
  overrides: [
    {
      files: ['playwright/tests/*.spec.ts'],
      extends: ['plugin:playwright/playwright-test'],
    },
  ],
};
