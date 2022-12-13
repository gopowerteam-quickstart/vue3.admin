const prettierBase = require('./.prettier/prettierrc-base.js')
const prettierPug = require('./.prettier/prettierrc-pug.js')

module.exports = {
  plugins: [require.resolve('@prettier/plugin-pug')],
  ...prettierBase,
  ...prettierPug,
}
