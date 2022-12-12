<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'

const store = useStore()
const route = useRoute()
const props = defineProps<{ title: string }>()

/**
 * 更新页面标题
 */
function updatePageTitle() {
  if (props.title) {
    store.app.updateTitle(props.title)
  }
}

/**
 * 更新Tab标题
 */
function updateTabTitle() {
  const tab = store.tab.tabs.find((x) => x.key === route.fullPath)

  if (tab) {
    tab.title = props.title
  }
}

onActivated(() => {
  updatePageTitle()
})

onBeforeMount(() => {
  updatePageTitle()
  updateTabTitle()
})
</script>

<script lang="ts">
export default {
  name: 'PageContainer',
  inheritAttrs: false,
}
</script>
