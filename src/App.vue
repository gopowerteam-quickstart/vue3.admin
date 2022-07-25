<script setup lang="ts">
import { appConfig } from './config/app.config'
import { useStore } from './shared/hooks/use-store'
import { appQuery } from './store/app.store'
import { ModalProvider } from '@gopowerteam/vue-modal'

const pageTitle = $(useStore(appQuery, (state) => state.title))
const isDark = useDark()
// const toggleDark = useToggle(isDark)
const preferredDark = usePreferredDark()

const title = computed(() => {
  if (pageTitle) {
    return `${appConfig.title}-${pageTitle}`
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
