import { createStore, withProps, setProp } from '@ngneat/elf'
import { StoreAction, StoreQuery } from '~/store'

interface State {
  ready: boolean
}

const STORE_KEY = 'app'

const appStore = createStore(
  { name: STORE_KEY },
  withProps<State>({ ready: false }),
)

/**
 * 查询操作
 */
class AppQuery extends StoreQuery<State> {
  constructor() {
    super(appStore)
  }
}

class AppAction extends StoreAction<State> {
  constructor() {
    super(appStore)
  }

  /**
   * 更新系统状态
   * @param user
   */
  setReady() {
    this.store.update(setProp('ready', true))
  }
}

export const appQuery = new AppQuery()
export const appAction = new AppAction()
