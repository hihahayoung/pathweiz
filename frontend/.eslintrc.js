// frontend/.eslintrc.js
module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended', // Integrates Prettier with ESLint
    ],
    plugins: ['react'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 13, // You can use the latest ECMAScript features
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
        'react/prop-types': ['off']
    },
  };
  