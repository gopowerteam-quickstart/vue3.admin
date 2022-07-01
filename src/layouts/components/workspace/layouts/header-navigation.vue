<template>
  <a-layout-header>
    <Header></Header>
  </a-layout-header>
  <slot></slot>
</template>

<script setup lang="ts">
import Header from '../header.vue'
</script>
