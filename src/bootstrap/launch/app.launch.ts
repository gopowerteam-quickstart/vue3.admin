import { Router } from 'vue-router'
import { appAction, appQuery } from '~/store/app.store'
import { userQuery } from '~/store/user.store'

// 启动逻辑
async function appLaunch1() {
  // TODO 启动示例
}

/**
 * 系统启动列表
 * @returns
 */
export default async function appLaunch(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (!appQuery.select((state) => state.ready)) {
      // 系统初始化逻辑
      await appLaunch1()

      // 设置系统准备状态
      appAction.setReady()
    }

    next()
  })
}
