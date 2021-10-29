import dictConfig from '~/config/dict.config'

type DictItem = [
  value: string | boolean | number,
  title: string
]

export type DictData = {
  value: string | number | boolean
  label: string
}[]

type SelectDict = (option?: SelectOption) => DictData

type SelectOption = {
  default?: DictItem[]
  append?: DictItem[]
}

/**
 * 定义字典
 * @param items
 * @returns
 */
export function defineDict(items: DictItem[]) {
  return (option?: SelectOption) =>
    [
      ...(option?.default || []),
      ...items,
      ...(option?.append || [])
    ].map(([value, label]) => ({
      value,
      label
    }))
}
/**
 * 使用字典
 * @param select
 * @returns
 */
export function useDict(
  select: (dict: typeof dictConfig) => SelectDict,
  option?: SelectOption
) {
  return select(dictConfig)(option) || []
}
