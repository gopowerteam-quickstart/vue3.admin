<template>
  <page-container title="111">
    <a-input placeholder="page2"></a-input>

    <data-table
      ref="table"
      :pagination="pageService"
      row-key="username"
      :load-data="loadData"
      :search-forms="searchForms"
      action-align="right"
      :edit-forms="searchForms"
      :columns="columns">
      <template #actions>
        <button @click="() => table.reload()">reload</button>
        <div>1231</div>
        <div>1231</div>
        <div>1231</div>
      </template>
    </data-table>
  </page-container>
</template>

<script setup lang="ts">
import { PageService } from '@/http/extends/page.service'
import {
  useTable,
  type DataRecord,
  type FormItemsOptions,
  type LoadDataParams,
  type TableColumnsOptions,
} from '@gopowerteam/vue-dynamic-table'

type DataItem = {
  phone: string
  username: string
  nickname: string
}

const pageService = new PageService()
const table = useTable('table')

function loadData({ search, update }: LoadDataParams) {
  console.log(search)
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
    title: 'phone',
    rules: [{ required: true, message: '请输入手机号' }],
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
              console.log(record)
            },
          },
          {
            text: '编辑',
            callback: (record) => {
              table.value.edit({
                record,
                appendRowKey: true,
                submit: (data: DataRecord) => {
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
name: page2
meta:
  layout: workspace
  menu:
    key: root2.test.page2
    icon: xxx
    title: Page2
</route>
