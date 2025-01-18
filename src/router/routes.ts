/**
 * 2025/1/5 22:35
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 配置路由
 * @version 1.0
 * @since 1.0
 */
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'root',
    redirect: '/main'
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/not-found/NotFound.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/taobao/home',
    name: 'taobao',
    component: () => import('@/views/taobao/home/index.vue')
  }
]

export default routes
