import generatedRoutes from '~pages'
import { setupLayouts } from 'virtual:generated-layouts'
import type { RouteRecord } from 'vue-router'

// 自定义路由
const routes: RouteRecord[] = []

export default {
  base: import.meta.env.BASE_URL,
  routes: [...routes, ...setupLayouts(generatedRoutes)],
}
