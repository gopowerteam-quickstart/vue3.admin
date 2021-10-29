<script lang="tsx">
import { ColumnProps } from 'ant-design-vue/es/table/interface'
import { PropType } from 'vue'
import {
  ColumnRenderConfig,
  ColumnRenderGenerateConfig,
  ColumnRenderSupportType,
  DataRecord,
  RowParams,
  TableColumnConfig
} from '.'
import ButtonColumn from './components/table/button-column.vue'
import ImageColumn from './components/table/image-column.vue'
import CurrencyColumn from './components/table/currency-column.vue'
import PhoneColumn from './components/table/phone-column.vue'
import DictColumn from './components/table/dict-column.vue'
import ViewColumn from './components/table/view-column.vue'
import LinkColumn from './components/table/link-column.vue'
/**
 * 生成渲染配置
 */
function generateColumnRender(column: TableColumnConfig) {
  const { type } = getRenderConfig(column)
  return {
    slots: {
      customRender: `${column.key}_${type}`
    }
  }
}

/**
 * 生成列配置
 */
const generateColumnConfig = (
  column: TableColumnConfig
): ColumnProps => {
  const config: Record<string, unknown> = {
    key: column.key,
    align: 'center',
    title: column.title,
    width: column.width,
    fixed: column.fixed
  }

  // 生成渲染配置
  const renderConfig = column.render
    ? generateColumnRender(column)
    : {}

  if (!column.render) {
    config.dataIndex = column.index || column.key
  }

  return {
    ...config,
    ...renderConfig
  }
}

/**
 * 生成咧组建
 */
function generateColumnComponent(Component: any) {
  return (config: any) => (params: RowParams) =>
    <Component config={config} params={params}></Component>
}

/**
 * 列组件模板
 */
const templates: {
  [key: string]: (
    config: any
  ) => (params: RowParams) => JSX.Element | JSX.Element[]
} = {
  button: generateColumnComponent(ButtonColumn),
  image: generateColumnComponent(ImageColumn),
  currency: generateColumnComponent(CurrencyColumn),
  phone: generateColumnComponent(PhoneColumn),
  dict: generateColumnComponent(DictColumn),
  view: generateColumnComponent(ViewColumn),
  link: generateColumnComponent(LinkColumn)
}

/**
 * 获取渲染配置
 */
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

/**
 * 生成Slots
 */
function generateSlots(columns: TableColumnConfig[]) {
  return columns
    .filter(column => !!column?.render)
    .map(column => ({
      key: column.key,
      ...getRenderConfig(column)
    }))
    .reduce(
      (
        slots: {
          [key: string]: (
            params: RowParams
          ) => JSX.Element | JSX.Element[]
        },
        column: any
      ) => (
        (slots[`${column.key}_${column.type}`] = templates[
          column.type
        ](column.props)),
        slots
      ),
      {}
    )
}

/**
 * 创建选择数据项
 */
function createrowSelection(
  selection?: boolean | (string | number)[]
) {
  if (!selection) {
    return
  }

  const selectedRowKeys = ref<(string | number)[]>([
    ...(Array.isArray(selection) ? selection : [])
  ])

  const onChange = (keys: (string | number)[]) => {
    set(selectedRowKeys, keys)
  }

  return {
    selectedRowKeys,
    onChange
  }
}

export default defineComponent({
  components: { ButtonColumn },
  props: {
    rowKey: {
      type: String,
      required: true
    },
    data: {
      type: Object as PropType<DataRecord[]>,
      required: true
    },
    columns: {
      type: Array as PropType<TableColumnConfig[]>,
      required: true
    },
    selection: {
      type: [Boolean, Array] as PropType<
        boolean | Array<number | string>
      >,
      required: false
    }
  },
  setup(props, context) {
    // 创建选择支持
    const rowSelection = createrowSelection(props.selection)
    // 获取选择项
    const getSelectedRowKeys = () => {
      return rowSelection
        ? get(rowSelection?.selectedRowKeys)
        : []
    }
    // 获取选择数据行
    const getSelectedRows = () => {
      if (!rowSelection) return []

      const selectedRowKeys = get(
        rowSelection.selectedRowKeys
      )

      return get(props.data).filter(record =>
        selectedRowKeys.includes(record[props.rowKey])
      )
    }

    context.expose({
      getSelectedRowKeys,
      getSelectedRows
    })

    const slots = generateSlots(props.columns)
    provide('table-columns-slot', slots)

    return () => (
      <a-table
        rowSelection={rowSelection}
        scroll={{ x: true }}
        row-key={props.rowKey}
        data-source={get(props.data)}
        pagination={false}
        size="small"
        columns={props.columns.map(generateColumnConfig)}
        v-slots={slots}
      ></a-table>
    )
  }
})
</script>
