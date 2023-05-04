<template>
  <div class="a">
    step1
  </div>
</template>

<script setup lang="ts">
import { useStep } from '@/shared/hooks'

const { onNextStep } = useStep()

onNextStep((resolve) => {
  resolve({ a: 1 })
})
</script>
