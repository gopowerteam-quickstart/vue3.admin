import DynamicTable, { type DataRecord } from '@gopowerteam/vue-dynamic-table'
import type { App } from 'vue'

export default function (app: App) {
  app.use(DynamicTable, {
    name: 'data-table',
    override: {
      table: {
        // 支持重写&自定义
        test: () => (row: DataRecord) => h('div', [row.name]),
      },
    },
  })
}
