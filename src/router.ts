import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

// 自定义路由
const routes = [{ path: '/', redirect: '/login' }]

export default {
  routes: [...routes, ...setupLayouts(generatedRoutes)]
}
