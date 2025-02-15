<script setup lang="ts">
/**
 * 2025/1/18 22:04
 * @author <a href="https://github.com/wzh-devin">devin</a>
 * @description 主页面
 * @version 1.0
 * @since 1.0
 */
import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { MainCard } from '@/views/main/module'
import { WebSocketManager } from '@/api/websocket/websocket'
import { WsType } from '@/global/enums/ws-type'
import { TOKEN } from '@/global/constant'
import LogoutButton from '@/components/LogoutButton.vue'

defineComponent({
  name: 'Main'
})

const router = useRouter()

let ws: WebSocketManager | null = null

// 初始化WebSocket连接
const initWebSocket = async () => {
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
    switch (message.type) {
      case WsType.LOGIN.type: {
        break
      }
      default:
        break
    }
  })

  try {
    await ws.connect()
  } catch (error) {
    console.error('WebSocket连接失败:', error)
  }
}

// 组件挂载时建立连接
onMounted(() => {
  initWebSocket()
})

// 组件卸载时断开连接
onUnmounted(() => {
  if (ws) {
    ws.disconnect()
    ws = null
  }
})

// 处理卡片点击
const handleCardClick = () => {
  router.push('/taobao/category')
}
</script>

<template>
  <div class="main-container">
    <main-card @click="handleCardClick" />
  </div>
</template>

<style lang="less" scoped>
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #e0eaff;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

::-webkit-scrollbar {
  display: none;
}

* {
  scrollbar-width: none;
}

* {
  -ms-overflow-style: none;
}
</style>
