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
  (value) => {
    const { key } = (route?.meta?.menu as Menu) || {}

    // 获取菜单显示项
    const menu = menus.find((x) => key && x.key === key)

    // 获取tab项
    const tab = tabs.find((x) => x.key === value)

    if (!tab) {
      appAction.addTab({
        ...(menu || {}),
        key: value,
        // 非菜单显示项为空
        menuKey: menu?.key,
        query: route.query,
        params: route.params,
      } as Tab)
    }
  },
)

function onTabInit() {
  const { key } = (route?.meta?.menu as Menu) || {}

  // 获取菜单显示项
  const menu = menus.find((x) => key && x.key === key)

  appAction.addTab({
    ...(menu || {}),
    title: title,
    key: route.fullPath,
    menuKey: menu?.key,
    query: route.query,
    params: route.params,
  } as Tab)
}

/**
 * 关闭对应标签
 */
async function onTabDelete(key: string | number) {
  const index = tabs.findIndex((tab) => tab.key === key)

  if (
    // 未找到需要删除的标签
    index === -1 ||
    // 待删除标签是最后一个标签
    tabs.length === 1
  )
    return

  // 待关闭标签页为正在显示标签
  if (key === route.fullPath) {
    // 待删除标签左侧标签
    const left = tabs[index - 1]
    // 待删除标签右侧标签
    const right = tabs[index + 1]
    // 获取切换目标标签
    const target = left || right

    await router.push({
      path: target.key,
      query: target.query,
      params: target.params,
    })
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
      router.push({
        path: tab.key,
        query: tab.query,
        params: tab.params,
      })
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
      path: tab.key,
      query: tab.query,
      params: tab.params,
    })
  }
}

onMounted(() => {
  onTabInit()
})
</script>
