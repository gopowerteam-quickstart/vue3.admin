<template lang="pug">
.sider-bar-container.h-full.flex.flex-col.justify-between.p-2
  .sider-action(css:text='white 2xl')
    icon-eva:arrow-back-outline.cursor-pointer(
      @click='$router.back()')
  .sider-content.flex-auto
    sider-menu
  .sider-tool.flex.justify-between.space-x-2(
    css:text='white xl')
    icon-ant-design:home-outlined.cursor-pointer(
      @click='() => $router.push("/home")')
    icon-ant-design:menu-fold-outlined.cursor-pointer(
      @click='() => updateCollapsed(false)')
</template>

<script setup lang="ts">
const updateCollapsed = inject('updateCollapsed') as (
  value: boolean
) => void
</script>
