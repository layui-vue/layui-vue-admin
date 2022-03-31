import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      tab: true
    }
  },
  getters: {
    
  },
  actions: {
    updateTab: (b: boolean) => {
        //@ts-ignore
        this.tab = b;
    }
  },
  persist: {
      enabled: true,
      strategies: [
        {
          key: 'tab',
          storage: localStorage
        }
      ]
  }
})