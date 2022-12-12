import { defineStore } from 'pinia'
import { useAppStore } from './app.store'
import { useMenuStore } from './menu.store'
import { useUserStore } from './user.store'
import { useTabStore } from './tab.store'

const stores = {
  app: () => useAppStore(),
  menu: () => useMenuStore(),
  tab: () => useTabStore(),
  user: () => useUserStore(),
}

const store = defineStore('main', {
  getters: stores,
})

export function useStore(): ReturnType<typeof store>
export function useStore<T extends keyof typeof stores>(
  name: T,
): ReturnType<typeof store>[T]
export function useStore<T extends keyof typeof stores>(
  name?: T,
): ReturnType<typeof store> | ReturnType<typeof store>[T] {
  if (name) {
    return store()[name]
  } else {
    return store()
  }
}
