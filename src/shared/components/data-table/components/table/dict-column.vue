<template lang="pug">
span {{ phoneNumber }}
</template>

<script setup lang="ts">
import type {
  ColumnRenderDictConfig,
  RowParams
} from '../..'

interface Props {
  config: ColumnRenderDictConfig
  params: RowParams
}

const props = defineProps<Props>()

// 获取数值字段
const value = computed<string>(() => {
  return props.params.record[
    props.params.column.key as string
  ]
})

// 获取格式化值
const getDictValue = (v: string) => {
  const { label } =
    props.config.dict.find(x => x.value === v) || {}

  return label || ''
}

// 获取金额值
const phoneNumber = computed(() => {
  return getDictValue(get(value))
})
</script>
