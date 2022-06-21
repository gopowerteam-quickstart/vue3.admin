import { createStore, withProps, setProp } from '@ngneat/elf'
import {
  excludeKeys,
  localStorageStrategy,
  persistState,
} from '@ngneat/elf-persist-state'
import { map } from 'rxjs'
import { StoreAction, StoreQuery } from '~/store'

interface State {
  token: string
  current?: User
}

interface User {
  id: string
  name: string
}

const STORE_KEY = 'user'

const userStore = createStore(
  { name: STORE_KEY },
  withProps<State>({ token: '' }),
)

/**
 * 持久化存储
 */
persistState(userStore, {
  key: STORE_KEY,
  storage: localStorageStrategy,
  source: () => userStore.pipe(excludeKeys(['current'])),
})

/**
 * 查询操作
 */
class UserQuery extends StoreQuery<State> {
  constructor() {
    super(userStore)
  }

  get isLogin() {
    return this.steam$.pipe(map((state) => state.token.length))
  }
}

class UserAction extends StoreAction<State> {
  constructor() {
    super(userStore)
  }

  /**
   * 更新用户
   * @param user
   */
  updateUser(user: User) {
    this.store.update(setProp('current', user))
  }

  /**
   * 更新用户
   * @param user
   */
  updateToken(token: string) {
    this.store.update(setProp('token', token))
  }
}

export const userQuery = new UserQuery()
export const userAction = new UserAction()
