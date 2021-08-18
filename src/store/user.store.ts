import { defineStore } from 'pinia'

const STORE_ID = 'user'

type State = {
  id: string
  token: string
  current: string
}

const initialState: State = {
  id: '',
  token: '',
  current: 'asdasd'
}

export const useStore = defineStore(STORE_ID, {
  state: () => initialState,
  getters: {
    doubleCount(state) {
      return state.id + '2'
    }
  },
  actions: {
    increment() {
      this.current = ''
    },
    login() {
      if (!this.id) {
        return
      }

      this.token = 'token'
    }
  }
})
