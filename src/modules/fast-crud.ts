import { ViteSSGContext } from 'vite-ssg'

import { FastCrud } from '@fast-crud/fast-crud'
import '@fast-crud/fast-crud/dist/style.css'
import AntdvUI from '@fast-crud/ui-antdv'

export const install = ({
  app,
  isClient
}: ViteSSGContext) => {
  if (!isClient) return

  // 先安装ui
  app.use(AntdvUI)
  // 然后安装FastCrud
  app.use(FastCrud, {
    commonOptions() {
      return {
        table: {
          size: 'small'
        },
        actionbar: {
          buttons: {
            add: {
              show: false
            }
          }
        },
        rowHandle: {
          buttons: {
            view: {
              type: 'link',
              text: '1',
              icon: 'ion:eye-outline'
            },
            edit: {
              type: 'link',
              text: null,
              icon: 'ion:create-outline'
            },
            remove: {
              type: 'link',
              style: { color: 'red' },
              text: null,
              icon: 'ion:trash-outline'
            }
          },
          dropdown: {
            more: {
              type: 'link'
            }
          }
        },
        form: {
          display: 'flex'
        },
        toolbar: {
          show: false
        }
      }
    }
  })
}
