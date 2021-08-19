import { ViteSSGContext } from 'vite-ssg'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

export const install = ({
  app,
  isClient
}: ViteSSGContext) => {
  if (!isClient) return

  app.use(Antd)
}
