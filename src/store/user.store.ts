import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { Ref } from 'vue'
import { EmployeeModel } from '~/http/model/wechat-service.model'

const STORE_ID = 'user'

type State = {
  token: Ref<string>
  current: EmployeeModel | undefined
}

const initialState: State = {
  token: useStorage('store_token', ''),
  current: undefined
}

export const useStore = defineStore(STORE_ID, {
  state: () => initialState,
  actions: {
    updateToken(token: string) {
      this.token = token
    },
    updateCurrent(user: EmployeeModel | undefined) {
      this.current = user
    }
  }
})
