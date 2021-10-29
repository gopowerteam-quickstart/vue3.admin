import type { MenuItemConfig } from '~/config/menu.config'

/**
 * 获取当前路由的菜单项
 * @param menus
 * @param path
 * @returns
 */
export function getCurrentMenuByPath(
  menus: MenuItemConfig[],
  path: string
) {
  let finished = false
  const result: MenuItemConfig[] = []

  const action = (menu: MenuItemConfig) => {
    if (finished) return

    result.push(menu)

    if (menu.path === path) {
      finished = true
      return
    }

    if (menu.children) {
      menu.children.forEach(action)
    }

    if (!finished) {
      result.pop()
    }
  }

  menus.forEach(action)

  return result
}
