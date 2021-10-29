<template lang="pug">
.form-container
  a-form(
    :model='formModel'
    :rules='formRules'
    layout='inline'
    ref='form'
    v-if='forms')
    a-form-item(
      :key='config.key'
      :label='config.title'
      :name='config.key'
      :style='{ width: `${config.width ?? defaultFormWidth}px` }'
      v-for='config in configs')
      switch-template(:value='config.type')
        template(#input)
          form-input(
            :config='config.props'
            :model='formModel'
            :model-key='config.key')
        template(#select)
          form-select(
            :config='config.props'
            :model='formModel'
            :model-key='config.key')
        template(#datePicker)
          form-date-picker(
            :config='config.props'
            :model='formModel'
            :model-key='config.key')
  .form-tools.flex.flex-row.justify-between.py-2
    .form-actions.space-x-2
      slot(name='actions')
    .form-buttons.space-x-2(v-if='forms')
      a-button(@click='onSubmit' type='primary') 搜索
      a-button(@click='onReset') 重置
</template>

<script setup lang="tsx">
import { templateRef } from '@vueuse/core'
import { PageService } from '~/http/extends/page.service'
import FormInput from './components/form/form-input.vue'
import FormSelect from './components/form/form-select.vue'
import FormDatePicker from './components/form/form-date-picker.vue'

import type {
  DataRecord,
  TableFormConfig
} from './data-table-config'

import { FormRenderSupportType } from './data-table-config'

const formRef = templateRef('form')
const formModel = ref<DataRecord>({})
const defaultFormWidth = 230
const onLoadData = inject('on-load-data') as () => void

interface Props {
  // 分页服务
  page?: PageService
  // 表单配置
  forms?: TableFormConfig[]
}

/**
 * 定义Props
 */
const props = defineProps<Props>()

// 或申请配置数据
const configs = computed(() => {
  if (!props.forms) return []

  return props.forms.map(form => ({
    key: form.key,
    title: form.title,
    width: form.width,
    ...getRenderConfig(form)
  }))
})

const formRules = computed(() => {
  if (!props.forms) return

  return props.forms
    .filter(form => form.rules && form.rules.length)
    .reduce(
      (result, form) => (
        (result[form.key] = form.rules), result
      ),
      {} as { [key: string]: any }
    )
})

/**
 * 生成表单结构
 */
function generateFormModel() {
  const { forms } = props

  if (!forms) return {}

  const updateItem = (
    result: { [key: string]: unknown },
    item: TableFormConfig
  ) => ((result[item.key] = ''), result)

  return forms.reduce(updateItem, {})
}

/**
 * 获取渲染配置
 */
function getRenderConfig(item: TableFormConfig) {
  return item.render(
    FormRenderSupportType.reduce(
      (result, type) => (
        (result[type] = props => ({
          type,
          props
        })),
        result
      ),
      {} as {
        [k in typeof FormRenderSupportType[number]]: (
          key: any
        ) => any
      }
    )
  )
}

/**
 * 提交请求
 */
function onSubmit() {
  // 重置分页
  if (props.page) {
    props.page.reset()
  }
  // 获取数据
  onLoadData()
}

/**
 * 重置操作
 */
function onReset() {
  set(formModel, generateFormModel())
}

/**
 * 获取表单值
 */
function getFormValue() {
  const form: any = get(formRef)
  return form ? form.validate() : Promise.resolve({})
}

//  暴露数据
defineExpose({
  data: get(formModel),
  getFormValue
})

// 设置默认数据
if (props.forms) {
  set(formModel, generateFormModel())
}
</script>

<style lang="less" scoped></style>
