<template>
  <template v-if="menu.isLeaf">
    <a-menu-item :key="menu.key">
      {{ menu.title }}
    </a-menu-item>
  </template>
  <template v-else>
    <a-sub-menu :key="menu.key">
      <template #title>
        {{ menu.title }}
      </template>
      <MenuItem
        v-for="child in menu.children"
        :key="child.key"
        :menu="child"></MenuItem>
    </a-sub-menu>
  </template>
</template>

<script setup lang="ts">
import type { Menu } from '~/types/workspace'

defineProps<{
  menu: Menu
}>()
</script>

<script lang="ts">
export default {
  name: 'MenuItem',
}
</script>
