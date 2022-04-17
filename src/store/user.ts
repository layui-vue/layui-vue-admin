import { defineStore } from 'pinia'


export const useAppStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: {},
      userInfo: {},
    }
  },
  persist: {
      enabled: true,
      strategies: [
        {
          key: 'token',
          storage: localStorage
        },{
          key: 'userInfo',
          storage: localStorage
        }
      ]
  }
})