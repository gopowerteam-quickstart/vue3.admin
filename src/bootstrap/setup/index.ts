import type { App } from 'vue'
import componentSetup from './component.setup'
import httpSetup from './http.setup'
import pluginSetup from './plugin.setup'

/**
 * 系统基础功能配置
 * @param app
 */
export default function (app: App<Element>) {
  pluginSetup(app)
  componentSetup(app)
  httpSetup()
}
