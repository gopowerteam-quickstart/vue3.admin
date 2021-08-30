module.exports = {
  useTabs: false,
  trailingComma: 'none',
  tabWidth: 2,
  printWidth: 60,
  semi: false,
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  pugAttributeSeparator: 'none',
  pugEmptyAttributes: 'none',
  pugClosingBracketPosition: 'last-line',
  pugSortAttributes: 'asc',
  pugClassNotation: 'literal',
  plugins: [require.resolve('@prettier/plugin-pug')]
}
