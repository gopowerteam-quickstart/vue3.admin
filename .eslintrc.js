const { resolve } = require('path')

module.exports = {
  // 根配置文件
  root: true,
  // 当前环境
  env: {
    browser: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json'
    },
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    },
    extraFileExtensions: ['.vue']
  },
  // 扩展规则列表
  extends: [
    // ESLint typescript rules
    'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    // ESLint vue3 rules
    'plugin:vue/vue3-essential',
    // ESLint prettire rules
    'prettier',
    'plugin:prettier/recommended'
  ],

  // plugins: ['@typescript-eslint', 'vue'],
  globals: {
    process: 'readonly',
    chrome: 'readonly'
  },
  // 自定义规则
  rules: {
    // @typescript-eslint
    '@typescript-eslint/explicit-function-return-type':
      'off',
    '@typescript-eslint/explicit-module-boundary-types':
      'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    'prefer-promise-reject-errors': 'off',

    // TypeScript
    quotes: ['warn', 'single', { avoidEscape: true }],
    // 仅在开发时允许使用debug
    'no-debugger':
      process.env.NODE_ENV === 'production'
        ? 'error'
        : 'off'
  }
}
