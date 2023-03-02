<template lang="pug">
.a step1
</template>

<script setup lang="ts">
import { useStep } from '@/shared/hooks'

const { onNextStep } = useStep()

onNextStep((resolve) => {
  resolve({ a: 1 })
})
</script>
