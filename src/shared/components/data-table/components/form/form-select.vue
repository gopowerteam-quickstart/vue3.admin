<template lang="pug">
a-select(
  :mode='config.multiple ? "multiple" : undefined'
  :options='options'
  v-model:value='model[modelKey]')
</template>

<script setup lang="ts">
import type { FormRenderSelectConfig } from '../../data-table-config'

interface Props {
  modelKey: string
  model: { [key: string]: any }
  config: FormRenderSelectConfig
}

/**
 * 定义Props
 */
const props = defineProps<Props>()

// 数据源
const options = ref([])

/**
 * 获取options
 */
function getOptions() {
  Promise.resolve(props.config.options).then(data => {
    set(options, data || [])
  })
}

/**
 * 更新默认值
 */
function updateDefaultValue() {
  if (props.config.multiple) {
    props.model[props.modelKey] = []
  }
}

getOptions()
updateDefaultValue()
</script>
