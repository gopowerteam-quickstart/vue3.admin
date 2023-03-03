<template lang="pug">
.page-container(:style='styles')
  .page-header.flex.justify-end
    .page-actions.mb-2
      slot(name='action')
  .page-body(:class='pageBodyClass')
    slot
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { appConfig } from '@/config/app.config'
import type { ClassName } from '@arco-design/web-vue/es/_utils/types'
import { useStore } from '@/store'

const store = useStore()
const route = useRoute()
const props = withDefaults(
  defineProps<{
    title?: string
    layout?: 'flex-row' | 'flex-column' | 'flex-center' | 'block'
    absolute?: boolean
    padding?: boolean
    space?: boolean | number
    backgroundColor?: string
  }>(),
  {
    title: '',
    layout: 'block',
    absolute: false,
    padding: true,
    space: true,
  },
)

/**
 * 生成外层样式
 */
const styles = computed<CSSProperties>(() => {
  return Object.assign(
    // absolute
    props.absolute
      ? ({ position: 'absolute', inset: 0, display: 'flex' } as CSSProperties)
      : {},
    //  tab
    props.absolute && !appConfig.workspace.tabsFixed
      ? { marginTop: '50px' }
      : {},
    // padding
    props.padding === false ? {} : { padding: '10px' },
    // background
    props.backgroundColor ? { backgroundColor: props.backgroundColor } : {},
  )
})

/**
 * 生成bodyClass
 */
const pageBodyClass = computed<ClassName>(() => {
  const space_direction =
    props.layout === 'block' || props.layout === 'flex-column' ? 'y' : 'x'

  const space_number = typeof props.space === 'number' ? props.space : 2

  return Object.assign(
    { [`space-${space_direction}-${space_number}`]: !!props.space },
    props.layout === 'flex-row'
      ? ({ flex: true, 'flex-row': true } as ClassName)
      : {},
    props.layout === 'flex-column'
      ? ({ flex: true, 'flex-col': true } as ClassName)
      : {},
    props.layout === 'flex-center'
      ? ({ flex: true, 'flex-center': true, 'flex-auto': true } as ClassName)
      : {},
  )
})
/**
 * 更新页面标题
 */
function updatePageTitle() {
  const title = props.title || route.meta.title
  console.log(title)
  if (title) {
    store.app.updateTitle(title as string)
  }
}

/**
 * 更新Tab标题
 */
function updateTabTitle() {
  const tab = store.tab.tabs.find((x) => x.key === route.fullPath)
  const title = props.title || route.meta.title
  if (tab && title) {
    tab.title = title as string
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

<script lang="ts">
export default {
  name: 'PageContainer',
  inheritAttrs: false,
}
</script>

<style lang="less" scoped>
.page-container {
  overflow: auto;
  min-height: calc(100vh - 159px);
}
</style>
