import { templateRef } from '@vueuse/core'
import { get } from '@/shared/common'

export function useTable(ref: string) {
  // 获取引用
  // eslint-disable-next-line
  const tableRef = templateRef<any>(ref)

  // 重载数据
  const reload = () => {
    const table = get(tableRef)
    table.reload()
  }

  const getSelectedRowKeys = (): Array<string | number> => {
    const table = get(tableRef)
    return table.getSelectedRowKeys()
  }

  const getSelectedRows = (): Array<string | number> => {
    const table = get(tableRef)
    return table.getSelectedRows()
  }

  // 操作列表
  const actions = {
    reload,
    getSelectedRowKeys,
    getSelectedRows
  }

  return {
    use: (handler: (option: typeof actions) => void) =>
      handler(actions)
  }
}
