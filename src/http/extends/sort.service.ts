import {
  ExtendService,
  RequestParams
} from '@gopowerteam/http-request'

export class SortService extends ExtendService {
  private sort: { [key: string]: 'asc' | 'desc' } = {}

  constructor(data?: any) {
    super()

    if (data) this.sort = data
  }

  /**
   * 更新排序
   * @param key 排序关键字
   * @param value 排序方式
   */
  public update(key: string, value: 'desc' | 'asc') {
    if (key && value) {
      this.sort[key] = value
    }
  }

  /**
   * 移除排序项
   * @param key 排序关键字
   */
  public remove(key: string) {
    // 过滤
    const items: any[] = Object.entries(this.sort).filter(
      ([k, v]) => k !== key
    ) as any[]

    this.sort = {}

    // 判断排序项是否存在
    if (items) {
      items.forEach(([k, v]) => {
        this.sort[k] = v
      })
    }
  }

  public before = (params: RequestParams) => {
    params.setOptions({
      ...(params.getOptions() || {}),
      urlParams: {
        ...params.getOptions('urlParams'),
        sort: this.stringify(this.sort)
      }
    })
  }

  /**
   * 重置分页数据
   */
  public reset() {
    this.sort = {}
  }

  /**
   * 转换排序对象为字符串
   */
  private stringify(
    value: SortService | { [key: string]: 'asc' | 'desc' }
  ): string[] {
    if (typeof value !== 'object') {
      return []
    }

    if (value instanceof SortService) {
      value = value.sort
    }

    return Object.entries(value).map(
      ([k, v]) => `${k},${v}`
    )
  }
}
