import { createStore, withProps, setProp, setProps } from '@ngneat/elf'
import { StoreAction, StoreQuery } from '~/store'
import { Menu } from '~/types/menu'

interface State {
  // 系统准备状态
  ready: boolean
  // 侧边栏展开状态
  collapsed: boolean
  // 系统菜单列表
  menus: Menu[]
  // 顶部菜单列表
  headerMenus: Menu[]
  // 侧边菜单列表
  sideMenus: Menu[]
}

const STORE_KEY = 'app'

const appStore = createStore(
  { name: STORE_KEY },
  withProps<State>({
    ready: false,
    collapsed: false,
    // 用户菜单列表
    menus: [],
    headerMenus: [],
    sideMenus: [],
  }),
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

  /**
   * 切换侧边栏展开状态
   */
  toggleCollapse() {
    const { collapsed } = this.store.getValue()

    this.store.update(setProp('collapsed', !collapsed))
  }

  /**
   * 切换侧边栏展开状态
   */
  updateMenus(menus: Menu[]) {
    this.store.update(setProp('menus', menus))
  }

  /**
   * 更新顶部菜单
   * @param menus
   */
  updateHeaderMenus(menus: Menu[]) {
    this.store.update(setProp('headerMenus', menus))
  }

  /**
   * 更新侧边菜单
   * @param menus
   */
  updateSideMenus(menus: Menu[]) {
    this.store.update(setProp('sideMenus', menus))
  }
}

export const appQuery = new AppQuery()
export const appAction = new AppAction()
