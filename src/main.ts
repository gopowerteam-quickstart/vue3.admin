import { ViteSSG, ViteSSGContext } from 'vite-ssg'
import { createPinia } from 'pinia'

// Windicss配置
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'
import '~/assets/styles/index.less'

import App from './App.vue'
import router from '~/router'
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
  // 安装基础模块
  installModules(ctx)
  // 安装Store
  ctx.app.use(createPinia())
  // 安装启动模块
  boot({ app: ctx.app, router: ctx.router })
})
