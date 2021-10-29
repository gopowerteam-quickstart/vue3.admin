<template lang="pug">
a-layout.absolute.inset-0
  a-layout-sider(
    :collapsed='store.collapsed'
    :collapsedWidth='themeConfig.layout.sider.collapsedWidth'
    :style='siderStyle'
    :trigger='null'
    :width='themeConfig.layout.sider.width'
    collapsible)
    sider-bar
  a-layout
    a-layout-header(
      :style='headerStyle'
      v-if='headerMenus && headerMenus.length')
      header-menu
    a-layout
      a-layout-content.relative
        router-view
  drawer-bar
</template>

<script setup lang="ts">
import { themeConfig } from '~/config/theme.config'
import { useStore } from '~/store'
import DrawerBar from './components/drawer-bar.vue'

const store = useStore(store => store.menu)

const siderStyle = {
  background: '#fff'
}
const headerStyle = {
  background: '#fff'
}

const headerMenus = computed(() => store.headerMenus)
</script>
