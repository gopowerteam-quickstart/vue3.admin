<template lang="pug">
a-layout.absolute.inset-0
  a-layout-sider(
    :collapsedWidth='themeConfig.layout.sider.collapsedWidth'
    :width='themeConfig.layout.sider.width')
  a-layout-content.relative
    router-view
</template>

<script setup lang="ts">
import { themeConfig } from '~/config/theme.config'
</script>

<style lang="less">
.menu-bar {
  width: 50px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
