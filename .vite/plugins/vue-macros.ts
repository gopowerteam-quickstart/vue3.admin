import macros from 'unplugin-vue-macros/vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'

export default macros({
  setupBlock: false,
  setupSFC: false,
  hoistStatic: false,
  plugins: {
    vue: vue({
      include: [/\.vue$/],
      reactivityTransform: true,
    }),
    vueJsx: jsx(),
  },
})
