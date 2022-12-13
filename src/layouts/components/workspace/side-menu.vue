<template>
  <a-menu
    class="flex-auto"
    :mode="appConfig.workspace.sideMode"
    :collapsed="store.menu.collapsed"
    :collapsed-width="appConfig.workspace.sideCollapsedWidth"
    :selected-keys="selectedKeys"
    @menu-item-click="onMenuSelect">
    <MenuItem
      v-for="menu in store.menu.sideMenus"
      :key="menu.key"
      :menu="menu"></MenuItem>
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue'
import { appConfig } from '@/config/app.config'
import { useStore } from '@/store'
import type { Menu } from '@/types/workspace'

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
})

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
    .reduce<string[]>(
      (r, v) => (r.push(r.length ? `${r[r.length - 1]}.${v}` : v), r),
      [],
    )

  const index = keys.findIndex((k) =>
    store.menu.sideMenus.find((x) => x.key === k),
  )

  selectedKeys = keys.slice(index)
}

/**
 * 侧边菜单选择
 * @param key
 */
function onMenuSelect(key: string) {
  const menu = store.menu.menus.find((menu) => menu.key === key)

  if (menu?.path && menu?.name) {
    router.push({ name: menu.name })
  }
}
</script>
