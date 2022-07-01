export interface Menu {
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

export interface Auth {
  roles: string[]
}
