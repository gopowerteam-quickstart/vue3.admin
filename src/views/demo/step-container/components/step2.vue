<template>
  <div class="a">
    step2
  </div>
</template>

<script setup lang="ts">
import { useStep } from '@/shared/hooks'

const { onNextStep } = useStep()

onNextStep((resolve) => {
  resolve({ b: 2 })
})
</script>
