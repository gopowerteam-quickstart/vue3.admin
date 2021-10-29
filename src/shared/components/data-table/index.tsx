import {
  defineComponent,
  PropType,
  ref,
  onMounted,
  provide,
  Ref
} from 'vue'
import type {
  DataRecord,
  FormRenderConfig,
  LoadDataParams,
  TableColumnConfig,
  TableFormConfig
} from './data-table-config'

import { get, set } from '~/shared/common'
import DataTableForm from './data-table-form.vue'
import DataTableBody from './data-table-body.vue'
import DataTableFooter from './data-table-footer.vue'
import { templateRef } from '@vueuse/core'
import { PageService } from '~/http/extends/page.service'

export * from './data-table-config'
export * from './data-table-helper'

/**
 * 渲染头部表单
 * @param forms
 * @returns
 */
function renderDataTableHeader(
  forms?: TableFormConfig[],
  actions?: any
) {
  return (
    <DataTableForm
      ref="form"
      forms={forms}
      v-slots={{ actions: actions }}
    ></DataTableForm>
  )
}

/**
 * 渲染表格
 */
function renderDataTableBody({
  rowKey,
  data,
  columns,
  selection
}: {
  rowKey: string
  data: Ref<DataRecord[]>
  columns: TableColumnConfig[]
  selection?: Boolean | Array<number | string>
}) {
  return (
    <DataTableBody
      ref="table"
      row-key={rowKey}
      data={data}
      columns={columns}
      selection={selection}
    ></DataTableBody>
  )
}

function renderDataTableFooter(page: PageService) {
  return <DataTableFooter page={page}></DataTableFooter>
}

export default defineComponent({
  props: {
    // 加载数据
    loadData: {
      type: Function as PropType<
        (params: LoadDataParams) => void
      >
    },
    //数据主键
    rowKey: {
      type: String,
      required: true
    },
    // 列配置
    columns: {
      type: Array as PropType<TableColumnConfig[]>,
      required: true
    },
    // 表单配置
    forms: {
      type: Array as PropType<TableFormConfig[]>,
      required: false
    },
    // 分页配置
    pagination: {
      type: Boolean,
      required: false
    },
    selection: {
      type: [Boolean, Array] as PropType<
        Boolean | Array<number | string>
      >,
      required: false
    }
  },
  setup(props, context, ...a) {
    // Form组件引用
    const formRef =
      templateRef<InstanceType<typeof DataTableForm>>(
        'form'
      )

    // Table组件引用
    const tableRef =
      templateRef<InstanceType<typeof DataTableBody>>(
        'table'
      )

    const dataSource = ref<DataRecord[]>([])

    const page = props.pagination
      ? new PageService()
      : undefined

    const froms = getFormsConfig({
      columns: props.columns,
      forms: props.forms
    })

    /**
     * 更新数据源
     */
    const updateDataSource = (value: DataRecord[]) => {
      console.log(value, 123)
      // TODO: 添加数据源副本
      const filterColumns = props.columns.filter(
        x => x.formatter
      )

      // 获取格式化数据
      const getFormatterData = (data: DataRecord[]) => {
        return data.map((row: DataRecord) => ({
          ...row,
          ...filterColumns.reduce(
            (
              result: { [key: string]: unknown },
              column
            ) => (
              (result[column.key] =
                column.formatter && column.formatter(row)),
              result
            ),
            {}
          )
        }))
      }

      // 更新数据源
      set(
        dataSource,
        filterColumns.length
          ? getFormatterData(value)
          : value
      )
    }

    /**
     * 加载表单数据
     */
    const onLoadData = () => {
      getFormData(formRef)
        .then((data: DataRecord) => {
          if (props.loadData) {
            props.loadData({
              data,
              page,
              update: updateDataSource
            })
          }
        })
        .catch(console.error)
    }

    context.expose({
      reload: onLoadData,
      getSelectedRowKeys: () =>
        get(tableRef).getSelectedRowKeys(),
      getSelectedRows: () => get(tableRef).getSelectedRows()
    })

    onMounted(() => {
      onLoadData()
    })

    provide('on-load-data', onLoadData)
    provide('table-columns-config', props.columns)

    return () => (
      <div class="data-table-container space-y-2">
        {(froms || context.slots.action) &&
          renderDataTableHeader(
            froms,
            context.slots.action
          )}
        {renderDataTableBody({
          rowKey: props.rowKey,
          data: dataSource,
          columns: props.columns,
          selection: props.selection
        })}
        {page && renderDataTableFooter(page)}
      </div>
    )
  }
})

/**
 * 获取Form数据
 */
const getFormData = (
  formRef: InstanceType<typeof DataTableForm>
): Promise<any> => {
  const formComponent = get(formRef)

  return formComponent
    ? formComponent.getFormValue()
    : Promise.resolve({})
}

/**
 * 生成表单配置
 * @param param0
 * @returns
 */
function getFormsConfig({
  columns,
  forms
}: {
  columns: TableColumnConfig[]
  forms?: TableFormConfig[]
}) {
  const formColumns: TableFormConfig[] = columns
    .filter(column => column.form)
    .map(column => ({
      key: column.key,
      title: column.title,
      render: column.form as (r: FormRenderConfig) => {
        type: string
        props: any
      }
    }))

  if (forms) {
    return [...forms]
  }

  if (formColumns && formColumns.length) {
    return [...formColumns]
  }
}
