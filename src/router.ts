import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'

// 自定义路由
const routes = [
  // 根目录跳转
  { path: '/', redirect: '/login' },
  // 首页跳转
  { path: '/home', redirect: '/page1' }
]

export default {
  routes: [...routes, ...setupLayouts(generatedRoutes)]
}
