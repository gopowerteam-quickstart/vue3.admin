module.exports = {
  plugins: ["stylelint-prettier"],
  extends: [
    // SCSS样式方案
    // "stylelint-config-standard-scss",
    // "stylelint-config-recommended-vue/scss",
    // LESS样式校验
    "stylelint-config-standard",
    "stylelint-config-recommended-less",
    "stylelint-config-recess-order",
    "stylelint-prettier/recommended",
    "stylelint-config-recommended-vue",
  ]
};
