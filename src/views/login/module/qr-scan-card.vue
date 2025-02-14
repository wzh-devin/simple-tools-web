<script setup lang="ts">
import { onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import { WebSocketManager } from '@/api/websocket/websocket'
import { WsType } from '@/global/enums/ws-type'
import { TOKEN } from '@/global/constant'

const props = defineProps<{
  active: boolean
}>()

const router = useRouter()
const loginStore = useLoginStore()
let ws: WebSocketManager | null = null

// 初始化WebSocket连接
const initWebSocket = async () => {
  // 如果已经存在连接，先断开
  if (ws) {
    ws.disconnect()
  }

  // 创建新的WebSocket连接
  ws = new WebSocketManager(
    `${import.meta.env.VITE_APP_WS_URL}/wx/${WsType.QR.type}`,
    WsType.QR
  )

  // 处理WebSocket消息
  ws.onMessage(async (message) => {
    console.log('收到消息:', message)
    switch (message.type) {
      case WsType.QR.type: {
        await loginStore.getQrCodeAction(message.data)
        break
      }
      case WsType.QR.pong: {
        // 使用枚举中定义的pong类型
        if (message.data?.loginUrl) {
          await loginStore.getQrCodeAction(message.data)
        }
        break
      }
      case WsType.LOGIN.type: {
        console.log('登录成功，连接已建立')
        // 保存token到本地缓存
        localStorage.setItem(TOKEN, message.data)
        // 关闭WebSocket连接
        ws?.disconnect()
        // 跳转到主页
        await router.push('/')
        ElMessage.success('登录成功')
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

// 监听active属性变化
watch(
  () => props.active,
  (newVal) => {
    if (newVal) {
      initWebSocket()
    } else if (ws) {
      // 切换到其他标签时断开WebSocket连接
      ws.disconnect()
      ws = null
    }
  }
)

// 组件卸载时确保断开连接
onUnmounted(() => {
  if (ws) {
    ws.disconnect()
    ws = null
  }
})
</script>

<template>
  <el-form class="login-form">
    <div class="wechat-login">
      <div class="qr-code">
        <img :src="loginStore.qrCode" alt="微信二维码" />
      </div>
      <p class="scan-tip">请使用微信扫码登录</p>
    </div>
  </el-form>
</template>

<style scoped lang="less">
.login-form {
  margin-top: 20px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wechat-login {
  padding: 0;
  text-align: center;

  .qr-code {
    width: 160px;
    height: 160px;
    margin: 0 auto 12px;
    background-color: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .scan-tip {
    font-size: 14px;
    color: #64748b;
    margin: 0;
  }
}
</style>
