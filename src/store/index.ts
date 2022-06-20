import { select, Store, StoreDef } from '@ngneat/elf'

export abstract class StoreAction<T> {
  protected store!: Store<StoreDef, T>

  constructor(store: Store<StoreDef, T>) {
    this.store = store
  }
}

export abstract class StoreQuery<T> {
  protected readonly store!: Store<StoreDef, T>

  public get state$() {
    return this.store.pipe(select((state) => state))
  }

  constructor(store: Store<StoreDef, T>) {
    this.store = store
  }

  select<R>(selector: (state: T) => R) {
    return selector(this.store.getValue())
  }
}
