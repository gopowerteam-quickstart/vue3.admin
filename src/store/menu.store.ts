import { defineStore } from 'pinia'
import {
  menuConfig,
  MenuItemConfig
} from '~/config/menu.config'

const STORE_ID = 'menu'

type State = {
  drawerVisiable: boolean
  collapsed: boolean
  siderMenus: MenuItemConfig[]
  headerMenus: MenuItemConfig[]
}

const initialState: State = {
  drawerVisiable: false,
  collapsed: false,
  siderMenus: menuConfig,
  headerMenus: []
}

export const useStore = defineStore(STORE_ID, {
  state: () => initialState,
  actions: {
    updateDrawerVisiable(value: boolean) {
      this.drawerVisiable = value
    },
    updateCollapsed() {
      this.collapsed = !this.collapsed
    },
    updateHeaderMenus(menus: MenuItemConfig[]) {
      this.headerMenus = menus
    }
  }
})
