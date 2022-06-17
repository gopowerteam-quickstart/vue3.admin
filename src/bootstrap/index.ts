import { App } from 'vue'
import { Router } from 'vue-router'

export const bootstrap = ({
  app,
  router,
}: {
  app: App<Element>
  router: Router
}) => {
  return { app, router }
}
