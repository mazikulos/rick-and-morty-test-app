module.exports = {
  root: true,

  env: {
      node: true,
  },
  extends: [
      '@vue/standard',
      '@vue/typescript/recommended',
      'plugin:vue/vue3-recommended',
      'prettier',
  ],

  plugins: ['prettier'],

  parserOptions: {
      ecmaVersion: 2020,
      parser: '@typescript-eslint/parser',
  },
}