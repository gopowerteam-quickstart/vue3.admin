<template lang="pug">
a(:href='`tel:${value}`' v-if='config.callable') {{ phoneNumber }}
span(v-else) {{ phoneNumber }}
</template>

<script setup lang="ts">
import * as R from 'ramda'

import type {
  ColumnRenderPhoneConfig,
  RowParams
} from '../..'

interface Props {
  config: ColumnRenderPhoneConfig
  params: RowParams
}

const props = defineProps<Props>()

const DEFAULT_SPARATOR = ' '

// 获取数值字段
const value = computed<string>(() => {
  return props.params.record[
    props.params.column.key as string
  ]
})

// 获取脱敏值
const getDesensitizationValue = (v: string) =>
  props.config.safe
    ? v.replace(/(\d{3})\d*(\d{4})/g, '$1****$2')
    : v

// 获取格式化值
const getFormatValue = (v: string) =>
  v
    .replace(/\*/g, 'M')
    .replace(
      /\B(?=(?:\S{4})+$)/g,
      props.config.separator ?? DEFAULT_SPARATOR
    )
    .replace(/M/g, '*')

// 获取金额值
const phoneNumber = computed(() => {
  return R.pipe(
    getDesensitizationValue,
    getFormatValue
  )(get(value))
})
</script>
