<template>
  <a-layout-content class="relative">
    <Tabs v-if="appConfig.workspace.tabs && appConfig.workspace.tabsFixed" />
    <section
      class="absolute inset-0 overflow-auto"
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
import { useStore } from '~/shared/hooks/use-store'
import { appQuery } from '~/store/app.store'
import { appConfig } from '~/config/app.config'

const tabs = $(useStore(appQuery, (state) => state.tabs))

const keepAliveInclude = computed(() => tabs.map((x) => x.key))
</script>

<style lang="less" scoped>
.tabs-fixed {
  margin-top: 50px;
}
</style>
