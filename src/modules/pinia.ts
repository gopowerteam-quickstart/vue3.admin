import { createPinia } from 'pinia'
import { ViteSSGContext } from 'vite-ssg'

export const install = ({
  app,
  initialState,
  router
}: ViteSSGContext) => {
  // const pinia = createPinia()
  // app.use(pinia)
  // if (import.meta.env.SSR) {
  //   initialState.pinia = pinia.state.value
  // } else {
  //   pinia.state.value = initialState.pinia || {}
  // }
  // router.beforeEach((to, from, next) => {
  //   const store = useRootStore(pinia)
  //   if (!store.ready)
  //     // perform the (user-implemented) store action to fill the store's state
  //     store.initialize()
  //   next()
  // })
}
