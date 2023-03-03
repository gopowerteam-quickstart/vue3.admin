<template lang="pug">
data-table(
  ref='table'
  :pagination='pageService'
  row-key='username'
  :load-data='loadData'
  :search-forms='searchForms'
  action-align='right'
  :edit-forms='editsForms'
  :columns='columns')
  template(#actions)
    a-button(type='primary' @click='() => table.reload()') 刷新
    a-button(type='primary' @click='() => onAdd()') 新增
</template>

<script setup lang="ts">
import type { UploadTask } from '@/shared/utils/upload.service'
import { PageService } from '@/http/extends/page.service'
import {
  useTable,
  type LoadDataParams,
  type FormItemsOptions,
  type TableColumnsOptions,
  type DataRecord,
} from '@gopowerteam/vue-dynamic-table'

type DataItem = {
  phone: string
  username: string
  nickname: string
}

function onAdd() {
  table.value.edit({
    title: '创建',
    record: {
      phone: '',
      username: '',
      nickname: '',
    },
    appendRowKey: true,
    submit: (data: DataRecord) => {
      // eslint-disable-next-line no-console
      console.log('add:', data)
    },
  })
}

const pageService = new PageService()
const table = useTable('table')

function loadData({ update }: LoadDataParams) {
  setTimeout(() => {
    update([
      {
        phone: '18800001111',
        username: '001',
        nickname: '111',
      },
      {
        phone: '18800001111',
        username: '002',
        nickname: '112',
      },
      {
        phone: '18800001111',
        username: '002',
        nickname: '112',
      },
    ])
  }, 1000)
}

const searchForms: FormItemsOptions = [
  {
    key: 'phone',
    title: '手机号',
    rules: [{ required: true, message: '请输入手机号' }],
    render: (r) => r.input(),
  },
]

const editsForms: FormItemsOptions = [
  {
    key: 'phone',
    title: '手机号',
    rules: [{ required: true, message: '请输入手机号' }],
    render: (r) => r.input(),
  },
  {
    key: 'username',
    title: '用户名',
    rules: [{ required: true, message: '请输入用户名' }],
    render: (r) => r.input(),
  },
  {
    key: 'nickname',
    title: '昵称',
    rules: [{ required: true, message: '请输入昵称' }],
    render: (r) => r.input(),
  },
]

const columns: TableColumnsOptions<DataItem> = [
  {
    key: 'username',
    title: '名称',
  },

  {
    key: 'phone',
    title: '手机号',
    render: (r) => r.phone({ safe: true, callable: true }),
  },

  {
    key: 'nickname',
    title: '用户名',
    render: (r) =>
      r.text({
        color: 'red',
        text: '1',
      }),
  },
  {
    key: 'action',
    title: '操作',
    render: (r) =>
      r.button({
        buttons: [
          {
            text: '测试1',
            confirm: true,
            confirmText: 'gogogo',
            confirmAppend: '#test',
            callback: (record) => {
              // eslint-disable-next-line no-console
              console.log(record)
            },
          },
          {
            text: '编辑',
            callback: (record) => {
              table.value.edit({
                title: '编辑',
                record,
                appendRowKey: true,
                submit: (data: DataRecord) => {
                  // eslint-disable-next-line no-console
                  console.log(data)
                },
              })
            },
          },
        ],
      }),
  },
]
</script>

<route lang="yaml">
name: table-demo
meta:
  layout: workspace
  requireAuth: true
  title: table示例
  menu:
    key: demo.table-demo
    icon: image-1.png
    title: Table
</route>
