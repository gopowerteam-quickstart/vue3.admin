<script setup lang="ts">
import { useStep } from '@/shared/hooks/use-step'

const { onNextStep } = useStep()

onNextStep((resolve) => {
  resolve({ c: 3 })
})
</script>

<template lang="pug">
.a step3
</template>
