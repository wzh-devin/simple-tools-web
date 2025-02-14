/**
 * 2025/1/5 22:33
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 路由管理
 * @version 1.0
 * @since 1.0
 */

import { createRouter, createWebHashHistory } from 'vue-router'
import routes from '@/router/routes.ts'
import { TOKEN } from '@/global/constant'
import { WebSocketManager } from '@/api/websocket/websocket'
import { WsType } from '@/global/enums/ws-type'

const history = createWebHashHistory()

const router = createRouter({
  history,
  routes
})

let ws: WebSocketManager | null = null

// 初始化WebSocket连接
const initLoginWebSocket = async () => {
  // 如果已经存在连接，先断开
  if (ws) {
    ws.disconnect()
  }

  // 创建新的WebSocket连接
  ws = new WebSocketManager(
    `${import.meta.env.VITE_APP_WS_URL}/wx/${WsType.LOGIN.type}`,
    WsType.LOGIN
  )

  // 处理WebSocket消息
  ws.onMessage(async (message) => {
    console.log('收到消息:', message)
    switch (message.type) {
      case WsType.LOGIN.type: {
        console.log('登录成功，连接已建立')
        break
      }
      default:
        console.log('未处理的消息类型:', message.type)
        break
    }
  })

  try {
    await ws.connect()
  } catch (error) {
    console.error('WebSocket连接失败:', error)
  }
}

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem(TOKEN)
  const isLoginPage = to.path === '/login'

  if (token) {
    if (isLoginPage) {
      // 已登录且要跳转登录页，重定向到主页
      next('/')
    } else {
      // 已登录且不是登录页，确保WebSocket连接
      if (!ws || !ws.isConnected()) {
        await initLoginWebSocket()
      }
      next()
    }
  } else {
    if (isLoginPage) {
      // 未登录且要跳转登录页
      next()
    } else {
      // 未登录且要跳转其他页面，重定向到登录页
      next('/login')
    }
  }
})

// 路由切换时检查WebSocket连接
router.afterEach(() => {
  const token = localStorage.getItem(TOKEN)
  if (token && (!ws || !ws.isConnected())) {
    initLoginWebSocket()
  }
})

export default router
