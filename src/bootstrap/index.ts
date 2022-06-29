import { App } from 'vue'
import { Router } from 'vue-router'

export const bootstrap = async ({
  app,
  router,
}: {
  app: App<Element>
  router: Router
}) => {
  router.beforeEach(async (to, from, next) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        next()
      }, 3000)
    })
  })
  // // 系统初始化状态
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 3000)
  // })
  return { app, router }
}
