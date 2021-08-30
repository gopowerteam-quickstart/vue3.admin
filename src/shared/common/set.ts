import type { Ref } from 'vue'

type SetOption = {
  update: boolean
}

export function set<T>(
  target: Ref<T>,
  value: Partial<T>,
  option?: SetOption
): void
export function set<T>(
  target: Ref<T>,
  value: (data: T) => Partial<T>,
  option?: SetOption
): void
export function set<T>(
  target: Ref<T>,
  value: (data: T) => Promise<Partial<T>>,
  option?: SetOption
): void
export function set<T>(
  target: Ref<T>,
  value:
    | Partial<T>
    | ((data: T) => Partial<T>)
    | ((data: T) => Promise<Partial<T>>),
  option: SetOption = { update: false }
): void {
  const updateValue = (v: Partial<T>) => {
    const newValue = {
      ...(option.update ? target.value : {}),
      ...v
    }

    target.value = newValue as T
  }

  if (typeof value === 'function') {
    Promise.resolve(value(target.value))
      .then(result => {
        updateValue(result)
      })
      .catch(ex => console.error)
  } else {
    updateValue(value)
  }
}
