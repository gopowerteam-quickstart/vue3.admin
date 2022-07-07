<template>
  <slot></slot>
</template>

<script lang="ts" setup>
import { appAction, appQuery } from '~/store/app.store'
import { useStore } from '../hooks/use-store'

const route = useRoute()
const tabs = $(useStore(appQuery, (state) => state.tabs))
const props = defineProps<{ title: string }>()

/**
 * 更新页面标题
 */
function updatePageTitle() {
  if (props.title) {
    appAction.updateTitle(props.title)
  }
}

/**
 * 更新Tab标题
 */
function updateTabTitle() {
  const tab = tabs.find((x) => x.key === route.fullPath)

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
