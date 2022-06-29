import { isObservable, Observable } from 'rxjs'
import { StoreQuery } from '~/store'
import type { Ref } from 'vue'
import { select } from '@ngneat/elf'

export function useStore<T>(query: Observable<T>): Ref<T>
export function useStore<T, R>(
  query: StoreQuery<T>,
  selector: (state: T) => R,
): Ref<R>
export function useStore<T, R>(
  query: StoreQuery<T> | Observable<T>,
  selector?: (state: T) => R,
) {
  if (isObservable(query)) {
    const state = ref<T>()

    query.subscribe((data) => {
      state.value = data
    })

    return state
  }

  if (query instanceof StoreQuery && selector) {
    const state = ref<R>()

    query.steam$.pipe(select(selector)).subscribe((data) => {
      state.value = data
    })

    return state
  }
}
