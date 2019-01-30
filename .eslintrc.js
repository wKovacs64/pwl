module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['emotion', 'react-hooks', '@typescript-eslint'],
  rules: {
    // 'emotion/jsx-import': 'error',
    'emotion/no-vanilla': 'error',
    'emotion/import-from-emotion': 'error',
    'emotion/styled-import': 'error',
    'emotion/syntax-preference': ['error', 'string'],
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'no-nested-ternary': 'off',
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
  },
  overrides: [
    {
      files: ['**/*.ts{,x}'],
      rules: {
        'react/prop-types': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/class-name-casing': 'error',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/interface-name-prefix': 'error',
        '@typescript-eslint/no-angle-bracket-type-assertion': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-inferrable-types': [
          'error',
          { ignoreProperties: false, ignoreParameters: false },
        ],
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-object-literal-type-assertion': 'error',
        '@typescript-eslint/no-parameter-properties': 'error',
        '@typescript-eslint/no-triple-slash-reference': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-interface': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    },
  },
};
