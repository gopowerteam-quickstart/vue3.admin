import { ViteSSGContext } from 'vite-ssg'
import NProgress from 'nprogress'

export const install = ({ isClient, router }: ViteSSGContext) => {
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
