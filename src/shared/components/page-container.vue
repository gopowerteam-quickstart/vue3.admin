<template lang="pug">
.page-container(:style='styles')
  .page-header.flex.justify-end
    .page-actions.mb-2
      slot(name='action')
  slot
</template>

<script lang="ts" setup>
import { appConfig } from '@/config/app.config'
import { useStore } from '@/store'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'PageContainer',
  inheritAttrs: false,
})

const store = useStore()
const route = useRoute()
const props = withDefaults(
  defineProps<{
    title?: string
    layout?: 'flex-row' | 'flex-column' | 'block'
    absolute?: boolean
    padding?: boolean
  }>(),
  {
    title: '',
    layout: 'block',
    absolute: false,
    padding: true,
  },
)

const styles = computed<CSSProperties>(() => {
  return Object.assign(
    props.absolute ? ({ position: 'absolute', inset: 0 } as CSSProperties) : {},
    props.layout === 'flex-row'
      ? ({ display: 'flex', flexDirection: 'row' } as CSSProperties)
      : {},
    props.layout === 'flex-column'
      ? ({ display: 'flex', flexDirection: 'column' } as CSSProperties)
      : {},
    props.absolute && !appConfig.workspace.tabsFixed
      ? { marginTop: '50px' }
      : {},
    props.padding === false ? {} : { padding: '10px' },
  )
})
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
  overflow: auto;
}
</style>
