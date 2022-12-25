<template lang="pug">
.page-container
  .page-header.flex.justify-end.mb-2
    .page-actions
      slot(name='action')
  slot
</template>

<script lang="ts" setup>
import { useStore } from '@/store'

defineOptions({
  name: 'PageContainer',
  inheritAttrs: false,
})

const store = useStore()
const route = useRoute()
const props = defineProps<{ title?: string }>()

/**
 * 更新页面标题
 */
function updatePageTitle() {
  const title = props.title || route.meta.title
  if (title) {
    store.app.updateTitle(title)
  }
}

/**
 * 更新Tab标题
 */
function updateTabTitle() {
  const tab = store.tab.tabs.find((x) => x.key === route.fullPath)
  const title = props.title || route.meta.title
  if (tab && title) {
    tab.title = title
  }
}

onActivated(() => {
  updatePageTitle()
})

onBeforeMount(() => {
  if (props.title) {
    updatePageTitle()
    updateTabTitle()
  }
})
</script>
<style lang="less" scoped>
.page-container {
  padding: 10px;
}
</style>
