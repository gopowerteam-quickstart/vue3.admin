<template lang="pug">
router-view
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'vue3-web-template'
})
</script>
