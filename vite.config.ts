import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import components from 'vite-plugin-components'
import icons, { ViteIconsResolver } from 'vite-plugin-icons'
import WindiCSS from 'vite-plugin-windicss'
import { requestPlugin as request } from '@gopowerteam/http-request-cli'
import { VitePWA as pwa } from 'vite-plugin-pwa'
import svg from 'vite-svg-loader'

// Ant Design Vue 主题样式
import AntDesignVueTheme from './src/assets/styles/theme.json'

// 全局样式变量
const globalLessVaribles = path.resolve(
  __dirname,
  'src',
  'assets',
  'styles',
  'varibles.less'
)

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    vue({ script: { refSugar: true } }),
    jsx(),
    eslint(),
    pages({
      pagesDir: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue'],
      nuxtStyle: true
    }),
    layouts({
      layoutsDir: 'src/layouts'
    }),
    components({
      globalComponentsDeclaration:
        'typings/components.d.ts',
      dirs: ['src/shared/components'],
      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: 'icon'
        })
      ]
    }),
    icons(),
    WindiCSS({}),
    request({
      root: path.resolve(__dirname, 'src'),
      alias: '~',
      serviceDir: 'http/services',
      serviceDeclaration: 'typings/request.d.ts'
    }),
    pwa(),
    svg()
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${globalLessVaribles}";`,
        modifyVars: AntDesignVueTheme,
        javascriptEnabled: true
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core']
  }
})
