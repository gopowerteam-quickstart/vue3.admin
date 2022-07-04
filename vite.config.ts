import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import pages from 'vite-plugin-pages'
import layouts from 'vite-plugin-vue-layouts'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import unocss from 'unocss/vite'

// 全局样式变量
const globalLessVaribles = resolve(__dirname, 'src', 'styles', 'varibles.less')
import ArcoDesignVueTheme from './src/styles/theme.json'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${globalLessVaribles}";`,
        modifyVars: ArcoDesignVueTheme,
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    // Vue语法支持配置
    vue({ include: [/\.vue$/], reactivityTransform: true }),
    // 自动导入插件配置
    autoImport({
      imports: [
        'vue',
        'vue-router',
        'vue/macros',
        '@vueuse/head',
        '@vueuse/core',
      ],
      dts: 'src/types/auto-imports.d.ts',
      dirs: [],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    // 自动布局插件配置
    layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'blank',
    }),
    // 自动路由插件配置
    pages({
      pagesDir: [{ dir: 'src/views', baseRoute: '' }],
      exclude: ['**/components/*.vue'],
      extensions: ['vue'],
      routeStyle: 'nuxt',
    }),
    // 自动引入组件插件配置
    components({
      dts: 'src/types/components.d.ts',
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
        iconsResolver({
          prefix: 'icon',
          alias: {
            park: 'icon-park',
          },
          enabledCollections: ['icon-park'],
        }),
      ],
      include: [/\.vue$/, /\.vue\?vue/],
    }),
    // 自动导入图标插件配置
    icons({
      scale: 1.5,
    }),
    unocss(),
  ],
})
