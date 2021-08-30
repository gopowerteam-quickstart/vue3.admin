<template lang="pug">
.page-container.absolute.inset-0(:class='containerClass')
  slot
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

const props = defineProps({
  flex: {
    type: Boolean,
    default: false
  },
  flexDirection: {
    type: String as PropType<'row' | 'column'>,
    default: 'row'
  },
  title: {
    type: String,
    required: false
  }
})

const containerClass = {
  flex: props.flex,
  'flex-row': props.flexDirection === 'row',
  'flex-col': props.flexDirection === 'column'
}
</script>
