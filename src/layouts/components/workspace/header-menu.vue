<template>
  <a-menu
    mode="horizontal"
    :selected-keys="selectedKeys"
    @menu-item-click="onMenuSelect">
    <MenuItem
      v-for="menu in store.menu.headerMenus"
      :key="menu.key"
      :show-icon="false"
      :menu="menu"></MenuItem>
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue'
import type { Menu } from '~/types/workspace'
import { appConfig } from '~/config/app.config'
import { useStore } from '@/store'

const router = useRouter()
const route = useRoute()
const store = useStore()

let selectedKeys = $ref<string[]>([])

watch(
  () => route.fullPath,
  () => {
    updateSelectedMenu()
  },
)

onMounted(() => {
  updateSelectedMenu()
  updateSideMenus()
})

function updateSideMenus() {
  if (appConfig.workspace.navigation !== 'all') {
    return
  }

  const menu = route.meta.menu as Menu

  // 过滤非菜单显示项
  if (!menu) {
    return
  }

  const target = store.menu.menus.find((x) => x.key === menu.key.split('.')[0])

  if (target && target.children) {
    store.menu.updateSideMenus(target.children)
  }
}
/**
 * 更新选中侧边菜单
 * @param key
 */
function updateSelectedMenu() {
  const menu = route.meta.menu as Menu
  const key = menu?.key

  if (!key) {
    return
  }

  // 获取Key列表
  const keys = key
    .split('.')
    .reduce(
      (r, v) => (r.push(r.length ? `${r[r.length - 1]}.${v}` : v), r),
      [] as string[],
    )

  const index = keys.findIndex((k) =>
    store.menu.headerMenus.find((x) => x.key === k),
  )

  selectedKeys = keys.slice(index)
}
/**
 * 顶部菜单选择
 * @param key
 */
function onMenuSelect(key: string) {
  const menu = store.menu.menus.find((menu) => menu.key === key)

  // 更新侧边菜单
  store.menu.updateSideMenus(menu?.children || [])

  if (menu?.path && menu?.name) {
    router.push({ name: menu.name })
  }
}
</script>
