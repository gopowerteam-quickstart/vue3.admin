import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [vue({ script: { refSugar: true } }), jsx(), eslint()]
})
