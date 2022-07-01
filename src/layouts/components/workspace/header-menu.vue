<template>
  <a-menu
    mode="horizontal"
    @menu-item-click="onMenuSelect">
    <MenuItem
      v-for="menu in headerMenus"
      :key="menu.key"
      :menu="menu"></MenuItem>
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue'
import { useStore } from '~/shared/hooks/use-store'
import { appAction, appQuery } from '~/store/app.store'

const router = useRouter()
const menus = $(useStore(appQuery, (state) => state.menus))
const headerMenus = $(useStore(appQuery, (state) => state.headerMenus))

/**
 * 顶部菜单选择
 * @param key
 */
function onMenuSelect(key: string) {
  const menu = menus.find((menu) => menu.key === key)

  // 更新侧边菜单
  appAction.updateSideMenus(menu?.children || [])

  if (menu?.path && menu?.name) {
    router.push({ name: menu.name })
  }
}
</script>
