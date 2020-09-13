module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['airbnb'],
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'import/no-cycle': 'off',
  },
};
