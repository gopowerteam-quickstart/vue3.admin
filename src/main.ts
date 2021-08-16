import 'vue-global-api'
import { ViteSSG } from 'vite-ssg'

// Windicss配置
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

import App from './App.vue'
import { routes } from '~/router'

export const createApp = ViteSSG(
  App,
  {
    routes
  },
  ctx => {
    // 加载模块
    Object.values(
      import.meta.globEager('./modules/*.ts')
    ).map(i => i.install?.(ctx))
  }
)
