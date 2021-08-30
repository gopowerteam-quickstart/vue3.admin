import type { Ref } from 'vue'

export function set<T>(
  target: Ref<T>,
  value: Partial<T>,
  option: {
    update: boolean
  } = { update: false }
) {
  const newValue = {
    ...(option.update ? target.value : {}),
    ...value
  }

  target.value = newValue as T
}
