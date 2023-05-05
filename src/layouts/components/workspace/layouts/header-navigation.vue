<template>
  <a-layout-header>
    <Header />
  </a-layout-header>
  <slot />
</template>

<script setup lang="ts">
import Header from '../header.vue'
</script>
