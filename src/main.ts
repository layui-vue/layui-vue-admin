import { createApp } from 'vue'
import './styles/index.css'
import Store from './store'
import App from './App.vue'
import Router from './router'

createApp(App)
.use(Store)
.use(Router)
.mount('#app');