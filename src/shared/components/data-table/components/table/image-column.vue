<template lang="pug">
image-preview(
  :height='config.height'
  :object-key='objectKey'
  :preview='config.preview || false'
  :storage='config.storage'
  :type='config.type'
  :url='url'
  :width='config.width')
</template>

<script setup lang="ts">
import type {
  ColumnRenderImageConfig,
  RowParams
} from '../..'

interface Props {
  config: ColumnRenderImageConfig
  params: RowParams
}

const props = defineProps<Props>()

const url = computed(() => {
  if (props.config.type === 'url') {
    return props.params.record
  }
})

const objectKey = computed(() => {
  if (props.config.type === 'cos') {
    return props.params.record[
      props.params.column.key as string
    ]
  }
})
</script>
