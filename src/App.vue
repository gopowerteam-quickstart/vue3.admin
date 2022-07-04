<script setup lang="ts">
const isDark = useDark()
// const toggleDark = useToggle(isDark)
const preferredDark = usePreferredDark()

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
        preferredDark.value ? '/favicon.ico' : '/favicon.ico',
      ),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
