import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// 重置样式
import 'normalize.css'
import './assets/css/index.less'

// 导入路由
import router from './router'

// 导入pinia
const pinia = createPinia()

// 注册图标
import icon from '@/global/icon/register-icon.ts'

// 导入 Element Plus 样式
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(icon)

app.mount('#app')
