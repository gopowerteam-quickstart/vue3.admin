<template lang="pug">
.sider-bar-container.h-full.flex.flex-col.items-center.justify-between.py-2
  .sider-action(css:text='white 2xl')
    icon-eva:arrow-back-outline.cursor-pointer(
      @click='$router.back()')
  .sider-content.flex-auto
  .sider-tool.flex.flex-col.space-y-2(css:text='white xl')
    icon-ant-design:home-outlined.cursor-pointer(
      @click='() => $router.push("/home")')
    icon-ant-design:menu-unfold-outlined.cursor-pointer(
      @click='() => updateCollapsed(true)')
</template>

<script setup lang="ts">
const updateCollapsed = inject('updateCollapsed') as (
  value: boolean
) => void
</script>
