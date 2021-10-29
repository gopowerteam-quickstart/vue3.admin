<template lang="pug">
page-container(description='测试一个测试')
  template(#action)
    a-button 1
    a-button 1
    a-button(@click='onAdd') 1
  a-button xxxx
  file-upload(@upload='aaa' multiple)
    a-button asdasd
  data-table(
    :columns='columns'
    :forms='forms'
    :load-data='onLoadData'
    ref='table'
    rowKey='id'
    selection)
    template(#action)
      a-button(@click='bbb' type='primary') 测试1
      a-button(type='primary') 测试2
  a-image-preview-group
    .flex.flex-row.space-x-5
      image-preview(
        :height='200'
        :width='200'
        object-key='N5-F94tP6onkZZ54DJcYK'
        storage='private'
        type='cos')
      image-preview(
        :height='200'
        :width='200'
        object-key='ap4LeBFsRMgpdO_Z84-AR.png'
        storage='private'
        type='cos')
      image-preview(
        :height='200'
        :width='200'
        object-key='N5-F94tP6onkZZ54DJcYK'
        storage='private'
        type='cos')

  a-date-picker
  a-row
    a-col(:span='12')
      #chart-line
    a-col(:span='12')
      #chart-pie
</template>

<script setup lang="ts">
import type {
  LoadDataParams,
  TableColumnConfig,
  TableFormConfig
} from '~/shared/components/data-table'
import { useTable } from '~/shared/components/data-table'
import { useFileService } from '~/shared/services/file.service'
import { useDict } from '~/shared/utils/dict.util'
import ImagePreview from '../../shared/components/image-preview.vue'
import { Pie, Line } from '@antv/g2plot'

function bbb() {
  console.log('123123')
}

const fileService = useFileService(
  storage => storage.private
)

const table = useTable('table')

const forms: TableFormConfig[] = [
  {
    key: 'title',
    title: '测试',
    width: 300,
    render: r =>
      // r.datePicker({
      //   mode: 'date',
      //   autoSubmit: true,
      //   defaultValue: Date.parse('2020-01-01 11:11:11')
      // })
      r.select({
        options: useDict(dict => dict.YesNo, {
          default: [['', '全部']]
        })
      })
  }
]

const columns: TableColumnConfig[] = [
  {
    key: 'title',
    title: '标题',
    render: r =>
      r.view({
        title: '用户详情'
      })
  },
  {
    key: 'name',
    title: '姓名',
    render: r =>
      r.link({
        router: record => ({
          name: 'page2'
        })
      })
  },
  {
    key: 'lastOperatorName',
    width: 100,
    title: '操作人',
    formatter: row => row.lastOperatorName + '1123'
  },
  {
    key: 'image',
    title: '图片',
    render: r =>
      r.image({
        storage: 'private',
        type: 'cos',
        width: 50,
        height: 50
      })
  },
  {
    key: 'currency',
    title: '金额',
    render: r =>
      r.currency({
        prefix: '￥',
        unit: '元',
        precision: 2
      })
  },
  {
    key: 'enable',
    title: '状态',
    render: r =>
      r.dict({
        dict: useDict(dict => dict.Enable)
      })
  },
  {
    key: 'phone',
    title: '手机号',
    render: r =>
      r.phone({
        safe: true,
        separator: ' '
      })
  },
  {
    key: 'action',
    title: '操作',
    render: r =>
      r.button([
        {
          text: '测试1',
          click: (record, { reload }) => {
            reload()
          },
          confirm: true
        },
        {
          text: '测试2',
          click: () => {
            console.log(123)
          }
        }
      ])
  }
]

function onAdd() {
  table.use(({ getSelectedRowKeys, getSelectedRows }) => {
    console.log(getSelectedRowKeys(), getSelectedRows())
  })
}

function onLoadData({
  data,
  page,
  update
}: LoadDataParams) {
  // update([
  //   {
  //     id: 1,
  //     title: 'test1',
  //     name: '张三',
  //     lastOperatorName:
  //       'supermanasdasfdasdjfkljkasdl;f;kljasklfkasdjfjasdkl;kl;asjdfkljaskld;k',
  //     currency: 1000000,
  //     phone: '18099992222',
  //     enable: 1,
  //     image: 'FQalM1ot_Pfy18Y4WhpKZ.png'
  //   }
  // ])
}

function aaa(x: FileList) {
  fileService.upload(x).subscribe(data => {
    console.log(data)
  })
}

function renderLineChart() {
  const line = new Line('chart-line', {
    data: [],
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2
      }
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red'
        }
      }
    },
    interactions: [{ type: 'marker-active' }]
  })

  return line.render(), line
}

function renderPieChart() {
  const piePlot = new Pie('chart-pie', {
    data: [],
    angleField: 'value',
    colorField: 'type'
  })

  return piePlot.render(), piePlot
}

function getLineData(line: Line) {
  new Promise(resolve => {
    setTimeout(resolve, 1000)
  }).then(() => {
    line.changeData([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 }
    ])
  })
}

function getPieData(pie: Pie) {
  new Promise(resolve => {
    setTimeout(resolve, 1000)
  }).then(() => {
    pie.changeData([
      { type: '分类一', value: 27 },
      { type: '分类二', value: 25 },
      { type: '分类三', value: 18 },
      { type: '分类四', value: 15 },
      { type: '分类五', value: 10 },
      { type: '其他', value: 5 }
    ])
  })
}

onMounted(() => {
  const pie = renderPieChart()
  const line = renderLineChart()

  getLineData(line)
  getPieData(pie)
})
</script>

<style lang="less" scoped>
.a {
  color: @primary-color;
}
</style>

<route lang="yaml">
name: page1
meta:
  title: 页面1
  layout: workspace
  menu:
    group: 测试
    index: 2
    icon: /icons/app.svg
</route>
