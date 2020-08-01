module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "quotes": ["error", "double"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/no-array-index-key": 0,
    "react/prop-types": 0,
  },
};
