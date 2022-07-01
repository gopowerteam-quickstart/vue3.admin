<template>
  <a-layout class="workspace">
    <component :is="layout">
      <Content />
    </component>
  </a-layout>
</template>

<script setup lang="ts">
import { appConfig } from '~/config/app.config'
import HeaderNavigation from './components/workspace/layouts/header-navigation.vue'
import MixNavigation from './components/workspace/layouts/mix-navigation.vue'
import SideNavigation from './components/workspace/layouts/side-navigation.vue'
import Content from './components/workspace/content.vue'
import type { WorkspaceConfig } from '~/types/app.config'

const layouts: Map<WorkspaceConfig['navigation'], any> = new Map([
  ['header', HeaderNavigation],
  ['side', SideNavigation],
  ['all', MixNavigation],
])

const layout = computed(() => layouts.get(appConfig.workspace.navigation))
</script>

<style lang="less" scoped>
main {
  width: 100%;
  height: 100%;
}
</style>
