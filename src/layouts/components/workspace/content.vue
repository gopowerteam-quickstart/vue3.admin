<template>
  <a-layout-content class="relative">
    <Tabs v-if="appConfig.workspace.tabs && appConfig.workspace.tabsFixed" />
    <section
      class="absolute inset-0 overflow-auto workspace-content"
      :style="{
        'margin-top': appConfig.workspace.tabsFixed ? '50px' : '0px',
      }">
      <Tabs v-if="appConfig.workspace.tabs && !appConfig.workspace.tabsFixed" />
      <RouterView
        v-if="appConfig.workspace.tabs"
        v-slot="{ Component }">
        <RouterKeepAlive :include="keepAliveInclude">
          <component
            :is="Component"
            :key="$route.fullPath"></component>
        </RouterKeepAlive>
      </RouterView>
      <RouterView v-else></RouterView>
    </section>
  </a-layout-content>
</template>

<script setup lang="ts">
import Tabs from './tabs.vue'
import RouterKeepAlive from '~/shared/components/router-keep-alive'
import { appConfig } from '~/config/app.config'
import { useStore } from '@/store'

const store = useStore()

const keepAliveInclude = computed(() => store.tab.tabs.map((x) => x.key))
</script>

<style lang="less" scoped>
.tabs-fixed {
  margin-top: 50px;
}
.workspace-content {
  background-color: #fafafa;
}
</style>
