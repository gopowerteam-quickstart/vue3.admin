import type { ViteSSGContext } from 'vite-ssg'
import NProgress from 'nprogress'

export const install: (ctx: ViteSSGContext) => void = ({
  isClient,
  router,
}: ViteSSGContext) => {
  if (isClient) {
    NProgress.configure({
      easing: 'ease',
      speed: 500,
    })

    router.beforeEach((to, from) => {
      if (to.path !== from.path) NProgress.start()
    })

    router.afterEach(() => {
      NProgress.done()
    })
  }
}
