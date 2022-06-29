<script setup lang="ts">
import { isDark, preferredDark } from './config/theme'

useHead({
  title: 'Vitesse',
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
        preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
      ),
    },
  ],
})
onMounted(() => {
  console.log(123123)
})
</script>

<template>
  <div>123123</div>
  <RouterView />
</template>
