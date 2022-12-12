import autoImport from 'unplugin-auto-import/vite'

export default autoImport({
  imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/head', '@vueuse/core'],
  dts: 'src/types/auto-imports.d.ts',
  dirs: [],
  vueTemplate: true,
  eslintrc: {
    enabled: true,
  },
})
