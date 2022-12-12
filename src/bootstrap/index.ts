import type { App } from 'vue'
import type { Router } from 'vue-router'
import appLaunch from './launch/app.launch'
import userLaunch from './launch/user.launch'
import setup from './setup'

export const bootstrap = async ({
  app,
  router,
}: {
  app: App<Element>
  router: Router
}) => {
  // 系统基础功能配置
  setup(app)
  // 系统初始化逻辑
  appLaunch(router)
  // 用户初始化逻辑
  userLaunch(router)
}
