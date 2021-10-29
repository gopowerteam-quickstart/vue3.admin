import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'
import WindiCSS from 'vite-plugin-windicss'
import request from '@gopowerteam/http-request/vite-plugin'
// import { VitePWA as pwa } from 'vite-plugin-pwa'
import svg from 'vite-svg-loader'
import autoImport from 'unplugin-auto-import/vite'

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
    vue(),
    jsx(),
    eslint(),
    autoImport({
      dts: 'typings/auto-imports.d.ts',
      include: [/\.vue\??/],
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': []
        },
        {
          '~/shared/common': ['get', 'set']
        }
      ]
    }),
    pages({
      pagesDir: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue'],
      extensions: ['vue'],
      nuxtStyle: true
    }),
    layouts({
      layoutsDir: 'src/layouts'
    }),
    components({
      dts: 'typings/components.d.ts',
      dirs: ['src/layouts/components'],
      resolvers: [
        AntDesignVueResolver(),
        iconsResolver({
          componentPrefix: 'icon'
        })
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    }),
    icons(),
    WindiCSS({}),
    request({
      root: path.resolve(__dirname, 'src'),
      alias: '~',
      serviceDir: 'http/services',
      serviceDeclaration: 'typings/request.d.ts'
    }),
    // pwa(),
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
