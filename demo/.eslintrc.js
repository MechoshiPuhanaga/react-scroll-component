module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['jsx-a11y', 'prettier', 'react', 'react-hooks'],
  root: true,
  rules: {
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
    'import/no-unresolved': 'off',
    'linebreak-style': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'error',
    'react/react-in-jsx-scope': 'off'
  }
};
