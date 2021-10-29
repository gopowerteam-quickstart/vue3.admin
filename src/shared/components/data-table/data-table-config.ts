/* eslint-disable */

import { ColumnProps } from 'ant-design-vue/es/table/interface'
import { RouteLocationRaw } from 'vue-router'
import { appConfig } from '~/config/app.config'
import { PageService } from '~/http/extends/page.service'
import { DictData } from '~/shared/utils/dict.util'

export type DataRecord = { [key: string]: any }
export type DataProp = { [key: string]: any }

export type RowParams = {
  index: number
  record: DataRecord
  column: ColumnProps
}
// 表单渲染支持类型
export const FormRenderSupportType = [
  'input',
  'select',
  'datePicker'
] as const

// 表单渲染 - DatePicker配置
export type FormRenderDatePickerConfig = {
  placeholder?: string
  mode?: 'date' | 'week' | 'month' | 'year'
  autoSubmit?: boolean
  defaultValue?: number
}

// 表单渲染 - Select配置
export type FormRenderSelectConfig = {
  options?:
    | { value: string | number | boolean; label: string }[]
    | Promise<
        {
          value: string | number | boolean
          label: string
        }[]
      >
  multiple?: boolean
}

// 表单渲染 - Input配置
export type FormRenderInputConfig = {
  placeholder?: string
}

// 表单渲染生成属性
export type FormRenderGenerateConfig = {
  type: string
  props: any
}

// 表单渲染配置
export type FormRenderConfig = {
  input: (
    config: FormRenderInputConfig
  ) => FormRenderGenerateConfig
  select: (
    config: FormRenderSelectConfig
  ) => FormRenderGenerateConfig
  datePicker: (
    config: FormRenderDatePickerConfig
  ) => FormRenderGenerateConfig
}

export const ColumnRenderSupportType = [
  'button',
  'image',
  'currency',
  'phone',
  'dict',
  'view',
  'link'
] as const

// 表单渲染生成属性
export type ColumnRenderGenerateConfig = {
  type: string
  props: any
}

// 表格渲染 - Link配置
export type ColumnRenderLinkConfig = {
  router: (record: DataRecord) => RouteLocationRaw
}

// 表格渲染 - Image配置
export type ColumnRenderViewConfig = {
  text?: string
  title: string
}

// 表格渲染 - Image配置
export type ColumnRenderDictConfig = {
  // 安全模式 - 数据脱敏
  dict: DictData
}

// 表格渲染 - Image配置
export type ColumnRenderPhoneConfig = {
  // 安全模式 - 数据脱敏
  safe?: boolean
  // 设置显示分隔符
  separator?: string
  // 是否可呼叫
  callable?: boolean
}

// 表格渲染 - Image配置
export type ColumnRenderCurrencyConfig = {
  prefix?: string
  unit?: string
  precision?: number
  scale?: number
}

// 表格渲染 - Image配置
export type ColumnRenderImageConfig = {
  width?: number
  height?: number
  type?: 'url' | 'cos'
  storage?: typeof appConfig.storage[number]
  preview?: boolean
}

// 表格渲染 - Button配置
export type ColumnRenderButtonConfig = {
  text?: string
  confirm?: boolean
  click: (
    row: DataRecord | any,
    option: { reload: () => void }
  ) => void
}

// 表单渲染配置
export type ColumnRenderConfig = {
  button: (
    config: ColumnRenderButtonConfig[]
  ) => ColumnRenderGenerateConfig
  image: (
    config: ColumnRenderImageConfig
  ) => ColumnRenderGenerateConfig
  currency: (
    config: ColumnRenderCurrencyConfig
  ) => ColumnRenderGenerateConfig
  phone: (
    config: ColumnRenderPhoneConfig
  ) => ColumnRenderGenerateConfig
  dict: (
    config: ColumnRenderDictConfig
  ) => ColumnRenderGenerateConfig
  view: (
    config: ColumnRenderViewConfig
  ) => ColumnRenderGenerateConfig
  link: (
    config: ColumnRenderLinkConfig
  ) => ColumnRenderGenerateConfig
}

// TableColumn配置项
export type TableColumnConfig = {
  key: string
  title: string
  index?: string
  render?: (
    r: ColumnRenderConfig
  ) => ColumnRenderGenerateConfig
  width?: number
  fixed?: 'left' | 'right'
  ellipsis?: boolean
  form?: (r: FormRenderConfig) => FormRenderGenerateConfig
  formatter?: (record: DataRecord | any) => any
}

/**
 * TableForm配置项
 */
export type TableFormConfig = {
  key: string
  title: string
  render: (r: FormRenderConfig) => {
    type: string
    props: any
  }
  rules?: { [key: string]: any }[]
  width?: number
}

// 数据加载参数
export type LoadDataParams = {
  data: DataRecord
  page?: PageService
  update: (data: DataRecord[]) => void
}
