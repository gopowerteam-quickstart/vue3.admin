import { ViteSSGContext } from 'vite-ssg'
import NProgress from 'nprogress'

export const install = ({
  isClient,
  router
}: ViteSSGContext) => {
  if (isClient) {
    router.beforeEach(() => {
      NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
}
