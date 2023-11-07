import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/main.scss' // pnpm add scss -D ;l添加对scss的支持

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
