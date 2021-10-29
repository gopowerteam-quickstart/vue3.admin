<template lang="pug">
.sider-bar-container.h-full.flex.flex-col.items-center.justify-between.py-5
  .sider-action(css:text='2xl')
    icon-bi:arrow-left-circle.cursor-pointer(
      @click='store.updateCollapsed'
      v-if='store.collapsed')
    icon-bi:arrow-right-circle.cursor-pointer(
      @click='store.updateCollapsed'
      v-else)
  .sider-content.flex-auto
    sider-menu
</template>

<style lang="less" scoped>
.sider-action {
  color: #5e81f4;
}
</style>

<script setup lang="ts">
import { useStore } from '~/store'

const store = useStore(store => store.menu)
</script>
