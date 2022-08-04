<template>
  <a-menu
    mode="horizontal"
    :selected-keys="selectedKeys"
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
import { Menu } from '~/types/workspace'
import { appConfig } from '~/config/app.config'

const router = useRouter()
const route = useRoute()
const menus = $(useStore(appQuery, (state) => state.menus))
const headerMenus = $(useStore(appQuery, (state) => state.headerMenus))

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

  const target = menus.find((x) => x.key === menu.key.split('.')[0])

  if (target && target.children) {
    appAction.updateSideMenus(target.children)
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

  const index = keys.findIndex((k) => headerMenus.find((x) => x.key === k))

  selectedKeys = keys.slice(index)
}
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
