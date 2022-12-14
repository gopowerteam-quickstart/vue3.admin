import { defineStore } from 'pinia'

type User = {
  id: string
  name: string
}

type State = {
  token: string
  current?: User
}

const initialState: State = {
  token: '',
}

export const useUserStore = defineStore('user', {
  state: () => initialState,
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    updateUser(user: User) {
      this.current = user
    },
    /**
     * 更新用户
     * @param user
     */
    updateToken(token: string) {
      this.token = token
    },
  },
  persist: {
    paths: ['token'],
  },
})
