import { defineStore } from 'pinia'


export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      tab: true,
      theme: 'light',
      themeVariable: {
        "--global-primary-color": "#009688",
        "--global-normal-color": "#1e9fff",
        "--global-warm-color": "#ffb800",
        "--global-danger-color": "#ff5722",
        "--global-checked-color": "#5fb878",
      }
    }
  },
  getters: {
    
  },
  actions: {

  },
  persist: {
      enabled: true,
      strategies: [
        {
          key: 'tab',
          storage: localStorage
        },{
          key: 'theme',
          storage: localStorage
        }
      ]
  }
})