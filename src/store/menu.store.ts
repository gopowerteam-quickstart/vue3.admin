import type { Menu } from '@/types/workspace'
import { defineStore } from 'pinia'

type State = {
  // 侧边栏展开状态
  collapsed: boolean
  // 系统菜单列表
  menus: Menu[]
  // 顶部菜单列表
  headerMenus: Menu[]
  // 侧边菜单列表
  sideMenus: Menu[]
}

const initialState: State = {
  collapsed: false,
  menus: [],
  headerMenus: [],
  sideMenus: [],
}

export const useMenuStore = defineStore('menu', {
  state: () => initialState,
  actions: {
    /**
     * 切换侧边栏展开状态
     */
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },

    /**
     * 切换侧边栏展开状态
     */
    updateMenus(menus: Menu[]) {
      this.menus = menus
    },

    /**
     * 更新顶部菜单
     * @param menus
     */
    updateHeaderMenus(menus: Menu[]) {
      this.headerMenus = menus
    },

    /**
     * 更新侧边菜单
     * @param menus
     */
    updateSideMenus(menus: Menu[]) {
      this.sideMenus = menus
    },
  },
})
