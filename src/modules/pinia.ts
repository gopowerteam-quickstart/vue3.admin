import { createPinia } from 'pinia'

import persist from 'pinia-plugin-persistedstate'
import type { ViteSSGContext } from 'vite-ssg'

export const install: (ctx: ViteSSGContext) => void = ({
  isClient,
  initialState,
  app,
}: ViteSSGContext) => {
  const pinia = createPinia()
  pinia.use(persist)
  app.use(pinia)

  if (isClient) {
    pinia.state.value = initialState.pinia || {}
  } else {
    initialState.pinia = pinia.state.value
  }
}
