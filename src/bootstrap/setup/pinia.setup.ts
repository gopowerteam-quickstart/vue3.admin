import { createPinia } from 'pinia'
import type { App } from 'vue'

import persist from 'pinia-plugin-persistedstate'

/**
 * pinia安装
 * @param {App} app
 */
export default function (app: App) {
  const pinia = createPinia()
  pinia.use(persist)
  app.use(pinia)
}
