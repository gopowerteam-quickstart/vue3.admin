import httpBoot from './http.boot'
import launchBoot from './launch.boot'
import { App } from 'vue'
import { Router } from 'vue-router'
// import { componentsBoot } from './component.boot'
// import { pluginBoot } from './plugin.boot'

export const boot = ({
  router
}: {
  app: App<Element>
  router: Router
}) => {
  // 网络配置安装
  httpBoot()
  // 启动安装
  launchBoot(router)
}
