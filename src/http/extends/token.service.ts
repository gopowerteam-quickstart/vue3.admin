import { ExtendService } from '@gopowerteam/http-request'
import { useStore } from '~/store'

export class TokenService extends ExtendService {
  private userStore = useStore(store => store.user)

  public before = (params: any) => {
    const token = this.userStore.token

    if (token) {
      params.options.header = params.options.header || {}
      params.options.header['X-EmployeeToken'] = token
    }
  }
}
