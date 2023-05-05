<template>
  <a-layout-header>
    <Header />
  </a-layout-header>
  <a-layout-content>
    <a-layout class="h-full">
      <Side />
      <slot />
      <a-layout-footer />
    </a-layout>
  </a-layout-content>
</template>

<script setup lang="ts">
import Header from '../header.vue'
import Side from '../side.vue'
</script>
