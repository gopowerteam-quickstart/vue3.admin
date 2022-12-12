import type { App } from 'vue'
import componentSetup from './component.setup'
import piniaSetup from './pinia.setup'

/**
 * 系统基础功能配置
 * @param app
 */
export default function (app: App<Element>) {
  piniaSetup(app)
  componentSetup(app)
}
