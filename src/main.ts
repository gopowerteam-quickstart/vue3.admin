import 'vue-global-api'
import { ViteSSG, ViteSSGContext } from 'vite-ssg'
import { createPinia } from 'pinia'

// Windicss配置
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

import App from './App.vue'
import router, { installGuard } from '~/router'
import { boot } from './bootstrap/boots'

/**
 * 安装模块
 */
function installModules(ctx: ViteSSGContext) {
  // 加载模块
  Object.values(
    import.meta.globEager('./modules/*.ts')
  ).map(i => i.install?.(ctx))
}

export const createApp = ViteSSG(App, router, ctx => {
  // 安装Store
  ctx.app.use(createPinia())
  // 安装基础模块
  installModules(ctx)
  installGuard(ctx.router)
  // 安装启动模块
  boot({ app: ctx.app, router: ctx.router })
})
