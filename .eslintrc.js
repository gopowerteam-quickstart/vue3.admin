module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: [
    // 基础规则引入
    'eslint:recommended',
    // React规则引入
    // 'plugin:react/recommended',
    // prettier规则引入&处理perttier-eslint冲突
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  overrides: [
    {
      files: ['**/*.{js,jsx}'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: false,
        ecmaFeatures: {
          globalReturn: false,
        },
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        // typescript支持引入
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      },
    },
    {
      files: ['**/*.vue'], // 只处理 vue 文件
      extends: [
        // vue3支持引入
        // 'plugin:vue/vue3-essential',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:vue/vue3-recommended',
        'plugin:vue-pug/vue3-recommended',
        'plugin:prettier-vue/recommended',
        // typescript支持引入
        '@vue/typescript',
      ],
      rules: {
        'vue/one-component-per-file': ['off'],
        'vue/multi-word-component-names': ['off'],
        // 'vue/max-attributes-per-line': ['off'],
        // 'vue/html-indent': ['off']
        // 'vue/attributes-order': ['off'],
        'no-console': ['warn'],
        'vue/require-default-prop': ['off'],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      },
    },
  ],
}
