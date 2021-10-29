import { RxStomp } from '@stomp/rx-stomp'
import { map, Observable } from 'rxjs'
import { appConfig } from '~/config/app.config'
import { useStore } from '~/store'

/**
 * websocket对象
 */
export class WebSocketService {
  private static stomp: RxStomp

  public static setup() {
    const userStore = useStore(store => store.user)
    const rxStomp = new RxStomp()

    // 配置Stomp对象
    rxStomp.configure({
      connectHeaders: {
        'X-EmployeeToken': userStore.token
      },
      reconnectDelay: 1000,
      webSocketFactory: () => {
        return new SockJS(appConfig.websocket.enpoint)
      }
    })

    rxStomp.activate()

    WebSocketService.stomp = rxStomp
  }

  /**
   * 创建待订阅对象
   * @param event
   */
  public createSubscribable(event: string) {
    if (
      !WebSocketService.stomp ||
      !WebSocketService.stomp.active
    ) {
      throw Error('请初始化订阅消息服务')
    }

    return WebSocketService.stomp.watch(event).pipe(
      map(message => {
        const { content } = JSON.parse(message.body)
        return JSON.parse(content)
      })
    )
  }
}

/**
 * 创建websocket监听
 * @param select
 * @returns
 */
export function useWebSocket(
  select: (events: typeof subscriptionEvent) => string
) {
  const websocket = new WebSocketService()
  return websocket.createSubscribable(
    select(subscriptionEvent)
  )
}

const subscriptionEvent = appConfig.websocket.events
