import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// 重置样式
import 'normalize.css'
import './assets/css/index.less'

// 导入路由
import router from './router'

// 导入pinia
import pinia from '@/stores'

// 注册图标
import icon from '@/global/icon/register-icon.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(pinia)
app.use(icon)

app.mount('#app')
