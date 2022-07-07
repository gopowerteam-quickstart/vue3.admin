<template>
  <div class="py-2 pl-2">
    <a-tabs
      v-model:active-key="$route.fullPath"
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
        :closable="tabs.length !== 1">
        <template #title>
          <a-dropdown
            trigger="contextMenu"
            @select="(action) => onTabClose(tab, action as number)">
            <div>{{ tab.title }}</div>
            <template
              v-if="tabs.length > 1"
              #content>
              <a-doption :value="TabAction.CLOSE_RIGHT">关闭右侧</a-doption>
              <a-doption :value="TabAction.CLOSE_OTHER">关闭其他</a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { TabAction } from '~/config/enum.config'
import { useStore } from '~/shared/hooks/use-store'
import { appQuery, appAction } from '~/store/app.store'
import type { Menu, Tab } from '~/types/workspace'

const title = $(useStore(appQuery, (state) => state.title))
const menus = $(useStore(appQuery, (state) => state.menus))
const tabs = $(useStore(appQuery, (state) => state.tabs))
const route = useRoute()
const router = useRouter()

watch(
  () => route.fullPath,
  () => {
    const { key } = (route?.meta?.menu as Menu) || {}

    const menu = menus.find((x) => key && x.key === key)
    const tab = tabs.find((x) => x.key === route.fullPath)

    if (!tab) {
      appAction.addTab({
        ...menu,
        key: route.fullPath,
        menuKey: menu?.key,
        query: route.query,
        params: route.params,
      } as Tab)
    }
  },
)

function onTabInit() {
  const { key } = (route?.meta?.menu as Menu) || {}
  const menu = menus.find((x) => key && x.key === key)

  if (menu) {
    appAction.addTab({
      ...menu,
      title: title,
      key: route.fullPath,
      menuKey: menu.key,
      query: route.query,
      params: route.params,
    } as Tab)
  }
}

/**
 * 关闭对应标签
 */
function onTabDelete(key: string | number) {
  const index = tabs.findIndex((tab) => tab.key === key)

  if (index === -1 || tabs.length === 1) return

  // 关闭当前标签页处理
  if (key === route.fullPath) {
    const left = tabs[index - 1]
    const right = tabs[index + 1]
    const target = left || right

    router.push({ name: target.name })
  }

  appAction.deleteTab(key.toString())
}

/**
 * 关闭位置标签
 */
function onTabClose(tab: Tab, action: TabAction) {
  const isCurrentTab = tab.key === route.fullPath

  const changeTabRouter = () => {
    if (!isCurrentTab) {
      router.push({ name: tab.name, query: tab.query, params: tab.params })
    }
  }

  const closeOtherTab = () => {
    appAction.deleteTab(tabs.filter((t) => t.key !== tab.key).map((t) => t.key))
    changeTabRouter()
  }

  const closeRightTab = () => {
    const index = tabs.findIndex((t) => t.key === tab.key)
    appAction.deleteTab(tabs.filter((t, i) => i > index).map((t) => t.key))
    changeTabRouter()
  }

  switch (action) {
    case TabAction.CLOSE_OTHER:
      closeOtherTab()
      break
    case TabAction.CLOSE_RIGHT:
      closeRightTab()
      break
  }
}

function onTabChange(key: string | number) {
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
