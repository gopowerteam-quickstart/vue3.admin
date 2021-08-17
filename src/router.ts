import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { Router } from 'vue-router'

// 自定义路由
const routes = [{ path: '/', redirect: '/login' }]

/**
 * 安装路由守卫
 * @param router
 */
export function installGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    next()
  })
}

export default {
  routes: [...routes, ...setupLayouts(generatedRoutes)]
}
