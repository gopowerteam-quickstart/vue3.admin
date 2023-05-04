<template>
  <div class="a">
    step3
  </div>
</template>

<script setup lang="ts">
import { useStep } from '@/shared/hooks/use-step'

const { onNextStep } = useStep()

onNextStep((resolve) => {
  resolve({ c: 3 })
})
</script>
