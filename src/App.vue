<script setup lang="ts">
import { appConfig } from './config/app.config'
import { ModalProvider } from '@gopowerteam/vue-modal'
import { useStore } from '@/store'

const store = useStore()
const isDark = useDark()
// const toggleDark = useToggle(isDark)
const preferredDark = usePreferredDark()

const title = computed(() => {
  if (store.app.title) {
    return `${appConfig.title}-${store.app.title}`
  } else {
    return appConfig.title
  }
})

useHead({
  title: title,
  meta: [
    {
      name: 'description',
      content: 'Opinionated Vite Starter Template',
    },
    {
      name: 'theme-color',
      content: computed(() => (isDark.value ? '#00aba9' : '#ffffff')),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() =>
        preferredDark.value ? '/favicon.ico' : '/favicon.ico',
      ),
    },
  ],
})
</script>

<template>
  <modal-provider>
    <RouterView />
  </modal-provider>
</template>
