import { ExtendService } from '@gopowerteam/http-request'
import { useStore } from '~/store'

export class TokenService extends ExtendService {
  public before = (params: any) => {
    const store = useStore(stores => stores.user)
    const userid = store.$state.token
    if (userid) {
      params.options.header = params.options.header || {}
      params.options.header['X-EmployeeToken'] = userid
    }
  }
}
