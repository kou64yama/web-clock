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
  overrides: [
    {
      files: [
        'src/**/*.test.js',
        'src/**/*.test.ts',
        'src/**/*.spec.js',
        'src/**/*.spec.ts',
        'src/__tests__/**/*.js',
        'src/__tests__/**/*.ts',
      ],
      extends: ['plugin:jest/recommended'],
    },
    {
      files: ['cypress/**/*.js', 'cypress/**/*.ts'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
};
