import type { Tab } from '@/types/workspace'
import { defineStore } from 'pinia'

type State = {
  // 选项卡列表
  tabs: Tab[]
}

const initialState: State = {
  tabs: [],
}

export const useTabStore = defineStore('tab', {
  state: () => initialState,
  actions: {
    /**
     * 添加Tab
     */
    addTab(tab: Tab) {
      this.tabs = [...this.tabs, tab]
    },

    /**
     * 删除Tab
     */
    deleteTab(key: string | string[]) {
      const keys = Array.isArray(key) ? key : [key]

      if (this.tabs.length === 1) {
        return
      }

      this.tabs = this.tabs.filter((tab) => !keys.includes(tab.key))
    },
  },
})
