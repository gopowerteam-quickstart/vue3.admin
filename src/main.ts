import { ViteSSG, type ViteSSGContext } from 'vite-ssg'
import router from '~/router'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import '~/styles/index.less'

import App from './App.vue'
import { bootstrap } from './bootstrap'

/**
 * 加载模块
 * @param ctx
 */
function installModules(ctx: ViteSSGContext) {
  Object.values(
    import.meta.glob('./modules/*.ts', { eager: true }) as Record<
      string,
      { install: (ctx: ViteSSGContext) => void }
    >,
  ).forEach((i) => i.install?.(ctx))
}

/**
 * 初始化
 */
export const createApp = ViteSSG(App, router, async (ctx) => {
  // 安装基础模块
  installModules(ctx)
  // 安装启动模块
  bootstrap({ app: ctx.app, router: ctx.router })
})
