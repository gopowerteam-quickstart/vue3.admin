import { createStore, withProps, setProp, setProps } from '@ngneat/elf'
import { StoreAction, StoreQuery } from '~/store'
import type { Menu, Tab } from '~/types/workspace'

interface State {
  // 系统准备状态
  ready: boolean
  // 页面标题
  title: string
  // 侧边栏展开状态
  collapsed: boolean
  // 系统菜单列表
  menus: Menu[]
  // 顶部菜单列表
  headerMenus: Menu[]
  // 侧边菜单列表
  sideMenus: Menu[]
  // 选项卡列表
  tabs: Tab[]
}

const STORE_KEY = 'app'

const appStore = createStore(
  { name: STORE_KEY },
  withProps<State>({
    ready: false,
    title: '',
    collapsed: false,
    // 用户菜单列表
    menus: [],
    headerMenus: [],
    sideMenus: [],
    tabs: [],
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
   */
  setReady() {
    this.store.update(setProp('ready', true))
  }

  /**
   * 页面标题
   */
  updateTitle(title: string) {
    this.store.update(setProp('title', title))
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

  /**
   * 添加Tab
   */
  addTab(tab: Tab) {
    const { tabs } = this.store.getValue()
    this.store.update(
      setProps({
        tabs: [...tabs, tab],
      }),
    )
  }

  /**
   * 删除Tab
   */
  deleteTab(key: string | string[]) {
    const { tabs } = this.store.getValue()
    const keys = Array.isArray(key) ? key : [key]

    if (tabs.length === 1) {
      return
    }

    // 删除已关闭Tab

    this.store.update(
      setProp(
        'tabs',
        tabs.filter((tab) => !keys.includes(tab.key)),
      ),
    )
  }
}

export const appQuery = new AppQuery()
export const appAction = new AppAction()
