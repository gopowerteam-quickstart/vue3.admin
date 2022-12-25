import { appConfig } from '@/config/app.config'
import type { Menu } from '@/types/workspace'
import { defineStore } from 'pinia'
import type { Router } from 'vue-router'
import menus from '~/config/menu.config'

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

    /**
     * 检测用户菜单权限
     */
    checkMenuRole(menu: Menu) {
      // TODO: 用户菜单权限检测 requireRoles includes userRoles
      return true
    },

    /**
     * 生成用户菜单
     */
    generateMenus(router: Router) {
      // 获取路由菜单
      const pages = router
        .getRoutes()
        .filter(
          (route) =>
            route.children.length &&
            route.children[0]?.meta?.menu &&
            route.children[0]?.meta?.layout === 'workspace',
        )
        .map(
          (route) =>
            ({
              path: route.path,
              name: route.children[0].name,
              // 认证配置信息
              requireAuth: route.children[0]?.meta?.requireAuth ?? true,
              requireRoles: route.children[0]?.meta?.requireRoles,
              // 菜单配置信息
              ...(route.children[0]?.meta?.menu as Record<string, string>),
            } as Menu),
        )

      // 当前用户菜单列表
      const userMenus: Menu[] = [...pages, ...menus].filter(this.checkMenuRole)

      // 获取根菜单项
      const roots = userMenus.filter(
        (route) => route.key && !route.key.includes('.'),
      )

      // TODO: 处理排序排序问题
      // 生成用户菜单树
      const createMenuTree = (menu: Menu) => {
        const children = userMenus.filter(
          (route) =>
            route.key === `${menu.key}.${route.key.split('.').slice(-1)}`,
        )

        if (!menu.path) {
          menu.children = children.map(createMenuTree).filter(Boolean) as Menu[]
        } else {
          menu.isLeaf = true
        }

        // 去除无子节点的空目录
        if (!menu.path && menu.children?.length === 0) {
          return
        } else {
          return menu
        }
      }

      // 获取用户顶部菜单
      const headerMenus = roots
        .map(createMenuTree)
        .filter(Boolean)
        .filter((menu) => menu?.path || menu?.children?.length) as Menu[]

      // 更新用户菜单
      this.updateMenus(userMenus)
      // 更新顶部菜单
      // 更新侧边菜单
      switch (appConfig.workspace.navigation) {
        case 'header':
          this.updateHeaderMenus(headerMenus)
          break
        case 'side':
          this.updateSideMenus(headerMenus)
          break
        case 'all': {
          headerMenus.forEach((m) => (m.isLeaf = true))
          this.updateHeaderMenus(headerMenus)
          break
        }
      }
    },
  },
})
