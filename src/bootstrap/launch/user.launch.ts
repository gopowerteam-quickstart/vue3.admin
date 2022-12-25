import { useStore } from '@/store'
import type { Router } from 'vue-router'

async function getUserDataByToken() {
  const store = useStore()

  store.user.updateUser({ id: '1', name: 'test user' })
}
/**
 * 系统启动列表
 * @returns
 */
export default function userLaunch(router: Router) {
  const store = useStore()

  router.beforeEach(async (to, from, next) => {
    if (to.meta.requireAuth === false) {
      return next()
    }

    if (!store.user.token) {
      return next('/login')
    }
    // 使用Token更新用户信息
    if (!store.user.current) {
      await getUserDataByToken()
        .then(() => store.menu.generateMenus(router))
        .catch(() => {
          return next('/login')
        })
    }

    // 验证用户角色
    // if (to.meta.requireRoles && false) {
    //   return next('403')
    // }

    next()
  })
}
