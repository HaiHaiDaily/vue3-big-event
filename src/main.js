import { createApp } from 'vue'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'
import './assets/main.scss' // pnpm add scss -D ;l添加对scss的支持

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
