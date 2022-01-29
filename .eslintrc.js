module.exports = {
  extends: [
    'plugin:wkovacs64/react',
    'plugin:wkovacs64/testing-library',
    'plugin:wkovacs64/typescript',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    // TODO: remove for eslint-plugin-wkovacs64@13.11.0
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
};
