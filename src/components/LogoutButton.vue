<template>
  <div
    class="logout-button"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
    ref="buttonRef"
  >
    <el-button
      class="custom-logout-btn"
      type="danger"
      @click="handleLogout"
      size="default"
      :loading="loading"
    >
      <template #icon>
        <el-icon class="logout-icon"><SwitchButton /></el-icon>
      </template>
      退出登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { SwitchButton } from '@element-plus/icons-vue'
import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'

const router = useRouter()
const loading = ref(false)
const buttonRef = ref<HTMLElement | null>(null)

// 处理拖拽开始
const handleDragStart = (e: DragEvent) => {
  if (!buttonRef.value) return

  const rect = buttonRef.value.getBoundingClientRect()
  e.dataTransfer?.setData(
    'text/plain',
    `${e.clientX - rect.left},${e.clientY - rect.top}`
  )
}

// 确保按钮在视窗范围内
const keepInViewport = (
  x: number,
  y: number,
  buttonWidth: number,
  buttonHeight: number
) => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  return {
    x: Math.min(Math.max(0, x), viewportWidth - buttonWidth),
    y: Math.min(Math.max(0, y), viewportHeight - buttonHeight)
  }
}

// 处理拖拽结束
const handleDragEnd = (e: DragEvent) => {
  if (!buttonRef.value) return

  const buttonRect = buttonRef.value.getBoundingClientRect()
  const { x, y } = keepInViewport(
    e.clientX,
    e.clientY,
    buttonRect.width,
    buttonRect.height
  )

  buttonRef.value.style.position = 'fixed'
  buttonRef.value.style.left = `${x}px`
  buttonRef.value.style.top = `${y}px`
}

// 监听窗口大小变化，确保按钮始终在视窗内
const handleResize = () => {
  if (!buttonRef.value) return

  const buttonRect = buttonRef.value.getBoundingClientRect()
  const { x, y } = keepInViewport(
    buttonRect.left,
    buttonRect.top,
    buttonRect.width,
    buttonRect.height
  )

  buttonRef.value.style.left = `${x}px`
  buttonRef.value.style.top = `${y}px`
}

// 组件挂载时添加窗口大小变化监听
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

// 组件卸载时移除监听
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// 处理登出
const handleLogout = async () => {
  try {
    loading.value = true
    const token = getToken()

    // 发送登出请求
    await axios.post('https://localhost:8080/api/v1/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // 关闭所有 WebSocket 连接
    if (window.websockets) {
      Object.values(window.websockets).forEach((ws) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.close()
        }
      })
    }

    // 清除本地存储的 token
    removeToken()

    ElMessage.success('退出登录成功')
    router.push('/login')
  } catch (error) {
    ElMessage.error('退出登录失败')
    console.error('Logout error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="less">
.logout-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 9999;
  cursor: move;
  user-select: none;
  transition: all 0.3s ease;

  .custom-logout-btn {
    padding: 8px 16px;
    border-radius: 20px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 2px 12px rgba(220, 38, 38, 0.2);
    background: linear-gradient(135deg, #ef4444, #dc2626);
    border: none;
    white-space: nowrap;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(220, 38, 38, 0.3);
      background: linear-gradient(135deg, #dc2626, #b91c1c);
    }

    &:active {
      transform: translateY(0) scale(0.95);
    }

    .logout-icon {
      margin-right: 4px;
      font-size: 16px;
      transition: transform 0.3s ease;
    }

    &:hover .logout-icon {
      transform: rotate(180deg);
    }

    &.is-loading {
      background: linear-gradient(135deg, #ef4444, #dc2626) !important;

      &:hover {
        transform: none;
        box-shadow: 0 2px 12px rgba(220, 38, 38, 0.2);
      }
    }
  }
}

// 添加拖动时的视觉反馈
.logout-button:active {
  cursor: grabbing;

  .custom-logout-btn {
    transform: scale(0.95);
  }
}
</style>
