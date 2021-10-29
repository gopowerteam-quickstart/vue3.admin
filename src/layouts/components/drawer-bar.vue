<template lang="pug">
a-badge.drawer-button(:offset='[-2, 2]' count='1')
  a-button(
    @click='onShowDrawer'
    shape='circle'
    size='large'
    type='primary')
    icon-carbon:task-tools
a-drawer(
  :width='400'
  placement='right'
  title='任务面板'
  v-model:visible='store.drawerVisiable')
</template>

<style lang="less" scoped>
.drawer-button {
  position: fixed;
  bottom: 30px;
  right: 40px;
}
</style>

<script setup lang="ts">
import { useStore } from '~/store'

const store = useStore(store => store.menu)

function onShowDrawer() {
  store.updateDrawerVisiable(true)
}
</script>
