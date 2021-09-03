<template lang="pug">
a-layout.absolute.inset-0
  a-layout-sider(
    :collapsedWidth='themeConfig.layout.sider.collapsedWidth'
    :trigger='null'
    :width='themeConfig.layout.sider.width'
    v-model:collapsed='collapsed')
    sider-panel(v-if='collapsed')
    sider-bar(v-else)
  a-layout-content.relative.m-5
    router-view
</template>

<script setup lang="ts">
import { themeConfig } from '~/config/theme.config'

let collapsed = ref(false)

provide('updateCollapsed', (value: boolean) => {
  set(collapsed, value)
})
</script>

<style lang="less">
.menu-bar {
  width: 50px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
