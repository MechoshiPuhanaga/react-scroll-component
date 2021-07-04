const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: path.join(__dirname, '.babelrc')
    },
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['jsx-a11y', 'prettier', 'react', 'react-hooks'],
  root: true,
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    indent: 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
