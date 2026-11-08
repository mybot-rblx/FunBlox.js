module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'object-curly-spacing': 0,
  },
};
