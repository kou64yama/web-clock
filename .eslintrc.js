module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    'prettier',
  ],
};
