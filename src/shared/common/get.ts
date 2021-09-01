import { MaybeRef } from '@vueuse/core'
import { unref } from 'vue'

export function get<T>(target: MaybeRef<T>): T
export function get<T>(target: MaybeRef<T>, key: keyof T): T
export function get<T>(target: MaybeRef<T>, key?: keyof T) {
  if (key == null) return unref(target)

  return unref(target)[key]
}
