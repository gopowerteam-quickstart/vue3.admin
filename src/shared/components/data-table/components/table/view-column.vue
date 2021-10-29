<template lang="pug">
a-button(@click='onView' type='link') {{ value }}
</template>

<script setup lang="ts">
import { useModal } from '@gopowerteam/vue-modal'
import type {
  ColumnRenderConfig,
  ColumnRenderGenerateConfig,
  ColumnRenderViewConfig,
  RowParams,
  TableColumnConfig
} from '../../data-table-config'

import { ColumnRenderSupportType } from '../../data-table-config'

import DataTableView from '../../data-table-view.vue'
const model = useModal()
interface Props {
  config: ColumnRenderViewConfig
  params: RowParams
}

const props = defineProps<Props>()

// 获取数值字段
const value = computed<string>(() => {
  return (
    props.config.text ??
    props.params.record[props.params.column.key as string]
  )
})

const columnSlots = inject('table-columns-slot') as any
const columnConfig = inject('table-columns-config') as any[]

function generateValueColumn(column: any) {
  return {
    title: column.title,
    value: props.params.record[column.key]
  }
}

function filterColumn({
  type,
  props,
  column
}: {
  type: string
  props: any
  column: TableColumnConfig
}) {
  if (type === 'button') {
    return () => void 0
  }

  if (type === 'view') {
    return props.text
      ? () => void 0
      : () => generateValueColumn(column)
  }

  return (render: any) => render
}

function getRenderConfig(column: TableColumnConfig) {
  const render = column.render as (
    r: ColumnRenderConfig
  ) => ColumnRenderGenerateConfig

  return render(
    ColumnRenderSupportType.reduce(
      (result, type) => (
        (result[type] = props => ({
          type,
          props
        })),
        result
      ),
      {} as {
        [k in typeof ColumnRenderSupportType[number]]: (
          key: any
        ) => any
      }
    )
  )
}

function onView() {
  const columns = columnConfig.map(
    (column: TableColumnConfig, index) => {
      if (!column.render) {
        return generateValueColumn(column)
      }

      const { type, props: columnProps } =
        getRenderConfig(column)

      return filterColumn({
        type,
        props: columnProps,
        column
      })({
        title: column.title,
        render: () =>
          columnSlots[`${column.key}_${type}`]({
            index,
            record: props.params.record,
            column: { key: column.key }
          })
      })
    }
  )

  model.open({
    component: DataTableView,
    props: {
      columns: columns.filter(x => !!x)
    },
    title: props.config.title,
    width: '80%'
  })
}
</script>
