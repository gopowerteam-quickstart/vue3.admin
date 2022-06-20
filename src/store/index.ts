import { select, Store, StoreDef } from '@ngneat/elf'

export class StoreAction<T> {
  protected store!: Store<StoreDef, T>

  constructor(store: Store<StoreDef, T>) {
    this.store = store
  }
}

export class StoreQuery<T> {
  protected readonly store!: Store<StoreDef, T>

  protected get state$() {
    return this.store.pipe(select((state) => state))
  }

  constructor(store: Store<StoreDef, T>) {
    this.store = store
  }
}

export * from './user.store'
