import { nanoid } from 'nanoid'
import { Component, defineAsyncComponent } from 'vue'

export type MenuItemConfig = {
  id: string
  title: string
  icon?: Component
  path?: string
  children?: MenuItemConfig[]
}

export const menuConfig: MenuItemConfig[] = [
  defineMenuItem('我的工作', {
    icon: import('~/assets/menu/我的工作.svg'),
    path: '/my-work'
  }),
  defineMenuItem('客户中心', {
    icon: import('~/assets/menu/客户中心.svg'),
    path: '/customer-center'
  }),
  defineMenuItem('报表中心', {
    icon: import('~/assets/menu/报表中心.svg')
  }),
  defineMenuItem('回访中心', {
    icon: import('~/assets/menu/回访中心.svg'),
    path: '/return-visit'
  }),
  defineMenuItem('系统设置', {
    icon: import('~/assets/menu/系统设置.svg'),
    path: '/sys-setting'
  })
]

/**
 * 定义菜单项
 * @param title
 * @param config
 * @param children
 * @returns
 */
function defineMenuItem(
  title: string,
  config?: {
    path?: string
    icon?: Promise<typeof import('*.svg')>
  } | null,
  children?: MenuItemConfig[]
): MenuItemConfig {
  const getIcon = () => {
    if (config && config.icon) {
      return defineAsyncComponent(
        () => config.icon as Promise<typeof import('*.svg')>
      )
    }
  }

  return {
    id: nanoid(),
    title,
    children,
    ...(config || {}),
    icon: getIcon()
  } as MenuItemConfig
}
