<template>
  <a-menu
    class="flex-auto"
    :mode="appConfig.workspace.sideMode"
    :collapsed="collapsed"
    :collapsed-width="appConfig.workspace.sideCollapsedWidth"
    @menu-item-click="onMenuSelect">
    <MenuItem
      v-for="menu in sideMenus"
      :key="menu.key"
      :menu="menu"></MenuItem>
  </a-menu>
</template>

<script setup lang="ts">
import MenuItem from './menu-item.vue'
import { useStore } from '~/shared/hooks/use-store'
import { appQuery } from '~/store/app.store'
import { appConfig } from '~/config/app.config'

const router = useRouter()
const menus = $(useStore(appQuery, (state) => state.menus))
const sideMenus = $(useStore(appQuery, (state) => state.sideMenus))
const collapsed = $(useStore(appQuery, (state) => state.collapsed))

/**
 * 侧边菜单选择
 * @param key
 */
function onMenuSelect(key: string) {
  const menu = menus.find((menu) => menu.key === key)

  if (menu?.path && menu?.name) {
    router.push({ name: menu.name })
  }
}
</script>
