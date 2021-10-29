<template lang="pug">
a-input(
  :placeholder='config.placeholder'
  v-model:value='model[modelKey]')
</template>

<script setup lang="ts">
import type { FormRenderInputConfig } from '../../data-table-config'

interface Props {
  modelKey: string
  model: { [key: string]: any }
  config: FormRenderInputConfig
}

defineProps<Props>()
</script>
