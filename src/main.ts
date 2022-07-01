import { ViteSSG, ViteSSGContext } from 'vite-ssg'
import router from '~/router'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import '~/styles/index.less'

import '@arco-design/web-vue/dist/arco.css'
import App from './App.vue'
import { bootstrap } from './bootstrap'

/**
 * 加载模块
 * @param ctx
 */
function installModules(ctx: ViteSSGContext) {
  Object.values(import.meta.globEager('./modules/*.ts')).forEach((i) =>
    i.install?.(ctx),
  )
}

export const createApp = ViteSSG(App, router, async (ctx) => {
  // 安装基础模块
  installModules(ctx)
  // 安装启动模块
  bootstrap({ app: ctx.app, router: ctx.router })
})
