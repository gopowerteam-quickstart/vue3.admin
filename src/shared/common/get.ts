import { MaybeRef } from '@vueuse/core'
import { unref } from 'vue'

export function get<T>(obj: MaybeRef<T>, key?: keyof T) {
  if (key == null) return unref(obj)

  return unref(obj)[key]
}
