<template>
  <a-layout-sider
    v-if="store.menu.sideMenus.length"
    class="side !relative"
    :collapsed="store.menu.collapsed"
    :width="appConfig.workspace.sideWidth"
    :collapsed-width="appConfig.workspace.sideCollapsedWidth">
    <div class="flex flex-col justify-between h-full">
      <SideMenu></SideMenu>

      <div
        v-if="appConfig.workspace.navigation !== 'header'"
        class="collapse"
        type="text"
        @click="() => store.menu.toggleCollapse()">
        <icon-park:menu-unfold
          v-if="store.menu.collapsed"
          class="icon" />
        <icon-park:menu-fold
          v-else
          class="icon" />
      </div>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { appConfig } from '@/config/app.config'
import { useStore } from '@/store'
import SideMenu from './side-menu.vue'

const store = useStore()

const width = computed(() => `${appConfig.workspace.sideCollapsedWidth}px`)
</script>

<style lang="less" scoped>
.side {
  z-index: 100;
}
.collapse {
  display: inline-block;
  padding: 10px 0;
  width: v-bind(width);
  text-align: center;
  svg {
    margin: auto;
  }
}
</style>
