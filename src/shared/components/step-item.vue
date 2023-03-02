<template lang="pug">
.step-item-container
  slot
</template>

<script setup lang="ts">
defineProps<{
  stepKey: string
  title: string
}>()
</script>

<style scoped lang="less"></style>
