import httpBoot from './http.boot'
import launchBoot from './launch.boot'
import { App } from 'vue'
import { Router } from 'vue-router'
import componentBoot from './component.boot'
// import { pluginBoot } from './plugin.boot'

export const boot = ({
  app,
  router
}: {
  app: App<Element>
  router: Router
}) => {
  // 网络配置安装
  httpBoot()
  // 全局组件配置
  componentBoot(app)
  // 启动安装
  launchBoot(router)
}
