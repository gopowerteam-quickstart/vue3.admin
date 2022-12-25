<template>
  <div class="py-2 pl-2 tabs-container">
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
        v-for="tab of store.tab.tabs"
        :key="tab.key"
        :closable="store.tab.tabs.length !== 1">
        <template #title>
          <a-dropdown
            trigger="contextMenu"
            @select="(action) => onTabClose(tab, action as unknown as TabAction)">
            <div>{{ tab.title }}</div>
            <template
              v-if="store.tab.tabs.length > 1"
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
import { useStore } from '@/store'
import { TabAction } from '~/config/enum.config'
import type { Tab } from '~/types/workspace'

const store = useStore()
const route = useRoute()
const router = useRouter()

watch(
  () => route.fullPath,
  (value) => {
    // 获取菜单显示项
    const menu = store.menu.menus.find((x) => x.key === route?.meta?.menu?.key)
    // 获取tab项
    const tab = store.tab.tabs.find((x) => x.key === value)
    // 获取标题
    const title = route.meta.title ?? store.app.title

    if (!tab) {
      store.tab.addTab({
        ...(menu || {}),
        title,
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
  // 获取菜单显示项
  const menu = store.menu.menus.find((x) => x.key === route?.meta?.menu?.key)
  // 获取标题
  const title = route.meta.title ?? store.app.title

  store.tab.addTab({
    ...(menu || {}),
    title,
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
  const tabs = store.tab.tabs
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

  store.tab.deleteTab(key.toString())
}

/**
 * 关闭位置标签
 */
function onTabClose(tab: Tab, action: TabAction) {
  const tabs = store.tab.tabs
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
    store.tab.deleteTab(tabs.filter((t) => t.key !== tab.key).map((t) => t.key))
    changeTabRouter()
  }

  const closeRightTab = () => {
    const index = tabs.findIndex((t) => t.key === tab.key)
    store.tab.deleteTab(tabs.filter((t, i) => i > index).map((t) => t.key))
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
  const tabs = store.tab.tabs
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

<style lang="less">
.tabs-container {
  background-color: #ffffff;
}
</style>
