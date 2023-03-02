import { defineConfig } from 'vite'
import { defineVitePlugins } from './.vite/plugins'
import { defineViteResolve } from './.vite/resolve'
import { defineViteCSS } from './.vite/css'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

import svg from 'vite-svg-loader'

export default defineConfig({
  ...defineViteResolve(),
  ...defineViteCSS(),
  ...defineVitePlugins([
    vue({
      include: [/\.vue$/],
      reactivityTransform: true,
    }),
    jsx(),
    svg(),
  ]),
})
