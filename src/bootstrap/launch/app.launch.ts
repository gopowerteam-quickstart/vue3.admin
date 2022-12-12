import { useStore } from '@/store'
import type { Router } from 'vue-router'

// 启动逻辑
async function appLaunch1() {
  // TODO 启动示例
}

/**
 * 系统启动列表
 * @returns
 */
export default async function appLaunch(router: Router) {
  const store = useStore()

  router.beforeEach(async (to, from, next) => {
    if (!store.app.ready) {
      // 系统初始化逻辑
      await appLaunch1()

      // 设置系统准备状态
      store.app.setReady()
    }

    next()
  })
}
