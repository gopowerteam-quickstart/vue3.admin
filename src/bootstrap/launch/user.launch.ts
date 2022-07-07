import { Router } from 'vue-router'
import { appConfig } from '~/config/app.config'
import menus from '~/config/menu.config'
import { appAction } from '~/store/app.store'
import { userQuery } from '~/store/user.store'
import type { Menu } from '~/types/workspace'
/**
 * 启动websocket
 * @returns
 */
function websocketLaunch() {
  return Promise.resolve()
}

/**
 * 检测用户菜单权限
 */
function checkUserMenuRole(menu: Menu) {
  // TODO: 用户菜单权限检测
  return true
}

/**
 * 生成用户菜单
 */
function generateUserMenu(router: Router) {
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
          auth: route.children[0]?.meta?.auth,
          // 菜单配置信息
          ...(route.children[0]?.meta?.menu as Record<string, string>),
        } as Menu),
    )

  // 当前用户菜单列表
  const userMenus: Menu[] = [...pages, ...menus].filter(checkUserMenuRole)

  // 获取根菜单项
  const roots = userMenus.filter(
    (route) => route.key && !route.key.includes('.'),
  )

  // TODO: 处理排序排序问题
  // 生成用户菜单树
  const createMenuTree = (menu: Menu) => {
    const children = userMenus.filter(
      (route) => route.key === `${menu.key}.${route.key.split('.').slice(-1)}`,
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
  appAction.updateMenus(userMenus)

  // 更新顶部菜单
  // 更新侧边菜单
  switch (appConfig.workspace.navigation) {
    case 'header':
      appAction.updateHeaderMenus(headerMenus)
      break
    case 'side':
      appAction.updateSideMenus(headerMenus)
      break
    case 'all': {
      headerMenus.forEach((m) => (m.isLeaf = true))
      appAction.updateHeaderMenus(headerMenus)

      break
    }
  }
}
/**
 * 系统启动列表
 * @returns
 */
export default function userLaunch(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (!userQuery.select((state) => state.current)) {
      // 设置用户状态
      await generateUserMenu(router)
    }

    next()
  })
}
