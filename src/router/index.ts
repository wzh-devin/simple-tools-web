/**
 * 2025/1/5 22:33
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 路由管理
 * @version 1.0
 * @since 1.0
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/router/routes.ts'

const history = createWebHashHistory()

const router = createRouter({
  history,
  routes
})

// TODO 后续做 导航守卫

export default router
