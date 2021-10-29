import { WebSocketService } from '~/shared/services/websocket.service'
/**
 * 启动websocket
 * @returns
 */
function websocketLaunch() {
  WebSocketService.setup()
  return Promise.resolve()
}

/**
 * 系统启动列表
 * @returns
 */
export default function userLaunch() {
  return [websocketLaunch()]
}
