<template>
  <section class="header flex items-center">
    <div class="slogan flex-center space-x-1">
      <img
        class="logo"
        :src="appConfig.logo" />
      <div
        v-if="!collapsed"
        class="title">
        {{ appConfig.title }}
      </div>
    </div>

    <HeaderMenu></HeaderMenu>
  </section>
</template>

<script setup lang="ts">
import HeaderMenu from './header-menu.vue'
import { appConfig } from '~/config/app.config'
import { appQuery } from '~/store/app.store'
import { useStore } from '~/shared/hooks/use-store'
const collapsed = $(useStore(appQuery, (state) => state.collapsed))

const height = computed(() => `${appConfig.workspace.headerHeight}px`)
const width = computed(
  () =>
    `${
      collapsed
        ? appConfig.workspace.sideCollapsedWidth
        : appConfig.workspace.sideWidth
    }px`,
)
</script>

<style lang="less" scoped>
.header {
  height: v-bind(height);
  box-shadow: 0 0 5px 2px rgb(0 0 0 / 10%);

  .slogan {
    width: v-bind(width);

    .logo {
      width: 40px;
      height: 40px;
    }

    .title {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
