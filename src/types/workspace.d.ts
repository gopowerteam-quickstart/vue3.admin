import type { LocationQuery, RouteParams } from 'vue-router'

export type Menu = {
  path?: string
  name?: string
  auth?: Auth
  key: string
  icon: string
  title: string
  children?: Menu[]
  // 是否为叶子节点
  isLeaf?: boolean
}

export type Tab = Required<Menu> & {
  menuKey: string
  query: LocationQuery
  params: RouteParams
}

export type Auth = {
  roles: string[]
}
