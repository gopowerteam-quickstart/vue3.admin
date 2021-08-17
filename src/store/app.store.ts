import { defineStore } from 'pinia'

const STORE_ID = 'app'

type State = {
  ready: boolean
}

const initialState: State = {
  ready: false
}

export const useStore = defineStore(STORE_ID, {
  state: () => initialState,
  actions: {
    setReady() {
      this.ready = true
    }
  }
})
