import pages from 'vite-plugin-pages'

export default pages({
  pagesDir: [{ dir: 'src/views', baseRoute: '' }],
  exclude: ['**/components/*.vue'],
  extensions: ['vue'],
  routeStyle: 'nuxt',
})
