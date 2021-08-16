import 'vue-global-api'
import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

// windicss layers
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

import App from './App.vue'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(App, { routes }, ctx => {
  // install all modules under `modules/`
  Object.values(
    import.meta.globEager('./modules/*.ts')
  ).map(i => i.install?.(ctx))
})
