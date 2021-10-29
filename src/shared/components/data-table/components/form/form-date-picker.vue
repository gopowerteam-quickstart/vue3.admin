<template lang="pug">
switch-template(:value='config.mode || "date"')
  template(#date)
    a-date-picker(
      @change='onChange'
      v-bind='pickerConfig'
      v-model:value='model[modelKey]')
  template(#week)
    a-week-picker(
      @change='onChange'
      v-bind='pickerConfig'
      v-model:value='model[modelKey]')
  template(#month)
    a-week-picker(
      @change='onChange'
      v-bind='pickerConfig'
      v-model:value='model[modelKey]')
  template(#year)
    a-week-picker(
      @change='onChange'
      v-bind='pickerConfig'
      v-model:value='model[modelKey]')
</template>

<script setup lang="tsx">
import moment from 'moment'
import type { FormRenderDatePickerConfig } from '../..'

const dateFormat = 'YYYY-MM-DD HH:mm:ss'
const onLoadData = inject('on-load-data') as () => void

interface Props {
  modelKey: string
  model: { [key: string]: any }
  config: FormRenderDatePickerConfig
}

const props = defineProps<Props>()

function onChange() {
  if (props.config.autoSubmit) {
    onLoadData()
  }
}

const pickerConfig = computed(() => {
  return {
    placeholder: props.config.placeholder,
    valueFormat: dateFormat
  }
})

onMounted(() => {
  // 更新默认值
  if (props.config.defaultValue) {
    props.model[props.modelKey] = moment(
      props.config.defaultValue
    ).format(dateFormat)
  }
})
</script>
