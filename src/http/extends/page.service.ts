import {
  ExtendService,
  RequestParams
} from '@gopowerteam/http-request'
import { ref } from 'vue'

export class PageService extends ExtendService {
  public default = {
    pageSize: 10,
    pageIndex: 1,
    total: 0,
    pageSizeOpts: ['10', '20', '50', '100']
  }
  public pageSize = ref(0)
  public pageIndex = ref(0)
  public total = ref(0)
  public pageSizeOpts: string[] = []

  constructor(data?: any) {
    super()

    if (data) this.default = { ...this.default, ...data }

    this.pageSize.value = this.default.pageSize
    this.pageIndex.value = this.default.pageIndex || 1
    this.total.value = this.default.total
    this.pageSizeOpts = this.default.pageSizeOpts
  }

  public before = (params: RequestParams) => {
    params.setOptions({
      ...(params.getOptions() || {}),
      urlParams: {
        ...params.getOptions('urlParams'),
        size: this.pageSize.value,
        page: this.pageIndex.value - 1
      }
    })
  }

  public after = (
    response: any,
    params: RequestParams,
    setData: (data: any) => void
  ) => {
    this.total.value = response.totalElements

    setData(response.content)
  }

  public reset() {
    this.pageIndex.value = this.default.pageIndex
    this.pageSize.value = this.default.pageSize
  }

  public update(pageIndex: number, pageSize: number) {
    this.pageIndex.value = pageIndex
    this.pageSize.value = pageSize
    return Promise.resolve()
  }
}
