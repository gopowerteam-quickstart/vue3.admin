<template lang="pug">
span {{ currency }}
</template>

<script setup lang="ts">
import * as R from 'ramda'

import type {
  ColumnRenderCurrencyConfig,
  RowParams
} from '../..'

interface Props {
  config: ColumnRenderCurrencyConfig
  params: RowParams
}

// 默认金额放大规模
const DEFAULT_SCALE = 100

const props = defineProps<Props>()

// 获取数值字段
const value = computed<string | number>(() => {
  return props.params.record[
    props.params.column.key as string
  ]
})

// 计算放大规模
const scale = computed(() => {
  return props.config?.scale || DEFAULT_SCALE
})

// 精度计算
const getPrecisionValue = (v: number) =>
  v.toFixed(props.config.precision || 0)

// 修正放大值
const getEnlargeValue = (v: number | string) =>
  parseFloat(v.toString()) / get(scale)

// 千分位转换
const getCurrencyValue = (v: string) =>
  v.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')

// 合并数据
const combineValue = (v: string) =>
  [props.config.prefix, v, props.config.unit].join(' ')

// 获取金额值
const currency = computed(() => {
  return R.pipe(
    getEnlargeValue,
    getPrecisionValue,
    getCurrencyValue,
    combineValue
  )(get(value))
})
</script>
