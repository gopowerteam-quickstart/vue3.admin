<template>
  <div class="p-2">
    <a-tabs
      v-model:active-key="currentTab"
      type="card-gutter"
      size="large"
      :editable="true"
      destroy-on-hide
      hide-content
      @change="onTabChange"
      @delete="onTabDelete">
      <a-tab-pane
        v-for="tab of tabs"
        :key="tab.key"
        :closable="tabs.length !== 1"
        :title="tab.title">
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/shared/hooks/use-store'
import { appQuery, appAction } from '~/store/app.store'
import type { Menu, Tab } from '~/types/workspace'

const menus = $(useStore(appQuery, (state) => state.menus))
const tabs = $(useStore(appQuery, (state) => state.tabs))
const currentTab = $(useStore(appQuery, (state) => state.currentTab))
const route = useRoute()
const router = useRouter()

watch(
  () => route.fullPath,
  () => {
    const { key: menuKey } = (route?.meta?.menu as Menu) || {}

    const key = route.meta.multiple ? `${menuKey}[${route.fullPath}]` : menuKey
    const menu = menus.find((x) => menuKey && x.key === menuKey)
    const tab = tabs.find((x) => x.key === key)

    if (tab) {
      appAction.updateCurrentTab(tab as Tab)
    } else {
      appAction.addTab({
        ...menu,
        key,
        query: route.query,
        params: route.params,
      } as Tab)
    }
  },
)

function onTabInit() {
  const { key: menuKey } = (route?.meta?.menu as Menu) || {}
  const menu = menus.find((x) => menuKey && x.key === menuKey)
  const key = route.meta.multiple ? `${menuKey}[${route.fullPath}]` : menuKey

  if (menu) {
    appAction.addTab({
      ...menu,
      key,
      query: route.query,
      params: route.params,
    } as Tab)
  }
}

function onTabDelete(key: string) {
  const index = tabs.findIndex((tab) => tab.key === key)

  if (index === -1 || tabs.length === 1) return

  // 关闭当前标签页处理
  if (key === currentTab) {
    const left = tabs[index - 1]
    const right = tabs[index + 1]
    const target = left || right

    router.push({ name: target.name })
  }

  appAction.deleteTab(key)
}

function onTabChange(key: string) {
  const tab = tabs.find((x) => x.key === key)

  if (tab) {
    router.push({
      name: tab.name,
      query: tab.query,
      params: tab.params,
    })
  }
}

onMounted(() => {
  onTabInit()
})
</script>
