import { ViteSSGContext } from 'vite-ssg'
import NProgress from 'nprogress'

export const install: (ctx: ViteSSGContext) => void = ({
  isClient,
  router
}) => {
  if (isClient) {
    router.beforeEach(() => {
      NProgress.start()
    })
    router.afterEach(() => {
      NProgress.done()
    })
  }
}
