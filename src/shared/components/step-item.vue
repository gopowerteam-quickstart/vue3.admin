<template>
  <div class="step-item-container">
    <slot />
  </div>
</template>

<style scoped lang="less"></style>

<script setup lang="ts">
defineProps<{
  stepKey: string
  title: string
}>()
</script>
