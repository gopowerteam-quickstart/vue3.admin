/**
 * 启动websocket
 * @returns
 */
function websocketLaunch() {
  return Promise.resolve()
}

/**
 * 系统启动列表
 * @returns
 */
export default function userLaunch() {
  return [websocketLaunch()]
}
