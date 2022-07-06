<template>
  <a-layout-content class="relative">
    <section class="absolute inset-0 overflow-auto">
      <Tabs></Tabs>
      <RouterView v-slot="{ Component }">
        <RouterKeepAlive :include="keepAliveInclude">
          <component
            :is="Component"
            :key="$route.fullPath"></component>
        </RouterKeepAlive>
      </RouterView>
    </section>
  </a-layout-content>
</template>

<script setup lang="ts">
import Tabs from './tabs.vue'
import RouterKeepAlive from '~/shared/components/router-keep-alive'
import { useStore } from '~/shared/hooks/use-store'
import { appQuery } from '~/store/app.store'

const tabs = $(useStore(appQuery, (state) => state.tabs))

const keepAliveInclude = computed(() => tabs.map((x) => x.key))
</script>
