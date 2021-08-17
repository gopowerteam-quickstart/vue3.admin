import { Store, StoreDefinition } from 'pinia'
import { useStore as userStore } from './user.store'
import { useStore as appStore } from './app.store'

const stores = {
  app: appStore,
  user: userStore
}

export function useStore<ID extends string, S, G, A>(
  select: (
    store: typeof stores
  ) => StoreDefinition<ID, S, G, A>
): Store<ID, S, G, A> {
  const store = select(stores)
  return store()
}
