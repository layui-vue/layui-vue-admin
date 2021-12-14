import { createApp } from 'vue'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'
import './styles/index.css'

import App from './App.vue'
import Router from './router'

createApp(App)
.use(Layui)
.use(Router)
.mount('#app')
