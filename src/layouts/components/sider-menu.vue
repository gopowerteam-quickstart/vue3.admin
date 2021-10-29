<template lang="pug">
.menu-container
  .menu-item.cursor-pointer(
    :class='{ active: menu.title === selected }'
    :key='menu.id'
    @click='onSelect(menu)'
    v-for='menu in menus')
    .flex.flex-row.items-center.space-x-2.flex-nowrap
      component.icon(:is='menu.icon')
      .title(v-if='store.collapsed') {{ menu.title }}
</template>

<style lang="less" scoped>
.menu-item {
  border: solid 1px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 5px;
  padding: 20px 0;
  font-size: 16px;
  .icon {
    fill: #c7cadd;
    margin: auto;
    width: 20px;
    height: 20px;
  }
  .title {
    color: #8da1b5;
    word-break: keep-all;
  }
  &.active {
    .icon {
      fill: #5e81f4;
    }
    .title {
      color: #272829;
      font-weight: bold;
    }
  }
  &:hover {
    box-shadow: 0 0 10px 5px rgba(255, 255, 255, 0.3);
  }
}
</style>

<script setup lang="ts">
import type { MenuItemConfig } from '~/config/menu.config'
import { menuConfig as menus } from '~/config/menu.config'
import { getCurrentMenuByPath } from '~/shared/utils/common.util'
import { useStore } from '~/store'

const router = useRouter()
const route = useRoute()
const selected = ref<string>('')
const store = useStore(store => store.menu)

/**
 * 侧边菜单选择
 */
function onSelect(menuItem: MenuItemConfig) {
  set(selected, menuItem.title)

  if (menuItem.path) {
    router.push(menuItem.path)
  }

  store.updateHeaderMenus(menuItem.children || [])
}

/**
 * 获取默认选择项
 */
function getDesultSelected() {
  const [menu] =
    getCurrentMenuByPath(menus, route.path) || []

  if (menu) {
    store.updateHeaderMenus(menu.children || [])
    set(selected, menu.title)
  }
}

onMounted(() => {
  getDesultSelected()
})
</script>
