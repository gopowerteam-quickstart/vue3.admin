module.exports = {
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  extends: ['@gopowerteam/eslint-config', './.eslintrc-auto-import.json'],
  rules: {
    'vue/valid-template-root': ['off'],
    'vue/one-component-per-file': ['off'],
    'vue/multi-word-component-names': ['off'],
    'no-console': ['warn'],
    'vue/require-default-prop': ['off'],
    'eslint-comments/no-unlimited-disable': 'off',
    'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
    // eslint-plugin-vue 规则：要求组件名在模板中使用 PascalCase 命名法
    'vue/component-name-in-template-casing': ['off', 'PascalCase', {
      registeredComponentsOnly: true,
    }],
    // 控制html代码缩进
    'vue/html-indent': ['error', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: true,
      ignores: [],
    }],
    // eslint-plugin-vue 规则：允许单行3个属性,多行1一个属性
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 1,
      },
    }],
    'no-sequences': ['off'],
    'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
    'vue/no-unused-refs': ['off'],
  },
}
