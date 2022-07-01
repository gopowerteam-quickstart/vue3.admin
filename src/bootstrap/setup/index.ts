import { App } from 'vue'
import componentSetup from './component.setup'

/**
 * 系统基础功能配置
 * @param app
 */
export default function (app: App<Element>) {
  componentSetup(app)
}
