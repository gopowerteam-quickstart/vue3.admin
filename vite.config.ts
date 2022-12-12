import { defineConfig } from 'vite'
import { defineVitePlugins } from './.vite/plugins'
import { defineViteResolve } from './.vite/resolve'
import { defineViteCSS } from './.vite/css'
import svg from 'vite-svg-loader'

export default defineConfig({
  ...defineViteResolve(),
  ...defineViteCSS(),
  ...defineVitePlugins([svg()]),
})
