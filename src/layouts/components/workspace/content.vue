<template>
  <a-layout-content class="relative">
    <section class="absolute inset-0 overflow-auto">
      <Tabs></Tabs>
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component
            :is="Component"
            :key="keepAliveKey"></component>
        </KeepAlive>
      </RouterView>
    </section>
  </a-layout-content>
</template>

<script setup lang="ts">
import Tabs from './tabs.vue'
const route = useRoute()
const keepAliveKey = computed(() => {
  const key = route.meta?.multiple ? route.fullPath : route.name
  console.log('keepAliveKey:', key)
  return key
})
</script>
