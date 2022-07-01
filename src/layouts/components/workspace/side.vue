<template>
  <a-layout-sider
    v-if="sideMenus.length"
    class="side !relative"
    :collapsed="collapsed"
    :width="appConfig.workspace.sideWidth"
    :collapsed-width="appConfig.workspace.sideCollapsedWidth">
    <div class="flex flex-col justify-between h-full">
      <SideMenu></SideMenu>

      <div
        v-if="appConfig.workspace.navigation !== 'header'"
        class="collapse"
        type="text"
        @click="() => appAction.toggleCollapse()">
        <icon-park:menu-unfold
          v-if="collapsed"
          class="icon" />
        <icon-park:menu-fold
          v-else
          class="icon" />
      </div>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { appConfig } from '~/config/app.config'
import { useStore } from '~/shared/hooks/use-store'
import { appAction, appQuery } from '~/store/app.store'
import SideMenu from './side-menu.vue'

const collapsed = $(useStore(appQuery, (state) => state.collapsed))
const sideMenus = $(useStore(appQuery, (state) => state.sideMenus))
const width = computed(() => `${appConfig.workspace.sideCollapsedWidth}px`)
</script>

<style lang="less" scoped>
.collapse {
  display: inline-block;
  width: v-bind(width);
  padding: 10px 0;
  text-align: center;

  svg {
    margin: auto;
  }
}
</style>
